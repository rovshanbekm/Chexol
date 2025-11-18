import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { DOMAIN, USERS } from "../constants";
import { setTokens } from "../utils/token";

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



export const useGetUserByChat = (chat_id:number) => {
    return useQuery({
        queryKey: ["users", chat_id],
        queryFn: async () => {
            try {
                if (!chat_id) throw new Error("chat_id topilmadi");

                const url = `${ DOMAIN }${ USERS }user_by_chat/1665926394/`;
                console.log("Request URL:", url);

                const res = await request.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = res.data;
                console.log("Response data:", data);

                if (data.access_token && data.refresh_token) {
                    setTokens({
                        access_token: data.access_token,
                        refresh_token: data.refresh_token,
                    });
                }

                return data ?? {};
            } catch (error) {
                console.error(error);
                toast.error("Foydalanuvchini olishda xatolik yuz berdi");
                return {};
            }
        },
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
