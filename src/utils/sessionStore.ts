import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FormState {
    pageSearch: number;
    setPageSearch: (page: number) => void;

    pageCatalog: number;
    setPageCatalog: (page: number) => void;

    // Eski sahifalar uchun (2 ta tab)
    rowCol: boolean;
    toggleRowCol: (value?: boolean) => void;

    // Hozirgi sahifa uchun (3 ta tab)
    settingsTab: "all" | "phonecase" | "earphones" | "phonecharger";
    setSettingsTab: (tab: "all" | "phonecase" | "earphones" | "phonecharger") => void;
}

export const sessionStore = create<FormState>()(
    persist(
        (set) => ({
            // Default qiymatlar
            rowCol: false,
            pageCatalog: 1,
            pageSearch: 1,
            settingsTab: "all",

            // Funksiyalar
            setPageCatalog: (page: number) => set({ pageCatalog: page }),
            setPageSearch: (page: number) => set({ pageSearch: page }),
            toggleRowCol: (value?: boolean) =>
                set((state) => ({
                    rowCol: typeof value === "boolean" ? value : !state.rowCol,
                })),
            setSettingsTab: (tab) => set({ settingsTab: tab }),
        }),
        {
            name: "sector-session",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default sessionStore;
