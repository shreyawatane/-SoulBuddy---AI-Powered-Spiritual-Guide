'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Star, Sun, Moon, Hash } from 'lucide-react'

interface UserData {
  name: string
  birthdate: string
  birthtime: string
  birthplace: string
  readingType: string
}

export default function InsightsPage() {
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const data: UserData = {
      name: searchParams.get('name') || '',
      birthdate: searchParams.get('birthdate') || '',
      birthtime: searchParams.get('birthtime') || '',
      birthplace: searchParams.get('birthplace') || '',
      readingType: searchParams.get('readingType') || ''
    }
    setUserData(data)
  }, [searchParams])

  // Placeholder functions for calculations
  const calculateZodiacSign = (date: string) => {
    const month = parseInt(date.split('-')[1])
    const day = parseInt(date.split('-')[2])
    // This is a very simplified calculation and should be replaced with a more accurate one
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
    // ... add other zodiac signs
    return 'Unknown'
  }

  const calculateLifePathNumber = (date: string) => {
    const sum = date.split('-').join('').split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    return (sum % 9) || 9 // Life Path numbers are 1-9
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Star className="h-6 w-6 mr-2" />
          <span className="font-bold">Zen Sphere</span>
        </Link>
      </header>
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Personalized Insights</h1>
        <p className="mb-6">Here are some insights based on the information you provided, {userData.name}:</p>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="mr-2" />
                Astrological Insights
              </CardTitle>
              <CardDescription>Based on your birth date and time</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Zodiac Sign:</strong> {calculateZodiacSign(userData.birthdate)}</p>
              <p><strong>Birth Date:</strong> {userData.birthdate}</p>
              <p><strong>Birth Time:</strong> {userData.birthtime || 'Not provided'}</p>
              <p><strong>Birth Place:</strong> {userData.birthplace}</p>
              <p className="mt-4">Your zodiac sign suggests that you are [trait 1], [trait 2], and [trait 3]. You may find success in careers related to [career 1] or [career 2].</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                Numerological Insights
              </CardTitle>
              <CardDescription>Based on your birth date</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Life Path Number:</strong> {calculateLifePathNumber(userData.birthdate)}</p>
              <p className="mt-4">Your Life Path Number indicates that your purpose in life may be related to [life purpose]. You have natural talents in [talent 1] and [talent 2].</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <p className="mb-4">Remember, these insights are just a starting point. For a more detailed and personalized reading, please consult with a professional astrologer or numerologist.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Zen Sphere. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

