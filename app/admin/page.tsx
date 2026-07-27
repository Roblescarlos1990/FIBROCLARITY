import AdminStudio from "./AdminStudio";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminStudio publishingConfigured={false} />;
}
