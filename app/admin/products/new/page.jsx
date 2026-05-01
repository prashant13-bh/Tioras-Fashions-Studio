"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ArrowLeft, Save, Plus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AddProductPage() {
  const { isAdmin, loading } = useAdminAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  if (loading || !isAdmin) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Product created successfully!");
      router.push("/admin/products");
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Button>
        <Button onClick={handleSave} disabled={saving} className="gradient-primary text-white rounded-xl font-bold px-8 h-12 shadow-lg">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Creating..." : "Create Product"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-heading">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Product Title</Label>
                <Input placeholder="e.g. Premium Cotton Polo" className="rounded-xl h-11" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Base Price (₹)</Label>
                  <Input type="number" placeholder="999" className="rounded-xl h-11" required />
                </div>
                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input placeholder="T-SHIRT-001" className="rounded-xl h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" rows={6} placeholder="Describe the quality, fabric, and fit..."></textarea>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-heading">Inventory & Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors">
                <p className="text-sm font-bold text-muted-foreground"><Plus className="w-4 h-4 inline mr-1" /> Add Variant (Color, Size)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-heading">Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
                <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                <p className="text-sm font-bold">Click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">Recommended: 1000x1000px JPG/PNG</p>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold font-heading">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <select className="w-full h-11 bg-background border border-border rounded-xl px-4 text-sm focus:ring-2 focus:ring-primary outline-none">
                <option>T-Shirts</option>
                <option>Hoodies</option>
                <option>Caps</option>
                <option>Accessories</option>
              </select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
