// src/constants/portfolioData.ts
import {
  // Import all assets and utilities
  serviceCategories,
  normalizeCategory,
  getAssetOrPlaceholder,
  placeholderVideo,
  MediaAsset,

  // Import residential service assets
  pantryBefore1,
  pantryAfter1,
  closetBefore1,
  closetAfter1,
  closet1BeforeGallery,
  closet1AfterGallery,
  // kitchenBefore1, // Not used, commented out to prevent ESLint warning
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
  // garageBefore1, // Not used, commented out to prevent ESLint warning
  // garageAfter1, // Not used, commented out to prevent ESLint warning
  garageBeforeVideo,
  garageAfterVideo,

  // Commercial service assets
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

  // Add-on service assets
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
} from './portfolioAssets'

// Define our media source type using the imported MediaAsset type
type MediaSource = MediaAsset

export interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  details?: string
  clientName?: string
  // Enhanced media support
  beforeMedia: MediaSource
  afterMedia: MediaSource
  // Media types (optional - can be inferred from file extensions)
  beforeMediaType?: 'image' | 'video' | 'gallery'
  afterMediaType?: 'image' | 'video' | 'gallery'
  challenge?: string
  solution?: string
  featured?: boolean
  serviceType: 'residential' | 'commercial' | 'addon'
}

// Updated group services by type
export const serviceTypes: Record<
  string,
  'residential' | 'commercial' | 'addon'
> = {
  // Residential Services
  'Pantry Organization': 'residential',
  'Closet Makeovers': 'residential',
  'Home Office Setup': 'residential',
  'Playroom Organization': 'residential',
  'Laundry Room Setup': 'residential',
  'Moving Prep & Unpacking': 'residential',
  'Home Styling After Organizing': 'residential',
  'Maintenance Plans': 'residential',
  'Garage & Storage Room Optimization': 'residential',

  // Commercial Services
  'Office Space Organization': 'commercial',
  'Supply Room Setup': 'commercial',
  'Break Room Organization': 'commercial',
  'Reception & Lobby Decluttering': 'commercial',
  'Workflow Optimization': 'commercial',
  'Event Prep Support': 'commercial',

  // Add-On Services
  'Donation & Haul-Away Coordination': 'addon',
  'Labeling Services': 'addon',
  'Product Sourcing': 'addon',
  'Virtual Organizing Sessions': 'addon',
  'Gift Certificates': 'addon',
  'Workshops & 1:1 Coaching': 'addon',
}

