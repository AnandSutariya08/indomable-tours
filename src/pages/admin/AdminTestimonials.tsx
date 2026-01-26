import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, Upload } from "lucide-react";
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
import { uploadImage, getImagePath } from "@/services/storageService";
import { Testimonial } from "@/hooks/useFirestoreData";
import testimonialsData from "@/data/seed/testimonials.json";

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const result = await getCollection<Testimonial>(COLLECTIONS.TESTIMONIALS);
    if (result.length > 0) {
      setTestimonials(result);
    } else {
      setTestimonials(testimonialsData as Testimonial[]);
    }
    setLoading(false);
  };

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl text-primary">Testimonials</h1>
            <p className="font-body text-foreground/70">Manage traveler stories</p>
          </div>
          <Button variant="hero" onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-sm relative"
              >
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-muted rounded-full hover:bg-destructive hover:text-destructive-foreground transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading">
                    {item.avatar}
                  </div>
                  <div>
                    <h3 className="font-heading text-primary">{item.name}</h3>
                    <p className="font-body text-sm text-foreground/60">{item.location}</p>
                  </div>
                </div>
                
                <p className="font-body text-sm text-foreground/80 italic">"{item.quote}"</p>
                
                <div className="flex mt-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-secondary">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Vancouver, Canada"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quote</Label>
                <Textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} Stars</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Avatar (initials)</Label>
                  <Input
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="SM"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save"}
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
