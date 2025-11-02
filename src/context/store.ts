import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { clearTokens, setTokens } from "../utils/token";
import { cookieStorage } from "../utils/cookie";

export interface Store {
    auth: boolean;
    login: ({
        access_token,
        refresh_token,
    }: {
        access_token: string;
        refresh_token: string;
    }) => void;
    logout: () => void;
}

const useStore = create<Store>()(
    persist(
        (set) => ({
            auth: false,
            login: ({ access_token, refresh_token }) => {
                set({
                    auth: true,
                });
                setTokens({ access_token, refresh_token });
            },
            logout: () => {
                set({
                    auth: false,
                });
                clearTokens();
            },
        }),
        {
            name: "777chexol",
            storage: createJSONStorage(() => cookieStorage),
        }
    )
);

export default useStore;
