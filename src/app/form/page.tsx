'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star } from 'lucide-react'
import axios from 'axios';
import { useChartContext } from '@/context/ChartContext'

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    birthtime: '',
    birthplace: '',
    latitude: '',
    longitude: ''
  })
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter()
  const { setChartData, setUserData, setAnalysisData } = useChartContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handlePlaceSelect = (place: any) => {
    setFormData(prevState => ({
      ...prevState,
      birthplace: place.properties.formatted,
      latitude: place.properties.lat,
      longitude: place.properties.lon
    }))
    setSuggestions([])
  }

  const handleAutocomplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prevState => ({ ...prevState, birthplace: value }))
    if (value.length > 2) {
      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=d8ae1525aa3943f8a19e3ad8eb97f2ff`)
        .then(response => response.json())
        .then(result => setSuggestions(result.features))
        .catch(error => console.log('error', error))
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const kundaliData = {
      name: formData.name,
      dob: formData.birthdate,
      time: formData.birthtime || '12:00',
      gender: 'Male',
      city: formData.birthplace,
      latitude: formData.latitude,
      longitude: formData.longitude,
      timezone_offset: 5.5
    };

    try {
      const response = await axios.post('/api/kundali', kundaliData);
      
      if (response.data.status === "success") {
        setChartData(response.data.kundali);
        setUserData(formData);
        setAnalysisData(response.data.remedies);
        router.push('/insights');
      } else {
        setError('Failed to generate chart');
      }
    } catch (err) {
      setError('Error generating chart. Please try again.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div>
          <Label htmlFor="name">Name</Label>
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
            <Input id="birthplace" name="birthplace" value={formData.birthplace} onChange={handleAutocomplete} required />
            {suggestions.length > 0 && (
              <ul className="border border-gray-300 mt-2 rounded-md">
                {suggestions.map((suggestion: any) => (
                  <li
                    key={suggestion.properties.place_id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handlePlaceSelect(suggestion)}
                  >
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Submit'}
          </Button>
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

