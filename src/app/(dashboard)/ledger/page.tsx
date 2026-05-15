"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SAMPLE_ENTRIES = [
  { id: "JE-001", date: "2024-05-02", desc: "Penjualan QRIS - GoPay", debit: "Kas", credit: "Pendapatan Usaha", amount: 250000, ref: "TXN-GP-001" },
  { id: "JE-002", date: "2024-05-02", desc: "Penjualan QRIS - DANA", debit: "Kas", credit: "Pendapatan Usaha", amount: 175000, ref: "TXN-DA-002" },
  { id: "JE-003", date: "2024-05-02", desc: "Biaya MDR GoPay (0.7%)", debit: "Beban MDR", credit: "Kas", amount: 1750, ref: "MDR-GP-001" },
  { id: "JE-004", date: "2024-05-01", desc: "Penjualan QRIS - ShopeePay", debit: "Kas", credit: "Pendapatan Usaha", amount: 450000, ref: "TXN-SP-003" },
  { id: "JE-005", date: "2024-05-01", desc: "Penjualan QRIS - OVO", debit: "Kas", credit: "Pendapatan Usaha", amount: 320000, ref: "TXN-OV-004" },
  { id: "JE-006", date: "2024-05-01", desc: "Biaya MDR OVO (0.7%)", debit: "Beban MDR", credit: "Kas", amount: 2240, ref: "MDR-OV-002" },
  { id: "JE-007", date: "2024-04-30", desc: "Penjualan QRIS - LinkAja", debit: "Kas", credit: "Pendapatan Usaha", amount: 180000, ref: "TXN-LA-005" },
  { id: "JE-008", date: "2024-04-30", desc: "Pembelian Bahan Baku", debit: "Persediaan", credit: "Kas", amount: 500000, ref: "PO-001" },
];

const ACCOUNTS = [
  { code: "1-1000", name: "Kas", type: "Aset", balance: 45230000 },
  { code: "1-2000", name: "Piutang Usaha", type: "Aset", balance: 2500000 },
  { code: "1-3000", name: "Persediaan", type: "Aset", balance: 8750000 },
  { code: "2-1000", name: "Utang Usaha", type: "Liabilitas", balance: 3200000 },
  { code: "3-1000", name: "Modal", type: "Ekuitas", balance: 50000000 },
  { code: "4-1000", name: "Pendapatan Usaha", type: "Pendapatan", balance: 12450000 },
  { code: "5-1000", name: "Beban MDR", type: "Beban", balance: 87150 },
  { code: "5-2000", name: "Beban Operasional", type: "Beban", balance: 1500000 },
];

function formatRp(n: number) { return `Rp ${n.toLocaleString("id-ID")}`; }

export default function LedgerPage() {
  const [view, setView] = useState<"journal" | "accounts">("journal");
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_ENTRIES.filter((e) =>
    e.desc.toLowerCase().includes(search.toLowerCase()) || e.ref.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Buku Besar</h2>
          <p className="text-sm text-slate-400 mt-0.5">Jurnal umum dan daftar akun (SAK EMKM)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-sm">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Ekspor
          </Button>
          <Button className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white text-sm">+ Jurnal Baru</Button>
        </div>
      </div>

      <Tabs value={view} onValueChange={(v) => { if (v) setView(v as "journal" | "accounts"); }}>
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="journal" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">Jurnal Umum</TabsTrigger>
          <TabsTrigger value="accounts" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">Daftar Akun</TabsTrigger>
        </TabsList>
      </Tabs>

      {view === "journal" ? (
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-sm font-medium text-slate-400">Jurnal Umum</CardTitle>
              <Input placeholder="Cari transaksi..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs bg-white/5 border-white/10 text-white text-sm placeholder:text-slate-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-slate-500 uppercase">Tanggal</th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-slate-500 uppercase">No. Ref</th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-slate-500 uppercase">Keterangan</th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-slate-500 uppercase">Debit</th>
                    <th className="text-left py-2.5 px-3 text-xs font-medium text-slate-500 uppercase">Kredit</th>
                    <th className="text-right py-2.5 px-3 text-xs font-medium text-slate-500 uppercase">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 px-3 text-slate-400 text-xs">{e.date}</td>
                      <td className="py-2.5 px-3"><Badge className="bg-white/5 text-slate-300 border-0 text-[10px] font-mono">{e.ref}</Badge></td>
                      <td className="py-2.5 px-3 text-white">{e.desc}</td>
                      <td className="py-2.5 px-3 text-slate-300">{e.debit}</td>
                      <td className="py-2.5 px-3 text-slate-300">{e.credit}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-white">{formatRp(e.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACCOUNTS.map((acc) => (
            <Card key={acc.code} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-mono">{acc.code}</p>
                    <p className="text-sm font-medium text-white mt-0.5">{acc.name}</p>
                    <Badge className={`mt-1 border-0 text-[10px] ${acc.type === "Aset" ? "bg-blue-500/20 text-blue-300" : acc.type === "Pendapatan" ? "bg-green-500/20 text-green-300" : acc.type === "Beban" ? "bg-red-500/20 text-red-300" : "bg-slate-500/20 text-slate-300"}`}>{acc.type}</Badge>
                  </div>
                  <p className="text-lg font-bold text-white font-mono">{formatRp(acc.balance)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
