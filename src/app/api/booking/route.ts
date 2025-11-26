import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      package: packageName,
      packageType,
      nature,
      what,
      where,
      date,
      time,
      userEmail,
      userPhone,
    } = body

    // Validate required fields
    if (!packageName || !date || !time || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create calendar event
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/calendar'],
      })

      const calendar = google.calendar({ version: 'v3', auth })
      const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

      // Parse date and time
      const [year, month, day] = date.split('-')
      const [hours, minutes] = time.split(':')
      const eventStart = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      )
      const eventEnd = new Date(eventStart.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours

      const event = {
        summary: `Booking: ${packageName}`,
        description: `Package: ${packageName}\nType: ${packageType}\nNature: ${nature}\nWhat: ${what}\nWhere: ${where}\nContact: ${userEmail} | ${userPhone}`,
        start: {
          dateTime: eventStart.toISOString(),
          timeZone: 'America/New_York', // Adjust to your timezone
        },
        end: {
          dateTime: eventEnd.toISOString(),
          timeZone: 'America/New_York',
        },
        attendees: [
          {
            email: userEmail,
          },
          {
            email: process.env.ADMIN_EMAIL || process.env.GOOGLE_CLIENT_EMAIL,
          },
        ],
      }

      await calendar.events.insert({
        calendarId,
        requestBody: event,
      })
    } catch (calendarError) {
      console.error('Error creating calendar event:', calendarError)
      // Continue even if calendar creation fails
    }

    // Send confirmation email to user
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Booking Confirmation: ${packageName}`,
        html: `
          <h2>Booking Confirmation</h2>
          <p>Thank you for your booking! Here are your booking details:</p>
          <ul>
            <li><strong>Package:</strong> ${packageName}</li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
            <li><strong>Time:</strong> ${time}</li>
            <li><strong>Location:</strong> ${where}</li>
            <li><strong>Nature:</strong> ${nature}</li>
            <li><strong>Details:</strong> ${what}</li>
          </ul>
          <p>We'll be in touch soon to confirm the details.</p>
        `,
      }

      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Continue even if email fails
    }

    // Send notification email to admin
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: `New Booking: ${packageName}`,
        html: `
          <h2>New Booking Received</h2>
          <p>A new booking has been submitted:</p>
          <ul>
            <li><strong>Package:</strong> ${packageName} (${packageType})</li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</li>
            <li><strong>Time:</strong> ${time}</li>
            <li><strong>Location:</strong> ${where}</li>
            <li><strong>Nature:</strong> ${nature}</li>
            <li><strong>Details:</strong> ${what}</li>
            <li><strong>Contact Email:</strong> ${userEmail}</li>
            <li><strong>Contact Phone:</strong> ${userPhone || 'Not provided'}</li>
          </ul>
        `,
      }

      await transporter.sendMail(mailOptions)
    } catch (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError)
    }

    return NextResponse.json({ success: true, message: 'Booking confirmed' })
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}


