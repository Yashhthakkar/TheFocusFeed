'use client'

import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default function Newsletter() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Newsletters</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
          />
        </div>
        {selectedDate && (
          <p className="mt-4 text-center">
            You've selected: {selectedDate.toDateString()}
          </p>
        )}
      </div>
    </div>
  )
}