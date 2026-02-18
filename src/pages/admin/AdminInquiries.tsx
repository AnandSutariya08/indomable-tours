import { useEffect, useState } from "react";
import { getInquiries, Inquiry } from "@/services/inquiryService";
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

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const data = await getInquiries();
      setInquiries(data);
      setLoading(false);
    };
    fetchInquiries();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-brand-red text-white';
      case 'contacted': return 'bg-gold text-white';
      case 'resolved': return 'bg-brand-blue text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="font-heading text-3xl text-primary">Customer Inquiries</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quotes & Custom Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Category/Company</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">Loading inquiries...</TableCell>
                  </TableRow>
                ) : inquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">No inquiries found.</TableCell>
                  </TableRow>
                ) : (
                  inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell>
                        {inquiry.createdAt ? format(inquiry.createdAt.toDate(), "MMM dd, yyyy") : "Pending"}
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
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status.toUpperCase()}
                        </Badge>
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
