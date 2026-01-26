import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Save, Upload, Loader2, Search, ArrowUpDown } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
import { Testimonial } from "@/hooks/useFirestoreData";

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Testimonial; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    quote: "",
    rating: 5,
    avatar: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const result = await getCollection<Testimonial>(COLLECTIONS.TESTIMONIALS);
    setTestimonials(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (key: keyof Testimonial) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...testimonials].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === undefined || bVal === undefined) return 0;
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        location: item.location,
        quote: item.quote,
        rating: item.rating,
        avatar: item.avatar,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        location: "",
        quote: "",
        rating: 5,
        avatar: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data: Omit<Testimonial, "id"> = {
        name: formData.name,
        location: formData.location,
        quote: formData.quote,
        rating: Number(formData.rating),
        avatar: formData.avatar || formData.name.split(" ").map(n => n[0]).join("").toUpperCase(),
      };

      if (editingItem) {
        await updateDocument(COLLECTIONS.TESTIMONIALS, editingItem.id, data);
        toast({ title: "Testimonial updated successfully" });
      } else {
        await addDocument(COLLECTIONS.TESTIMONIALS, data);
        toast({ title: "Testimonial created successfully" });
      }

      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast({ title: "Error saving testimonial", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    const success = await deleteDocument(COLLECTIONS.TESTIMONIALS, id);
    if (success) {
      toast({ title: "Testimonial deleted successfully" });
      fetchData();
    } else {
      toast({ title: "Error deleting testimonial", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-primary font-bold">Testimonials</h1>
            <p className="font-body text-foreground/70">Manage traveler stories and reviews</p>
          </div>
          <Button variant="hero" onClick={() => openModal()} className="shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        <div className="flex items-center gap-4 shrink-0 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              placeholder="Search by name, location or quote..."
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
              <p className="animate-pulse font-medium text-foreground/60">Loading testimonials...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4 text-center px-4">
              <div className="p-4 rounded-full bg-muted">
                <Search className="w-8 h-8 text-foreground/20" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">No testimonials found</h3>
                <p className="text-foreground/60 max-w-xs mx-auto">Start by adding feedback from your happy travelers.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10 border-b">
                  <TableRow>
                    <TableHead className="w-[60px]">Avatar</TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-2">Name <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('location')}>
                      <div className="flex items-center gap-2">Location <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('rating')}>
                      <div className="flex items-center gap-2">Rating <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id} className="group hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 overflow-hidden">
                          {item.avatar && item.avatar.startsWith('http') ? (
                            <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            item.avatar || item.name.charAt(0)
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-heading font-semibold text-primary">{item.name}</TableCell>
                      <TableCell className="text-sm text-foreground/70">{item.location}</TableCell>
                      <TableCell>
                        <div className="flex text-secondary text-xs">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < item.rating ? "opacity-100" : "opacity-20"}>★</span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => openModal(item)} className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
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
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold">
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Traveler Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Sarah Jenkins"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., London, UK"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold text-sm">Quote / Feedback</Label>
                <Textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="The traveler's experience in their own words..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Rating</Label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} Stars</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Avatar / Initials</Label>
                  <Input
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="e.g., SJ or Photo URL"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingItem ? "Update Review" : "Save Review"}
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

export default AdminTestimonials;