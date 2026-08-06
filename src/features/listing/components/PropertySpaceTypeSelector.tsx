import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { GrHost } from "react-icons/gr";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { setSpaceType } from "../../listing/slice/propertySlice"
import { useNavigate } from "react-router-dom";

const PropertySpaceTypeSelector = () => {

  const navigator = useNavigate();
  const translateData = useGetTranslationQuery();
  const dispatch = useAppDispatch();


  const handleSpaceType = (id: number) => {
    dispatch(setSpaceType(id))
    navigator("/amenitySelector")
  }

  return (
    <div>
      <div className='w-[100%] h-[100vh] flex flex-col items-center'>
        <div className="h-[100px] w-[90%] flex items-end justify-between">
          <AiOutlineLineChart className="text-[40px]" />
          <AiOutlineThunderbolt className="text-[40px]" />
        </div>


        <div className="w-[50%] h-auto">
          <div className="w-[100%] h-auto">
            <p className="text-[39px]">{translateData?.data?.data?.["spaceTitle"]}</p>
          </div>
          <div className="w-[100%] h-[50px]"></div>
          <div className="w-[100%] h-auto flex flex-wrap gap-[38px]">

            <div onClick={() => { handleSpaceType(0) }} className="w-[100%] h-[100px] p-[15px] flex justify-between items-center border-1  rounded-2xl text-[#f2f1ed] hover:text-black">

              <div>
                <h1 className="text-[25px]">{translateData?.data?.data?.["spaceEntirePlace"]}</h1>
                <p className="text-[#595d61]">{translateData?.data?.data?.["spaceEntirePlaceDescription"]}</p>
              </div>
              <MdOutlineHome className="text-[30px] text-black" />
            </div>

            <div onClick={() => { handleSpaceType(1) }} className="w-[100%] h-[100px] p-[15px] flex justify-between items-center border-1  rounded-2xl text-[#f2f1ed] hover:text-black">

              <div>
                <h1 className="text-[25px]">{translateData?.data?.data?.["spacePrivateRoom"]}</h1>
                <p className="text-[#595d61]">{translateData?.data?.data?.["spacePrivateRoomDescription"]}</p>
              </div>
              <MdOutlineMeetingRoom className="text-[30px] text-black" />
            </div>

            <div onClick={() => { handleSpaceType(2) }} className="w-[100%] h-[100px] p-[15px] flex justify-between items-center border-1  rounded-2xl text-[#f2f1ed] hover:text-black">

              <div>
                <h1 className="text-[25px]">{translateData?.data?.data?.["spaceSharedRoom"]}</h1>
                <p className="text-[#595d61]">{translateData?.data?.data?.["spaceSharedRoomDescription"]}</p>
              </div>
              <GrHost className="text-[30px] text-black" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySpaceTypeSelector
