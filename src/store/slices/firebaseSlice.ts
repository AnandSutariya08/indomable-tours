import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface FirebaseState {
  tours: any[];
  destinations: any[];
  cities: any[];
  blog: any[];
  testimonials: any[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: FirebaseState = {
  tours: [],
  destinations: [],
  cities: [],
  blog: [],
  testimonials: [],
  loading: false,
  error: null,
  lastFetched: null,
};

export const fetchAllData = createAsyncThunk(
  'firebase/fetchAllData',
  async (_, { rejectWithValue }) => {
    try {
      const collections = ['tours', 'destinations', 'cities', 'blog', 'testimonials'];
      const results = await Promise.all(
        collections.map(async (col) => {
          const snapshot = await getDocs(query(collection(db, col)));
          return {
            name: col,
            data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          };
        })
      );
      
      const data: any = {};
      results.forEach(res => {
        data[res.name] = res.data;
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.tours = action.payload.tours;
        state.destinations = action.payload.destinations;
        state.cities = action.payload.cities;
        state.blog = action.payload.blog;
        state.testimonials = action.payload.testimonials;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = firebaseSlice.actions;
export default firebaseSlice.reducer;
