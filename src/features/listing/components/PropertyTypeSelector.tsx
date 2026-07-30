import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { FaSailboat } from "react-icons/fa6";
import { GiCaveEntrance } from "react-icons/gi";
import { VscHome } from "react-icons/vsc";
import { MdVilla } from "react-icons/md";
import { MdCabin } from "react-icons/md";
import { useGetPropertyTypeQuery } from "../api/propertyTypeApi";



const iconMap = {
    house: IoHome,
    apartment: FaBuilding,
    warehouse: FaWarehouse,
    boat: FaSailboat,
    cabin: MdCabin,
    cave: GiCaveEntrance,
    cottage: VscHome,
    villa: MdVilla,
};


const PropertyTypeSelector = () => {

    const { data } = useGetPropertyTypeQuery();
    console.log(data);

    return (
        <div>
            <div className='w-[100%] h-[100vh] flex flex-col items-center'>
                <div className="h-[100px] w-[90%] flex items-end justify-between">
                    <AiOutlineLineChart className="text-[40px]" />
                    <AiOutlineThunderbolt className="text-[40px]" />
                </div>


                <div className="w-[50%] h-auto">
                    <div className="w-[100%] h-auto">
                        <p className="text-[39px]">Aşağıdakilerden hangisi yerinizi en iyi tanımlıyor?</p>
                    </div>
                    <div className="w-[100%] h-[50px]"></div>
                    <div className="w-[100%] h-auto flex flex-wrap gap-[38px]">

                        {
                            data?.data?.map((item:string) => {
const Icon = iconMap[item.icone]


                                return (
                                    <>
                                      
                                      

                                        <div key={item.id} className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                                          {Icon && <Icon className="text-[30px] text-black" />}
                                            <h1 className="text-[25px]">{item.name}</h1>
                                        </div>
                                    </>)
                            })
                        }






                        {/* 
                        <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <FaBuilding className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Daire</h1>
                        </div>
                        <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <FaWarehouse className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Ambar</h1>
                        </div>

                        <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <FaSailboat className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Tekne</h1>
                        </div>


                        <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <VscHome className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Klube</h1>
                        </div>

                         <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <GiCaveEntrance className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Magara</h1>
                        </div>
                        <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <MdVilla className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Villa</h1>
                        </div>
                         <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <MdVilla className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Villa</h1>
                        </div>

                          <div className="w-[30%] h-[100px] p-[10px] border-1 rounded-2xl text-[#f2f1ed] hover:text-black">
                            <MdCabin className="text-[30px] text-black" />
                            <h1 className="text-[25px]">Villa</h1>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyTypeSelector
