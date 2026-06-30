import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://innovatiq.com.sg';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`,                                                    priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${BASE_URL}/about-us`,                                            priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/our-team`,                                            priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/contact-us`,                                          priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/careers`,                                             priority: 0.8,  changeFrequency: 'weekly' },
    { url: `${BASE_URL}/blogs`,                                               priority: 0.8,  changeFrequency: 'weekly' },
    { url: `${BASE_URL}/awards`,                                              priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/join-us`,                                             priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/privacy-policy`,                                      priority: 0.3,  changeFrequency: 'yearly' },

    // Products
    { url: `${BASE_URL}/products`,                                            priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/products/ai-ats`,                                     priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/products/sales-crm`,                                  priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/product/skilera-training-management-system`,          priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/product/learnpro-learning-management-system`,         priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/product/securon-patch-management-system`,             priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/product/learning-motivational-platform`,              priority: 0.8,  changeFrequency: 'monthly' },

    // Services
    { url: `${BASE_URL}/services/ai-services`,                                priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/cloud-services`,                             priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/cyber-security-services`,                    priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/digital-transformation-services`,            priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/it-consulting-services`,                     priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/managed-it-services`,                        priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/infrastructure-network-solutions`,           priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/field-service-management`,                   priority: 0.8,  changeFrequency: 'monthly' },
  ];
}
