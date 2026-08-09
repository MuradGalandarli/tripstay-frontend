
import { FaArrowRightLong } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import { useGetAllCardQuery } from "../api/cardApi";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";

const Card = () => {

    const { data: getAllProperty } = useGetAllCardQuery();
    const translation = useGetTranslationQuery();
console.log(getAllProperty?.data);

    return (
        <>

            <div className='w-auto h-auto flex flex-col gap-4 justify-center '>
                <div className='h-[50px] flex items-center gap-2'>
                    <h1 className='font-[500] text-[20px]'>{translation?.data?.data?.["propertyAllListings"]}</h1>
                    <div className='w-[20px] h-[20px] bg-[#cacccf] rounded-[50%] flex items-center justify-center'>
                        <FaArrowRightLong />
                    </div>
                </div>

                <div className='flex gap-3 w-full overflow-x-auto overflow-y-hidden scrollbar-none'>
                   
                   {getAllProperty?.data?.map((item) => (
                    
                    
                   
                    <div className='h-auto w-[200px] flex-shrink-0 flex flex-col gap-2 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src={item.imageUrl} />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                        <div className="w-[150px] h-auto">
                            <p className="w-[200px] m-0 line-clamp-2 break-words">
                               {item.title}
                            </p>

                            <p className="m-0 text-[#bab7b6] text-[12px]">
                               $ {item.pricePerNight} USD
                            </p>
                        </div>

                    </div>
                   ))}









                </div>
            </div>



            <div className='w-auto h-[300px] flex flex-col gap-4 justify-center '>
                <div className='h-[20px] flex items-center gap-2'>
                    <h1 className='font-[500] text-[20px]'>Son görüntülenenler</h1>
                    <div className='w-[20px] h-[20px] bg-[#cacccf] rounded-[50%] flex items-center justify-center'>
                        <FaArrowRightLong />
                    </div>
                </div>

                <div className='flex gap-5 w-full overflow-x-auto overflow-y-hidden scrollbar-none'>
                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>

                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>

                    <div className='h-[200px] w-[200px] flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>
                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>
                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>
                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>
                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>
                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>
                    <div className='h-[200px] w-[200px] flex-shrink-0 flex flex-col gap-4 relative'>
                        <img className='h-[200px] w-[200px] rounded-3xl ' src="https://a0.muscache.com/im/pictures/miso/Hosting-1423070876278893684/original/ecef1b9e-fe0a-49f9-83fe-051288143f7a.jpeg?im_w=1200" alt="Home image    " />

                        <IoHeartOutline className='absolute left-[165px] text-2xl text-white top-3' />
                    </div>

                </div>
            </div>



        </>
    )
}

export default Card
