// src/constants/portfolioAssets.ts
import React from 'react'
import pantryBefore1Image from '../assets/images/pantry-before-1.jpg'
import pantryAfter1Image from '../assets/images/pantry-after-1.jpg'
import closetBeforeImage from '../assets/images/closet-before-1.jpg'
import closetAfterImage from '../assets/images/closet-after-1.jpg'
import officeBeforeImage from '../assets/images/cabinet-before-1.jpg'
import officeAfterImage from '../assets/images/cabinet-after-1.jpg'

// Define asset types
type ImageAsset = string
type VideoAsset = string
type GalleryAsset = string[]

// Placeholder paths - elegant minimal placeholders
// These will be replaced with actual imports once files are available
const IMAGE_PLACEHOLDER = '' // Empty string will trigger our React placeholder

// component
const VIDEO_PLACEHOLDER = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'

// Define variables with explicit types - using empty strings to trigger component placeholders
// Residential Services
const pantryBefore1: ImageAsset = pantryBefore1Image
const pantryAfter1: ImageAsset = pantryAfter1Image
const closetBefore1: ImageAsset = closetBeforeImage
const closetAfter1: ImageAsset = closetAfterImage
const officeBefore1: ImageAsset = officeBeforeImage
const officeAfter1: ImageAsset = officeAfterImage
const playRoomBefore1: ImageAsset = IMAGE_PLACEHOLDER
const playRoomAfter1: ImageAsset = IMAGE_PLACEHOLDER
const laundryBefore1: ImageAsset = IMAGE_PLACEHOLDER
const laundryAfter1: ImageAsset = IMAGE_PLACEHOLDER
const movingBefore1: ImageAsset = IMAGE_PLACEHOLDER
const movingAfter1: ImageAsset = IMAGE_PLACEHOLDER
const stylingBefore1: ImageAsset = IMAGE_PLACEHOLDER
const stylingAfter1: ImageAsset = IMAGE_PLACEHOLDER
const maintenanceBefore1: ImageAsset = IMAGE_PLACEHOLDER
const maintenanceAfter1: ImageAsset = IMAGE_PLACEHOLDER
const garageBefore1: ImageAsset = IMAGE_PLACEHOLDER
const garageAfter1: ImageAsset = IMAGE_PLACEHOLDER
const garageBeforeVideo: VideoAsset = VIDEO_PLACEHOLDER
const garageAfterVideo: VideoAsset = VIDEO_PLACEHOLDER

// Commercial Services
const officeSpaceBefore1: ImageAsset = IMAGE_PLACEHOLDER
const officeSpaceAfter1: ImageAsset = IMAGE_PLACEHOLDER
const supplyRoomBefore1: ImageAsset = IMAGE_PLACEHOLDER
const supplyRoomAfter1: ImageAsset = IMAGE_PLACEHOLDER
const breakRoomBefore1: ImageAsset = IMAGE_PLACEHOLDER
const breakRoomAfter1: ImageAsset = IMAGE_PLACEHOLDER
const receptionBefore1: ImageAsset = IMAGE_PLACEHOLDER
const receptionAfter1: ImageAsset = IMAGE_PLACEHOLDER
const workflowBefore1: ImageAsset = IMAGE_PLACEHOLDER
const workflowAfter1: ImageAsset = IMAGE_PLACEHOLDER
const eventPrepBefore1: ImageAsset = IMAGE_PLACEHOLDER
const eventPrepAfter1: ImageAsset = IMAGE_PLACEHOLDER

// Add-on Services
const donationBefore1: ImageAsset = IMAGE_PLACEHOLDER
const donationAfter1: ImageAsset = IMAGE_PLACEHOLDER
const labelingBefore1: ImageAsset = IMAGE_PLACEHOLDER
const labelingAfter1: ImageAsset = IMAGE_PLACEHOLDER
const productSourceBefore1: ImageAsset = IMAGE_PLACEHOLDER
const productSourceAfter1: ImageAsset = IMAGE_PLACEHOLDER
const virtualBefore1: ImageAsset = IMAGE_PLACEHOLDER
const virtualAfter1: ImageAsset = IMAGE_PLACEHOLDER
const giftCertificateBefore1: ImageAsset = IMAGE_PLACEHOLDER
const giftCertificateAfter1: ImageAsset = IMAGE_PLACEHOLDER
const workshopBefore1: ImageAsset = IMAGE_PLACEHOLDER
const workshopAfter1: ImageAsset = IMAGE_PLACEHOLDER

