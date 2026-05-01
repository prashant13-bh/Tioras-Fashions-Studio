"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit2, Trash2, Package, Image as ImageIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getProducts } from "@/lib/ecommerce-api";

export default function AdminProductsPage() {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && !isAdmin) router.push("/admin/login");
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ limit: "50" });
        setProducts(res.products || []);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || !isAdmin) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your storefront catalog and inventory.</p>
        </div>
        <Button className="gradient-primary text-white rounded-xl font-bold shadow-lg">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 h-12 bg-card rounded-xl border-border/60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="h-12 bg-card border border-border/60 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-primary outline-none">
          <option>All Categories</option>
          <option>T-Shirts</option>
          <option>Hoodies</option>
          <option>Caps</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="premium-card h-40 animate-pulse bg-muted/10" />
          ))
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="premium-card group overflow-hidden">
              <CardContent className="p-4 flex gap-4">
                <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden shrink-0 border border-border/50">
                  <img 
                    src={product.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80"} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-foreground text-base truncate font-heading">{product.title}</h3>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 shrink-0">
                      ₹{(product.price_in_cents / 100).toFixed(0)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.subtitle || "Premium Apparel"}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      <Package className="w-3 h-3" />
                      {product.variants?.[0]?.inventory_quantity ?? 0} in stock
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-rose-500/10 hover:text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
