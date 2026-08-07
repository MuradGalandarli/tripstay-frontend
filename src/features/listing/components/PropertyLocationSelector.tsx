import { useDispatch } from "react-redux";
import { setLocation } from "../slice/propertySlice"
import { useState } from "react";
import { useGetCityQuery, useGetCountryQuery } from "../api/propertyTypeApi";
import { useNavigate } from "react-router-dom";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";

export default function PropertyLocationSelector() {

    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [countryId, setCountryId] = useState<number | null>(null);
    const [cityId, setCityId] = useState<number | null>(null);
    const navigation = useNavigate();

    const { data: countries } = useGetCountryQuery();
    const { data: cities } = useGetCityQuery();
    const translation = useGetTranslationQuery();

    const filteredCities =
        cities?.data.filter((city) => city.countryId === countryId) ?? [];


    const saveLocation = () => {
        if (!cityId) return;

        dispatch(
            setLocation({
                address,
                cityId,
                latitude: 40.4093,
                longitude: 49.8671,
            })
        );
        navigation("/propertyDetailsSelector")
    };

    return (
        <div className="space-y-5">

            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder= {translation?.data?.data?.["locationAddressPlaceholder"]}
                className="w-full rounded-xl border p-4"
            />

            <div className=" w-full h-[650px] flex flex-row justify-between">

                <div className="[w-40%] h-[650px]">


                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900">
                             {translation?.data?.data?.["locationTitle"]}  
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                              {translation?.data?.data?.["locationDescription"]}  
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            {/* Country */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                     {translation?.data?.data?.["locationCountryLabel"]}  
                                </label>

                                <select
                                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 text-base transition-all outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
                                    value={countryId ?? ""}
                                    onChange={(e) => {
                                        const id = Number(e.target.value);

                                        setCountryId(id);
                                        setCityId(null);

                                        const countryName = countries?.data?.find(x => x.id === id)?.name ?? "";

                                        setAddress(countryName);
                                    }}
                                >
                                    <option value="">  {translation?.data?.data?.["locationCountryPlaceholder"]}  </option>

                                    {countries?.data?.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                          
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                      {translation?.data?.data?.["locationCityLabel"]}  
                                </label>

                                <select
                                    disabled={!countryId}
                                    value={cityId ?? ""}
                                    onChange={(e) => {
                                        const id = Number(e.target.value);

                                        setCityId(id);

                                        const cityName = cities?.data?.find(x => x.id === id)?.name ?? "";

                                        setAddress(prev => ` ${prev} ${cityName}`);
                                    }}
                                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 text-base transition-all outline-none focus:border-black focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                                >
                                    <option value="">  {translation?.data?.data?.["locationCityPlaceholder"]}  </option>

                                    {filteredCities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="w-[60%]  h-[650px] flex flex-col justify-end items-end">
                    <iframe
                        width="100%"
                        height="570"
                        style={{
                            border: 0,
                            borderRadius: "20px"
                        }}
                        loading="lazy"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(`${address}`)}&output=embed`}
                    />


                    <button
                        onClick={() => (saveLocation())}
                        className=" w-[200px] m-[20px] bg-black text-white px-5 py-3 rounded-xl "
                    >
                         {translation?.data?.data?.["locationSaveButton"]}  
                    </button>
                </div>
            </div>
        </div>
    );
}