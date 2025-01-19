import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
