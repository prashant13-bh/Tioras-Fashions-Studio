"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Star, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logoutAdmin } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return null;

  return (
    <aside className={`bg-secondary text-secondary-foreground transition-all duration-300 flex flex-col h-screen sticky top-0 ${collapsed ? "w-20" : "w-64"}`}>
      <div className="p-6 flex items-center justify-between border-b border-secondary-foreground/10">
        {!collapsed && (
          <Link href="/admin" className="font-extrabold text-xl font-heading text-white">
            Admin<span className="text-accent">Panel</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-white/10"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "hover:bg-white/5 text-secondary-foreground/70 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-secondary-foreground/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
          onClick={logoutAdmin}
        >
          <LogOut className="w-5 h-5 mr-3 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
