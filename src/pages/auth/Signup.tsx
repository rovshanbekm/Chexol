import { useNavigate } from "react-router-dom"
import { LocationSelect } from "../../components/select"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
// import { useForm } from "react-hook-form"

// type FormValues = {
//     full_name: string;
//     password: string;
//     region: string;
//     username: string;
//     chat_id: number;
//     phone: string
// };

export const Signup = () => {
    // const { handleSubmit } = useForm<FormValues>({
    //     defaultValues: { full_name: "", password: "", region: "" }
    // })
    const navigate = useNavigate()

    // const submit = () => {
    //     const payload = {
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //         email: data.email,
    //         role: data.role,
    //         business_branch: data.business_branch,
    //     };
    // }

    return (
        <form  className="flex flex-col h-full">
            <h1 className="font-semibold text-xl text-secondColor text-center">Ro'yxatdan o'tish</h1>
            <div className="flex flex-col gap-7.5 pt-7.5">
                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">Ism</label>
                    <Input
                        className="placeholder:text-base placeholder:text-placeholderColor py-3 px-4 focus-visible:ring-0 h-12 focus-visible:border-inputBorderColor! border-inputBorderColor shadow-none "
                        placeholder="Ismingizni kiriting"
                    />
                </div>
                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">Telefon raqam</label>
                    <Input
                        className="placeholder:text-base placeholder:text-placeholderColor py-3 px-4 focus-visible:ring-0 h-12 focus-visible:border-inputBorderColor! border-inputBorderColor shadow-none"
                        placeholder="+998(99) 888 90 98"
                    />
                </div>
                <div className="flex flex-col gap-[5px] pb-5">
                    <label className="text-base leading-5 text-secondColor">Hudud</label>
                    <LocationSelect />
                </div>
            </div>
            <Button onClick={() => navigate("/verify")} className="mt-auto">
                Ro’yxatdan o’tish
            </Button>
        </form>
    )
}

export default Signup