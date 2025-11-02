import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { data } from "../../data/card-data"
import { toast } from "react-toastify"

export const HomeCard = () => {

    const handleSave = (item:any) => {
        const saved = JSON.parse(localStorage.getItem("cards") || "[]");
        const alreadyExists = saved.some((el:any) => el.id === item.id);

        if (!alreadyExists) {
            const newItem = { ...item, count: 1 };
            saved.push(newItem);
            localStorage.setItem("cards", JSON.stringify(saved));
            toast.success("Mahsulot qo'shildi!");
        } else {
            toast.info("Bu mahsulot allaqachon saqlangan!");
        }
    };

    return (
        <div className="grid grid-cols-2 gap-2.5 pt-5">
            {data.map((data) => (
                <Link to={`/cart/${data.id}`}>
                    <img className="bg-imgBgColor w-full object-contain h-[198px] rounded-t-[20px]" src={data.image} alt="" />
                    <div className="flex flex-col gap-2.5 border-x border-b p-2.5 rounded-b-[12px]">
                        <h2 className="font-medium text-sm text-secondColor">{data.title}</h2>
                        <p className="text-[12px] text-placeholderColor">{data.description}</p>
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-base text-mainColor">{data.price}so‘m</h4>
                            <Button onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();    
                                handleSave(data);
                            }} className="w-[42px]! z-10 h-[42px]! cursor-pointer rounded-[12px]!"><ShoppingCart /></Button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default HomeCard