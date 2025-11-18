import { useGetCategories } from "../../hooks/useFilterTabs";
import sessionStore from "../../utils/sessionStore";

export const HomeTabs = () => {
    const settingsCategoryTab = sessionStore((state) => state.settingsCategoryTab);
    const setSettingsCategoryTab = sessionStore((state) => state.setSettingsCategoryTab);
    const setActiveFilter = sessionStore((state) => state.setActiveFilter);
    const { data: categories, isLoading } = useGetCategories();
    const handleReset = () => {
        setSettingsCategoryTab(null);
        setActiveFilter(null);
    };

    return (
        <div
            className="flex items-center gap-2.5 w-full overflow-x-auto"
            style={{ scrollbarWidth: "none" }}>
            <button
                onClick={handleReset}
                className={`rounded-[20px] px-[15px] border h-12 font-medium text-sm cursor-pointer ${settingsCategoryTab === null
                    ? "bg-mainColor text-white"
                    : "bg-white text-secondColor"
                    }`}
            >
                Hamma
            </button>
            {!isLoading &&
                categories?.map((cat: any) => (
                    <button
                        key={cat.id}
                        onClick={() => setSettingsCategoryTab(cat.slug || cat.id)}
                        className={`h-12 rounded-[20px] px-[15px] text-nowrap border font-medium text-sm cursor-pointer ${settingsCategoryTab === (cat.slug || cat.id)
                            ? "bg-mainColor text-white"
                            : "bg-white text-secondColor"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
        </div>
    );
};

export default HomeTabs;
