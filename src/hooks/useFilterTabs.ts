import { useQuery } from "@tanstack/react-query";
import request from "../services";
import { CATEGORIES } from "../constants";

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${CATEGORIES}`
                );
                return res?.data ?? [];

            } catch (error) {
                console.log(error);
                return []
            }
        },
    });
};