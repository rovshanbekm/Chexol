import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { useGetProductsById, usePostCart } from "../../hooks";
import { toast } from "react-toastify";
import useStore from "../../context/store";

type FormValues = {
    product_id?: string;
    quantity?: number;
    color?: string;
};

export const CartDetailPage = () => {
    const { handleSubmit, reset, setValue } = useForm<FormValues>({
        defaultValues: { product_id: "", quantity: 0, color: "", },
    });
    const [selectedColor, setSelectedColor] = useState("");
    const { id } = useParams();
    const { data: productsById } = useGetProductsById(id, selectedColor);
    const { mutate: createBuskets } = usePostCart();
    const [count, setCount] = useState(1);
    const [mainImage, setMainImage] = useState(productsById?.images?.[0]?.image);
    const navigate = useNavigate();
    const auth = useStore((state) => state.auth);

    useEffect(() => {
        setValue("quantity", count);
    }, [count, setValue]);

    useEffect(() => {
        if (!selectedColor) return setMainImage(productsById?.images?.[0]?.image);

        const matchedImage = productsById?.images?.find((img: any) => img.color === selectedColor);

        if (matchedImage) {
            setMainImage(matchedImage.image);
        } else {
            setMainImage(productsById?.images?.[0]?.image);
        }
    }, [selectedColor, productsById]);

    const onSubmit = () => {
        const payload = {
            product_id: productsById?.id,
            quantity: count,
            color_id: selectedColor,
        };

        createBuskets(payload, {
            onSuccess: () => {
                reset({
                    product_id: "",
                    color: "",
                    quantity: 0,
                });
                navigate("/cart");
            },
            onError: () => {
                if (!auth) {
                    toast.error("Iltimos, avval tizimga kiring!");
                    navigate("/profile")
                } else {
                    toast.error("Avval rang tanlang")
                }
            }
        });
    };

    const handleMinus = () => {
        if (count > 1) setCount(count - 1);
    };
    const handlePlus = () => setCount(count + 1);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[390px] mx-auto px-4">
            <div className="w-full pt-4">
                <div className="h-[198px] bg-imgBgColor w-full relative">
                    <img
                        className="h-full w-full object-contain rounded-[12px]"
                        src={mainImage}
                        alt=""
                    />
                    <div className="h-max absolute top-1/2 -translate-y-1/2 right-2.5 rounded-[30px] bg-white flex flex-col items-center justify-center gap-1.5 p-2.5">
                        {productsById?.colors?.map((item: any) => {
                            const isActive = selectedColor === item.color;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelectedColor(item.color)}
                                    className="relative w-4 h-4 rounded-full transition-all border cursor-pointer duration-200"
                                    style={{
                                        backgroundColor: item.hex_code || "#999",

                                    }}
                                >
                                    {isActive && <div className="absolute border-2 size-3 top-1/2 left-1/2 -translate-1/2 rounded-full"></div>}
                                </button>
                            );
                        })}
                    </div>
                    <button type="button" onClick={() => navigate("/")} className="bg-white absolute top-2 left-2 rounded-[10px] p-1 cursor-pointer"><ArrowLeft /></button>
                </div>

                <div className="flex gap-2 pt-2.5">
                    {productsById?.images?.map((i: any) => i.image).map((img: any, index: number) => (
                        <div
                            key={index}
                            className={`w-[68px] h-[68px] rounded-[12px] border flex items-center justify-center cursor-pointer ${mainImage === img ? "border-mainColor" : "border-gray-300"
                                }`}
                            onClick={() => setMainImage(img)}
                        >
                            <img
                                className="w-full h-full object-contain rounded-[12px]"
                                src={img}
                                alt=""
                            />
                        </div>
                    ))}
                </div>

                <div className="pt-2.5 flex flex-col gap-2.5">
                    <h2 className="font-semibold text-lg">{productsById?.title}</h2>
                    <h4 className="text-sm text-placeholderColor">{productsById?.description}</h4>
                    <h3 className="font-semibold text-xl text-mainColor">{Number(productsById?.price).toLocaleString("uz-UZ")} so’m</h3>
                </div>
            </div>

            <div className="flex items-center px-4 py-2.5 border rounded-t-[20px] bottom-0 bg-white left-1/2 -translate-x-1/2 w-full max-w-[390px] sm:max-w-[425px] justify-between gap-2.5 fixed z-40">
                <div className="flex items-center gap-[3px]">
                    <button
                        type="button"
                        onClick={handleMinus}
                        className="w-8 border h-[34px] bg-white cursor-pointer rounded-[8px] flex items-center justify-center"
                    >
                        <Minus className="text-mainColor" />
                    </button>
                    <p className="border px-[29px] h-[34px] flex items-center justify-center font-medium text-base text-secondColor rounded-[8px]">
                        {count}
                    </p>
                    <button
                        type="button"
                        onClick={handlePlus}
                        className="w-8 border h-[34px] bg-white cursor-pointer rounded-[8px] flex items-center justify-center"
                    >
                        <Plus className="text-mainColor" />
                    </button>
                </div>
                <Button type="submit" className="w-[150px]! 2xs:w-[190px]! sm:w-[214px]! font-semibold text-sm 2xs:text-base">
                    Savatga qo’shish
                </Button>
            </div>
        </form>
    );
};

export default CartDetailPage;
