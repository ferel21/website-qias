"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const BUSINESS_CATEGORIES = [
  "Makanan & Minuman",
  "Fashion & Pakaian",
  "Elektronik",
  "Jasa & Layanan",
  "Kesehatan & Kecantikan",
  "Pendidikan",
  "Pertanian",
  "Kerajinan & Seni",
  "Otomotif",
  "Lainnya",
];

const PJSP_PROVIDERS = [
  { id: "GOPAY", name: "GoPay", color: "#00AA13" },
  { id: "OVO", name: "OVO", color: "#4C3494" },
  { id: "DANA", name: "DANA", color: "#108EE9" },
  { id: "SHOPEEPAY", name: "ShopeePay", color: "#EE4D2D" },
  { id: "LINKAJA", name: "LinkAja", color: "#E82529" },
  { id: "QRIS_GENERIC", name: "QRIS Umum", color: "#1E40AF" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 data
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessCity, setBusinessCity] = useState("");

  // Step 2 data
  const [selectedTier, setSelectedTier] = useState<"PEMULA" | "PRO">("PEMULA");

  // Step 3 data
  const [selectedPJSP, setSelectedPJSP] = useState<string[]>([]);

  const totalSteps = 4;
  const progressPercent = (step / totalSteps) * 100;

  function nextStep() {
    if (step === 1) {
      if (!businessName || !businessCategory || !businessCity) {
        toast.error("Semua field wajib diisi.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function togglePJSP(id: string) {
    setSelectedPJSP((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  async function handleComplete() {
    setIsLoading(true);
    try {
      // In a real app, this would call the completeOnboarding server action
      // For now we simulate success
      toast.success("Selamat datang di QIAS! 🎉");
      router.push("/dashboard");
    } catch {
      toast.error("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#1E40AF] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#3B82F6] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-white">Selamat Datang di QIAS</h1>
          <p className="text-slate-400 mt-1">Atur profil usaha Anda dalam beberapa langkah</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {["Profil Usaha", "Pilih Paket", "Hubungkan PJSP", "Pratinjau"].map(
              (label, i) => (
                <span
                  key={label}
                  className={`text-xs font-medium transition-colors ${
                    i + 1 <= step ? "text-[#3B82F6]" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
              )
            )}
          </div>
          <Progress value={progressPercent} className="h-2 bg-white/10" />
        </div>

        {/* Step Cards */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl animate-slide-up">
          {/* Step 1: Business Profile */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1E40AF] text-sm font-bold">1</span>
                  Profil Usaha
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Ceritakan tentang usaha Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Nama Usaha</Label>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Contoh: Warung Makan Bu Ani"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Kategori Usaha</Label>
                  <Select value={businessCategory} onValueChange={(v) => { if (v) setBusinessCategory(v); }}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Kota</Label>
                  <Input
                    value={businessCity}
                    onChange={(e) => setBusinessCity(e.target.value)}
                    placeholder="Contoh: Jakarta"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
              </CardContent>
            </>
          )}

          {/* Step 2: Tier Selection */}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1E40AF] text-sm font-bold">2</span>
                  Pilih Paket
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Pilih paket berlangganan yang sesuai kebutuhan usaha Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pemula Card */}
                <button
                  type="button"
                  onClick={() => setSelectedTier("PEMULA")}
                  className={`relative p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedTier === "PEMULA"
                      ? "border-[#3B82F6] bg-[#1E40AF]/10 shadow-lg shadow-blue-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  {selectedTier === "PEMULA" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <Badge className="bg-blue-500/20 text-blue-300 border-0 mb-2">Pemula</Badge>
                  <h3 className="text-lg font-semibold text-white">Versi Pemula</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-bold text-white">Rp 49.000</span>
                    <span className="text-xs text-slate-500">/bulan</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">18 template dashboard siap pakai untuk UMKM</p>
                  <ul className="mt-3 space-y-1.5">
                    {["18 template dashboard profesional", "8 KPI widget otomatis", "Laporan SAK EMKM", "1 integrasi PJSP", "Pilih & aktifkan template"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                        <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>

                {/* Pro Card */}
                <button
                  type="button"
                  onClick={() => setSelectedTier("PRO")}
                  className={`relative p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedTier === "PRO"
                      ? "border-[#8B5CF6] bg-[#7C3AED]/10 shadow-lg shadow-purple-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="absolute top-3 right-3">
                    {selectedTier === "PRO" ? (
                      <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <Badge className="bg-purple-500/20 text-purple-300 border-0">PRO</Badge>
                    )}
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-0 mb-2">Professional</Badge>
                  <h3 className="text-lg font-semibold text-white">Versi Pro</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-bold text-white">Rp 149.000</span>
                    <span className="text-xs text-slate-500">/bulan</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">Kustomisasi penuh sesuai keinginan Anda</p>
                  <ul className="mt-3 space-y-1.5">
                    {["Semua 18 template + kustom", "Drag-and-drop dashboard", "Buat widget sendiri", "Multi-PJSP unlimited", "Ekspor PDF/Excel/CSV"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                        <svg className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              </CardContent>
            </>
          )}

          {/* Step 3: PJSP Connection */}
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1E40AF] text-sm font-bold">3</span>
                  Hubungkan PJSP
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Pilih penyedia layanan pembayaran yang Anda gunakan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PJSP_PROVIDERS.map((pjsp) => (
                    <button
                      key={pjsp.id}
                      type="button"
                      onClick={() => togglePJSP(pjsp.id)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedPJSP.includes(pjsp.id)
                          ? "border-[#3B82F6] bg-[#1E40AF]/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                        style={{ backgroundColor: pjsp.color }}
                      >
                        {pjsp.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm text-slate-300 font-medium">{pjsp.name}</span>
                      {selectedPJSP.includes(pjsp.id) && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  Anda dapat menambahkan lebih banyak PJSP nanti di halaman Integrasi
                </p>
              </CardContent>
            </>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#16A34A] text-sm font-bold">✓</span>
                  Pratinjau Dashboard
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Semua siap! Berikut ringkasan pengaturan Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Nama Usaha</span>
                    <span className="text-sm text-white font-medium">{businessName || "-"}</span>
                  </div>
                  <div className="border-t border-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Kategori</span>
                    <span className="text-sm text-white font-medium">{businessCategory || "-"}</span>
                  </div>
                  <div className="border-t border-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Kota</span>
                    <span className="text-sm text-white font-medium">{businessCity || "-"}</span>
                  </div>
                  <div className="border-t border-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Paket</span>
                    <Badge className={selectedTier === "PRO" ? "bg-purple-500/20 text-purple-300 border-0" : "bg-blue-500/20 text-blue-300 border-0"}>
                      Versi {selectedTier === "PRO" ? "Pro" : "Pemula"}
                    </Badge>
                  </div>
                  <div className="border-t border-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">PJSP Terhubung</span>
                    <span className="text-sm text-white font-medium">
                      {selectedPJSP.length > 0
                        ? selectedPJSP
                            .map((id) => PJSP_PROVIDERS.find((p) => p.id === id)?.name)
                            .join(", ")
                        : "Belum ada"}
                    </span>
                  </div>
                </div>

                {/* Mock Dashboard Preview */}
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Pratinjau Dashboard</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Total Pendapatan", "Jumlah Transaksi", "Rata-rata Transaksi", "Saldo Kas"].map((kpi) => (
                      <div key={kpi} className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase">{kpi}</p>
                        <div className="h-4 bg-white/10 rounded mt-2 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between p-6 pt-2">
            {step > 1 ? (
              <Button variant="ghost" onClick={prevStep} className="text-slate-400 hover:text-white">
                ← Kembali
              </Button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] hover:from-[#1E3A8A] hover:to-[#2563EB] text-white px-8"
              >
                Selanjutnya →
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] hover:from-[#15803D] hover:to-[#16A34A] text-white px-8 shadow-lg shadow-green-500/25"
              >
                {isLoading ? "Menyimpan..." : "Mulai Sekarang 🚀"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
