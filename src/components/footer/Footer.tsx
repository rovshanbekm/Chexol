import { Link, useLocation } from "react-router-dom"
import { footerData } from "../../data/footer-data"

export const Footer = () => {
    const { pathname } = useLocation();
    // const navigate = useNavigate()
    const hideNavbar = pathname === "/cart" || pathname === "/checkout"
    const detailFooter = pathname.startsWith("/cart/") && pathname !== "/cart"

    return (
        <>
            <div className={`flex items-center justify-between px-[22px] py-2.5 border rounded-t-[20px] bottom-0 bg-white w-full fixed z-40 ${(hideNavbar || detailFooter) && "hidden"}`}>
                {footerData.map(({ name, path, icon: Icon }, index) => {
                    const isActive = pathname === path
                    return (
                        <Link to={path} key={index} className="flex flex-col items-center">
                            <Icon
                                className={`${isActive ? "text-mainColor" : "text-placeholderColor"}`}
                            />
                            <p className={`font-medium text-[12px] ${isActive ? "text-mainColor" : "text-placeholderColor"}`}>
                                {name}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default Footer
