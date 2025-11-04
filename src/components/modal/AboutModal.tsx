
import { X } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"

interface AboutModalProps {
    open: boolean;
    toggleOpen: () => void
}

export const AboutModal = ({ open, toggleOpen }: AboutModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={toggleOpen} >
            <div className="relative">
                <AlertDialogContent className="flex flex-col gap-5 pt-[11px]! pr-[11px]! pl-5! pb-7.5! rounded-[15px] w-[366px]!">
                    <AlertDialogCancel className="border-none absolute right-0 top-0 h-10"><X /></AlertDialogCancel>
                    <AlertDialogHeader className="flex pt-2.5! text-start">
                        <AlertDialogTitle className="font-semibold text-xl text-modalTitleColor">
                            Buyurtma tafsiloti
                        </AlertDialogTitle>
                        <AlertDialogDescription className="flex items-start! flex-col gap-3 pt-3">
                            <div className="flex gap-10">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Buyurtma:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor">1002</p>
                            </div>
                            <div className="flex gap-10">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Sana:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor">18.11.2025</p>
                            </div>
                            <div className="flex gap-10">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Holati:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor">Yuborilgan</p>
                            </div>
                            <div className="flex gap-10">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Mahsulot:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor flex gap-[5px] items-center">Iphone 15 qora chexol <X size={10} /> 1</p>
                            </div>
                            <div className="flex gap-10">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Manzil:</h4>
                                <p className="font-medium text-sm leading-6 text-secondColor">Toshkent, Mirobod 12</p>
                            </div>
                            <div className="flex gap-10">
                                <h4 className="text-sm leading-6 text-placeholderColor w-[72px]">Treking:</h4>
                                <p className="font-medium text-sm leading-6 text-mainColor">TRK-123456</p>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </div>
        </AlertDialog>
    )
}

export default AboutModal