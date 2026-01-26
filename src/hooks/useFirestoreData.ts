import { useState, useEffect } from "react";
import { getCollection, COLLECTIONS } from "@/services/firestoreService";

// Types
export interface Tour {
  id: string;
  title: string;
  location: string;
  country: string;
  image: string;
  duration: string;
  groupSize: string;
  rating: number;
  price: string;
  description: string;
  fullDescription?: string;
  highlights: string[];
  gallery?: string[];
  itinerary?: { day: number; title: string; description: string }[];
  included?: string[];
  notIncluded?: string[];
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  subDestinations: { name: string; image: string; tours: number }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  featured: boolean;
  tags: string[];
}

export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  tours: number;
  description: string;
  popular: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface ExploreDestination {
  id: string;
  name: string;
  landmark: string;
  image: string;
  description: string;
}

export interface ExploreTour {
  id: string;
  title: string;
  location: string;
  image: string;
  duration: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface TravelEssential {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// Generic hook for fetching Firestore data without fallback
function useFirestoreCollection<T>(
  collectionName: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCollection<T>(collectionName);
        setData(result);
      } catch (err) {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [collectionName]);

  return { data, loading, error, refetch: () => {} };
}

// Hooks for each collection
export const useTours = () => 
  useFirestoreCollection<Tour>(COLLECTIONS.TOURS);

export const useDestinations = () => 
  useFirestoreCollection<Destination>(COLLECTIONS.DESTINATIONS);

export const useBlogPosts = () => 
  useFirestoreCollection<BlogPost>(COLLECTIONS.BLOG_POSTS);

export const useCities = () => 
  useFirestoreCollection<City>(COLLECTIONS.CITIES);

export const useTestimonials = () => 
  useFirestoreCollection<Testimonial>(COLLECTIONS.TESTIMONIALS);

export const useExploreDestinations = () => 
  useFirestoreCollection<ExploreDestination>(COLLECTIONS.EXPLORE_DESTINATIONS);

export const useExploreTours = () => 
  useFirestoreCollection<ExploreTour>(COLLECTIONS.EXPLORE_TOURS);

export const useTeam = () => 
  useFirestoreCollection<TeamMember>(COLLECTIONS.TEAM);

export const useTravelEssentials = () => {
  const [data, setData] = useState<TravelEssential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCollection<TravelEssential>("travelEssentials");
        setData(result);
      } catch (err) {
        console.error("Error fetching travel essentials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};

export const useFaqs = () => {
  const [data, setData] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCollection<FAQ>("faqs");
        setData(result);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};
