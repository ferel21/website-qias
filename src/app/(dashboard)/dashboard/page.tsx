"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BeginnerDashboard } from "@/components/dashboard/beginner-dashboard";
import { ProDashboard } from "@/components/dashboard/pro-dashboard";

export default function DashboardPage() {
  // In a real app, this would be fetched from user profile in db
  const [isProMode, setIsProMode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header and Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-semibold text-white">Selamat datang kembali 👋</h2>
          <p className="text-sm text-slate-400 mt-0.5">Berikut ringkasan performa usaha Anda hari ini</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Mode Switch for Demo */}
          <div className="flex items-center bg-slate-900/50 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setIsProMode(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${!isProMode ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Pemula
            </button>
            <button
              onClick={() => setIsProMode(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isProMode ? 'bg-[#3B82F6] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Pro
            </button>
          </div>

          <Tabs defaultValue="7d" className="w-fit">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="today" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">
                Hari Ini
              </TabsTrigger>
              <TabsTrigger value="7d" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">
                7 Hari
              </TabsTrigger>
              <TabsTrigger value="30d" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">
                30 Hari
              </TabsTrigger>
              <TabsTrigger value="custom" className="text-xs data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white">
                Kustom
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Render selected dashboard mode */}
      {isProMode ? <ProDashboard /> : <BeginnerDashboard />}
    </div>
  );
}
