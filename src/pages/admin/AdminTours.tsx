import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, Save, Upload } from "lucide-react";
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
  setDocument,
  COLLECTIONS 
} from "@/services/firestoreService";
import { uploadImage, getImagePath } from "@/services/storageService";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Tour } from "@/hooks/useFirestoreData";
import toursData from "@/data/seed/tours.json";

const AdminTours = () => {
  const { toast } = useToast();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    country: "India",
    image: "",
    duration: "",
    groupSize: "",
    rating: 4.5,
    price: "",
    description: "",
    fullDescription: "",
    highlights: "",
    included: "",
    notIncluded: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    const result = await getCollection<Tour>(COLLECTIONS.TOURS);
    if (result.length > 0) {
      setTours(result);
    } else {
      setTours(toursData as Tour[]);
    }
    setLoading(false);
  };

  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (tour?: Tour) => {
    if (tour) {
      setEditingTour(tour);
      setFormData({
        title: tour.title,
        location: tour.location,
        country: tour.country,
        image: tour.image,
        duration: tour.duration,
        groupSize: tour.groupSize,
        rating: tour.rating,
        price: tour.price,
        description: tour.description,
        fullDescription: tour.fullDescription || "",
        highlights: tour.highlights.join(", "),
        included: tour.included?.join(", ") || "",
        notIncluded: tour.notIncluded?.join(", ") || "",
      });
    } else {
      setEditingTour(null);
      setFormData({
        title: "",
        location: "",
        country: "India",
        image: "",
        duration: "",
        groupSize: "",
        rating: 4.5,
        price: "",
        description: "",
        fullDescription: "",
        highlights: "",
        included: "",
        notIncluded: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const tourData: Omit<Tour, "id"> = {
        title: formData.title,
        location: formData.location,
        country: formData.country,
        image: formData.image,
        duration: formData.duration,
        groupSize: formData.groupSize,
        rating: Number(formData.rating),
        price: formData.price,
        description: formData.description,
        fullDescription: formData.fullDescription,
        highlights: formData.highlights.split(",").map(s => s.trim()).filter(Boolean),
        included: formData.included.split(",").map(s => s.trim()).filter(Boolean),
        notIncluded: formData.notIncluded.split(",").map(s => s.trim()).filter(Boolean),
        itinerary: editingTour?.itinerary || [],
      };

      if (editingTour) {
        await updateDocument(COLLECTIONS.TOURS, editingTour.id, tourData);
        toast({ title: "Tour updated successfully" });
      } else {
        await addDocument(COLLECTIONS.TOURS, tourData);
        toast({ title: "Tour created successfully" });
      }

      setIsModalOpen(false);
      fetchTours();
    } catch (error) {
      toast({ title: "Error saving tour", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    
    const success = await deleteDocument(COLLECTIONS.TOURS, id);
    if (success) {
      toast({ title: "Tour deleted successfully" });
      fetchTours();
    } else {
      toast({ title: "Error deleting tour", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl text-primary">Tours</h1>
            <p className="font-body text-foreground/70">Manage your tour packages</p>
          </div>
          <Button variant="hero" onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Tour
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
          <Input
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-40 bg-muted relative">
                  {tour.image && (
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => openModal(tour)}
                      className="p-2 bg-card rounded-full shadow hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="p-2 bg-card rounded-full shadow hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-body text-secondary">{tour.country}</span>
                  <h3 className="font-heading text-lg text-primary">{tour.title}</h3>
                  <p className="font-body text-sm text-foreground/70 mt-1">{tour.location}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-body text-sm text-foreground/60">{tour.duration}</span>
                    <span className="font-heading text-lg text-primary">{tour.price}</span>
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
                {editingTour ? "Edit Tour" : "Add New Tour"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="India">India</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Delhi - Agra - Jaipur"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="7 Days"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Group Size</Label>
                  <Input
                    value={formData.groupSize}
                    onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                    placeholder="2-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$2,499"
                    required
                  />
                </div>
              </div>

              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="tours"
                label="Tour Image"
              />

              <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Highlights (comma separated)</Label>
                <Input
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="Taj Mahal sunrise, Amber Fort, Food tour"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Included (comma separated)</Label>
                  <Textarea
                    value={formData.included}
                    onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Not Included (comma separated)</Label>
                  <Textarea
                    value={formData.notIncluded}
                    onChange={(e) => setFormData({ ...formData, notIncluded: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save Tour"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminTours;
