"use client";

import Link from "next/link";
import {
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  adminSeed,
  adminViewLabels,
  type AdminDocument,
  type AdminMediaItem,
  type AdminPage,
  type AdminSection,
  type AdminTile,
  type AdminView,
  type ContentStatus,
} from "./admin-data";

const STORAGE_KEY = "xylens-admin-draft-v1";
const REVISION_KEY = "xylens-admin-revisions-v1";

type SaveState = "saved" | "saving" | "changed";
type InspectorMode = "section" | "tile";

type Revision = {
  id: string;
  date: string;
  label: string;
  document: AdminDocument;
};

const viewIcons: Record<AdminView, ReactNode> = {
  overview: <path d="M4 4h6v6H4zM14 4h6v10h-6zM4 14h6v6H4zM14 18h6v2h-6z" />,
  editor: <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />,
  articles: <path d="M6 3h9l3 3v15H6zM14 3v4h4M9 11h6M9 15h6" />,
  media: <path d="M4 5h16v14H4zM7 15l3-3 3 3 2-2 3 3M8 9h.01" />,
  inbox: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  analytics: <path d="M5 20V10M12 20V4M19 20v-7" />,
  navigation: <path d="M5 6h14M5 12h14M5 18h14" />,
  settings: (
    <path d="M12 8a4 4 0 100 8 4 4 0 000-8zM4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
  ),
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function makeId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${random}`;
}

function cloneDocument(document: AdminDocument): AdminDocument {
  return JSON.parse(JSON.stringify(document)) as AdminDocument;
}

function readStoredDocument() {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as AdminDocument) : null;
  } catch {
    return null;
  }
}

function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span
      className={`admin-status admin-status-${status.toLowerCase().replace(" ", "-")}`}
    >
      <i />
      {status}
    </span>
  );
}

function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-empty">
      <span className="admin-empty-orbit" aria-hidden="true">
        <i />
      </span>
      <h3>{title}</h3>
      <p>{body}</p>
      {action}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="admin-field">
      <span>
        {label}
        {hint && <small>{hint}</small>}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`admin-toggle ${checked ? "is-on" : ""}`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span />
      {label}
    </button>
  );
}

function MiniTrend() {
  return (
    <svg viewBox="0 0 132 42" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="adminTrend" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#52877e" stopOpacity=".24" />
          <stop offset="1" stopColor="#52877e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 34 C15 30, 20 31, 31 25 S50 28, 62 18 S82 21, 94 13 S112 17, 132 5 V42 H0Z"
        fill="url(#adminTrend)"
      />
      <path
        d="M0 34 C15 30, 20 31, 31 25 S50 28, 62 18 S82 21, 94 13 S112 17, 132 5"
        fill="none"
        stroke="#52877e"
        strokeWidth="2"
      />
    </svg>
  );
}

function PagePreview({
  page,
  site,
}: {
  page: AdminPage;
  site: AdminDocument["site"];
}) {
  const visibleSections = page.sections.filter((section) => section.visible);
  return (
    <div className="admin-preview-frame">
      <div className="admin-preview-browser">
        <span />
        <span />
        <span />
        <p>xylensjournal.com{page.path}</p>
      </div>
      <div
        className="admin-preview-site"
        style={
          {
            "--preview-primary": site.primaryColor,
            "--preview-accent": site.accentColor,
          } as React.CSSProperties
        }
      >
        <header>
          <div className="admin-preview-brand">
            <i>XY</i>
            <span>
              <strong>{site.title}</strong>
              <small>{site.masthead}</small>
            </span>
          </div>
          <nav>
            <span>Journal</span>
            <span>Evidence</span>
            <span>Our standard</span>
          </nav>
        </header>
        {visibleSections.length === 0 ? (
          <div className="admin-preview-empty">No visible sections</div>
        ) : (
          visibleSections.map((section, sectionIndex) => (
            <section
              className={`admin-preview-section is-${section.type}`}
              key={section.id}
            >
              <div>
                <small>{section.eyebrow}</small>
                <h2>{section.title || "Untitled section"}</h2>
                <p>{section.description}</p>
                {sectionIndex === 0 && <button>Continue ↗</button>}
              </div>
              {section.tiles.filter((tile) => tile.visible).length > 0 && (
                <div className="admin-preview-tiles">
                  {section.tiles
                    .filter((tile) => tile.visible)
                    .slice(0, 4)
                    .map((tile) => (
                      <article key={tile.id}>
                        <i style={{ background: tile.accent }} />
                        <small>{tile.eyebrow}</small>
                        <h3>{tile.title}</h3>
                        <p>{tile.body}</p>
                      </article>
                    ))}
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  );
}

export default function AdminStudio({
  publishingConfigured,
}: {
  publishingConfigured: boolean;
}) {
  const [document, setDocument] = useState<AdminDocument>(adminSeed);
  const [view, setView] = useState<AdminView>("overview");
  const [selectedPageId, setSelectedPageId] = useState("page-home");
  const [selectedSectionId, setSelectedSectionId] = useState("home-hero");
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [inspectorMode, setInspectorMode] =
    useState<InspectorMode>("section");
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [lastSaved, setLastSaved] = useState("Draft restored");
  const [showPreview, setShowPreview] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [search, setSearch] = useState("");
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const saveTimerRef = useRef<number | null>(null);
  const restoredDraftRef = useRef(false);

  const selectedPage =
    document.pages.find((page) => page.id === selectedPageId) ??
    document.pages[0];
  const selectedSection =
    selectedPage?.sections.find((section) => section.id === selectedSectionId) ??
    selectedPage?.sections[0];
  const selectedTile =
    selectedSection?.tiles.find((tile) => tile.id === selectedTileId) ?? null;

  const visiblePageCount = document.pages.length;
  const sectionCount = document.pages.reduce(
    (total, page) => total + page.sections.length,
    0,
  );
  const tileCount = document.pages.reduce(
    (total, page) =>
      total +
      page.sections.reduce(
        (sectionTotal, section) => sectionTotal + section.tiles.length,
        0,
      ),
    0,
  );
  const draftCount = document.pages.filter(
    (page) => page.status !== "Published",
  ).length;

  useEffect(() => {
    if (restoredDraftRef.current) return;
    restoredDraftRef.current = true;
    const stored = readStoredDocument();
    if (stored) {
      queueMicrotask(() => setDocument(stored));
    }
  }, []);

  useEffect(() => {
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(document));
        setSaveState("saved");
        setLastSaved(
          `Saved ${new Intl.DateTimeFormat("en", {
            hour: "numeric",
            minute: "2-digit",
          }).format(new Date())}`,
        );
      } catch {
        setSaveState("changed");
        setNotice("This browser could not save the draft.");
      }
    }, 450);
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    };
  }, [document]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function updateDocument(transform: (draft: AdminDocument) => void) {
    setDocument((current) => {
      const next = cloneDocument(current);
      transform(next);
      next.version += 1;
      return next;
    });
    setSaveState("changed");
  }

  function updatePage(field: keyof AdminPage, value: string) {
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      if (!page) return;
      if (field === "status") page.status = value as ContentStatus;
      else if (
        field === "name" ||
        field === "path" ||
        field === "description" ||
        field === "updatedAt"
      ) {
        page[field] = value;
      }
    });
  }

  function updateSection<K extends keyof AdminSection>(
    field: K,
    value: AdminSection[K],
    sectionId = selectedSection?.id,
  ) {
    if (!sectionId) return;
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      const section = page?.sections.find(
        (item) => item.id === sectionId,
      );
      if (section) section[field] = value;
    });
  }

  function updateTile<K extends keyof AdminTile>(
    field: K,
    value: AdminTile[K],
  ) {
    if (!selectedSection || !selectedTile) return;
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      const section = page?.sections.find(
        (item) => item.id === selectedSection.id,
      );
      const tile = section?.tiles.find((item) => item.id === selectedTile.id);
      if (tile) tile[field] = value;
    });
  }

  function selectPage(pageId: string) {
    const page = document.pages.find((item) => item.id === pageId);
    setSelectedPageId(pageId);
    setSelectedSectionId(page?.sections[0]?.id ?? "");
    setSelectedTileId(null);
    setInspectorMode("section");
  }

  function selectSection(sectionId: string) {
    setSelectedSectionId(sectionId);
    setSelectedTileId(null);
    setInspectorMode("section");
  }

  function addSection(type: AdminSection["type"]) {
    const section: AdminSection = {
      id: makeId("section"),
      type,
      label:
        type === "hero"
          ? "New introduction"
          : type === "tile-grid"
            ? "New tile collection"
            : type === "article-list"
              ? "New story list"
              : type === "newsletter"
                ? "New signup"
                : "New text section",
      eyebrow: "New section",
      title: "Give this section a clear point.",
      description:
        "Write the supporting context here. Keep the most important idea visible.",
      layout: type === "tile-grid" ? "grid-3" : "full",
      visible: true,
      tiles:
        type === "tile-grid"
          ? [
              {
                id: makeId("tile"),
                eyebrow: "New tile",
                title: "Editable story",
                body: "Select this tile to edit its content, link, and accent.",
                meta: "Draft",
                linkLabel: "Learn more",
                linkHref: "/journal",
                accent: "#6b9188",
                visible: true,
              },
            ]
          : [],
    };
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      page?.sections.push(section);
      if (page) page.status = "Draft";
    });
    setSelectedSectionId(section.id);
    setSelectedTileId(null);
    setInspectorMode("section");
    setShowAddSection(false);
    setNotice("Section added to the draft.");
  }

  function addTile() {
    if (!selectedSection) return;
    const tile: AdminTile = {
      id: makeId("tile"),
      eyebrow: "New tile",
      title: "Untitled story",
      body: "Add a concise description for this tile.",
      meta: "Draft",
      linkLabel: "Explore",
      linkHref: "/journal",
      accent: "#6b9188",
      visible: true,
    };
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      const section = page?.sections.find(
        (item) => item.id === selectedSection.id,
      );
      section?.tiles.push(tile);
      if (page) page.status = "Draft";
    });
    setSelectedTileId(tile.id);
    setInspectorMode("tile");
  }

  function duplicateSection(sectionToDuplicate = selectedSection) {
    if (!sectionToDuplicate) return;
    const copy = cloneDocument({
      version: 1,
      site: document.site,
      pages: [
        {
          ...selectedPage,
          sections: [sectionToDuplicate],
        },
      ],
      navigation: [],
      media: [],
    }).pages[0].sections[0];
    copy.id = makeId("section");
    copy.label = `${copy.label} copy`;
    copy.tiles = copy.tiles.map((tile) => ({
      ...tile,
      id: makeId("tile"),
    }));
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      const index =
        page?.sections.findIndex(
          (item) => item.id === sectionToDuplicate.id,
        ) ?? -1;
      if (page && index >= 0) page.sections.splice(index + 1, 0, copy);
      if (page) page.status = "Draft";
    });
    setSelectedSectionId(copy.id);
    setNotice("Section duplicated.");
  }

  function deleteSection() {
    if (!selectedSection || selectedPage.sections.length <= 1) {
      setNotice("A page needs at least one section.");
      return;
    }
    if (!window.confirm(`Remove “${selectedSection.label}” from this draft?`)) {
      return;
    }
    const nextSection =
      selectedPage.sections.find(
        (section) => section.id !== selectedSection.id,
      )?.id ?? "";
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      if (!page) return;
      page.sections = page.sections.filter(
        (item) => item.id !== selectedSection.id,
      );
      page.status = "Draft";
    });
    setSelectedSectionId(nextSection);
    setSelectedTileId(null);
  }

  function deleteTile() {
    if (!selectedSection || !selectedTile) return;
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      const section = page?.sections.find(
        (item) => item.id === selectedSection.id,
      );
      if (section) {
        section.tiles = section.tiles.filter(
          (item) => item.id !== selectedTile.id,
        );
      }
      if (page) page.status = "Draft";
    });
    setSelectedTileId(null);
    setInspectorMode("section");
  }

  function reorderSections(sourceId: string, targetId: string) {
    if (sourceId === targetId) return;
    updateDocument((draft) => {
      const page = draft.pages.find((item) => item.id === selectedPage.id);
      if (!page) return;
      const sourceIndex = page.sections.findIndex(
        (section) => section.id === sourceId,
      );
      const targetIndex = page.sections.findIndex(
        (section) => section.id === targetId,
      );
      if (sourceIndex < 0 || targetIndex < 0) return;
      const [moved] = page.sections.splice(sourceIndex, 1);
      page.sections.splice(targetIndex, 0, moved);
      page.status = "Draft";
    });
  }

  function addPage() {
    const page: AdminPage = {
      id: makeId("page"),
      name: "Untitled page",
      path: `/draft-${document.pages.length + 1}`,
      description: "A new XYLENS editorial page.",
      status: "Draft",
      updatedAt: "Just now",
      sections: [
        {
          id: makeId("section"),
          type: "hero",
          label: "Page introduction",
          eyebrow: "New page",
          title: "Begin with the essential idea.",
          description: "Add a concise, useful introduction for readers.",
          layout: "full",
          visible: true,
          tiles: [],
        },
      ],
    };
    updateDocument((draft) => draft.pages.push(page));
    selectPage(page.id);
    setSelectedPageId(page.id);
    setSelectedSectionId(page.sections[0].id);
    setNotice("New page added to drafts.");
  }

  function saveRevision(label = "Manual checkpoint") {
    const revision: Revision = {
      id: makeId("revision"),
      date: new Date().toISOString(),
      label,
      document: cloneDocument(document),
    };
    try {
      const existing = JSON.parse(
        window.localStorage.getItem(REVISION_KEY) ?? "[]",
      ) as Revision[];
      window.localStorage.setItem(
        REVISION_KEY,
        JSON.stringify([revision, ...existing].slice(0, 12)),
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(document));
      setSaveState("saved");
      setLastSaved("Checkpoint saved");
      setNotice("Draft checkpoint saved.");
    } catch {
      setNotice("This browser could not save the checkpoint.");
    }
  }

  function exportDocument() {
    const blob = new Blob([JSON.stringify(document, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `xylens-content-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Content package exported.");
  }

  function importDocument(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as AdminDocument;
        if (!parsed.pages || !parsed.site || !parsed.navigation) {
          throw new Error("Invalid content model");
        }
        setDocument(parsed);
        selectPage(parsed.pages[0]?.id ?? "");
        setNotice("Content package imported as a draft.");
      } catch {
        setNotice("That file is not a valid XYLENS content package.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function addMediaFiles(files: FileList | File[]) {
    const accepted = Array.from(files).filter(
      (file) =>
        file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type === "application/pdf",
    );
    if (accepted.length === 0) {
      setNotice("Choose images, video, or PDF files.");
      return;
    }

    accepted.slice(0, 6).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media: AdminMediaItem = {
          id: makeId("media"),
          name: file.name,
          kind: file.type.startsWith("video/")
            ? "video"
            : file.type === "application/pdf"
              ? "document"
              : "image",
          src:
            file.size < 1_200_000 && file.type.startsWith("image/")
              ? String(reader.result)
              : "",
          alt: "",
          size:
            file.size > 1_000_000
              ? `${(file.size / 1_000_000).toFixed(1)} MB`
              : `${Math.max(1, Math.round(file.size / 1_000))} KB`,
        };
        updateDocument((draft) => draft.media.unshift(media));
      };
      if (file.size < 1_200_000 && file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(new Blob([""]));
      }
    });
    setNotice(
      publishingConfigured
        ? "Media added to the draft."
        : "Media staged locally. Cloud storage is not connected yet.",
    );
  }

  function handleMediaDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    addMediaFiles(event.dataTransfer.files);
  }

  function openEditor(pageId = selectedPage.id, sectionId?: string) {
    selectPage(pageId);
    if (sectionId) setSelectedSectionId(sectionId);
    setView("editor");
  }

  const filteredPages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return document.pages;
    return document.pages.filter(
      (page) =>
        page.name.toLowerCase().includes(query) ||
        page.path.toLowerCase().includes(query),
    );
  }, [document.pages, search]);

  return (
    <main id="main-content" className="admin-shell" data-no-route-transition>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">XY</span>
          <span>
            <strong>XYLENS</strong>
            <small>Admin Studio</small>
          </span>
        </div>
        <nav aria-label="Admin sections">
          <p>Workspace</p>
          {(Object.keys(adminViewLabels) as AdminView[])
            .slice(0, 6)
            .map((item) => (
              <button
                type="button"
                key={item}
                className={view === item ? "is-active" : ""}
                onClick={() => setView(item)}
              >
                <Icon>{viewIcons[item]}</Icon>
                <span>{adminViewLabels[item]}</span>
                {item === "inbox" && <i className="admin-nav-dot" />}
              </button>
            ))}
          <p>System</p>
          {(Object.keys(adminViewLabels) as AdminView[])
            .slice(6)
            .map((item) => (
              <button
                type="button"
                key={item}
                className={view === item ? "is-active" : ""}
                onClick={() => setView(item)}
              >
                <Icon>{viewIcons[item]}</Icon>
                <span>{adminViewLabels[item]}</span>
              </button>
            ))}
        </nav>
        <div className="admin-sidebar-foot">
          <div>
            <span>CR</span>
            <p>
              <strong>Editorial admin</strong>
              <small>Setup workspace</small>
            </p>
          </div>
          <Link href="/" target="_blank">
            View site ↗
          </Link>
          <button
            type="button"
            onClick={() => {
              window.sessionStorage.removeItem("xylens:admin-intro-seen");
              window.dispatchEvent(
                new CustomEvent("xylens:replay-admin-intro"),
              );
            }}
          >
            Replay studio opening ◌
          </button>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <button
              type="button"
              className="admin-mobile-menu"
              aria-label="Open navigation"
            >
              <Icon>{viewIcons.navigation}</Icon>
            </button>
            <span className="admin-breadcrumb">XYLENS</span>
            <i>/</i>
            <strong>{adminViewLabels[view]}</strong>
          </div>
          <div className="admin-top-actions">
            <span className={`admin-save-state is-${saveState}`}>
              <i />
              {saveState === "saving"
                ? "Saving…"
                : saveState === "changed"
                  ? "Unsaved changes"
                  : lastSaved}
            </span>
            <button
              type="button"
              className="admin-button admin-button-quiet"
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
            <button
              type="button"
              className="admin-button admin-button-primary"
              onClick={() => setShowPublish(true)}
            >
              Publish
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </header>

        {view === "overview" && (
          <div className="admin-page admin-overview">
            <div className="admin-page-heading">
              <div>
                <p>Sunday, July 26</p>
                <h1>Good afternoon.</h1>
                <span>
                  The journal is healthy. Your content workspace is ready.
                </span>
              </div>
              <button
                type="button"
                className="admin-button admin-button-primary"
                onClick={() => openEditor("page-home")}
              >
                Edit homepage
                <span aria-hidden="true">↗</span>
              </button>
            </div>

            {!publishingConfigured && (
              <div className="admin-setup-banner">
                <span className="admin-setup-icon">
                  <Icon>
                    <path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7zM9 12l2 2 4-4" />
                  </Icon>
                </span>
                <div>
                  <strong>Private setup workspace</strong>
                  <p>
                    Draft editing is active in this browser. Publishing,
                    shared logins, cloud media, inbox delivery, and real traffic
                    reporting remain locked until the production services are
                    connected.
                  </p>
                </div>
                <button type="button" onClick={() => setView("settings")}>
                  Integration status
                </button>
              </div>
            )}

            <div className="admin-metric-grid">
              <article>
                <div>
                  <span>Site structure</span>
                  <strong>{visiblePageCount}</strong>
                  <small>pages · {sectionCount} sections</small>
                </div>
                <span className="admin-metric-icon">
                  <Icon>{viewIcons.editor}</Icon>
                </span>
              </article>
              <article>
                <div>
                  <span>Editable tiles</span>
                  <strong>{tileCount}</strong>
                  <small>stories and content cards</small>
                </div>
                <span className="admin-metric-icon">
                  <Icon>{viewIcons.articles}</Icon>
                </span>
              </article>
              <article>
                <div>
                  <span>Draft queue</span>
                  <strong>{draftCount}</strong>
                  <small>{draftCount === 1 ? "page needs" : "pages need"} review</small>
                </div>
                <span className="admin-metric-icon">
                  <Icon>
                    <path d="M6 3h9l3 3v15H6zM9 14h6M9 17h4" />
                  </Icon>
                </span>
              </article>
              <article className="is-muted">
                <div>
                  <span>Traffic</span>
                  <strong>—</strong>
                  <small>analytics provider not connected</small>
                </div>
                <span className="admin-metric-icon">
                  <Icon>{viewIcons.analytics}</Icon>
                </span>
              </article>
            </div>

            <div className="admin-overview-grid">
              <section className="admin-panel admin-recent-panel">
                <div className="admin-panel-heading">
                  <div>
                    <p>Content</p>
                    <h2>Pages and sections</h2>
                  </div>
                  <button type="button" onClick={() => setView("editor")}>
                    View all
                  </button>
                </div>
                <div className="admin-page-table">
                  {document.pages.slice(0, 5).map((page) => (
                    <button
                      type="button"
                      key={page.id}
                      onClick={() => openEditor(page.id)}
                    >
                      <span className="admin-page-glyph">
                        {page.name.slice(0, 1)}
                      </span>
                      <span>
                        <strong>{page.name}</strong>
                        <small>
                          {page.path} · {page.sections.length} sections
                        </small>
                      </span>
                      <StatusBadge status={page.status} />
                      <small>{page.updatedAt}</small>
                      <i>›</i>
                    </button>
                  ))}
                </div>
              </section>

              <aside className="admin-panel admin-health-panel">
                <div className="admin-panel-heading">
                  <div>
                    <p>Publication</p>
                    <h2>System health</h2>
                  </div>
                  <span className="admin-live-pill">
                    <i />
                    Site live
                  </span>
                </div>
                <div className="admin-health-score">
                  <div>
                    <strong>92</strong>
                    <span>/ 100</span>
                  </div>
                  <p>
                    <strong>Strong foundation</strong>
                    Routes, editorial standards, accessibility controls, and
                    responsive layouts are in place.
                  </p>
                </div>
                <ul>
                  <li>
                    <span>Content architecture</span>
                    <strong>Complete</strong>
                  </li>
                  <li>
                    <span>Search visibility</span>
                    <strong>Ready</strong>
                  </li>
                  <li>
                    <span>Admin persistence</span>
                    <strong className="is-pending">Local draft</strong>
                  </li>
                  <li>
                    <span>Traffic reporting</span>
                    <strong className="is-pending">Needs provider</strong>
                  </li>
                </ul>
              </aside>
            </div>

            <section className="admin-panel admin-traffic-preview">
              <div>
                <p>Traffic overview</p>
                <h2>Reporting is ready for a real signal.</h2>
                <span>
                  Once analytics is connected, this space will show visitors,
                  top pages, referral sources, and article engagement without
                  inventing preview data.
                </span>
              </div>
              <div className="admin-trend-placeholder">
                <MiniTrend />
                <span>Awaiting production analytics</span>
              </div>
              <button type="button" onClick={() => setView("analytics")}>
                Open traffic workspace
              </button>
            </section>
          </div>
        )}

        {view === "editor" && (
          <div className="admin-editor">
            <aside className="admin-page-rail">
              <div className="admin-rail-heading">
                <div>
                  <p>Structure</p>
                  <h2>Pages</h2>
                </div>
                <button type="button" onClick={addPage} aria-label="Add page">
                  +
                </button>
              </div>
              <label className="admin-rail-search">
                <Icon>
                  <circle cx="11" cy="11" r="7" />
                  <path d="M16 16l4 4" />
                </Icon>
                <input
                  type="search"
                  placeholder="Find a page"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <div className="admin-page-list">
                {filteredPages.map((page) => (
                  <button
                    type="button"
                    key={page.id}
                    className={selectedPage.id === page.id ? "is-active" : ""}
                    onClick={() => selectPage(page.id)}
                  >
                    <span>{page.name.slice(0, 1)}</span>
                    <p>
                      <strong>{page.name}</strong>
                      <small>{page.path}</small>
                    </p>
                    {page.status !== "Published" && <i />}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="admin-add-page"
                onClick={addPage}
              >
                <span>+</span>
                Add page
              </button>
            </aside>

            <section className="admin-canvas">
              <header className="admin-canvas-heading">
                <div>
                  <p>
                    {selectedPage.path} <StatusBadge status={selectedPage.status} />
                  </p>
                  <h1>{selectedPage.name}</h1>
                </div>
                <div>
                  <select
                    value={selectedPage.status}
                    onChange={(event) =>
                      updatePage("status", event.target.value)
                    }
                    aria-label="Page status"
                  >
                    <option>Draft</option>
                    <option>In review</option>
                    <option>Published</option>
                  </select>
                  <button
                    type="button"
                    className="admin-icon-button"
                    onClick={() => setShowPreview(true)}
                    aria-label="Preview page"
                  >
                    <Icon>
                      <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </Icon>
                  </button>
                </div>
              </header>

              <div className="admin-section-stack">
                {selectedPage.sections.map((section, index) => (
                  <article
                    key={section.id}
                    className={`admin-section-card ${
                      selectedSection?.id === section.id ? "is-selected" : ""
                    } ${!section.visible ? "is-hidden" : ""}`}
                    draggable
                    onDragStart={() => setDraggedSectionId(section.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (draggedSectionId) {
                        reorderSections(draggedSectionId, section.id);
                      }
                      setDraggedSectionId(null);
                    }}
                    onClick={() => selectSection(section.id)}
                  >
                    <div className="admin-drag-handle" title="Drag to reorder">
                      <span>··</span>
                      <span>··</span>
                      <span>··</span>
                    </div>
                    <div className="admin-section-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="admin-section-summary">
                      <div>
                        <span>{section.type.replace("-", " ")}</span>
                        {!section.visible && <small>Hidden</small>}
                      </div>
                      <h2>{section.label}</h2>
                      <p>{section.title}</p>
                      {section.tiles.length > 0 && (
                        <div className="admin-tile-strip">
                          {section.tiles.slice(0, 5).map((tile) => (
                            <button
                              type="button"
                              key={tile.id}
                              className={
                                selectedTile?.id === tile.id ? "is-active" : ""
                              }
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedSectionId(section.id);
                                setSelectedTileId(tile.id);
                                setInspectorMode("tile");
                              }}
                            >
                              <i style={{ background: tile.accent }} />
                              <span>{tile.title}</span>
                            </button>
                          ))}
                          {section.tiles.length > 5 && (
                            <span>+{section.tiles.length - 5}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="admin-section-actions">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateSection(
                            "visible",
                            !section.visible,
                            section.id,
                          );
                        }}
                        aria-label={section.visible ? "Hide section" : "Show section"}
                      >
                        <Icon>
                          <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" />
                          <circle cx="12" cy="12" r="2.5" />
                        </Icon>
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          selectSection(section.id);
                          duplicateSection(section);
                        }}
                        aria-label="Duplicate section"
                      >
                        <Icon>
                          <rect x="8" y="8" width="11" height="11" />
                          <path d="M16 8V5H5v11h3" />
                        </Icon>
                      </button>
                    </div>
                  </article>
                ))}

                <button
                  type="button"
                  className="admin-add-section-card"
                  onClick={() => setShowAddSection(true)}
                >
                  <span>+</span>
                  <strong>Add a section</strong>
                  <small>Build a new content block anywhere on this page</small>
                </button>
              </div>
            </section>

            <aside className="admin-inspector">
              <header>
                <div>
                  <p>Inspector</p>
                  <h2>
                    {inspectorMode === "tile" && selectedTile
                      ? "Tile content"
                      : "Section content"}
                  </h2>
                </div>
                {inspectorMode === "tile" && (
                  <button
                    type="button"
                    onClick={() => {
                      setInspectorMode("section");
                      setSelectedTileId(null);
                    }}
                  >
                    Section
                  </button>
                )}
              </header>

              {inspectorMode === "tile" && selectedTile ? (
                <div className="admin-inspector-form">
                  <div className="admin-inspector-record">
                    <span
                      style={{ backgroundColor: selectedTile.accent }}
                      aria-hidden="true"
                    />
                    <p>
                      <strong>{selectedTile.title}</strong>
                      <small>Tile · {selectedSection?.label}</small>
                    </p>
                  </div>
                  <Toggle
                    checked={selectedTile.visible}
                    onChange={(checked) => updateTile("visible", checked)}
                    label={selectedTile.visible ? "Visible" : "Hidden"}
                  />
                  <Field label="Eyebrow">
                    <input
                      value={selectedTile.eyebrow}
                      onChange={(event) =>
                        updateTile("eyebrow", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Title">
                    <textarea
                      rows={2}
                      value={selectedTile.title}
                      onChange={(event) =>
                        updateTile("title", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      rows={5}
                      value={selectedTile.body}
                      onChange={(event) =>
                        updateTile("body", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Metadata">
                    <input
                      value={selectedTile.meta}
                      onChange={(event) =>
                        updateTile("meta", event.target.value)
                      }
                    />
                  </Field>
                  <div className="admin-field-row">
                    <Field label="Button label">
                      <input
                        value={selectedTile.linkLabel}
                        onChange={(event) =>
                          updateTile("linkLabel", event.target.value)
                        }
                      />
                    </Field>
                    <Field label="Destination">
                      <input
                        value={selectedTile.linkHref}
                        onChange={(event) =>
                          updateTile("linkHref", event.target.value)
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Accent">
                    <div className="admin-color-field">
                      <input
                        type="color"
                        value={selectedTile.accent}
                        onChange={(event) =>
                          updateTile("accent", event.target.value)
                        }
                      />
                      <input
                        value={selectedTile.accent}
                        onChange={(event) =>
                          updateTile("accent", event.target.value)
                        }
                      />
                    </div>
                  </Field>
                  <button
                    type="button"
                    className="admin-delete-control"
                    onClick={deleteTile}
                  >
                    Remove this tile
                  </button>
                </div>
              ) : selectedSection ? (
                <div className="admin-inspector-form">
                  <Toggle
                    checked={selectedSection.visible}
                    onChange={(checked) => updateSection("visible", checked)}
                    label={selectedSection.visible ? "Visible" : "Hidden"}
                  />
                  <Field label="Internal label" hint="Only editors see this">
                    <input
                      value={selectedSection.label}
                      onChange={(event) =>
                        updateSection("label", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Eyebrow">
                    <input
                      value={selectedSection.eyebrow}
                      onChange={(event) =>
                        updateSection("eyebrow", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Headline">
                    <textarea
                      rows={3}
                      value={selectedSection.title}
                      onChange={(event) =>
                        updateSection("title", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      rows={6}
                      value={selectedSection.description}
                      onChange={(event) =>
                        updateSection("description", event.target.value)
                      }
                    />
                  </Field>
                  <Field label="Layout">
                    <select
                      value={selectedSection.layout}
                      onChange={(event) =>
                        updateSection(
                          "layout",
                          event.target.value as AdminSection["layout"],
                        )
                      }
                    >
                      <option value="full">Full width</option>
                      <option value="split">Editorial split</option>
                      <option value="grid-2">Two-column grid</option>
                      <option value="grid-3">Three-column grid</option>
                    </select>
                  </Field>
                  <div className="admin-inspector-divider">
                    <span>Tiles</span>
                    <button type="button" onClick={addTile}>
                      + Add tile
                    </button>
                  </div>
                  {selectedSection.tiles.length > 0 ? (
                    <div className="admin-inspector-tiles">
                      {selectedSection.tiles.map((tile) => (
                        <button
                          type="button"
                          key={tile.id}
                          onClick={() => {
                            setSelectedTileId(tile.id);
                            setInspectorMode("tile");
                          }}
                        >
                          <i style={{ background: tile.accent }} />
                          <span>
                            <strong>{tile.title}</strong>
                            <small>{tile.meta || "No metadata"}</small>
                          </span>
                          <b>›</b>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="admin-inspector-empty">
                      This section has no tiles. Add one when the layout needs
                      an editable card or story.
                    </p>
                  )}
                  <div className="admin-inspector-controls">
                    <button
                      type="button"
                      onClick={() => duplicateSection()}
                    >
                      Duplicate
                    </button>
                    <button type="button" onClick={deleteSection}>
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <EmptyState
                  title="Select a section"
                  body="Choose a section in the canvas to edit its content and layout."
                />
              )}
            </aside>
          </div>
        )}

        {view === "articles" && (
          <div className="admin-page">
            <div className="admin-page-heading">
              <div>
                <p>Editorial library</p>
                <h1>Articles</h1>
                <span>
                  Manage every published story tile from one unified journal.
                </span>
              </div>
              <button
                type="button"
                className="admin-button admin-button-primary"
                onClick={() => {
                  openEditor("page-home", "home-library");
                  setShowAddSection(false);
                }}
              >
                Edit story collection
              </button>
            </div>
            <section className="admin-panel admin-article-library">
              <div className="admin-library-toolbar">
                <label>
                  <Icon>
                    <circle cx="11" cy="11" r="7" />
                    <path d="M16 16l4 4" />
                  </Icon>
                  <input placeholder="Search title, topic, or status" />
                </label>
                <button type="button">All content⌄</button>
                <button type="button">All statuses⌄</button>
              </div>
              <div className="admin-article-head">
                <span>Article</span>
                <span>Desk</span>
                <span>Status</span>
                <span>Updated</span>
                <span />
              </div>
              {document.pages
                .find((page) => page.id === "page-home")
                ?.sections.find((section) => section.id === "home-library")
                ?.tiles.map((tile, index) => (
                  <button
                    type="button"
                    className="admin-article-record"
                    key={tile.id}
                    onClick={() => {
                      openEditor("page-home", "home-library");
                      setSelectedTileId(tile.id);
                      setInspectorMode("tile");
                    }}
                  >
                    <span className="admin-article-art">
                      <i style={{ background: tile.accent }} />
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <strong>{tile.title}</strong>
                      <small>{tile.meta}</small>
                    </span>
                    <span>{tile.eyebrow}</span>
                    <StatusBadge status="Published" />
                    <span>Jul 26</span>
                    <i>›</i>
                  </button>
                ))}
            </section>
          </div>
        )}

        {view === "media" && (
          <div className="admin-page">
            <div className="admin-page-heading">
              <div>
                <p>Asset library</p>
                <h1>Media</h1>
                <span>
                  Stage imagery, video, documents, and accessible descriptions.
                </span>
              </div>
              <button
                type="button"
                className="admin-button admin-button-primary"
                onClick={() => mediaInputRef.current?.click()}
              >
                Add media
              </button>
            </div>
            <input
              ref={mediaInputRef}
              type="file"
              hidden
              multiple
              accept="image/*,video/*,.pdf"
              onChange={(event) => {
                if (event.target.files) addMediaFiles(event.target.files);
                event.target.value = "";
              }}
            />
            <div
              className="admin-media-drop"
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleMediaDrop}
            >
              <span>
                <Icon>
                  <path d="M12 16V4M7 9l5-5 5 5M5 14v5h14v-5" />
                </Icon>
              </span>
              <div>
                <strong>Drop visual assets here</strong>
                <p>
                  Images under 1.2 MB preview in this browser. Larger files are
                  staged by name until cloud storage is connected.
                </p>
              </div>
              <button
                type="button"
                onClick={() => mediaInputRef.current?.click()}
              >
                Browse files
              </button>
            </div>
            <div className="admin-media-grid">
              {document.media.map((media) => (
                <article key={media.id}>
                  <div
                    className={`admin-media-preview is-${media.kind}`}
                    style={
                      media.src
                        ? { backgroundImage: `url("${media.src}")` }
                        : undefined
                    }
                  >
                    {!media.src && (
                      <Icon>
                        <path d="M4 5h16v14H4zM7 15l3-3 3 3 2-2 3 3" />
                      </Icon>
                    )}
                    <span>{media.kind}</span>
                  </div>
                  <div>
                    <strong>{media.name}</strong>
                    <small>{media.size}</small>
                  </div>
                  <Field label="Alternative text">
                    <input
                      value={media.alt}
                      placeholder="Describe the image"
                      onChange={(event) =>
                        updateDocument((draft) => {
                          const item = draft.media.find(
                            (candidate) => candidate.id === media.id,
                          );
                          if (item) item.alt = event.target.value;
                        })
                      }
                    />
                  </Field>
                </article>
              ))}
            </div>
          </div>
        )}

        {view === "inbox" && (
          <div className="admin-page">
            <div className="admin-page-heading">
              <div>
                <p>Editorial communication</p>
                <h1>Inbox</h1>
                <span>
                  Correction requests, accessibility feedback, and general
                  inquiries will arrive here.
                </span>
              </div>
              <span className="admin-integration-pill">Email not connected</span>
            </div>
            <div className="admin-inbox-layout">
              <aside className="admin-panel admin-inbox-folders">
                <button type="button" className="is-active">
                  <span>Inbox</span>
                  <small>0</small>
                </button>
                <button type="button">
                  <span>Corrections</span>
                  <small>0</small>
                </button>
                <button type="button">
                  <span>Accessibility</span>
                  <small>0</small>
                </button>
                <button type="button">
                  <span>Partnerships</span>
                  <small>0</small>
                </button>
                <button type="button">
                  <span>Archived</span>
                  <small>0</small>
                </button>
              </aside>
              <section className="admin-panel admin-inbox-empty">
                <EmptyState
                  title="No inbox provider connected"
                  body="The interface is ready, but XYLENS is not claiming to receive messages until a production mailbox and privacy-reviewed form are connected."
                  action={
                    <button type="button" onClick={() => setView("settings")}>
                      View integration status
                    </button>
                  }
                />
              </section>
            </div>
          </div>
        )}

        {view === "analytics" && (
          <div className="admin-page">
            <div className="admin-page-heading">
              <div>
                <p>Audience</p>
                <h1>Traffic</h1>
                <span>
                  A privacy-conscious reporting workspace for real production
                  activity.
                </span>
              </div>
              <span className="admin-integration-pill">Awaiting provider</span>
            </div>
            <div className="admin-metric-grid admin-analytics-metrics">
              {["Visitors", "Page views", "Story reads", "Avg. engagement"].map(
                (metric) => (
                  <article className="is-muted" key={metric}>
                    <div>
                      <span>{metric}</span>
                      <strong>—</strong>
                      <small>No production signal</small>
                    </div>
                  </article>
                ),
              )}
            </div>
            <div className="admin-analytics-grid">
              <section className="admin-panel admin-chart-panel">
                <div className="admin-panel-heading">
                  <div>
                    <p>Last 30 days</p>
                    <h2>Visits over time</h2>
                  </div>
                  <button type="button">30 days⌄</button>
                </div>
                <div className="admin-chart-empty">
                  <MiniTrend />
                  <span>
                    The chart will populate from the connected analytics
                    provider.
                  </span>
                </div>
              </section>
              <section className="admin-panel admin-top-content">
                <div className="admin-panel-heading">
                  <div>
                    <p>Content</p>
                    <h2>Top pages</h2>
                  </div>
                </div>
                {document.pages.slice(0, 5).map((page, index) => (
                  <div key={page.id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>
                      <strong>{page.name}</strong>
                      <small>{page.path}</small>
                    </p>
                    <b>—</b>
                  </div>
                ))}
              </section>
            </div>
            <section className="admin-panel admin-analytics-boundary">
              <span>
                <Icon>
                  <path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7z" />
                </Icon>
              </span>
              <div>
                <strong>Privacy boundary</strong>
                <p>
                  This dashboard will report aggregate audience behavior—not
                  health profiles, advertising identities, or invented sample
                  numbers. Analytics stays blank until the production data
                  source is real.
                </p>
              </div>
            </section>
          </div>
        )}

        {view === "navigation" && (
          <div className="admin-page">
            <div className="admin-page-heading">
              <div>
                <p>Site structure</p>
                <h1>Navigation</h1>
                <span>
                  Reorder and rename the routes readers use to move through the
                  journal.
                </span>
              </div>
              <button
                type="button"
                className="admin-button admin-button-primary"
                onClick={() =>
                  updateDocument((draft) =>
                    draft.navigation.push({
                      id: makeId("nav"),
                      label: "New link",
                      href: "/",
                      visible: true,
                    }),
                  )
                }
              >
                Add link
              </button>
            </div>
            <section className="admin-panel admin-navigation-editor">
              <div className="admin-panel-heading">
                <div>
                  <p>Primary</p>
                  <h2>Header navigation</h2>
                </div>
                <span>Drag-ready structure</span>
              </div>
              {document.navigation.map((item, index) => (
                <div key={item.id}>
                  <span className="admin-nav-handle">••<br />••</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <input
                    value={item.label}
                    aria-label={`Label for navigation item ${index + 1}`}
                    onChange={(event) =>
                      updateDocument((draft) => {
                        const nav = draft.navigation.find(
                          (candidate) => candidate.id === item.id,
                        );
                        if (nav) nav.label = event.target.value;
                      })
                    }
                  />
                  <input
                    value={item.href}
                    aria-label={`Path for navigation item ${index + 1}`}
                    onChange={(event) =>
                      updateDocument((draft) => {
                        const nav = draft.navigation.find(
                          (candidate) => candidate.id === item.id,
                        );
                        if (nav) nav.href = event.target.value;
                      })
                    }
                  />
                  <Toggle
                    checked={item.visible}
                    onChange={(checked) =>
                      updateDocument((draft) => {
                        const nav = draft.navigation.find(
                          (candidate) => candidate.id === item.id,
                        );
                        if (nav) nav.visible = checked;
                      })
                    }
                    label={item.visible ? "Shown" : "Hidden"}
                  />
                </div>
              ))}
            </section>
          </div>
        )}

        {view === "settings" && (
          <div className="admin-page">
            <div className="admin-page-heading">
              <div>
                <p>Workspace controls</p>
                <h1>Settings</h1>
                <span>
                  Publication identity, integrations, portability, and safety
                  boundaries.
                </span>
              </div>
              <button
                type="button"
                className="admin-button admin-button-primary"
                onClick={() => saveRevision("Settings checkpoint")}
              >
                Save checkpoint
              </button>
            </div>
            <div className="admin-settings-grid">
              <section className="admin-panel admin-settings-card">
                <div className="admin-panel-heading">
                  <div>
                    <p>Identity</p>
                    <h2>Publication details</h2>
                  </div>
                </div>
                <Field label="Site name">
                  <input
                    value={document.site.title}
                    onChange={(event) =>
                      updateDocument(
                        (draft) => (draft.site.title = event.target.value),
                      )
                    }
                  />
                </Field>
                <Field label="Masthead">
                  <input
                    value={document.site.masthead}
                    onChange={(event) =>
                      updateDocument(
                        (draft) => (draft.site.masthead = event.target.value),
                      )
                    }
                  />
                </Field>
                <Field label="Tagline">
                  <input
                    value={document.site.tagline}
                    onChange={(event) =>
                      updateDocument(
                        (draft) => (draft.site.tagline = event.target.value),
                      )
                    }
                  />
                </Field>
                <Field label="Publication description">
                  <textarea
                    rows={4}
                    value={document.site.description}
                    onChange={(event) =>
                      updateDocument(
                        (draft) =>
                          (draft.site.description = event.target.value),
                      )
                    }
                  />
                </Field>
                <div className="admin-field-row">
                  <Field label="Paper color">
                    <div className="admin-color-field">
                      <input
                        type="color"
                        value={document.site.primaryColor}
                        onChange={(event) =>
                          updateDocument(
                            (draft) =>
                              (draft.site.primaryColor = event.target.value),
                          )
                        }
                      />
                      <input value={document.site.primaryColor} readOnly />
                    </div>
                  </Field>
                  <Field label="Metal accent">
                    <div className="admin-color-field">
                      <input
                        type="color"
                        value={document.site.accentColor}
                        onChange={(event) =>
                          updateDocument(
                            (draft) =>
                              (draft.site.accentColor = event.target.value),
                          )
                        }
                      />
                      <input value={document.site.accentColor} readOnly />
                    </div>
                  </Field>
                </div>
              </section>

              <section className="admin-panel admin-integration-card">
                <div className="admin-panel-heading">
                  <div>
                    <p>Production</p>
                    <h2>Integration status</h2>
                  </div>
                </div>
                {[
                  {
                    name: "Admin authentication",
                    detail: "Private access and team sessions",
                    ready: publishingConfigured,
                  },
                  {
                    name: "Content database",
                    detail: "Shared drafts and live publishing",
                    ready: publishingConfigured,
                  },
                  {
                    name: "Media storage",
                    detail: "Production image and video library",
                    ready: false,
                  },
                  {
                    name: "Traffic analytics",
                    detail: "Visitors, pages, sources, engagement",
                    ready: false,
                  },
                  {
                    name: "Editorial inbox",
                    detail: "Contact and correction requests",
                    ready: false,
                  },
                ].map((integration) => (
                  <div className="admin-integration-row" key={integration.name}>
                    <span className={integration.ready ? "is-ready" : ""}>
                      {integration.ready ? "✓" : "·"}
                    </span>
                    <p>
                      <strong>{integration.name}</strong>
                      <small>{integration.detail}</small>
                    </p>
                    <b>{integration.ready ? "Connected" : "Not connected"}</b>
                  </div>
                ))}
                <p className="admin-integration-note">
                  The interface never presents setup data as production data.
                  This keeps the medical publication boundary honest while the
                  infrastructure is connected.
                </p>
              </section>

              <section className="admin-panel admin-portability-card">
                <div className="admin-panel-heading">
                  <div>
                    <p>Portability</p>
                    <h2>Content package</h2>
                  </div>
                </div>
                <p>
                  Export the complete editable model as JSON, or bring a prior
                  package back into this browser.
                </p>
                <div>
                  <button
                    type="button"
                    className="admin-button admin-button-quiet"
                    onClick={exportDocument}
                  >
                    Export JSON
                  </button>
                  <button
                    type="button"
                    className="admin-button admin-button-quiet"
                    onClick={() => importInputRef.current?.click()}
                  >
                    Import JSON
                  </button>
                  <input
                    ref={importInputRef}
                    hidden
                    type="file"
                    accept="application/json,.json"
                    onChange={importDocument}
                  />
                </div>
              </section>

              <section className="admin-panel admin-danger-card">
                <div className="admin-panel-heading">
                  <div>
                    <p>Local draft</p>
                    <h2>Reset workspace</h2>
                  </div>
                </div>
                <p>
                  Discard browser-only edits and return to the published content
                  model included in this build.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Discard every browser-only XYLENS draft change?",
                      )
                    ) {
                      setDocument(cloneDocument(adminSeed));
                      selectPage("page-home");
                      setSelectedPageId("page-home");
                      setSelectedSectionId("home-hero");
                      setNotice("Workspace reset to the published model.");
                    }
                  }}
                >
                  Reset local draft
                </button>
              </section>
            </div>
          </div>
        )}
      </section>

      {showPreview && (
        <div className="admin-modal-backdrop" role="presentation">
          <section
            className="admin-preview-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-preview-title"
          >
            <header>
              <div>
                <p>Live draft</p>
                <h2 id="admin-preview-title">{selectedPage.name} preview</h2>
              </div>
              <div>
                <span>Desktop</span>
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  aria-label="Close preview"
                >
                  ×
                </button>
              </div>
            </header>
            <PagePreview page={selectedPage} site={document.site} />
          </section>
        </div>
      )}

      {showPublish && (
        <div className="admin-modal-backdrop" role="presentation">
          <section
            className="admin-publish-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-publish-title"
          >
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setShowPublish(false)}
              aria-label="Close publishing panel"
            >
              ×
            </button>
            <span className="admin-publish-mark">
              <Icon>
                <path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7zM9 12l2 2 4-4" />
              </Icon>
            </span>
            <p>Publication boundary</p>
            <h2 id="admin-publish-title">
              {publishingConfigured
                ? "Ready for production review."
                : "Your draft is safe. Live publishing is intentionally locked."}
            </h2>
            <span>
              {publishingConfigured
                ? "Review the pending content changes before making them public."
                : "XYLENS needs authenticated shared storage before this button can change the public medical journal. The editor, preview, checkpoints, media staging, and JSON export already work."}
            </span>
            <div className="admin-publish-checks">
              <div className="is-ready">
                <i>✓</i>
                <p>
                  <strong>Draft autosave</strong>
                  <small>Active in this browser</small>
                </p>
              </div>
              <div className={publishingConfigured ? "is-ready" : ""}>
                <i>{publishingConfigured ? "✓" : "·"}</i>
                <p>
                  <strong>Private authentication</strong>
                  <small>
                    {publishingConfigured ? "Connected" : "Not connected"}
                  </small>
                </p>
              </div>
              <div className={publishingConfigured ? "is-ready" : ""}>
                <i>{publishingConfigured ? "✓" : "·"}</i>
                <p>
                  <strong>Shared content storage</strong>
                  <small>
                    {publishingConfigured ? "Connected" : "Not connected"}
                  </small>
                </p>
              </div>
            </div>
            <div className="admin-publish-actions">
              <button
                type="button"
                className="admin-button admin-button-quiet"
                onClick={() => {
                  saveRevision("Pre-publish checkpoint");
                  setShowPublish(false);
                }}
              >
                Save checkpoint
              </button>
              <button
                type="button"
                className="admin-button admin-button-primary"
                disabled={!publishingConfigured}
              >
                Publish changes
              </button>
            </div>
          </section>
        </div>
      )}

      {showAddSection && (
        <div className="admin-modal-backdrop" role="presentation">
          <section
            className="admin-section-picker"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-section-title"
          >
            <header>
              <div>
                <p>Page builder</p>
                <h2 id="admin-section-title">Choose a section</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSection(false)}
                aria-label="Close section picker"
              >
                ×
              </button>
            </header>
            <div>
              {(
                [
                  ["hero", "Introduction", "Editorial opening with headline and action"],
                  ["tile-grid", "Tile collection", "Flexible cards for stories or topics"],
                  ["article-list", "Story list", "A structured reading index"],
                  ["text", "Text section", "Long-form context and supporting points"],
                  ["newsletter", "Signup block", "Field Notes call to action"],
                ] as const
              ).map(([type, label, description]) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => addSection(type)}
                >
                  <span>
                    <Icon>
                      {type === "tile-grid" ? (
                        <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
                      ) : type === "article-list" ? (
                        <path d="M5 6h14M5 12h14M5 18h14" />
                      ) : type === "newsletter" ? (
                        <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
                      ) : type === "text" ? (
                        <path d="M5 5h14M7 10h10M7 14h10M7 18h7" />
                      ) : (
                        <path d="M4 5h16v14H4zM7 15l3-3 3 3 2-2 3 3" />
                      )}
                    </Icon>
                  </span>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {notice && <div className="admin-toast">{notice}</div>}
    </main>
  );
}
