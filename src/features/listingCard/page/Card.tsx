
import { FaArrowRightLong } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import { useGetAllCardQuery } from "../api/cardApi";
import { useGetPropertiesByCitiesQuery } from "../api/cardApi";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";
import { useNavigate } from "react-router-dom";
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "../../fovorite/api/favoriteApi";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { addFavoriteLocal, removeFavoriteLocal } from "../../fovorite/slice/favoriteSlice";

const Card = () => {

    const { data: getAllProperty } = useGetAllCardQuery();

    const translation = useGetTranslationQuery();
    const navigation = useNavigate();

    const dispatch = useDispatch();

    const favoriteIds = useAppSelector((state) => state.favorite.favoriteIds);
    const userLogin = useAppSelector((state) => state.auth.accessToken)

    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useDeleteFavoriteMutation();
  
    const { data: citiesData } =
    useGetPropertiesByCitiesQuery([121, 7, 5]);

    const handleFavorite = async (id: number) => {
        if (!userLogin)
            navigation("/login")

        const isFavorite = favoriteIds.includes(id);
        try {
            if (isFavorite) {
                await removeFavorite(id).unwrap();

                dispatch(removeFavoriteLocal(id));
            } else {
                await addFavorite(id).unwrap();

                dispatch(addFavoriteLocal(id));
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>

            <div className="w-auto h-auto flex flex-col gap-4 justify-center">

                <div className="h-[50px] flex items-center gap-2">
                    <h1 className="font-[500] text-[20px]">
                        {translation?.data?.data?.["propertyAllListings"]}
                    </h1>

                    <div className="w-[20px] h-[20px] bg-[#cacccf] rounded-[50%] flex items-center justify-center">
                        <FaArrowRightLong />
                    </div>
                </div>

                <div className="flex gap-3 w-full overflow-x-auto overflow-y-hidden scrollbar-none">

                    {getAllProperty?.data?.map((item) => (
                        <div
                            key={item.id}
                            className="h-auto w-[200px] flex-shrink-0 flex flex-col gap-2 relative"

                        >
                            <img
                                className="h-[200px] w-[200px] rounded-3xl"
                                src={item.imageUrl}
                                alt={item.title}
                                onClick={() => navigation(`/detailProperty/${item.id}`)}
                            />

                            <IoHeartOutline
                                className={`
    absolute
    left-[165px]
    top-3
    text-2xl
    cursor-pointer
    ${favoriteIds.includes(item.id)
                                        ? "text-red-500"
                                        : "text-white"
                                    }
  `}
                                onClick={() => handleFavorite(item.id)}
                            />

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


            {citiesData?.data?.map((city) => (

                <div
                    key={city.cityId}
                    className="w-auto h-auto flex flex-col gap-4 justify-center"

                >

                    <div className="h-[50px] flex items-center gap-2">

                        <h1 className="font-[500] text-[20px]">
                            {city.cityName} {translation?.data?.data?.["propertyNearbyListings"]}
                        </h1>

                        <div className="w-[20px] h-[20px] bg-[#cacccf] rounded-[50%] flex items-center justify-center">
                            <FaArrowRightLong />
                        </div>

                    </div>


                    <div className="flex gap-3 w-full overflow-x-auto overflow-y-hidden scrollbar-none">

                        {city.properties?.map((item) => (

                            <div
                                key={item.id}
                                className="h-auto w-[200px] flex-shrink-0 flex flex-col gap-2 relative"

                            >

                                <img
                                    className="h-[200px] w-[200px] rounded-3xl"
                                    src={item.imageUrl}
                                    alt={item.title}
                                    onClick={() => navigation(`/detailProperty/${item.id}`)}
                                />

                                <IoHeartOutline
                                    className={`
    absolute
    left-[165px]
    top-3
    text-2xl
    cursor-pointer
    ${favoriteIds.includes(item.id)
                                            ? "text-red-500"
                                            : "text-white"
                                        }
  `}
                                    onClick={() => handleFavorite(item.id)}
                                />

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

            ))}

        </>
    );
};

export default Card;

