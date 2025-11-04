import { ArrowLeft, ChevronRight, HandCoins, LogOut, PenLine, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ava } from "../../assets/img"
import { Button } from "../../components/ui/button"
import useStore from "../../context/store"
import { Separator } from "@radix-ui/react-select"
import { useState } from "react"
import { DeleteModal } from "../../components/modal"
import { Input } from "../../components/ui/input"
// import { useGetUsersById } from "../../hooks/useUsers"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const auth = useStore((state) => state.auth)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  // const {id} = useParams()
  // const {data:usersById} = useGetUsersById(id)
  return (
    <>
      {!editing && (
        <div>
          <div className="flex items-center pt-3.5">
            <button type="button" onClick={() => navigate("/")} className="cursor-pointer">
              <ArrowLeft />
            </button>
            <h3 className="font-semibold text-xl text-secondColor pl-[75px]">
              Mening profilim
            </h3>
          </div>
          {!auth ? (
            <>
              <div className="p-4 border border-inputBorderColor rounded-2xl flex items-center gap-4 relative mt-7.5">
                <img src={ava} alt="" />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-xl text-modalTitleColor">Saidov Usoma</h2>
                  <p className="text-xs text-placeholderColor">+998 93 999 80 80</p>
                </div>
                <Button onClick={() => setEditing(true)} className="w-10 h-10 rounded-[12px] absolute right-4" variant={"outline"}><PenLine className="w-4! h-4!" /></Button>
              </div>

              <div className="border rounded-[15px] border-inputBorderColor mt-5">
                <button onClick={() => navigate('/order-history')} className="flex items-center justify-between p-4 w-full cursor-pointer">
                  <div className="flex gap-3 items-center">
                    <RotateCcw className="text-mainColor" />
                    <h3 className="text-lg text-secondColor">To’lov tarixi</h3>
                  </div>
                  <ChevronRight className="text-placeholderColor" />
                </button>
                <Separator className="h-0.5 bg-inputBorderColor" />
                <button onClick={() => navigate('/cashback')} className="flex items-center justify-between w-full p-4 cursor-pointer">
                  <div className="flex gap-3 items-center">
                    <HandCoins className="text-mainColor" />
                    <h3 className="text-lg text-secondColor">Keshbek</h3>
                  </div>
                  <div className="flex items-center gap-[18px]">
                    <h4 className="text-mainColor font-medium text-sm">+1 345 so’m</h4>
                    <ChevronRight className="text-placeholderColor" />
                  </div>
                </button>
                <Separator className="h-0.5 bg-inputBorderColor" />
                <button onClick={() => setOpen(true)} className="flex items-center gap-3 py-4 pl-4 cursor-pointer">
                  <LogOut className="text-logoutColor" />
                  <h4 className="text-lg text-logoutColor">Hisobdan chiqish</h4>
                </button>
              </div>
            </>
          ) : (
            <Button onClick={() => navigate('/signup')}>Ro’yxatdan o’tish</Button>
          )}
          <DeleteModal open={open} toggleOpen={() => setOpen(!open)} />
        </div>
      )}

      {editing && (
        <>
          <div className="flex items-center pt-3.5">
            <button type="button" onClick={() => setEditing(false)} className="cursor-pointer">
              <ArrowLeft />
            </button>
            <h3 className="font-semibold text-xl text-secondColor pl-[75px]">
              Mening profilim
            </h3>
          </div>
          <div className="flex flex-col gap-7.5 mt-7.5">
            <div className="flex flex-col gap-[5px]">
              <p className="text-base leading-5 text-secondColor">F.I.O</p>
              <Input placeholder="F.I.O" className="h-12 rounded-[12px]" />
            </div>
            <div className="flex flex-col gap-[5px]">
              <p className="text-base leading-5 text-secondColor">Telefon raqam</p>
              <Input placeholder="Telefon raqam" className="h-12 rounded-[12px]" />
            </div>
          </div>
          <Button onClick={() => setEditing(false)} className="mt-[295px] rounded-[20px] w-full">Saqlash</Button>
        </>
      )}
    </>
  )
}

export default ProfilePage