import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface FirebaseState {
  tours: any[];
  destinations: any[];
  cities: any[];
  blog: any[];
  testimonials: any[];
  travelInfo: any[];
  exploreDestinations: any[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  isInitialLoad: boolean;
}

const initialState: FirebaseState = {
  tours: [],
  destinations: [],
  cities: [],
  blog: [],
  testimonials: [],
  travelInfo: [],
  exploreDestinations: [],
  loading: false,
  error: null,
  lastFetched: null,
  isInitialLoad: true,
};

export const fetchAllData = createAsyncThunk(
  'firebase/fetchAllData',
  async (_, { getState, rejectWithValue }) => {
    const state = (getState() as any).firebase as FirebaseState;
    
    // Cache: If data was fetched in the last 5 minutes, don't fetch again unless forced
    const CACHE_TIME = 5 * 60 * 1000;
    if (state.lastFetched && (Date.now() - state.lastFetched < CACHE_TIME)) {
      return null;
    }

    try {
      const collectionMapping: Record<string, string> = {
        tours: 'tours',
        destinations: 'destinations',
        cities: 'cities',
        blog: 'blogPosts',
        testimonials: 'testimonials',
        travelInfo: 'travelInfo',
        exploreDestinations: 'exploreDestinations'
      };

      // Parallelize all requests to Firestore
      const results = await Promise.all(
        Object.entries(collectionMapping).map(async ([key, colName]) => {
          const snapshot = await getDocs(query(collection(db, colName)));
          return {
            key,
            data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          };
        })
      );
      
      const data: any = {};
      results.forEach(res => {
        data[res.key] = res.data;
      });
      return data;
    } catch (error: any) {
      console.error("Redux fetch error:", error);
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
        // Only show loading if we have absolutely no data
        if (state.lastFetched === null) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isInitialLoad = false;
        
        // If null, it means we used cache
        if (!action.payload) return;

        if (action.payload.tours) state.tours = action.payload.tours;
        if (action.payload.destinations) state.destinations = action.payload.destinations;
        if (action.payload.cities) state.cities = action.payload.cities;
        if (action.payload.blog) state.blog = action.payload.blog;
        if (action.payload.testimonials) state.testimonials = action.payload.testimonials;
        if (action.payload.travelInfo) state.travelInfo = action.payload.travelInfo;
        if (action.payload.exploreDestinations) state.exploreDestinations = action.payload.exploreDestinations;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.isInitialLoad = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = firebaseSlice.actions;
export default firebaseSlice.reducer;
