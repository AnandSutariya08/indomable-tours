import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, Save, Upload, ArrowUpDown, Loader2, Calendar } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
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

const AdminTours = () => {
  const { toast } = useToast();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Tour; direction: 'asc' | 'desc' } | null>(null);
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
    gallery: [] as string[],
    itinerary: [] as { day: number; title: string; description: string }[],
  });

  const fetchTours = async () => {
    setLoading(true);
    const result = await getCollection<Tour>(COLLECTIONS.TOURS);
    setTours(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSort = (key: keyof Tour) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTours = [...tours].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === undefined || bVal === undefined) return 0;
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredTours = sortedTours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase())
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
        gallery: tour.gallery || [],
        itinerary: tour.itinerary || [],
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
        gallery: [],
        itinerary: [],
      });
    }
    setIsModalOpen(true);
  };

  const addGalleryImage = (url: string) => {
    setFormData({ ...formData, gallery: [...formData.gallery, url] });
  };

  const removeGalleryImage = (index: number) => {
    setFormData({ ...formData, gallery: formData.gallery.filter((_, i) => i !== index) });
  };

  const addItineraryDay = () => {
    const newDay = {
      day: formData.itinerary.length + 1,
      title: "",
      description: "",
    };
    setFormData({ ...formData, itinerary: [...formData.itinerary, newDay] });
  };

  const updateItineraryDay = (index: number, field: "title" | "description", value: string) => {
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, itinerary: updated });
  };

  const removeItineraryDay = (index: number) => {
    const updated = formData.itinerary.filter((_, i) => i !== index);
    const reordered = updated.map((item, i) => ({ ...item, day: i + 1 }));
    setFormData({ ...formData, itinerary: reordered });
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
        itinerary: formData.itinerary,
        gallery: formData.gallery,
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
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-primary font-bold">Tour Packages</h1>
            <p className="font-body text-foreground/70">Create and manage your luxury travel experiences</p>
          </div>
          <Button variant="hero" onClick={() => openModal()} className="shadow-md hover:shadow-lg transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Add Tour
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 shrink-0 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              placeholder="Search by title, country or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 border-border/60 focus:border-primary"
            />
          </div>
        </div>

        {/* Tours Table */}
        <div className="flex-1 min-h-0 bg-card rounded-xl border border-border/50 shadow-sm flex flex-col overflow-hidden">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3 text-foreground/60">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="animate-pulse font-medium">Fetching tours...</p>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4">
              <div className="p-4 rounded-full bg-muted">
                <Search className="w-8 h-8 text-foreground/20" />
              </div>
              <div className="text-center">
                <h3 className="font-heading text-lg font-semibold">No tours found</h3>
                <p className="text-foreground/60 max-w-xs mx-auto">Try adjusting your search or add a new tour package to get started.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10 border-b shadow-sm">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('title')}>
                      <div className="flex items-center gap-2">
                        Title <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('country')}>
                      <div className="flex items-center gap-2">
                        Country <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('duration')}>
                      <div className="flex items-center gap-2">
                        Duration <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors text-right" onClick={() => handleSort('price')}>
                      <div className="flex items-center justify-end gap-2">
                        Price <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredTours.map((tour, index) => (
                      <TableRow key={tour.id} className="group hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border/50">
                            {tour.image && (
                              <img src={tour.image} alt="" className="w-full h-full object-cover" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-heading font-semibold text-primary">{tour.title}</span>
                            <span className="text-xs text-foreground/50 line-clamp-1">{tour.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded-md tracking-wider">
                            {tour.country}
                          </span>
                        </TableCell>
                        <TableCell className="text-foreground/70 font-medium">{tour.duration}</TableCell>
                        <TableCell className="text-right font-heading font-bold text-primary">{tour.price}</TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openModal(tour)}
                              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDelete(tour.id)}
                              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-bold">
              {editingTour ? "Edit Tour Package" : "Add New Tour Package"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Package Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Royal Rajasthan Journey"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Country</Label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="India">India</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Tour Location / Route</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Delhi - Agra - Jaipur - Udaipur"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 7 Days"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Group Size</Label>
                <Input
                  value={formData.groupSize}
                  onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                  placeholder="e.g., 2-12 Guests"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Starting Price</Label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., $2,499"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Tour Header Image</Label>
              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="tours"
                label="Cover Image"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Brief Summary</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A short engaging summary for listing cards..."
                className="resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Full Detailed Description</Label>
              <Textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="The complete tour narrative and highlights..."
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Key Highlights (comma separated)</Label>
              <Input
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                placeholder="e.g., Sunrise at Taj Mahal, Camel safari, Royal Palace dinner"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-primary">Tour Gallery Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border rounded-xl bg-muted/20">
                {formData.gallery.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border group shadow-sm">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <ImageUploader
                  value=""
                  onChange={(url) => addGalleryImage(url)}
                  folder="tours/gallery"
                  label="Add Image"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Day-by-Day Itinerary
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Day
                </Button>
              </div>
              {formData.itinerary.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-border rounded-lg bg-muted/30">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-foreground/30" />
                  <p className="text-sm text-foreground/50">No itinerary days added yet</p>
                  <Button type="button" variant="ghost" size="sm" onClick={addItineraryDay} className="mt-2">
                    <Plus className="w-4 h-4 mr-1" />
                    Add First Day
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {formData.itinerary.map((day, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-semibold text-primary">
                          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                            {day.day}
                          </span>
                          Day {day.day}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:bg-destructive/10"
                          onClick={() => removeItineraryDay(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        value={day.title}
                        onChange={(e) => updateItineraryDay(index, "title", e.target.value)}
                        placeholder="Day title (e.g., Arrival in Delhi)"
                        className="bg-background"
                      />
                      <Textarea
                        value={day.description}
                        onChange={(e) => updateItineraryDay(index, "description", e.target.value)}
                        placeholder="Day activities and description..."
                        rows={2}
                        className="bg-background resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Inclusions (comma separated)</Label>
                <Textarea
                  value={formData.included}
                  onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                  placeholder="e.g., 5-star accommodation, Private guide, Domestic flights"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Exclusions (comma separated)</Label>
                <Textarea
                  value={formData.notIncluded}
                  onChange={(e) => setFormData({ ...formData, notIncluded: e.target.value })}
                  placeholder="e.g., International airfare, Personal insurance, Tipping"
                  rows={4}
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
                    Saving Package...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingTour ? "Update Package" : "Create Package"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminTours;