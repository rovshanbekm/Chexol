import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetBusinessDetail } from "../../hooks/useProducts";

export const Header = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const { data: products = [], isLoading } = useGetBusinessDetail(query);

    const hideNavbar = pathname === "/cart"
        || pathname === "/checkout"
        || pathname === "/payment"
        || pathname === "/order"
        || pathname === "/profile"
        || pathname === "/cashback"
        || pathname === "/order-history"
        || pathname === "/location";

    return (
        <div className={`flex justify-between gap-2.5 w-full ${hideNavbar && "hidden"}`}>
            <div className="w-full relative">
                <div className="relative w-full">
                    <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Qidiruv"
                        className={`truncate rounded-[15px] placeholder:font-medium placeholder:text-base pl-[46px] h-12 focus:outline-none focus-visible:ring-0 shadow-none ${query ? "!border !border-mainColor" : "!border !border-inputBorderColor"}`}
                    />
                    <Search
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-placeholderColor"
                        size={20}
                    />
                </div>

                {query.trim() !== "" && (
                    <div className="mt-0.5 p-4 border rounded-[15px] absolute bg-white w-full overflow-hidden flex flex-col gap-5 shadow-[0px_0px_12px_4px_#00000014]">
                        {isLoading && <p className="text-sm text-gray-500">Yuklanmoqda...</p>}

                        {!isLoading && products.length === 0 && (
                            <p className="text-sm text-placeholderColor">“{query}” bu bo’yicha hech nima topilmadi</p>
                        )}

                        {!isLoading &&
                            products.map((p: any) => (
                                <Link to={`/products/${p.id}`} key={p.id} className=" flex items-center rounded-[8px] gap-1.5 hover:bg-gray-50 cursor-pointer">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${p.image}`}
                                        alt={p.title}
                                        className="w-5 h-7.5 object-cover"
                                    />
                                    <h3 className="text-sm text-secondColor">{p.title}</h3>
                                </Link>
                            ))}
                    </div>
                )}
            </div>
            {/* <Button variant={"outline"} onClick={() => navigate('/filter')}>
                <SlidersHorizontal size={24} />
            </Button> */}
        </div>
    )
}

export default Header