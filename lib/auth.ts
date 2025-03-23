// Simulated authentication functions

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulate login
export async function loginUser(email: string, password: string): Promise<{ user: any; token: string }> {
  await delay(1500) // Simulate network delay

  // In a real app, this would validate credentials against a database
  if (email && password) {
    // Store auth state in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "mindtrack_user",
        JSON.stringify({
          email,
          name: email.split("@")[0],
          isAuthenticated: true,
        }),
      )
    }

    return {
      user: {
        id: "1",
        email,
        name: email.split("@")[0],
      },
      token: "simulated-jwt-token",
    }
  }

  throw new Error("Invalid credentials")
}

// Simulate registration
export async function registerUser(name: string, email: string, password: string): Promise<{ user: any }> {
  await delay(2000) // Simulate network delay

  // In a real app, this would create a new user in the database
  if (name && email && password) {
    return {
      user: {
        id: "1",
        email,
        name,
        verified: false,
      },
    }
  }

  throw new Error("Registration failed")
}

// Simulate password reset request
export async function resetPassword(email: string): Promise<void> {
  await delay(1500) // Simulate network delay

  // In a real app, this would send a reset link to the user's email
  if (!email) {
    throw new Error("Email is required")
  }
}

// Simulate email verification
export async function verifyEmail(): Promise<void> {
  await delay(2000) // Simulate network delay

  // In a real app, this would verify the user's email in the database
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("mindtrack_user") || "{}")
    localStorage.setItem(
      "mindtrack_user",
      JSON.stringify({
        ...user,
        verified: true,
      }),
    )
  }
}

// Simulate resending verification email
export async function resendVerification(): Promise<void> {
  await delay(1000) // Simulate network delay

  // In a real app, this would resend the verification email
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("mindtrack_user") || "{}")
    return !!user.isAuthenticated
  }
  return false
}

// Logout user
export async function logoutUser(): Promise<void> {
  await delay(500) // Simulate network delay

  if (typeof window !== "undefined") {
    localStorage.removeItem("mindtrack_user")
  }
}

