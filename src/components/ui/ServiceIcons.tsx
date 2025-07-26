import React from 'react'

type IconProps = {
  className?: string
  size?: number
}

// Elegant, consistent icon system with shared styling approach
const ServiceIcons = {
  // Residential Services
  Pantry: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M5 6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6Z" />
      <path d="M8 4V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V4" />
      <path d="M5 10H19" />
      <path d="M5 14H19" />
      <path d="M5 18H19" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <circle cx="9" cy="16" r="1" fill="currentColor" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
      <circle cx="15" cy="16" r="1" fill="currentColor" />
    </svg>
  ),

  Kitchen: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20" />
      <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" />
      <path d="M9 13V17" />
      <path d="M15 13V17" />
      <path d="M12 13V17" />
      <rect x="6" y="9" width="12" height="2" rx="0.5" fill="currentColor" />
    </svg>
  ),

  Closet: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" />
      <path d="M12 2V22" />
      <path d="M7 7H9" />
      <path d="M15 7H17" />
      <path d="M7 11V16" />
      <path d="M17 11V16" />
    </svg>
  ),

  Office: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 17H16" />
      <path d="M7 13H17" />
      <rect x="7" y="6" width="10" height="4" rx="1" />
    </svg>
  ),

  Playroom: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="5" />
      <path d="M5 21V16.5C5 15.6716 5.67157 15 6.5 15H17.5C18.3284 15 19 15.6716 19 16.5V21" />
      <path d="M9 10L10 8L12 7L14 8L15 10" />
    </svg>
  ),

  Laundry: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="2" />
      <rect x="6" y="6" width="3" height="3" rx="1" />
    </svg>
  ),

  Moving: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21H5V5Z" />
      <path d="M5 11H19" />
      <path d="M5 16H19" />
      <path d="M10 21V16" />
      <path d="M14 21V16" />
      <path d="M9 7H15" />
    </svg>
  ),

  HomeStyle: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9Z" />
      <path d="M9 14L11 12L15 16" />
      <path d="M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21" />
    </svg>
  ),

  Maintenance: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8L12 12L15 15" />
      <path d="M12 3V4" />
      <path d="M12 20V21" />
      <path d="M3 12H4" />
      <path d="M20 12H21" />
    </svg>
  ),

  // Commercial Services
  OfficeSpace: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9H21" />
      <path d="M9 21V9" />
      <path d="M12 6H12.01" />
      <path d="M16 6H16.01" />
      <path d="M6 6H6.01" />
      <rect x="12" y="12" width="6" height="6" />
    </svg>
  ),

  SupplyRoom: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4Z" />
      <path d="M16 4V20" />
      <path d="M4 12H16" />
      <path d="M7 8H9" />
      <path d="M7 16H9" />
      <path d="M19 8L20 8" />
      <path d="M19 12L20 12" />
      <path d="M19 16L20 16" />
    </svg>
  ),

  BreakRoom: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8H19C19.5523 8 20 8.44772 20 9V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V9C4 8.44772 4.44772 8 5 8H7" />
      <path d="M12 4V8" />
      <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12V4H16V12Z" />
      <path d="M9 8C9 8 10 9 12 9C14 9 15 8 15 8" />
    </svg>
  ),

  Reception: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10H20" />
      <path d="M10 4V10" />
      <path d="M16 15L12 18L8 15" />
      <path d="M12 18V13" />
    </svg>
  ),

  Workflow: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <path d="M9 6H15" />
      <path d="M6 9V15" />
      <path d="M9 18H15" />
      <path d="M18 9V15" />
    </svg>
  ),

  EventPrep: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H8" />
      <path d="M16 20L19 16L22 20" />
      <path d="M14 16H19H24" />
      <path d="M17 13V3" />
      <path d="M7 13V3" />
      <path d="M7 3H17" />
    </svg>
  ),

  // Add-on Services
  Labeling: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12H15" />
      <path d="M9 16H15" />
      <path d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" />
      <path d="M9 7H15" />
    </svg>
  ),

  ProductSourcing: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7L2 10L5 13" />
      <path d="M19 7L22 10L19 13" />
      <path d="M2 10H22" />
      <path d="M8 17L12 13L16 17" />
      <path d="M12 13V21" />
    </svg>
  ),

  Virtual: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" />
      <path d="M12 13L12.01 13" />
      <path d="M2 10H22" />
    </svg>
  ),

  GiftCertificate: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="18" height="14" rx="2" />
      <path d="M20 12H4" />
      <path d="M12 8V22" />
      <path d="M12 8C12 6 12 3 9 3C6 3 6 5 6 6C6 7 7 8 12 8Z" />
      <path d="M12 8C12 6 12 3 15 3C18 3 18 5 18 6C18 7 17 8 12 8Z" />
    </svg>
  ),

  Workshop: ({ className = '', size = 24 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L12 20" />
      <path d="M18 8L18 20" />
      <path d="M6 12L6 20" />
      <path d="M4 20L20 20" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="6" cy="12" r="2" />
    </svg>
  ),
}

export default ServiceIcons
