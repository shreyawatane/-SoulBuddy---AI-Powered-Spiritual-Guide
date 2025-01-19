'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Star, Sun, Moon, Hash } from 'lucide-react'
import KundaliChart from '@/components/KundaliChart'
import { useChartContext } from '@/context/ChartContext'
import { useRouter } from 'next/navigation'

interface UserData {
  name: string
  birthdate: string
  birthtime: string
  birthplace: string
  readingType: string
}

export default function InsightsPage() {
  const { userData, chartData, analysisData } = useChartContext()
  const router = useRouter()

  if (!userData || !chartData) {
    router.push('/form')
    return null
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
		
		<div className="grid gap-6">
		  {/* Dosha and Chart Grid */}
		  <div className="grid gap-6 md:grid-cols-2">
			{/* Dosha Predictions Card */}
			<Card>
			  <CardHeader>
				<CardTitle className="flex items-center">
				  <Sun className="mr-2" />
				  Dosha Predictions
				</CardTitle>
				<CardDescription>Based on your natal chart analysis</CardDescription>
			  </CardHeader>
			  <CardContent>
				<div className="mt-4 p-4 bg-gray-50 rounded-md">
				  <p className="text-gray-800">{analysisData?.primary_analysis || 'No analysis available'}</p>
				</div>
			  </CardContent>
			</Card>

			{/* Chart Card */}
			<Card>
			  <KundaliChart chartData={chartData} />
			</Card>
		  </div>

		  {/* Gemstone Card */}
		  <Card>
			<CardHeader>
			  <CardTitle className="flex items-center">
				<Star className="mr-2" />
				Gemstone Recommendations
			  </CardTitle>
			  <CardDescription>Personalized gemstone suggestions</CardDescription>
			</CardHeader>
			<CardContent>
			  <div className="prose prose-sm max-w-none">
				<div dangerouslySetInnerHTML={{ 
				  __html: analysisData?.secondary_analysis.replace(/\n/g, '<br />') || 'No recommendations available'
				}} />
			  </div>
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
  );
}

