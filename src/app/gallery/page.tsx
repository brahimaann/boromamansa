'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Shuffle function (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Gallery images (shuffle disabled - images in original order)
const galleryImages = [
  { id: 1, src: '/images/_DSF0063.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 2, src: '/images/_DSF0069.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 3, src: '/images/_MG_0078.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 4, src: '/images/_MG_0125.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 5, src: '/images/_MG_0161.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 6, src: '/images/_MG_0236.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 7, src: '/images/_MG_0663.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 8, src: '/images/_MG_0853 - Copy.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 9, src: '/images/_MG_1480.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 10, src: '/images/_MG_1487.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 11, src: '/images/_MG_1509.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 12, src: '/images/_MG_1545.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 13, src: '/images/_MG_1653.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 14, src: '/images/_MG_1708.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 15, src: '/images/_MG_1736.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 16, src: '/images/_MG_1745.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 17, src: '/images/_MG_1760.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 18, src: '/images/_MG_1790.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 19, src: '/images/_MG_1792.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 20, src: '/images/_MG_1811.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 21, src: '/images/_MG_1851.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 22, src: '/images/_MG_1876.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 23, src: '/images/_MG_1943.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 24, src: '/images/_MG_2075.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 25, src: '/images/_MG_2118.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 26, src: '/images/_MG_2339.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 27, src: '/images/_MG_2502.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 28, src: '/images/_MG_2547.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 29, src: '/images/_MG_5196.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 30, src: '/images/_MG_5289.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 31, src: '/images/hilkingwdaguys-4.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 32, src: '/images/IMG_3860.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 33, src: '/images/IMG_6068.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 34, src: '/images/IMG_7503.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 35, src: '/images/IMG_8189.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 36, src: '/images/IMG_8213.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 37, src: '/images/IMG_8869.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 38, src: '/images/IMG_8973.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 39, src: '/images/IMG_9538.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 40, src: '/images/Loadout 2-1.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 41, src: '/images/Mawatta bday 23-39.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 42, src: '/images/Mo inTheMAgicForest.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 43, src: '/images/nay$peaks_1.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 44, src: '/images/nay$peaks_3.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 45, src: '/images/nay$peaks_8.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 46, src: '/images/R0004913.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 47, src: '/images/Reflection 3 himas edit no2.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 48, src: '/images/Stuart and donny on motor cycle-3.jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 49, src: '/images/walkabout4.29.23 (4 of 7).jpg', alt: 'Portfolio Image', title: 'Portrait' },
  { id: 50, src: '/images/walkabout4.29.23 (6 of 7).jpg', alt: 'Portfolio Image', title: 'Portrait' },
]

interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
  orientation: 'portrait' | 'landscape' | 'square'
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imageDimensions, setImageDimensions] = useState<Record<number, ImageDimensions>>({})

  // Load image dimensions to determine aspect ratios
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: Record<number, ImageDimensions> = {}
      
      await Promise.all(
        galleryImages.map(async (image) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image()
            img.onload = () => {
              const aspectRatio = img.width / img.height
              dimensions[image.id] = {
                width: img.width,
                height: img.height,
                aspectRatio,
                orientation: aspectRatio > 1.1 ? 'landscape' : aspectRatio < 0.9 ? 'portrait' : 'square'
              }
              resolve()
            }
            img.onerror = () => resolve()
            img.src = image.src
          })
        })
      )
      
      setImageDimensions(dimensions)
    }

    loadImageDimensions()
  }, [])

  return (
    <div className="gallery-page flex min-h-screen">
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
        <div className="px-6 py-6 min-[900px]:px-24 pb-24">
          <h1 className="text-[#f4e9d2] text-4xl md:text-9xl  mb-12" style={{ fontFamily: 'Historic' }}>
            GALLERY
          </h1>
          
          {/* Gallery Grid - Pinterest Style Masonry */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
            {galleryImages.map((image) => {
              const dimensions = imageDimensions[image.id]
              const aspectClass = dimensions?.orientation === 'portrait' 
                ? 'aspect-[3/4]' 
                : dimensions?.orientation === 'landscape'
                ? 'aspect-[4/3]'
                : 'aspect-square'
              
              return (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-sm mb-4 md:mb-6 break-inside-avoid"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className={`${aspectClass} relative overflow-hidden w-full`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                <button
                  className="absolute top-4 right-4 text-[#f4e9d2] text-4xl hover:opacity-70 transition-opacity z-10"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="relative w-full h-full max-w-5xl">
                  <Image
                    src={galleryImages.find(img => img.id === selectedImage)?.src || ''}
                    alt={galleryImages.find(img => img.id === selectedImage)?.alt || ''}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

