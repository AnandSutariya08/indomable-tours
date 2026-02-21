import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  localBlogPosts,
  localCities,
  localDestinations,
  localExploreDestinations,
  localFaqs,
  localTeam,
  localTestimonials,
  localTours,
  localTravelEssentials,
} from "@/data/localData";
import { COLLECTIONS, getCollection } from "@/services/firestoreService";

export type FirebaseCollectionKey =
  | "tours"
  | "destinations"
  | "cities"
  | "blog"
  | "testimonials"
  | "travelInfo"
  | "faqs"
  | "exploreDestinations"
  | "team";

interface FirebaseState {
  tours: any[];
  destinations: any[];
  cities: any[];
  blog: any[];
  testimonials: any[];
  travelInfo: any[];
  faqs: any[];
  exploreDestinations: any[];
  team: any[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchedAtByCollection: Record<FirebaseCollectionKey, number | null>;
  isInitialLoad: boolean;
}

const normalizeStaticTours = (items: unknown[]) =>
  items
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item) => {
      const tags = Array.isArray(item.tags)
        ? item.tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)
        : [];

      return {
        ...item,
        country: typeof item.country === 'string' ? item.country : '',
        location: typeof item.location === 'string' ? item.location : '',
        title: typeof item.title === 'string' ? item.title : '',
        tags,
      };
    });

const LOCAL_DATA: Record<FirebaseCollectionKey, unknown[]> = {
  tours: normalizeStaticTours(localTours as unknown[]),
  destinations: localDestinations as unknown[],
  cities: localCities as unknown[],
  blog: localBlogPosts as unknown[],
  testimonials: localTestimonials as unknown[],
  travelInfo: localTravelEssentials as unknown[],
  faqs: localFaqs as unknown[],
  exploreDestinations: localExploreDestinations as unknown[],
  team: localTeam as unknown[],
};

const COLLECTION_KEYS = Object.keys(LOCAL_DATA) as FirebaseCollectionKey[];

const initialState: FirebaseState = {
  tours: LOCAL_DATA.tours,
  destinations: LOCAL_DATA.destinations,
  cities: LOCAL_DATA.cities,
  blog: LOCAL_DATA.blog,
  testimonials: LOCAL_DATA.testimonials,
  travelInfo: LOCAL_DATA.travelInfo,
  faqs: LOCAL_DATA.faqs,
  exploreDestinations: LOCAL_DATA.exploreDestinations,
  team: LOCAL_DATA.team,
  loading: false,
  error: null,
  lastFetched: Date.now(),
  fetchedAtByCollection: {
    tours: Date.now(),
    destinations: Date.now(),
    cities: Date.now(),
    blog: Date.now(),
    testimonials: Date.now(),
    travelInfo: Date.now(),
    faqs: Date.now(),
    exploreDestinations: Date.now(),
    team: Date.now(),
  },
  isInitialLoad: false,
};

export const fetchCollections = createAsyncThunk(
  "firebase/fetchCollections",
  async (requestedKeys: FirebaseCollectionKey[], { rejectWithValue }) => {
    const now = Date.now();
    const uniqueKeys = Array.from(new Set(requestedKeys)).filter(
      (key): key is FirebaseCollectionKey =>
        (Object.keys(LOCAL_DATA) as FirebaseCollectionKey[]).includes(
          key as FirebaseCollectionKey
        )
    );

    try {
      if (uniqueKeys.length === 0) {
        return { data: null, fetchedKeys: [] as FirebaseCollectionKey[] };
      }

      const data: Partial<Record<FirebaseCollectionKey, unknown[]>> = {};
      for (const key of uniqueKeys) {
        if (key === "blog") {
          try {
            const remoteBlog = await getCollection<Record<string, unknown>>(
              COLLECTIONS.BLOG_POSTS
            );
            data.blog = remoteBlog;
          } catch {
            data.blog = LOCAL_DATA.blog;
          }
          continue;
        }
        if (key === "testimonials") {
          try {
            const remoteTestimonials = await getCollection<Record<string, unknown>>(
              COLLECTIONS.TESTIMONIALS
            );
            data.testimonials = remoteTestimonials;
          } catch {
            data.testimonials = LOCAL_DATA.testimonials;
          }
          continue;
        }
        data[key] = LOCAL_DATA[key];
      }

      return { data, fetchedKeys: uniqueKeys, fetchedAt: now };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown local data error";
      return rejectWithValue(message);
    }
  }
);

export const fetchAllData = createAsyncThunk(
  "firebase/fetchAllData",
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
        const hasAnyMissing = requestedKeys.some(
          (key) => !Array.isArray((state as any)[key]) || (state as any)[key].length === 0
        );
        state.loading = hasAnyMissing;
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
        if (payload.faqs) state.faqs = payload.faqs;
        if (payload.exploreDestinations) state.exploreDestinations = payload.exploreDestinations;
        if (payload.team) state.team = payload.team;

        const fetchedAt = action.payload.fetchedAt ?? Date.now();
        if (!state.fetchedAtByCollection) {
          state.fetchedAtByCollection = {
            tours: null,
            destinations: null,
            cities: null,
            blog: null,
            testimonials: null,
            travelInfo: null,
            faqs: null,
            exploreDestinations: null,
            team: null,
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
