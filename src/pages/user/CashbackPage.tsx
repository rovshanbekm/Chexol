import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useGetCashbacks, useGetUsersProfile } from "../../hooks"
import { Button } from "../../components/ui/button"
import { toast } from "react-toastify"
import { ReferalTable } from "../../components/table"

export const CashbackPage = () => {
    const navigate = useNavigate()
    const { data: cashbacks } = useGetCashbacks()
    const { data: userData } = useGetUsersProfile()
    const referralLink = `https://t.me/aksessuar_chexol_bot?start=${userData?.chat_id}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            toast.success("Referal link nusxalandi");
        } catch (err) {
            console.error(err);
        }
    };

    // const getTotalAmount = (list?: { amount: number }[]) => {
    //     if (!list || list.length === 0) return 0;
    //     return list.reduce((sum, item) => sum + (item?.amount || 0), 0);
    // };

    return (
        <>
            <div className="flex items-center pt-3.5">
                <button type="button" onClick={() => navigate("/profile")} className="cursor-pointer">
                    <ArrowLeft />
                </button>
                <h3 className="font-semibold text-xl text-secondColor pl-[84px]">
                    Keshbeklarim
                </h3>
            </div>
            <div className="w-full p-4 bg-[linear-gradient(180deg,#1860C4_0%,#0B2E5E_153.99%)] rounded-2xl mt-[11px]">
                <h3 className="text-sm text-cashbackTitleColor">Jami balans</h3>
                <h2 className="font-semibold text-2xl text-white pt-[5px]">{cashbacks?.total_cashback_all?.toLocaleString("uz-UZ")} so’m</h2>
                <div className="flex items-center gap-[11px] pt-5">
                    <div className="bg-white p-2.5 rounded-2xl w-full flex items-center flex-col justify-center gap-[5px]">
                        <h4 className="text-xs text-personalColor">Shaxsiy</h4>
                        <h3 className="font-semibold text-[16px] text-personalColor"> {Number(cashbacks?.my_cashback_total).toLocaleString("uz-UZ")} so’m</h3>
                    </div>
                    <div className="bg-white p-2.5 rounded-2xl w-full flex items-center flex-col justify-center gap-[5px]">
                        <h4 className="text-xs text-personalColor">Do’stim orqali</h4>
                        <h3 className="font-semibold text-[16px] text-personalColor">{Number(cashbacks?.referral_cashback_total).toLocaleString("uz-UZ")} so’m</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[5px] pt-7.5">
                <h3 className="font-semibold text-xl text-secondColor">Keshbekni oshiring</h3>
                <p className="text-base text-placeholderColor">Do‘stlaringizni taklif qiling va xaridlar orqali qo‘shimcha keshbek oling</p>
                <Button onClick={handleCopy} className="font-semibold text-base w-[218px] mt-[15px]">Do'stlaringizga ulashing</Button>
            </div>
            <ReferalTable />
        </>
    )
}

export default CashbackPage