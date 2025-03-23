import Link from "next/link"
import { ArrowLeft, Bell, Brain, Lock, Moon, Smartphone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Brain className="h-6 w-6 text-primary" />
          <span>MindTrack</span>
        </Link>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and app preferences</p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">user@example.com</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Password</div>
                <div className="text-sm text-muted-foreground">Last changed 3 months ago</div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Daily Check-ins</div>
                  <div className="text-sm text-muted-foreground">Remind you to log your mood</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">Send weekly mental health summary</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Insights</div>
                  <div className="text-sm text-muted-foreground">Notify about new health insights</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Connected Devices
              </CardTitle>
              <CardDescription>Manage your connected health devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Fitbit Charge 5</div>
                  <div className="text-sm text-muted-foreground">Connected</div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Add Device
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Privacy
              </CardTitle>
              <CardDescription>Manage your privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Data Sharing</div>
                  <div className="text-sm text-muted-foreground">Share anonymized data for research</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Activity Tracking</div>
                  <div className="text-sm text-muted-foreground">Allow app to track your activity</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Download My Data
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Switch between light and dark mode</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Compact View</div>
                  <div className="text-sm text-muted-foreground">Show more content on screen</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

