
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"

interface ModalProps {
    open: boolean;
    toggleOpen: () => void;
    toggledelete: () => void

}
export const CartModal = ({ open, toggleOpen, toggledelete }: ModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={toggleOpen} >
            <AlertDialogContent className="flex flex-col gap-5 p-5! rounded-[15px] w-[366px]!">
                <AlertDialogHeader className="flex  text-start">
                    <AlertDialogTitle className="font-semibold text-xl text-secondColor flex items-start!">Tozalash</AlertDialogTitle>
                    <AlertDialogDescription className="flex items-start!">
                        Siz rostan ham savatchani tozalamoqchimisiz?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid grid-cols-2 ">
                    <AlertDialogCancel className="w-full rounded-[12px]!">Yo'q</AlertDialogCancel>
                    <AlertDialogAction onClick={toggledelete} className="rounded-[12px]! bg-deleteBtnColor">Ha</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CartModal