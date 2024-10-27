'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup } from '@/components/ui/select'

const topics = ["Technology", "Health", "Sports", "Entertainment", "Business", "Other"]
const tones = ["Conversational", "Professional", "Informative", "Enthusiastic", "Persuasive", "Authoritative"]
const frequencies = ["Daily", "Weekly", "Bi-weekly", "Monthly"]

export default function Survey() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({
    topics: [],
    frequency: '',
  })
  const [customTopic, setCustomTopic] = useState('')
  const [specificSports, setSpecificSports] = useState('')
  const questionRefs = useRef([])
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentQuestion(Number(entry.target.dataset.question))
          }
        })
      },
      { threshold: 0.5 }
    )

    questionRefs.current.forEach((ref) => observer.observe(ref))

    return () => observer.disconnect()
  }, [])

  const handleAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleTopicSelect = (topic) => {
    setAnswers((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Survey answers:', answers)
    router.push('/newsletter')
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-24">
        {/* Question 1: Multiple Select for Topics */}
        <div
          ref={(el) => (questionRefs.current[0] = el)}
          data-question={0}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <Label className="text-xl font-semibold mb-4">
            What topics are you interested in?
          </Label>
          <div className="flex flex-wrap gap-4 mt-4">
            {topics.map((topic) => (
              <Button
                key={topic}
                type="button"
                variant={answers.topics.includes(topic) ? 'default' : 'outline'}
                onClick={() => handleTopicSelect(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
          {answers.topics.includes("Sports") && (
            <Input
              placeholder="Specify a sport (e.g., Basketball)"
              value={specificSports}
              onChange={(e) => setSpecificSports(e.target.value)}
              className="mt-4"
            />
          )}
          {answers.topics.includes("Other") && (
            <Input
              placeholder="Enter another topic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="mt-4"
            />
          )}
        </div>

        {/* Question 2: Dropdown for Tone Preferences */}
        <div
          ref={(el) => (questionRefs.current[1] = el)}
          data-question={1}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <Label className="text-xl font-semibold mb-4">
            What tone preferences do you want your newsletter to be in?
          </Label>
          <Select
            value={answers.tone || ''}
            onValueChange={(value) => handleAnswer('tone', value)}
          >
            <SelectTrigger className="mt-4">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {tones.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Question 3: Dropdown for Newsletter Frequency */}
        <div
          ref={(el) => (questionRefs.current[2] = el)}
          data-question={2}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <Label className="text-xl font-semibold mb-4">
            How often do you want to receive your newsletter?
          </Label>
          <Select
            value={answers.frequency || ''}
            onValueChange={(value) => handleAnswer('frequency', value)}
          >
            <SelectTrigger className="mt-4">
              <SelectValue placeholder="Select a frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {frequencies.map((freq) => (
                  <SelectItem key={freq} value={freq}>
                    {freq}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Submit Survey
        </Button>
      </div>
    </form>
  )
}
