import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-heading text-primary">Manage Cities</h1>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" /> Add City
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Tours</TableHead>
                <TableHead>Popular Attractions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>{city.country}</TableCell>
                  <TableCell>{city.tours}</TableCell>
                  <TableCell>{city.popular.slice(0, 2).join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(city)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(city.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

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
                  placeholder="e.g., Red Fort, Qutub Minar, India Gate"
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
