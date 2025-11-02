import { useParams } from "react-router-dom"
import { data } from "../../data/card-data"
import { useState } from "react"
import { toast } from "react-toastify"
import { Minus, Plus } from "lucide-react"
import { Button } from "../../components/ui/button"

export const CartDetailPage = () => {
    const { id } = useParams()
    const card = data.find((item) => item.id === Number(id))
    const [count, setCount] = useState(1)


    const handleMinus = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const handlePlus = () => {
        setCount(count + 1)
    }

    const handleSave = (item: any) => {
        const saved = JSON.parse(localStorage.getItem("cards") || "[]");
        const existingIndex = saved.findIndex((el:any) => el.id === item.id);

        if (existingIndex === -1) {
            saved.push({ ...item, count });
            localStorage.setItem("cards", JSON.stringify(saved));
            toast.success("Savatga qo'shildi!");
        } else {
            saved[existingIndex].count += count;
            localStorage.setItem("cards", JSON.stringify(saved));
            toast.info("Miqdor yangilandi!");
        }
    };
    return (
        <>
            <div className="w-full px-4 pt-4">
                <div className="h-[198px] bg-imgBgColor w-full relative">
                    <img className="py-6 pl-[130px] h-[198px]" src={card?.image} alt="" />
                </div>
                <div className="pt-2.5 flex flex-col gap-2.5">
                    <h2 className="font-semibold text-lg">{card?.title}</h2>
                    <h4 className="text-sm text-placeholderColor">{card?.description}</h4>
                    <h3 className="font-semibold text-xl text-mainColor">{card?.price}</h3>
                </div>
            </div>
            <div className="flex items-center px-[22px] py-2.5 border rounded-t-[20px] bottom-0 bg-white w-full gap-2.5 fixed z-40" >
                <div className="bg-imgBgColor p-[5px] flex items-center gap-2.5 rounded-[20px]">
                    <button onClick={handleMinus} className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center">
                        <Minus className="text-mainColor" />
                    </button>
                    <p>{count}</p>
                    <button onClick={handlePlus} className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center">
                        <Plus className="text-mainColor" />
                    </button>
                </div>
                <Button onClick={() => handleSave(card)} className="w-[236px] font-semibold  text-base">Savatga qo’shish</Button>
            </div>
        </>
    )
}

export default CartDetailPage