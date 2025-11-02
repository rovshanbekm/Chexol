import { ArrowLeft, PenLine } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ava } from "../../assets/img"
import { Button } from "../../components/ui/button"
import useStore from "../../context/store"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const auth = useStore((state) => state.auth)
  return (
    <div>
      {auth ? (
        <>
          <div className="flex items-center pt-3.5">
            <button type="button" onClick={() => navigate("/")}>
              <ArrowLeft />
            </button>
            <h3 className="font-semibold text-xl text-secondColor pl-[75px]">
              Mening profilim
            </h3>
          </div>

          <div className="p-4 border rounded-2xl flex items-center gap-4 relative">
            <img src={ava} alt="" />
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl text-modalTitleColor">Saidov Usoma</h2>
              <p className="text-xs text-placeholderColor">+998 93 999 80 80</p>
            </div>
            <Button className="w-10 h-10 rounded-[12px] absolute right-4" variant={"outline"}><PenLine className="w-4! h-4!" /></Button>
          </div>
        </>
      ): (
        <Button onClick={() => navigate('/signup')}>Ro’yxatdan o’tish</Button>    
      )}
    </div>
  )
}

export default ProfilePage