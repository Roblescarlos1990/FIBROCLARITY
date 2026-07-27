"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ASSET_ROOT = "/assets/xylens/living-lens";
const DESKTOP_MODEL = `${ASSET_ROOT}/XYLENS_Living_Lens_Desktop_v013_1.glb`;
const MOBILE_MODEL = `${ASSET_ROOT}/XYLENS_Living_Lens_Mobile_v013_1.glb`;
const POSTER = `${ASSET_ROOT}/XYLENS_Living_Lens_Poster.webp`;
const DRACO_DECODER = `${ASSET_ROOT}/draco/`;
const APPROVED_CLIP = "XYLENS_Living_Lens_FinalHero_v012";

type RuntimeMode = {
  asset: string;
  mobile: boolean;
  renderModel: boolean;
  fallbackReason: "none" | "reduced-motion" | "low-capability" | "no-webgl";
};

type ConnectionHints = {
  effectiveType?: string;
  saveData?: boolean;
};

type CapabilityNavigator = Navigator & {
  connection?: ConnectionHints;
  deviceMemory?: number;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const options = { failIfMajorPerformanceCaveat: true };
    const context =
      (canvas.getContext(
        "webgl2",
        options,
      ) as WebGL2RenderingContext | null) ??
      (canvas.getContext("webgl", options) as WebGLRenderingContext | null);

    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function isLowCapabilityDevice() {
  const capabilityNavigator = navigator as CapabilityNavigator;
  const connection = capabilityNavigator.connection;

  return (
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    (capabilityNavigator.deviceMemory !== undefined &&
      capabilityNavigator.deviceMemory <= 2) ||
    (navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 2)
  );
}

function localFallbackOverride(): RuntimeMode["fallbackReason"] | null {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const fallback = new URLSearchParams(window.location.search).get(
    "xylens-fallback",
  );

  if (
    fallback === "reduced-motion" ||
    fallback === "low-capability" ||
    fallback === "no-webgl"
  ) {
    return fallback;
  }

  return null;
}

function disposeMaterial(material: THREE.Material) {
  for (const value of Object.values(material)) {
    if (value instanceof THREE.Texture) {
      value.dispose();
    }
  }

  material.dispose();
}

function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.geometry.dispose();
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach(disposeMaterial);
  });
}

function tuneRuntimeGlass(root: THREE.Object3D) {
  const tunedMaterials = new Set<THREE.MeshPhysicalMaterial>();
  const tunedNames: string[] = [];

  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    for (const material of materials) {
      if (
        !(material instanceof THREE.MeshPhysicalMaterial) ||
        tunedMaterials.has(material)
      ) {
        continue;
      }

      const isMainGlass = material.name.includes("PaleAquaSeaGlass");
      const isFocalGlass = material.name.includes("IntegratedFocalMeniscus");

      if (!isMainGlass && !isFocalGlass) {
        continue;
      }

      tunedMaterials.add(material);
      tunedNames.push(material.name);
      material.ior = 1.46;
      material.transmission = isFocalGlass ? 0.97 : 0.95;
      material.thickness = isFocalGlass ? 0.14 : 0.3;
      material.roughness = isFocalGlass ? 0.055 : 0.085;
      material.color.setRGB(
        isFocalGlass ? 0.84 : 0.78,
        isFocalGlass ? 0.96 : 0.93,
        isFocalGlass ? 0.95 : 0.92,
      );
      material.attenuationColor.setRGB(
        isFocalGlass ? 0.55 : 0.42,
        isFocalGlass ? 0.88 : 0.78,
        isFocalGlass ? 0.84 : 0.76,
      );
      material.attenuationDistance = isFocalGlass ? 6.2 : 4.6;
      material.specularIntensity = isFocalGlass ? 0.4 : 0.34;
      material.clearcoat = 0.015;
      material.clearcoatRoughness = 0.18;
      material.envMapIntensity = isFocalGlass ? 0.65 : 0.68;
      material.transparent = true;
      material.opacity = isFocalGlass ? 0.36 : 0.44;
      material.depthWrite = false;
      material.alphaTest = 0;
      material.needsUpdate = true;
    }
  });

  return tunedNames;
}

