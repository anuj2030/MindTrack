"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Brain, Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JournalEntry } from "@/components/journal-entry"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("entries")
  const [sortBy, setSortBy] = useState("newest")

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
          <Button variant="default" asChild>
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
      </header>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Journal</h1>
            <p className="text-sm text-muted-foreground">Track your thoughts, feelings, and experiences</p>
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
              New Entry
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search journal entries..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="mood">By Mood</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="entries">All Entries</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>
          <TabsContent value="entries" className="space-y-4">
            <JournalEntry />
          </TabsContent>
          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Entries</CardTitle>
                <CardDescription>Journal entries you've marked as favorites</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-muted-foreground">You haven't favorited any entries yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click the star icon on any entry to add it to your favorites
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tags" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Organize your journal entries with tags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {["Gratitude", "Reflection", "Goals", "Anxiety", "Happiness", "Work", "Relationships"].map((tag) => (
                    <Button key={tag} variant="outline" className="justify-start">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      {tag}
                      <span className="ml-auto text-muted-foreground text-xs">3</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

