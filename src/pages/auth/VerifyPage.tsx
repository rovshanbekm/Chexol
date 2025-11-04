import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";
import { useNavigate } from "react-router-dom";

export const VerifyPage = () => {
    const [timer, setTimer] = useState(60);
    const [code, setCode] = useState("");
    const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
    const navigate = useNavigate()

    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");

    const handleCheckCode = (value:string) => {
        if (value.length === 4) {
            if (value === "1111") {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
            }
        } else {
            setIsCorrect(null);
        }
    };

    useEffect(() => {
        if (timer <= 0) return;
        const id = setInterval(() => {
            setTimer((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(id);
    }, []); 

    // ✅ Resend bosilganda
    const handleResend = () => {
        if (timer > 0) return;
        setTimer(60);
        setCode("");
        setIsCorrect(null);
    };

    return (
        <div className="flex flex-col h-full">
            <h1 className="font-semibold text-xl text-center text-secondColor">
                Tasdiqlash kodi
            </h1>

            <div className="pt-[15px] flex flex-col gap-[15px] text-center text-placeholderColor">
                <h4 className="text-sm">
                    Biz sizga +998 90 *** ** 45 raqamiga SMS orqali 4 xonali kod yubordik.
                </h4>
                <p className="text-sm">Iltimos, tasdiqlash uchun kodni kiriting.</p>
            </div>

            {/* OTP input */}
            <div className="flex justify-center items-center pt-[50px]">
                <InputOTP
                    maxLength={4}
                    value={code}
                    onChange={(value) => {
                        setCode(value);
                        handleCheckCode(value);
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                >
                    <InputOTPGroup className="flex gap-2.5">
                        {[...Array(4)].map((_, index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                className={`w-[53px] h-[53px] rounded-[10px] border text-center shadow-none
                                    ${isCorrect === null
                                        ? "border-inputBorderColor"
                                        : isCorrect
                                            ? "border-mainColor! data-[active=true]:ring-mainColor/50 data-[active=true]:aria-invalid:ring-mainColor/20"
                                            : "border-red-600! focus:border-red-600 data-[active=true]:ring-red-600/40 data-[active=true]:aria-invalid:ring-red-600/20"
                                    }`}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>

            {/* Pastdagi button */}
            <div className="mt-auto flex justify-center">
                {isCorrect ? (
                    <Button className="w-full" onClick={() => navigate("/")}>
                        Tasdiqlash
                    </Button>
                ) : (
                    <Button
                        onClick={handleResend}
                        disabled={timer > 0}
                        className={`${timer > 0
                                ? "bg-[#E0E0E0] text-[#B9B9B9] w-full"
                                : "bg-mainColor w-full" 
                            }`}
                    >
                        {timer > 0 ? (
                            <>Qayta yuborish {minutes}:{seconds}</>
                        ) : timer === 0 && (
                            <>Qayta yuborish {minutes}:{seconds}</>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default VerifyPage;
