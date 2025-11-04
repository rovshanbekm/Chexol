import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"

interface DeleteModalProps {
    open: boolean;
    toggleOpen: () => void
}

export const DeleteModal = ({ open, toggleOpen }: DeleteModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={toggleOpen} >
            <AlertDialogContent className="flex flex-col gap-5 p-5! rounded-[15px] w-[366px]!">
                <AlertDialogHeader className="flex  text-start">
                    <AlertDialogTitle className="font-semibold text-xl text-secondColor flex items-start!">Hisobdan chiqish</AlertDialogTitle>
                    <AlertDialogDescription className="flex items-start!">
                        Siz rostan ham hisobingizdan chiqmoqchimisiz?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid grid-cols-2 ">
                    <AlertDialogCancel className="w-full rounded-[12px]! cursor-pointer">Yo'q</AlertDialogCancel>
                    <AlertDialogAction className="rounded-[12px]! bg-deleteBtnColor cursor-pointer">Ha</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteModal