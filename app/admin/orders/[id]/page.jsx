"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { 
  ArrowLeft, 
  Download, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  FileImage,
  Printer,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import pb from "@/lib/pocketbase";
import { decrypt } from "@/lib/security-core";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) router.push("/admin/login");
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const record = await pb.collection('orders').getOne(params.id);
        
        let decryptedAddress = null;
        if (record.shipping_address) {
          try {
            const decrypted = await decrypt(record.shipping_address);
            decryptedAddress = JSON.parse(decrypted);
          } catch (e) {
            console.error("Address decryption failed");
          }
        }

        setOrder({
          ...record,
          address: decryptedAddress,
          date: new Date(record.created).toLocaleString(),
          items: typeof record.items === 'string' ? JSON.parse(record.items) : record.items
        });
      } catch (err) {
        toast.error("Order not found or access denied");
        router.push("/admin/orders");
      } finally {
        setLoading(false);
      }
    };
    if (isAdmin) fetchOrder();
  }, [isAdmin, params.id]);

  if (authLoading || !isAdmin) return null;
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!order) return <div className="p-8 text-center">Order not found.</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="rounded-xl hover:bg-muted">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" /> Print Invoice
          </Button>
          <Button className="gradient-primary text-white rounded-xl font-bold">
            Update Status
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="premium-card">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/20">
              <div>
                <CardTitle className="text-xl font-bold font-heading">Order #{order.id}</CardTitle>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
                {order.payment_status}
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-6">
                    <div className="flex gap-6">
                      <div className="w-20 h-20 bg-muted rounded-xl shrink-0 overflow-hidden border border-border/50">
                        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.variant}</p>
                          </div>
                          <p className="font-bold text-foreground">₹{item.price} x {item.quantity}</p>
                        </div>
                        
                        {item.customization && (
                          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4">
                            <div className="w-16 h-16 rounded-lg bg-white border border-primary/20 overflow-hidden shrink-0 flex items-center justify-center">
                              {item.customization.fileUrl ? (
                                <img src={item.customization.fileUrl} alt="Custom design" className="w-full h-full object-contain" />
                              ) : (
                                <FileImage className="w-6 h-6 text-primary" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Customization: {item.customization.type}</p>
                              <p className="text-sm italic text-muted-foreground mb-2">&quot;{item.customization.notes}&quot;</p>
                              <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold border-primary/20 text-primary hover:bg-primary hover:text-white">
                                <Download className="w-3 h-3 mr-1" /> Download Design
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-muted-foreground">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {order.address ? (
                  <>
                    <p className="font-bold">{order.address.fullName}</p>
                    <p className="text-sm text-muted-foreground">{order.address.street}</p>
                    <p className="text-sm text-muted-foreground">{order.address.city}, {order.address.state} - {order.address.zipCode}</p>
                    <div className="pt-2 flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs font-bold text-primary"><Phone className="w-3 h-3" /> {order.address.phone}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No address provided or decryption failed</p>
                )}
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-muted-foreground">Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method</span>
                  <span className="font-medium">{order.payment_method}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">₹{order.shipping_cost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST)</span>
                  <span className="font-medium">₹{order.tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-primary">
                  <span>Total Amount</span>
                  <span>₹{order.total}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
                <TimelineItem icon={CheckCircle2} title="Order Placed" time="20 Apr, 2:45 PM" active={true} />
                <TimelineItem icon={Clock} title="Payment Confirmed" time="20 Apr, 2:46 PM" active={true} />
                <TimelineItem icon={Package} title="In Production" time="21 Apr, 9:00 AM" active={true} />
                <TimelineItem icon={Truck} title="Shipped" time="Pending" />
                <TimelineItem icon={CheckCircle2} title="Delivered" time="Pending" />
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Need help?
            </h4>
            <p className="text-sm text-muted-foreground mb-4">Contact the customer directly regarding their design.</p>
            <Button className="w-full rounded-xl bg-primary text-white font-bold">
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ icon: Icon, title, time, active = false }) {
  return (
    <div className="flex gap-4 relative z-10">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
      <div>
        <p className={`text-sm font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
