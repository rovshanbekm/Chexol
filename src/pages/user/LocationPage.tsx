import { useNavigate, useLocation } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useGetRegions, usePostAddress, useEditAddress } from "../../hooks"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"

type FormValues = {
    region?: string;
    street?: string;
    home_number?: string;
    apartment_number?: string;
    floor?: string;
    entrance?: string;
};

export const LocationPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { data: regions } = useGetRegions()
    const { mutate: createAddress } = usePostAddress()
    const { mutate: editAddress } = useEditAddress()
    const addressData = location.state?.address || null

    const { handleSubmit, reset, register, control } = useForm<FormValues>({
        defaultValues: {
            region: "",
            street: "",
            home_number: "",
            apartment_number: "",
            floor: "",
            entrance: "",
        },
    })

    useEffect(() => {
        if (addressData) {
            reset({
                region: addressData?.region || "",
                street: addressData?.street || "",
                home_number: addressData?.home_number || "",
                apartment_number: addressData?.apartment_number || "",
                floor: addressData?.floor || "",
                entrance: addressData?.entrance || "",
            })
        }
    }, [addressData, reset])

    const onSubmit = (data: FormValues) => {
        const payload = {
            region: data.region,
            street: data.street,
            home_number: data.home_number,
            apartment_number: data.apartment_number,
            floor: data.floor,
            entrance: data.entrance,
        }

        if (addressData) {
            editAddress(
                { id: addressData.id, ...payload },
                {
                    onSuccess: () => {
                        navigate("/checkout")
                    },
                }
            )
        } else {
            createAddress(payload, {
                onSuccess: () => {
                    reset()
                    navigate("/checkout")
                },
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full pb-[26px]">
            <div className="flex flex-col gap-7.5 pb-4">
                <div className="flex items-center pt-3.5">
                    <button type="button" onClick={() => navigate("/checkout")} className="cursor-pointer">
                        <ArrowLeft />
                    </button>
                    <h3 className="font-semibold text-xl text-secondColor pl-[85px]">
                        {addressData ? "Manzilni tahrirlash" : "Manzil kiritish"}
                    </h3>
                </div>

                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">Hudud</label>

                    <Controller
                        name="region"
                        control={control}
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

                <div className="flex flex-col gap-[5px]">
                    <label className="text-base leading-5 text-secondColor">Ko’cha</label>
                    <Input
                        {...register("street", { required: true })}
                        className="rounded-[12px] py-3 px-4 h-12"
                        placeholder="Yangiobod ko’chasi"
                    />
                </div>

                <div className="flex gap-2.5">
                    <div className="flex flex-col gap-[5px]">
                        <label className="text-base leading-5 text-secondColor">Uy raqami</label>
                        <Input
                            {...register("home_number")}
                            className="rounded-[12px] py-3 px-4 h-12"
                            placeholder="23-uy"
                        />
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <label className="text-base leading-5 text-secondColor">Xonadon</label>
                        <Input
                            {...register("apartment_number")}
                            className="rounded-[12px] py-3 px-4 h-12"
                            placeholder="24-xonadon"
                        />
                    </div>
                </div>

                <div className="flex gap-2.5">
                    <div className="flex flex-col gap-[5px]">
                        <label className="text-base leading-5 text-secondColor">Yo’nalish</label>
                        <Input
                            {...register("entrance")}
                            className="rounded-[12px] py-3 px-4 h-12"
                            placeholder="3-podyezd"
                        />
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <label className="text-base leading-5 text-secondColor">Qavat</label>
                        <Input
                            {...register("floor")}
                            className="rounded-[12px] py-3 px-4 h-12"
                            placeholder="4-qavat"
                        />
                    </div>
                </div>
            </div>
            <Button type="submit" className="mt-auto">
                {addressData ? "Yangilash" : "Saqlash"}
            </Button>
        </form>
    )
}
export default LocationPage