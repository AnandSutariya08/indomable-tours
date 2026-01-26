import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, ArrowUpDown, Save, LayoutDashboard, Globe, MessageSquare } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getCollection, addDocument, updateDocument, deleteDocument, COLLECTIONS } from "@/services/firestoreService";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { ExploreDestination, ExploreTour, Testimonial } from "@/hooks/useFirestoreData";

const AdminHomeSections = () => {
  const [exploreDestinations, setExploreDestinations] = useState<ExploreDestination[]>([]);
  const [exploreTours, setExploreTours] = useState<ExploreTour[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-primary font-bold">Home Page Sections</h1>
            <p className="font-body text-foreground/70">Manage featured content showcased on the landing page</p>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="animate-pulse font-medium text-foreground/60">Loading home sections...</p>
            </div>
          ) : (
            <Tabs defaultValue="destinations" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="bg-card border border-border/50 p-1 shrink-0">
                <TabsTrigger value="destinations" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Explore Destinations
                </TabsTrigger>
                <TabsTrigger value="tours" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Explore Tours
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Testimonials
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 mt-4 overflow-hidden">
                <TabsContent value="destinations" className="h-full flex flex-col space-y-4">
                  <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
                      <div>
                        <CardTitle className="text-xl">Featured Destinations</CardTitle>
                        <CardDescription>Destinations highlighted in the "Explore Destinations" section</CardDescription>
                      </div>
                      <Button onClick={() => handleOpenDestDialog()} size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Featured
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                      <Table>
                        <TableHeader className="sticky top-0 bg-card z-10">
                          <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Landmark</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exploreDestinations.map((item) => (
                            <TableRow key={item.id} className="group">
                              <TableCell>
                                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border/50">
                                  {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold text-primary">{item.name}</TableCell>
                              <TableCell className="text-foreground/70">{item.landmark}</TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" onClick={() => handleOpenDestDialog(item)} className="h-8 w-8">
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteDest(item.id)} className="h-8 w-8 text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tours" className="h-full flex flex-col space-y-4">
                  <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
                      <div>
                        <CardTitle className="text-xl">Featured Tours</CardTitle>
                        <CardDescription>Tours highlighted in the "Explore Tours" carousel</CardDescription>
                      </div>
                      <Button onClick={() => handleOpenTourDialog()} size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Featured
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                      <Table>
                        <TableHeader className="sticky top-0 bg-card z-10">
                          <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exploreTours.map((item) => (
                            <TableRow key={item.id} className="group">
                              <TableCell>
                                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border/50">
                                  {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold text-primary">{item.title}</TableCell>
                              <TableCell className="text-foreground/70">{item.location}</TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" onClick={() => handleOpenTourDialog(item)} className="h-8 w-8">
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTour(item.id)} className="h-8 w-8 text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testimonials" className="h-full flex flex-col space-y-4">
                  <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
                      <div>
                        <CardTitle className="text-xl">Featured Testimonials</CardTitle>
                        <CardDescription>Traveler stories shown on the home page</CardDescription>
                      </div>
                      <Button onClick={() => handleOpenTestDialog()} size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Featured
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                      <Table>
                        <TableHeader className="sticky top-0 bg-card z-10">
                          <TableRow>
                            <TableHead className="w-[60px]">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {testimonials.map((item) => (
                            <TableRow key={item.id} className="group">
                              <TableCell>
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs overflow-hidden">
                                  {item.avatar && item.avatar.startsWith('http') ? <img src={item.avatar} alt="" className="w-full h-full object-cover" /> : item.avatar}
                                </div>
                              </TableCell>
                              <TableCell className="font-semibold text-primary">{item.name}</TableCell>
                              <TableCell className="text-foreground/70">{item.location}</TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" onClick={() => handleOpenTestDialog(item)} className="h-8 w-8">
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTest(item.id)} className="h-8 w-8 text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          )}
        </div>

        {/* Destination Dialog */}
        <Dialog open={isDestDialogOpen} onOpenChange={setIsDestDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold">{editingDest ? "Edit Featured Destination" : "Add Featured Destination"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Destination Name</label>
                  <Input value={destFormData.name} onChange={(e) => setDestFormData({ ...destFormData, name: e.target.value })} placeholder="e.g., Rajasthan" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Key Landmark</label>
                  <Input value={destFormData.landmark} onChange={(e) => setDestFormData({ ...destFormData, landmark: e.target.value })} placeholder="e.g., Amber Fort" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Preview Image</label>
                <ImageUploader
                  value={destFormData.image}
                  onChange={(url) => setDestFormData({ ...destFormData, image: url })}
                  folder="destinations"
                  label="Featured Image"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Short Description</label>
                <Textarea value={destFormData.description} onChange={(e) => setDestFormData({ ...destFormData, description: e.target.value })} placeholder="Engaging snippet for the home page card..." rows={3} className="resize-none" />
              </div>
            </div>
            <DialogFooter className="border-t pt-4">
              <Button variant="outline" onClick={() => setIsDestDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitDest} variant="hero">{editingDest ? "Update Featured" : "Add Featured"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Tour Dialog */}
        <Dialog open={isTourDialogOpen} onOpenChange={setIsTourDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold">{editingTour ? "Edit Featured Tour" : "Add Featured Tour"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Tour Title</label>
                  <Input value={tourFormData.title} onChange={(e) => setTourFormData({ ...tourFormData, title: e.target.value })} placeholder="e.g., Luxury Golden Triangle" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Route / Location</label>
                  <Input value={tourFormData.location} onChange={(e) => setTourFormData({ ...tourFormData, location: e.target.value })} placeholder="e.g., Delhi - Agra - Jaipur" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Featured Image</label>
                <ImageUploader
                  value={tourFormData.image}
                  onChange={(url) => setTourFormData({ ...tourFormData, image: url })}
                  folder="tours"
                  label="Display Photo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Duration</label>
                  <Input value={tourFormData.duration} onChange={(e) => setTourFormData({ ...tourFormData, duration: e.target.value })} placeholder="e.g., 7 Days" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Home Page Tagline</label>
                <Textarea value={tourFormData.description} onChange={(e) => setTourFormData({ ...tourFormData, description: e.target.value })} placeholder="One-line hook for the carousel..." rows={2} className="resize-none" />
              </div>
            </div>
            <DialogFooter className="border-t pt-4">
              <Button variant="outline" onClick={() => setIsTourDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitTour} variant="hero">{editingTour ? "Update Featured" : "Add Featured"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Testimonial Dialog */}
        <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold">{editingTest ? "Edit Featured Story" : "Add Featured Story"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Traveler Name</label>
                  <Input value={testFormData.name} onChange={(e) => setTestFormData({ ...testFormData, name: e.target.value })} placeholder="e.g., Michael Brown" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Location</label>
                  <Input value={testFormData.location} onChange={(e) => setTestFormData({ ...testFormData, location: e.target.value })} placeholder="e.g., New York, USA" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Avatar Image</label>
                <ImageUploader
                  value={testFormData.avatar}
                  onChange={(url) => setTestFormData({ ...testFormData, avatar: url })}
                  folder="testimonials"
                  label="Traveler Photo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Star Rating</label>
                  <Input type="number" min={1} max={5} value={testFormData.rating} onChange={(e) => setTestFormData({ ...testFormData, rating: Number(e.target.value) })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Featured Quote</label>
                <Textarea value={testFormData.quote} onChange={(e) => setTestFormData({ ...testFormData, quote: e.target.value })} placeholder="The most impactful part of their feedback..." rows={3} className="resize-none" />
              </div>
            </div>
            <DialogFooter className="border-t pt-4">
              <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitTest} variant="hero">{editingTest ? "Update Story" : "Add Story"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminHomeSections;