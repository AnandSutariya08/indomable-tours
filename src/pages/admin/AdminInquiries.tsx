import { useEffect, useState } from "react";
import {
  deleteInquiry,
  getInquiries,
  Inquiry,
  InquiryStatus,
  updateInquiryStatus,
} from "@/services/inquiryService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminInquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actingId, setActingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    const data = await getInquiries();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchInquiries();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-brand-red text-white';
      case 'contacted': return 'bg-gold text-white';
      case 'resolved': return 'bg-brand-blue text-white';
      default: return 'bg-muted';
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      inquiry.fullName.toLowerCase().includes(q) ||
      inquiry.email.toLowerCase().includes(q) ||
      inquiry.destination.toLowerCase().includes(q) ||
      inquiry.category.toLowerCase().includes(q)
    );
  });

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    setActingId(id);
    const result = await updateInquiryStatus(id, status);
    if (result.success) {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      toast({ title: "Inquiry status updated" });
    } else {
      toast({ title: "Failed to update inquiry", variant: "destructive" });
    }
    setActingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    setActingId(id);
    const result = await deleteInquiry(id);
    if (result.success) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      toast({ title: "Inquiry deleted" });
    } else {
      toast({ title: "Failed to delete inquiry", variant: "destructive" });
    }
    setActingId(null);
  };

  const renderDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Pending";
    return format(date, "MMM dd, yyyy");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-heading text-3xl text-primary">Customer Inquiries</h1>
          <Button variant="outline" onClick={() => void fetchInquiries()} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quotes & Custom Trips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search by name, email, destination, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Category/Company</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">Loading inquiries...</TableCell>
                  </TableRow>
                ) : filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">No inquiries found.</TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell>
                        {inquiry.createdAt ? renderDate(inquiry.createdAt) : "Pending"}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{inquiry.fullName}</div>
                        <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                        {inquiry.phone && <div className="text-sm text-muted-foreground">{inquiry.phone}</div>}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{inquiry.category}</div>
                        {inquiry.companyName && (
                          <div className="text-xs text-muted-foreground">{inquiry.companyName}</div>
                        )}
                      </TableCell>
                      <TableCell>{inquiry.destination}</TableCell>
                      <TableCell>
                        {inquiry.travelDates ? (
                          <>
                            <div className="font-medium">{inquiry.travelDates}</div>
                            {inquiry.travelTime && (
                              <div className="text-xs text-muted-foreground">{inquiry.travelTime}</div>
                            )}
                          </>
                        ) : (
                          <div className="text-xs text-muted-foreground italic">No date/time specified</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <select
                          value={inquiry.status}
                          onChange={(e) =>
                            void handleStatusChange(inquiry.id || "", e.target.value as InquiryStatus)
                          }
                          disabled={!inquiry.id || actingId === inquiry.id}
                          className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="resolved">RESOLVED</option>
                        </select>
                        <div className="mt-2">
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status.toUpperCase()}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => inquiry.id && void handleDelete(inquiry.id)}
                          disabled={!inquiry.id || actingId === inquiry.id}
                        >
                          {actingId === inquiry.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-destructive" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
