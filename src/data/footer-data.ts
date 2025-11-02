import { House, ShoppingCart, Archive } from 'lucide-react'
import { User } from '../assets/icon'

export const footerData  = [
    {
        name: "Bosh sahifa",
        path: '/',
        icon: House,
    },
    {
        name: "Savat",
        path: "/cart",
        icon: ShoppingCart,
    },
    {
        name: "Buyurtmalar",
        path: "/order",
        icon: Archive,
    },
    {
        name: "Profil",
        path: "/profile",
        icon: User,
    }
]