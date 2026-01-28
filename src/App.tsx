import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchAllData } from "./store/slices/firebaseSlice";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Destinations from "./pages/Destinations";
import TravelInfo from "./pages/TravelInfo";
import ToursByCity from "./pages/ToursByCity";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTours from "./pages/admin/AdminTours";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminDestinations from "./pages/admin/AdminDestinations";
import AdminCities from "./pages/admin/AdminCities";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminTravelInfo from "./pages/admin/AdminTravelInfo";
import AdminHomeSections from "./pages/admin/AdminHomeSections";
import AdminInquiries from "./pages/admin/AdminInquiries";

const queryClient = new QueryClient();

const ImagePrefetcher = () => {
  const { tours, blog, destinations, cities, exploreDestinations } = useSelector((state: RootState) => state.firebase);
  
  useEffect(() => {
    const allImages = new Set<string>();
    [...tours, ...blog, ...destinations, ...cities, ...exploreDestinations].forEach(item => {
      if (item.image) allImages.add(item.image);
      if (item.gallery) item.gallery.forEach((img: string) => allImages.add(img));
    });

    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [tours, blog, destinations, cities, exploreDestinations]);

  return null;
};

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <ImagePrefetcher />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:id" element={<TourDetails />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/travel-info" element={<TravelInfo />} />
              <Route path="/tours-by-city" element={<ToursByCity />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/tours" element={<AdminTours />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/destinations" element={<AdminDestinations />} />
              <Route path="/admin/cities" element={<AdminCities />} />
              <Route path="/admin/team" element={<AdminTeam />} />
              <Route path="/admin/travel-info" element={<AdminTravelInfo />} />
              <Route path="/admin/home-sections" element={<AdminHomeSections />} />
              <Route path="/admin/inquiries" element={<AdminInquiries />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
