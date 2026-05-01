"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  FileImage
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import pb from "@/lib/pocketbase";


export default function AdminOrdersPage() {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && !isAdmin) router.push("/admin/login");
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In production, fetch from PocketBase 'orders' collection
        // const records = await pb.collection('orders').getFullList({ sort: '-created' });
        // setOrders(records);
        
        // Mock data for now
        setOrders([
          {
            id: "ORD-7241",
            customer: "Arjun Mehta",
            date: "2024-04-20",
            total: "2,499",
            status: "Processing",
            payment: "Paid",
            hasCustomization: true,
          },
          {
            id: "ORD-7242",
            customer: "Priya Sharma",
            date: "2024-04-19",
            total: "1,299",
            status: "Shipped",
            payment: "Paid",
            hasCustomization: false,
          },
          {
            id: "ORD-7243",
            customer: "Rahul Deshmukh",
            date: "2024-04-19",
            total: "3,500",
            status: "Delivered",
            payment: "Paid",
            hasCustomization: true,
          },
          {
            id: "ORD-7244",
            customer: "Sneha Kapur",
            date: "2024-04-18",
            total: "899",
            status: "Pending",
            payment: "Unpaid",
            hasCustomization: false,
          },
        ]);
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending": return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "Processing": return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200"><TrendingUp className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "Shipped": return <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 border-indigo-200"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
      case "Delivered": return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200"><CheckCircle2 className="w-3 h-3 mr-1" /> Delivered</Badge>;
      case "Cancelled": return <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-200"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (authLoading || !isAdmin) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">Manage customer orders and custom designs.</p>
        </div>
        <Button className="gradient-primary text-white rounded-xl font-bold shadow-lg">
          Export Orders <Download className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Card className="premium-card overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by Order ID or Customer Name..." 
                className="pl-10 h-11 bg-background rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-11 rounded-xl border-border/60 font-bold px-6 shrink-0">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-bold py-4 pl-6">Order ID</TableHead>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Total</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Customization</TableHead>
                <TableHead className="text-right font-bold pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [1, 2, 3, 4].map((i) => (
                  <TableRow key={i}><TableCell colSpan={7} className="h-16 animate-pulse bg-muted/10"></TableCell></TableRow>
                ))
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} className="group hover:bg-muted/20 transition-colors">
                    <TableCell className="font-extrabold py-4 pl-6">{order.id}</TableCell>
                    <TableCell className="font-medium">
                      {order.customerName || order.customer}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="font-bold text-primary">₹{order.total}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      {order.hasCustomization ? (
                        <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">
                          <FileImage className="w-3 h-3 mr-1" /> View Design
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Standard</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                          <DropdownMenuLabel className="text-xs text-muted-foreground">Order Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          {order.hasCustomization && (
                            <DropdownMenuItem className="rounded-lg font-medium cursor-pointer text-primary">
                              <Download className="w-4 h-4 mr-2" /> Download Design
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-lg font-medium cursor-pointer text-emerald-600">
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg font-medium cursor-pointer text-rose-600">
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function TrendingUp(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}
