import { ArrowLeft, Dot, PencilLine, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import { useGetAddress, useGetBuskets, useGetUsersProfile, usePostOrders } from "../../hooks"
import { useEffect, useState } from "react"
import { Checkbox } from "../../components/ui/checkbox"


type FormValues = {
    full_name?: string;
    phone?: string;
    address?: string;
    payment_type?: string;
    items?: [{ product: string, quantity: number }];
    cashback?: string
};

export const CheckoutPage = () => {
    const navigate = useNavigate()
    const { data: cards } = useGetBuskets()
    const { data: addresses } = useGetAddress()
    const { mutate: createOrders } = usePostOrders()
    const { data: userBalance } = useGetUsersProfile()
    const [valueinput, setValueinput] = useState("")

    const { register, handleSubmit, reset, watch, setValue, control } = useForm<FormValues>({
        defaultValues: { full_name: "", phone: "", address: "", payment_type: "", cashback: "0", },
    })

    const payment_type = watch("payment_type")
    const cashback = watch("cashback")

    useEffect(() => {
        if (cashback) {
            setValue("payment_type", "");
        }
    }, [cashback, setValue]);

    useEffect(() => {
        const savedData = localStorage.getItem("checkout_form");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            reset(parsed);
            if (parsed.phone) setValueinput(parsed.phone);
        }
    }, [reset]);


    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem("checkout_form", JSON.stringify(value))
        })
        return () => subscription.unsubscribe()
    }, [watch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, "");
        if (!input.startsWith("998") && input.length > 0) {
            input = "998" + input;
        }
        if (input.length > 12) input = input.slice(0, 12);

        let formatted = "";
        if (input.length > 0) formatted = "+" + input.substring(0, 3);
        if (input.length > 3) formatted += `(${input.substring(3, 5)})`;
        if (input.length > 5) formatted += " " + input.substring(5, 8);
        if (input.length > 8) formatted += " " + input.substring(8, 10);
        if (input.length > 10) formatted += " " + input.substring(10, 12);

        const formattedValue = formatted.trim();
        setValueinput(formattedValue);
        setValue("phone", formattedValue);
    };

    useEffect(() => {
        if (userBalance) {
            const formatted = userBalance?.phone?.replace(
                /^\+?(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/,
                "+$1 ($2) $3 $4 $5"
            );
            reset({
                full_name: userBalance.full_name,
                phone: formatted ?? "",
                address: "",
                payment_type: "",
                cashback: "0"
            });
        }
    }, [userBalance, reset]);


    const onSubmit = (data: FormValues) => {
        const payload: any = {
            full_name: userBalance.full_name,
            phone: valueinput,
            address: addresses?.[0]?.id,
            items: cards.map((item: any) => ({
                product: item.product_id,
                quantity: item.quantity,
                color: item.color_id,
            })),
        };

        if (data.payment_type) {
            payload.payment_type = data.payment_type;
        }

        if (data.cashback && Number(data.cashback) > 0) {
            payload.cashback = data.cashback
        }

        createOrders(payload, {
            onSuccess: () => {
                localStorage.removeItem("checkout_form");
                if (payload.payment_type === "card") {
                    navigate("/payment");
                } else {
                    navigate("/order");
                }
            },
        });
    };

    const total = cards?.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
    );

    const finalTotal = cashback && Number(cashback) >= 1000000
        ? (total - Number(cashback))
        : total;


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center pt-3.5">
                <button type="button" onClick={() => navigate("/cart")} className="cursor-pointer">
                    <ArrowLeft />
                </button>
                <h3 className="font-semibold text-xl text-secondColor pl-[70px]">
                    To’lov tafsilotlari
                </h3>
            </div>

            <div className="flex items-center justify-between pt-5">
                <h4 className="font-semibold text-base text-secondColor">Buyurtma</h4>
                <p className="text-sm text-placeholderColor">{cards?.length} ta mahsulot</p>
            </div>

            <div className="border rounded-2xl p-4 flex flex-col gap-4 mt-2.5">
                {cards?.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-[11px] items-center">
                        <img className="h-[89px] w-[67px] object-contain" src={`${item.image}`} alt="" />
                        <div className="flex flex-col">
                            <h3 className="font-medium text-sm text-secondColor">{item.title}</h3>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-medium text-secondColor">Rang:</span>
                                <span className="px-2 py-1 bg-gray-100 text-secondColor rounded-md text-xs font-medium">
                                    {item.color_name}
                                </span>
                            </div>
                            <h5 className="font-semibold text-mainColor">{Number(item.price).toLocaleString("uz-UZ")}</h5>
                            <h3 className="text-xs text-placeholderColor">Miqdor: {item.quantity}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="font-semibold text-base text-secondColor pt-7.5">Yetkazib berish</h2>
            <div className="pt-2.5 flex flex-col gap-7.5">
                <div className="flex flex-col gap-[5px]">
                    <label className="text-sm leading-5">Ism va familiya</label>
                    <Input
                        {...register("full_name", { required: "Ism kiritlishi majburiy" })}
                        className="h-12 rounded-[12px] placeholder:text-base"
                        placeholder="Ismingizni kiriting"
                    />
                </div>

                <div className="flex flex-col gap-[5px]">
                    <label className="text-sm leading-5">Telefon raqam</label>
                    <Input
                        type="tel"
                        {...register("phone", { required: "Phone kiritlishi majburiy" })}
                        value={valueinput}
                        onChange={handleChange}
                        className="h-12 rounded-[12px] placeholder:text-base"
                        placeholder="+998(99) 888 90 98"
                    />
                </div>

                {addresses?.length === 0 ? (
                    <Button
                        type="button"
                        onClick={() => navigate("/location")}
                        variant="outline"
                        className="border-none w-[140px] h-5 text-lg leading-5 text-mainColor"
                    >
                        <Plus /> Manzil kiritish
                    </Button>
                ) : (
                    <div className="flex flex-col gap-2.5">
                        <h2 className="font-semibold text-base text-secondColor pt-7.5">
                            Yetkazib berish
                        </h2>
                        {addresses?.map((item: any) => (
                            <div key={item.id} className="border rounded-lg pr-2 pt-2 pb-5 pl-[18px] flex justify-between" >
                                <div className="pt-3">
                                    <h3 className="font-semibold text-secondColor capitalize">
                                        {item?.street ?? "Ko‘cha kiritilmagan"} tumani,
                                    </h3>
                                    <p className="text-placeholderColor flex items-center text-sm">
                                        {item?.entrance && <span>{item.entrance}</span>}
                                        {item?.floor && (<> <Dot size={16} /> <span>{item.floor}</span> </>)}
                                        {item?.apartment_number && (<> <Dot size={16} /> <span>{item.apartment_number}</span> </>)}
                                    </p>
                                </div>
                                <Button type="button" onClick={() => navigate("/location", { state: { address: item } })} className="w-9 h-9" variant={"outline"}><PencilLine className="w-4! h-4!" /></Button>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* <div>
                <h3 className="font-semibold text-base text-secondColor pt-7.5 pb-2.5">
                    Yetkazib berish turi
                </h3>

                <label
                    htmlFor="courier"
                    className={`flex gap-[15px] py-3.5 pl-4 border items-center rounded-[12px] cursor-pointer ${deliveryType === "courier"
                        ? "border-mainColor/50 bg-imgBgColor"
                        : "border-borderColor"
                        }`}>
                    <input
                        id="courier"
                        type="radio"
                        name="deliveryType"
                        value="courier"
                        checked={deliveryType === "courier"}
                        onChange={() => setValue("deliveryType", "courier")}
                        className="w-[18px] h-[18px] accent-mainColor"
                    />
                    <span className="text-sm text-secondColor">Kuryer orqali (1–2 kun)</span>
                </label>

                <label
                    htmlFor="pickup"
                    className={`flex gap-[15px] py-3.5 pl-4 border items-center rounded-[12px] cursor-pointer mt-2.5 ${deliveryType === "pickup"
                        ? "border-mainColor/50 bg-imgBgColor"
                        : "border-borderColor"
                        }`}>
                    <input
                        id="pickup"
                        type="radio"
                        name="deliveryType"
                        value="pickup"
                        checked={deliveryType === "pickup"}
                        onChange={() => setValue("deliveryType", "pickup")}
                        className="w-[18px] h-[18px] accent-mainColor"
                    />
                    <span className="text-sm text-secondColor">O‘zi olib ketish</span>
                </label>
            </div> */}

            <div className={`${userBalance && userBalance >= 1000000 ? "pt-7.5" : " pb-40"}`}>
                <h3 className="font-semibold text-base text-secondColor pt-7.5 pb-2.5">
                    To’lov turi
                </h3>
                {["card", "payme", "click"].map((type) => (
                    <label
                        key={type}
                        htmlFor={type}
                        className={`flex gap-[15px] py-3.5 pl-4 border items-center rounded-[12px] cursor-pointer mt-2.5 ${payment_type === type
                            ? "border-mainColor/50 bg-imgBgColor"
                            : "border-borderColor"
                            }`}
                    >
                        <input
                            id={type}
                            type="radio"
                            value={type}
                            {...register("payment_type")}
                            onChange={(e) => {
                                setValue("payment_type", e.target.value);
                                setValue("cashback", "0");
                            }}
                            className="w-[18px] h-[18px] accent-mainColor"
                        />

                        <span className="text-sm text-secondColor">
                            {type === "card"
                                ? "Kartaga pul o’tkazish"
                                : type === "payme"
                                    ? "Payme"
                                    : "Click"}
                        </span>
                    </label>
                ))}
            </div>

            {userBalance && userBalance >= 1000000 && (
                <div className="pb-40">
                    <div className="w-full border rounded-[12px] p-4">
                        <div className="flex items-center gap-2.5">
                            <Controller
                                control={control}
                                name="cashback"
                                render={({ field }) => (
                                    <div className="w-full flex items-center gap-2.5">
                                        <Checkbox
                                            className='focus-visible:ring-sky-600/20 size-6 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 dark:text-white dark:focus-visible:ring-sky-400/40 dark:data-[state=checked]:border-sky-400 dark:data-[state=checked]:bg-sky-400'
                                            checked={Number(field.value) > 0}
                                            onCheckedChange={(val) => {
                                                if (val) {
                                                    field.onChange(userBalance?.balance || 0);
                                                    setValue("payment_type", "");
                                                } else {
                                                    field.onChange("0");
                                                }
                                            }}
                                        />
                                        Keshbekdan foydalanish
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className={` px-[22px] py-2.5 border rounded-t-[20px] bottom-0 left-0 w-full bg-white fixed z-40`}>
                <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-[18px]">Jami:</h3>
                    <p className="font-semibold text-[18px]">{finalTotal?.toLocaleString("uz-UZ")} so‘m</p>
                </div>
                <Button type="submit" className="w-full mt-2.5">Buyurtmani tasdiqlash va to’lash</Button>
            </div>
        </form>
    )
}

export default CheckoutPage
