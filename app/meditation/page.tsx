"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, Clock, Heart, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function MeditationPage() {
  const [activeTab, setActiveTab] = useState("guided")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(300) // 5 minutes in seconds
  const [volume, setVolume] = useState(80)

  // Simulate meditation timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleReset = () => {
    setCurrentTime(0)
    setIsPlaying(false)
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
          <Button variant="default" asChild>
            <Link href="/meditation">Meditation</Link>
          </Button>
        </nav>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Meditation</h1>
            <p className="text-sm text-muted-foreground">Guided meditations and mindfulness exercises</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted relative flex items-center justify-center">
                {isPlaying ? (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary">{formatTime(currentTime)}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Brain className="h-16 w-16 text-primary mb-2" />
                    <h2 className="text-xl font-medium">Calm Mind Meditation</h2>
                    <p className="text-sm text-muted-foreground">5 minutes of guided relaxation</p>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      onValueChange={handleSeek}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-12 w-12" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button variant="outline" size="icon" disabled>
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="guided">Guided Meditations</TabsTrigger>
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
                <TabsTrigger value="focus">Focus</TabsTrigger>
                <TabsTrigger value="anxiety">Anxiety Relief</TabsTrigger>
              </TabsList>
              <TabsContent value="guided" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Breath Awareness</CardTitle>
                        <Badge variant="outline">5 min</Badge>
                      </div>
                      <CardDescription>Focus on your breath to calm the mind</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Beginner friendly</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.8/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Meditation
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Body Scan</CardTitle>
                        <Badge variant="outline">10 min</Badge>
                      </div>
                      <CardDescription>Release tension throughout your body</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>All levels</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.7/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Meditation
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Loving Kindness</CardTitle>
                        <Badge variant="outline">15 min</Badge>
                      </div>
                      <CardDescription>Cultivate compassion for yourself and others</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Intermediate</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.9/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Meditation
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Mindful Awareness</CardTitle>
                        <Badge variant="outline">8 min</Badge>
                      </div>
                      <CardDescription>Develop present moment awareness</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>All levels</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.6/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Meditation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="sleep" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Deep Sleep</CardTitle>
                        <Badge variant="outline">20 min</Badge>
                      </div>
                      <CardDescription>Gentle guidance into restful sleep</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Bedtime</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.9/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Meditation
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Sleep Sounds</CardTitle>
                        <Badge variant="outline">60 min</Badge>
                      </div>
                      <CardDescription>Calming nature sounds for sleep</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Bedtime</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.7/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Sounds
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="focus" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Focus Boost</CardTitle>
                        <Badge variant="outline">10 min</Badge>
                      </div>
                      <CardDescription>Sharpen your concentration</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Morning</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.8/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Meditation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="anxiety" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">Anxiety Relief</CardTitle>
                        <Badge variant="outline">12 min</Badge>
                      </div>
                      <CardDescription>Calm anxious thoughts and feelings</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Any time</span>
                        <Heart className="ml-3 mr-1 h-4 w-4 text-red-500" />
                        <span>4.9/5</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Meditation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your meditation journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Goal</span>
                    <span>3 of 5 days</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Meditation Time</span>
                    <span>2.5 hours</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Streak</span>
                    <span>3 days</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Morning Calm</div>
                      <Badge variant="outline">7 min</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Start your day with clarity</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Stress Relief</div>
                      <Badge variant="outline">10 min</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Release tension and worry</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Gratitude Practice</div>
                      <Badge variant="outline">5 min</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Cultivate appreciation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meditation Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium text-sm">Find a Quiet Space</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose a quiet location where you won't be disturbed for the duration of your meditation.
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium text-sm">Comfortable Position</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sit in a position that allows you to be both alert and relaxed. Use cushions if needed.
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium text-sm">Be Kind to Yourself</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    If your mind wanders, gently bring your attention back without judgment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

