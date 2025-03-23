"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Apple, Brain, Check, EyeIcon, EyeOffIcon, Facebook, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { registerUser } from "@/lib/auth"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name) {
        toast({
          title: "Name required",
          description: "Please enter your name to continue.",
          variant: "destructive",
        })
        return
      }
      if (!formData.email || !validateEmail(formData.email)) {
        toast({
          title: "Valid email required",
          description: "Please enter a valid email address.",
          variant: "destructive",
        })
        return
      }
    }

    if (step === 2) {
      if (!validatePassword(formData.password)) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
        })
        return
      }
    }

    setStep(step + 1)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate backend registration
      await registerUser(formData.name, formData.email, formData.password)

      toast({
        title: "Registration successful",
        description: "Welcome to MindTrack! Please verify your email.",
      })

      // In a real app, this would redirect to a verification page
      setTimeout(() => {
        router.push("/auth/verify-email")
      }, 1500)
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleSocialRegister = (provider: string) => {
    setIsLoading(true)

    // Simulate social registration
    setTimeout(() => {
      toast({
        title: `${provider} registration initiated`,
        description: "Redirecting to authentication provider...",
      })

      // In a real app, this would redirect to the OAuth provider
      setTimeout(() => {
        setIsLoading(false)
        router.push("/auth/verify-email")
      }, 1500)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Join MindTrack to start your mental wellness journey</CardDescription>
          <div className="flex justify-center space-x-2 pt-2">
            <div className={`h-2 w-2 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 w-2 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`h-2 w-2 rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="button" className="w-full" onClick={handleNextStep} disabled={isLoading}>
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">Password must be at least 8 characters long</div>
              </div>
              <Button type="button" className="w-full" onClick={handleNextStep} disabled={isLoading}>
                Continue
              </Button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-primary" />
                    <div className="text-sm font-medium">Account Information</div>
                  </div>
                  <div className="pl-7 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{formData.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          )}

          {step === 1 && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleSocialRegister("Google")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  <span className="sr-only">Google</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialRegister("Apple")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Apple className="h-4 w-4" />
                  <span className="sr-only">Apple</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialRegister("Facebook")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

