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
  price?: string;
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
  additionalImages?: string[];
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
  const { faqs, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedFaqs = useMemo(() => faqs, [faqs]); 
  return { data: memoizedFaqs, loading, error };
};

export const useTeam = () => {
  const { team, loading, error } = useSelector((state: RootState) => state.firebase);
  const memoizedTeam = useMemo(() => team, [team]);
  return { data: memoizedTeam, loading, error };
};
