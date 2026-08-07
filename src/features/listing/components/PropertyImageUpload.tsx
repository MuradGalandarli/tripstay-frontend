import { useState } from "react";
import { AiOutlineLineChart, AiOutlineThunderbolt } from "react-icons/ai";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";
import { useNavigate } from "react-router-dom";

const PropertyImageUpload = () => {
  const [images, setImages] = useState<File[]>([]);
  const translation = useGetTranslationQuery();
  const navigation = useNavigate();

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert(translation?.data?.data?.["imageLimitMessage"]);
      return;
    }

    setImages((prev) => [
      ...prev,
      ...files,
    ]);
  };


  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const nextPage = () => {
    navigation("/propertyLocationSelector");
  }


  return (

    <div className='w-[100%] h-[100vh] flex flex-col items-center'>
      <div className='w-[100%] h-[100vh] flex flex-col items-end'>
        <div className="h-[100px] w-[90%] flex items-end justify-between">
          <AiOutlineLineChart className="text-[40px]" />
          <AiOutlineThunderbolt className="text-[40px]" />
        </div>

        <div className="w-full max-w-[800px] mx-auto">

          <h1 className="text-4xl font-semibold mb-3">
            {translation?.data?.data?.["imageTitle"]}
          </h1>

          <p className="text-gray-500 mb-8">
            {translation?.data?.data?.["imageDescription"]}
          </p>


          <label
            className="
          flex flex-col items-center justify-center
          w-full h-[220px]
          border-2 border-dashed
          border-gray-300
          rounded-2xl
          cursor-pointer
          hover:bg-gray-50
          transition
        "
          >

            <span className="text-5xl mb-3">
              📷
            </span>

            <span className="text-lg font-medium">
              {translation?.data?.data?.["addImage"]}
            </span>

            <span className="text-sm text-gray-500 mt-2">
              {translation?.data?.data?.["maxImages"]}
            </span>


            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

          </label>



          {
            images.length > 0 && (

              <div className="mt-8">

                <h2 className="text-xl font-semibold mb-4">
                 {translation?.data?.data?.["imageSelectedImagesData"]} ({images.length}/5)
                </h2>


                <div className="
              grid 
              grid-cols-2 
              md:grid-cols-3 
              gap-5
            ">

                  {
                    images.map((image, index) => (

                      <div
                        key={index}
                        className="
                      relative
                      group
                      overflow-hidden
                      rounded-2xl
                    "
                      >

                        <img
                          src={URL.createObjectURL(image)}
                          alt="property"
                          className="
                        w-full
                        h-[180px]
                        object-cover
                        transition
                        group-hover:scale-105
                      "
                        />


                        {
                          index === 0 && (
                            <span
                              className="
                            absolute
                            bottom-3
                            left-3
                            bg-black
                            text-white
                            px-3
                            py-1
                            rounded-full
                            text-sm
                          "
                            >
                               {translation?.data?.data?.["imageMainImageData"]}
                            </span>
                          )
                        }


                        <button
                          onClick={() => removeImage(index)}
                          className="
                        absolute
                        top-3
                        right-3
                        w-8
                        h-8
                        rounded-full
                        bg-white
                        text-black
                        shadow
                        hover:bg-red-500
                        hover:text-white
                        transition
                      "
                        >
                          ✕
                        </button>


                      </div>

                    ))
                  }

                </div>
               <button
  onClick={() => nextPage()}
  className="
    fixed
    bottom-8
    right-10
    w-[150px]
    h-[45px]
    rounded-2xl
    bg-black
    text-white
    font-medium
    shadow-lg
    hover:bg-gray-800
    transition
  "
>
  {translation?.data?.data?.["imageNextButtonData"]}
</button>
             
              </div>

            )
          }

        </div>
      </div>
    </div>

  );
};

export default PropertyImageUpload;