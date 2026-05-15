import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/layout/providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-[#0F172A]">
        <Sidebar />
        <div className="lg:ml-64 min-h-screen">
          <Header />
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
