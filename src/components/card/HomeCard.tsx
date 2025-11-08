import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGetFilteredProducts, useGetProducts } from "../../hooks/useProducts";
import sessionStore from "../../utils/sessionStore";
import { usePostCart } from "../../hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
    product_id: string;
    quantity: number;
};

export const HomeCard = () => {
    const { reset } = useForm<FormValues>({
        defaultValues: { product_id: "", quantity: 1 },
    });

    const settingsCategoryTab = sessionStore((state) => state.settingsCategoryTab);
    const activeFilter = sessionStore((state) => state.activeFilter);
    const selectedColors = JSON.parse(localStorage.getItem("selectedColors") || "{}");

    const { mutate: createBuskets } = usePostCart();

    const parsedActiveFilter = activeFilter ? JSON.parse(activeFilter) : {};

    const filterParams = {
        ...parsedActiveFilter,
        category_id:
            settingsCategoryTab !== "all"
                ? settingsCategoryTab
                : parsedActiveFilter?.category_id,
        enabled: true,
    };

    const { data: filteredProducts } = useGetFilteredProducts(filterParams);
    const { data: allProducts } = useGetProducts();

    const list =
        filteredProducts?.length || settingsCategoryTab || activeFilter
            ? filteredProducts
            : allProducts;

    const handleAddToCart = (e: React.MouseEvent, productId: string, item:any) => {
        e.preventDefault();
        e.stopPropagation();

        const payload = {
            product_id: productId,
            quantity: 1,
            ...(selectedColors[item.id] && { color: selectedColors[item.id] })
        };

        createBuskets(payload, {
            onSuccess: () => {
                reset();
                toast.success("Mahsulot savatga qo'shildi");
            },
        });
    };

    return (
        <div className="grid grid-cols-2 gap-2.5 pt-5">
            {list?.map((item: any) => (
                <Link to={`/products/${item.id}`} key={item.id}>
                    <img
                        className="w-full object-contain rounded-t-[20px]"
                        src={`${import.meta.env.VITE_API_URL}${item?.image}`}
                        alt={item?.title}
                    />
                    <div className="flex flex-col gap-2.5 border-x border-b p-2.5 rounded-b-[12px]">
                        <h2 className="font-medium text-sm text-secondColor line-clamp-1">
                            {item?.title}
                        </h2>
                        <p className="text-[12px] text-placeholderColor line-clamp-1">
                            {item?.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-base text-mainColor">
                                {item?.price} so‘m
                            </h4>
                            <Button
                                type="button"
                                onClick={(e) => handleAddToCart(e, item.id, item)}
                                className="w-[42px]! h-[42px]! rounded-[12px]!"
                            >
                                <ShoppingCart />
                            </Button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default HomeCard;
