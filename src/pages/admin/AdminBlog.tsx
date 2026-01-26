import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search, Save, Upload, ArrowUpDown, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof BlogPost; direction: 'asc' | 'desc' } | null>(null);
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

  const fetchPosts = async () => {
    setLoading(true);
    const result = await getCollection<BlogPost>(COLLECTIONS.BLOG_POSTS);
    setPosts(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSort = (key: keyof BlogPost) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === undefined || bVal === undefined) return 0;
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredPosts = sortedPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-primary font-bold">Blog Management</h1>
            <p className="font-body text-foreground/70">Share stories and travel tips with your audience</p>
          </div>
          <Button variant="hero" onClick={() => openModal()} className="shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        <div className="flex items-center gap-4 shrink-0 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              placeholder="Search by title, category or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-card rounded-xl border border-border/50 shadow-sm flex flex-col overflow-hidden">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="animate-pulse font-medium text-foreground/60">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4 text-center px-4">
              <div className="p-4 rounded-full bg-muted">
                <Search className="w-8 h-8 text-foreground/20" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">No posts found</h3>
                <p className="text-foreground/60 max-w-xs mx-auto">Start by creating your first blog story.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10 border-b">
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('title')}>
                      <div className="flex items-center gap-2">Title <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('category')}>
                      <div className="flex items-center gap-2">Category <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('author')}>
                      <div className="flex items-center gap-2">Author <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors text-right" onClick={() => handleSort('date')}>
                      <div className="flex items-center justify-end gap-2">Date <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="group hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border/50">
                          {post.image && <img src={post.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="flex flex-col">
                          <span className="font-heading font-semibold text-primary line-clamp-1">{post.title}</span>
                          {post.featured && <span className="text-[10px] text-secondary font-bold uppercase">Featured</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-0.5 bg-muted text-foreground/70 text-[10px] font-bold rounded uppercase tracking-wider">
                          {post.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{post.author}</TableCell>
                      <TableCell className="text-right text-xs text-foreground/50">{post.date}</TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => openModal(post)} className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold">
                {editingPost ? "Edit Story" : "Compose New Story"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label className="font-semibold text-sm">Headline</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Catchy blog title..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Category</Label>
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
                  <Label className="font-semibold text-sm">Author Name</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g., Jane Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Read Time Estimate</Label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g., 5 min read"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Publication Date</Label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold text-sm">Featured Header Image</Label>
                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="blog"
                  label="Story Cover"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold text-sm">Short Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Summary for listing view..."
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold text-sm">Story Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your story here (HTML tags supported for formatting)..."
                  rows={10}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold text-sm">Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Travel, Culture, Adventure"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured" className="cursor-pointer select-none">Feature this post on home page</Label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingPost ? "Update Post" : "Publish Story"}
                    </>
                  )}
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