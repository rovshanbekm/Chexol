import { ArchiveX, ArrowLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AboutModal } from "../../components/modal"

export const OrderPage = () => {
  const cards = JSON.parse(localStorage.getItem("cards") || "[]")
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center pt-3.5">
        <button type="button" onClick={() => navigate("/")}>
          <ArrowLeft />
        </button>
        <h3 className="font-semibold text-xl text-secondColor pl-[90px]">
          Buyurtmalar
        </h3>
      </div>
      {cards.length === 0 ? (
        <div className="flex items-center justify-center flex-col pt-[185px]">
          <ArchiveX size={76} className="text-iconColor mb-5" />
          <div className="flex flex-col gap-0.5">
            <h2 className="font-semibold text-xl text-secondColor text-center">Hozircha buyurtmalar yo’q</h2>
            <p className="text-base text-placeholderColor pl-4 text-center">Siz hali hech qanday to'lov amalga oshirmagansiz</p>
          </div>
          <Button className="mt-5">Buyurtmani boshlash</Button>
        </div>
      ) : (
        cards.map((item: any) => (
          <div className="pt-[23px]">
            <div key={item.id} className="flex w-full border rounded-[12px] overflow-hidden">
              <img
                className="bg-imgBgColor object-contain"
                src={item.image}
                alt={item.title}
              />
              <div className="p-2.5 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm text-secondColor">
                    {item.title}
                  </h3>
                  <p className="text-xs text-statusColor w-[82px] h-[33px] bg-bgStatusColor rounded-[10px] flex items-center justify-center">Olib ketildi</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="font-semibold text-base text-mainColor">
                    {item.price}
                  </p>
                  <Button onClick={() => setOpen(true)} className="rounded-[12px]! h-[37px]! w-[76px] cursor-pointer" variant={"outline"}>Batafsil</Button>
                </div>
              </div>
            </div>
          </div>
        )))}
      <AboutModal open={open} toggleOpen={() => setOpen(!open)} />
    </div>
  )
}

export default OrderPage