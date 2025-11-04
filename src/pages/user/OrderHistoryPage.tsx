import { ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"

export const OrderHistoryPage = () => {
    const orderHistory = JSON.parse(localStorage.getItem("cards") || "[]")
    const navigate = useNavigate()
    return (
        <>
            <div className="flex items-center pt-3.5">
                <button type="button" onClick={() => navigate("/profile")} className="cursor-pointer">
                    <ArrowLeft />
                </button>
                <h3 className="font-semibold text-xl text-secondColor pl-24">
                    To’lov tarixi
                </h3>
            </div>
            {orderHistory.length === 0 ? (
                <div className="flex items-center justify-center flex-col pt-[185px]">
                    <CreditCard size={76} className="text-iconColor mb-5" />
                    <div className="flex flex-col gap-0.5">
                        <h2 className="font-semibold text-xl text-secondColor text-center">To'lov tarixi bo'sh</h2>
                        <p className="text-base text-placeholderColor pl-4 text-center">Siz hali hech qanday to'lov amalga oshirmagansiz</p>
                    </div>
                    <Button className="mt-5">Xaridni boshlash</Button>
                </div>
            ) : (
                orderHistory.map((item: any) => (
                    <div>
                        <h2>{item.title}</h2>
                    </div>
                ))
            )}
        </>
    )
}

export default OrderHistoryPage