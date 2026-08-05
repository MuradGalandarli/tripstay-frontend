import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CreatePropertyState {
  cityId: number | null;
  propertyTypeId: number | null;
  spaceType: number | null;

  title: string;
  description: string;

  address: string;

  latitude: number | null;
  longitude: number | null;

  pricePerNight: number | null;

  maxGuests: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;

  checkInTime: string;
  checkOutTime: string;

  isActive: boolean;

  images: File[];

  amenityIds: number[];
}

interface Location {
  cityId: number;
  address: string;
  latitude: number;
  longitude: number;
}

interface Details {
  description: string;
  maxGuests: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
}

const initialState: CreatePropertyState = {
  cityId: null,
  propertyTypeId: null,
  spaceType: null,

  title: "",
  description: "",

  address: "",

  latitude: null,
  longitude: null,

  pricePerNight: null,

  maxGuests: 1,
  bedroomCount: 1,
  bedCount: 1,
  bathroomCount: 1,

  checkInTime: "14:00",
  checkOutTime: "11:00",

  isActive: true,

  images: [],

  amenityIds: [],
};

const propertySlice = createSlice({
  name: "propertyReducer",
  initialState,
  reducers: {
    setPropertyTypeId: (state, action: PayloadAction<number>) => {
      state.propertyTypeId = action.payload;
    },
    setSpaceType: (state, action: PayloadAction<number>) => {
      state.spaceType = action.payload;
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.address = action.payload.address;
      state.cityId = action.payload.cityId;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setDetails: (state, action: PayloadAction<Details>) => {
      state.description = action.payload.description;
      state.maxGuests = action.payload.maxGuests;
      state.bedroomCount = action.payload.bedroomCount;
      state.bedCount = action.payload.bedCount;
      state.bathroomCount = action.payload.bathroomCount;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.pricePerNight = action.payload;
    },
    setImages: (state, action: PayloadAction<File[]>) => {
      state.images = action.payload;
    },
    setTitle:(state,action:PayloadAction<string>)=>{
      state.title = action.payload
    },
    resetProperty: () => initialState,

    setAmenities: (state, action: PayloadAction<number[]>) => {
      state.amenityIds = action.payload;
    },
  },
});

export const {
  setPropertyTypeId,
  setSpaceType,
  setLocation,
  setDetails,
  setPrice,
  setImages,
  setAmenities,
  setTitle,
  resetProperty
} = propertySlice.actions;

export default propertySlice.reducer;
