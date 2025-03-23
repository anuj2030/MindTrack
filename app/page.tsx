"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Activity, BellRing, Brain, Calendar, Heart, LineChart, LogOut, Moon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoodTracker } from "@/components/mood-tracker"
import { SleepQuality } from "@/components/sleep-quality"
import { StressLevel } from "@/components/stress-level"
import { FitbitConnect } from "@/components/fitbit-connect"
import { JournalEntry } from "@/components/journal-entry"
import { TherapyTools } from "@/components/therapy-tools"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { isAuthenticated, logoutUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState({
    name: "Guest User",
    avatar: "",
    isAuthenticated: false,
    streakDays: 12,
  })

  useEffect(() => {
    setMounted(true)
    // Check authentication status
    const checkAuth = () => {
      const auth = isAuthenticated()
      if (!auth) {
        router.push("/auth/login")
      } else {
        // Get user data from localStorage in client-side code
        const user = JSON.parse(localStorage.getItem("mindtrack_user") || "{}")
        setUserData({
          name: user.name || "User",
          avatar: user.avatar || "",
          isAuthenticated: true,
          streakDays: 12,
        })
      }
    }

    checkAuth()
  }, [router])

  // Add this useEffect to handle theme initialization
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      // Get theme from localStorage or default to light
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null

      // Apply theme to document
      if (savedTheme) {
        document.documentElement.classList.add(savedTheme)
      } else {
        document.documentElement.classList.add("light")
      }
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      })
      router.push("/auth/login")
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  if (!mounted) {
    return null // Prevent hydration issues
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 dark:bg-slate-950">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Brain className="h-6 w-6 text-primary" />
          <span>MindTrack</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm font-medium">
          <Button variant="ghost" asChild>
            <Link href="/">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/journal">Journal</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/therapy">Therapy Tools</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/community">Community</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/meditation">Meditation</Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <BellRing className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    3
                  </span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>You have 3 unread notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeToggle />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={userData.avatar || ""} alt={userData.name} />
                  <AvatarFallback>{userData.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4" align="end">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userData.avatar || ""} alt={userData.name} />
                    <AvatarFallback>{userData.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{userData.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <Badge variant="outline" className="rounded-sm px-1 font-normal">
                        {userData.streakDays} day streak
                      </Badge>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild size="sm">
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <Link href="/settings">Settings</Link>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-2 text-muted-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <div className="grid flex-1">
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="relative overflow-hidden border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mood Score</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78/100</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-emerald-500">+5%</span>
                    <span className="text-xs text-muted-foreground">from last week</span>
                  </div>
                  <Progress value={78} className="mt-3" />
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6.5 hrs</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-destructive">-0.5 hrs</span>
                    <span className="text-xs text-muted-foreground">from average</span>
                  </div>
                  <Progress value={65} className="mt-3" />
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72 bpm</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-emerald-500">Normal</span>
                    <span className="text-xs text-muted-foreground">resting average</span>
                  </div>
                  <Progress value={72} className="mt-3" />
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-l-4 border-l-emerald-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Activity Level</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,342</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-emerald-500">+1,425</span>
                    <span className="text-xs text-muted-foreground">steps today</span>
                  </div>
                  <Progress value={69} className="mt-3" />
                </CardContent>
              </Card>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-[600px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="mood">Mood</TabsTrigger>
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="therapy">Therapy</TabsTrigger>
                <TabsTrigger value="journal">Journal</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Weekly Overview</CardTitle>
                      <CardDescription>Your mental health metrics correlated with physical activity</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <StressLevel />
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Upcoming</CardTitle>
                      <CardDescription>Your scheduled activities and check-ins</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium leading-none">Meditation Session</p>
                              <Badge variant="outline" className="rounded-sm px-1 text-xs">
                                New
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Today, 5:00 PM</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Start
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <LineChart className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Weekly Check-in</p>
                            <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Remind
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                            <Activity className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Fitness Challenge</p>
                            <p className="text-sm text-muted-foreground">Thursday, 9:00 AM</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Join
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="mood" className="space-y-4">
                <MoodTracker />
              </TabsContent>
              <TabsContent value="sleep" className="space-y-4">
                <SleepQuality />
              </TabsContent>
              <TabsContent value="devices" className="space-y-4">
                <FitbitConnect />
              </TabsContent>
              <TabsContent value="therapy" className="space-y-4">
                <TherapyTools />
              </TabsContent>
              <TabsContent value="journal" className="space-y-4">
                <JournalEntry />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

