import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getCollection, addDocument, updateDocument, deleteDocument, COLLECTIONS } from "@/services/firestoreService";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { ExploreDestination, ExploreTour, Testimonial } from "@/hooks/useFirestoreData";

const AdminHomeSections = () => {
  const [exploreDestinations, setExploreDestinations] = useState<ExploreDestination[]>([]);
  const [exploreTours, setExploreTours] = useState<ExploreTour[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [isDestDialogOpen, setIsDestDialogOpen] = useState(false);
  const [isTourDialogOpen, setIsTourDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);

  // Editing states
  const [editingDest, setEditingDest] = useState<ExploreDestination | null>(null);
  const [editingTour, setEditingTour] = useState<ExploreTour | null>(null);
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);

  // Form data
  const [destFormData, setDestFormData] = useState({ name: "", landmark: "", image: "", description: "" });
  const [tourFormData, setTourFormData] = useState({ title: "", location: "", image: "", duration: "", description: "" });
  const [testFormData, setTestFormData] = useState({ name: "", location: "", quote: "", rating: 5, avatar: "" });

  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const [dests, tours, tests] = await Promise.all([
      getCollection<ExploreDestination>(COLLECTIONS.EXPLORE_DESTINATIONS),
      getCollection<ExploreTour>(COLLECTIONS.EXPLORE_TOURS),
      getCollection<Testimonial>(COLLECTIONS.TESTIMONIALS),
    ]);
    setExploreDestinations(dests);
    setExploreTours(tours);
    setTestimonials(tests);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Explore Destinations handlers
  const handleOpenDestDialog = (item?: ExploreDestination) => {
    if (item) {
      setEditingDest(item);
      setDestFormData({ name: item.name, landmark: item.landmark, image: item.image, description: item.description });
    } else {
      setEditingDest(null);
      setDestFormData({ name: "", landmark: "", image: "", description: "" });
    }
    setIsDestDialogOpen(true);
  };

  const handleSubmitDest = async () => {
    if (editingDest) {
      await updateDocument(COLLECTIONS.EXPLORE_DESTINATIONS, editingDest.id, destFormData);
      toast({ title: "Destination updated" });
    } else {
      await addDocument(COLLECTIONS.EXPLORE_DESTINATIONS, destFormData);
      toast({ title: "Destination added" });
    }
    setIsDestDialogOpen(false);
    fetchData();
  };

  const handleDeleteDest = async (id: string) => {
    if (confirm("Delete this destination?")) {
      await deleteDocument(COLLECTIONS.EXPLORE_DESTINATIONS, id);
      toast({ title: "Deleted" });
      fetchData();
    }
  };

  // Explore Tours handlers
  const handleOpenTourDialog = (item?: ExploreTour) => {
    if (item) {
      setEditingTour(item);
      setTourFormData({ title: item.title, location: item.location, image: item.image, duration: item.duration, description: item.description });
    } else {
      setEditingTour(null);
      setTourFormData({ title: "", location: "", image: "", duration: "", description: "" });
    }
    setIsTourDialogOpen(true);
  };

  const handleSubmitTour = async () => {
    if (editingTour) {
      await updateDocument(COLLECTIONS.EXPLORE_TOURS, editingTour.id, tourFormData);
      toast({ title: "Tour updated" });
    } else {
      await addDocument(COLLECTIONS.EXPLORE_TOURS, tourFormData);
      toast({ title: "Tour added" });
    }
    setIsTourDialogOpen(false);
    fetchData();
  };

  const handleDeleteTour = async (id: string) => {
    if (confirm("Delete this tour?")) {
      await deleteDocument(COLLECTIONS.EXPLORE_TOURS, id);
      toast({ title: "Deleted" });
      fetchData();
    }
  };

  // Testimonials handlers
  const handleOpenTestDialog = (item?: Testimonial) => {
    if (item) {
      setEditingTest(item);
      setTestFormData({ name: item.name, location: item.location, quote: item.quote, rating: item.rating, avatar: item.avatar });
    } else {
      setEditingTest(null);
      setTestFormData({ name: "", location: "", quote: "", rating: 5, avatar: "" });
    }
    setIsTestDialogOpen(true);
  };

  const handleSubmitTest = async () => {
    if (editingTest) {
      await updateDocument(COLLECTIONS.TESTIMONIALS, editingTest.id, testFormData);
      toast({ title: "Testimonial updated" });
    } else {
      await addDocument(COLLECTIONS.TESTIMONIALS, testFormData);
      toast({ title: "Testimonial added" });
    }
    setIsTestDialogOpen(false);
    fetchData();
  };

  const handleDeleteTest = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await deleteDocument(COLLECTIONS.TESTIMONIALS, id);
      toast({ title: "Deleted" });
      fetchData();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading text-primary">Manage Home Page Sections</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="destinations">
            <TabsList>
              <TabsTrigger value="destinations">Explore Destinations</TabsTrigger>
              <TabsTrigger value="tours">Explore Tours</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>

            {/* Explore Destinations Tab */}
            <TabsContent value="destinations" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => handleOpenDestDialog()}>
                  <Plus className="w-4 h-4 mr-2" /> Add Destination
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Landmark</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exploreDestinations.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.landmark}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDestDialog(item)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDest(item.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Explore Tours Tab */}
            <TabsContent value="tours" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => handleOpenTourDialog()}>
                  <Plus className="w-4 h-4 mr-2" /> Add Tour
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exploreTours.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenTourDialog(item)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTour(item.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => handleOpenTestDialog()}>
                  <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.rating} ★</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenTestDialog(item)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTest(item.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        )}

        {/* Destination Dialog */}
        <Dialog open={isDestDialogOpen} onOpenChange={setIsDestDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDest ? "Edit Destination" : "Add Destination"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input value={destFormData.name} onChange={(e) => setDestFormData({ ...destFormData, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium">Landmark</label>
                  <Input value={destFormData.landmark} onChange={(e) => setDestFormData({ ...destFormData, landmark: e.target.value })} />
                </div>
              </div>
              <ImageUploader
                value={destFormData.image}
                onChange={(url) => setDestFormData({ ...destFormData, image: url })}
                folder="destinations"
                label="Destination Image"
              />
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea value={destFormData.description} onChange={(e) => setDestFormData({ ...destFormData, description: e.target.value })} rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDestDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitDest}>{editingDest ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Tour Dialog */}
        <Dialog open={isTourDialogOpen} onOpenChange={setIsTourDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTour ? "Edit Tour" : "Add Tour"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input value={tourFormData.title} onChange={(e) => setTourFormData({ ...tourFormData, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input value={tourFormData.location} onChange={(e) => setTourFormData({ ...tourFormData, location: e.target.value })} />
                </div>
              </div>
              <ImageUploader
                value={tourFormData.image}
                onChange={(url) => setTourFormData({ ...tourFormData, image: url })}
                folder="tours"
                label="Tour Image"
              />
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input value={tourFormData.duration} onChange={(e) => setTourFormData({ ...tourFormData, duration: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea value={tourFormData.description} onChange={(e) => setTourFormData({ ...tourFormData, description: e.target.value })} rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTourDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitTour}>{editingTour ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Testimonial Dialog */}
        <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTest ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input value={testFormData.name} onChange={(e) => setTestFormData({ ...testFormData, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input value={testFormData.location} onChange={(e) => setTestFormData({ ...testFormData, location: e.target.value })} />
                </div>
              </div>
              <ImageUploader
                value={testFormData.avatar}
                onChange={(url) => setTestFormData({ ...testFormData, avatar: url })}
                folder="testimonials"
                label="Avatar Image"
              />
              <div>
                <label className="text-sm font-medium">Rating (1-5)</label>
                <Input type="number" min={1} max={5} value={testFormData.rating} onChange={(e) => setTestFormData({ ...testFormData, rating: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-sm font-medium">Quote</label>
                <Textarea value={testFormData.quote} onChange={(e) => setTestFormData({ ...testFormData, quote: e.target.value })} rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitTest}>{editingTest ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminHomeSections;
