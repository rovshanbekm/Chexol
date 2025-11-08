// utils/sessionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  settingsCategoryTab: string | null;
  setSettingsCategoryTab: (value: string | null) => void;

  settingsMaterialTab: string | null;
  setSettingsMaterialTab: (value: string | null) => void;

  settingsColorTab: string | null;
  setSettingsColorTab: (value: string | null) => void;

  activeFilter: string | null;
  setActiveFilter: (value:string | null) => void
}

const sessionStore = create<SessionState>()(
  persist(
    (set) => ({
      settingsCategoryTab: null,
      setSettingsCategoryTab: (value) => set({ settingsCategoryTab: value }),

      settingsMaterialTab: null,
      setSettingsMaterialTab: (value) => set({ settingsMaterialTab: value }),
      settingsColorTab: null,
      setSettingsColorTab: (value) => set({ settingsColorTab: value }),
      activeFilter: null,
      setActiveFilter: (filter) => set({ activeFilter: filter })
    }),
    { name: "session-storage" }
  )
);

export default sessionStore;