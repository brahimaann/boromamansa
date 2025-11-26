import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    // Initialize Google Calendar API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    })

    const calendar = google.calendar({ version: 'v3', auth })
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

    // Get start and end of the selected date
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    // Fetch events for the selected date
    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []

    // Generate all time slots from 8 AM to 7 PM
    const allSlots: string[] = []
    for (let hour = 8; hour <= 19; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`)
    }

    // Mark busy slots
    const busySlots = new Set<string>()
    events.forEach((event) => {
      if (event.start?.dateTime) {
        const eventStart = new Date(event.start.dateTime)
        const hour = eventStart.getHours()
        busySlots.add(`${hour.toString().padStart(2, '0')}:00`)
      }
    })

    // Filter out busy slots
    const availableSlots = allSlots.filter((slot) => !busySlots.has(slot))

    return NextResponse.json({ availableSlots })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    // If Google Calendar fails, return all slots as available
    const allSlots: string[] = []
    for (let hour = 8; hour <= 19; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`)
    }
    return NextResponse.json({ availableSlots: allSlots })
  }
}


