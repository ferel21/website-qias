"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function formatRp(n: number) { return `Rp ${n.toLocaleString("id-ID")}`; }

const REPORTS = [
  { id: "income", name: "Laporan Laba Rugi", desc: "Pendapatan dan beban periode berjalan", icon: "📊" },
  { id: "balance", name: "Laporan Posisi Keuangan", desc: "Neraca aset, liabilitas, dan ekuitas", icon: "⚖️" },
  { id: "cashflow", name: "Laporan Arus Kas", desc: "Arus masuk dan keluar kas", icon: "💰" },
  { id: "calk", name: "Catatan Atas Laporan Keuangan", desc: "Penjelasan kebijakan akuntansi (SAK EMKM)", icon: "📝" },
];

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState("income");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Laporan Keuangan</h2>
          <p className="text-sm text-slate-400 mt-0.5">Laporan otomatis sesuai standar SAK EMKM</p>
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue="monthly">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="monthly" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">Bulanan</TabsTrigger>
              <TabsTrigger value="quarterly" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">Triwulan</TabsTrigger>
              <TabsTrigger value="yearly" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">Tahunan</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-sm">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Ekspor PDF
          </Button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {REPORTS.map((r) => (
          <button key={r.id} onClick={() => setActiveReport(r.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${activeReport === r.id ? "border-[#3B82F6] bg-[#1E40AF]/10" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}>
            <span className="text-2xl">{r.icon}</span>
            <p className="text-sm font-medium text-white mt-2">{r.name}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
          </button>
        ))}
      </div>

      {/* Laba Rugi */}
      {activeReport === "income" && (
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader><CardTitle className="text-white text-base">Laporan Laba Rugi — Mei 2024</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium py-2">Pendapatan</p>
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02]"><span className="text-sm text-slate-300">Pendapatan Usaha (QRIS)</span><span className="text-sm text-white font-mono">{formatRp(12450000)}</span></div>
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02]"><span className="text-sm text-slate-300">Pendapatan Lain-lain</span><span className="text-sm text-white font-mono">{formatRp(350000)}</span></div>
              <div className="flex justify-between py-2 px-3 border-t border-white/5 font-semibold"><span className="text-sm text-blue-300">Total Pendapatan</span><span className="text-sm text-blue-300 font-mono">{formatRp(12800000)}</span></div>

              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium py-2 mt-4">Beban</p>
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02]"><span className="text-sm text-slate-300">Beban Bahan Baku</span><span className="text-sm text-white font-mono">{formatRp(4200000)}</span></div>
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02]"><span className="text-sm text-slate-300">Beban MDR QRIS</span><span className="text-sm text-white font-mono">{formatRp(87150)}</span></div>
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02]"><span className="text-sm text-slate-300">Beban Gaji</span><span className="text-sm text-white font-mono">{formatRp(3000000)}</span></div>
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02]"><span className="text-sm text-slate-300">Beban Sewa</span><span className="text-sm text-white font-mono">{formatRp(1500000)}</span></div>
              <div className="flex justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02]"><span className="text-sm text-slate-300">Beban Operasional Lain</span><span className="text-sm text-white font-mono">{formatRp(500000)}</span></div>
              <div className="flex justify-between py-2 px-3 border-t border-white/5 font-semibold"><span className="text-sm text-red-300">Total Beban</span><span className="text-sm text-red-300 font-mono">{formatRp(9287150)}</span></div>

              <div className="flex justify-between py-3 px-4 mt-4 rounded-xl bg-green-500/10 border border-green-500/20 font-bold">
                <span className="text-green-300">LABA BERSIH</span>
                <span className="text-green-300 font-mono text-lg">{formatRp(3512850)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Neraca */}
      {activeReport === "balance" && (
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader><CardTitle className="text-white text-base">Laporan Posisi Keuangan — 2 Mei 2024</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium py-2">ASET</p>
                <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Kas & Setara Kas</span><span className="text-sm text-white font-mono">{formatRp(45230000)}</span></div>
                <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Piutang Usaha</span><span className="text-sm text-white font-mono">{formatRp(2500000)}</span></div>
                <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Persediaan</span><span className="text-sm text-white font-mono">{formatRp(8750000)}</span></div>
                <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Peralatan</span><span className="text-sm text-white font-mono">{formatRp(15000000)}</span></div>
                <div className="flex justify-between py-2 px-3 border-t border-white/5 font-semibold"><span className="text-sm text-blue-300">Total Aset</span><span className="text-sm text-blue-300 font-mono">{formatRp(71480000)}</span></div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium py-2">LIABILITAS & EKUITAS</p>
                <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Utang Usaha</span><span className="text-sm text-white font-mono">{formatRp(3200000)}</span></div>
                <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Utang Bank</span><span className="text-sm text-white font-mono">{formatRp(10000000)}</span></div>
                <div className="flex justify-between py-2 px-3 border-t border-white/5"><span className="text-sm text-slate-400">Total Liabilitas</span><span className="text-sm text-slate-400 font-mono">{formatRp(13200000)}</span></div>
                <div className="flex justify-between py-2 px-3 mt-2"><span className="text-sm text-slate-300">Modal Pemilik</span><span className="text-sm text-white font-mono">{formatRp(50000000)}</span></div>
                <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Laba Ditahan</span><span className="text-sm text-white font-mono">{formatRp(8280000)}</span></div>
                <div className="flex justify-between py-2 px-3 border-t border-white/5 font-semibold"><span className="text-sm text-blue-300">Total Liabilitas & Ekuitas</span><span className="text-sm text-blue-300 font-mono">{formatRp(71480000)}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Arus Kas */}
      {activeReport === "cashflow" && (
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader><CardTitle className="text-white text-base">Laporan Arus Kas — Mei 2024</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium py-2">Arus Kas dari Aktivitas Operasi</p>
            <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Penerimaan dari penjualan (QRIS)</span><span className="text-sm text-green-300 font-mono">+{formatRp(12450000)}</span></div>
            <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Pembayaran bahan baku</span><span className="text-sm text-red-300 font-mono">-{formatRp(4200000)}</span></div>
            <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Pembayaran gaji</span><span className="text-sm text-red-300 font-mono">-{formatRp(3000000)}</span></div>
            <div className="flex justify-between py-2 px-3"><span className="text-sm text-slate-300">Beban operasional lain</span><span className="text-sm text-red-300 font-mono">-{formatRp(2087150)}</span></div>
            <div className="flex justify-between py-3 px-4 mt-2 rounded-xl bg-blue-500/10 border border-blue-500/20 font-bold"><span className="text-blue-300">Arus Kas Bersih Operasi</span><span className="text-blue-300 font-mono">{formatRp(3162850)}</span></div>
          </CardContent>
        </Card>
      )}

      {/* CALK */}
      {activeReport === "calk" && (
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader><CardTitle className="text-white text-base">Catatan Atas Laporan Keuangan</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div><p className="font-medium text-white mb-1">1. Gambaran Umum</p><p className="text-slate-400">Laporan keuangan ini disusun berdasarkan SAK EMKM yang diterbitkan oleh Ikatan Akuntan Indonesia (IAI), khusus untuk entitas mikro, kecil, dan menengah.</p></div>
            <div><p className="font-medium text-white mb-1">2. Kebijakan Akuntansi</p><p className="text-slate-400">Pendapatan diakui pada saat transaksi QRIS berhasil diproses. Basis pencatatan menggunakan akrual sesuai SAK EMKM. Biaya MDR dicatat sebagai beban pada periode terjadinya.</p></div>
            <div><p className="font-medium text-white mb-1">3. Kas & Setara Kas</p><p className="text-slate-400">Saldo kas mencakup dana dari seluruh kanal PJSP yang terhubung melalui QIAS, termasuk GoPay, OVO, DANA, ShopeePay, dan LinkAja.</p></div>
            <div><p className="font-medium text-white mb-1">4. Pendapatan Usaha</p><p className="text-slate-400">Seluruh pendapatan usaha berasal dari transaksi QRIS yang diproses melalui Payment Jasa Sistem Pembayaran (PJSP) yang terdaftar di Bank Indonesia.</p></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