// Sample portfolio items covering all service types
export const portfolioItems: PortfolioItem[] = [
  // RESIDENTIAL TRANSFORMATIONS
  {
    id: 'pantry-1',
    title: 'Modern Kitchen Pantry Transformation',
    category: 'Pantry Organization',
    description:
      'A complete overhaul of a chaotic pantry into an organized, functional space with clear containers and labeled zones.',
    clientName: 'Johnson Family',
    beforeMedia: getAssetOrPlaceholder(
      pantryBefore1,
      'before',
      'Pantry Organization'
    ),
    afterMedia: getAssetOrPlaceholder(
      pantryAfter1,
      'after',
      'Pantry Organization'
    ),
    challenge:
      'The client had a deep pantry with items getting lost in the back, expired products, and no clear organization system.',
    solution:
      'We implemented clear stackable containers, turntables for corner spaces, and a zone system for different food categories. Custom labels ensure everyone knows where items belong.',
    featured: true,
    serviceType: 'residential',
  },
  {
    id: 'closet-1',
    title: 'Master Bedroom Closet Makeover',
    category: 'Closet Makeovers',
    description:
      'Transformed an overflowing closet into a boutique-like space with seasonal rotation and color coordination.',
    clientName: 'Emily R.',
    beforeMedia:
      closet1BeforeGallery.length > 0
        ? closet1BeforeGallery
        : getAssetOrPlaceholder(closetBefore1, 'before', 'Closet Makeovers'),
    afterMedia:
      closet1AfterGallery.length > 0
        ? closet1AfterGallery
        : getAssetOrPlaceholder(closetAfter1, 'after', 'Closet Makeovers'),
    beforeMediaType: closet1BeforeGallery.length > 1 ? 'gallery' : 'image',
    afterMediaType: closet1AfterGallery.length > 1 ? 'gallery' : 'image',
    challenge:
      'The client had too many clothes crammed into a small space, making it difficult to find items and causing wrinkles.',
    solution:
      'We sorted by season and category, implemented a color-coding system, and added specialized hangers and organizers. Created a rotation system for seasonal items.',
    featured: true,
    serviceType: 'residential',
  },
  {
    id: 'kitchen-1',
    title: 'Kitchen Cabinet Organization',
    category: 'Pantry Organization',
    description:
      'Maximized kitchen storage with drawer dividers, cabinet organizers, and a functional workflow layout.',
    clientName: 'Wilson Family',
    beforeMedia: getAssetOrPlaceholder(
      kitchenBeforeVideo,
      'before',
      'Pantry Organization'
    ),
    afterMedia: getAssetOrPlaceholder(
      kitchenAfter1,
      'after',
      'Pantry Organization'
    ),
    beforeMediaType: kitchenBeforeVideo ? 'video' : 'image',
    challenge:
      'Kitchen cabinets were overflowing with mismatched containers and inefficient use of space, making cooking frustrating.',
    solution:
      'We implemented drawer dividers, stackable shelving, and grouped items by function. Created cooking zones to improve workflow and meal preparation.',
    featured: false,
    serviceType: 'residential',
  },
  {
    id: 'garage-1',
    title: 'Garage Workshop & Storage',
    category: 'Garage & Storage Room Optimization',
    description:
      'Transformed cluttered garage into functional workshop and efficient storage area.',
    clientName: 'Rodriguez Family',
    beforeMedia:
      getAssetOrPlaceholder(
        garageBeforeVideo,
        'before',
        'Garage & Storage Room Optimization'
      ) || placeholderVideo,
    afterMedia:
      getAssetOrPlaceholder(
        garageAfterVideo,
        'after',
        'Garage & Storage Room Optimization'
      ) || placeholderVideo,
    beforeMediaType: 'video',
    afterMediaType: 'video',
    challenge:
      'Garage had become a dumping ground for household items, leaving no space for car parking or workshop activities.',
    solution:
      'Implemented vertical storage solutions, created zones for different activities, and established seasonal rotation system for sports equipment and holiday decorations.',
    featured: true,
    serviceType: 'residential',
  },
  {
    id: 'office-1',
    title: 'Home Office Organization',
    category: 'Home Office Setup',
    description:
      'Transformed a cluttered home office into a productive workspace with streamlined storage and ergonomic layout.',
    clientName: 'James T.',
    beforeMedia: getAssetOrPlaceholder(
      officeBefore1,
      'before',
      'Home Office Setup'
    ),
    afterMedia: getAssetOrPlaceholder(
      officeAfter1,
      'after',
      'Home Office Setup'
    ),
    challenge:
      'Papers and supplies were scattered throughout the space, making it difficult to focus and find important documents.',
    solution:
      'Created a filing system, implemented desktop organization, and optimized the layout for productivity with proper ergonomics.',
    featured: true,
    serviceType: 'residential',
  },
  {
    id: 'playroom-1',
    title: 'Playroom Transformation',
    category: 'Playroom Organization',
    description:
      'Converted a chaotic playroom into an organized space that encourages creativity and easy cleanup.',
    clientName: 'Henderson Family',
    beforeMedia: getAssetOrPlaceholder(
      playRoomBefore1,
      'before',
      'Playroom Organization'
    ),
    afterMedia: getAssetOrPlaceholder(
      playRoomAfter1,
      'after',
      'Playroom Organization'
    ),
    challenge:
      'Toys were everywhere with no system for storage or organization, making cleanup difficult and playtime frustrating.',
    solution:
      'Implemented a zone system for different activities, created labeled bins for easy sorting, and established a toy rotation system to reduce clutter.',
    featured: false,
    serviceType: 'residential',
  },
  {
    id: 'laundry-1',
    title: 'Laundry Room Efficiency',
    category: 'Laundry Room Setup',
    description:
      'Transformed a cluttered laundry area into a functional space with clear workflow and storage.',
    clientName: 'Thompson Family',
    beforeMedia: getAssetOrPlaceholder(
      laundryBefore1,
      'before',
      'Laundry Room Setup'
    ),
    afterMedia: getAssetOrPlaceholder(
      laundryAfter1,
      'after',
      'Laundry Room Setup'
    ),
    challenge:
      'Small laundry room was overcrowded with products, with no clear process for handling dirty and clean clothes.',
    solution:
      'Installed floating shelves, decanted products into consistent containers, and created a workflow system with sorting bins and folding area.',
    featured: false,
    serviceType: 'residential',
  },
  {
    id: 'moving-1',
    title: 'New Home Unpacking & Setup',
    category: 'Moving Prep & Unpacking',
    description:
      'Assisted a family with their move, organizing as they unpacked to create functional systems from day one.',
    clientName: 'Martinez Family',
    beforeMedia: getAssetOrPlaceholder(
      movingBefore1,
      'before',
      'Moving Prep & Unpacking'
    ),
    afterMedia: getAssetOrPlaceholder(
      movingAfter1,
      'after',
      'Moving Prep & Unpacking'
    ),
    challenge:
      'Moving into a new home with different storage configurations while trying to establish organization from the beginning.',
    solution:
      "Created a strategic unpacking plan, established organizing systems for each space, and implemented proper storage solutions tailored to the new home's layout.",
    featured: true,
    serviceType: 'residential',
  },
  {
    id: 'styling-1',
    title: 'Home Styling After Organization',
    category: 'Home Styling After Organizing',
    description:
      'Added finishing touches to a newly organized living space, creating an aesthetically pleasing and functional environment.',
    clientName: 'Chen Family',
    beforeMedia: getAssetOrPlaceholder(
      stylingBefore1,
      'before',
      'Home Styling After Organizing'
    ),
    afterMedia: getAssetOrPlaceholder(
      stylingAfter1,
      'after',
      'Home Styling After Organizing'
    ),
    challenge:
      "The space was organized but lacked visual harmony and didn't reflect the homeowners' style and personality.",
    solution:
      "Selected decorative elements that enhanced function, arranged items to create visual balance, and incorporated the family's personal style into the organized space.",
    featured: false,
    serviceType: 'residential',
  },
  {
    id: 'maintenance-1',
    title: 'Quarterly Maintenance Program',
    category: 'Maintenance Plans',
    description:
      "Regular refresh sessions keep this busy family's organization systems functioning smoothly year-round.",
    clientName: 'Wright Family',
    beforeMedia: getAssetOrPlaceholder(
      maintenanceBefore1,
      'before',
      'Maintenance Plans'
    ),
    afterMedia: getAssetOrPlaceholder(
      maintenanceAfter1,
      'after',
      'Maintenance Plans'
    ),
    challenge:
      'Maintaining organization systems over time with changing seasons, activities, and family needs.',
    solution:
      'Implemented quarterly check-ins to refresh key areas, adjust systems as needed, and help with seasonal rotations of clothing, decorations, and activities.',
    featured: false,
    serviceType: 'residential',
  },
  // COMMERCIAL TRANSFORMATIONS
  {
    id: 'commercial-office-1',
    title: 'Commercial Office Space',
    category: 'Office Space Organization',
    description:
      'Reorganized an entire office floor to improve workflow and create a more productive environment.',
    clientName: 'Meridian Technologies',
    beforeMedia: getAssetOrPlaceholder(
      officeSpaceBefore1,
      'before',
      'Office Space Organization'
    ),
    afterMedia: getAssetOrPlaceholder(
      officeSpaceAfter1,
      'after',
      'Office Space Organization'
    ),
    challenge:
      'Inefficient use of space was creating bottlenecks in workflow and reducing productivity across departments.',
    solution:
      'Redesigned the office layout to group related teams, created organized supply stations, and implemented a document management system.',
    featured: true,
    serviceType: 'commercial',
  },
  {
    id: 'supply-room-1',
    title: 'Supply Room Organization',
    category: 'Supply Room Setup',
    description:
      'Transformed a chaotic supply closet into an efficient inventory management system.',
    clientName: 'Northstar Medical',
    beforeMedia: getAssetOrPlaceholder(
      supplyRoomBefore1,
      'before',
      'Supply Room Setup'
    ),
    afterMedia: getAssetOrPlaceholder(
      supplyRoomAfter1,
      'after',
      'Supply Room Setup'
    ),
    challenge:
      'Supplies were difficult to locate and inventory was challenging to track, leading to unnecessary reordering.',
    solution:
      'Implemented a category-based organizational system with clear labeling, inventory tracking, and reordering protocols.',
    featured: false,
    serviceType: 'commercial',
  },
  {
    id: 'break-room-1',
    title: 'Company Break Room',
    category: 'Break Room Organization',
    description:
      'Revitalized a chaotic break room into a refreshing space that promotes relaxation and connection.',
    clientName: 'Venture Partners LLC',
    beforeMedia: getAssetOrPlaceholder(
      breakRoomBefore1,
      'before',
      'Break Room Organization'
    ),
    afterMedia: getAssetOrPlaceholder(
      breakRoomAfter1,
      'after',
      'Break Room Organization'
    ),
    challenge:
      'The break room was disorganized with inefficient storage and an uninviting atmosphere.',
    solution:
      'Implemented organized storage for supplies, created labeled zones for different items, and improved the layout for better flow and social interaction.',
    featured: false,
    serviceType: 'commercial',
  },
  {
    id: 'reception-1',
    title: 'Reception Area Redesign',
    category: 'Reception & Lobby Decluttering',
    description:
      'Transformed a cluttered reception area into an inviting, organized space that makes a great first impression.',
    clientName: 'Northstar Medical',
    beforeMedia: getAssetOrPlaceholder(
      receptionBefore1,
      'before',
      'Reception & Lobby Decluttering'
    ),
    afterMedia: getAssetOrPlaceholder(
      receptionAfter1,
      'after',
      'Reception & Lobby Decluttering'
    ),
    challenge:
      'The reception area was unwelcoming with disorganized paperwork and an inefficient check-in process.',
    solution:
      'Created a streamlined workflow for visitor check-in, organized all materials, and improved the layout for better first impressions.',
    featured: false,
    serviceType: 'commercial',
  },
  {
    id: 'workflow-1',
    title: 'Manufacturing Workflow Optimization',
    category: 'Workflow Optimization',
    description:
      'Reorganized workspace layout and materials flow to improve efficiency in a manufacturing environment.',
    clientName: 'Precision Parts Inc.',
    beforeMedia: getAssetOrPlaceholder(
      workflowBefore1,
      'before',
      'Workflow Optimization'
    ),
    afterMedia: getAssetOrPlaceholder(
      workflowAfter1,
      'after',
      'Workflow Optimization'
    ),
    challenge:
      'Inefficient workspace layout was causing delays, extra steps, and reduced productivity.',
    solution:
      'Analyzed workflow patterns, rearranged stations for logical progression, implemented point-of-use storage, and created visual management systems.',
    featured: true,
    serviceType: 'commercial',
  },
  {
    id: 'event-prep-1',
    title: 'Corporate Event Preparation',
    category: 'Event Prep Support',
    description:
      'Organized materials and supplies for a major corporate conference, ensuring smooth execution.',
    clientName: 'Global Innovations Summit',
    beforeMedia: getAssetOrPlaceholder(
      eventPrepBefore1,
      'before',
      'Event Prep Support'
    ),
    afterMedia: getAssetOrPlaceholder(
      eventPrepAfter1,
      'after',
      'Event Prep Support'
    ),
    challenge:
      'Complex event with multiple presentations, handouts, and promotional materials requiring precise organization.',
    solution:
      'Created an event-specific organizational system, prepared day-of-event kits, and established clear protocols for materials distribution.',
    featured: false,
    serviceType: 'commercial',
  },
  // ADD-ON SERVICES
  {
    id: 'donation-1',
    title: 'Donation Coordination',
    category: 'Donation & Haul-Away Coordination',
    description:
      'Managed the entire donation process for items removed during a whole-home organization project.',
    clientName: 'Johnson Family',
    beforeMedia: getAssetOrPlaceholder(
      donationBefore1,
      'before',
      'Donation & Haul-Away Coordination'
    ),
    afterMedia: getAssetOrPlaceholder(
      donationAfter1,
      'after',
      'Donation & Haul-Away Coordination'
    ),
    challenge:
      'Large volume of items to donate with various charity requirements and pickup logistics.',
    solution:
      'Sorted items by donation category, researched appropriate charities, coordinated multiple pickups, and provided tax documentation.',
    featured: false,
    serviceType: 'addon',
  },
  {
    id: 'labeling-1',
    title: 'Custom Labeling System',
    category: 'Labeling Services',
    description:
      'Created a comprehensive, aesthetically pleasing labeling system for a newly organized pantry and kitchen.',
    clientName: 'Smith Family',
    beforeMedia: getAssetOrPlaceholder(
      labelingBefore1,
      'before',
      'Labeling Services'
    ),
    afterMedia: getAssetOrPlaceholder(
      labelingAfter1,
      'after',
      'Labeling Services'
    ),
    challenge:
      "Needed durable, clear labels that matched the home's aesthetic while providing functional organization cues.",
    solution:
      'Designed custom waterproof labels with consistent typography, created a color-coding system, and applied them to all containers and zones.',
    featured: true,
    serviceType: 'addon',
  },
  {
    id: 'product-sourcing-1',
    title: 'Organization Product Sourcing',
    category: 'Product Sourcing',
    description:
      'Researched and sourced the perfect organizational products for a custom closet solution.',
    clientName: 'Taylor Residence',
    beforeMedia: getAssetOrPlaceholder(
      productSourceBefore1,
      'before',
      'Product Sourcing'
    ),
    afterMedia: getAssetOrPlaceholder(
      productSourceAfter1,
      'after',
      'Product Sourcing'
    ),
    challenge:
      'Unique closet dimensions and specific style preferences required custom product solutions.',
    solution:
      'Researched and sourced specialized containers, hangers, and storage solutions that fit both the space constraints and aesthetic requirements.',
    featured: false,
    serviceType: 'addon',
  },
  {
    id: 'virtual-1',
    title: 'Virtual Organization Consultation',
    category: 'Virtual Organizing Sessions',
    description:
      'Provided remote guidance for organizing a home office for a client in another state.',
    clientName: 'Remote Client',
    beforeMedia: getAssetOrPlaceholder(
      virtualBefore1,
      'before',
      'Virtual Organizing Sessions'
    ),
    afterMedia: getAssetOrPlaceholder(
      virtualAfter1,
      'after',
      'Virtual Organizing Sessions'
    ),
    challenge:
      'Needed to assess space, create a plan, and guide implementation without being physically present.',
    solution:
      'Conducted virtual assessment via video call, created a detailed organizational plan with visual guides, and provided step-by-step implementation support through scheduled check-ins.',
    featured: false,
    serviceType: 'addon',
  },
  {
    id: 'gift-certificate-1',
    title: 'Organization Gift Certificate',
    category: 'Gift Certificates',
    description:
      'Custom organization services gift package for a special birthday present.',
    clientName: 'Gift Recipient',
    beforeMedia: getAssetOrPlaceholder(
      giftCertificateBefore1,
      'before',
      'Gift Certificates'
    ),
    afterMedia: getAssetOrPlaceholder(
      giftCertificateAfter1,
      'after',
      'Gift Certificates'
    ),
    challenge:
      "Creating a personalized gift experience that would truly benefit the recipient's specific organizational needs.",
    solution:
      'Designed a beautiful custom gift certificate with initial consultation included, allowing the recipient to choose which spaces to focus on.',
    featured: false,
    serviceType: 'addon',
  },
  {
    id: 'workshop-1',
    title: 'Organization Workshop for Team',
    category: 'Workshops & 1:1 Coaching',
    description:
      'Conducted a custom workshop for office employees on maintaining organized workspaces.',
    clientName: 'Tech Startup',
    beforeMedia: getAssetOrPlaceholder(
      workshopBefore1,
      'before',
      'Workshops & 1:1 Coaching'
    ),
    afterMedia: getAssetOrPlaceholder(
      workshopAfter1,
      'after',
      'Workshops & 1:1 Coaching'
    ),
    challenge:
      'Team needed practical organization skills that could be implemented in a shared office environment.',
    solution:
      'Developed and delivered an interactive workshop with hands-on activities, provided custom reference materials, and offered follow-up coaching sessions.',
    featured: true,
    serviceType: 'addon',
  },
]

