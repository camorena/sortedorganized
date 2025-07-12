// src/components/ui/PortfolioItem.tsx
// Version WITHOUT framer-motion - CSS animations only

import React, { useState } from 'react'

interface PortfolioItemProps {
  item: {
    id: string
    title: string
    category: string
    description: string
    beforeImage: string
    afterImage: string
  }
  index: number
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, index }) => {
  const [showAfter, setShowAfter] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  const toggleImage = () => {
    setImageLoading(true)
    setShowAfter(!showAfter)
    // Simulate loading time for smooth transition
    setTimeout(() => setImageLoading(false), 300)
  }

  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'forwards',
      }}>
      <div className="relative h-80 overflow-hidden bg-gray-100">
        {/* Before Image */}
        <img
          src={item.beforeImage}
          alt={`${item.title} - Before`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showAfter ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement
            target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI0Y3RjhGOSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzJFMzAzMyIgZm9udC1zaXplPSIyNCI+QmVmb3JlIEltYWdlPC90ZXh0Pgo8L3N2Zz4=`
          }}
        />

        {/* After Image */}
        <img
          src={item.afterImage}
          alt={`${item.title} - After`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showAfter ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement
            target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI0E4QjhBMyIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRkZGRiIgZm9udC1zaXplPSIyNCI+QWZ0ZXIgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==`
          }}
        />

        {/* Loading Overlay */}
        {imageLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold-highlight border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleImage}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full 
                   text-sm font-medium text-charcoal hover:bg-white transition-all duration-200
                   transform hover:scale-105 shadow-md">
          {showAfter ? 'See Before' : 'See After'}
        </button>

        {/* Overlay with project info */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      flex items-end p-6">
          <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
            <p className="text-sm opacity-90">{item.description}</p>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="inline-block px-3 py-1 bg-sage-light/90 text-charcoal text-xs font-medium rounded-full capitalize">
          {item.category}
        </span>
      </div>
    </div>
  )
}

export default PortfolioItem
