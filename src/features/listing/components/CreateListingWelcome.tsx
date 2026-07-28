
import { CiHome } from "react-icons/ci";
import { AiFillBulb } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const CreateListingWelcome = () => {
 
    const navigate = useNavigate();

const handleExit = ()=>{
navigate("/")
}

const getAmenity = ()=>{
    navigate("/amenity")
}

    return (
        <div>

            <div className='flex justify-around p-10'>
                <h1 className='text-[40px]'><AiFillBulb /></h1>
               <div className='h-[30px] w-[auto] flex p-[9px] rounded-2xl border-2 items-center justify-center'>
                 <h3 onClick={()=>(handleExit())} className='text-[25px]'>Cix</h3>
               </div>
            </div>
            <div className='w-[100%] h-[70vh] flex items-center justify-center'>

                <div className='w-[40%] h-[300px] gap-9 flex flex-col items-center justify-center'>

                    <h1 className='text-[40px] font-[400]'>Tekrar hoş geldiniz Murad</h1>
<div className='w-[100%] h-[30px] text-3xl '>
    <h1>Yeni bir ilan oluşturmaya başlayın</h1>
</div>
                    <div onClick={()=>(getAmenity())} className='flex items-center w-[100%] h-[40px] justify-between '>
                        <div className='w-[100%] flex items-center gap-2'>
                            <CiHome className='text-[40px]' />
                            <h1 className='text-[25px]'>Yeni bir ilan oluşturun</h1>
                        </div>

                        <h1 className='text-[40px]'> > </h1>
                    </div>
                             <div className='w-[100%] h-[1px] text-3xl bg-black'></div>
                </div>
            </div>
        </div>
    )
}

export default CreateListingWelcome
