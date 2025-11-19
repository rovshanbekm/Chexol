import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { DOMAIN, USERS } from "../constants";
import { getTelegramUserDataID } from "../services/get_init_data_user_id";
import useStore from "../context/store";

export const usePostUsers = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            const url = `${DOMAIN}${USERS}`;

            const res = await request.post(url, payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            return res.data;
        },

        onSuccess: (result) => {
            qc.invalidateQueries({ queryKey: ['users'] });
            toast.success(result.data?.data);
        },

        onError: (error: any) => {
            const errData = error?.response?.data;

            if (errData?.message) {
                toast.error(`${errData.message}`);
            }
        },
    });
};


export const useGetUsersProfile = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${USERS}profile/`
                );
                return res?.data ?? [];

            } catch (error) {
                console.log(error);
                return []
            }
        },
    });
};

// export const useDeleteUsersById = () => {
//     const qc = useQueryClient();
//     return useMutation({
//         mutationFn: (id: string) => request.delete(`${DOMAIN}${USERS}${id}/`),
//         onSuccess: (result) => {
//             qc.invalidateQueries({ queryKey: ["users"] });
//             toast.success(result.data?.data);
//         },
//         onError: (error) => {
//             console.log(error);
//             toast.error("error");
//         },
//     });
// };

export const useEditProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { id: string;[key: string]: any }) => {
            if (!data.id) throw new Error("Foydalanuvchi ID topilmadi");

            const res = await request.patch(`${DOMAIN}${USERS}${data.id}/`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.phone?.[0];
            if (message) {
                toast.error(`${message}`);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    });
};

export const useGetUserByChat = () => {
    const chat_id = getTelegramUserDataID();

    return useQuery({
        queryKey: ["user_by_chat", chat_id],
        queryFn: async () => {
            const url = `${DOMAIN}${USERS}user_by_chat/${chat_id}/`;
            const res = await request.get(url);
            const data = res.data;

            if (data.tokens?.access_token) {
                // 🚀 login funksiyasini ishlatamiz
                useStore.getState().login({
                    access_token: data.tokens.access_token,
                    refresh_token: data.tokens.refresh_token,
                });
            }
            return data;
        },

        enabled: !!chat_id,
        retry: 1,
    });
};




export const useGetUsersReferall = () => {
    return useQuery({
        queryKey: ["users-referrals"],
        queryFn: async () => {
            try {
                const res = await request.get(`${USERS}my-referrals/`);
                const data = res?.data;

                if (Array.isArray(data)) {
                    return data;
                }

                if (Array.isArray(data?.my_referrals)) {
                    return data.my_referrals;
                }

                if (Array.isArray(data?.referrals)) {
                    return data.referrals;
                }

                if (Array.isArray(data?.results)) {
                    return data.results;
                }

                return [];
            } catch (error) {
                console.log(error);
                return [];
            }
        },
    });
};
