import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export type FirebaseCollectionKey =
  | 'tours'
  | 'destinations'
  | 'cities'
  | 'blog'
  | 'testimonials'
  | 'travelInfo'
  | 'exploreDestinations';

const COLLECTION_MAPPING: Record<FirebaseCollectionKey, string> = {
  tours: 'tours',
  destinations: 'destinations',
  cities: 'cities',
  blog: 'blogPosts',
  testimonials: 'testimonials',
  travelInfo: 'travelInfo',
  exploreDestinations: 'exploreDestinations'
};

const COLLECTION_KEYS = Object.keys(COLLECTION_MAPPING) as FirebaseCollectionKey[];

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
  fetchedAtByCollection: Record<FirebaseCollectionKey, number | null>;
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
  fetchedAtByCollection: {
    tours: null,
    destinations: null,
    cities: null,
    blog: null,
    testimonials: null,
    travelInfo: null,
    exploreDestinations: null,
  },
  isInitialLoad: true,
};

export const fetchCollections = createAsyncThunk(
  'firebase/fetchCollections',
  async (requestedKeys: FirebaseCollectionKey[], { getState, rejectWithValue }) => {
    const state = (getState() as any).firebase as FirebaseState;
    
    // Route-level cache: refresh stale collections only.
    const CACHE_TIME = 15 * 60 * 1000;
    const now = Date.now();

    const uniqueKeys = Array.from(new Set(requestedKeys)).filter((key): key is FirebaseCollectionKey =>
      COLLECTION_KEYS.includes(key as FirebaseCollectionKey)
    );

    try {
      const keysToFetch = uniqueKeys.filter((key) => {
        const lastFetchedAt = state.fetchedAtByCollection?.[key] ?? null;
        const isFresh = !!lastFetchedAt && now - lastFetchedAt < CACHE_TIME;
        const hasData = Array.isArray(state[key]) && state[key].length > 0;
        return !isFresh || !hasData;
      });

      if (keysToFetch.length === 0) {
        return { data: null, fetchedKeys: [] as FirebaseCollectionKey[] };
      }

      const results = await Promise.all(
        keysToFetch.map(async (key) => {
          const colName = COLLECTION_MAPPING[key];
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
      return { data, fetchedKeys: keysToFetch };
    } catch (error: any) {
      console.error("Redux fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllData = createAsyncThunk(
  'firebase/fetchAllData',
  async (_, { dispatch }) => {
    await dispatch(fetchCollections(COLLECTION_KEYS));
    return null;
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
      .addCase(fetchCollections.pending, (state, action) => {
        const requestedKeys = action.meta.arg as FirebaseCollectionKey[];
        const hasAnyMissing = requestedKeys.some((key) => !Array.isArray(state[key]) || state[key].length === 0);
        if (hasAnyMissing) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isInitialLoad = false;
        
        if (!action.payload?.data) return;

        const payload = action.payload.data;
        if (payload.tours) state.tours = payload.tours;
        if (payload.destinations) state.destinations = payload.destinations;
        if (payload.cities) state.cities = payload.cities;
        if (payload.blog) state.blog = payload.blog;
        if (payload.testimonials) state.testimonials = payload.testimonials;
        if (payload.travelInfo) state.travelInfo = payload.travelInfo;
        if (payload.exploreDestinations) state.exploreDestinations = payload.exploreDestinations;

        const fetchedAt = Date.now();
        if (!state.fetchedAtByCollection) {
          state.fetchedAtByCollection = {
            tours: null,
            destinations: null,
            cities: null,
            blog: null,
            testimonials: null,
            travelInfo: null,
            exploreDestinations: null,
          };
        }
        (action.payload.fetchedKeys as FirebaseCollectionKey[]).forEach((key) => {
          state.fetchedAtByCollection[key] = fetchedAt;
        });
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.isInitialLoad = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = firebaseSlice.actions;
export default firebaseSlice.reducer;
