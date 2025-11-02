import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useGetRegions } from "../../hooks/useRegions"

export const LocationSelect = () => {
    const { data: regions } = useGetRegions()
    console.log(regions);
    
    return (
        <Select>
            <SelectTrigger className="w-full h-12!">
                <SelectValue placeholder="Hududingizni tanlang" className="placeholder:text-base placeholder:text-placeholderColor" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {regions?.map((item: any) => (
                        <SelectItem value={item.id}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default LocationSelect


{/* <SelectItem className="focus:bg-bgSelectColor! focus:text-mainColor!" value="apple">Apple</SelectItem> */ }