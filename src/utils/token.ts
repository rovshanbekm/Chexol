import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "../constants";
import type { Tokens } from "../types";
import { cookieStorage } from "./cookie";

export function setTokens({
    access_token,
    refresh_token,
    user_id,
}: Tokens & { user_id?: string }) {
    if (access_token) cookieStorage.setItem(ACCESS_TOKEN, access_token);
    if (refresh_token) cookieStorage.setItem(REFRESH_TOKEN, refresh_token);
    if (user_id) cookieStorage.setItem(USER_ID, user_id);
}

export function getTokens() {
    return {
        access_token: cookieStorage.getItem(ACCESS_TOKEN),
        refresh_token: cookieStorage.getItem(REFRESH_TOKEN),
        user_id: cookieStorage.getItem(USER_ID),
    };
}

export function clearTokens() {
    cookieStorage.removeItem(ACCESS_TOKEN);
    cookieStorage.removeItem(REFRESH_TOKEN);
    cookieStorage.removeItem(USER_ID);
}
