import { Outlet } from "react-router-dom"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export const UserLayout = () => {
    return (
        <>
            <div className="max-w-[390px] mx-auto px-4 pt-4 h-dvh">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default UserLayout