import { useState } from "react";
import { AiOutlineLineChart, AiOutlineThunderbolt } from "react-icons/ai";
import { FaWifi, FaKitchenSet } from "react-icons/fa6";
import { FaTv, FaParking } from "react-icons/fa";
import {
  MdOutlineLocalLaundryService,
  MdSevereCold,
} from "react-icons/md";

import { useGetAmenityQuery } from "../api/propertyTypeApi";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { setAmenities } from "../slice/propertySlice";
import { useNavigate } from "react-router-dom";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";



const iconMap = {
  wifi: FaWifi,
  tv: FaTv,
  kitchen: FaKitchenSet,
  laundry: MdOutlineLocalLaundryService,
  parking: FaParking,
  conditioner: MdSevereCold,
};

const AmenitySelector = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetAmenityQuery();
  const navigate = useNavigate();
  const translation = useGetTranslationQuery();

  
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(id)) {
       
        return prev.filter((x) => x !== id);
      }

      return [...prev, id];
    });
  };

  const nextPage = () => {
    dispatch(setAmenities(selectedAmenities));

     navigate("/propertyTitle");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="h-[100px] w-[90%] flex items-end justify-between">
        <AiOutlineLineChart className="text-[40px]" />
        <AiOutlineThunderbolt className="text-[40px]" />
      </div>

      <div className="w-[50%]">
        <p className="text-[39px]">
         {translation?.data?.data?.["tellGuestsWhatYourPlaceOffers"]}
        </p>

        <p className="text-[#888f8a]">
         {translation?.data?.data?.["addMoreAmenitiesAfterPublishing"]}
        </p>

        <p className="mt-8 mb-8 text-[18px] font-medium">
           {translation?.data?.data?.["guestFavoriteAmenities"]}
        </p>

        <div className="flex flex-wrap gap-8">
          {data?.data?.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];

            const isSelected = selectedAmenities.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-[30%] h-[100px] p-3 border rounded-2xl cursor-pointer transition-all
                  ${isSelected
                    ? "bg-[#b5abaa] text-white border-black"
                    : "bg-white text-black border-gray-300"
                  }`}
              >
                {Icon && (
                  <Icon
                    className={`text-[30px] ${isSelected ? "text-white" : "text-black"
                      }`}
                  />
                )}

                <h1 className="mt-2 text-[20px] font-semibold">
                  {item.name}
                </h1>
              </div>
            );
          })}
        </div>

        <button
          onClick={nextPage}
          className="mt-10 px-6 py-3 rounded-lg bg-black text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AmenitySelector;