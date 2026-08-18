import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLocation } from "../slice/propertySlice";

import {
  useGetCityQuery,
  useGetCountryQuery,
} from "../api/propertyTypeApi";

import { useGetTranslationQuery } from "../../translation/Api/translationApi";

export default function PropertyLocationSelector() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [address, setAddress] = useState("");
  const [countryId, setCountryId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);

  const {
    data: countriesResponse,
    isLoading: countriesLoading,
    isError: countriesIsError,
  } = useGetCountryQuery();

 
  const {
    data: citiesResponse,
    isLoading: citiesLoading,
    isError: citiesIsError,
  } = useGetCityQuery();

  const translation = useGetTranslationQuery();

  const countries = countriesResponse?.data ?? [];
  const cities = citiesResponse?.data ?? [];

  const filteredCities = cities.filter(
    (city) => city.countryId === countryId
  );

  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    if (!value) {
      setCountryId(null);
      setCityId(null);
      setAddress("");

      return;
    }

    const id = Number(value);

    setCountryId(id);

    // Ölkə dəyişəndə şəhər sıfırlanır
    setCityId(null);

    const selectedCountry = countries.find(
      (country) => country.id === id
    );

    setAddress(selectedCountry?.name ?? "");
  };

  const handleCityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    // Şəhər seçilməyibsə
    if (!value) {
      setCityId(null);
      return;
    }

    const id = Number(value);

    setCityId(id);

    const selectedCity = cities.find(
      (city) => city.id === id
    );

    if (!selectedCity) {
      return;
    }

    const selectedCountry = countries.find(
      (country) => country.id === selectedCity.countryId
    );

    const countryName = selectedCountry?.name ?? "";
    const cityName = selectedCity.name;

    setAddress(`${countryName}, ${cityName}`);
  };

  const saveLocation = () => {
    if (!countryId || !cityId) {
      return;
    }

    dispatch(
      setLocation({
        address,
        cityId,
        latitude: 40.4093,
        longitude: 49.8671,
      })
    );

    navigation("/propertyDetailsSelector");
  };

  return (
    <div className="w-full min-h-screen p-5">

      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={
          translation?.data?.data?.[
            "locationAddressPlaceholder"
          ] ?? "Address"
        }
        className="w-full rounded-xl border p-4"
      />

      <div className="w-full h-[650px] flex flex-row justify-between mt-5 gap-5">

        <div className="w-[40%] h-[650px]">

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-gray-900">
              {translation?.data?.data?.[
                "locationTitle"
              ] ?? "Where is your place located?"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {translation?.data?.data?.[
                "locationDescription"
              ] ?? "Choose the country and city."}
            </p>

            <div className="mt-6 grid gap-5">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {translation?.data?.data?.[
                    "locationCountryLabel"
                  ] ?? "Country"}
                </label>

                <select
                  value={countryId ?? ""}
                  onChange={handleCountryChange}
                  disabled={countriesLoading}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 text-base outline-none focus:border-black focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
                >

                  <option value="">
                    {countriesLoading
                      ? "Loading countries..."
                      : translation?.data?.data?.[
                          "locationCountryPlaceholder"
                        ] ?? "Select country"}
                  </option>

                  {countries.map((country) => (
                    <option
                      key={country.id}
                      value={country.id}
                    >
                      {country.name}
                    </option>
                  ))}

                </select>

                {countriesIsError && (
                  <p className="mt-2 text-sm text-red-500">
                    Countries could not be loaded.
                  </p>
                )}

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {translation?.data?.data?.[
                    "locationCityLabel"
                  ] ?? "City"}
                </label>

                <select
                  disabled={
                    !countryId || citiesLoading
                  }
                  value={cityId ?? ""}
                  onChange={handleCityChange}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-4 text-base outline-none focus:border-black focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >

                  <option value="">
                    {citiesLoading
                      ? "Loading cities..."
                      : translation?.data?.data?.[
                          "locationCityPlaceholder"
                        ] ?? "Select city"}
                  </option>

                  {filteredCities.map((city) => (
                    <option
                      key={city.id}
                      value={city.id}
                    >
                      {city.name}
                    </option>
                  ))}

                </select>

                {citiesIsError && (
                  <p className="mt-2 text-sm text-red-500">
                    Cities could not be loaded.
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

        <div className="w-[60%] h-[650px] flex flex-col justify-end items-end">

          <iframe
            title="Google Maps"
            width="100%"
            height="570"
            style={{
              border: 0,
              borderRadius: "20px",
            }}
            loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              address || "Baku, Azerbaijan"
            )}&output=embed`}
          />

          <button
            onClick={saveLocation}
            disabled={!countryId || !cityId}
            className="w-[200px] m-[20px] bg-black text-white px-5 py-3 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {translation?.data?.data?.[
              "locationSaveButton"
            ] ?? "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}