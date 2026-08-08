import { useDispatch } from "react-redux";
import { useState } from "react";
import { setPrice } from "../slice/propertySlice";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";

export default function PropertyPriceSelector() {

    const dispatch = useDispatch();
    const translation = useGetTranslationQuery();

    const [price, setPriceState] = useState(85);


    const increasePrice = () => {
        setPriceState(prev => prev + 5);
    };


    const decreasePrice = () => {
        setPriceState(prev => Math.max(5, prev - 5));
    };


    const savePrice = () => {

        dispatch(
            setPrice(price)
        );

    };


    return (
        <div>
            <div className="h-[95vh] flex justify-center items-center ">
                <div className="mx-auto max-w-xl rounded-3xl border bg-white p-10 shadow-sm">





                    <h1 className="mt-6 text-center text-4xl font-bold">
                       {translation?.data?.data?.["priceTitle"]}
                    </h1>


                    <p className="mt-3 text-center text-gray-500">
                         {translation?.data?.data?.["priceDescription"]}
                    </p>



                    <div className="mt-10 flex justify-center">

                        <div className="
          flex
          items-center
          rounded-3xl
          border
          px-8
          py-5
        ">

                            <span className="mr-3 text-3xl font-semibold">
                                $
                            </span>


                            <input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPriceState(Number(e.target.value))
                                }
                                className="
              w-36
              border-none
              bg-transparent
              text-center
              text-5xl
              font-bold
              outline-none
            "
                            />

                        </div>

                    </div>




                    <div className="
        mt-8
        flex
        items-center
        justify-center
        gap-6
      ">


                        <button
                            onClick={decreasePrice}
                            className="
            h-12
            w-12
            rounded-full
            border
            text-2xl
            hover:bg-gray-100
          "
                        >
                            −
                        </button>



                        <span className="
          text-3xl
          font-semibold
        ">
                            {price}
                        </span>



                        <button
                            onClick={increasePrice}
                            className="
            h-12
            w-12
            rounded-full
            border
            text-2xl
            hover:bg-gray-100
          "
                        >
                            +
                        </button>


                    </div>




                    <button

                        onClick={savePrice}

                        className="
          mt-12
          w-full
          rounded-2xl
          bg-black
          py-4
          text-lg
          font-medium
          text-white
          transition
          hover:bg-gray-800
        "
                    >
                       {translation?.data?.data?.["priceSaveButton"]}
                    </button>


                </div>
            </div>
        </div>

    );
}