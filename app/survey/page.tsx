'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const questions = [
  { id: 1, text: "How satisfied are you with our service?", type: "rating" },
  { id: 2, text: "What features would you like to see in the future?", type: "text" },
  { id: 3, text: "How likely are you to recommend us to a friend?", type: "rating" },
  { id: 4, text: "Any additional comments?", type: "text" },
  { id: 5, text: "Please enter your email for our newsletter:", type: "email" }
]

export default function Survey() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
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

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Survey answers:', answers)
    router.push('/newsletter')
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-24">
        {questions.map((question, index) => (
          <div
            key={question.id}
            ref={(el) => (questionRefs.current[index] = el)}
            data-question={index}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <Label className="text-xl font-semibold mb-4">{question.text}</Label>
            {question.type === 'rating' && (
              <div className="flex justify-between mt-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    type="button"
                    variant={answers[question.id] === rating ? 'default' : 'outline'}
                    onClick={() => handleAnswer(question.id, rating)}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            )}
            {question.type === 'text' && (
              <Textarea
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                className="mt-2"
              />
            )}
            {question.type === 'email' && (
              <Input
                type="email"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                className="mt-2"
                required
              />
            )}
          </div>
        ))}
        <Button type="submit" className="w-full">Submit Survey</Button>
      </div>
    </form>
  )
}