"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Save, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type JournalEntryType = {
  id: string
  title: string
  content: string
  date: Date
  mood: string
}

// Sample journal entries
const sampleEntries: JournalEntryType[] = [
  {
    id: "1",
    title: "Morning Reflection",
    content:
      "Today I woke up feeling refreshed after a good night's sleep. I'm looking forward to my meditation session later today.",
    date: new Date(2025, 2, 20),
    mood: "happy",
  },
  {
    id: "2",
    title: "Work Stress",
    content:
      "Had a challenging day at work with tight deadlines. Taking deep breaths and planning to do some mindfulness exercises tonight.",
    date: new Date(2025, 2, 19),
    mood: "stressed",
  },
  {
    id: "3",
    title: "Weekend Plans",
    content: "Excited about hiking this weekend. Nature always helps clear my mind and reduce anxiety.",
    date: new Date(2025, 2, 18),
    mood: "excited",
  },
]

export function JournalEntry() {
  const [date, setDate] = useState<Date>(new Date())
  const [entries, setEntries] = useState<JournalEntryType[]>(sampleEntries)
  const [activeEntry, setActiveEntry] = useState<JournalEntryType | null>(null)
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutral",
  })
  const { toast } = useToast()

  const moodOptions = [
    { value: "happy", label: "Happy 😊" },
    { value: "sad", label: "Sad 😔" },
    { value: "anxious", label: "Anxious 😰" },
    { value: "stressed", label: "Stressed 😩" },
    { value: "neutral", label: "Neutral 😐" },
    { value: "excited", label: "Excited 🤩" },
  ]

  const handleSaveEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your journal entry.",
        variant: "destructive",
      })
      return
    }

    const updatedEntries = [...entries]

    if (activeEntry) {
      // Update existing entry
      const index = updatedEntries.findIndex((entry) => entry.id === activeEntry.id)
      if (index !== -1) {
        updatedEntries[index] = {
          ...activeEntry,
          title: newEntry.title,
          content: newEntry.content,
          mood: newEntry.mood,
        }
      }
    } else {
      // Create new entry
      updatedEntries.unshift({
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        date: date,
        mood: newEntry.mood,
      })
    }

    setEntries(updatedEntries)
    setActiveEntry(null)
    setNewEntry({
      title: "",
      content: "",
      mood: "neutral",
    })

    toast({
      title: activeEntry ? "Entry updated" : "Entry saved",
      description: activeEntry
        ? "Your journal entry has been updated successfully."
        : "Your journal entry has been saved successfully.",
    })
  }

  const handleEditEntry = (entry: JournalEntryType) => {
    setActiveEntry(entry)
    setNewEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
    })
    setDate(entry.date)
  }

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id)
    setEntries(updatedEntries)

    if (activeEntry && activeEntry.id === id) {
      setActiveEntry(null)
      setNewEntry({
        title: "",
        content: "",
        mood: "neutral",
      })
    }

    toast({
      title: "Entry deleted",
      description: "Your journal entry has been deleted.",
    })
  }

  const handleCancelEdit = () => {
    setActiveEntry(null)
    setNewEntry({
      title: "",
      content: "",
      mood: "neutral",
    })
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{activeEntry ? "Edit Journal Entry" : "New Journal Entry"}</CardTitle>
            <CardDescription>
              {activeEntry ? "Update your thoughts and feelings" : "Write down your thoughts and track your mood"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your entry"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Mood</Label>
                <Select value={newEntry.mood} onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood.value} value={mood.value}>
                        {mood.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Journal Entry</Label>
              <Textarea
                id="content"
                placeholder="How are you feeling today? What's on your mind?"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="min-h-[200px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              {activeEntry && (
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
              <Button onClick={handleSaveEntry}>
                <Save className="mr-2 h-4 w-4" />
                {activeEntry ? "Update Entry" : "Save Entry"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your journal history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <Card key={entry.id} className="cursor-pointer hover:bg-muted/50">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{entry.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteEntry(entry.id)
                          }}
                        >
                          <Trash className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                      <CardDescription>
                        {format(entry.date, "MMM d, yyyy")} •{" "}
                        {moodOptions.find((m) => m.value === entry.mood)?.label || entry.mood}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm line-clamp-2">{entry.content}</p>
                      <Button variant="link" className="mt-2 h-auto p-0 text-xs" onClick={() => handleEditEntry(entry)}>
                        Edit entry
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No journal entries yet</p>
                  <p className="text-sm">Start writing to track your thoughts and feelings</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

