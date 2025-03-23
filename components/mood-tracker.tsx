"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save, TrendingUp } from "lucide-react"

export function MoodTracker() {
  const [moodValue, setMoodValue] = useState(7)
  const [energyValue, setEnergyValue] = useState(6)
  const [anxietyValue, setAnxietyValue] = useState(3)
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [activeTab, setActiveTab] = useState("log")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const moodEmoji = () => {
    if (moodValue >= 8) return "😊"
    if (moodValue >= 6) return "🙂"
    if (moodValue >= 4) return "😐"
    if (moodValue >= 2) return "🙁"
    return "😔"
  }

  const energyEmoji = () => {
    if (energyValue >= 8) return "⚡"
    if (energyValue >= 6) return "🔋"
    if (energyValue >= 4) return "📊"
    if (energyValue >= 2) return "🪫"
    return "😴"
  }

  const anxietyEmoji = () => {
    if (anxietyValue >= 8) return "😰"
    if (anxietyValue >= 6) return "😬"
    if (anxietyValue >= 4) return "😟"
    if (anxietyValue >= 2) return "😌"
    return "😌"
  }

  const triggers = [
    "Work Stress",
    "Family",
    "Finances",
    "Health",
    "Relationships",
    "Social Media",
    "News",
    "Poor Sleep",
  ]

  const handleTriggerToggle = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter((t) => t !== trigger))
    } else {
      setSelectedTriggers([...selectedTriggers, trigger])
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Mood logged successfully",
        description: "Your mood entry has been saved",
      })

      // Reset form (in a real app, you might want to keep the values)
      setNotes("")
      setSelectedTriggers([])
    }, 1000)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="log">
          <Save className="mr-2 h-4 w-4" />
          Log Mood
        </TabsTrigger>
        <TabsTrigger value="insights">
          <TrendingUp className="mr-2 h-4 w-4" />
          Insights
        </TabsTrigger>
      </TabsList>

      <TabsContent value="log" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Mood {moodEmoji()}</Label>
                <span className="text-sm font-medium">{moodValue}/10</span>
              </div>
              <Slider value={[moodValue]} min={1} max={10} step={1} onValueChange={(value) => setMoodValue(value[0])} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Very Low</span>
                <span>Very High</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Energy {energyEmoji()}</Label>
                <span className="text-sm font-medium">{energyValue}/10</span>
              </div>
              <Slider
                value={[energyValue]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setEnergyValue(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Exhausted</span>
                <span>Energized</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Anxiety {anxietyEmoji()}</Label>
                <span className="text-sm font-medium">{anxietyValue}/10</span>
              </div>
              <Slider
                value={[anxietyValue]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setAnxietyValue(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Calm</span>
                <span>Anxious</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>What triggered your mood today?</Label>
              <div className="flex flex-wrap gap-2">
                {triggers.map((trigger) => (
                  <Button
                    key={trigger}
                    variant={selectedTriggers.includes(trigger) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTriggerToggle(trigger)}
                  >
                    {trigger}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional thoughts or feelings..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Mood Entry"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="insights" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Mood Patterns</CardTitle>
            <CardDescription>Your mood trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Mood Patterns</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your mood tends to be highest on weekends, with Saturday showing the peak mood score of 9/10.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Sleep Correlation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  There's a strong correlation between your sleep and mood. Days with 7+ hours of sleep show 23% higher
                  mood scores.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Activity Impact</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  On days when you take more than 8,000 steps, your mood score averages 8.5/10 compared to 5.5/10 on
                  less active days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

