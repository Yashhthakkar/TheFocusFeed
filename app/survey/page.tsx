'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { db, auth } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react'

const topics = ['Technology', 'Health', 'Sports', 'Entertainment', 'Business', 'Other']
const tones = ['Conversational', 'Professional', 'Informative', 'Enthusiastic', 'Formal', 'Authoritative']
const frequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly']

export default function Survey() {
  const [selectedTopics, setSelectedTopics] = useState<{ [key: string]: string | true }>({})
  const [tone, setTone] = useState('')
  const [frequency, setFrequency] = useState('')
  const [email, setEmail] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.hasOwnProperty(topic)) {
      const newTopics = { ...selectedTopics }
      delete newTopics[topic]
      setSelectedTopics(newTopics)

      if (additionalInfo.hasOwnProperty(topic)) {
        const newAdditionalInfo = { ...additionalInfo }
        delete newAdditionalInfo[topic]
        setAdditionalInfo(newAdditionalInfo)
      }
    } else {
      setSelectedTopics(prev => ({ ...prev, [topic]: true }))
      if (topic === 'Sports' || topic === 'Business') {
        setAdditionalInfo(prev => ({ ...prev, [topic]: '' }))
      }
    }
  }

  const handleAdditionalInfoChange = (topic: string, value: string) => {
    setAdditionalInfo(prev => ({ ...prev, [topic]: value }))
    setSelectedTopics(prev => ({ ...prev, [topic]: value || true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to submit the survey.");
      return;
    }
  
    const topicsToSave = Object.entries(selectedTopics).map(([topic, value]) => (value !== true ? value : topic));
  
    const surveyData = {
      topics: topicsToSave,
      tone,
      frequency,
    };
  
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        survey: surveyData,
        createdAt: serverTimestamp()
      }, { merge: true });
      alert("Survey submitted successfully!");
      router.push('/newsletter');
    } catch (err) {
      console.error("Error saving survey data:", err);
      alert("There was an error submitting your survey. Please try again.");
    }
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
                variant={selectedTopics.hasOwnProperty(topic) ? 'red' : 'outline'}
                onClick={() => handleTopicToggle(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
          {selectedTopics.hasOwnProperty('Sports') && (
            <Input
              placeholder="Please specify (e.g., Basketball)"
              value={additionalInfo['Sports'] || ''}
              onChange={(e) => handleAdditionalInfoChange('Sports', e.target.value)}
              className="mt-2 mb-4"
            />
          )}
          {selectedTopics.hasOwnProperty('Business') && (
            <Input
              placeholder="Please specify (e.g., Finance)"
              value={additionalInfo['Business'] || ''}
              onChange={(e) => handleAdditionalInfoChange('Business', e.target.value)}
              className="mt-2 mb-4"
            />
          )}
          {Object.keys(selectedTopics).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(selectedTopics).map(([topic, detail]) => (
                <div key={topic} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                  {detail !== true ? `${topic}: ${detail}` : topic}
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
        <Button type="submit" className="w-full">Submit Survey</Button>
      </div>
    </form>
  )
}
