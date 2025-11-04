import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate()
    const { pathname } = useLocation();

    const hideNavbar = pathname ==="/cart"
    || pathname === "/checkout" 
    || pathname === "/payment" 
    || pathname === "/order"
    || pathname === "/profile"
    || pathname === "/cashback"
    || pathname === "/order-history"
    return (
        <div className={`flex justify-between gap-2.5 w-full ${hideNavbar && "hidden"}`}>
            <div className="relative  w-full">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value) }}
                    placeholder="Qidiruv"
                    className={`w-full truncate border border-inputBorderColor rounded-[15px] placeholder:font-medium placeholder:text-base pl-[46px]  h-12 focus:outline-none focus-visible:ring-0 shadow-none`}
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-placeholderColor" size={20} />
            </div>
            <Button variant={"outline"} onClick={() => navigate('/filter')}>
                <SlidersHorizontal size={24} />
            </Button>
        </div>
    )
}

export default Header