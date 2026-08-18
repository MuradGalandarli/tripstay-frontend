
import { useDispatch } from 'react-redux';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../api/favoriteApi';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { useGetAllCardQuery } from '../../listingCard/api/cardApi';
import { removeFavoriteLocal } from '../slice/favoriteSlice';
import { IoHeartOutline } from "react-icons/io5";
import favoriteImg from "../../../assets/FavoriteImage/img.png"
import { useNavigate } from 'react-router-dom';
import { addFavoriteLocal } from "../slice/favoriteSlice";

const Favorite = () => {

    const favoriteIds = useAppSelector((state) => state.favorite.favoriteIds);

    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useDeleteFavoriteMutation();
    const dispatch = useDispatch();
    const { data } = useGetAllCardQuery();
    const navigation = useNavigate();
   
    const selectedProperty = data?.data?.filter(property => favoriteIds.includes(property.id))
    console.log(favoriteIds)

    const handleFavorite = async (id: number) => {
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
  <div>
    {(selectedProperty?.length ?? 0) === 0 ? (
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src={favoriteImg}
          alt="No favorite properties"
          className="w-[250px]"
        />

        <p className="mt-4 text-gray-500">
          Hələ heç bir bəyənilmiş elan yoxdur
        </p>
      </div>
    ) : (
      <div className="flex gap-3 w-full overflow-x-auto overflow-y-hidden scrollbar-none">
        {selectedProperty?.map((item) => (
          <div
            key={item.id}
            className="h-auto w-[200px] flex-shrink-0 flex flex-col gap-2 relative m-[20px]"
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
                ${
                  favoriteIds.includes(item.id)
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
    )}
  </div>
);
}

export default Favorite
