import { ReactNode } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Compass, 
  FileText, 
  Building2, 
  MessageSquare, 
  Users,
  Info,
  LogOut,
  Home,
  Newspaper,
  Upload
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Map, label: "Tours", href: "/admin/tours" },
  { icon: Compass, label: "Destinations", href: "/admin/destinations" },
  { icon: Newspaper, label: "Blog Posts", href: "/admin/blog" },
  { icon: Building2, label: "Cities", href: "/admin/cities" },
  { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Users, label: "Team", href: "/admin/team" },
  { icon: Info, label: "Travel Info", href: "/admin/travel-info" },
  { icon: Home, label: "Home Sections", href: "/admin/home-sections" },
  { icon: Upload, label: "Seed Uploader", href: "/admin/seed-uploader" },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, logout } = useAdmin();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="font-heading text-xl text-primary">Admin Panel</h1>
          <p className="font-body text-xs text-foreground/60">Manage your content</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link to="/" target="_blank">
            <Button variant="outline" size="sm" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
