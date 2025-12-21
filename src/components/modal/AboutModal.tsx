
import { Equal, X } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { useGetOrdersById } from "../../hooks";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface AboutModalProps {
    open: boolean;
    toggleOpen: () => void
    orderId?: string | null;
}

export const AboutModal = ({ open, toggleOpen, orderId }: AboutModalProps) => {
    const { data: orders } = useGetOrdersById(orderId as string)
    const navigate = useNavigate()


    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return (
            String(date.getDate()).padStart(2, "0") +
            "." +
            String(date.getMonth() + 1).padStart(2, "0") +
            "." +
            date.getFullYear()
        );
    };
    const handleNavigate = () => {
        if (orders?.payment_type === "card") {
            navigate("/payment")
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={toggleOpen} >
            <div className="relative">
                <AlertDialogContent aria-describedby={undefined} className="flex flex-col gap-5 pt-[11px]! pr-[11px]! pl-5! pb-7.5! rounded-[15px] w-[396px]!">
                    <AlertDialogCancel className="border-none absolute right-0 top-0 h-10"><X /></AlertDialogCancel>
                    <AlertDialogHeader className="flex pt-2.5! text-start">
                        <AlertDialogTitle className="font-semibold text-xl text-modalTitleColor">
                            Buyurtma tafsiloti
                        </AlertDialogTitle>
                        <div className="flex flex-col gap-3 pt-3">
                            <div className="flex gap-7">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Buyurtma:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor">{orders?.order_number}</p>
                            </div>

                            <div className="flex gap-7">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Sana:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor">{formatDate(orders?.created_at)}</p>
                            </div>

                            <div className="flex gap-7">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Holati:</h4>
                                {orders?.payment_status === "paid" ? (
                                    <p className="text-xs text-statusColor px-2.5 h-[33px] bg-bgStatusColor rounded-[10px] flex items-center justify-center">To'langan</p>
                                ) : orders?.payment_status === "waiting" ? (
                                    <p className="text-xs text-waitingStatus px-2.5 h-[33px] bg-waitingStatus/7 rounded-[10px] flex items-center justify-center">Kutilmoqda</p>
                                ) : (
                                    <p className="text-xs text-logoutColor w-[82px] h-[33px] bg-logoutColor/7 rounded-[10px] flex items-center justify-center">To'lanmagan</p>
                                )}
                            </div>

                            <div className="flex gap-7">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Mahsulot:</h4>
                                <div className="flex flex-col gap-1">
                                    {orders?.items?.map((item: any) => (
                                        <div className="flex items-center gap-[5px]">
                                            <img className="w-[16px] h-[16px]" src={item.image} alt="" />
                                            <p className="font-medium text-sm leading-6 text-secondColor">{item?.title}</p>
                                            <X className="size-2.5" />
                                            <p className="font-medium text-sm leading-6 text-secondColor">{item?.quantity} dona</p>
                                            <Equal className="size-2.5" />
                                            <p className="font-medium text-sm leading-6 text-secondColor">{Number(item?.price).toLocaleString("uz-UZ")} so'm</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-7">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Manzil:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor">{orders?.address_region_name}, {orders?.address_name}</p>
                            </div>

                            {orders?.tracking_code && (
                                <div className="flex items-center gap-10">
                                    <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Treking:</h4>
                                    <p className="font-medium text-sm leading-6 text-mainColor">{orders?.tracking_code}</p>
                                </div>
                            )}

                            {orders?.payment_status === "waiting" && (
                                <Button className="h-9 w-[140px] mx-auto" onClick={handleNavigate}>Qayta to'lash</Button>
                            )}
                        </div>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </div>
        </AlertDialog>
    )
}

export default AboutModal