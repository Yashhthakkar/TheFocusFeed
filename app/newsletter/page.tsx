'use client'

import { useState } from 'react'
import Groq from "groq-sdk";


export default function Newsletter() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Today's Newsletter</h1>
        {selectedDate && (
          <p className="mt-4 text-center">
            You've selected: {selectedDate.toDateString()}
          </p>
        )}
      </div>
    </div>
  )
}