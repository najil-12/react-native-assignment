import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface TProperty {
    id: string;
    title: string;
    price: number,
    location: {
        address: string,
        city: string,
        state: string,
        coordinates: {
            latitude: number,
            longitude: number
        }
    },
    features: string[];
    images: string[]
}

export interface TBooking {
    id: number;
    propertyId: number;
    userId: string,
    checkIn: string,
    checkOut: string
    status: string
}

export interface TProfile {
    id: number;
    name: string,
    email: string,
    bookings: string[]
}

interface PropertiesState {
  data: {
    properties: TProperty[];
    bookings: TBooking[];
    profile: TProfile
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchProperties = createAsyncThunk<PropertiesState['data'], void>(
  'properties/fetchProperties',
  async () => {
      const response = await fetch('https://pastebin.com/raw/Sa0LzR3T');
    const data = await response.json();
    return data;
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    data: {},
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  } as PropertiesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<PropertiesState['data']>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default propertiesSlice.reducer;
