
import { X } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { useGetOrdersById } from "../../hooks";

interface AboutModalProps {
    open: boolean;
    toggleOpen: () => void
    orderId?: string | null;
}

export const OrderHistoryModal = ({ open, toggleOpen, orderId }: AboutModalProps) => {
    const { data: orders } = useGetOrdersById(orderId as string)


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
    return (
        <AlertDialog open={open} onOpenChange={toggleOpen} >
            <div className="relative">
                <AlertDialogContent className="flex flex-col gap-5 pt-[11px]! pr-[11px]! pl-5! pb-7.5! rounded-[15px] w-[366px]!">
                    <AlertDialogCancel className="border-none absolute right-0 top-0 h-10"><X /></AlertDialogCancel>
                    <AlertDialogHeader className="flex pt-2.5! text-start">
                        <AlertDialogTitle className="font-semibold text-xl text-modalTitleColor">
                            To’lov tafsiloti
                        </AlertDialogTitle>
                        {orders?.items?.map((item: any) => (
                            <AlertDialogDescription key={item.id} className="flex items-start! flex-col gap-3 pt-3">
                                <div className="flex gap-10">
                                    <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Buyurtma:</h4>
                                    <p className="font-medium text-sm leading-6 text-secondColor">{orders?.order_number}</p>
                                </div>
                                <div className="flex gap-10">
                                    <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Sana:</h4>
                                    <p className="font-medium text-sm leading-6 text-secondColor">{formatDate(orders.created_at)}</p>
                                </div>
                                <div className="flex gap-10">
                                    <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Mahsulot:</h4>
                                    <p className="font-medium text-sm leading-6 text-secondColor flex gap-[5px] items-center"> <span className="line-clamp-1">{item?.title}</span> <X size={10} /> {item?.quantity}</p>
                                </div>
                                <div className="flex gap-10">
                                    <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">To'lov turi:</h4>
                                    <p className="font-medium text-sm leading-6 text-secondColor capitalize">{orders.payment_type}</p>
                                </div>
                                <div className="flex gap-10">
                                    <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Summa:</h4>
                                    <p className="font-medium text-sm leading-6 text-secondColor">{Number(item.price).toLocaleString("uz-UZ")} so'm</p>
                                </div>
                                <div className="flex gap-10">
                                    <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Holati:</h4>
                                    {orders.status === "delivered" ? (
                                        <p className="text-xs rounded-[10px] flex items-center justify-center">
                                            Yetkazildi
                                        </p>
                                    ) : orders.status === "pending" ? (
                                        <p className="font-medium text-sm text-secondColor leading-6 flex items-center justify-center">
                                            Kutilmoqda
                                        </p>
                                    ) : orders.status === "in_progress" ? (
                                        <p className="font-medium text-sm text-secondColor leading-6 flex items-center justify-center">
                                            Tayyorlanmoqda
                                        </p>
                                    ) : orders.status === "on_the_way" ? (
                                        <p className="font-medium text-sm text-secondColor leading-6 flex items-center justify-center">
                                            Yetkazilmoqda
                                        </p>
                                    ) : (
                                        <p className="font-medium text-sm text-secondColor leading-6 flex items-center justify-center">
                                            Bekor qilindi
                                        </p>
                                    )}
                                </div>
                            </AlertDialogDescription>
                        ))}
                    </AlertDialogHeader>
                </AlertDialogContent>
            </div>
        </AlertDialog>
    )
}

export default OrderHistoryModal