import { useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { setTitle } from "../slice/propertySlice";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";

const PropertyTitle = () => {
    const [title, setTitleData] = useState("");
    const navigation = useNavigate();
    const dispatch = useAppDispatch();

    const translation = useGetTranslationQuery();

    const nextPage = () => {

        navigation("/propertyImageUpload")
        dispatch(setTitle(title))

    }

    return (

        <div>
            <div className='w-[100%] h-[100vh] flex flex-col items-center gap-5'>
                <div className="h-[100px] w-[90%] flex items-end justify-between">
                    <AiOutlineLineChart className="text-[40px]" />
                    <AiOutlineThunderbolt className="text-[40px]" />
                </div>
                <div className="h-[50px]"></div>
                <div className="h-[auto] w-[600px] flex flex-col gap-4">
                    <h1 className="text-[30px] font-[400]">{translation?.data?.data?.["setHomeTitle"]}</h1>
                    <p className="text-[15px] text-[#535754]">{translation?.data?.data?.["shortTitleAdvice"]}</p>
                    <textarea value={title} onChange={(e) => { setTitleData(e.target.value) }}
                        className="w-[600px] h-[250px] flex items-start justify-start p-[10px] border-1 rounded-2xl" />
                </div>
                <div onClick={() => { nextPage() }} className="w-[600px] flex justify-end"><button className="w-[130px] h-[50px] bg-black rounded-2xl text-white ">{translation?.data?.data?.["continueButton"]}</button></div>
            </div>
        </div>
    )
}

export default PropertyTitle