export default function LivingLensHero() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [runtime, setRuntime] = useState<RuntimeMode | null>(null);
  const [renderState, setRenderState] = useState<
    "poster" | "loading" | "ready" | "fallback"
  >("poster");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 820px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateRuntime = () => {
      const mobile = mobileQuery.matches;
      const fallbackOverride = localFallbackOverride();
      let fallbackReason: RuntimeMode["fallbackReason"] = "none";

      if (fallbackOverride) {
        fallbackReason = fallbackOverride;
      } else if (reducedMotionQuery.matches) {
        fallbackReason = "reduced-motion";
      } else if (isLowCapabilityDevice()) {
        fallbackReason = "low-capability";
      } else if (!supportsWebGL()) {
        fallbackReason = "no-webgl";
      }

      setRenderState("poster");
      setRuntime({
        asset: mobile ? MOBILE_MODEL : DESKTOP_MODEL,
        mobile,
        renderModel: fallbackReason === "none",
        fallbackReason,
      });
    };

    updateRuntime();
    mobileQuery.addEventListener("change", updateRuntime);
    reducedMotionQuery.addEventListener("change", updateRuntime);

    return () => {
      mobileQuery.removeEventListener("change", updateRuntime);
      reducedMotionQuery.removeEventListener("change", updateRuntime);
    };
  }, []);

  useEffect(() => {
    const canvasHost = canvasHostRef.current;

    if (!canvasHost || !runtime) {
      return;
    }

    canvasHost.dataset.fallbackReason = runtime.fallbackReason;
    canvasHost.dataset.asset = runtime.asset;

    if (!runtime.renderModel) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !runtime.mobile,
        powerPreference: runtime.mobile ? "low-power" : "high-performance",
        premultipliedAlpha: true,
      });
    } catch {
      canvasHost.dataset.fallbackReason = "no-webgl";
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.AgXToneMapping;
    renderer.toneMappingExposure = 0.93;
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, runtime.mobile ? 1.25 : 1.6),
    );
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.tabIndex = -1;
    canvasHost.replaceChildren(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = null;
    scene.environmentIntensity = 0.72;
    const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
    const modelStage = new THREE.Group();
    scene.add(modelStage);

    const hemisphere = new THREE.HemisphereLight(0xd7f1f0, 0x806e58, 0.78);
    const key = new THREE.DirectionalLight(0xfff2dd, 1.45);
    const rim = new THREE.DirectionalLight(0xb9e8ee, 0.92);
    const fill = new THREE.DirectionalLight(0xdfe8e4, 0.58);
    key.position.set(-4.5, 5.5, 6);
    rim.position.set(5.5, 2.5, -3.5);
    fill.position.set(1.5, -2, 5);
    scene.add(hemisphere, key, rim, fill);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnvironment = new RoomEnvironment();
    const environmentTarget = pmrem.fromScene(roomEnvironment, 0.035);
    scene.environment = environmentTarget.texture;
    pmrem.dispose();

    let disposed = false;
    let modelRoot: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let modelSize: THREE.Vector3 | null = null;
    let modelReady = false;
    let visible = true;
    let pageVisible = document.visibilityState === "visible";
    let running = false;
    let animationFrame = 0;
    let previousTime = performance.now();
    let firstFrameRendered = false;

    const frameCamera = () => {
      if (!modelSize) {
        return;
      }

      const width = Math.max(canvasHost.clientWidth, 1);
      const height = Math.max(canvasHost.clientHeight, 1);
      camera.aspect = width / height;
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const distanceForHeight =
        modelSize.y / (2 * Math.tan(verticalFov / 2));
      const distanceForWidth =
        modelSize.x / (2 * Math.tan(verticalFov / 2) * camera.aspect);
      const distance =
        Math.max(distanceForHeight, distanceForWidth) +
        Math.max(modelSize.z * 0.52, 0.4);
      const breathingRoom = runtime.mobile ? 0.88 : 0.98;

      camera.position.set(0, 0, distance * breathingRoom);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    const resize = () => {
      const width = Math.max(canvasHost.clientWidth, 1);
      const height = Math.max(canvasHost.clientHeight, 1);
      renderer.setSize(width, height, false);
      frameCamera();
    };

    const renderFrame = (time: number) => {
      if (!running || disposed || !visible || !pageVisible || !modelReady) {
        running = false;
        return;
      }

      const delta = Math.min((time - previousTime) / 1000, 0.08);
      previousTime = time;
      mixer?.update(delta);
      renderer.render(scene, camera);

      if (!firstFrameRendered) {
        firstFrameRendered = true;
        setRenderState("ready");
      }

      animationFrame = requestAnimationFrame(renderFrame);
    };

    const startRendering = () => {
      if (
        running ||
        disposed ||
        !visible ||
        !pageVisible ||
        !modelReady
      ) {
        return;
      }

      running = true;
      canvasHost.dataset.rendering = "active";
      previousTime = performance.now();
      animationFrame = requestAnimationFrame(renderFrame);
    };

    const stopRendering = () => {
      running = false;
      canvasHost.dataset.rendering = "paused";
      cancelAnimationFrame(animationFrame);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvasHost);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          startRendering();
        } else {
          stopRendering();
        }
      },
      { rootMargin: "100px 0px", threshold: 0.01 },
    );
    intersectionObserver.observe(canvasHost);

    const handleVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) {
        startRendering();
      } else {
        stopRendering();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(DRACO_DECODER);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      runtime.asset,
      (gltf) => {
        if (disposed) {
          disposeObject(gltf.scene);
          return;
        }

        modelRoot = gltf.scene;
        modelStage.add(modelRoot);
        const tunedGlassMaterials = tuneRuntimeGlass(modelRoot);
        canvasHost.dataset.glassMaterials = tunedGlassMaterials.join(",");

        const clip =
          THREE.AnimationClip.findByName(gltf.animations, APPROVED_CLIP) ??
          gltf.animations[0];

        const animatedBounds = new THREE.Box3().makeEmpty();

        if (clip) {
          mixer = new THREE.AnimationMixer(modelRoot);
          const action = mixer.clipAction(clip);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.clampWhenFinished = false;
          action.play();

          const envelopeSamples = 48;
          for (let sample = 0; sample <= envelopeSamples; sample += 1) {
            mixer.setTime((clip.duration * sample) / envelopeSamples);
            modelRoot.updateMatrixWorld(true);
            animatedBounds.union(new THREE.Box3().setFromObject(modelRoot));
          }
          mixer.setTime(0);

          canvasHost.dataset.animationClip = clip.name;
          canvasHost.dataset.animationDuration = clip.duration.toFixed(6);
          canvasHost.dataset.envelopeSamples = String(envelopeSamples);
        } else {
          modelRoot.updateMatrixWorld(true);
          animatedBounds.setFromObject(modelRoot);
        }

        const center = animatedBounds.getCenter(new THREE.Vector3());
        modelSize = animatedBounds.getSize(new THREE.Vector3());
        modelRoot.position.sub(center);
        modelRoot.updateMatrixWorld(true);

        canvasHost.dataset.triangleTier = runtime.mobile
          ? "mobile-16458"
          : "desktop-31928";
        frameCamera();
        modelReady = true;
        startRendering();
      },
      undefined,
      () => {
        if (!disposed) {
          canvasHost.dataset.fallbackReason = "load-error";
          setRenderState("fallback");
        }
      },
    );

    return () => {
      disposed = true;
      stopRendering();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mixer?.stopAllAction();
      if (modelRoot) {
        disposeObject(modelRoot);
      }
      dracoLoader.dispose();
      environmentTarget.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [runtime]);

  return (
    <div
      className="living-lens-visual"
      data-render-state={renderState}
      aria-hidden="true"
    >
      <span className="living-lens-halo" />
      <picture className="living-lens-poster">
        <img
          src={POSTER}
          alt=""
          width="1920"
          height="1080"
          decoding="async"
          fetchPriority="high"
          draggable="false"
        />
      </picture>
      <div className="living-lens-canvas" ref={canvasHostRef} />
    </div>
  );
}
