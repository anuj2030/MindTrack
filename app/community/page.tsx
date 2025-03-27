"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, MessageCircle, Plus, Search, Share2, ThumbsUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")

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
          <Button variant="default" asChild>
            <Link href="/community">Community</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/meditation">Meditation</Link>
          </Button>
        </nav>
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Community</h1>
            <p className="text-sm text-muted-foreground">Connect with others on their mental health journey</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </Link>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-3 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search community posts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              <TabsContent value="feed" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user1" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Jane Doe</div>
                          <div className="text-xs text-muted-foreground">Posted 2 hours ago</div>
                        </div>
                      </div>
                      <Badge variant="outline">Anxiety Support</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      I've been practicing the breathing exercises from the app for a week now, and I'm already noticing
                      a difference in my anxiety levels. Has anyone else found these helpful?
                    </p>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <div className="flex w-full justify-between">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        <span>24</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        <span>12 Comments</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Share2 className="mr-1 h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user2" />
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Mark Smith</div>
                          <div className="text-xs text-muted-foreground">Posted yesterday</div>
                        </div>
                      </div>
                      <Badge variant="outline">Sleep Tips</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      After struggling with insomnia for months, I finally established a bedtime routine that works. I
                      turn off all screens an hour before bed, do 10 minutes of light stretching, and use the sleep
                      meditation from the app. My sleep quality has improved dramatically!
                    </p>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <div className="flex w-full justify-between">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        <span>42</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        <span>8 Comments</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Share2 className="mr-1 h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="groups" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Anxiety Support</CardTitle>
                        <Badge>1.2k members</Badge>
                      </div>
                      <CardDescription>Support for managing anxiety and stress</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        A safe space to share experiences and strategies for coping with anxiety.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Mindfulness Practice</CardTitle>
                        <Badge>843 members</Badge>
                      </div>
                      <CardDescription>Daily mindfulness and meditation</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Share your mindfulness journey and learn new techniques from the community.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Sleep Improvement</CardTitle>
                        <Badge>567 members</Badge>
                      </div>
                      <CardDescription>Better sleep for better mental health</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Discuss sleep challenges and share tips for improving sleep quality.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Mood Boosters</CardTitle>
                        <Badge>921 members</Badge>
                      </div>
                      <CardDescription>Positive activities for mental wellness</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Share activities and practices that help improve your mood and outlook.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="events" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Community Events</CardTitle>
                    <CardDescription>Join virtual and in-person events with the community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">Group Meditation Session</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Join our weekly guided meditation session led by certified instructors.
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>Tomorrow, 7:00 PM</span>
                            <Users className="ml-3 mr-1 h-4 w-4" />
                            <span>Virtual</span>
                          </div>
                        </div>
                        <Button size="sm">RSVP</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">Anxiety Management Workshop</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Learn practical techniques for managing anxiety in daily life.
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>May 5, 6:00 PM</span>
                            <Users className="ml-3 mr-1 h-4 w-4" />
                            <span>Virtual</span>
                          </div>
                        </div>
                        <Button size="sm">RSVP</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">Mindful Nature Walk</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Join us for a guided mindful walk in the park to connect with nature.
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>May 7, 10:00 AM</span>
                            <Users className="ml-3 mr-1 h-4 w-4" />
                            <span>In-person (Central Park)</span>
                          </div>
                        </div>
                        <Button size="sm">RSVP</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Anxiety Support
                  <Badge variant="outline" className="ml-auto">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Mindfulness Practice
                  <Badge variant="outline" className="ml-auto">
                    5
                  </Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Sleep Improvement
                  <Badge variant="outline" className="ml-auto">
                    2
                  </Badge>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">#MindfulMonday</span>
                    <Badge variant="outline" className="ml-auto">
                      128 posts
                    </Badge>
                  </div>
                  <Separator />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">#SleepTips</span>
                    <Badge variant="outline" className="ml-auto">
                      96 posts
                    </Badge>
                  </div>
                  <Separator />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">#AnxietyRelief</span>
                    <Badge variant="outline" className="ml-auto">
                      84 posts
                    </Badge>
                  </div>
                  <Separator />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">#SelfCareRoutine</span>
                    <Badge variant="outline" className="ml-auto">
                      72 posts
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Leaders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@therapist1" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Dr. Rebecca Lee</div>
                    <div className="text-xs text-muted-foreground">Therapist & Mindfulness Coach</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@coach1" />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">James Taylor</div>
                    <div className="text-xs text-muted-foreground">Wellness Coach</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@moderator1" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Sarah Parker</div>
                    <div className="text-xs text-muted-foreground">Community Moderator</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

