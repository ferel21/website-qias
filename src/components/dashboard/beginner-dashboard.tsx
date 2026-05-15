import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard, SkeletonWidget } from "./kpi-card";
import { RevenueChart } from "./revenue-chart";
import { DistributionChart } from "./distribution-chart";

export function BeginnerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#1E40AF]/10 border border-[#3B82F6]/20 p-4 rounded-xl mb-6">
        <h3 className="text-[#3B82F6] font-medium mb-1">Mode Pemula — Template Dashboard</h3>
        <p className="text-sm text-slate-400">Anda menggunakan salah satu dari 18 template dashboard yang tersedia. Upgrade ke Pro untuk kustomisasi penuh.</p>
      </div>

      {/* KPI Grid - Simplified for beginners (only 2 main KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <KPICard
          title="Total Pendapatan"
          value="Rp 12.450.000"
          change="+12,5% dari kemarin"
          changeType="positive"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          }
        />
        <KPICard
          title="Jumlah Transaksi"
          value="847"
          change="+23 dari kemarin"
          changeType="positive"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
            </svg>
          }
        />
      </div>

      {/* Main Chart */}
      <Card className="border-white/5 bg-white/[0.02]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">Tren Pendapatan 7 Hari Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart />
        </CardContent>
      </Card>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Distribusi Kanal Pembayaran</CardTitle>
          </CardHeader>
          <CardContent>
            <DistributionChart />
          </CardContent>
        </Card>
        <SkeletonWidget title="Transaksi Terbaru" className="min-h-[250px]" />
      </div>
    </div>
  );
}
