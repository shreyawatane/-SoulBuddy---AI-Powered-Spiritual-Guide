'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Star, Sun, Moon, Hash, Sparkles, Compass } from 'lucide-react'
import Image from 'next/image'
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
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'

    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'

    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'

    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'

    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'

    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'

    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'

    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'

    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces'

    return 'Unknown'
  }

  const calculateLifePathNumber = (date: string) => {
    const sum = date.split('-').join('').split('').reduce((acc, digit) => acc + parseInt(digit), 0)
    return (sum % 9) || 9 // Life Path numbers are 1-9
  }

  const getZodiacElement = (sign: string) => {

    const fireSign = ['Aries', 'Leo', 'Sagittarius']

    const earthSigns = ['Taurus', 'Virgo', 'Capricorn']

    const airSigns = ['Gemini', 'Libra', 'Aquarius']

    const waterSigns = ['Cancer', 'Scorpio', 'Pisces']



    if (fireSign.includes(sign)) return 'Fire'

    if (earthSigns.includes(sign)) return 'Earth'

    if (airSigns.includes(sign)) return 'Air'

    if (waterSigns.includes(sign)) return 'Water'

    return 'Unknown'

  }



  const getMoonPhase = (birthdate: string) => {

    // This is a simplified calculation and should be replaced with a more accurate one

    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']

    const dayOfMonth = parseInt(birthdate.split('-')[2])

    return phases[dayOfMonth % 8]

  }



  if (!userData) {
    return <div>Loading...</div>
  }

  const zodiacSign = calculateZodiacSign(userData.birthdate)

  const element = getZodiacElement(zodiacSign)

  const lifePathNumber = calculateLifePathNumber(userData.birthdate)

  const moonPhase = getMoonPhase(userData.birthdate)

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



        <div className="flex flex-col min-h-screen">
          <div className="flex-1 container max-w-4xl mx-auto px-4 py-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sun className="mr-2" />
                    Zodiac Sign
                  </CardTitle>
                  <CardDescription>Based on your birth date</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Image src={`https://placehold.co/100x100/red/white/png&text=${zodiacSign}`} alt={zodiacSign} width={100} height={100} className="mb-4" />
                  <p><strong>Your Sign:</strong> {zodiacSign}</p>
                  <p><strong>Element:</strong> {element}</p>
                  <p className="mt-4 text-center">As a {zodiacSign}, you are known for being [trait 1], [trait 2], and [trait 3]. Your element, {element}, influences your personality by [element influence].</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Hash className="mr-2" />
                    Life Path Number
                  </CardTitle>
                  <CardDescription>Based on your birth date</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold mb-4">
                    {lifePathNumber}
                  </div>
                  <p><strong>Your Life Path Number:</strong> {lifePathNumber}</p>
                  <p className="mt-4 text-center">Life Path {lifePathNumber} indicates that your purpose in life may be related to [life purpose]. You have natural talents in [talent 1] and [talent 2].</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Moon className="mr-2" />
                    Moon Phase
                  </CardTitle>
                  <CardDescription>Based on your birth date</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Image src={`/placeholder.svg?height=100&width=100&text=${moonPhase}`} alt={moonPhase} width={100} height={100} className="mb-4" />
                  <p><strong>Moon Phase at Birth:</strong> {moonPhase}</p>
                  <p className="mt-4 text-center">The {moonPhase} at your birth suggests that you may have a natural inclination towards [moon phase trait 1] and [moon phase trait 2].</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Compass className="mr-2" />
                    Astrological Houses
                  </CardTitle>
                  <CardDescription>Based on your birth time and place</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Ascendant:</strong> [Ascendant Sign]</p>
                  <p><strong>Midheaven:</strong> [Midheaven Sign]</p>
                  <p className="mt-4">Your Ascendant in [Ascendant Sign] influences how others perceive you, while your Midheaven in [Midheaven Sign] relates to your career and public image.</p>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2" />
                  Personal Year
                </CardTitle>
                <CardDescription>Based on your birth date and the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <p><strong>Your Personal Year Number:</strong> [Personal Year Number]</p>
                <p className="mt-4">In this personal year, you may experience [personal year insight 1]. It's a good time to focus on [personal year advice].</p>
              </CardContent>
            </Card>
          </div>
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

