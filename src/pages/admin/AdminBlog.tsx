import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, Save, Upload } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  getCollection, 
  addDocument, 
  updateDocument, 
  deleteDocument,
  COLLECTIONS 
} from "@/services/firestoreService";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { BlogPost } from "@/hooks/useFirestoreData";
import blogPostsData from "@/data/seed/blogPosts.json";

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Culture",
    author: "",
    readTime: "",
    date: "",
    featured: false,
    tags: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const result = await getCollection<BlogPost>(COLLECTIONS.BLOG_POSTS);
    if (result.length > 0) {
      setPosts(result);
    } else {
      setPosts(blogPostsData as BlogPost[]);
    }
    setLoading(false);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        date: post.date,
        featured: post.featured,
        tags: post.tags.join(", "),
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        category: "Culture",
        author: "",
        readTime: "",
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        featured: false,
        tags: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const postData: Omit<BlogPost, "id"> = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        category: formData.category,
        author: formData.author,
        readTime: formData.readTime,
        date: formData.date,
        featured: formData.featured,
        tags: formData.tags.split(",").map(s => s.trim()).filter(Boolean),
      };

      if (editingPost) {
        await updateDocument(COLLECTIONS.BLOG_POSTS, editingPost.id, postData);
        toast({ title: "Blog post updated successfully" });
      } else {
        await addDocument(COLLECTIONS.BLOG_POSTS, postData);
        toast({ title: "Blog post created successfully" });
      }

      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      toast({ title: "Error saving blog post", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    const success = await deleteDocument(COLLECTIONS.BLOG_POSTS, id);
    if (success) {
      toast({ title: "Blog post deleted successfully" });
      fetchPosts();
    } else {
      toast({ title: "Error deleting blog post", variant: "destructive" });
    }
  };

  const categories = ["Culture", "Adventure", "Food & Culture", "Luxury Stays", "Photography", "Wellness"];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl text-primary">Blog Posts</h1>
            <p className="font-body text-foreground/70">Manage your blog content</p>
          </div>
          <Button variant="hero" onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-40 bg-muted relative">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {post.featured && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                      Featured
                    </span>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => openModal(post)}
                      className="p-2 bg-card rounded-full shadow hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-card rounded-full shadow hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-body text-secondary">{post.category}</span>
                  <h3 className="font-heading text-lg text-primary line-clamp-2">{post.title}</h3>
                  <p className="font-body text-sm text-foreground/70 mt-1">{post.author}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-body text-xs text-foreground/60">{post.date}</span>
                    <span className="font-body text-xs text-foreground/60">{post.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">
                {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Read Time</Label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="8 min read"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="blog"
                label="Blog Post Image"
              />

              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Content (HTML supported)</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Travel, Culture, India"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save Post"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
