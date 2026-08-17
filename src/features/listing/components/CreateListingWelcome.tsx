import { CiHome } from "react-icons/ci";
import { AiFillBulb } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";


const CreateListingWelcome = () => {

    const navigate = useNavigate();
    const { data } = useGetTranslationQuery();

    let token = useAppSelector(
        (state) => state.auth.accessToken
    );

    const payload = token
        ? JSON.parse(atob(token.split(".")[1]))
        : null;

    const name = payload?.[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    ];

    const handleExit = () => {
        navigate("/")
    }

    const getAmenity = () => {
        navigate("/propertyType")
    }
    return (
        <div>

            <div className='flex justify-around p-10'>
                <h1 className='text-[40px]'><AiFillBulb /></h1>
                <div className='h-[30px] w-[auto] flex p-[9px] rounded-2xl border-2 items-center justify-center'>
                    <h3 onClick={() => (handleExit())} className='text-[25px]'>{data?.data?.["createExit"]}</h3>
                </div>
            </div>
            <div className='w-[100%] h-[70vh] flex items-center justify-center'>

                <div className='w-[40%] h-[300px] gap-9 flex flex-col items-center justify-center'>

                    <h1 className='text-[40px] font-[400]'>{data?.data?.["createWelcomeBack"]} {name}</h1>
                    <div className='w-[100%] h-[30px] text-3xl '>
                        <h1>{data?.data?.["createStartListing"]}</h1>
                    </div>
                    <div onClick={() => (getAmenity())} className='flex items-center w-[100%] h-[40px] justify-between '>
                        <div className='w-[100%] flex items-center gap-2'>
                            <CiHome className='text-[40px]' />
                            <h1 className='text-[25px]'>{data?.data?.["createNewListing"]}</h1>
                        </div>

                        {/* <h1 className='text-[40px]'> ">" </h1> */}
                    </div>
                    <div className='w-[100%] h-[1px] text-3xl bg-black'></div>
                </div>
            </div>
        </div>
    )
}

export default CreateListingWelcome
