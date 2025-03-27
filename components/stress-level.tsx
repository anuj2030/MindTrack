"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Simplified stress level component without charts
export function StressLevel() {
  const [weeklyData] = useState([
    { day: "Mon", stress: 65, heartRate: 75, steps: 5200 },
    { day: "Tue", stress: 72, heartRate: 78, steps: 4800 },
    { day: "Wed", stress: 55, heartRate: 72, steps: 8300 },
    { day: "Thu", stress: 80, heartRate: 82, steps: 3900 },
    { day: "Fri", stress: 60, heartRate: 74, steps: 7500 },
    { day: "Sat", stress: 45, heartRate: 70, steps: 9200 },
    { day: "Sun", stress: 50, heartRate: 71, steps: 8700 },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Stress Overview</CardTitle>
        <CardDescription>Your stress levels correlated with physical activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyData.map((day) => (
            <div key={day.day} className="flex items-center justify-between border-b pb-2">
              <div className="font-medium">{day.day}</div>
              <div className="flex space-x-6">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Stress</span>
                  <span className={`text-sm font-medium ${day.stress > 70 ? "text-red-500" : "text-green-500"}`}>
                    {day.stress}%
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Heart Rate</span>
                  <span className="text-sm font-medium">{day.heartRate} bpm</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">Steps</span>
                  <span className="text-sm font-medium">{day.steps.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-muted p-4">
          <h4 className="font-medium">Insights</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Your stress levels tend to be lower on days with higher physical activity. Consider increasing your daily
            steps to help manage stress.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

