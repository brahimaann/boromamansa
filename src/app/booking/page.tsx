'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function BookingForm() {
  const searchParams = useSearchParams()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const packageName = searchParams.get('package') || ''
  const packageType = searchParams.get('type') || ''

  const [formData, setFormData] = useState({
    package: packageName,
    packageType: packageType,
    nature: '',
    what: '',
    where: '',
    phone: '',
    email: ''
  })

  // Generate time slots from 8 AM to 7 PM
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 19; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`
      slots.push(time)
    }
    return slots
  }

  // Fetch available slots for selected date
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate)
    }
  }, [selectedDate])

  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await fetch(`/api/calendar/available?date=${date}`)
      const data = await response.json()
      if (data.availableSlots) {
        setAvailableSlots(data.availableSlots)
      } else {
        setAvailableSlots(generateTimeSlots())
      }
    } catch (error) {
      console.error('Error fetching available slots:', error)
      setAvailableSlots(generateTimeSlots())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedTime,
          userEmail: formData.email,
          userPhone: formData.phone,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Error submitting booking. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Error submitting booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Get dates for the next 30 days
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  if (submitted) {
    return (
      <div className="packages-page flex min-h-screen">
        <main className="w-full">
          <div className="fixed right-0 top-0 h-screen w-20 flex items-center justify-center z-50">
            <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', fontFamily: 'Walker' }}>
              <nav className="flex gap-6 text-[1rem] min-[700px]:text-[1.5rem] tracking-[0.08em] font-semibold text-[#f4e9d2] whitespace-nowrap">
                <a href="/" className="hover:invert hover:underline transition-all duration-200">HOME</a>
                <a href="/gallery" className="hover:invert hover:underline transition-all duration-200">GALLERY</a>
                <a href="/packages" className="hover:invert hover:underline transition-all duration-200">PACKAGES</a>
              </nav>
            </div>
          </div>
          <div className="px-6 py-6 min-[900px]:px-24 pb-24 pr-[100px] min-[900px]:pr-24">
            <h1 className="text-[#f4e9d2] text-4xl md:text-9xl mb-12" style={{ fontFamily: 'Historic' }}>
              BOOKING CONFIRMED
            </h1>
            <div className="max-w-2xl">
              <p className="text-[#f4e9d2] text-lg md:text-xl mb-8" style={{ fontFamily: 'Walker' }}>
                Thank you for your booking! We've sent a confirmation email to your email address.
              </p>
              <a
                href="/packages"
                className="inline-block text-[#f4e9d2] border-2 border-[#f4e9d2] px-6 py-2 hover:bg-[#f4e9d2] hover:text-black transition-all duration-200"
                style={{ fontFamily: 'Walker' }}
              >
                Back to Packages
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="packages-page flex min-h-screen">
      <main className="w-full">
        <div className="fixed right-0 top-0 h-screen w-20 flex items-center justify-center z-50">
          <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', fontFamily: 'Walker' }}>
            <nav className="flex gap-6 text-[1rem] min-[700px]:text-[1.5rem] tracking-[0.08em] font-semibold text-[#f4e9d2] whitespace-nowrap">
              <a href="/" className="hover:invert hover:underline transition-all duration-200">HOME</a>
              <a href="/gallery" className="hover:invert hover:underline transition-all duration-200">GALLERY</a>
              <a href="/packages" className="hover:invert hover:underline transition-all duration-200">PACKAGES</a>
              <a href="/about" className="hover:invert hover:underline transition-all duration-200">ABOUT</a>
            </nav>
          </div>
        </div>

        <div className="px-6 py-6 min-[900px]:px-24 pb-24 pr-[100px] min-[900px]:pr-24">
          <h1 className="text-[#f4e9d2] text-4xl md:text-9xl mb-12" style={{ fontFamily: 'Historic' }}>
            BOOKING
          </h1>

          <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
            {/* Package Info */}
            <div className="border border-[#f4e9d2] p-6 bg-black/20 backdrop-blur-sm">
              <h2 className="text-[#f4e9d2] text-2xl font-bold mb-4" style={{ fontFamily: 'Walker' }}>
                Selected Package
              </h2>
              <p className="text-[#f4e9d2] text-lg" style={{ fontFamily: 'Walker' }}>
                {packageName}
              </p>
            </div>

            {/* Contact Information */}
            <div className="border border-[#f4e9d2] p-6 bg-black/20 backdrop-blur-sm">
              <h2 className="text-[#f4e9d2] text-2xl font-bold mb-4" style={{ fontFamily: 'Walker' }}>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#f4e9d2] mb-2" style={{ fontFamily: 'Walker' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-[#f4e9d2] text-[#f4e9d2] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f4e9d2]"
                  />
                </div>
                <div>
                  <label className="block text-[#f4e9d2] mb-2" style={{ fontFamily: 'Walker' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/40 border border-[#f4e9d2] text-[#f4e9d2] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f4e9d2]"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="border border-[#f4e9d2] p-6 bg-black/20 backdrop-blur-sm">
              <h2 className="text-[#f4e9d2] text-2xl font-bold mb-4" style={{ fontFamily: 'Walker' }}>
                Booking Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#f4e9d2] mb-2" style={{ fontFamily: 'Walker' }}>
                    Nature of Booking *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nature}
                    onChange={(e) => setFormData({ ...formData, nature: e.target.value })}
                    placeholder="e.g., Portrait session, Product photography, Event coverage"
                    className="w-full bg-black/40 border border-[#f4e9d2] text-[#f4e9d2] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f4e9d2]"
                  />
                </div>
                <div>
                  <label className="block text-[#f4e9d2] mb-2" style={{ fontFamily: 'Walker' }}>
                    What (Specifics) *
                  </label>
                  <textarea
                    required
                    value={formData.what}
                    onChange={(e) => setFormData({ ...formData, what: e.target.value })}
                    placeholder="e.g., Birthday photoshoot, Graduation photos, Product launch, etc."
                    rows={3}
                    className="w-full bg-black/40 border border-[#f4e9d2] text-[#f4e9d2] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f4e9d2]"
                  />
                </div>
                <div>
                  <label className="block text-[#f4e9d2] mb-2" style={{ fontFamily: 'Walker' }}>
                    Where (Location) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.where}
                    onChange={(e) => setFormData({ ...formData, where: e.target.value })}
                    placeholder="e.g., Studio location, Specific address, or 'Studio' if at studio"
                    className="w-full bg-black/40 border border-[#f4e9d2] text-[#f4e9d2] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f4e9d2]"
                  />
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="border border-[#f4e9d2] p-6 bg-black/20 backdrop-blur-sm">
              <h2 className="text-[#f4e9d2] text-2xl font-bold mb-4" style={{ fontFamily: 'Walker' }}>
                Select Date *
              </h2>
              <select
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-black/40 border border-[#f4e9d2] text-[#f4e9d2] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f4e9d2]"
              >
                <option value="">Select a date</option>
                {getAvailableDates().map((date) => {
                  const dateObj = new Date(date)
                  return (
                    <option key={date} value={date}>
                      {dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="border border-[#f4e9d2] p-6 bg-black/20 backdrop-blur-sm">
                <h2 className="text-[#f4e9d2] text-2xl font-bold mb-4" style={{ fontFamily: 'Walker' }}>
                  Select Time *
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 border-2 transition-all duration-200 ${
                        selectedTime === time
                          ? 'bg-[#f4e9d2] text-black border-[#f4e9d2]'
                          : 'border-[#f4e9d2] text-[#f4e9d2] hover:bg-[#f4e9d2] hover:text-black'
                      }`}
                      style={{ fontFamily: 'Walker' }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedDate || !selectedTime}
              className="w-full text-[#f4e9d2] border-2 border-[#f4e9d2] px-8 py-4 hover:bg-[#f4e9d2] hover:text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xl font-semibold"
              style={{ fontFamily: 'Walker' }}
            >
              {loading ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default function Booking() {
  return (
    <Suspense fallback={
      <div className="packages-page flex min-h-screen items-center justify-center">
        <p className="text-[#f4e9d2]" style={{ fontFamily: 'Walker' }}>Loading...</p>
      </div>
    }>
      <BookingForm />
    </Suspense>
  )
}

