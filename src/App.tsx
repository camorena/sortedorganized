// Alternative App.tsx - Use this if you want to import Contact component
import React from 'react';
import './styles/globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';

// Only import Contact if the file exists and exports properly
import Contact from './components/sections/Contact';

const App = () => {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Skip to Content Link for Accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        {/* Strategic Flow: Value First → Trust Second → Proof → Validation → Action */}
        
        {/* 1. HERO - Immediate Hook & Value Proposition */}
        <Hero />

        {/* 2. SERVICES - What Problems We Solve (Value First) */}
        <Services />

        {/* 3. ABOUT - Who You're Trusting (Trust Building) */}
        <About />

        {/* 4. PORTFOLIO - Proof of Expertise */}
        <section id="portfolio" className="section-padding bg-white">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-serif text-center text-charcoal mb-12 animate-fadeInUp">
              Our Work
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { id: 1, category: 'Pantry', title: 'Modern Kitchen Pantry' },
                { id: 2, category: 'Closet', title: 'Master Bedroom Closet' },
                { id: 3, category: 'Office', title: 'Home Office Setup' },
                { id: 4, category: 'Pantry', title: 'Family Pantry System' },
                { id: 5, category: 'Closet', title: 'Kids Closet Organization' },
                { id: 6, category: 'Office', title: 'Creative Studio Space' }
              ].map((item, index) => (
                <div 
                  key={item.id} 
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-sage-light to-mint-accent"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-gold-highlight text-sm font-medium">{item.category}</span>
                      <h4 className="text-white text-lg font-semibold mt-1">{item.title}</h4>
                      <p className="text-white/80 text-sm mt-2">Click to view details →</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button className="btn-primary">
                View Full Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS - Social Proof & Validation */}
        <section id="testimonials" className="section-padding bg-warm-ivory">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-serif text-center text-charcoal mb-12 animate-fadeInUp">
              Client Testimonials
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Sarah M.',
                  text: 'Catalina transformed my chaotic pantry into a beautifully organized space. I can actually find things now!',
                  rating: 5
                },
                {
                  name: 'John D.',
                  text: 'Professional, efficient, and creative. My home office has never been more productive.',
                  rating: 5
                },
                {
                  name: 'Emily R.',
                  text: 'The closet organization system Catalina created has saved me so much time getting ready each morning.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div 
                  key={testimonial.name}
                  className="card animate-fadeInUp"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="card-body">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-gold-highlight text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-forest-shadow mb-4 italic">"{testimonial.text}"</p>
                    <p className="text-charcoal font-semibold">— {testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA - Ready to Convert */}
        <section className="section-padding bg-gradient-to-br from-forest-shadow to-sage-light text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 animate-fadeInUp">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
              Let's create an organized environment that brings joy and efficiency to your daily life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-300">
              <a href="#contact" className="btn-primary">
                Book Your Consultation
              </a>
              <a href="#services" className="btn-outline text-white border-white hover:bg-white hover:text-charcoal">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* 7. CONTACT - Using Enhanced Contact Component */}
        <Contact />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default App;