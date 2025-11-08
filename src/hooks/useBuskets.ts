import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { BUSKETS, CART, DOMAIN } from "../constants";

type UpdateBusketParams = {
    id: string;
    quantity: number;
    stock: number;
};

export const useGetBuskets = () => {
    return useQuery({
        queryKey: ["buskets"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${BUSKETS}`
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


export const useUpdateBusket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, quantity, stock }: UpdateBusketParams) => {
            if (quantity > stock) {
                toast.warn("Omborda bundan ko‘p mahsulot yo‘q!");
                return;
            }
            if (quantity < 1) {
                toast.warn("Eng kam miqdor 1 ta bo‘lishi kerak!");
                return;
            }

            const res = await request.patch(`${BUSKETS}${id}/`, { quantity });
            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['buskets'] });
        },

        onError: (error: any) => {
            console.error(error);
        },
    });
};

export const usePostCart = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            const url = `${DOMAIN}${CART}`;

            const res = await request.post(url, payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            return res.data;
        },

        onSuccess: (result) => {
            qc.invalidateQueries({ queryKey: ['buskets'] });
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


export const useDeleteBusketsById = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => request.delete(`${DOMAIN}${BUSKETS}${id}/`),
        onSuccess: (result) => {
            qc.invalidateQueries({ queryKey: ["buskets"] });
            toast.success(result.data?.message);
        },
        onError: (error) => {
            console.log(error);
            toast.error("error");
        },
    });
};

export const useDeleteBusketsAll = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => request.delete(`${DOMAIN}${BUSKETS}clear/`),
        onSuccess: (result) => {
            qc.invalidateQueries({ queryKey: ["buskets"] });
            toast.success(result.data?.message);
        },
        onError: (error: any) => {
            const errData = error?.response;

            if (errData?.message) {
                toast.error(`${errData.message}`);
            } else {
            }
        },
    });
};