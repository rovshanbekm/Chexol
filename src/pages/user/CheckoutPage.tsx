import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"

export const CheckoutPage = () => {
    const navigate = useNavigate()
    const [valueinput, setValueinput] = useState("")

    const { setValue, watch } = useForm()
    const deliveryType = watch("deliveryType")
    const paymentType = watch("paymentType")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, "")

        if (!input.startsWith("998") && input.length > 0) {
            input = "998" + input
        }
        if (input.length > 12) input = input.slice(0, 12)

        let formatted = ""
        if (input.length > 0) formatted = "+" + input.substring(0, 3)
        if (input.length > 3) formatted += ` (${input.substring(3, 5)}`
        if (input.length >= 5) formatted += ")"
        if (input.length > 5) formatted += " " + input.substring(5, 8)
        if (input.length > 8) formatted += " " + input.substring(8, 10)
        if (input.length > 10) formatted += " " + input.substring(10, 12)

        setValueinput(formatted.trim())
    }

    const cards = JSON.parse(localStorage.getItem("cards") || "[]")

    const AllPrice = cards.reduce((total: number, item: any) => {
        const price = Number(item.price.toString().replace(/[^\d.-]/g, ""));
        return total + price * (item.count || 1);
    }, 0);

    return (
        <form>
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
                <p className="text-sm text-placeholderColor">{cards.length} ta mahsulot</p>
            </div>

            <div className="border rounded-2xl p-4 flex flex-col gap-4 mt-2.5">
                {cards.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-[11px] items-center">
                        <img className="h-[89px] object-contain" src={item.image} alt="" />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium text-sm text-secondColor">{item.title}</h3>
                            <h5 className="font-semibold text-mainColor">{item.price}</h5>
                            <h3 className="text-xs text-placeholderColor">Miqdor: {item.count}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="font-semibold text-base text-secondColor pt-7.5">Yetkazib berish</h2>
            <div className="pt-2.5 flex flex-col gap-7.5">
                <div className="flex flex-col gap-[5px]">
                    <label className="text-sm leading-5">Ism va familiya</label>
                    <Input
                        className="h-12 rounded-[12px] placeholder:text-base"
                        placeholder="Ismingizni kiriting"
                    />
                </div>

                <div className="flex flex-col gap-[5px]">
                    <label className="text-sm leading-5">Telefon raqam</label>
                    <Input
                        type="tel"
                        value={valueinput}
                        onChange={handleChange}
                        className="h-12 rounded-[12px] placeholder:text-base"
                        placeholder="+998(99) 888 90 98"
                    />
                </div>

                <div className="flex flex-col gap-[5px]">
                    <label className="text-sm leading-5">Manzil</label>
                    <textarea
                        className="border h-[74px] rounded-[12px] px-4 pt-2.5"
                        placeholder="Viloyat, tuman, ko’cha va uy raqami"
                    />
                </div>
            </div>

            <div>
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
            </div>

            <div className="pb-40">
                <h3 className="font-semibold text-base text-secondColor pt-7.5 pb-2.5">
                    To’lov turi
                </h3>

                <label
                    htmlFor="payment"
                    className={`flex gap-[15px] py-3.5 pl-4 border items-center rounded-[12px] cursor-pointer ${paymentType === "payment"
                        ? "border-mainColor/50 bg-imgBgColor"
                        : "border-borderColor"
                        }`}>
                    <input
                        id="payment"
                        type="radio"
                        name="paymentType"
                        value="payment"
                        checked={paymentType === "payment"}
                        onChange={() => setValue("paymentType", "payment")}
                        className="w-[18px] h-[18px] accent-mainColor"
                    />
                    <span className="text-sm text-secondColor">Kartaga pul o’tkazish</span>
                </label>

                <label
                    htmlFor="payme"
                    className={`flex gap-[15px] py-3.5 pl-4 border items-center rounded-[12px] cursor-pointer mt-2.5 ${paymentType === "payme"
                        ? "border-mainColor/50 bg-imgBgColor"
                        : "border-borderColor"
                        }`}>
                    <input
                        id="payme"
                        type="radio"
                        name="paymentType"
                        value="payme"
                        checked={paymentType === "payme"}
                        onChange={() => setValue("paymentType", "payme")}
                        className="w-[18px] h-[18px] accent-mainColor"
                    />
                    <span className="text-sm text-secondColor">Payme</span>
                </label>
                
                <label
                    htmlFor="click"
                    className={`flex gap-[15px] py-3.5 pl-4 border items-center rounded-[12px] cursor-pointer mt-2.5 ${paymentType === "click"
                        ? "border-mainColor/50 bg-imgBgColor"
                        : "border-borderColor"
                        }`}>
                    <input
                        id="click"
                        type="radio"
                        name="paymentType"
                        value="click"
                        checked={paymentType === "click"}
                        onChange={() => setValue("paymentType", "click")}
                        className="w-[18px] h-[18px] accent-mainColor"
                    />
                    <span className="text-sm text-secondColor">Click</span>
                </label>
            </div>

            <div className={` px-[22px] py-2.5 border rounded-t-[20px] bottom-0 left-0 w-full bg-white fixed z-40`}>
                <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-[18px]">Jami:</h3>
                    <p className="font-semibold text-[18px]"> {AllPrice.toLocaleString("uz-UZ")}so‘m</p>
                </div>
                <Button type="button" onClick={() => navigate("/payment")} className="w-full mt-2.5">Buyurtmani tasdiqlash va to’lash</Button>
            </div>
        </form>
    )
}

export default CheckoutPage
