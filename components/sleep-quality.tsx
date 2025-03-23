"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Moon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function SleepQuality() {
  const [viewOption, setViewOption] = useState("week")
  const [date, setDate] = useState<Date>(new Date())
  const [enableBedtimeReminders, setEnableBedtimeReminders] = useState(true)
  const [activeBedtime, setActiveBedtime] = useState("10:30 PM")
  const [activeWakeUp, setActiveWakeUp] = useState("6:30 AM")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sleep Analysis</h2>
          <p className="text-muted-foreground">Track and improve your sleep patterns</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("justify-start text-left font-normal w-[240px]", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
          <Select value={viewOption} onValueChange={setViewOption}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sleep Summary</CardTitle>
            <CardDescription>Your sleep data for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 7 }).map((_, i) => {
                const day = new Date()
                day.setDate(day.getDate() - i)
                const hours = 5 + Math.random() * 3
                return (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div className="font-medium">{format(day, "EEE, MMM d")}</div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{hours.toFixed(1)} hrs</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sleep Summary</CardTitle>
            <CardDescription>Average metrics for the {viewOption}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Sleep Duration</h3>
                <Badge className="font-normal" variant={viewOption === "day" ? "default" : "outline"}>
                  {viewOption === "day" ? "Today" : viewOption === "week" ? "Weekly" : "Monthly"}
                </Badge>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="text-3xl font-bold">7.2h</div>
                <div className="text-sm text-muted-foreground">Target: 8h</div>
              </div>
              <div className="text-xs text-emerald-500">+12% from last {viewOption}</div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Sleep Efficiency</div>
                  <div className="text-xl font-semibold">84%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Heart Rate</div>
                  <div className="text-xl font-semibold">62 bpm</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Deep Sleep</div>
                  <div className="text-xl font-semibold">1.2h</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">REM Sleep</div>
                  <div className="text-xl font-semibold">1.5h</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="schedule">Sleep Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="insights" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Sleep Consistency</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your sleep schedule is relatively consistent. You typically go to bed between 10:15 PM and 11:00 PM,
                  and wake up between 6:30 AM and 7:00 AM.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Sleep Quality</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your sleep quality is good, with an average sleep efficiency of 84%. Your deep sleep percentage (17%)
                  is within the healthy range.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Areas for Improvement</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You could benefit from slightly more sleep. Your average of 7.2 hours is below your target of 8 hours.
                  Consider going to bed 30-45 minutes earlier.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Schedule</CardTitle>
              <CardDescription>Set your ideal bedtime and wake-up time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="bedtime-reminders">Bedtime Reminders</Label>
                  <Switch
                    id="bedtime-reminders"
                    checked={enableBedtimeReminders}
                    onCheckedChange={setEnableBedtimeReminders}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when it's time to prepare for sleep
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Bedtime</Label>
                    <Select value={activeBedtime} onValueChange={setActiveBedtime} disabled={!enableBedtimeReminders}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bedtime" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                        <SelectItem value="9:30 PM">9:30 PM</SelectItem>
                        <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                        <SelectItem value="10:30 PM">10:30 PM</SelectItem>
                        <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Wake Up</Label>
                    <Select value={activeWakeUp} onValueChange={setActiveWakeUp} disabled={!enableBedtimeReminders}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select wake up time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5:00 AM">5:00 AM</SelectItem>
                        <SelectItem value="5:30 AM">5:30 AM</SelectItem>
                        <SelectItem value="6:00 AM">6:00 AM</SelectItem>
                        <SelectItem value="6:30 AM">6:30 AM</SelectItem>
                        <SelectItem value="7:00 AM">7:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

