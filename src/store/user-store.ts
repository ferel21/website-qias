import { create } from "zustand";

interface UserState {
  tier: "PEMULA" | "PRO";
  onboardingComplete: boolean;
  businessName: string | null;
  setTier: (tier: "PEMULA" | "PRO") => void;
  setBusinessName: (name: string) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  tier: "PEMULA",
  onboardingComplete: false,
  businessName: null,
  setTier: (tier) => set({ tier }),
  setBusinessName: (name) => set({ businessName: name }),
  completeOnboarding: () => set({ onboardingComplete: true }),
  reset: () =>
    set({
      tier: "PEMULA",
      onboardingComplete: false,
      businessName: null,
    }),
}));
