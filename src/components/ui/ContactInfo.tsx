import React from 'react';

const ContactInfo: React.FC = () => {
  const contactDetails = [
    {
      icon: '📧',
      label: 'Email',
      value: 'sortedorganizedbycm@gmail.com',
      href: 'mailto:sortedorganizedbycm@gmail.com'
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '(612) 308-4781',
      href: 'tel:+16123084781'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Saint Paul, Minnesota',
      href: null
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-serif text-charcoal mb-6">
          Get in Touch
        </h3>
        <p className="text-forest-shadow mb-8">
          We're here to help you create the organized space of your dreams. 
          Reach out for a consultation or any questions you may have.
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex items-start space-x-4">
            <span className="text-2xl flex-shrink-0">{detail.icon}</span>
            <div>
              <p className="font-medium text-charcoal">{detail.label}</p>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="text-gold-highlight hover:text-gold-highlight/80 transition-colors"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-forest-shadow">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-warm-ivory rounded-xl p-6">
        <h4 className="font-semibold text-charcoal mb-3">Business Hours</h4>
        <div className="space-y-1 text-forest-shadow">
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: By appointment only</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
