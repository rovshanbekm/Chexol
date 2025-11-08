import { useQuery } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { MATERIALS } from "../constants";

export const useGetMaterials= () => {
    return useQuery({
        queryKey: ["materials"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${MATERIALS}`
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