"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TEMPLATE_PREVIEWS = [
  { id: 1, name: "Ringkasan Harian", category: "Umum" },
  { id: 2, name: "Analisis Penjualan", category: "Penjualan" },
  { id: 3, name: "Laporan Kas Harian", category: "Keuangan" },
  { id: 4, name: "Performa QRIS", category: "Pembayaran" },
  { id: 5, name: "Tren Mingguan", category: "Analitik" },
  { id: 6, name: "Top Produk", category: "Penjualan" },
  { id: 7, name: "Arus Kas Masuk/Keluar", category: "Keuangan" },
  { id: 8, name: "Distribusi Pembayaran", category: "Pembayaran" },
  { id: 9, name: "Laporan Bulanan", category: "Keuangan" },
  { id: 10, name: "Pelanggan Aktif", category: "Pelanggan" },
  { id: 11, name: "Perbandingan Periode", category: "Analitik" },
  { id: 12, name: "Rekonsiliasi PJSP", category: "Pembayaran" },
  { id: 13, name: "Neraca Sederhana", category: "Keuangan" },
  { id: 14, name: "Laba Rugi", category: "Keuangan" },
  { id: 15, name: "KPI Utama", category: "Umum" },
  { id: 16, name: "Jam Sibuk Transaksi", category: "Analitik" },
  { id: 17, name: "Target vs Realisasi", category: "Umum" },
  { id: 18, name: "Ringkasan SAK EMKM", category: "Keuangan" },
];

const PLANS = [
  {
    id: "PEMULA",
    name: "Versi Pemula",
    price: "Rp 49.000",
    priceNote: "/bulan",
    color: "#3B82F6",
    badge: "Pemula",
    tagline: "18 Template Dashboard Siap Pakai",
    features: [
      "18 template dashboard profesional",
      "8 KPI widget otomatis",
      "Pilih & aktifkan template sesuai kebutuhan",
      "Laporan SAK EMKM dasar",
      "Jurnal otomatis dari QRIS",
      "1 integrasi PJSP",
      "Notifikasi transaksi",
      "Ekspor laporan PDF",
      "Dukungan email",
    ],
    limits: [
      "Maks 500 transaksi/bulan",
      "1 pengguna",
      "Tanpa kustomisasi layout (template only)",
    ],
  },
  {
    id: "PRO",
    name: "Versi Pro",
    price: "Rp 149.000",
    priceNote: "/bulan",
    color: "#8B5CF6",
    badge: "Professional",
    popular: true,
    tagline: "Kustomisasi Penuh Sesuai Keinginan",
    features: [
      "Semua 18 template + kustomisasi penuh",
      "Drag-and-drop dashboard builder",
      "Buat widget & layout sendiri",
      "20+ komponen visualisasi",
      "Multi-PJSP integrasi (unlimited)",
      "Laporan SAK EMKM lengkap",
      "Rekonsiliasi bank otomatis",
      "Deteksi anomali AI",
      "Ekspor PDF, Excel, CSV",
      "Multi-pengguna (hingga 5)",
      "API akses untuk integrasi",
      "Dukungan prioritas 24/7",
    ],
    limits: [
      "Transaksi unlimited",
      "Hingga 5 pengguna",
      "Kustomisasi layout & widget tanpa batas",
    ],
  },
];

