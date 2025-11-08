
import { X } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { useGetOrders } from "../../hooks";

interface AboutModalProps {
    open: boolean;
    toggleOpen: () => void
}

export const AboutModal = ({ open, toggleOpen }: AboutModalProps) => {
    const { data: orders } = useGetOrders()
    const formatDate = (isoString:string) => {
        const date = new Date(isoString);
        return (
            String(date.getDate()).padStart(2, "0") +
            "." +
            String(date.getMonth() + 1).padStart(2, "0") +
            "." +
            date.getFullYear()
        );
    };
    return (
        <AlertDialog open={open} onOpenChange={toggleOpen} >
            <div className="relative">
                <AlertDialogContent className="flex flex-col gap-5 pt-[11px]! pr-[11px]! pl-5! pb-7.5! rounded-[15px] w-[366px]!">
                    <AlertDialogCancel className="border-none absolute right-0 top-0 h-10"><X /></AlertDialogCancel>
                    <AlertDialogHeader className="flex pt-2.5! text-start">
                        <AlertDialogTitle className="font-semibold text-xl text-modalTitleColor">
                            Buyurtma tafsiloti
                        </AlertDialogTitle>
                        {orders?.map((order: any) => (
                            order.items?.map((item: any) => (
                                <AlertDialogDescription key={item.id} className="flex items-start! flex-col gap-3 pt-3">
                                    <div className="flex gap-10">
                                        <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Buyurtma:</h4>
                                        <p className="font-medium text-sm leading-6 text-secondColor">1002</p>
                                    </div>
                                    <div className="flex gap-10">
                                        <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Sana:</h4>
                                        <p className="font-medium text-sm leading-6 text-secondColor">{formatDate(order.created_at)}</p>
                                    </div>
                                    <div className="flex gap-10">
                                        <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Holati:</h4>
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
                                    <div className="flex gap-10">
                                        <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Mahsulot:</h4>
                                        <p className="font-medium text-sm leading-6 text-secondColor flex gap-[5px] items-center">{item?.title} <X size={10} /> {item?.quantity}</p>
                                    </div>
                                    <div className="flex gap-10">
                                        <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Manzil:</h4>
                                        <p className="font-medium text-sm leading-6 text-secondColor">Toshkent, Mirobod 12</p>
                                    </div>
                                    <div className="flex gap-10">
                                        <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Treking:</h4>
                                        <p className="font-medium text-sm leading-6 text-mainColor">{item.tricking_code}</p>
                                    </div>
                                </AlertDialogDescription>
                            ))
                        ))}
                    </AlertDialogHeader>
                </AlertDialogContent>
            </div>
        </AlertDialog>
    )
}

export default AboutModal