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
        defaultValues: { product_id: "", quantity: 0, color: "" },
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useStore((s) => s.auth);
    const [selectedColor, setSelectedColor] = useState("");
    const { data: productsById } = useGetProductsById(id, selectedColor);
    const { mutate: createBuskets } = usePostCart();
    const [count, setCount] = useState(1);
    const [mainMedia, setMainMedia] = useState<string | null>(null);
    const [priceToShow, setPriceToShow] = useState<number>(0);

    useEffect(() => {
        // Agar productsById mavjud bo‘lmasa, hech narsa qilmaymiz
        if (!productsById) return;

        // Boshlang‘ich narx: asosiy product narxi
        let newPrice = Number(productsById.price);

        // Agar discount_price mavjud bo‘lsa va bo‘sh bo‘lmasa
        if (productsById.discount_price?.length) {

            // discount_price massivini count bo‘yicha kamayish tartibida saralash
            // shunda eng kattasi birinchi bo‘ladi
            const sortedDiscounts = [...productsById.discount_price].sort(
                (a, b) => b.count - a.count
            );

            // Saralangan discountlar bo‘yicha tekshirish
            for (const discount of sortedDiscounts) {
                // Agar hozirgi count discount.count ga teng yoki undan katta bo‘lsa
                if (count >= discount.count) {
                    // Shu discount.price ni yangi narx sifatida qo‘llash
                    newPrice = Number(discount.price);

                    // Birinchi mos discount topilganidan keyin siklni to‘xtatamiz
                    break;
                }
            }
        }

        // Hisoblangan narxni state ga qo‘yish
        setPriceToShow(newPrice);

        // useEffect dependency array: count yoki productsById o‘zgarganda qayta ishlaydi
    }, [count, productsById]);



    const fixVideoUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("https://")) return url;
        return "https://chexol-backend.shaxriyorbek.uz/media/" + url;
    };

    const videoUrl = fixVideoUrl(productsById?.video);

    useEffect(() => {
        if (videoUrl) {
            setMainMedia(videoUrl);
        } else {
            setMainMedia(productsById?.images?.[0]?.image || null);
        }
    }, [productsById]);

    useEffect(() => {
        if (!selectedColor) return;
        const found = productsById?.images?.find((i: any) => i.color === selectedColor);
        if (found) setMainMedia(found.image);
    }, [selectedColor, productsById]);

    useEffect(() => {
        setValue("quantity", count);
    }, [count, setValue]);

    const handleMinus = () => {
        if (count > 1) setCount(count - 1);
    };
    const handlePlus = () => setCount(count + 1);

    const selectedImage = productsById?.images?.find((i: any) => i.color === selectedColor);
    const stock = selectedImage?.stock || productsById?.images?.[0]?.stock;

    const onSubmit = () => {
        const payload = {
            product_id: productsById?.id,
            quantity: count,
            color_id: selectedColor,
        };

        createBuskets(payload, {
            onSuccess: () => {
                reset();
                navigate("/cart");
            },
            onError: () => {
                if (!auth) {
                    toast.error("Iltimos, tizimga kiring!");
                    navigate("/profile");
                } else {
                    toast.error("Avval rang tanlang");
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[390px] mx-auto px-4">
            <div className="w-full pt-4">
                <div className="h-[198px] bg-imgBgColor w-full relative rounded-[12px] overflow-hidden">
                    {mainMedia?.includes(".mp4") ? (
                        <video src={mainMedia} className="w-full h-full object-contain" controls />
                    ) : (
                        <img src={mainMedia || ""} className="w-full h-full object-contain" />
                    )}

                    <div className="absolute top-1/2 -translate-y-1/2 right-2.5 bg-white p-2.5 rounded-[30px] flex flex-col gap-1.5">
                        {productsById?.colors?.map((c: any) => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => setSelectedColor(c.color)}
                                className="relative w-4 h-4 rounded-full border"
                                style={{ backgroundColor: c.hex_code }}
                            >
                                {selectedColor === c.color && (
                                    <div className="absolute border-2 size-3 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="absolute top-2 left-2 bg-white rounded-[10px] p-1"
                    >
                        <ArrowLeft />
                    </button>
                </div>


                <div className="flex gap-2 pt-2.5">
                    {videoUrl && (
                        <div
                            className={`w-[68px] h-[68px] rounded-[12px] cursor-pointer flex items-center justify-center ${mainMedia === videoUrl && "border-mainColor border"
                                }`}
                            onClick={() => videoUrl && setMainMedia(videoUrl)}
                        >
                            <video src={videoUrl} className="w-full h-full rounded-[12px] object-cover" />
                        </div>
                    )}

                    {productsById?.images?.map((i: any) => (
                        <div
                            key={i.id}
                            className={`w-[68px] h-[68px] rounded-[12px] border cursor-pointer flex items-center justify-center ${mainMedia === i.image ? "border-mainColor" : "border-gray-300"
                                }`}
                            onClick={() => setMainMedia(i.image)}
                        >
                            <img src={i.image} className="w-full h-full object-contain rounded-[12px]" />
                        </div>
                    ))}
                </div>

                <div className="pt-2.5 flex flex-col gap-2.5">
                    <h2 className="font-semibold text-lg">{productsById?.title}</h2>
                    <h4 className="text-sm text-placeholderColor">{productsById?.description}</h4>

                    {selectedColor && (
                        <p className="text-sm font-medium">Miqdor: {selectedImage?.stock} ta</p>
                    )}

                    <h3 className="font-semibold text-xl text-mainColor">
                        {priceToShow.toLocaleString("uz-UZ")} so’m
                    </h3>
                </div>
            </div>

            <div className="flex items-center px-4 py-2.5 border rounded-t-[20px] fixed bottom-0 bg-white left-1/2 -translate-x-1/2 w-full max-w-[390px] justify-between z-40">
                <div className="flex items-center gap-[3px]">
                    <button
                        type="button"
                        onClick={handleMinus}
                        className="w-8 h-[34px] bg-white border rounded-[8px] flex items-center justify-center"
                    >
                        <Minus className="text-mainColor" />
                    </button>

                    <p className="border px-[29px] h-[34px] flex items-center justify-center rounded-[8px]">
                        {count}
                    </p>

                    <button
                        type="button"
                        onClick={handlePlus}
                        disabled={count >= stock}
                        className="w-8 h-[34px] bg-white border rounded-[8px] flex items-center justify-center"
                    >
                        <Plus className="text-mainColor" />
                    </button>
                </div>

                <Button type="submit" className="w-40! font-semibold">
                    Savatga qo‘shish
                </Button>
            </div>
        </form>
    );
};

export default CartDetailPage;
