import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useGetRegions } from "../../hooks/useRegions"
// import { LocationSelect } from "../../components/select"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form"
import { usePostUsers } from "../../hooks/useUsers"
import { getTelegramUserDataID } from "../../services/get_init_data_user_id"
import useStore from "../../context/store"
import { toast } from "react-toastify"

type FormValues = {
    full_name?: string;
    password?: string;
    region?: string;
    username?: string;
    chat_id?: number;
    phone?: string
};

export const Signup = () => {
    const { handleSubmit, reset, control, register } = useForm<FormValues>({
        defaultValues: { full_name: "", phone: "", region: "" }
    })
    const navigate = useNavigate()
    const { data: regions } = useGetRegions()
    const { mutate: createUsers } = usePostUsers()
    const chat_id = getTelegramUserDataID()
    const {login} = useStore()

    const onSubmit = (data: FormValues) => {
        const payload = {
            full_name: data.full_name,
            phone: data.phone,
            region: data.region,
            chat_id: chat_id,
        };

        createUsers(payload, {
            onSuccess: (res) => {
                const access_token = res.tokens?.access_token;
                const refresh_token = res.tokens?.refresh_token;
                reset({
                    full_name: "",
                    phone: "",
                    region: "",
                });
                login({ access_token, refresh_token });
                navigate("/")
            },
            onError: () => {
                toast.error("token saqlanmadi");
                
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <h1 className="font-semibold text-xl text-secondColor text-center">Ro'yxatdan o'tish</h1>
            <div className="flex flex-col gap-7.5 pt-7.5">
                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">Ism</label>
                    <Input
                        {...register("full_name", { required: "Ism kiritlishi majburiy" })}
                        className="placeholder:text-base placeholder:text-placeholderColor py-3 px-4 focus-visible:ring-0 h-12 focus-visible:border-inputBorderColor! border-inputBorderColor shadow-none "
                        placeholder="Ismingizni kiriting"
                    />
                </div>
                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">Telefon raqam</label>
                    <Input
                        {...register("phone", { required: "Phone kiritlishi majburiy" })}
                        className="placeholder:text-base placeholder:text-placeholderColor py-3 px-4 focus-visible:ring-0 h-12 focus-visible:border-inputBorderColor! border-inputBorderColor shadow-none"
                        placeholder="+998(99) 888 90 98"
                    />
                </div>
                <div className="flex flex-col gap-[5px] pb-5">
                    <label className="text-base leading-5 text-secondColor">Hudud</label>
                    <Controller
                        name="region"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full h-12!">
                                    <SelectValue placeholder="Hududingizni tanlang" className="placeholder:text-base placeholder:text-placeholderColor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {regions?.map((item: any) => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>
            <Button type="submit" className="mt-auto">
                Ro’yxatdan o’tish
            </Button>
        </form>
    )
}

export default Signup