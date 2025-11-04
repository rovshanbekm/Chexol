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

            if (errData?.error_message) {
                toast.error(`${errData.error_field}: ${errData.error_message}`);
            } else {
                toast.error("Xatolik yuz berdi");
            }
        },
    });
};


export const useGetUsersById = (id:any) => {
    return useQuery({
        queryKey: ["users",id],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${USERS}${id}/`
                );
                return res?.data ?? [];

            } catch (error) {
                console.log(error);
                // toast.error("Yangi xabar qidirishda xatolik");
                return []
            }
        },
    });
};