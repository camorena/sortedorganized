cat > src/App.tsx << 'EOF'
import React from 'react';
import './styles/globals.css';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <span className="text-2xl font-serif text-charcoal">SORTED & ORGANIZED</span>
          <span className="text-sm text-forest-shadow ml-2">by CM</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen bg-gradient-to-br from-forest-shadow to-sage-light flex items-center justify-center text-white">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Transform Clutter into Clarity</h1>
          <p className="text-xl mb-8">Luxury organization services tailored to your lifestyle.</p>
          <a href="#contact" className="px-8 py-4 bg-gold-highlight text-white rounded-lg inline-block hover:bg-gold-highlight/90">
            Book a Consultation
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-warm-ivory">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-charcoal mb-8">About the Founder</h2>
          <p className="max-w-3xl mx-auto text-forest-shadow">
            Hi, I'm Catalina M, the heart behind Sorted & Organized Spaces by CM.
            Organizing isn't just something I do — it's who I am. Since I was a child, 
            I've had a natural passion for bringing order and harmony to the spaces around me.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-charcoal mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🥫</div>
              <h3 className="text-xl font-semibold mb-3">Pantry Organization</h3>
              <p className="text-gray-600">Transform your pantry into an organized paradise.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3">Office Systems</h3>
              <p className="text-gray-600">Create productive and efficient workspaces.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👔</div>
              <h3 className="text-xl font-semibold mb-3">Closet Solutions</h3>
              <p className="text-gray-600">Maximize space with smart organization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - NO IMPORTS NEEDED! */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-charcoal mb-12">Our Work</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={num} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="h-64 bg-gradient-to-br from-sage-light to-mint-accent flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">Portfolio Item {num}</p>
                </div>
                <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white">Click to view details</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-charcoal mb-8">Get in Touch</h2>
          <p className="mb-6 text-forest-shadow">Ready to transform your space?</p>
          <div className="space-y-2">
            <a href="mailto:sortedorganizedbycm@gmail.com" className="block text-gold-highlight hover:underline">
              sortedorganizedbycm@gmail.com
            </a>
            <a href="tel:+16123084781" className="block text-gold-highlight hover:underline">
              (612) 308-4781
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-shadow text-white py-8 text-center">
        <p>© 2025 Sorted & Organized by CM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
EOF

npm start