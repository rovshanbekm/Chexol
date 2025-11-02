import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { CartModal } from "../../components/modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { footerData } from "../../data/footer-data";

export const CartPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation()

  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards") || "[]")
  );

  const handleMinus = (id: any) => {
    const updated = cards.map((item: any) => {
      if (item.id === id && item.count > 1) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setCards(updated);
    localStorage.setItem("cards", JSON.stringify(updated));
  };

  const handlePlus = (id: any) => {
    const updated = cards.map((item: any) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setCards(updated);
    localStorage.setItem("cards", JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCards([]);
    localStorage.removeItem("cards");
  };

  const AllPrice = cards.reduce((total: number, item: any) => {
    const price = Number(item.price.toString().replace(/[^\d.-]/g, ""));
    return total + price * (item.count || 1);
  }, 0);

  return (
    <>
      <div className="flex items-center justify-between pt-3.5">
        <button onClick={() => navigate("/")}>
          <ArrowLeft />
        </button>
        <h3 className="font-semibold text-xl text-secondColor">Savatcha</h3>
        <button onClick={() => setOpen(true)}>
          <Trash2 className="text-red-600" />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {cards.length === 0 ? (
          <div className="flex items-center justify-center flex-col pt-[185px]">
            <ShoppingCart size={76} className="text-iconColor mb-5" />
            <div className="flex flex-col gap-0.5">
              <h2 className="font-semibold text-xl text-secondColor text-center">Savatda hozircha bo’sh</h2>
              <p className="text-base text-placeholderColor pl-4 text-center">Yoqtirgan mahsulotlaringizni tanlab, xaridni boshlang!</p>
            </div>
            <Button className="mt-5">Aksessuarlarni ko’rish</Button>
          </div>
        ) : (
          cards.map((item: any) => (
            <>
              <div
                key={item.id}
                className="flex w-full border rounded-[12px] overflow-hidden">
                <img
                  className="bg-imgBgColor object-contain"
                  src={item.image}
                  alt={item.title}
                />
                <div className="flex-1 p-2.5 flex flex-col justify-between relative">
                  <div>
                    <h3 className="font-medium text-sm text-secondColor line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-semibold text-base text-mainColor">
                      {item.price}
                    </p>
                  </div>

                  <div className="bg-imgBgColor p-[5px] flex items-center gap-2.5 rounded-[20px] self-end">
                    <button
                      onClick={() => handleMinus(item.id)}
                      className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center"
                    >
                      <Minus className="text-mainColor" />
                    </button>
                    <p className="w-[30px] text-center">{item.count}</p>
                    <button
                      onClick={() => handlePlus(item.id)}
                      className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center"
                    >
                      <Plus className="text-mainColor" />
                    </button>
                  </div>
                </div>
              </div>
              <div className={` px-[22px] py-2.5 border rounded-t-[20px] bottom-0 left-0 w-full bg-white fixed z-40`}>
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-semibold text-[18px]">Jami:</h3>
                  <p className="font-semibold text-[18px]"> {AllPrice.toLocaleString("uz-UZ")}so‘m</p>
                </div>
                <Button onClick={() => navigate("/checkout")} className="w-full mt-2.5">To’lov qilish</Button>
              </div>
            </>
          ))
        )}
      </div>

      {cards.length === 0 && (
        <div className={`flex items-center justify-between px-[22px] py-2.5 border rounded-t-[20px] left-0 bottom-0 bg-white w-full fixed z-40 `}>
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
      )}

      <CartModal
        open={open}
        toggleOpen={() => setOpen(!open)}
        toggledelete={handleClearCart}
      />
    </>
  );
};

export default CartPage;