// Create portfolio items for any missing categories to ensure complete coverage
export const getFullPortfolioSet = (): PortfolioItem[] => {
  // Get all current categories
  const existingCategories = portfolioItems.map((item) =>
    normalizeCategory(item.category).toLowerCase()
  )

  // Create a full set of items including any missing categories
  const fullSet = [...portfolioItems]

  serviceCategories.forEach((category) => {
    // If this category doesn't exist in our items, create a placeholder
    if (
      !existingCategories.includes(normalizeCategory(category).toLowerCase())
    ) {
      const serviceType =
        serviceTypes[normalizeCategory(category)] || 'residential'

      fullSet.push({
        id: `${category.toLowerCase().replace(/\s+/g, '-')}-placeholder`,
        title: `${category} Service`,
        category: category,
        description: `Professional ${category.toLowerCase()} service for improved functionality and aesthetics.`,
        clientName: 'Sample Project',
        beforeMedia: getAssetOrPlaceholder(undefined, 'before', category),
        afterMedia: getAssetOrPlaceholder(undefined, 'after', category),
        challenge: `This ${category.toLowerCase()} project needed a complete transformation to improve efficiency and function.`,
        solution: `We created custom organization systems and implemented a sustainable process for maintaining order in this ${category.toLowerCase()} project.`,
        featured: false,
        serviceType: serviceType,
      })
    }
  })

  return fullSet
}

// Get a fully populated portfolio with all service categories
export const completePortfolioItems = getFullPortfolioSet()

// Categories for filtering
export const portfolioCategories = ['All', ...serviceCategories]

// Service type groupings for the portfolio
export const serviceTypeGroups = {
  residential: completePortfolioItems.filter(
    (item) => item.serviceType === 'residential'
  ),
  commercial: completePortfolioItems.filter(
    (item) => item.serviceType === 'commercial'
  ),
  addon: completePortfolioItems.filter((item) => item.serviceType === 'addon'),
}
