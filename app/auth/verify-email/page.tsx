"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain, CheckCircle2, Loader2, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyEmail, resendVerification } from "@/lib/auth"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Auto-verify after a delay (simulating clicking a link in email)
    const timer = setTimeout(() => {
      handleVerify()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleVerify = async () => {
    setIsLoading(true)

    try {
      // Simulate email verification
      await verifyEmail()

      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      })

      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please try again or request a new verification link.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)

    try {
      // Simulate resending verification email
      await resendVerification()

      toast({
        title: "Verification email sent",
        description: "A new verification link has been sent to your email.",
      })

      setCountdown(60) // 60 second cooldown
    } catch (error) {
      toast({
        title: "Failed to resend",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>We&apos;ve sent a verification link to your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-center text-sm text-muted-foreground">Verifying your email...</p>
              </div>
            ) : (
              <>
                <div className="rounded-full bg-primary/10 p-4">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium">Check your inbox</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                    Click the link in the email we sent you to verify your account
                  </p>
                </div>
                <div className="flex flex-col space-y-2 pt-4 w-full">
                  <Button onClick={handleVerify} className="w-full">
                    I&apos;ve verified my email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleResend}
                    disabled={resendLoading || countdown > 0}
                    className="w-full"
                  >
                    {resendLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Resending...
                      </>
                    ) : countdown > 0 ? (
                      `Resend email (${countdown}s)`
                    ) : (
                      "Resend verification email"
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <Link href="/auth/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

