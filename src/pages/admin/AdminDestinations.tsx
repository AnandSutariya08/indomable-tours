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
import type { Destination } from "@/hooks/useFirestoreData";

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    image: "",
    highlights: "",
  });
  const { toast } = useToast();

  const fetchDestinations = async () => {
    setLoading(true);
    const data = await getCollection<Destination>(COLLECTIONS.DESTINATIONS);
    setDestinations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleOpenDialog = (destination?: Destination) => {
    if (destination) {
      setEditingDestination(destination);
      setFormData({
        name: destination.name,
        tagline: destination.tagline,
        description: destination.description,
        image: destination.image,
        highlights: destination.highlights.join(", "),
      });
    } else {
      setEditingDestination(null);
      setFormData({
        name: "",
        tagline: "",
        description: "",
        image: "",
        highlights: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    const destinationData = {
      name: formData.name,
      tagline: formData.tagline,
      description: formData.description,
      image: formData.image,
      highlights: formData.highlights.split(",").map((h) => h.trim()).filter(Boolean),
      subDestinations: editingDestination?.subDestinations || [],
    };

    if (editingDestination) {
      await updateDocument(COLLECTIONS.DESTINATIONS, editingDestination.id, destinationData);
      toast({ title: "Destination updated successfully" });
    } else {
      await addDocument(COLLECTIONS.DESTINATIONS, destinationData);
      toast({ title: "Destination added successfully" });
    }

    setIsDialogOpen(false);
    fetchDestinations();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      await deleteDocument(COLLECTIONS.DESTINATIONS, id);
      toast({ title: "Destination deleted successfully" });
      fetchDestinations();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-heading text-primary">Manage Destinations</h1>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" /> Add Destination
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
                <TableHead>Tagline</TableHead>
                <TableHead>Highlights</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell className="font-medium">{destination.name}</TableCell>
                  <TableCell>{destination.tagline}</TableCell>
                  <TableCell>{destination.highlights.slice(0, 2).join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(destination)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(destination.id)}>
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
              <DialogTitle>{editingDestination ? "Edit Destination" : "Add New Destination"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., India"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tagline</label>
                <Input
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g., A Tapestry of Wonders"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Destination description..."
                  rows={3}
                />
              </div>
              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="destinations"
                label="Destination Image"
              />
              <div>
                <label className="text-sm font-medium">Highlights (comma-separated)</label>
                <Input
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="e.g., UNESCO Sites, Tiger Safaris, Culinary Tours"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>{editingDestination ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminDestinations;
