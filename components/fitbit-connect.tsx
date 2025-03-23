"use client"

import { useState } from "react"
import { Activity, ArrowRight, CheckCircle2, Heart, Info, Loader2, Moon, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export function FitbitConnect() {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [deviceTab, setDeviceTab] = useState("fitbit")
  const [lastSynced, setLastSynced] = useState<string | null>(null)
  const { toast } = useToast()

  // Simulate the connection process
  const handleConnect = async () => {
    setConnecting(true)

    // Simulate API connection process
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setConnected(true)
    setConnecting(false)
    setLastSynced(new Date().toISOString())

    toast({
      title: "Device connected successfully",
      description: "Your Fitbit data will now sync with MindTrack",
    })
  }

  const handleDisconnect = () => {
    setConnected(false)

    toast({
      title: "Device disconnected",
      description: "Your Fitbit has been disconnected from MindTrack",
    })
  }

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncProgress(0)

    // Simulate syncing progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSyncing(false)
          setLastSynced(new Date().toISOString())
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const formatLastSynced = () => {
    if (!lastSynced) return "Never"

    const date = new Date(lastSynced)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      {!connected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Health Devices</CardTitle>
            <CardDescription>
              Link your health devices to get personalized insights based on your activity, sleep, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={deviceTab} onValueChange={setDeviceTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fitbit">Fitbit</TabsTrigger>
                <TabsTrigger value="apple">Apple Health</TabsTrigger>
                <TabsTrigger value="google">Google Fit</TabsTrigger>
              </TabsList>
              <TabsContent value="fitbit" className="space-y-4 mt-4">
                <div className="text-center space-y-6 py-6">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-6">
                      <Smartphone className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Connect Your Fitbit Device</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                      Link your Fitbit device to get personalized insights based on your activity, sleep, and heart rate
                      data.
                    </p>
                  </div>
                  <Button onClick={handleConnect} disabled={connecting} className="mt-2">
                    {connecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        Connect Fitbit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>What data will be synced?</AlertTitle>
                  <AlertDescription>
                    Connecting your Fitbit will sync activity data, sleep patterns, heart rate measurements, and stress
                    scores to provide comprehensive insights.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              <TabsContent value="apple" className="space-y-4 mt-4">
                <div className="text-center space-y-6 py-6">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-6">
                      <Activity className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Connect Apple Health</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                      Sync your Apple Health data to get insights based on your activity, workouts, and health metrics.
                    </p>
                  </div>
                  <Button className="mt-2">
                    Connect Apple Health
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="google" className="space-y-4 mt-4">
                <div className="text-center space-y-6 py-6">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-6">
                      <Activity className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Connect Google Fit</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                      Link your Google Fit account to integrate your fitness and activity data for better insights.
                    </p>
                  </div>
                  <Button className="mt-2">
                    Connect Google Fit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Devices</CardTitle>
                  <CardDescription>Manage your connected health devices</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1 text-xs font-normal">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Connected
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Fitbit Charge 5</h3>
                      <p className="text-xs text-muted-foreground">Last synced: {formatLastSynced()}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleDisconnect}>
                      Disconnect
                    </Button>
                  </div>
                  {isSyncing && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Syncing data...</span>
                        <span>{syncProgress}%</span>
                      </div>
                      <Progress value={syncProgress} className="h-1" />
                    </div>
                  )}
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={handleSync} disabled={isSyncing}>
                {isSyncing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  "Sync Now"
                )}
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="permissions">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="permissions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Permissions</CardTitle>
                  <CardDescription>Control what data is shared from your Fitbit device</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="activity" className="flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <div>
                        <span>Activity Data</span>
                        <p className="text-xs text-muted-foreground">Steps, distance, calories, floors</p>
                      </div>
                    </Label>
                    <Switch id="activity" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sleep" className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <div>
                        <span>Sleep Data</span>
                        <p className="text-xs text-muted-foreground">Sleep stages, duration, quality</p>
                      </div>
                    </Label>
                    <Switch id="sleep" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="heart" className="flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <div>
                        <span>Heart Rate Data</span>
                        <p className="text-xs text-muted-foreground">Resting heart rate, zones, variability</p>
                      </div>
                    </Label>
                    <Switch id="heart" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sync Settings</CardTitle>
                  <CardDescription>Control how your Fitbit data syncs with MindTrack</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="auto-sync" className="flex flex-col">
                        <span>Auto-sync</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Automatically sync data every hour
                        </span>
                      </Label>
                      <Switch id="auto-sync" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="background-sync" className="flex flex-col">
                        <span>Background Sync</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Allow syncing when app is closed
                        </span>
                      </Label>
                      <Switch id="background-sync" defaultChecked />
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium">Device Health</h4>
                    <div className="mt-2 space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Battery Level</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} className="h-1" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Firmware Version</span>
                        <span>v5.4.2</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

