import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { DOMAIN, USERS } from "../constants";

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
            } else {
                toast.error("Xatolik yuz berdi");
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
        staleTime: 1000 * 60 * 60,
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
        mutationFn: async (data: { id: string; [key: string]: any }) => {
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