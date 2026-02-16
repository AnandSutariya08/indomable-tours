import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Map, 
  Compass, 
  FileText, 
  Building2, 
  MessageSquare, 
  Users,
  Info,
  Home,
  Newspaper,
  ArrowRight
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getCollection, COLLECTIONS } from "@/services/firestoreService";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    tours: 0,
    destinations: 0,
    blog: 0,
    cities: 0,
    testimonials: 0,
    team: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [tours, destinations, blog, cities, testimonials, team] = await Promise.all([
        getCollection(COLLECTIONS.TOURS),
        getCollection(COLLECTIONS.DESTINATIONS),
        getCollection(COLLECTIONS.BLOG_POSTS),
        getCollection(COLLECTIONS.CITIES),
        getCollection(COLLECTIONS.TESTIMONIALS),
        getCollection(COLLECTIONS.TEAM)
      ]);

      setCounts({
        tours: tours.length,
        destinations: destinations.length,
        blog: blog.length,
        cities: cities.length,
        testimonials: testimonials.length,
        team: team.length
      });
    };

    fetchCounts();
  }, []);

  const stats = [
    { icon: Map, label: "Tours", count: counts.tours, href: "/admin/tours", color: "bg-blue-500" },
    { icon: Compass, label: "Destinations", count: counts.destinations, href: "/admin/destinations", color: "bg-green-500" },
    { icon: Newspaper, label: "Blog Posts", count: counts.blog, href: "/admin/blog", color: "bg-purple-500" },
    { icon: Building2, label: "Cities", count: counts.cities, href: "/admin/cities", color: "bg-orange-500" },
    { icon: MessageSquare, label: "Testimonials", count: counts.testimonials, href: "/admin/testimonials", color: "bg-pink-500" },
    { icon: Users, label: "Team Members", count: counts.team, href: "/admin/team", color: "bg-indigo-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-3xl text-primary">Dashboard</h1>
          <p className="font-body text-foreground/70 mt-2">
            Welcome back! Manage your website content from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.href}>
                <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="mt-4">
                    <p className="font-heading text-3xl text-primary">{stat.count}</p>
                    <p className="font-body text-sm text-foreground/70">{stat.label}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-heading text-xl text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin/tours">
              <div className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all group">
                <Map className="w-6 h-6 mb-2" />
                <p className="font-body font-medium">Add New Tour</p>
              </div>
            </Link>
            <Link to="/admin/blog">
              <div className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all group">
                <Newspaper className="w-6 h-6 mb-2" />
                <p className="font-body font-medium">Write Blog Post</p>
              </div>
            </Link>
            <Link to="/admin/testimonials">
              <div className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all group">
                <MessageSquare className="w-6 h-6 mb-2" />
                <p className="font-body font-medium">Add Testimonial</p>
              </div>
            </Link>
            <Link to="/admin/home-sections">
              <div className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all group">
                <Home className="w-6 h-6 mb-2" />
                <p className="font-body font-medium">Edit Home Page</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-secondary/10 p-6 rounded-xl">
          <h3 className="font-heading text-lg text-primary mb-2">Getting Started</h3>
          <ul className="font-body text-sm text-foreground/70 space-y-2">
            <li>• All changes are saved directly to Firebase Firestore</li>
            <li>• Images are uploaded to Firebase Storage</li>
            <li>• Changes reflect immediately on the live site</li>
            <li>• Seed data is used as fallback if Firestore is empty</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
