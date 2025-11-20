import { Loader2 } from "lucide-react"

export const Loader = () => {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-[50%]">
            <div className="animate-spin">
                <Loader2 className="animate-spin size-8 text-mainColor" />
            </div>
        </div>
    )
}
