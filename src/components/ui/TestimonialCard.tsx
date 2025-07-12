import React from 'react';

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    location: string;
    text: string;
    rating: number;
    image?: string;
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg p-8 relative hover:shadow-xl transition-shadow duration-300 opacity-0 animate-fade-in"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="absolute top-6 right-6 text-6xl text-sage-light/30 font-serif">
        "
      </div>
      
      <div className="relative z-10">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating ? 'text-gold-highlight' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        <p className="text-forest-shadow mb-6 italic">"{testimonial.text}"</p>
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-sage-light/30 flex items-center justify-center mr-4">
            <span className="text-xl font-semibold text-forest-shadow">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-charcoal">{testimonial.name}</p>
            <p className="text-sm text-forest-shadow/70">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
