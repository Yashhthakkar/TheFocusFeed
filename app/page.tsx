import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-8xl font-bold text-white mb-8">FocusFeed</h1>
      <h2 className="text-2xl font-bold text-white mb-8">Redefining Your Daily News</h2>
      <div className="space-x-4">
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}