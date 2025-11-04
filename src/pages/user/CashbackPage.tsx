import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const CashbackPage = () => {
    const navigate = useNavigate()
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
                <h2 className="font-semibold text-2xl text-white pt-[5px]">54 300 so’m</h2>
                <div className="flex items-center gap-[11px] pt-5">
                    <div className="bg-white p-2.5 rounded-2xl w-full flex items-center flex-col justify-center gap-[5px]">
                        <h4 className="text-xs text-personalColor">Shaxsiy</h4>
                        <h3 className="font-semibold text-[16px] text-personalColor">54 300 so’m</h3>
                    </div>
                    <div className="bg-white p-2.5 rounded-2xl w-full flex items-center flex-col justify-center gap-[5px]">
                        <h4 className="text-xs text-personalColor">Shaxsiy</h4>
                        <h3 className="font-semibold text-[16px] text-personalColor">54 300 so’m</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CashbackPage