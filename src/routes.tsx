import { lazy, Suspense, type JSX } from "react";
import { createBrowserRouter } from "react-router-dom"
import { AuthLayout, UserLayout } from "./layouts";


const Signup = lazy(() => import('./pages/auth/Signup'));
const HomePage = lazy(() => import('./pages/user/HomePage'));
const VerifyPage = lazy(() => import('./pages/auth/VerifyPage'))
const CartPage = lazy(() => import('./pages/user/CartPage'))
const OrderPage = lazy(() => import('./pages/user/OrderPage'))
const ProfilePage = lazy(() => import('./pages/user/ProfilePage'))
const FilterPage = lazy(() => import('./pages/user/FilterPage'))
const CartDetailPage = lazy(() => import('./pages/user/CartDetailPage'))
const CheckoutPage = lazy(() => import('./pages/user/CheckoutPage'))
const PaymentPage = lazy(() => import('./pages/user/PaymentPage'))
const OrderHistoryPage = lazy(() => import('./pages/user/OrderHistoryPage'))
const CashbackPage = lazy(() => import('./pages/user/CashbackPage'))

const withSuspense = (el: JSX.Element) => (
    <Suspense fallback={<div></div>}>{el}</Suspense>
);
const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/signup',
                element: withSuspense(<Signup />)
            },
            {
                path: '/verify',
                element:withSuspense(<VerifyPage />)
            }
        ]
    },
    {
        element: <UserLayout />,
        children: [
            {
                path: "/",
                index: true,
                element: withSuspense(<HomePage />),
            },
            {
                path: "cart",
                element: withSuspense(<CartPage />)
            },
            {
                path: "order",
                element: withSuspense(<OrderPage />)
            },
            {
                path: "profile",
                element: withSuspense(<ProfilePage />)
            },
            {
                path: "filter",
                element: withSuspense(<FilterPage />)
            },
            {
                path: "checkout",
                element: withSuspense(<CheckoutPage />)
            },
            {
                path: "payment",
                element: withSuspense(<PaymentPage />)
            },
            {
                path: "order-history",
                element: withSuspense(<OrderHistoryPage />)
            },
            {
                path: "cashback",
                element: withSuspense(<CashbackPage />)
            }
        ]
    },
    {
        path: "/cart/:id",
        element: withSuspense(<CartDetailPage />),
    },
])

export default router