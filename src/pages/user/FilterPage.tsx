import { useState } from "react";
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
export const FilterPage = () => {
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [selected, setSelected] = useState("discounted");

    const formatNumber = (value: any) => {
        const onlyNums = value.replace(/[^0-9]/g, "");
        return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleMinChange = (e: any) => setMinValue(formatNumber(e.target.value));
    const handleMaxChange = (e: any) => setMaxValue(formatNumber(e.target.value));
    return (
        <div className="pt-5 flex flex-col gap-5 mb-20">
            <h2 className="font-semibold text-[20px] text-secondColor">Filter</h2>
            <div className="flex flex-col gap-[11px] ">
                <h4 className="font-semibold text-base text-secondColor">Turi</h4>
                <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    <Button>G’ilof</Button>
                    <Button variant={"secondary"}>Quloqchin</Button>
                    <Button variant={"secondary"}>Quvvatlagich</Button>
                </div>
            </div>
            <div className="flex flex-col gap-[11px] ">
                <h4 className="font-semibold text-base text-secondColor">Material</h4>
                <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    <Button>Silikon</Button>
                    <Button variant={"secondary"}>PLastmassa</Button>
                    <Button variant={"secondary"}>Charm</Button>
                    <Button variant={"secondary"}>Shaffof</Button>
                </div>
            </div>
            <div className="flex flex-col gap-[11px]">
                <h4 className="font-semibold text-base text-secondColor">Rang</h4>
                <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    <Button>Oq</Button>
                    <Button variant={"secondary"}>Qora</Button>
                    <Button variant={"secondary"}>Ko'k</Button>
                    <Button variant={"secondary"}>Qizil</Button>
                    <Button variant={"secondary"}>Yashil</Button>
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
                <Button className="bg-white! border border-inputBorderColor! text-secondColor!">Tozalash</Button>
                <Button>Filterlash</Button>
            </div>
        </div>
    )
}

export default FilterPage