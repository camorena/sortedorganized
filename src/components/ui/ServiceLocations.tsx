// ServiceLocations Component with All Solid Colors
const ServiceLocations: React.FC = () => {
  return (
    <div className="mb-12 sm:mb-16 lg:mb-20">
      {/* Container with solid background */}
      <div className="bg-neutral rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-secondary shadow-md">
        {/* Section Header with solid colors */}
        <div className="mb-8 pb-3 border-b border-secondary">
          <h3 className="text-xl sm:text-2xl font-serif text-primary flex items-center">
            <span className="bg-primary text-white p-1.5 rounded-full mr-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Service Locations
          </h3>
        </div>

        {/* Cards Grid with side-by-side layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* In-Person Services - Solid colors only */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            {/* Card Header - Solid color */}
            <div className="bg-accent-warm p-4 border-b border-accent-warm">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                In-Person Services
              </h4>
            </div>

            {/* Card Body */}
            <div className="p-5">
              <p className="text-forest-shadow">
                Available throughout the Twin Cities metro area including Saint
                Paul, Minneapolis, and surrounding suburbs.
              </p>

              {/* Service Areas List - Solid colors */}
              <div className="mt-4 pt-4 border-t border-neutral">
                <p className="text-sm font-medium text-primary mb-2">
                  Service Areas Include:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Saint Paul',
                    'Minneapolis',
                    'Edina',
                    'Bloomington',
                    'Eden Prairie',
                  ].map((area) => (
                    <span
                      key={area}
                      className="bg-secondary text-xs px-2 py-1 rounded-full text-primary">
                      {area}
                    </span>
                  ))}
                  <span className="bg-secondary text-xs px-2 py-1 rounded-full text-primary">
                    + More
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Consultations - Solid colors only */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            {/* Card Header - Solid color */}
            <div className="bg-accent-cool p-4 border-b border-accent-cool">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Virtual Consultations
              </h4>
            </div>

            {/* Card Body */}
            <div className="p-5">
              <p className="text-forest-shadow">
                Available worldwide! We can help you create organized spaces no
                matter where you're located.
              </p>

              {/* Benefits List - Solid colors */}
              <div className="mt-4 pt-4 border-t border-neutral">
                <p className="text-sm font-medium text-primary mb-2">
                  Benefits Include:
                </p>
                <ul className="space-y-2">
                  {[
                    'Personalized organization plans',
                    'Professional guidance via video call',
                    'Follow-up support',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-accent-cool mt-0.5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-primary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
