import { Suspense, lazy, useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Destinations from "./pages/Destinations";
import ToursByCity from "./pages/ToursByCity";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contactus";
import { AppDispatch } from "./store";
import { fetchCollections } from "./store/slices/firebaseSlice";
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminHomeSections = lazy(() => import("./pages/admin/AdminHomeSections"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));

const queryClient = new QueryClient();
const RESPONSIVE_WIDTHS = [480, 768, 1200];
const RESPONSIVE_PREFIXES = [
  "/assets/tours/",
  "/assets/blog/",
  "/assets/destinations/",
];

type IdleCapableWindow = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const buildResponsiveSrcSet = (src: string) => {
  if (!src) return "";

  let parsed: URL;
  try {
    parsed = new URL(src, window.location.origin);
  } catch {
    return "";
  }

  const { pathname, search } = parsed;
  if (!RESPONSIVE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return "";

  const match = pathname.match(/^(.*)\.(jpg|jpeg|png|webp|avif)$/i);
  if (!match) return "";
  if (/-\d+\.(webp|avif)$/i.test(pathname)) return "";

  const basePath = match[1];
  return RESPONSIVE_WIDTHS.map(
    (width) => `${basePath}-${width}.webp${search} ${width}w`,
  ).join(", ");
};

const applyResponsiveAttributes = (img: HTMLImageElement) => {
  if (img.dataset.responsiveEnhanced === "true") return;
  if (img.hasAttribute("data-no-srcset")) return;

  if (img.getAttribute("srcset")) {
    img.dataset.responsiveEnhanced = "true";
    return;
  }

  const srcValue = img.getAttribute("src") || img.currentSrc || img.src;
  const srcSet = buildResponsiveSrcSet(srcValue);
  if (!srcSet) return;

  img.setAttribute("srcset", srcSet);
  if (!img.getAttribute("sizes")) img.setAttribute("sizes", "100vw");
  img.dataset.responsiveEnhanced = "true";
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Snap to top immediately on route changes (no smooth scroll)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

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
  const {
    tours,
    blog,
    destinations,
    cities,
    exploreDestinations,
    testimonials,
  } = useSelector((state: RootState) => state.firebase);

  useEffect(() => {
    const urls = new Set<string>();

    const addToSet = (item: Record<string, unknown> | null | undefined) => {
      if (!item) return;
      if (typeof item.image === "string" && item.image) urls.add(item.image);
      if (typeof item.backgroundImage === "string" && item.backgroundImage)
        urls.add(item.backgroundImage);
      if (typeof item.avatar === "string" && item.avatar) urls.add(item.avatar);
      if (Array.isArray(item.gallery)) {
        item.gallery.forEach((img) => {
          if (typeof img === "string" && img) urls.add(img);
        });
      }
    };

    [
      ...tours,
      ...blog,
      ...destinations,
      ...cities,
      ...exploreDestinations,
      ...testimonials,
    ].forEach(addToSet);

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

const ResponsiveImageEnhancer = () => {
  useEffect(() => {
    const processAllImages = () => {
      document.querySelectorAll("img").forEach((imgNode) => {
        applyResponsiveAttributes(imgNode as HTMLImageElement);
      });
    };

    processAllImages();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.tagName === "IMG") {
            applyResponsiveAttributes(node as HTMLImageElement);
            return;
          }

          node.querySelectorAll("img").forEach((imgNode) => {
            applyResponsiveAttributes(imgNode as HTMLImageElement);
          });
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
};

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchCollections(["blog", "testimonials"]));
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <SmartImagePrefetcher />
          <ResponsiveImageEnhancer />
          <BrowserRouter>
            <ScrollToTop />
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
                <Route
                  path="/admin/testimonials"
                  element={<AdminTestimonials />}
                />
                <Route
                  path="/admin/home-sections"
                  element={<AdminHomeSections />}
                />
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
