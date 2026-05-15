"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Notif {
  id: string;
  type: "transaction" | "alert" | "system" | "anomaly";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const SAMPLE_NOTIFS: Notif[] = [
  { id: "1", type: "transaction", title: "Transaksi Masuk — GoPay", message: "Rp 250.000 diterima dari QRIS GoPay (TXN-GP-001)", time: "2 menit lalu", read: false },
  { id: "2", type: "transaction", title: "Transaksi Masuk — DANA", message: "Rp 175.000 diterima dari QRIS DANA (TXN-DA-002)", time: "15 menit lalu", read: false },
  { id: "3", type: "anomaly", title: "⚠️ Anomali Terdeteksi", message: "Transaksi Rp 5.500.000 melebihi rata-rata harian (3x lipat). Mohon verifikasi.", time: "1 jam lalu", read: false },
  { id: "4", type: "alert", title: "MDR Berubah — ShopeePay", message: "Rate MDR ShopeePay berubah dari 0.7% menjadi 0.6% efektif 1 Juni 2024", time: "3 jam lalu", read: true },
  { id: "5", type: "system", title: "Laporan Bulanan Siap", message: "Laporan Laba Rugi April 2024 telah digenerate otomatis dan siap diunduh", time: "5 jam lalu", read: true },
  { id: "6", type: "transaction", title: "Transaksi Masuk — OVO", message: "Rp 320.000 diterima dari QRIS OVO (TXN-OV-004)", time: "6 jam lalu", read: true },
  { id: "7", type: "system", title: "Backup Data Berhasil", message: "Backup otomatis database selesai. Data aman tersimpan.", time: "12 jam lalu", read: true },
  { id: "8", type: "alert", title: "Masa Uji Coba", message: "Masa uji coba gratis Anda tersisa 28 hari. Upgrade ke Pro untuk fitur lengkap.", time: "1 hari lalu", read: true },
];

const TYPE_CONFIG = {
  transaction: { color: "bg-green-500/20 text-green-300", icon: "💳", label: "Transaksi" },
  alert: { color: "bg-amber-500/20 text-amber-300", icon: "🔔", label: "Peringatan" },
  system: { color: "bg-blue-500/20 text-blue-300", icon: "⚙️", label: "Sistem" },
  anomaly: { color: "bg-red-500/20 text-red-300", icon: "🚨", label: "Anomali" },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(SAMPLE_NOTIFS);
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = notifs.filter((n) => !n.read).length;
  const filtered = filter === "all" ? notifs : notifs.filter((n) => n.type === filter);

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleRead(id: string) {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Notifikasi</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-sm" onClick={markAllRead}>
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {[{ key: "all", label: "Semua" }, { key: "transaction", label: "💳 Transaksi" }, { key: "anomaly", label: "🚨 Anomali" }, { key: "alert", label: "🔔 Peringatan" }, { key: "system", label: "⚙️ Sistem" }].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === f.key ? "bg-[#1E40AF] text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filtered.map((n) => {
          const cfg = TYPE_CONFIG[n.type];
          return (
            <Card key={n.id} className={`border-white/5 transition-all cursor-pointer hover:bg-white/[0.04] ${n.read ? "bg-white/[0.01]" : "bg-white/[0.03] border-l-2 border-l-[#3B82F6]"}`}
              onClick={() => toggleRead(n.id)}>
              <CardContent className="py-3 flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{cfg.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm font-medium ${n.read ? "text-slate-400" : "text-white"}`}>{n.title}</p>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-[#3B82F6] flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500">{n.message}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge className={`${cfg.color} border-0 text-[10px]`}>{cfg.label}</Badge>
                    <span className="text-[10px] text-slate-600">{n.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
