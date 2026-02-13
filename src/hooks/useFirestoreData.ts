import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  description: string;
  fullDescription?: string;
  highlights: string[];
  gallery?: string[];
  itinerary?: { day: number; title: string; description: string }[];
  included?: string[];
  notIncluded?: string[];
  tags?: string[];
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
  tags?: string[];
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

// Hooks using Redux State with useMemo for efficient data access
export const useTours = () => {
  const { tours, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedTours = useMemo(() => tours, [tours]);
  return { data: memoizedTours, loading, error };
};

export const useDestinations = () => {
  const { destinations, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedDestinations = useMemo(() => destinations, [destinations]);
  return { data: memoizedDestinations, loading, error };
};

export const useBlogPosts = () => {
  const { blog, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedBlog = useMemo(() => blog, [blog]);
  return { data: memoizedBlog, loading, error };
};

export const useCities = () => {
  const { cities, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedCities = useMemo(() => cities, [cities]);
  return { data: memoizedCities, loading, error };
};

export const useTestimonials = () => {
  const { testimonials, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedTestimonials = useMemo(() => testimonials, [testimonials]);
  return { data: memoizedTestimonials, loading, error };
};

export const useExploreDestinations = () => {
  const { exploreDestinations, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedExploreDestinations = useMemo(() => exploreDestinations, [exploreDestinations]);
  return { data: memoizedExploreDestinations, loading, error };
};

export const useExploreTours = () => {
  const { tours, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedExploreTours = useMemo(() => tours, [tours]);
  return { data: memoizedExploreTours, loading, error };
};

export const useTravelEssentials = () => {
  const { travelInfo, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedTravelEssentials = useMemo(() => travelInfo, [travelInfo]);
  return { data: memoizedTravelEssentials, loading, error };
};

export const useFaqs = () => {
  const { travelInfo, loading, error } = useSelector((state: RootState) => state.firebase);
  // Assuming FAQs might be part of travelInfo or a separate collection if needed
  const memoizedFaqs = useMemo(() => travelInfo, [travelInfo]); 
  return { data: memoizedFaqs, loading, error };
};

export const useTeam = () => {
  // Team is not currently in the slice, but we can add it if needed. 
  // For now, returning empty to maintain hook interface
  return { data: [], loading: false, error: null };
};
