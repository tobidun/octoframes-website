"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-black text-white flex overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </AdminAuthGuard>
  );
}
