// src/components/ui/PortfolioItem.tsx
import React, { useState } from 'react';

interface PortfolioItemProps {
  item: {
    id: string;
    title: string;
    category: string;
    description: string;
    beforeImage: string;
    afterImage: string;
  };
  index: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, index }) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <img
          src={item.beforeImage}
          alt={`${item.title} - Before`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showAfter ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          src={item.afterImage}
          alt={`${item.title} - After`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showAfter ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full 
                   text-sm font-medium text-charcoal hover:bg-white transition-all duration-200"
        >
          {showAfter ? 'See Before' : 'See After'}
        </button>
        
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      flex items-end p-6">
          <div className="text-white">
            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
            <p className="text-sm opacity-90">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
