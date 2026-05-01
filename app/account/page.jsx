"use client";

import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, User, Settings, LogOut, Package, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const { currentUser, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow pt-20 md:pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-extrabold font-heading text-foreground">My Account</h1>
                <p className="text-muted-foreground">Welcome back, {currentUser?.name || "Customer"}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={logout}
                className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar Nav */}
              <div className="space-y-2">
                <AccountNav label="Dashboard" href="/account" icon={User} active={true} />
                <AccountNav label="Orders" href="/account/orders" icon={Package} />
                <AccountNav label="Wishlist" href="/account/wishlist" icon={Heart} />
                <AccountNav label="Addresses" href="/account/addresses" icon={MapPin} />
                <AccountNav label="Settings" href="/account/settings" icon={Settings} />
              </div>

              {/* Main Content */}
              <div className="md:col-span-3 space-y-8">
                <div className="grid sm:grid-cols-3 gap-6">
                  <StatCard title="Total Orders" value="0" icon={ShoppingBag} />
                  <StatCard title="Wishlist Items" value="0" icon={Heart} />
                  <StatCard title="Rewards Points" value="150" icon={Star} color="text-accent" />
                </div>

                <Card className="premium-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-heading">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 text-center">
                    <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
                    <Link href="/products">
                      <Button className="gradient-primary text-white rounded-xl px-8 font-bold">Start Shopping</Button>
                    </Link>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="premium-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-bold text-muted-foreground">Personal Info</CardTitle>
                      <Link href="/account/settings" className="text-xs text-primary hover:underline font-bold">Edit</Link>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="font-bold text-foreground">{currentUser?.name}</p>
                      <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                    </CardContent>
                  </Card>

                  <Card className="premium-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-bold text-muted-foreground">Default Address</CardTitle>
                      <Link href="/account/addresses" className="text-xs text-primary hover:underline font-bold">Manage</Link>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">No address added yet.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

function AccountNav({ label, href, icon: Icon, active = false }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
        active 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}

function StatCard({ title, value, icon: Icon, color = "text-primary" }) {
  return (
    <Card className="premium-card">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-extrabold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Star(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
