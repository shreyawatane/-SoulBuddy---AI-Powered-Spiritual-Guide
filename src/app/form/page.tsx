'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from 'lucide-react'

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    birthtime: '',
    birthplace: '',
    readingType: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, readingType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryString = new URLSearchParams(formData).toString()
    router.push(`/insights?${queryString}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Star className="h-6 w-6 mr-2" />
          <span className="font-bold">Zen Sphere</span>
        </Link>
      </header>
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your gateway to tranquility.</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="birthdate">Birth Date</Label>
            <Input id="birthdate" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="birthtime">Birth Time (if known)</Label>
            <Input id="birthtime" name="birthtime" type="time" value={formData.birthtime} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="birthplace">Birth Place</Label>
            <Input id="birthplace" name="birthplace" value={formData.birthplace} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="readingType">Type of Reading</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reading type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Doshas in your life">Doshas in your life</SelectItem>
                <SelectItem value="astrology">Astrology(coming soon)</SelectItem>
                <SelectItem value="numerology">Numerology(coming soon)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
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

