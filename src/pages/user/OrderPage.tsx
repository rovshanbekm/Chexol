import { ArchiveX, ArrowLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { AboutModal } from "../../components/modal"
import { useGetOrders } from "../../hooks"

export const OrderPage = () => {
  const navigate = useNavigate()
  const { data: orders } = useGetOrders()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2.5 pb-15">
      <div className="flex items-center pt-3.5">
        <button type="button" onClick={() => navigate("/")} className="cursor-pointer">
          <ArrowLeft />
        </button>
        <h3 className="font-semibold text-xl text-secondColor pl-[90px]">
          Buyurtmalar
        </h3>
      </div>
      {orders?.length === 0 ? (
        <div className="flex items-center justify-center flex-col pt-[185px]">
          <ArchiveX size={76} className="text-iconColor mb-5" />
          <div className="flex flex-col gap-0.5">
            <h2 className="font-semibold text-xl text-secondColor text-center">
              Hozircha buyurtmalar yo’q
            </h2>
            <p className="text-base text-placeholderColor pl-4 text-center">
              Siz hali hech qanday to'lov amalga oshirmagansiz
            </p>
          </div>
          <Button onClick={() => navigate("/")} className="mt-5">Buyurtmani boshlash</Button>
        </div>
      ) : (
        <div className="pt-[23px]">
          {orders?.map((order: any) => (
            <div key={order.id}>
              {order.items.map((item: any) => (
                <div key={item.id} className="flex w-full border rounded-[12px] overflow-hidden mb-3">
                  <img
                    className="bg-imgBgColor object-cover h-[131px] w-[101px]"
                    src={order.payment_proof || item.image}
                    alt={item.title}
                  />
                  <div className="p-2.5 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-secondColor">
                        {item.title}
                      </h3>
                      {order.payment_status === "paid" ? (
                        <p className="text-xs text-statusColor px-2.5 h-[33px] bg-bgStatusColor rounded-[10px] flex items-center justify-center">
                          To'langan
                        </p>
                      ) : order.payment_status === "waiting" ? (
                        <p className="text-xs text-waitingStatus px-2.5 h-[33px] bg-waitingStatus/7 rounded-[10px] flex items-center justify-center">
                          Kutilmoqda
                        </p>
                      ) : (
                        <p className="text-xs text-logoutColor w-[82px] h-[33px] bg-logoutColor/7 rounded-[10px] flex items-center justify-center">
                          To'lanmagan
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="font-semibold text-base text-mainColor">
                        {item.price * item.quantity} {/* umumiy narx */}
                      </p>
                      <Button
                        onClick={() => setOpen(true)}
                        className="rounded-[12px]! h-[37px]! w-[76px]"
                        variant={"outline"}
                      >
                        Batafsil
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <AboutModal open={open} toggleOpen={() => setOpen(!open)} />
        </div>
      )}

    </div>
  )
}

export default OrderPage