// Kitchen assets
const kitchenBefore1: ImageAsset = IMAGE_PLACEHOLDER
const kitchenAfter1: ImageAsset = IMAGE_PLACEHOLDER
const kitchenBeforeVideo: VideoAsset = VIDEO_PLACEHOLDER

// Gallery arrays using placeholders
export const closet1BeforeGallery: GalleryAsset = [
  IMAGE_PLACEHOLDER,
  IMAGE_PLACEHOLDER,
]
export const closet1AfterGallery: GalleryAsset = [
  IMAGE_PLACEHOLDER,
  IMAGE_PLACEHOLDER,
]

// Updated complete set of service categories from the provided list
export const serviceCategories = [
  // Residential Services
  'Pantry Organization',
  'Closet Makeovers',
  'Home Office Setup',
  'Playroom Organization',
  'Laundry Room Setup',
  'Moving Prep & Unpacking',
  'Home Styling After Organizing',
  'Maintenance Plans',
  'Garage & Storage Room Optimization',

  // Commercial Services
  'Office Space Organization',
  'Supply Room Setup',
  'Break Room Organization',
  'Reception & Lobby Decluttering',
  'Workflow Optimization',
  'Event Prep Support',

  // Add-On Services
  'Donation & Haul-Away Coordination',
  'Labeling Services',
  'Product Sourcing',
  'Virtual Organizing Sessions',
  'Gift Certificates',
  'Workshops & 1:1 Coaching',
]

// Updated normalized categories map (for translating between different naming formats)
export const categoryMap: Record<string, string> = {
  // Residential Services
  pantry: 'Pantry Organization',
  'pantry organization': 'Pantry Organization',

  closet: 'Closet Makeovers',
  'closet makeovers': 'Closet Makeovers',

  office: 'Home Office Setup',
  'home office': 'Home Office Setup',
  'home office setup': 'Home Office Setup',

  playroom: 'Playroom Organization',
  'playroom organization': 'Playroom Organization',

  laundry: 'Laundry Room Setup',
  'laundry room': 'Laundry Room Setup',
  'laundry room setup': 'Laundry Room Setup',

  moving: 'Moving Prep & Unpacking',
  'moving prep': 'Moving Prep & Unpacking',
  'moving prep & unpacking': 'Moving Prep & Unpacking',

  styling: 'Home Styling After Organizing',
  'home styling': 'Home Styling After Organizing',
  'home styling after organizing': 'Home Styling After Organizing',

  maintenance: 'Maintenance Plans',
  'maintenance plans': 'Maintenance Plans',

  garage: 'Garage & Storage Room Optimization',
  'garage & storage room': 'Garage & Storage Room Optimization',
  'garage & storage room optimization': 'Garage & Storage Room Optimization',

  kitchen: 'Pantry Organization', // Redirecting kitchen to Pantry since it's not in the official list
  'kitchen organization': 'Pantry Organization',

  // Commercial Services
  'office space': 'Office Space Organization',
  'office space organization': 'Office Space Organization',

  'supply room': 'Supply Room Setup',
  'supply room setup': 'Supply Room Setup',

  'break room': 'Break Room Organization',
  'break room organization': 'Break Room Organization',

  reception: 'Reception & Lobby Decluttering',
  'reception & lobby': 'Reception & Lobby Decluttering',
  'reception & lobby decluttering': 'Reception & Lobby Decluttering',

  workflow: 'Workflow Optimization',
  'workflow optimization': 'Workflow Optimization',

  'event prep': 'Event Prep Support',
  'event prep support': 'Event Prep Support',

  // Add-On Services
  donation: 'Donation & Haul-Away Coordination',
  'donation & haul-away': 'Donation & Haul-Away Coordination',
  'donation & haul-away coordination': 'Donation & Haul-Away Coordination',

  labeling: 'Labeling Services',
  'labeling services': 'Labeling Services',

  product: 'Product Sourcing',
  'product sourcing': 'Product Sourcing',

  virtual: 'Virtual Organizing Sessions',
  'virtual organizing': 'Virtual Organizing Sessions',
  'virtual organizing sessions': 'Virtual Organizing Sessions',

  gift: 'Gift Certificates',
  'gift certificates': 'Gift Certificates',

  workshop: 'Workshops & 1:1 Coaching',
  workshops: 'Workshops & 1:1 Coaching',
  coaching: 'Workshops & 1:1 Coaching',
  '1:1 coaching': 'Workshops & 1:1 Coaching',
  'workshops & coaching': 'Workshops & 1:1 Coaching',
  'workshops & 1:1 coaching': 'Workshops & 1:1 Coaching',
}

