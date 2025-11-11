import { useQuery } from "@tanstack/react-query";
import request from "../services";
import { MY_CASHBACK, ORDERS } from "../constants";

export const useGetCashbacks = () => {
    return useQuery({
        queryKey: ["cashback"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${ORDERS}${MY_CASHBACK}`
                );
                return res?.data ?? {};

            } catch (error) {
                console.log(error);
                return []
            }
        },
    });
};