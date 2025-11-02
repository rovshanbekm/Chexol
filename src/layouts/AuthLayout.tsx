import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
    return (
        <div className="max-w-[390px] mx-auto px-4 pt-12.5 pb-6.5 h-dvh">
            <Outlet />
        </div>
    )
}

export default AuthLayout