import AuthForm from '@/components/auth-form'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Log In</h1>
      <AuthForm mode="login" />
    </div>
  )
}