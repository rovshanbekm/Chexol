import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useGetFilteredProducts, useGetProducts } from "../../hooks/useProducts";
import sessionStore from "../../utils/sessionStore";
import { Loader } from "../loader";

// type FormValues = {
//     product_id: string;
//     quantity: number;
// };

export const HomeCard = () => {
  // const { reset } = useForm<FormValues>({
  //     defaultValues: { product_id: "", quantity: 1 },
  // });

  const navigate = useNavigate()
  const settingsCategoryTab = sessionStore((state) => state.settingsCategoryTab);
  const activeFilter = sessionStore((state) => state.activeFilter);

  // const { mutate: createBuskets } = usePostCart();

  const parsedActiveFilter = activeFilter ? JSON.parse(activeFilter) : {};

  const filterParams = {
    ...parsedActiveFilter,
    category_id:
      settingsCategoryTab !== "all"
        ? settingsCategoryTab
        : parsedActiveFilter?.category_id,
    enabled: true,
  };

  const { data: filteredProducts } = useGetFilteredProducts(filterParams);
  const { data: allProducts, isLoading } = useGetProducts();

  const list =
    filteredProducts?.length || settingsCategoryTab || activeFilter
      ? filteredProducts
      : allProducts;

  // const handleAddToCart = (e: React.MouseEvent, productId: string, item: any) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     const payload = {
  //         product_id: productId,
  //         quantity: 1,
  //         color: item?.colors?.length ? item.colors[0].color : "",
  //     };

  //     createBuskets(payload, {
  //         onSuccess: () => {
  //             reset();
  //             toast.success("Mahsulot savatga qo'shildi");
  //         },
  //     });
  //     navigate("/cart")
  // };

  return (
    <>
      {isLoading ? <Loader /> :
      list?.length === 0 ? (
        <div className="flex items-center justify-center flex-col pt-[185px]">
          <ShoppingBag className="w-[60px] h-[60px] text-gray-400" />
          <div className="flex flex-col gap-1 items-center pt-5">
            <h2 className="font-semibold text-xl text-secondColor text-center">
              Kategoriya hozircha bo‘sh.
            </h2>
            <p className="text-base text-placeholderColor">
              Tez orada yangi mahsulotlar qo‘shiladi!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 pt-5">
          {list?.map((item: any) => (
            <Link to={`/products/${item.id}`} key={item.id} className="border rounded-[12px]">
              <img
                className="w-full object-contain rounded-t-[12px]"
                src={`${import.meta.env.VITE_API_URL}${item?.image}`}
                alt={item?.title}
              />
              <div className="flex flex-col gap-2.5  p-2.5">
                <h2 className="font-medium text-sm text-secondColor line-clamp-1">
                  {item?.title}
                </h2>
                <p className="text-[12px] text-placeholderColor line-clamp-1">
                  {item?.description}
                </p>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[12px] 2xs:text-sm sm:text-[15px] text-mainColor">
                    {Number(item?.price).toLocaleString("uz-UZ")} so‘m
                  </h4>
                  <Button
                    type="button"
                    onClick={() => navigate(`${`/products/${item.id}`}`)}
                    className="w-8! h-[33px]! 2xs:w-[42px]! 2xs:h-[42px]! rounded-[10px]! 2xs:rounded-[12px]!"
                  >
                    <ShoppingCart className="size-4.5! 2xs:size-6!" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeCard;