export default function PricingPage() {
  const [currentPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  async function handleSubscribe(planId: string) {
    setLoading(planId);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success(
      planId === "PRO"
        ? "Berlangganan Pro berhasil! Selamat menikmati kustomisasi penuh 🎉"
        : "Berlangganan Pemula berhasil! 18 template dashboard siap digunakan 🎉"
    );
    setLoading(null);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white">Pilih Paket Anda</h2>
        <p className="text-sm text-slate-400 mt-2">
          Mulai dari template siap pakai atau kustomisasi penuh sesuai kebutuhan bisnis Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PLANS.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <Card key={plan.id}
              className={`relative border-2 transition-all ${
                plan.popular ? "border-[#8B5CF6] bg-[#7C3AED]/5 shadow-lg shadow-purple-500/10" : "border-white/10 bg-white/[0.02]"
              }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white border-0 px-3 py-0.5">
                    Paling Populer
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <Badge className={`mx-auto w-fit border-0 mb-3 ${plan.id === "PRO" ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}>
                  {plan.badge}
                </Badge>
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <p className="text-xs text-slate-500 mt-1 font-medium">{plan.tagline}</p>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-500 ml-1">{plan.priceNote}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-4 space-y-1.5">
                  {plan.limits.map((l) => (
                    <p key={l} className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      {l}
                    </p>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading !== null}
                  className={`w-full py-5 font-semibold ${
                    plan.id === "PRO"
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#6D28D9] hover:to-[#7C3AED] text-white shadow-lg shadow-purple-500/25"
                      : isCurrent
                      ? "bg-white/5 text-slate-400 border border-white/10"
                      : "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white"
                  }`}
                >
                  {loading === plan.id
                    ? "Memproses..."
                    : isCurrent
                    ? "Paket Saat Ini"
                    : plan.id === "PRO"
                    ? "Berlangganan Pro 🚀"
                    : "Berlangganan Pemula"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Template Preview Section */}
      <Card className="border-white/5 bg-white/[0.02] max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                18 Template Dashboard Tersedia
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">Template siap pakai untuk paket Pemula &amp; Pro</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-[#3B82F6] hover:text-[#60A5FA] text-xs"
            >
              {showTemplates ? "Sembunyikan" : "Lihat Semua"} →
            </Button>
          </div>
        </CardHeader>
        {showTemplates && (
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {TEMPLATE_PREVIEWS.map((template) => (
                <div
                  key={template.id}
                  className="group relative rounded-xl border border-white/10 bg-white/5 hover:border-[#3B82F6]/30 hover:bg-[#1E40AF]/5 transition-all duration-300 p-3 cursor-pointer"
                >
                  {/* Mini dashboard preview skeleton */}
                  <div className="aspect-[4/3] rounded-lg bg-slate-800/50 border border-white/5 p-2 mb-2 overflow-hidden">
                    <div className="w-full h-1.5 bg-white/10 rounded mb-1.5" />
                    <div className="grid grid-cols-2 gap-1 mb-1.5">
                      <div className="h-3 bg-white/5 rounded" />
                      <div className="h-3 bg-white/5 rounded" />
                    </div>
                    <div className="w-full h-6 bg-white/5 rounded mb-1" />
                    <div className="grid grid-cols-2 gap-1">
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/5 rounded" />
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-white truncate">{template.name}</p>
                  <p className="text-[9px] text-slate-500">{template.category}</p>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Comparison Table */}
      <Card className="border-white/5 bg-white/[0.02] max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white text-base">Perbandingan Fitur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-slate-400 py-3 px-4 font-medium">Fitur</th>
                  <th className="text-center text-blue-400 py-3 px-4 font-medium">
                    Pemula
                    <span className="block text-[10px] text-slate-500 font-normal">Rp 49.000/bln</span>
                  </th>
                  <th className="text-center text-purple-400 py-3 px-4 font-medium">
                    Pro
                    <span className="block text-[10px] text-slate-500 font-normal">Rp 149.000/bln</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { feature: "Template dashboard", pemula: "18 template", pro: "18 template + kustom" },
                  { feature: "Kustomisasi layout", pemula: "—", pro: "✓ Drag & drop" },
                  { feature: "Buat widget sendiri", pemula: "—", pro: "✓ Unlimited" },
                  { feature: "KPI widget", pemula: "8 otomatis", pro: "20+ komponen" },
                  { feature: "Integrasi PJSP", pemula: "1 PJSP", pro: "Unlimited" },
                  { feature: "Ekspor laporan", pemula: "PDF", pro: "PDF, Excel, CSV" },
                  { feature: "Pengguna", pemula: "1", pro: "Hingga 5" },
                  { feature: "Transaksi/bulan", pemula: "Maks 500", pro: "Unlimited" },
                  { feature: "Rekonsiliasi bank", pemula: "—", pro: "✓ Otomatis" },
                  { feature: "Deteksi anomali AI", pemula: "—", pro: "✓" },
                  { feature: "API akses", pemula: "—", pro: "✓" },
                  { feature: "Dukungan", pemula: "Email", pro: "Prioritas 24/7" },
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-4 text-slate-300">{row.feature}</td>
                    <td className="py-2.5 px-4 text-center text-slate-400">{row.pemula}</td>
                    <td className="py-2.5 px-4 text-center text-slate-300">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-white/5 bg-white/[0.02] max-w-4xl mx-auto">
        <CardHeader><CardTitle className="text-white text-base">Pertanyaan Umum</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { q: "Apa perbedaan utama Pemula dan Pro?", a: "Paket Pemula menyediakan 18 template dashboard siap pakai yang tinggal dipilih dan diaktifkan. Paket Pro memberikan kebebasan penuh untuk mengkustomisasi layout, membuat widget sendiri, dan mengatur dashboard sesuai keinginan." },
            { q: "Apakah bisa upgrade dari Pemula ke Pro?", a: "Ya, Anda bisa upgrade kapan saja. Semua data dan pengaturan Anda tetap tersimpan aman." },
            { q: "Bagaimana metode pembayarannya?", a: "Kami menerima transfer bank, QRIS, dan kartu kredit/debit untuk kedua paket." },
            { q: "Apakah ada masa uji coba?", a: "Ya, kedua paket memiliki masa uji coba gratis 14 hari. Setelah itu Anda bisa memilih untuk berlangganan." },
            { q: "Apakah template Pemula juga tersedia di Pro?", a: "Ya! Paket Pro mendapatkan semua 18 template yang ada di Pemula, ditambah kemampuan membuat layout dan widget kustom sendiri." },
          ].map((faq) => (
            <div key={faq.q}>
              <p className="text-sm font-medium text-white">{faq.q}</p>
              <p className="text-xs text-slate-400 mt-0.5">{faq.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
