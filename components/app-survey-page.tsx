'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react'

const topics = ['Technology', 'Health', 'Sports', 'Entertainment', 'Business', 'Other']
const tones = ['Conversational', 'Professional', 'Informative', 'Enthusiastic', 'Formal', 'Authoritative']
const frequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly']

export function Page() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [tone, setTone] = useState('')
  const [frequency, setFrequency] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ selectedTopics, tone, frequency, email })
    router.push('/newsletter')
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Label className="text-xl font-semibold mb-4 block">What topics are you interested in?</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            {topics.map(topic => (
              <Button
                key={topic}
                type="button"
                variant={selectedTopics.includes(topic) ? 'default' : 'outline'}
                onClick={() => handleTopicToggle(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
          {selectedTopics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTopics.map(topic => (
                <div key={topic} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                  {topic}
                  <button
                    type="button"
                    onClick={() => handleTopicToggle(topic)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <Label className="text-xl font-semibold mb-4 block">
            What tone preferences do you want your newsletter to be in?
          </Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <Label className="text-xl font-semibold mb-4 block">
            How often do you want to receive your newsletter?
          </Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a frequency" />
            </SelectTrigger>
            <SelectContent>
              {frequencies.map(f => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <Label htmlFor="email" className="text-xl font-semibold mb-4 block">
            What's your email address?
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <Button type="submit" className="w-full">Submit Survey</Button>
      </div>
    </form>
  )
}