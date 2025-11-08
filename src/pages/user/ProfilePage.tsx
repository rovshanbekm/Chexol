import { ArrowLeft, ChevronRight, HandCoins, PenLine, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ava } from "../../assets/img"
import { Button } from "../../components/ui/button"
import useStore from "../../context/store"
import { Separator } from "@radix-ui/react-select"
import { useEffect, useState } from "react"
import { DeleteModal } from "../../components/modal"
import { Input } from "../../components/ui/input"
import { useEditProfile, useGetUsersProfile } from "../../hooks"
import { useForm } from "react-hook-form"

export const ProfilePage = () => {
  const navigate = useNavigate();
  const auth = useStore((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const { data: userProfile } = useGetUsersProfile();
  const { mutate: editProfile, isPending } = useEditProfile();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      full_name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        full_name: userProfile.full_name,
        phone: userProfile.phone,
      });
    }
  }, [userProfile, reset]);

  const handleEdit = () => {
    setEditing(true);
  };

  const onSubmit = (values:any) => {
    if (!userProfile?.id) return;
    editProfile(
      { id: userProfile.id, ...values },
      {
        onSuccess: () => {
          setEditing(false);
        },
      }
    );
  };
  return (
    <div className="h-full flex flex-col pb-20">
      {!editing && (
        <>
          <div className="flex items-center pt-3.5">
            <button type="button" onClick={() => navigate("/")} className="cursor-pointer">
              <ArrowLeft />
            </button>
            <h3 className="font-semibold text-xl text-secondColor pl-[75px]">
              Mening profilim
            </h3>
          </div>
          {auth ? (
            <>
              <div className="p-4 border border-inputBorderColor rounded-2xl flex items-center gap-4 relative mt-7.5">
                <img src={ava} alt="" />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-xl text-modalTitleColor">{userProfile?.full_name}</h2>
                  <p className="text-xs text-placeholderColor">{userProfile?.phone}</p>
                </div>
                <Button onClick={handleEdit} className="w-10 h-10 rounded-[12px] absolute right-4" variant={"outline"}><PenLine className="w-4! h-4!" /></Button>
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
                {/* <Separator className="h-0.5 bg-inputBorderColor" />
                <button onClick={() => setOpen(true)} className="flex items-center gap-3 py-4 pl-4 cursor-pointer">
                  <LogOut className="text-logoutColor" />
                  <h4 className="text-lg text-logoutColor">Hisobdan chiqish</h4>
                </button> */}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-[5px] py-4 pl-4 pr-1">
              <h3 className="font-semibold text-lg text-secondColor">Xush kelibsiz!</h3>
              <p className="text-sm text-placeholderColor">Ro‘yxatdan o‘ting va oson xarid, cashback hamda shaxsiy chegirmalardan foydalaning.</p>
              <Button onClick={() => navigate('/signup')} className="mt-2.5">Ro’yxatdan o’tish</Button>
            </div>
          )}
          <DeleteModal
            open={open}
            toggleOpen={() => setOpen(!open)}
          />
        </>
      )}

      {editing && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center pt-3.5">
            <button type="button" onClick={() => setEditing(false)} className="cursor-pointer">
              <ArrowLeft />
            </button>
            <h3 className="font-semibold text-xl text-secondColor pl-[75px]">
              Mening profilim
            </h3>
          </div>
          <div className="flex flex-col gap-7.5 mt-7.5 pb-4">
            <div className="flex flex-col gap-[5px]">
              <p className="text-base leading-5 text-secondColor">F.I.O</p>
              <Input {...register("full_name")} placeholder="F.I.O" className="h-12 rounded-[12px]" />
            </div>
            <div className="flex flex-col gap-[5px]">
              <p className="text-base leading-5 text-secondColor">Telefon raqam</p>
              <Input {...register("phone")} placeholder="Telefon raqam" className="h-12 rounded-[12px]" />
            </div>
          </div>
          <Button disabled={isPending} type="submit" className="mt-auto rounded-[20px] w-full"> {isPending ? "Saqlanmoqda..." : "Saqlash"}</Button>
        </form>
      )}
    </div>
  )
}

export default ProfilePage