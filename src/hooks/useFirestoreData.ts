import { useState, useEffect } from "react";
import { getCollection, COLLECTIONS } from "@/services/firestoreService";

// Import seed data for fallback
import toursData from "@/data/seed/tours.json";
import destinationsData from "@/data/seed/destinations.json";
import blogPostsData from "@/data/seed/blogPosts.json";
import citiesData from "@/data/seed/cities.json";
import testimonialsData from "@/data/seed/testimonials.json";
import travelInfoData from "@/data/seed/travelInfo.json";
import exploreDestinationsData from "@/data/seed/exploreDestinations.json";
import exploreToursData from "@/data/seed/exploreTours.json";
import teamData from "@/data/seed/team.json";

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

// Generic hook for fetching Firestore data with fallback
function useFirestoreCollection<T>(
  collectionName: string,
  fallbackData: T[]
) {
  const [data, setData] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCollection<T>(collectionName);
        if (result.length > 0) {
          setData(result);
        }
      } catch (err) {
        console.warn(`Using fallback data for ${collectionName}:`, err);
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
  useFirestoreCollection<Tour>(COLLECTIONS.TOURS, toursData as Tour[]);

export const useDestinations = () => 
  useFirestoreCollection<Destination>(COLLECTIONS.DESTINATIONS, destinationsData as Destination[]);

export const useBlogPosts = () => 
  useFirestoreCollection<BlogPost>(COLLECTIONS.BLOG_POSTS, blogPostsData as BlogPost[]);

export const useCities = () => 
  useFirestoreCollection<City>(COLLECTIONS.CITIES, citiesData as City[]);

export const useTestimonials = () => 
  useFirestoreCollection<Testimonial>(COLLECTIONS.TESTIMONIALS, testimonialsData as Testimonial[]);

export const useExploreDestinations = () => 
  useFirestoreCollection<ExploreDestination>(COLLECTIONS.EXPLORE_DESTINATIONS, exploreDestinationsData as ExploreDestination[]);

export const useExploreTours = () => 
  useFirestoreCollection<ExploreTour>(COLLECTIONS.EXPLORE_TOURS, exploreToursData as ExploreTour[]);

export const useTeam = () => 
  useFirestoreCollection<TeamMember>(COLLECTIONS.TEAM, teamData as TeamMember[]);

export const useTravelEssentials = () => {
  const [data, setData] = useState<TravelEssential[]>(travelInfoData.essentials as TravelEssential[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCollection<TravelEssential>("travelEssentials");
        if (result.length > 0) setData(result);
      } catch (err) {
        console.warn("Using fallback travel essentials");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};

export const useFaqs = () => {
  const [data, setData] = useState<FAQ[]>(travelInfoData.faqs as FAQ[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCollection<FAQ>("faqs");
        if (result.length > 0) setData(result);
      } catch (err) {
        console.warn("Using fallback FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};