// Normalize a category name to its standard form
export const normalizeCategory = (category: string): string => {
  const lowerCategory = category.toLowerCase()
  return categoryMap[lowerCategory] || category
}

// Media type that can be any kind of media asset
export type MediaAsset =
  | ImageAsset
  | VideoAsset
  | GalleryAsset
  | React.ReactElement
  | PlaceholderObject // Added the PlaceholderObject type

// Interface for our placeholder object
interface PlaceholderObject {
  _isPlaceholder: true
  type: 'before' | 'after'
  category: string
}

// Enhanced asset or placeholder function - now creates a simple object instead of a React element
export const getAssetOrPlaceholder = (
  asset: MediaAsset | undefined,
  type: 'before' | 'after',
  category: string,
  useComponent: boolean = true
): MediaAsset => {
  // If asset exists and is not an empty string, return it
  if (asset && (typeof asset !== 'string' || asset.trim() !== '')) {
    return asset
  }

  // Normalize the category
  const normalizedCategory = normalizeCategory(category)

  // Create a placeholder object that BeforeAfterCard will recognize
  if (useComponent) {
    // Create placeholder with explicit properties to ensure detection
    const placeholder: PlaceholderObject = {
      _isPlaceholder: true,
      type,
      category: normalizedCategory,
    }
    return placeholder
  } else {
    // Fallback to URL for static usage
    return getPlaceholderUrl(type, normalizedCategory)
  }
}

// Get a placeholder URL for static usage (SSR or non-React contexts)
export const getPlaceholderUrl = (
  type: 'before' | 'after',
  category: string
): string => {
  // Normalize the category
  const normalizedCategory = normalizeCategory(category)

  const baseColor = normalizedCategory.toLowerCase().includes('pantry')
    ? 'eff5f0'
    : normalizedCategory.toLowerCase().includes('closet')
    ? 'f5f2ec'
    : normalizedCategory.toLowerCase().includes('kitchen')
    ? 'f0f5f0'
    : 'f4f1ed' // default

  const textColor = '596856' // Forest shadow color

  return `https://placehold.co/1200x800/${baseColor}/${textColor}?text=${type.toUpperCase()}+${normalizedCategory.replace(
    /\s+/g,
    '+'
  )}`
}

// Convenience placeholder variables
export const placeholderImage: PlaceholderObject = {
  _isPlaceholder: true,
  type: 'before',
  category: 'General',
}
export const placeholderVideo: string = VIDEO_PLACEHOLDER

// Export all assets
export {
  // Residential Services
  pantryBefore1,
  pantryAfter1,
  closetBefore1,
  closetAfter1,
  kitchenBefore1,
  kitchenAfter1,
  kitchenBeforeVideo,
  officeBefore1,
  officeAfter1,
  playRoomBefore1,
  playRoomAfter1,
  laundryBefore1,
  laundryAfter1,
  movingBefore1,
  movingAfter1,
  stylingBefore1,
  stylingAfter1,
  maintenanceBefore1,
  maintenanceAfter1,
  garageBefore1,
  garageAfter1,
  garageBeforeVideo,
  garageAfterVideo,

  // Commercial Services
  officeSpaceBefore1,
  officeSpaceAfter1,
  supplyRoomBefore1,
  supplyRoomAfter1,
  breakRoomBefore1,
  breakRoomAfter1,
  receptionBefore1,
  receptionAfter1,
  workflowBefore1,
  workflowAfter1,
  eventPrepBefore1,
  eventPrepAfter1,

  // Add-on Services
  donationBefore1,
  donationAfter1,
  labelingBefore1,
  labelingAfter1,
  productSourceBefore1,
  productSourceAfter1,
  virtualBefore1,
  virtualAfter1,
  giftCertificateBefore1,
  giftCertificateAfter1,
  workshopBefore1,
  workshopAfter1,
}

/* 
INSTRUCTIONS FOR ADDING REAL IMAGES:

When your image files are ready, replace the placeholders with imports:

Example:
import pantryBefore1 from '../assets/images/portfolio/pantry-before-1.jpg';
import pantryAfter1 from '../assets/images/portfolio/pantry-after-1.jpg';

Then update the gallery arrays to use the imported images:
export const closet1BeforeGallery: GalleryAsset = [closetBefore1, closetBeforeDetail];
*/
