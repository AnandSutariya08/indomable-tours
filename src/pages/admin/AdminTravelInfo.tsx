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
import { getCollection, addDocument, updateDocument, deleteDocument } from "@/services/firestoreService";
import type { TravelEssential, FAQ } from "@/hooks/useFirestoreData";

const AdminTravelInfo = () => {
  const [essentials, setEssentials] = useState<TravelEssential[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEssentialDialogOpen, setIsEssentialDialogOpen] = useState(false);
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [editingEssential, setEditingEssential] = useState<TravelEssential | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
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
      setEssentialFormData({ icon: "", title: "", description: "", details: "" });
    }
    setIsEssentialDialogOpen(true);
  };

  const handleSubmitEssential = async () => {
    const data = {
      icon: essentialFormData.icon,
      title: essentialFormData.title,
      description: essentialFormData.description,
      details: essentialFormData.details.split("\n").map((d) => d.trim()).filter(Boolean),
    };

    if (editingEssential) {
      await updateDocument("travelEssentials", editingEssential.id, data);
      toast({ title: "Essential updated successfully" });
    } else {
      await addDocument("travelEssentials", data);
      toast({ title: "Essential added successfully" });
    }

    setIsEssentialDialogOpen(false);
    fetchData();
  };

  const handleDeleteEssential = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteDocument("travelEssentials", id);
      toast({ title: "Essential deleted" });
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

  const handleSubmitFaq = async () => {
    if (editingFaq) {
      await updateDocument("faqs", editingFaq.id, faqFormData);
      toast({ title: "FAQ updated successfully" });
    } else {
      await addDocument("faqs", faqFormData);
      toast({ title: "FAQ added successfully" });
    }

    setIsFaqDialogOpen(false);
    fetchData();
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteDocument("faqs", id);
      toast({ title: "FAQ deleted" });
      fetchData();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-heading text-primary">Manage Travel Info</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="essentials">
            <TabsList>
              <TabsTrigger value="essentials">Travel Essentials</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="essentials" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => handleOpenEssentialDialog()}>
                  <Plus className="w-4 h-4 mr-2" /> Add Essential
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {essentials.map((essential) => (
                    <TableRow key={essential.id}>
                      <TableCell>{essential.icon}</TableCell>
                      <TableCell className="font-medium">{essential.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{essential.description}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEssentialDialog(essential)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteEssential(essential.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="faqs" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => handleOpenFaqDialog()}>
                  <Plus className="w-4 h-4 mr-2" /> Add FAQ
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium max-w-xs truncate">{faq.question}</TableCell>
                      <TableCell className="max-w-xs truncate">{faq.answer}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenFaqDialog(faq)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteFaq(faq.id)}>
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

        {/* Essential Dialog */}
        <Dialog open={isEssentialDialogOpen} onOpenChange={setIsEssentialDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingEssential ? "Edit Essential" : "Add New Essential"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Icon Name</label>
                  <Input
                    value={essentialFormData.icon}
                    onChange={(e) => setEssentialFormData({ ...essentialFormData, icon: e.target.value })}
                    placeholder="e.g., FileText"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={essentialFormData.title}
                    onChange={(e) => setEssentialFormData({ ...essentialFormData, title: e.target.value })}
                    placeholder="e.g., Visa Requirements"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={essentialFormData.description}
                  onChange={(e) => setEssentialFormData({ ...essentialFormData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Details (one per line)</label>
                <Textarea
                  value={essentialFormData.details}
                  onChange={(e) => setEssentialFormData({ ...essentialFormData, details: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEssentialDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitEssential}>{editingEssential ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* FAQ Dialog */}
        <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Question</label>
                <Input
                  value={faqFormData.question}
                  onChange={(e) => setFaqFormData({ ...faqFormData, question: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  value={faqFormData.answer}
                  onChange={(e) => setFaqFormData({ ...faqFormData, answer: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFaqDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitFaq}>{editingFaq ? "Update" : "Add"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminTravelInfo;
