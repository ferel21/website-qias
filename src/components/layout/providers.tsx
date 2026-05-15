"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "bg-[#1E293B] border-white/10 text-white",
        }}
      />
    </>
  );
}

