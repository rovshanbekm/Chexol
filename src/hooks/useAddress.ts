import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { CREATE_ADDRESS, DOMAIN, MY_ADDRESS, ORDERS } from "../constants";

export const useGetAddress = () => {
    return useQuery({
        queryKey: ["address"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${ORDERS}${MY_ADDRESS}`
                );
                return res?.data ?? [];

            } catch (error) {
                console.log(error);
                toast.error("Yangi xabar qidirishda xatolik");
                return []
            }
        },
        staleTime: 1000 * 60 * 60,
    });
};

export const usePostAddress = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            const url = `${DOMAIN}${ORDERS}${CREATE_ADDRESS}`;

            const res = await request.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.data;
        },

        onSuccess: (result) => {
            qc.invalidateQueries({ queryKey: ['address'] });
            toast.success(result.data?.data);
        },

        onError: (error: any) => {
            const errData = error?.response?.data;

            if (errData?.message) {
                toast.error(`${errData.message}`);
            } else {
            }
        },
    });
};

export const useEditAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { id: string; [key: string]: any }) => {
            if (!data.id) throw new Error("Foydalanuvchi ID topilmadi");

            const res = await request.patch(`${DOMAIN}${ORDERS}${data.id}/update_address/`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};