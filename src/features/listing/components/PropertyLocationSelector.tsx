import { useDispatch } from "react-redux";
import { setLocation } from "../slice/propertySlice"
import { useState } from "react";
import { useGetCityQuery, useGetCountryQuery } from "../api/propertyTypeApi";

export default function PropertyLocationSelector() {

    const dispatch = useDispatch();

const [address, setAddress] = useState("Baku Azerbaijan");
const [countryId, setCountryId] = useState<number | null>(null);
const [cityId, setCityId] = useState<number | null>(null);


const { data: countries } = useGetCountryQuery();
const { data: cities } = useGetCityQuery();


const filteredCities =
  cities?.data?.filter((city) => city.countryId === countryId) ?? [];

  const saveLocation = () => {
    console.log(cities);
  if (!cityId) return;

  

  dispatch(
    setLocation({
      address,
      cityId,
      latitude: 40.4093,
      longitude: 49.8671,
    })
  );
};


    return (
        <div className="space-y-5">

            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ünvan daxil edin"
                className="w-full rounded-xl border p-4"
            />




            <div className=" w-full h-[450px] flex flex-row justify-between">

                <div className="[w-50%] h-[450px] bg-amber-700">

                 <select
  className="w-full rounded-xl border p-4"
  value={countryId ?? ""}
  onChange={(e) => {
    const id = Number(e.target.value);
    setCountryId(id);
    setCityId(null);
  }}
>
  <option value="">Choose Country</option>

  {countries?.data?.map((country) => (
    <option
      key={country.id}
      value={country.id}
    >
      {country.name}
    </option>
  ))}
</select>

<select
  disabled={!countryId}
  value={cityId ?? ""}
  onChange={(e) => setCityId(Number(e.target.value))}
  className="w-full rounded-xl border p-4 disabled:bg-gray-100"
>
  <option value="">Choose City</option>

  {filteredCities.map((city) => (
    <option
      key={city.id}
      value={city.id}
    >
      {city.name}
    </option>
  ))}
</select>

                </div>

                <div className="w-[50%]  h-[450px] flex flex-col justify-end items-end bg-amber-400">
                    <iframe
                        width="100%"
                        height="450"
                        style={{
                            border: 0,
                            borderRadius: "20px"
                        }}
                        loading="lazy"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                    />


                    <button
                        onClick={()=>(saveLocation())}
                        className=" w-[200px] m-[20px] bg-black text-white px-5 py-3 rounded-xl "
                    >
                        Save Location
                    </button>
                </div>
            </div>
        </div>
    );
}