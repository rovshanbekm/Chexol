import Cookies from "js-cookie";

export const cookieStorage = {
    getItem: (name: string) => {
        const value = Cookies.get(name) as string | undefined;
        return value === undefined ? null : value;
    },
    setItem: (name: string, value: string, days?: number) => {
        Cookies.set(name, value, {
            secure: false,
            sameSite: "lax",
            expires: days || 7,
        });
    },
    removeItem: (name: string) => {
        Cookies.remove(name);
    },
};
