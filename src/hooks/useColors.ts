import { useQuery } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { COLORS } from "../constants";

export const useGetColors = () => {
    return useQuery({
        queryKey: ["colors"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${COLORS}`
                );
                return res?.data ?? [];

            } catch (error) {
                console.log(error);
                toast.error("Yangi xabar qidirishda xatolik");
                return []
            }
        },
    });
};