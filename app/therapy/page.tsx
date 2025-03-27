"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, Calendar, Clock, Download, FileText, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TherapyTools } from "@/components/therapy-tools"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function TherapyPage() {
  const [activeTab, setActiveTab] = useState("tools")

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
          <Button variant="default" asChild>
            <Link href="/therapy">Therapy Tools</Link>
          </Button>
          <Button variant="ghost" asChild>
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
            <h1 className="text-2xl font-semibold">Therapy Tools</h1>
            <p className="text-sm text-muted-foreground">Self-help resources and therapeutic exercises</p>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="tools">Self-Help Tools</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="professionals">Find Professionals</TabsTrigger>
          </TabsList>
          <TabsContent value="tools" className="space-y-4">
            <TherapyTools />
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Anxiety Workbook
                  </CardTitle>
                  <CardDescription>Practical exercises for managing anxiety</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive guide with evidence-based techniques to help reduce anxiety symptoms.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Stress Management Guide
                  </CardTitle>
                  <CardDescription>Techniques for reducing stress</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn effective strategies to manage stress in your daily life and improve well-being.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Sleep Improvement Plan
                  </CardTitle>
                  <CardDescription>Better sleep for better mental health</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A step-by-step guide to improving your sleep quality and establishing healthy sleep habits.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="professionals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Find Mental Health Professionals</CardTitle>
                <CardDescription>Connect with licensed therapists and counselors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Dr. Sarah Johnson</CardTitle>
                        <Badge>Therapist</Badge>
                      </div>
                      <CardDescription>Anxiety, Depression, Stress Management</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        <span>In-person & Virtual</span>
                        <Clock className="ml-3 mr-1 h-4 w-4" />
                        <span>Available this week</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Schedule Consultation</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Dr. Michael Chen</CardTitle>
                        <Badge>Psychologist</Badge>
                      </div>
                      <CardDescription>Cognitive Behavioral Therapy, Trauma</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        <span>Virtual Only</span>
                        <Calendar className="ml-3 mr-1 h-4 w-4" />
                        <span>Next available: May 2</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Schedule Consultation</Button>
                    </CardFooter>
                  </Card>
                </div>
                <Button variant="outline" className="w-full">
                  View All Professionals
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

