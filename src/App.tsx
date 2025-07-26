// Modified App.tsx
import React from 'react'
import './styles/globals.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import WhoWeAre from './components/sections/WhoWeAre'
import About from './components/sections/About'
import Portfolio from './components/sections/Portfolio'
import Testimonials from './components/sections/Testimonials'
import Cta from './components/sections/Cta'
import Contact from './components/sections/Contact'

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

        {/* 1. HOME - Immediate Hook & Value Proposition */}
        <Hero />

        {/* 2. SERVICES - What Problems We Solve (Value First) */}
        <Services />

        {/* 3. WHO WE ARE - Our Mission, Vision & Values */}
        <WhoWeAre />

        {/* 4. ABOUT - Who You're Trusting (Trust Building) */}
        <About />

        {/* 5. PORTFOLIO - Proof of Expertise */}
        <Portfolio />

        {/* 6. TESTIMONIALS - Social Proof & Validation */}
        <Testimonials />

        {/* 7. CTA - Ready to Convert */}
        <Cta />

        {/* 8. CONTACT - Contact Form */}
        <Contact />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}

export default App
