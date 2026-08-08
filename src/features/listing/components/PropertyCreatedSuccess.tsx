import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";

const PropertyCreatedSuccess = () => {

    const navigate = useNavigate();
    const translation = useGetTranslationQuery();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="
        w-full
        max-w-md
        rounded-3xl
        bg-white
        p-10
        text-center
        shadow-xl
        border
        border-gray-100
      ">


                <div className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-green-100
        ">
                    <FaCheck className="text-4xl text-green-600" />
                </div>


              
                <h1 className="
          mt-7
          text-3xl
          font-bold
          text-gray-900
        ">
                       {translation?.data?.data?.["successTitle"]}
                </h1>


               
                <p className="
          mt-4
          text-gray-500
          leading-7
        ">
                      {translation?.data?.data?.["successDescription"]}
                </p>


                <button
                    onClick={() => navigate("/")}
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
                        {translation?.data?.data?.["successHomeButton"]}
                </button>

            </div>

        </div>
    );
};

export default PropertyCreatedSuccess;