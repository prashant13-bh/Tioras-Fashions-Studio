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
    revenue: "48,250",
    orders: "156",
    customers: "1,240",
    products: "42",
    revenueChange: "+12.5%",
    ordersChange: "+8.2%",
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/admin/login");
    }
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
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-heading">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm text-muted-foreground">#{(2450 + i)}</div>
                    <div>
                      <p className="text-sm font-bold">Customer Name</p>
                      <p className="text-xs text-muted-foreground">2 mins ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">₹1,499</p>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">Paid</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-heading">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80`} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Premium Cotton T-Shirt</p>
                      <p className="text-xs text-muted-foreground">32 units sold</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-primary">₹24,500</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
