"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/integrations": "Integrasi PJSP",
  "/ledger": "Buku Besar",
  "/reports": "Laporan Keuangan",
  "/notifications": "Notifikasi",
  "/dashboard/customize": "Kustomisasi Dashboard",
  "/pricing": "Pilih Paket",
};

export function Header() {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname || ""] || "QIAS";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5">
      {/* Left: Mobile Menu + Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-[#0F172A] border-white/5">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" aria-label="Notifikasi">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          {/* Unread indicator */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full ring-2 ring-[#0F172A]" />
        </button>

        {/* Static User Profile (No Auth) */}
        <div className="flex items-center gap-2 p-1.5 rounded-lg">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white text-xs font-bold">
              QI
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-white leading-tight">Pengguna QIAS</p>
            <Badge className="bg-blue-500/20 text-blue-300 border-0 text-[10px] px-1.5 py-0">
              Akses Penuh
            </Badge>
          </div>
        </div>
      </div>

    </header>
  );
}
