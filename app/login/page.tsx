'use client'

import AuthForm from '@/components/components-auth-form'

export default function Login() {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <AuthForm mode="login" />
    </div>
  )
}