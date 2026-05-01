import React from 'react';

export const SchemaOrg = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Baladex Global Auto Parts",
    "url": "https://mobex-autoparts.com",
    "logo": "https://mobex-autoparts.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-97374-42444",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/baladexglobal",
      "https://twitter.com/baladexglobal",
      "https://instagram.com/baladexglobal"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mobex-autoparts.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};
