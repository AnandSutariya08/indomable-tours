import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
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
import Contact from "./pages/Contactus";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Immediate scroll to top without any animation/transition
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const ImagePrefetcher = () => {
  const { tours, blog, destinations, cities, exploreDestinations, testimonials } = useSelector((state: RootState) => state.firebase);
  
  useEffect(() => {
    const allImages = new Set<string>();
    
    const addToSet = (item: any) => {
      if (!item) return;
      if (item.image) allImages.add(item.image);
      if (item.backgroundImage) allImages.add(item.backgroundImage);
      if (item.avatar) allImages.add(item.avatar);
      if (item.gallery && Array.isArray(item.gallery)) {
        item.gallery.forEach((img: string) => {
          if (img) allImages.add(img);
        });
      }
    };

    [...tours, ...blog, ...destinations, ...cities, ...exploreDestinations, ...testimonials].forEach(addToSet);

    const priorityImages = Array.from(allImages);
    
    // Process in batches
    const batchSize = 5;
    let index = 0;

    const loadBatch = () => {
      const batch = priorityImages.slice(index, index + batchSize);
      if (batch.length === 0) return;

      batch.forEach(src => {
        if (!src) return;
        
        // Add link preload tag to head
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);

        const img = new Image();
        // Use high priority for loading
        img.fetchPriority = 'high';
        img.src = src;
      });

      index += batchSize;
      if (index < priorityImages.length) {
        // Use a faster interval for mobile responsiveness
        setTimeout(loadBatch, 20);
      }
    };

    if (priorityImages.length > 0) {
      // Start prefetching immediately after load
      loadBatch();
    }
  }, [tours, blog, destinations, cities, exploreDestinations, testimonials]);

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
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:id" element={<TourDetails />} />
              <Route path="/destinations" element={<Destinations />} />
              {/* <Route path="/travel-info" element={<TravelInfo />} /> */}
              <Route path="/catagories" element={<ToursByCity />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
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
