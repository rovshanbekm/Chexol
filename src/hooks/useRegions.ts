import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { REGIONS } from "../constants";
import request from "../services";

export const useGetRegions = () => {
    return useQuery({
        queryKey: ["regions"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${REGIONS}`
                );
                return res?.data ?? [];

            } catch (error) {
                console.log(error);
                toast.error("Yangi xabar qidirishda xatolik");
                return []
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};