'use client'

import { useState } from 'react'

export default function Packages() {
  const [selectedType, setSelectedType] = useState<'business' | 'personal' | null>(null)

  const businessPackages = [
    {
      name: 'Mini Session',
      price: '$350',
      duration: 'up to 60 minutes on site',
      images: '10–15 fully retouched images',
      variations: 'two setup variations',
      addons: null
    },
    {
      name: 'Standard Session',
      price: '$450',
      duration: 'up to 2 hours',
      images: '20–30 fully retouched images',
      variations: 'up to four setup variations',
      addons: 'baseline prop/styling kit'
    },
    {
      name: 'Half-Day Session',
      price: '$800',
      duration: 'up to 4 hours',
      images: '40 fully retouched images',
      variations: 'up to six setup variations',
      addons: 'table-top and environmental coverage'
    }
  ]

  const personalPackages = [
    {
      name: 'Package 1 — Basic Portrait',
      price: '$250',
      duration: '1 hour',
      outfits: '1–2 outfits',
      location: 'Single location',
      images: '8–12 retouched images',
      addons: null
    },
    {
      name: 'Package 2 — Expanded Portrait',
      price: '$350',
      duration: '2 hours',
      outfits: '1–4 outfits',
      location: 'Single location (or two in close radius)',
      images: '18–25 retouched images',
      addons: null
    },
    {
      name: 'Package 3 — Mobility Portrait',
      price: '$550',
      duration: '2.5 hours',
      outfits: '2–4 outfits',
      location: 'Two locations',
      images: '25–30 retouched images',
      addons: 'Light styling kit'
    },
    {
      name: 'Package 4 — Premium Identity Session',
      price: '$800',
      duration: '4 hours',
      outfits: '4–6 outfits',
      location: 'Multi-location (up to three environments)',
      images: '40 retouched images',
      addons: 'Styling kit + accessory pulls, One vertical reel (15–30s) included'
    }
  ]

  return (
    <div className="packages-page flex min-h-screen">
      <main className="w-full">
        {/* Navigation */}
        <div className="fixed right-0 top-0 h-screen w-20 flex items-center justify-center z-50">
          <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', fontFamily: 'Walker' }}>
            <nav className="flex gap-6 text-[1rem] min-[700px]:text-[1.5rem] tracking-[0.08em] font-semibold text-[#f4e9d2] whitespace-nowrap">
              <a href="/" className="hover:invert hover:underline transition-all duration-200">HOME</a>
              <a href="/gallery" className="hover:invert hover:underline transition-all duration-200">GALLERY</a>
              <a href="/packages" className="hover:invert hover:underline transition-all duration-200">PACKAGES</a>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 min-[900px]:px-24 pb-24 pr-[100px] min-[900px]:pr-24">
          <h1 className="text-[#f4e9d2] text-4xl md:text-9xl mb-12" style={{ fontFamily: 'Historic' }}>
            PACKAGES
          </h1>

          {!selectedType ? (
            <div className="flex flex-col gap-6 max-w-2xl">
              <button
                onClick={() => setSelectedType('business')}
                className="text-[#f4e9d2] text-2xl md:text-4xl font-semibold py-6 px-8 border-2 border-[#f4e9d2] hover:bg-[#f4e9d2] hover:text-black transition-all duration-200 text-left"
                style={{ fontFamily: 'Walker' }}
              >
                BUSINESS
              </button>
              <button
                onClick={() => setSelectedType('personal')}
                className="text-[#f4e9d2] text-2xl md:text-4xl font-semibold py-6 px-8 border-2 border-[#f4e9d2] hover:bg-[#f4e9d2] hover:text-black transition-all duration-200 text-left"
                style={{ fontFamily: 'Walker' }}
              >
                PERSONAL
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedType(null)}
                className="text-[#f4e9d2] text-lg mb-8 hover:underline transition-all duration-200"
                style={{ fontFamily: 'Walker' }}
              >
                ← Back
              </button>

              {selectedType === 'business' && (
                <div className="space-y-8 max-w-4xl">
                  {businessPackages.map((pkg, index) => (
                    <div
                      key={index}
                      className="border border-[#f4e9d2] p-6 md:p-8 bg-black/20 backdrop-blur-sm"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <h2 className="text-[#f4e9d2] text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Walker' }}>
                          {pkg.name}
                        </h2>
                        <span className="text-[#f4e9d2] text-xl md:text-2xl font-semibold" style={{ fontFamily: 'Walker' }}>
                          {pkg.price}
                        </span>
                      </div>
                      <ul className="space-y-2 text-[#f4e9d2] text-base md:text-lg mb-4" style={{ fontFamily: 'Walker' }}>
                        <li>• {pkg.duration}</li>
                        <li>• {pkg.images}</li>
                        <li>• {pkg.variations}</li>
                        {pkg.addons && <li>• {pkg.addons}</li>}
                      </ul>
                      <a
                        href={`/booking?package=${encodeURIComponent(pkg.name)}&type=business`}
                        className="inline-block text-[#f4e9d2] border-2 border-[#f4e9d2] px-6 py-2 hover:bg-[#f4e9d2] hover:text-black transition-all duration-200"
                        style={{ fontFamily: 'Walker' }}
                      >
                        Book Now
                      </a>
                    </div>
                  ))}
                  <div className="border border-[#f4e9d2] p-6 md:p-8 bg-black/20 backdrop-blur-sm mt-8">
                    <h3 className="text-[#f4e9d2] text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: 'Walker' }}>
                      Add-Ons
                    </h3>
                    <ul className="space-y-2 text-[#f4e9d2] text-base md:text-lg" style={{ fontFamily: 'Walker' }}>
                      <li>• $25 per additional image</li>
                      <li>• $200 per 15–30s vertical reel</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedType === 'personal' && (
                <div className="space-y-8 max-w-4xl">
                  {personalPackages.map((pkg, index) => (
                    <div
                      key={index}
                      className="border border-[#f4e9d2] p-6 md:p-8 bg-black/20 backdrop-blur-sm"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <h2 className="text-[#f4e9d2] text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Walker' }}>
                          {pkg.name}
                        </h2>
                        <span className="text-[#f4e9d2] text-xl md:text-2xl font-semibold" style={{ fontFamily: 'Walker' }}>
                          {pkg.price}
                        </span>
                      </div>
                      <ul className="space-y-2 text-[#f4e9d2] text-base md:text-lg mb-4" style={{ fontFamily: 'Walker' }}>
                        <li>• {pkg.duration}</li>
                        <li>• {pkg.outfits}</li>
                        <li>• {pkg.location}</li>
                        <li>• {pkg.images}</li>
                        {pkg.addons && <li>• {pkg.addons}</li>}
                      </ul>
                      <a
                        href={`/booking?package=${encodeURIComponent(pkg.name)}&type=personal`}
                        className="inline-block text-[#f4e9d2] border-2 border-[#f4e9d2] px-6 py-2 hover:bg-[#f4e9d2] hover:text-black transition-all duration-200"
                        style={{ fontFamily: 'Walker' }}
                      >
                        Book Now
                      </a>
                    </div>
                  ))}
                  <div className="border border-[#f4e9d2] p-6 md:p-8 bg-black/20 backdrop-blur-sm mt-8">
                    <h3 className="text-[#f4e9d2] text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: 'Walker' }}>
                      Add-On
                    </h3>
                    <p className="text-[#f4e9d2] text-base md:text-lg" style={{ fontFamily: 'Walker' }}>
                      Add a vertical reel for an additional $75 to your package
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

