import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";

const PropertyCreatedFailed = () => {

  const navigate = useNavigate();
  const translation = useGetTranslationQuery();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-gray-100
          bg-white
          p-10
          text-center
          shadow-xl
        "
      >

      
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-red-100
          "
        >
          <FaXmark className="text-4xl text-red-600" />
        </div>


        
        <h1
          className="
            mt-7
            text-3xl
            font-bold
            text-gray-900
          "
        >
           {translation?.data?.data?.["failTitle"]}
        </h1>


      
        <p
          className="
            mt-4
            leading-7
            text-gray-500
          "
        >
           {translation?.data?.data?.["failDescription"]}
        </p>


     
        <button
          onClick={() => navigate("/createListingWelcome")}
          className="
            mt-8
            w-full
            rounded-2xl
            bg-black
            py-4
            text-base
            font-semibold
            text-white
            transition
            hover:bg-gray-800
          "
        >
              {translation?.data?.data?.["failRetryButton"]}
        </button>


        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className="
            mt-3
            w-full
            rounded-2xl
            border
            border-gray-200
            py-4
            text-base
            font-semibold
            text-gray-700
            transition
            hover:bg-gray-50
          "
        >
              {translation?.data?.data?.["failHomeButton"]}
        </button>

      </div>

    </div>
  );
};

export default PropertyCreatedFailed;