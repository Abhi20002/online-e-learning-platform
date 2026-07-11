"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "LearnHub",
    siteUrl: "https://learnhub.com",
    supportEmail: "support@learnhub.com",
    allowRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    enableNotifications: true,
    enableAnalytics: true,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
        <p className="text-muted-foreground">
          Configure platform-wide settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Basic information about your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Settings</CardTitle>
              <CardDescription>Control user registration and onboarding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowRegistration">Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable new user signups
                  </p>
                </div>
                <Switch
                  id="allowRegistration"
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, allowRegistration: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireEmailVerification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require users to verify their email
                  </p>
                </div>
                <Switch
                  id="requireEmailVerification"
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, requireEmailVerification: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>
                Put the platform in maintenance mode for updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Platform will be inaccessible to users
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, maintenanceMode: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and privacy options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" defaultValue="30" />
              </div>
              <div className="grid gap-2">
                <Label>Max Login Attempts</Label>
                <Input type="number" defaultValue="5" />
              </div>
              <div className="grid gap-2">
                <Label>Password Min Length</Label>
                <Input type="number" defaultValue="8" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how the platform sends notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications to users
                  </p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableNotifications: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Connect external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAnalytics">Google Analytics</Label>
                  <p className="text-sm text-muted-foreground">Track user behavior</p>
                </div>
                <Switch
                  id="enableAnalytics"
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableAnalytics: checked })
                  }
                />
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>Analytics Tracking ID</Label>
                <Input placeholder="UA-XXXXXXXXX-X" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
