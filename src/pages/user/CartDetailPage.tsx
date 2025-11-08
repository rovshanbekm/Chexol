import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { useGetColors, useGetProductsById, usePostCart } from "../../hooks";

type FormValues = {
    product_id?: string;
    quantity?: number;
    color?: string;
};

export const CartDetailPage = () => {
    const { handleSubmit, reset, setValue } = useForm<FormValues>({
        defaultValues: { product_id: "", quantity: 0, color: "", },
    });
    const { id } = useParams();
    const { data: productsById } = useGetProductsById(id as string);
    const { mutate: createBuskets } = usePostCart();
    const { data: colors } = useGetColors();
    const [count, setCount] = useState(1);
    const [mainImage, setMainImage] = useState(productsById?.image);
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        setValue("quantity", count);
    }, [count, setValue]);

    useEffect(() => {
        setMainImage(productsById?.image);
    }, [productsById?.image]);

    const onSubmit = () => {
        // let productIdToSend = productsById?.id;

        // const foundImage = productsById?.images?.find((img: any) => img.image === mainImage);
        // if (foundImage) {
        //     productIdToSend = foundImage.id;
        // }

        // const payload = {
        //     product_id: productIdToSend,
        //     quantity: count,
        // };
        const savedColors = JSON.parse(localStorage.getItem("selectedColors") || "{}");
        savedColors[productsById?.id] = selectedColor;
        localStorage.setItem("selectedColors", JSON.stringify(savedColors));

        const payload = {
            product_id: productsById?.id,
            quantity: count,
            color: selectedColor, 
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
        });
    };

    const handleMinus = () => {
        if (count > 1) setCount(count - 1);
    };
    const handlePlus = () => setCount(count + 1);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full px-4 pt-4">
                <div className="h-[198px] bg-imgBgColor w-full relative">
                    <img
                        className="h-full w-full object-cover rounded-[12px]"
                        src={mainImage}
                        alt=""
                    />
                    <div className="h-[102px] absolute top-10.5 right-2.5 w-9 rounded-[30px] bg-white flex flex-col items-center justify-center gap-3 p-2 shadow-md">
                        {colors?.map((item: any) => {
                            const isActive = selectedColor === item.id;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelectedColor(item.id)}
                                    className="relative w-4 h-4 rounded-full transition-all duration-200"
                                    style={{
                                        backgroundColor: item.hex_code || "#999",
                                        boxShadow: isActive
                                            ? `0 0 0 2px ${item.hex_code === "#FFFFFF" ? "#ccc" : item.hex_code}, 0 0 0 5px #fff`
                                            : "none",
                                        border: !isActive
                                            ? `2px solid ${item.hex_code === "#FFFFFF" ? "#ccc" : item.hex_code}`
                                            : "none",
                                    }}
                                />
                            );
                        })}

                    </div>
                </div>

                <div className="flex gap-2 pt-2.5">
                    {[productsById?.image, ...(productsById?.images?.map((i: any) => i.image) || [])].map((img, index) => (
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
                    <h3 className="font-semibold text-xl text-mainColor">{productsById?.price} so’m</h3>
                </div>
            </div>

            <div className="flex items-center px-[22px] py-2.5 border rounded-t-[20px] bottom-0 bg-white w-full justify-between fixed z-40">
                <div className="flex items-center gap-[3px]">
                    <button
                        type="button"
                        onClick={handleMinus}
                        className="w-8 border h-[34px] bg-white rounded-[8px] flex items-center justify-center"
                    >
                        <Minus className="text-mainColor" />
                    </button>
                    <p className="border px-[29px] h-[34px] flex items-center justify-center font-medium text-base text-secondColor rounded-[8px]">
                        {count}
                    </p>
                    <button
                        type="button"
                        onClick={handlePlus}
                        className="w-8 border h-[34px] bg-white rounded-[8px] flex items-center justify-center"
                    >
                        <Plus className="text-mainColor" />
                    </button>
                </div>
                <Button type="submit" className="w-[236px] font-semibold text-base">
                    Savatga qo’shish
                </Button>
            </div>
        </form>
    );
};

export default CartDetailPage;
