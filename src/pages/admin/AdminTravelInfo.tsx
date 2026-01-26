import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, ArrowUpDown, Save, Info, HelpCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getCollection, addDocument, updateDocument, deleteDocument } from "@/services/firestoreService";
import type { TravelEssential, FAQ } from "@/hooks/useFirestoreData";

const AdminTravelInfo = () => {
  const [essentials, setEssentials] = useState<TravelEssential[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isEssentialDialogOpen, setIsEssentialDialogOpen] = useState(false);
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [editingEssential, setEditingEssential] = useState<TravelEssential | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [saving, setSaving] = useState(false);

  const [essentialFormData, setEssentialFormData] = useState({
    icon: "",
    title: "",
    description: "",
    details: "",
  });
  const [faqFormData, setFaqFormData] = useState({
    question: "",
    answer: "",
  });
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const [essentialsData, faqsData] = await Promise.all([
      getCollection<TravelEssential>("travelEssentials"),
      getCollection<FAQ>("faqs"),
    ]);
    setEssentials(essentialsData);
    setFaqs(faqsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Essential handlers
  const handleOpenEssentialDialog = (essential?: TravelEssential) => {
    if (essential) {
      setEditingEssential(essential);
      setEssentialFormData({
        icon: essential.icon,
        title: essential.title,
        description: essential.description,
        details: essential.details.join("\n"),
      });
    } else {
      setEditingEssential(null);
      setEssentialFormData({ icon: "FileText", title: "", description: "", details: "" });
    }
    setIsEssentialDialogOpen(true);
  };

  const handleSubmitEssential = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      icon: essentialFormData.icon,
      title: essentialFormData.title,
      description: essentialFormData.description,
      details: essentialFormData.details.split("\n").map((d) => d.trim()).filter(Boolean),
    };

    try {
      if (editingEssential) {
        await updateDocument("travelEssentials", editingEssential.id, data);
        toast({ title: "Essential updated successfully" });
      } else {
        await addDocument("travelEssentials", data);
        toast({ title: "Essential added successfully" });
      }
      setIsEssentialDialogOpen(false);
      fetchData();
    } catch (error) {
      toast({ title: "Error saving travel essential", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEssential = async (id: string) => {
    if (confirm("Are you sure you want to delete this essential travel info?")) {
      await deleteDocument("travelEssentials", id);
      toast({ title: "Essential travel info deleted" });
      fetchData();
    }
  };

  // FAQ handlers
  const handleOpenFaqDialog = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      setFaqFormData({ question: faq.question, answer: faq.answer });
    } else {
      setEditingFaq(null);
      setFaqFormData({ question: "", answer: "" });
    }
    setIsFaqDialogOpen(true);
  };

  const handleSubmitFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingFaq) {
        await updateDocument("faqs", editingFaq.id, faqFormData);
        toast({ title: "FAQ updated successfully" });
      } else {
        await addDocument("faqs", faqFormData);
        toast({ title: "FAQ added successfully" });
      }
      setIsFaqDialogOpen(false);
      fetchData();
    } catch (error) {
      toast({ title: "Error saving FAQ", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      await deleteDocument("faqs", id);
      toast({ title: "FAQ deleted" });
      fetchData();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-primary font-bold">Travel Information</h1>
            <p className="font-body text-foreground/70">Manage travel essentials and frequently asked questions</p>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="animate-pulse font-medium text-foreground/60">Loading travel information...</p>
            </div>
          ) : (
            <Tabs defaultValue="essentials" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="bg-card border border-border/50 p-1 shrink-0">
                <TabsTrigger value="essentials" className="flex items-center gap-2">
                  <Info className="w-4 h-4" /> Travel Essentials
                </TabsTrigger>
                <TabsTrigger value="faqs" className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> FAQs
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 mt-4 overflow-hidden">
                <TabsContent value="essentials" className="h-full flex flex-col space-y-4">
                  <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
                      <div>
                        <CardTitle className="text-xl">Travel Essentials</CardTitle>
                        <CardDescription>Core information categories for travelers</CardDescription>
                      </div>
                      <Button onClick={() => handleOpenEssentialDialog()} size="sm" variant="hero">
                        <Plus className="w-4 h-4 mr-2" /> Add Essential
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                      <Table>
                        <TableHeader className="sticky top-0 bg-card z-10">
                          <TableRow>
                            <TableHead className="w-[80px]">Icon</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Summary</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {essentials.map((essential) => (
                            <TableRow key={essential.id} className="group">
                              <TableCell className="font-mono text-xs text-foreground/50">{essential.icon}</TableCell>
                              <TableCell className="font-semibold text-primary">{essential.title}</TableCell>
                              <TableCell className="text-foreground/70 max-w-xs truncate">{essential.description}</TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" onClick={() => handleOpenEssentialDialog(essential)} className="h-8 w-8">
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteEssential(essential.id)} className="h-8 w-8 text-destructive">
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

                <TabsContent value="faqs" className="h-full flex flex-col space-y-4">
                  <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
                      <div>
                        <CardTitle className="text-xl">Common Questions</CardTitle>
                        <CardDescription>Frequently asked questions for the support section</CardDescription>
                      </div>
                      <Button onClick={() => handleOpenFaqDialog()} size="sm" variant="hero">
                        <Plus className="w-4 h-4 mr-2" /> Add FAQ
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                      <Table>
                        <TableHeader className="sticky top-0 bg-card z-10">
                          <TableRow>
                            <TableHead>Question</TableHead>
                            <TableHead>Answer Preview</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {faqs.map((faq) => (
                            <TableRow key={faq.id} className="group">
                              <TableCell className="font-semibold text-primary max-w-xs truncate">{faq.question}</TableCell>
                              <TableCell className="text-foreground/70 max-w-md truncate">{faq.answer}</TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="icon" onClick={() => handleOpenFaqDialog(faq)} className="h-8 w-8">
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteFaq(faq.id)} className="h-8 w-8 text-destructive">
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

        {/* Essential Dialog */}
        <Dialog open={isEssentialDialogOpen} onOpenChange={setIsEssentialDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold">{editingEssential ? "Edit Category" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitEssential} className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Lucide Icon Name</Label>
                  <Input
                    value={essentialFormData.icon}
                    onChange={(e) => setEssentialFormData({ ...essentialFormData, icon: e.target.value })}
                    placeholder="e.g., FileText, Map, Shield"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Category Title</Label>
                  <Input
                    value={essentialFormData.title}
                    onChange={(e) => setEssentialFormData({ ...essentialFormData, title: e.target.value })}
                    placeholder="e.g., Visa Requirements"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Short Summary</Label>
                <Textarea
                  value={essentialFormData.description}
                  onChange={(e) => setEssentialFormData({ ...essentialFormData, description: e.target.value })}
                  placeholder="A brief overview of this travel category..."
                  rows={2}
                  className="resize-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Detailed Points (One per line)</Label>
                <Textarea
                  value={essentialFormData.details}
                  onChange={(e) => setEssentialFormData({ ...essentialFormData, details: e.target.value })}
                  placeholder="Bullet point details for this category..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setIsEssentialDialogOpen(false)}>Cancel</Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  {saving ? "Saving..." : editingEssential ? "Update Category" : "Save Category"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* FAQ Dialog */}
        <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold">{editingFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitFaq} className="space-y-6 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Traveler's Question</Label>
                <Input
                  value={faqFormData.question}
                  onChange={(e) => setFaqFormData({ ...faqFormData, question: e.target.value })}
                  placeholder="e.g., What is the best time to visit North India?"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Expert Answer</Label>
                <Textarea
                  value={faqFormData.answer}
                  onChange={(e) => setFaqFormData({ ...faqFormData, answer: e.target.value })}
                  placeholder="Provide a helpful and detailed response..."
                  rows={6}
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setIsFaqDialogOpen(false)}>Cancel</Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  {saving ? "Saving..." : editingFaq ? "Update FAQ" : "Save FAQ"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminTravelInfo;