import { useQuery } from "@tanstack/react-query";
import request from "../services";
import { toast } from "react-toastify";
import { DOMAIN, PRODUCTS } from "../constants";

interface FilterParams {
    category_id?: string | null;
    color_id?: string | null;
    material_id?: string | null;
    is_discounted?: boolean;
    is_new?: boolean;
    min_price?: number | null;
    max_price?: number | null;
    enabled?: boolean;
}

export const useGetProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                const res = await request.get(
                    `${PRODUCTS}`
                );
                return res?.data.data ?? [];

            } catch (error) {
                console.log(error);
                return []
            }
        },
    });
};


export const useGetProductsById = (id: string | undefined, colorId?: string) => {
    return useQuery({
        queryKey: ["products", id, colorId],
        queryFn: async () => {
            if (!id) return null;

            try {
                const url = colorId ? `${PRODUCTS}${id}/?color_id=${colorId}` : `${PRODUCTS}${id}/`;
                const res = await request.get(url);
                return res?.data ?? null;
            } catch (error) {
                console.error(error);
                toast.error("Mahsulot ma'lumotlarini olishda xatolik yuz berdi");
                return null;
            }
        },
        
    });
};


export const useGetBusinessDetail = (search: string | null) => {
    return useQuery({
        queryKey: ["products", search],
        queryFn: async () => {
            if (!search || search.trim() === "") return [];
            try {
                const res = await request.get(
                    `${DOMAIN}${PRODUCTS}?search=${encodeURIComponent(search)}`
                );
                return res.data.data;
            } catch (error) {
                console.error(error);
                toast.error("Biznes ma'lumotlarini olishda xatolik");
                return [];
            }
        },
        enabled: !!search && search.trim() !== "",
    });
};



export const useGetFilteredProducts = (filters: FilterParams) => {
    const queryParams = new URLSearchParams();

    if (filters.category_id) queryParams.append("category_id", filters.category_id);
    if (filters.color_id) queryParams.append("color_id", filters.color_id);
    if (filters.material_id) queryParams.append("material_id", filters.material_id);

    if (filters.is_discounted !== undefined)
        queryParams.append("is_discounted", String(filters.is_discounted));
    if (filters.is_new !== undefined)
        queryParams.append("is_new", String(filters.is_new));

    if (filters.min_price) queryParams.append("min_price", String(filters.min_price));
    if (filters.max_price) queryParams.append("max_price", String(filters.max_price));

    const url = `${DOMAIN}${PRODUCTS}?${queryParams.toString()}`;

    return useQuery({
        queryKey: ["products", filters],
        queryFn: async () => {
            try {
                const res = await request.get(url);
                return res.data.data;
            } catch (error) {
                console.error(error);
                toast.error("Mahsulotlarni olishda xatolik");
                return [];
            }
        },
        enabled: filters.enabled || false,
    });
};