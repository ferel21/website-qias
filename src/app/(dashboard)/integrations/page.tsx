"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PJSP_PROVIDERS = [
  { id: "GOPAY", name: "GoPay", color: "#00AA13", logo: "GP", desc: "Integrasi via Midtrans / GoBiz API", fields: ["Merchant ID", "Server Key", "Client Key"] },
  { id: "OVO", name: "OVO", color: "#4C3494", logo: "OV", desc: "Integrasi via OVO Business API", fields: ["Merchant ID", "API Key", "Secret Key"] },
  { id: "DANA", name: "DANA", color: "#108EE9", logo: "DA", desc: "Integrasi via DANA Merchant API", fields: ["Merchant ID", "API Key", "RSA Public Key"] },
  { id: "SHOPEEPAY", name: "ShopeePay", color: "#EE4D2D", logo: "SP", desc: "Integrasi via Shopee Partner API", fields: ["Merchant ID", "Partner Key", "Secret"] },
  { id: "LINKAJA", name: "LinkAja", color: "#E82529", logo: "LA", desc: "Integrasi via LinkAja Business API", fields: ["Merchant ID", "API Key", "Terminal ID"] },
  { id: "QRIS_GENERIC", name: "QRIS Umum", color: "#1E40AF", logo: "QR", desc: "QRIS standar Bank Indonesia (NMID)", fields: ["NMID", "Terminal ID", "Acquirer Bank"] },
];

interface Conn { pjspId: string; merchantId: string; date: string; }

export default function IntegrationsPage() {
  const [sel, setSel] = useState<string | null>(null);
  const [conns, setConns] = useState<Conn[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const provider = PJSP_PROVIDERS.find((p) => p.id === sel);
  const isConn = (id: string) => conns.some((c) => c.pjspId === id);

  async function connect() {
    if (!provider) return;
    setLoading(true);
    if (!provider.fields.every((f) => form[f]?.trim())) { toast.error("Semua field wajib diisi."); setLoading(false); return; }
    await new Promise((r) => setTimeout(r, 1500));
    setConns((p) => [...p.filter((c) => c.pjspId !== provider.id), { pjspId: provider.id, merchantId: form[provider.fields[0]] || "", date: new Date().toLocaleDateString("id-ID") }]);
    toast.success(`${provider.name} berhasil terhubung!`);
    setLoading(false); setSel(null); setForm({});
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Integrasi PJSP & QRIS</h2>
          <p className="text-sm text-slate-400 mt-0.5">Hubungkan akun merchant QRIS untuk pemrosesan transaksi otomatis</p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-300 border-0 w-fit">{conns.length} / {PJSP_PROVIDERS.length} Terhubung</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Pilih PJSP</p>
          {PJSP_PROVIDERS.map((pjsp) => (
            <button key={pjsp.id} type="button" onClick={() => { setSel(pjsp.id); setForm({}); }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${sel === pjsp.id ? "border-[#3B82F6] bg-[#1E40AF]/10" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-xs flex-shrink-0" style={{ backgroundColor: pjsp.color }}>{pjsp.logo}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{pjsp.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{pjsp.desc}</p>
              </div>
              {isConn(pjsp.id) && <div className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {provider ? (
            <Card className="border-white/10 bg-white/[0.02]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white" style={{ backgroundColor: provider.color }}>{provider.logo}</div>
                  <div><CardTitle className="text-white">{provider.name}</CardTitle><CardDescription className="text-slate-400">{provider.desc}</CardDescription></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isConn(provider.id) ? (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                      <div className="flex items-center gap-2 mb-2"><div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" /><span className="text-sm font-medium text-green-400">Terhubung</span></div>
                      <p className="text-xs text-slate-400">Merchant ID: {conns.find((c) => c.pjspId === provider.id)?.merchantId}</p>
                      <p className="text-xs text-slate-500 mt-1">Sejak: {conns.find((c) => c.pjspId === provider.id)?.date}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Webhook URL (masukkan di panel merchant)</Label>
                      <div className="flex gap-2">
                        <Input readOnly value={`https://qias.app/api/webhook/${provider.id.toLowerCase()}`} className="bg-white/5 border-white/10 text-slate-300 text-xs font-mono" />
                        <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 flex-shrink-0" onClick={() => { navigator.clipboard.writeText(`https://qias.app/api/webhook/${provider.id.toLowerCase()}`); toast.success("URL disalin!"); }}>Salin</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => { setConns((p) => p.filter((c) => c.pjspId !== provider.id)); toast.info("Koneksi diputus."); }}>Putuskan Koneksi</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3"><p className="text-xs text-blue-300">💡 Dapatkan kredensial API dari panel merchant {provider.name} Anda.</p></div>
                    {provider.fields.map((field) => (
                      <div key={field} className="space-y-2">
                        <Label className="text-slate-300">{field}</Label>
                        <Input type={field.toLowerCase().includes("key") || field.toLowerCase().includes("secret") ? "password" : "text"} placeholder={`Masukkan ${field}`} value={form[field] || ""} onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                      </div>
                    ))}
                    <Button onClick={connect} disabled={loading} className="w-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] hover:from-[#1E3A8A] hover:to-[#2563EB] text-white">
                      {loading ? "Menghubungkan..." : `Hubungkan ${provider.name}`}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-white/10 bg-white/[0.02] flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1E40AF]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Pilih Penyedia Layanan</h3>
                <p className="text-sm text-slate-400 max-w-xs">Pilih PJSP di sebelah kiri untuk menghubungkan akun merchant QRIS Anda</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
