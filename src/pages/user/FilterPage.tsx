import { useState } from "react";
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import sessionStore from "../../utils/sessionStore";
import { useGetCategories, useGetColors, useGetMaterials } from "../../hooks";
import { useNavigate } from "react-router-dom";
export const FilterPage = () => {
    const navigate = useNavigate();
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [selected, setSelected] = useState<"discounted" | "not-discounted" | null>(null);

    const settingsCategoryTab = sessionStore((state) => state.settingsCategoryTab);
    const setSettingsCategoryTab = sessionStore((state) => state.setSettingsCategoryTab);
    const settingsMaterialTab = sessionStore((state) => state.settingsMaterialTab);
    const setSettingsMaterialTab = sessionStore((state) => state.setSettingsMaterialTab);
    const settingsColorTab = sessionStore((state) => state.settingsColorTab);
    const setSettingsColorTab = sessionStore((state) => state.setSettingsColorTab);
    const setActiveFilter = sessionStore((state) => state.setActiveFilter);

    const { data: categories, isLoading } = useGetCategories();
    const { data: materials } = useGetMaterials();
    const { data: colors } = useGetColors();

    const formatNumber = (value: any) => {
        const onlyNums = value.replace(/[^0-9]/g, "");
        return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleMinChange = (e: any) => setMinValue(formatNumber(e.target.value));
    const handleMaxChange = (e: any) => setMaxValue(formatNumber(e.target.value));

    const handleFilter = () => {
        const filterData = {
            category_id: settingsCategoryTab,
            material_id: settingsMaterialTab,
            color_id: settingsColorTab,
            is_discounted: selected === "discounted",
            is_new: selected === "not-discounted",
            min_price: minValue ? Number(minValue.replace(/,/g, "")) : null,
            max_price: maxValue ? Number(maxValue.replace(/,/g, "")) : null,
        };

        setActiveFilter(JSON.stringify(filterData));
        navigate("/");
    };

    const handleReset = () => {
        setMinValue("");
        setMaxValue("");
        setSelected(null);
        setSettingsCategoryTab(null);
        setSettingsMaterialTab(null);
        setSettingsColorTab(null);

        setActiveFilter(null);
        navigate("/");
    };

    return (
        <div className="pt-5 flex flex-col gap-5 pb-20">
            <h2 className="font-semibold text-[20px] text-secondColor">Filter</h2>
            <div className="flex flex-col gap-[11px]">
                <h4 className="font-semibold text-base text-secondColor">Turi</h4>
                <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    {!isLoading &&
                        categories?.map((cat: any) => (
                            <button
                                key={cat.id}
                                onClick={() => setSettingsCategoryTab(cat.slug || cat.id)}
                                className={`h-12 rounded-[20px] px-[15px] border font-medium text-sm cursor-pointer ${settingsCategoryTab === (cat.slug || cat.id)
                                    ? "bg-mainColor text-white"
                                    : "bg-white text-secondColor"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                </div>
            </div>
            <div className="flex flex-col gap-[11px] ">
                <h4 className="font-semibold text-base text-secondColor">Material</h4>
                <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    {!isLoading &&
                        materials?.map((material: any) => (
                            <button
                                key={material.id}
                                onClick={() => setSettingsMaterialTab(material.slug || material.id)}
                                className={`h-12 rounded-[20px] py-[13.5px] px-[15px] border font-medium text-sm cursor-pointer ${settingsMaterialTab === (material.slug || material.id)
                                    ? "bg-mainColor text-white"
                                    : "bg-white text-secondColor"
                                    }`}
                            >
                                {material.name}
                            </button>
                        ))}
                </div>
            </div>
            <div className="flex flex-col gap-[11px]">
                <h4 className="font-semibold text-base text-secondColor">Rang</h4>
                <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    {!isLoading &&
                        colors?.map((color: any) => (
                            <button
                                key={color.id}
                                onClick={() => setSettingsColorTab(color.slug || color.id)}
                                className={`h-12 rounded-[20px] py-[13.5px] px-[15px] border font-medium text-sm cursor-pointer ${settingsColorTab === (color.slug || color.id)
                                    ? "bg-mainColor text-white"
                                    : "bg-white text-secondColor"
                                    }`}
                            >
                                {color.name}
                            </button>
                        ))}
                </div>
            </div>
            <div className="flex flex-col gap-[11px]">
                <h4 className="font-semibold text-base text-secondColor">Narx oralig’i</h4>
                <div className="flex gap-2.5">
                    <Input
                        type="text"
                        inputMode="numeric"
                        value={minValue}
                        onChange={handleMinChange}
                        placeholder="dan"
                        className="h-12 rounded-[15px] ring-0!"
                    />
                    <Input
                        type="text"
                        inputMode="numeric"
                        value={maxValue}
                        onChange={handleMaxChange}
                        placeholder="gacha"
                        className="h-12 rounded-[15px] ring-0!"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-[11px]">
                <h4 className="font-semibold text-base text-secondColor">Qo’shimcha</h4>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2.5">
                        <Checkbox
                            id="toggle-2"
                            checked={selected === "discounted"}
                            onCheckedChange={() => setSelected("discounted")}
                            className="data-[state=checked]:border-mainColor data-[state=checked]:bg-mainColor data-[state=checked]:text-white w-[26px] h-[26px] rounded-[6px]"
                        />
                        <p className="text-base text-secondColor">Faqat chegirmadagilar</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Checkbox
                            id="toggle-2"
                            checked={selected === "not-discounted"}
                            onCheckedChange={() => setSelected("not-discounted")}
                            className="data-[state=checked]:border-mainColor data-[state=checked]:bg-mainColor data-[state=checked]:text-white w-[26px] h-[26px] rounded-[6px]"
                        />
                        <p className="text-base text-secondColor">Eng yangi mahsulotlar</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
                <Button onClick={handleReset} className="bg-white! border border-inputBorderColor! text-secondColor!">Tozalash</Button>
                <Button onClick={handleFilter}>Filterlash</Button>
            </div>
        </div>
    )
}

export default FilterPage