// src/constants/navigation.ts

export interface NavLink {
  id: string
  label: string
}

export const navLinks: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]
