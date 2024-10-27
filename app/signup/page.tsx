'use client'

import AuthForm from '@/components/auth-form'

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Sign Up</h1>
        <p className="text-white mt-2">Create an account to get started.</p>
      </div>
      <AuthForm mode="signup" />
    </div>
  )
}