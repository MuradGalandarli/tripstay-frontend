import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePropertyMutation } from "../api/propertyTypeApi";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { resetProperty } from "../slice/propertySlice";

export default function CreatePropertyPage() {

  const navigate = useNavigate();
  const translation = useGetTranslationQuery();
  const property = useAppSelector(
    (state) => state.property
  );

  const [createProperty, {isError,isSuccess}] =
    useCreatePropertyMutation();

  const dispatch = useAppDispatch();

 useEffect(() => {
  if (isSuccess) {
    navigate("/propertyCreatedSuccess");
  }

  if (isError) {
    navigate("/propertyCreatedFailed");
  }
}, [isSuccess, isError, navigate]);

    

  useEffect(() => {

    const create = async () => {

      const formData = new FormData();


      formData.append(
        "CityId",
        String(property.cityId)
      );

      formData.append(
        "PropertyTypeId",
        String(property.propertyTypeId)
      );

      formData.append(
        "SpaceType",
        String(property.spaceType)
      );

      formData.append(
        "Title",
        property.title
      );

      formData.append(
        "Description",
        property.description
      );

      formData.append(
        "Address",
        property.address
      );

      formData.append(
        "Latitude",
        String(property.latitude)
      );

      formData.append(
        "Longitude",
        String(property.longitude)
      );

      formData.append(
        "PricePerNight",
        String(property.pricePerNight)
      );

      formData.append(
        "MaxGuests",
        String(property.maxGuests)
      );

      formData.append(
        "BedroomCount",
        String(property.bedroomCount)
      );

      formData.append(
        "BedCount",
        String(property.bedCount)
      );

      formData.append(
        "BathroomCount",
        String(property.bathroomCount)
      );


      formData.append(
        "CheckInTime",
        property.checkInTime
      );

      formData.append(
        "CheckOutTime",
        property.checkOutTime
      );


      formData.append(
        "IsActive",
        String(property.isActive)
      );


      property.amenityIds.forEach((id) => {

        formData.append(
          "AmenityIds",
          String(id)
        );

      });


      
      property.images.forEach((image) => {

        formData.append(
          "Images",
          image
        );

      });


      try {

        await createProperty(formData).unwrap();
        dispatch(resetProperty()) 

      } catch (error) {

        console.error(error);

      }

    };


    create();

  }, []);


  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="text-center">

        <div className="text-4xl">
          ⏳
        </div>

        <h1 className="mt-4 text-2xl font-semibold">
          {translation?.data?.data?.["propertyCreatingTitleData"]}
        </h1>

        <p className="mt-2 text-gray-500">
          {translation?.data?.data?.["propertyCreatingDescriptionData"]}
        </p>

      </div>

    </div>
  );
}