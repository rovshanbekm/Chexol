import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { CartModal } from "../../components/modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { footerData } from "../../data/footer-data";
import { useDeleteBusketsById, useGetBuskets, useUpdateBusket } from "../../hooks";
import { toast } from "react-toastify";

export const CartPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { data: buskets } = useGetBuskets();

  const { mutate: updateBusket } = useUpdateBusket();
  const { mutate: deleteBusket } = useDeleteBusketsById()


  const handlePlus = (item: any) => {
    if (item.quantity < item.stock) {
      updateBusket({
        id: item.id,
        quantity: item.quantity + 1,
        stock: item.stock,
      });
    } else {
      toast.warn("Omborda bundan ko‘p mahsulot yo‘q!");
    }
  };

  const handleMinus = (item: any) => {
    if (item.quantity > 1) {
      updateBusket({
        id: item.id,
        quantity: item.quantity - 1,
        stock: item.stock,
      });
    } else if (item.quantity === 1) {
      deleteBusket(item.id)
    }
  };

  const total = buskets?.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className={`${buskets?.length === 0 ? "flex" : " flex items-center justify-between"} pt-3.5`}>
        <button onClick={() => navigate("/")} className="cursor-pointer">
          <ArrowLeft />
        </button>
        <h3 className={`font-semibold text-xl text-secondColor ${buskets?.length === 0 && "pl-[106px]"}`}>Savatcha</h3>
        {buskets?.length > 0 && (
          <button onClick={() => setOpen(true)} className="cursor-pointer">
            <Trash2 className="text-red-600" />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 pb-32">
        {buskets?.length === 0 ? (
          <div className="flex items-center justify-center flex-col pt-[185px]">
            <ShoppingCart size={76} className="text-iconColor mb-5" />
            <div className="flex flex-col gap-0.5">
              <h2 className="font-semibold text-xl text-secondColor text-center">
                Savatda hozircha bo’sh
              </h2>
              <p className="text-base text-placeholderColor pl-4 text-center">
                Yoqtirgan mahsulotlaringizni tanlab, xaridni boshlang!
              </p>
            </div>
            <Button className="mt-5" onClick={() => navigate("/")}>Aksessuarlarni ko’rish</Button>
          </div>
        ) : (
          buskets?.map((item: any, index: string) => (
            <div
              key={index}
              className="flex w-full border rounded-[12px] overflow-hidden"
            >
              <img
                className="bg-imgBgColor object-cover w-[120px] h-auto"
                src={item.image}
                alt={item.title}
              />
              <div className="flex-1 p-2.5 flex flex-col justify-between relative">
                <div>
                  <h3 className="font-medium text-sm text-secondColor line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-secondColor">Rang:</span>
                    <span className="px-2 py-1 bg-gray-100 text-secondColor rounded-md text-xs font-medium">
                      {item.color_name}
                    </span>
                  </div>
                  <p className="font-semibold text-base text-mainColor">
                    {Number(item.price).toLocaleString("uz-UZ")} so‘m
                  </p>
                </div>

                <div className="p-[5px] flex items-center gap-2.5 rounded-[20px] self-end">
                  <button
                    onClick={() => handleMinus(item)}
                    className="w-8 h-[34px] bg-white border rounded-[8px] flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="text-mainColor" />
                  </button>
                  <p className="border flex items-center justify-center rounded-[6px] px-[29px] py-[5px] font-medium text-base text-secondColor">{item.quantity}</p>
                  <button
                    onClick={() => handlePlus(item)}
                    className="w-8 h-[34px] bg-white border rounded-[8px] flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="text-mainColor" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {buskets?.length > 0 && (
        <div className="px-[22px] py-2.5 border rounded-t-[20px] bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] sm:max-w-[425px] bg-white fixed z-40">
          <div className="flex items-center justify-between w-full">
            <h3 className="font-semibold text-[18px]">Jami:</h3>
            <p className="font-semibold text-[18px]"> {total?.toLocaleString("uz-UZ")} so‘m</p>
          </div>
          <Button
            className="w-full mt-2.5"
            onClick={() => {
              if (total <= 500000) {
                toast.error("Buyurtma umumiy summasi 500 000 so‘mdan oshishi kerak.");
                return;
              }

              navigate("/checkout");
            }}
          >
            To’lov qilish
          </Button>

        </div>
      )}

      {buskets?.length === 0 && (
        <div className="flex items-center justify-between px-[22px] py-2.5 border rounded-t-[20px] left-1/2 -translate-x-1/2 max-w-[390px] sm:max-w-[425px] bottom-0 bg-white w-full fixed z-40 ">
          {footerData.map(({ name, path, icon: Icon }, index) => {
            const isActive = pathname === path;
            return (
              <Link
                to={path}
                key={index}
                className="flex flex-col items-center"
              >
                <Icon
                  className={`${isActive ? "text-mainColor" : "text-placeholderColor"
                    }`}
                />
                <p
                  className={`font-medium text-[12px] ${isActive ? "text-mainColor" : "text-placeholderColor"
                    }`}
                >
                  {name}
                </p>
              </Link>
            );
          })}
        </div>
      )}

      <CartModal open={open} toggleOpen={() => setOpen(!open)} />
    </>
  );
};

export default CartPage;
