import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { useGetRegions } from "../../hooks/useRegions";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { usePostUsers } from "../../hooks/useUsers";
import { getTelegramUserDataID } from "../../services/get_init_data_user_id";
import useStore from "../../context/store";
import { toast } from "react-toastify";
import { setTokens } from "../../utils/token";

type FormValues = {
    full_name: string;
    region: string;
    phone: string;
};

export const Signup = () => {
    const { handleSubmit, reset, control, register, setValue, watch } =
        useForm<FormValues>({
            defaultValues: { full_name: "", phone: "", region: "" },
        });

    const navigate = useNavigate();
    const { data: regions } = useGetRegions();
    const { mutate: createUsers } = usePostUsers();
    const chat_id = getTelegramUserDataID();
    const { login } = useStore();
    const valueinput = watch("phone", "");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, "");

        if (!input.startsWith("998") && input.length > 0) {
            input = "998" + input;
        }

        if (input.length > 12) input = input.slice(0, 12);

        let formatted = "";
        if (input.length > 0) formatted = "+" + input.substring(0, 3);
        if (input.length > 3) formatted += " (" + input.substring(3, 5);
        if (input.length >= 5) formatted += ")";
        if (input.length > 5) formatted += " " + input.substring(5, 8);
        if (input.length > 8) formatted += " " + input.substring(8, 10);
        if (input.length > 10) formatted += " " + input.substring(10, 12);

        setValue("phone", formatted.trim());
    };

    const onSubmit = (data: FormValues) => {
        const cleanedPhone = "+" + data.phone.replace(/\D/g, "");

        const payload = {
            full_name: data.full_name.trim(),
            phone: cleanedPhone,
            region: data.region,
            chat_id: chat_id,
        };

        createUsers(payload, {
            onSuccess: (res) => {
                const access_token = res.tokens?.access_token;
                const refresh_token = res.tokens?.refresh_token;
                const user_id = res?.id || res?.user?.id;
                setTokens({ access_token, refresh_token, user_id });
                reset({ full_name: "", phone: "", region: "" });
                login({ access_token, refresh_token });
                navigate("/");
            },
            onError: () => {
                toast.error("Bunaqa user allaqachon bor");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <h1 className="font-semibold text-xl text-secondColor text-center">
                Ro'yxatdan o'tish
            </h1>

            <div className="flex flex-col gap-7.5 pt-7.5">
                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">Ism</label>
                    <Input
                        {...register("full_name", { required: "Ism kiritilishi majburiy" })}
                        className="placeholder:text-base placeholder:text-placeholderColor py-3 px-4 focus-visible:ring-0 h-12 focus-visible:border-inputBorderColor border-inputBorderColor shadow-none"
                        placeholder="Ismingizni kiriting"
                    />
                </div>

                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">
                        Telefon raqam
                    </label>
                    <Input
                        {...register("phone", { required: "Telefon raqam majburiy" })}
                        value={valueinput}
                        onChange={handlePhoneChange}
                        className="placeholder:text-base placeholder:text-placeholderColor py-3 px-4 focus-visible:ring-0 h-12 focus-visible:border-inputBorderColor border-inputBorderColor shadow-none"
                        placeholder="+998 (99) 888 88 88"
                    />
                </div>

                <div className="flex flex-col gap-[5px] pb-5">
                    <label className="text-base leading-5 text-secondColor">Hudud</label>
                    <Controller
                        name="region"
                        control={control}
                        rules={{ required: "Hudud tanlash majburiy" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full h-12! rounded-[12px]">
                                    <SelectValue
                                        placeholder="Hududingizni tanlang"
                                        className="placeholder:text-base placeholder:text-placeholderColor"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {regions?.map((item: any) => (
                                            <SelectItem key={item.id} value={String(item.id)}>
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
    );
};

export default Signup;
