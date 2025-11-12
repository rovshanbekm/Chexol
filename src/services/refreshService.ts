import axios from "axios";
import { getTokens, setTokens } from "../utils/token";
import { LOGIN, REFRESH_USER } from "../constants";
import { getTelegramUserDataID } from "../services/get_init_data_user_id";

export const refreshTokens = async () => {
    const { access_token, refresh_token, user_id, chat_id } = getTokens();

    if (!refresh_token) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post(
            REFRESH_USER,
            { refresh_token },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        const { access_token: newAccess, refresh_token: newRefresh } = response.data;

        if (!newAccess || !newRefresh) {
            console.warn("No new tokens, trying re-login...");

            const chat_id = getTelegramUserDataID();
            if (!user_id || !chat_id) throw new Error("Missing user_id or chat_id");

            const loginResponse = await axios.post(
                LOGIN,
                { user_id, chat_id },
                { headers: { "Content-Type": "application/json" } }
            );

            const { access_token: newAccess2, refresh_token: newRefresh2 } = loginResponse.data;
            setTokens({ access_token: newAccess2, refresh_token: newRefresh2, user_id: String(user_id), chat_id: String(chat_id) });
            return newAccess2;
        }

        if (user_id !== null) {
            setTokens({ access_token: newAccess, refresh_token: newRefresh, user_id: String(user_id), chat_id: String(chat_id) });
        } else {
            throw new Error("user_id is null");
        }
        return newAccess;
    } catch (error) {
        console.error("Token refresh failed:", error);
        throw error;
    }
};
