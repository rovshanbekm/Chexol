import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DOMAIN, ORDERS } from "../constants";
import request from "../services";
import { toast } from "react-toastify";

export const usePostOrders = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            const url = `${DOMAIN}${ORDERS}`;

            const res = await request.post(url, payload, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            return res.data;
        },

        onSuccess: (result) => {
            qc.invalidateQueries({ queryKey: ['orders', 'buskets', 'cashback'] });
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


export const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders", "buskets"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${ORDERS}`
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


export const usePostOrdersUpload = (id: string) => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            const url = `${DOMAIN}${ORDERS}${id}/upload-proof/`;

            const res = await request.post(url, payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            return res.data;
        },

        onSuccess: (result) => {
            qc.invalidateQueries({ queryKey: ['orders', 'buskets'] });
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

export const useGetOrdersById = (id: string) => {
    return useQuery({
        queryKey: ["orders", id],
        enabled: !!id,
        queryFn: async () => {
            const url = `${DOMAIN}${ORDERS}${id}/`;
            const res = await request.get(url);
            return res?.data ?? null;
        },
    });
};

