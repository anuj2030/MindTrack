"use client"

import { useState } from "react"
import { Brain, HeartPulse, Lightbulb, RefreshCw, Timer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Assessment questions for anxiety screening
const anxietyQuestions = [
  {
    id: "q1",
    question: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: "q2",
    question: "Over the last 2 weeks, how often have you been unable to stop or control worrying?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: "q3",
    question: "Over the last 2 weeks, how often have you had trouble relaxing?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
]

// Breathing exercise instructions
const breathingSteps = [
  "Find a comfortable position sitting or lying down",
  "Breathe in slowly through your nose for 4 seconds",
  "Hold your breath for 2 seconds",
  "Exhale slowly through your mouth for 6 seconds",
  "Repeat the cycle",
]

export function TherapyTools() {
  const [activeTab, setActiveTab] = useState("assessment")
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingStep, setBreathingStep] = useState(0)
  const [breathingProgress, setBreathingProgress] = useState(0)
  const [thoughtText, setThoughtText] = useState("")
  const [savedThoughts, setSavedThoughts] = useState<{ id: string; thought: string; reframe: string }[]>([])
  const { toast } = useToast()

  // Calculate assessment score
  const calculateScore = () => {
    return Object.values(assessmentAnswers).reduce((sum, val) => sum + Number(val || "0"), 0)
  }

  // Get assessment result text based on score
  const getAssessmentResult = () => {
    const score = calculateScore()

    if (score <= 4) {
      return {
        level: "Minimal Anxiety",
        description: "Your responses suggest minimal symptoms of anxiety. Continue with self-care practices.",
        color: "bg-green-500",
      }
    } else if (score <= 9) {
      return {
        level: "Mild Anxiety",
        description:
          "Your responses suggest mild symptoms of anxiety. Consider implementing stress reduction techniques.",
        color: "bg-yellow-500",
      }
    } else {
      return {
        level: "Moderate Anxiety",
        description:
          "Your responses suggest moderate symptoms of anxiety. Consider consulting with a healthcare provider.",
        color: "bg-orange-500",
      }
    }
  }

  // Handle assessment submission
  const handleSubmitAssessment = () => {
    if (Object.keys(assessmentAnswers).length < anxietyQuestions.length) {
      toast({
        title: "Incomplete assessment",
        description: "Please answer all questions to get your results.",
        variant: "destructive",
      })
      return
    }

    setShowResults(true)
  }

  // Handle breathing exercise control
  const toggleBreathing = () => {
    if (breathingActive) {
      setBreathingActive(false)
      setBreathingStep(0)
      setBreathingProgress(0)
    } else {
      setBreathingActive(true)
      // Start breathing cycle
      setBreathingStep(0)
      setBreathingProgress(0)

      // Set up interval to simulate breathing cycle
      const interval = setInterval(() => {
        setBreathingProgress((prev) => {
          // Progress from 0 to 100
          if (prev >= 100) {
            // Move to next breathing step
            setBreathingStep((step) => (step === 2 ? 0 : step + 1))
            return 0
          }
          return prev + 5
        })
      }, 200)

      // Clean up interval on component unmount
      return () => clearInterval(interval)
    }
  }

  // Handle thought reframing
  const handleSaveThought = () => {
    if (!thoughtText.trim()) {
      toast({
        title: "Empty thought",
        description: "Please enter a thought to reframe.",
        variant: "destructive",
      })
      return
    }

    // Generate a simple reframe
    const reframeOptions = [
      "Consider whether this thought is based on facts or feelings.",
      "Is there another perspective you might not be seeing?",
      "How would you advise a friend with this same thought?",
      "What evidence contradicts this thought?",
      "What's a more balanced way to view this situation?",
    ]

    const randomReframe = reframeOptions[Math.floor(Math.random() * reframeOptions.length)]

    setSavedThoughts([
      {
        id: Date.now().toString(),
        thought: thoughtText,
        reframe: randomReframe,
      },
      ...savedThoughts,
    ])

    setThoughtText("")

    toast({
      title: "Thought saved",
      description: "Your thought has been saved and reframed.",
    })
  }

  // Reset the assessment
  const resetAssessment = () => {
    setAssessmentAnswers({})
    setShowResults(false)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="assessment">
          <Brain className="mr-2 h-4 w-4" />
          Assessment
        </TabsTrigger>
        <TabsTrigger value="breathing">
          <HeartPulse className="mr-2 h-4 w-4" />
          Breathing
        </TabsTrigger>
        <TabsTrigger value="thoughts">
          <Lightbulb className="mr-2 h-4 w-4" />
          Thought Reframing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="assessment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Anxiety Assessment</CardTitle>
            <CardDescription>
              Complete this brief screening to assess your anxiety levels. This is not a diagnostic tool but can help
              identify patterns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <div className="space-y-6">
                {anxietyQuestions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <h3 className="font-medium">{q.question}</h3>
                    <RadioGroup
                      value={assessmentAnswers[q.id] || ""}
                      onValueChange={(value) => setAssessmentAnswers({ ...assessmentAnswers, [q.id]: value })}
                    >
                      {q.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                          <Label htmlFor={`${q.id}-${option.value}`}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg border p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">Your Score: {calculateScore()}/9</h3>
                      <Badge className={`${getAssessmentResult().color} text-white`}>
                        {getAssessmentResult().level}
                      </Badge>
                    </div>
                    <Progress value={(calculateScore() / 9) * 100} className="h-2" />
                    <p className="text-muted-foreground pt-2">{getAssessmentResult().description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Recommendations:</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Try Breathing Exercises</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Deep breathing can help reduce anxiety symptoms in the moment.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setActiveTab("breathing")}
                        >
                          Start Exercise
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Reframe Thoughts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Challenge negative thought patterns with cognitive techniques.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("thoughts")}>
                          Try Reframing
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {showResults ? (
              <Button variant="outline" onClick={resetAssessment}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Take Again
              </Button>
            ) : (
              <Button onClick={handleSubmitAssessment}>Get Results</Button>
            )}
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="breathing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Breathing Exercise</CardTitle>
            <CardDescription>
              Practice this 4-2-6 breathing technique to help reduce anxiety and promote relaxation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-8 py-6">
              <div
                className={`relative flex h-60 w-60 items-center justify-center rounded-full transition-all ${
                  breathingActive ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute inset-4 rounded-full bg-primary/20 transition-all ${
                    breathingStep === 0 ? "animate-pulse scale-90" : breathingStep === 1 ? "scale-100" : "scale-75"
                  }`}
                />
                <div className="z-10 text-center">
                  <div className="text-3xl font-bold">
                    {breathingStep === 0 ? "Inhale" : breathingStep === 1 ? "Hold" : "Exhale"}
                  </div>
                  <div className="text-muted-foreground">
                    {breathingStep === 0 ? "4 seconds" : breathingStep === 1 ? "2 seconds" : "6 seconds"}
                  </div>
                </div>
              </div>

              <div className="space-y-2 w-full max-w-md">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((breathingProgress / 100) * 100)}%</span>
                </div>
                <Progress value={breathingProgress} className="h-2" />
              </div>

              <Button onClick={toggleBreathing} className="mt-6">
                {breathingActive ? (
                  <>
                    <Timer className="mr-2 h-4 w-4" />
                    Stop Exercise
                  </>
                ) : (
                  <>
                    <Timer className="mr-2 h-4 w-4" />
                    Start Exercise
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 rounded-lg border p-4">
              <h3 className="font-medium mb-2">How to Practice:</h3>
              <ol className="space-y-2 pl-5 list-decimal">
                {breathingSteps.map((step, index) => (
                  <li key={index} className="text-sm">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="thoughts" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thought Reframing</CardTitle>
            <CardDescription>
              Challenge negative thought patterns by identifying and reframing them in a more balanced way.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thought">Write Down Your Thought</Label>
                <Textarea
                  id="thought"
                  placeholder="I'm worried about my presentation tomorrow..."
                  value={thoughtText}
                  onChange={(e) => setThoughtText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={handleSaveThought}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Reframing Suggestions
              </Button>

              <div className="mt-8">
                <h3 className="font-medium mb-3">Your Reframed Thoughts</h3>
                {savedThoughts.length > 0 ? (
                  <div className="space-y-4">
                    {savedThoughts.map((item) => (
                      <Card key={item.id}>
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-sm font-medium">Original Thought</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 pb-2">
                          <p className="text-sm">{item.thought}</p>
                        </CardContent>
                        <CardHeader className="p-4 pb-2 border-t">
                          <CardTitle className="text-sm font-medium">Reframing Suggestion</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">{item.reframe}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg">
                    <p>No reframed thoughts yet</p>
                    <p className="text-sm">Enter a thought above to get started</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

