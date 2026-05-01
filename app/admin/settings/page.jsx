"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Save, Shield, Bell, Globe, Palette, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const { isAdmin, loading } = useAdminAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  if (loading || !isAdmin) return null;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-foreground">Store Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your platform configuration and security.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gradient-primary text-white rounded-xl font-bold px-8 h-12 shadow-lg">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-8">
        {/* General Settings */}
        <Card className="premium-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-lg font-bold font-heading">General Information</CardTitle>
                <CardDescription>Public store details and support info.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input defaultValue="TioraS Fashions Studio" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input defaultValue="tyoras9686@gmail.com" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Store Description</Label>
              <textarea className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" rows={3}>Premium embroidery and custom printing brand based in Karnataka.</textarea>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Security */}
        <Card className="premium-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-500" />
              <div>
                <CardTitle className="text-lg font-bold font-heading">Payment & Security</CardTitle>
                <CardDescription>Configure Razorpay and Zero Trust settings.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="space-y-0.5">
                <p className="font-bold">Zero Trust Encryption</p>
                <p className="text-xs text-muted-foreground">AES-256-GCM encryption for all customer shipping data.</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="space-y-0.5">
                <p className="font-bold">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Temporarily disable the storefront for updates.</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2 pt-2">
              <Label>Razorpay Key ID</Label>
              <Input type="password" value="rzp_live_xxxxxxxxxxxxxx" readOnly className="rounded-xl bg-muted/50" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="premium-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-orange-500" />
              <div>
                <CardTitle className="text-lg font-bold font-heading">Notifications</CardTitle>
                <CardDescription>Manage order and system alerts.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">New Order WhatsApp Alerts</p>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Customer Email Confirmation</p>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
