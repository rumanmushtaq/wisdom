"use client"

import type React from "react"

import { useState, useContext, createContext, useEffect } from "react"

interface User {
  id: string
  email: string
  username: string
  balance: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // TODO: Check if user is already logged in (from session/JWT)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error("Login failed")
      }

      const data = await res.json()
      setUser(data.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const signup = async (username: string, email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })

      if (!res.ok) {
        throw new Error("Signup failed")
      }

      const data = await res.json()
      setUser(data.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    // TODO: Clear session/JWT
  }

  return <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>{children}</AuthContext.Provider>
}
