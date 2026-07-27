import AdminEntry from "./AdminEntry";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminEntry publishingConfigured={false} />;
}
