"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Package, IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  const { isAdmin, loading } = useAdminAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    revenue: "0",
    orders: "0",
    customers: "0",
    products: "0",
    revenueChange: "+0%",
    ordersChange: "+0%",
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/admin/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const [orders, customers, products] = await Promise.all([
          adminPb.collection("orders").getList(1, 1, { sort: "-created" }),
          adminPb.collection("users").getList(1, 1, { filter: 'role = "user"' }),
          adminPb.collection("products").getList(1, 1, { filter: "active = true" }),
        ]);

        // Calculate total revenue from all orders
        const allOrders = await adminPb.collection("orders").getFullList({
          filter: 'status = "paid"',
        });
        const totalRevenue = allOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

        setStats({
          revenue: totalRevenue.toLocaleString(),
          orders: orders.totalItems.toString(),
          customers: customers.totalItems.toString(),
          products: products.totalItems.toString(),
          revenueChange: "+100%", // Placeholder for now
          ordersChange: `+${orders.totalItems}`,
        });

        // Fetch recent orders
        const recent = await adminPb.collection("orders").getList(1, 5, {
          sort: "-created",
          expand: "user",
        });
        setRecentOrders(recent.items);

        // Fetch top products (simplified as just active products for now)
        const top = await adminPb.collection("products").getList(1, 4, {
          sort: "-created",
        });
        setTopProducts(top.items);

      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      }
    };

    if (isAdmin) fetchStats();
  }, [isAdmin, loading, router]);

  if (loading || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-background border border-border rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 12 Months</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.revenue}`} 
          icon={IndianRupee} 
          change={stats.revenueChange}
          isPositive={true}
          color="text-emerald-600" 
          bg="bg-emerald-500/10"
        />
        <StatCard 
          title="Orders" 
          value={stats.orders} 
          icon={ShoppingCart} 
          change={stats.ordersChange}
          isPositive={true}
          color="text-blue-600" 
          bg="bg-blue-500/10"
        />
        <StatCard 
          title="Customers" 
          value={stats.customers} 
          icon={Users} 
          change="+5.4%"
          isPositive={true}
          color="text-purple-600" 
          bg="bg-purple-500/10"
        />
        <StatCard 
          title="Active Products" 
          value={stats.products} 
          icon={Package} 
          change="-2"
          isPositive={false}
          color="text-orange-600" 
          bg="bg-orange-500/10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-heading">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                        {order.expand?.user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{order.expand?.user?.name || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">₹{order.total_amount?.toLocaleString()}</p>
                      <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                        order.status === "paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-orange-500/10 text-orange-600"
                      }`}>
                        {order.status || "pending"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-10">No orders found yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-heading">Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topProducts.length > 0 ? (
                topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden">
                        <img 
                          src={product.image || `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80`} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{product.title}</p>
                        <p className="text-xs text-muted-foreground">₹{product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                    <Link href={`/admin/products/edit/${product.id}`}>
                      <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">Edit</Button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-10">No products listed.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, change, isPositive, color, bg }) {
  return (
    <Card className="premium-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl ${bg}`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-extrabold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
