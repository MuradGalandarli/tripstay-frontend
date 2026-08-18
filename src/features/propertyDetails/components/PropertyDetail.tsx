import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Users,
  BedDouble,
  Bath,
  DoorOpen,
  Clock3,
  ChevronLeft,
  ChevronRight,
  X,
  Images,
} from "lucide-react";

import { useGetPropertyDetailQuery } from "../Api/propertyDetailApi";
import { useGetTranslationQuery } from "../../translation/Api/translationApi";


const PropertyDetail = () => {
  const { propertyId } = useParams();

  const { data, isLoading, isError } =
    useGetPropertyDetailQuery(propertyId);

  const translation = useGetTranslationQuery();
  const navigation = useNavigate();

  const property = data?.data;

  const [selectedImage, setSelectedImage] = React.useState<number | null>(
    null
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {translation?.data?.data?.["detailPropertyNotFound"]}
          </h2>

          <p className="mt-2 text-gray-500">
            {translation?.data?.data?.["detailPropertyCouldNotBeLoaded"]}
          </p>
        </div>
      </div>
    );
  }
const handleSendMessage = () => {
  navigation(`/chatPage/${propertyId}`);
};

  const images = property.imageUrls?.slice(0, 5) ?? [];

  const formatTime = (time: string) => {
    return time?.slice(0, 5);
  };

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage === null || images.length === 0) return;

    setSelectedImage(
      selectedImage === images.length - 1
        ? 0
        : selectedImage + 1
    );
  };

  const previousImage = () => {
    if (selectedImage === null || images.length === 0) return;

    setSelectedImage(
      selectedImage === 0
        ? images.length - 1
        : selectedImage - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">


        <div className="mb-6 flex items-center justify-between">

          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />

            {translation?.data?.data?.["detailBack"]}
          </button>

          <div className="flex gap-2">

            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <Share2 size={18} />

              <span className="hidden sm:inline">
                {translation?.data?.data?.["detailShare"]}
              </span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <Heart size={18} />

              <span className="hidden sm:inline">
                {translation?.data?.data?.["detailSave"]}
              </span>
            </button>

          </div>

        </div>

        <div className="mb-7">

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {property.title}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-gray-600">

            <MapPin size={18} />

            <span className="text-sm">
              {property.address}
            </span>

          </div>

        </div>


        {images.length > 0 ? (

          <div className="relative">

            <div
              className={`
                grid
                gap-2
                overflow-hidden
                rounded-3xl
                ${
                  images.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-2 lg:grid-cols-4"
                }
              `}
            >

              <button
                type="button"
                onClick={() => openImage(0)}
                className={`
                  group
                  relative
                  overflow-hidden
                  ${
                    images.length === 1
                      ? "h-[320px] sm:h-[500px]"
                      : "col-span-2 row-span-2 h-[320px] sm:h-[500px]"
                  }
                `}
              >

                <img
                  src={images[0]}
                  alt={`${property.title} 1`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur">

                  <Images size={16} />

                  {images.length}{" "}
                  {translation?.data?.data?.["detailPhotos"]}
                </div>

              </button>


              {images.slice(1, 5).map((image, index) => (

                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => openImage(index + 1)}
                  className="group relative hidden h-[248px] overflow-hidden lg:block"
                >

                  <img
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

                </button>

              ))}

            </div>


            <div className="mt-2 flex gap-2 overflow-x-auto lg:hidden">

              {images.map((image, index) => (

                <button
                  key={`${image}-mobile-${index}`}
                  type="button"
                  onClick={() => openImage(index)}
                  className={`
                    h-20
                    w-24
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    ${index === 0 ? "ring-2 ring-black" : ""}
                  `}
                >

                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                </button>

              ))}

            </div>

          </div>

        ) : (

          <div className="flex h-[400px] items-center justify-center rounded-3xl bg-gray-100 text-gray-400">
            {translation?.data?.data?.["detailNoImagesAvailable"]}
          </div>

        )}

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">

          <div>

            <section className="border-b pb-8">

              <h2 className="text-2xl font-semibold text-gray-900">
                {translation?.data?.data?.["detailEntirePlace"]}
              </h2>

              <p className="mt-2 text-gray-500">
                {translation?.data?.data?.[
                  "detailComfortablePlaceDescription"
                ]}
              </p>


              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <InfoCard
                  icon={<Users size={20} />}
                  label={
                    translation?.data?.data?.["detailGuests"]
                  }
                  value={`${property.maxGuests}`}
                />

                <InfoCard
                  icon={<BedDouble size={20} />}
                  label={
                    translation?.data?.data?.["detailBeds"]
                  }
                  value={`${property.bedCount}`}
                />

                <InfoCard
                  icon={<Bath size={20} />}
                  label={
                    translation?.data?.data?.["detailBathrooms"]
                  }
                  value={`${property.bathroomCount}`}
                />

                <InfoCard
                  icon={<DoorOpen size={20} />}
                  label={
                    translation?.data?.data?.["detailBedrooms"]
                  }
                  value={
                    property.bedroomCount === 0
                      ? translation?.data?.data?.["detailStudio"]
                      : `${property.bedroomCount}`
                  }
                />

              </div>

            </section>

            <section className="border-b py-9">

              <h2 className="text-2xl font-semibold text-gray-900">
                {translation?.data?.data?.["detailAboutThisPlace"]}
              </h2>

              <p className="mt-5 max-w-3xl whitespace-pre-line text-[16px] leading-8 text-gray-600">
                {property.description}
              </p>

            </section>

            <section className="border-b py-9">

              <h2 className="text-2xl font-semibold text-gray-900">
                {translation?.data?.data?.["detailStayInformation"]}
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <TimeCard
                  icon={<Clock3 size={21} />}
                  title={
                    translation?.data?.data?.["detailCheckIn"]
                  }
                  time={formatTime(property.checkInTime)}
                  description={
                    translation?.data?.data?.[
                      "detailCheckInDescription"
                    ]
                  }
                />

                <TimeCard
                  icon={<Clock3 size={21} />}
                  title={
                    translation?.data?.data?.["detailCheckOut"]
                  }
                  time={formatTime(property.checkOutTime)}
                  description={
                    translation?.data?.data?.[
                      "detailCheckOutDescription"
                    ]
                  }
                />

              </div>

            </section>

            <section className="py-9">

              <h2 className="text-2xl font-semibold text-gray-900">
                {translation?.data?.data?.[
                  "detailWhereYouWillBe"
                ]}
              </h2>

              <div className="mt-5 flex items-center gap-3 text-gray-600">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <MapPin size={19} />
                </div>

                <span>
                  {property.address}
                </span>

              </div>


              <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200">

                <iframe
                  title="Property location"
                  src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&output=embed`}
                  className="h-[380px] w-full border-0"
                  loading="lazy"
                />

              </div>

            </section>

          </div>

          <div>

            <div className="sticky top-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/40">

              <div className="flex items-end gap-1">

                <span className="text-3xl font-bold text-gray-900">
                  ${property.pricePerNight}
                </span>

                <span className="mb-1 text-gray-500">
                  {translation?.data?.data?.["detailPerNight"]}
                </span>

              </div>

              <p className="mt-1 text-sm text-gray-500">
                {translation?.data?.data?.[
                  "detailBeforeTaxesAndFees"
                ]}
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-300">

                <div className="grid grid-cols-2">

                  <div className="border-r border-gray-300 p-4">

                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      {translation?.data?.data?.[
                        "detailCheckIn"
                      ]}
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {formatTime(property.checkInTime)}
                    </p>

                  </div>

                  <div className="p-4">

                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      {translation?.data?.data?.[
                        "detailCheckOut"
                      ]}Dasa
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {formatTime(property.checkOutTime)}
                    </p>

                  </div>

                </div>


                <div className="border-t border-gray-300 p-4">

                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                    {translation?.data?.data?.["detailGuests"]}
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {property.maxGuests}{" "}
                    {translation?.data?.data?.["detailGuests"]}
                  </p>

                </div>

              </div>

              <button
                type="button"
              
                className="mt-5 w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300"
               onClick={()=>{handleSendMessage()}} >
                {/* {property.isActive
                  ? translation?.data?.data?.["detailReserve"]
                  : translation?.data?.data?.["detailNotAvailable"]} */}
                  Messaj gonder

              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                {translation?.data?.data?.[
                  "detailYouWontBeChargedYet"
                ]}
              </p>


              <div className="mt-6 space-y-4 border-t pt-6 text-sm">

                <div className="flex justify-between">

                  <span className="text-gray-600">
                    ${property.pricePerNight} × 1{" "}
                    {translation?.data?.data?.["detailPerNight"]}
                  </span>

                  <span className="font-medium">
                    ${property.pricePerNight}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-600">
                    {translation?.data?.data?.[
                      "detailServiceFee"
                    ]}
                  </span>

                  <span className="font-medium">
                    $0
                  </span>

                </div>

                <div className="flex justify-between border-t pt-4 text-base font-semibold">

                  <span>
                    {translation?.data?.data?.["detailTotal"]}
                  </span>

                  <span>
                    ${property.pricePerNight}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {selectedImage !== null && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5"
          onClick={closeImage}
        >

          <button
            type="button"
            onClick={closeImage}
            className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X size={23} />
          </button>

          {images.length > 1 && (

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft size={28} />
            </button>

          )}

          <img
            src={images[selectedImage]}
            alt={`${property.title} ${selectedImage + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />

          {images.length > 1 && (

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-8"
            >
              <ChevronRight size={28} />
            </button>

          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur">
            {selectedImage + 1} / {images.length}
          </div>

          <div className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 gap-2 md:flex">

            {images.map((image, index) => (

              <button
                key={`thumbnail-${index}`}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`
                  h-14
                  w-16
                  overflow-hidden
                  rounded-lg
                  transition
                  ${
                    selectedImage === index
                      ? "ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  }
                `}
              >

                <img
                  src={image}
                  alt={`${translation?.data?.data?.["detailThumbnail"]} ${index + 1}`}
                  className="h-full w-full object-cover"
                />

              </button>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl bg-gray-50 p-4 transition hover:bg-gray-100">

      <div className="text-gray-700">
        {icon}
      </div>

      <p className="mt-3 text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-gray-900">
        {value}
      </p>

    </div>
  );
};


const TimeCard = ({
  icon,
  title,
  time,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-200 p-5">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>

      <div>

        <p className="font-semibold text-gray-900">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold text-gray-900">
          {time}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

      </div>

    </div>
  );
};

export default PropertyDetail;