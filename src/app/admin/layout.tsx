import AdminProviders from "@/components/admin/AdminProviders";
import AdminLayoutContent from "@/components/admin/AdminLayoutContent";

export const metadata = {
  title: "Octoframes Admin Studio",
  description: "Management dashboard for Octoframes Agency",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminProviders>
  );
}
