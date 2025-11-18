import { useQuery } from "@tanstack/react-query";
import request from "../services";
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
                return []
            }
        },
    });
};