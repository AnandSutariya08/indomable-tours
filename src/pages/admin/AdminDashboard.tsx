import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  MessageSquare,
  Home,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getCollection, COLLECTIONS } from "@/services/firestoreService";
import { getInquiries } from "@/services/inquiryService";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    blog: 0,
    testimonials: 0,
    inquiries: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [blog, testimonials, inquiries] = await Promise.all([
        getCollection(COLLECTIONS.BLOG_POSTS),
        getCollection(COLLECTIONS.TESTIMONIALS),
        getInquiries(),
      ]);

      setCounts({
        blog: blog.length,
        testimonials: testimonials.length,
        inquiries: inquiries.length,
      });
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      icon: Newspaper,
      label: "Blog Posts",
      count: counts.blog,
      href: "/admin/blog",
      color: "bg-purple-500",
    },
    {
      icon: MessageSquare,
      label: "Testimonials",
      count: counts.testimonials,
      href: "/admin/testimonials",
      color: "bg-pink-500",
    },
    {
      icon: MessageSquare,
      label: "Inquiries",
      count: counts.inquiries,
      href: "/admin/inquiries",
      color: "bg-emerald-600",
    },
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
                    <div
                      className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="mt-4">
                    <p className="font-heading text-3xl text-primary">
                      {stat.count}
                    </p>
                    <p className="font-body text-sm text-foreground/70">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-xl">
          <h2 className="font-heading text-xl text-primary mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Link to="/admin/inquiries">
              <div className="p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all group">
                <MessageSquare className="w-6 h-6 mb-2" />
                <p className="font-body font-medium">Manage Inquiries</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-secondary/10 p-6 rounded-xl">
          <h3 className="font-heading text-lg text-primary mb-2">
            Getting Started
          </h3>
          <ul className="font-body text-sm text-foreground/70 space-y-2">
            <li>- Blog posts are managed in admin and synced via Firestore</li>
            <li>- Testimonials are managed in admin and shown on home page</li>
            <li>- Inquiries are stored in admin and sent by email</li>
            <li>- Home section content can be updated from admin</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
