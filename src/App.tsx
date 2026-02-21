import { Suspense, lazy, useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchCollections, type FirebaseCollectionKey } from "./store/slices/firebaseSlice";
import { AdminProvider } from "@/contexts/AdminContext";

const Index = lazy(() => import("./pages/Index"));
const Tours = lazy(() => import("./pages/Tours"));
const TourDetails = lazy(() => import("./pages/TourDetails"));
const Destinations = lazy(() => import("./pages/Destinations"));
const ToursByCity = lazy(() => import("./pages/ToursByCity"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Contact = lazy(() => import("./pages/Contactus"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminCities = lazy(() => import("./pages/admin/AdminCities"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AdminTravelInfo = lazy(() => import("./pages/admin/AdminTravelInfo"));
const AdminHomeSections = lazy(() => import("./pages/admin/AdminHomeSections"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));

const queryClient = new QueryClient();

type IdleCapableWindow = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useLayoutEffect(() => {
    // Snap to top immediately on route changes (no smooth scroll)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  
  return null;
};

const getCollectionsForPath = (pathname: string): FirebaseCollectionKey[] => {
  if (pathname === "/") return ["tours", "blog", "testimonials"];
  if (pathname === "/tours" || pathname.startsWith("/tours/")) return ["tours"];
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return ["blog"];
  if (pathname === "/catagories") return ["tours"];
  return [];
};

const RouteDataLoader = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const collections = getCollectionsForPath(pathname);
    if (collections.length === 0) return;
    dispatch(fetchCollections(collections));
  }, [dispatch, pathname]);

  return null;
};

const RouteLoading = () => (
  <div className="min-h-[40vh] flex items-center justify-center px-6">
    <div className="w-full max-w-2xl">
      <div className="h-3 w-56 bg-black/10 rounded-full mb-4 animate-pulse mx-auto" />
      <div className="h-10 w-full bg-black/10 rounded-xl mb-3 animate-pulse" />
      <div className="h-10 w-5/6 bg-black/10 rounded-xl animate-pulse" />
    </div>
  </div>
);

const SmartImagePrefetcher = () => {
  const { tours, blog, destinations, cities, exploreDestinations, testimonials } = useSelector((state: RootState) => state.firebase);
  
  useEffect(() => {
    const urls = new Set<string>();
    
    const addToSet = (item: Record<string, unknown> | null | undefined) => {
      if (!item) return;
      if (typeof item.image === "string" && item.image) urls.add(item.image);
      if (typeof item.backgroundImage === "string" && item.backgroundImage) urls.add(item.backgroundImage);
      if (typeof item.avatar === "string" && item.avatar) urls.add(item.avatar);
      if (Array.isArray(item.gallery)) {
        item.gallery.forEach((img) => {
          if (typeof img === "string" && img) urls.add(img);
        });
      }
    };

    [...tours, ...blog, ...destinations, ...cities, ...exploreDestinations, ...testimonials].forEach(addToSet);

    // Keep prefetch tiny and idle-only to avoid starving first render on mobile Safari.
    const warmImages = Array.from(urls).slice(0, 8);
    const start = () => {
      warmImages.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.loading = "lazy";
        img.src = src;
      });
    };

    if (warmImages.length === 0) return;

    const idleWindow = window as IdleCapableWindow;
    const requestIdle = idleWindow.requestIdleCallback;
    if (typeof requestIdle === "function") {
      const idleId = requestIdle(start, { timeout: 2000 });
      return () => {
        const cancelIdle = idleWindow.cancelIdleCallback;
        if (typeof cancelIdle === "function") cancelIdle(idleId);
      };
    }

    const timer = window.setTimeout(start, 1200);
    return () => window.clearTimeout(timer);
  }, [tours, blog, destinations, cities, exploreDestinations, testimonials]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <SmartImagePrefetcher />
          <BrowserRouter>
            <ScrollToTop />
            <RouteDataLoader />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:id" element={<TourDetails />} />
                <Route path="/destinations" element={<Destinations />} />
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
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                <Route path="/admin/cities" element={<AdminCities />} />
                <Route path="/admin/team" element={<AdminTeam />} />
                <Route path="/admin/travel-info" element={<AdminTravelInfo />} />
                <Route path="/admin/home-sections" element={<AdminHomeSections />} />
                <Route path="/admin/inquiries" element={<AdminInquiries />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
