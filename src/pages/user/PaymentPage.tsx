import { ArrowLeft, CloudUpload, Copy, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { humo } from "../../assets/img"
import { useRef, useState } from "react"
import { Button } from "../../components/ui/button"

export const PaymentPage = () => {
    const navigate = useNavigate()
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <div >
            <div className="flex items-center pt-3.5">
                <button type="button" onClick={() => navigate("/checkout")}>
                    <ArrowLeft />
                </button>
                <h3 className="font-semibold text-xl text-secondColor pl-10">
                    Kartadan pul o’tkazish
                </h3>
            </div>
            <div className="pt-7.5">
                <h2 className="font-semibold text-base text-secondColor">Qabul qiluvchi</h2>
                <div className="border border-inputBorderColor rounded-[12px] p-4 mt-2.5">
                    <p className="font-medium text-base text-secondColor flex items-center gap-2.5">
                        9860 0000 0000 0000 <Copy className="text-mainColor" size={16} />
                    </p>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-placeholderColor pt-[7px]">Abdullayev Salim</p>
                        <img src={humo} alt="" />
                    </div>
                </div>
            </div>
            <div className="pt-[42px]">
                <h3 className="font-semibold text-base text-secondColor">Chekni yuklang</h3>
                <div className={`relative rounded-[15px] flex items-center justify-center overflow-hidden ${!preview ? "border border-inputBorderColor h-[90px] w-[123px] mt-2.5" : "h-[130px] w-32 pb-4"}`}>
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="preview"
                                className="w-[123px] h-[98px] object-cover rounded-[15px]"
                            />
                            <button
                                onClick={handleRemove}
                                className="w-[34px] h-[34px] border border-inputBorderColor rounded-full top-0 right-0 absolute bg-white flex items-center justify-center"
                            >
                                <Trash2 className="size-4.5 text-placeholderColor" />
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={handleClick}
                            className="flex flex-col items-center justify-center gap-[7px]"
                        >
                            <CloudUpload className="text-placeholderColor" />
                            <span className="text-xs text-placeholderColor">Chekni yuklash</span>
                        </button>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            </div>
            <Button className="w-full mt-[183px]">Jo’natish</Button>
        </div>
    )
}

export default PaymentPage