import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Search, ArrowUpDown, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getCollection, addDocument, updateDocument, deleteDocument, COLLECTIONS } from "@/services/firestoreService";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { TeamMember } from "@/hooks/useFirestoreData";

const AdminTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof TeamMember; direction: 'asc' | 'desc' } | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
  });
  const { toast } = useToast();

  const fetchTeam = async () => {
    setLoading(true);
    const data = await getCollection<TeamMember>(COLLECTIONS.TEAM);
    setTeam(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSort = (key: keyof TeamMember) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...team].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === undefined || bVal === undefined) return 0;
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        image: member.image,
        bio: member.bio,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        role: "",
        image: "",
        bio: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingMember) {
        await updateDocument(COLLECTIONS.TEAM, editingMember.id, formData);
        toast({ title: "Team member updated successfully" });
      } else {
        await addDocument(COLLECTIONS.TEAM, formData);
        toast({ title: "Team member added successfully" });
      }
      setIsDialogOpen(false);
      fetchTeam();
    } catch (error) {
      toast({ title: "Error saving team member", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      await deleteDocument(COLLECTIONS.TEAM, id);
      toast({ title: "Team member deleted successfully" });
      fetchTeam();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-3xl font-heading text-primary font-bold">Team Members</h1>
            <p className="font-body text-foreground/70">Manage your agency experts and guides</p>
          </div>
          <Button onClick={() => handleOpenDialog()} variant="hero">
            <Plus className="w-4 h-4 mr-2" /> Add Expert
          </Button>
        </div>

        <div className="flex items-center gap-4 shrink-0 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              placeholder="Search by name or role..."
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
              <p className="animate-pulse font-medium text-foreground/60">Loading team...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-4 text-center px-4">
               <div className="p-4 rounded-full bg-muted">
                <Search className="w-8 h-8 text-foreground/20" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">No experts found</h3>
                <p className="text-foreground/60 max-w-xs mx-auto">Start building your dream travel team.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-card z-10 border-b">
                  <TableRow>
                    <TableHead className="w-[80px]">Photo</TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-2">Name <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('role')}>
                      <div className="flex items-center gap-2">Role <ArrowUpDown className="w-3 h-3" /></div>
                    </TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((member) => (
                    <TableRow key={member.id} className="group hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border/50">
                          {member.image && <img src={member.image} alt="" className="w-full h-full object-cover" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-heading font-semibold text-primary">{member.name}</TableCell>
                      <TableCell className="text-foreground/70 font-medium">{member.role}</TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(member)} className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)} className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
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
              <DialogTitle className="font-heading text-xl font-bold">
                {editingMember ? "Edit Professional" : "Add New Professional"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Professional Role</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Destination Expert"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Professional Portrait</Label>
                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="team"
                  label="Profile Photo"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Short Biography</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Professional background and expertise..."
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingMember ? "Update Professional" : "Add to Team"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminTeam;