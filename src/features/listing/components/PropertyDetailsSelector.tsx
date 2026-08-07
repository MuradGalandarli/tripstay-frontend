

import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "../slice/propertySlice";
import { useState } from "react";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";

export default function PropertyDetailsSelector() {

  const dispatch = useDispatch();
const translation = useGetTranslationQuery();

  const [details, setDetailsState] = useState({
    description: "",
    maxGuests: 1,
    bedroomCount: 1,
    bedCount: 1,
    bathroomCount: 1,
  });


  const updateValue = (key: string, value: number | string) => {
    setDetailsState(prev => ({
      ...prev,
      [key]: value
    }));
  };


  const saveDetails = () => {
    dispatch(
      setDetails({
        description: details.description,
        maxGuests: details.maxGuests,
        bedroomCount: details.bedroomCount,
        bedCount: details.bedCount,
        bathroomCount: details.bathroomCount,
      })
    );
  };


  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
         {translation?.data?.data?.["detailsHeading"]}
        </h1>

        <p className="mt-2 text-gray-500">
            {translation?.data?.data?.["detailsSubheading"]}
        </p>
      </div>


      {/* Counters */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-5">


        <Counter
          title={translation?.data?.data?.["detailsGuestsLabel"]}
          value={details.maxGuests}
          onChange={(v) =>
            updateValue("maxGuests", v)
          }
        />


        <Counter
          title= {translation?.data?.data?.["detailsBedroomsLabel"]}
          value={details.bedroomCount}
          onChange={(v) =>
            updateValue("bedroomCount", v)
          }
        />


        <Counter
          title= {translation?.data?.data?.["detailsBedsLabel"]}
          value={details.bedCount}
          onChange={(v) =>
            updateValue("bedCount", v)
          }
        />


        <Counter
          title= {translation?.data?.data?.["detailsBathroomsLabel"]}
          value={details.bathroomCount}
          onChange={(v) =>
            updateValue("bathroomCount", v)
          }
        />

      </div>



      {/* Description */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <label className="text-lg font-semibold">
           {translation?.data?.data?.["detailsDescriptionLabel"]}
        </label>

        <textarea
          value={details.description}
          onChange={(e)=>
            updateValue(
              "description",
              e.target.value
            )
          }
          placeholder= {translation?.data?.data?.["detailsDescriptionPlaceholder"]}
          rows={5}
          className="
          mt-3 w-full rounded-2xl border
          p-4 outline-none
          focus:border-black
          "
        />

      </div>


      <button
        onClick={saveDetails}
        className="
        rounded-xl bg-black 
        px-8 py-3 text-white
        "
      >
         {translation?.data?.data?.["detailsSaveButton"]}
      </button>


    </div>
  );
}



function Counter({
  title,
  value,
  onChange
}:{
  title:string;
  value:number;
  onChange:(value:number)=>void;
}){


return (

<div className="flex items-center justify-between">

<div>
<h3 className="font-medium">
{title}
</h3>


</div>


<div className="flex items-center gap-4">

<button
onClick={()=>
onChange(Math.max(1,value-1))
}
className="
h-10 w-10 rounded-full
border text-xl
"
>
-
</button>


<span className="w-5 text-center">
{value}
</span>


<button
onClick={()=>
onChange(value+1)
}
className="
h-10 w-10 rounded-full
border text-xl
"
>
+
</button>

</div>

</div>

)

}