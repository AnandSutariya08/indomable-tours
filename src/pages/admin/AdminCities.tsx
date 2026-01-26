import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, ArrowUpDown } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getCollection, addDocument, updateDocument, deleteDocument, COLLECTIONS } from "@/services/firestoreService";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { City } from "@/hooks/useFirestoreData";

const AdminCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof City; direction: 'asc' | 'desc' } | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    image: "",
    tours: 0,
    description: "",
    popular: "",
  });
  const { toast } = useToast();

  const fetchCities = async () => {
    setLoading(true);
    const data = await getCollection<City>(COLLECTIONS.CITIES);
    setCities(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleSort = (key: keyof City) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCities = [...cities].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === undefined || bVal === undefined) return 0;
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCities = sortedCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (city?: City) => {
    if (city) {
      setEditingCity(city);
      setFormData({
        name: city.name,
        country: city.country,
        image: city.image,
        tours: city.tours,
        description: city.description,
        popular: city.popular.join(", "),
      });
    } else {
      setEditingCity(null);
      setFormData({
        name: "",
        country: "",
        image: "",
        tours: 0,
        description: "",
        popular: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    const cityData = {
      name: formData.name,
      country: formData.country,
      image: formData.image,
      tours: Number(formData.tours),
      description: formData.description,
      popular: formData.popular.split(",").map((p) => p.trim()).filter(Boolean),
    };

    if (editingCity) {
      await updateDocument(COLLECTIONS.CITIES, editingCity.id, cityData);
      toast({ title: "City updated successfully" });
    } else {
      await addDocument(COLLECTIONS.CITIES, cityData);
      toast({ title: "City added successfully" });
    }

    setIsDialogOpen(false);
    fetchCities();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this city?")) {
      await deleteDocument(COLLECTIONS.CITIES, id);
      toast({ title: "City deleted successfully" });
      fetchCities();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-3xl font-heading text-primary font-bold">Cities</h1>
            <p className="font-body text-foreground/70">Manage travel city listings</p>
          </div>
          <Button onClick={() => handleOpenDialog()} variant="hero">
            <Plus className="w-4 h-4 mr-2" /> Add City
          </Button>
        </div>

        <div className="flex items-center gap-4 shrink-0 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              placeholder="Search cities..."
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
              <p className="animate-pulse font-medium text-foreground/60">Loading cities...</p>
            </div>
          ) : filteredCities.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4 text-center px-4">
               <div className="p-4 rounded-full bg-muted">
                <Search className="w-8 h-8 text-foreground/20" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">No cities found</h3>
                <p className="text-foreground/60 max-w-xs mx-auto">Try a different search term or add a new city.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10 border-b">
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-2">Name <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('country')}>
                      <div className="flex items-center gap-2">Country <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('tours')}>
                      <div className="flex items-center gap-2">Tours <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCities.map((city) => (
                    <TableRow key={city.id} className="group hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border/50">
                          {city.image && <img src={city.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-heading font-semibold text-primary">{city.name}</TableCell>
                      <TableCell className="text-foreground/70">{city.country}</TableCell>
                      <TableCell className="text-foreground/70">{city.tours}</TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(city)} className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(city.id)} className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCity ? "Edit City" : "Add New City"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Delhi"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g., India"
                  />
                </div>
              </div>
              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="cities"
                label="City Image"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Number of Tours</label>
                  <Input
                    type="number"
                    value={formData.tours}
                    onChange={(e) => setFormData({ ...formData, tours: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="City description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Popular Attractions (comma-separated)</label>
                <Input
                  value={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.value })}
                  placeholder="e.g., Red Fort, Qutub Minar"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>{editingCity ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminCities;