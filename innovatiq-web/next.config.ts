import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // These keep old URLs — new short URLs redirect back to old (301)
      { source: '/about', destination: '/about-us', statusCode: 301 },
      { source: '/team', destination: '/our-team', statusCode: 301 },
      { source: '/contact', destination: '/contact-us', statusCode: 301 },
      { source: '/services/cloud', destination: '/services/cloud-services', statusCode: 301 },
      { source: '/services/cyber-security', destination: '/services/cyber-security-services', statusCode: 301 },
      { source: '/services/digital-transformation', destination: '/services/digital-transformation-services', statusCode: 301 },
      { source: '/services/consulting', destination: '/services/it-consulting-services', statusCode: 301 },
      { source: '/services/managed-it', destination: '/services/managed-it-services', statusCode: 301 },
      { source: '/services/advanced-infra', destination: '/services/infrastructure-network-solutions', statusCode: 301 },
      { source: '/services/field-service', destination: '/services/field-service-management', statusCode: 301 },
      { source: '/products/skillera', destination: '/product/skilera-training-management-system', statusCode: 301 },
      { source: '/products/learnpro', destination: '/product/learnpro-learning-management-system', statusCode: 301 },
      { source: '/products/securon', destination: '/product/securon-patch-management-system', statusCode: 301 },
      { source: '/products/lmp', destination: '/product/learning-motivational-platform', statusCode: 301 },

      // These keep new URLs — old URLs redirect to new (301)
      { source: '/product', destination: '/products', statusCode: 301 },
      { source: '/joinUs', destination: '/join-us', statusCode: 301 },
      { source: '/PrivacyPolicy', destination: '/privacy-policy', statusCode: 301 },
      { source: '/awards-and-recogniton', destination: '/awards', statusCode: 301 },
      { source: '/blog-content/:id', destination: '/blogs/:id', statusCode: 301 },
      { source: '/jobDescription/:id', destination: '/careers/:id', statusCode: 301 },

      // Admin redirects (301)
      { source: '/Admin', destination: '/admin/login', statusCode: 301 },
      { source: '/Admin/BlogTable', destination: '/admin/blogs', statusCode: 301 },
      { source: '/Admin/CreateBlog', destination: '/admin/blogs/create', statusCode: 301 },
      { source: '/Admin/EditBlog/:id', destination: '/admin/blogs/:id/edit', statusCode: 301 },
      { source: '/Admin/CareerTable', destination: '/admin/careers', statusCode: 301 },
      { source: '/Admin/CreateCareerJobs', destination: '/admin/careers/create', statusCode: 301 },
      { source: '/Admin/EditCareerJobs/:id', destination: '/admin/careers/:id/edit', statusCode: 301 },
      { source: '/Admin/AwardList', destination: '/admin/awards', statusCode: 301 },
      { source: '/Admin/CreateAward', destination: '/admin/awards/create', statusCode: 301 },
      { source: '/Admin/EditAward/:id', destination: '/admin/awards/:id/edit', statusCode: 301 },
      { source: '/Admin/VideoList', destination: '/admin/videos', statusCode: 301 },
      { source: '/Admin/UploadVideo', destination: '/admin/videos/create', statusCode: 301 },
      { source: '/Admin/EditUploadedVideo/:id', destination: '/admin/videos/:id/edit', statusCode: 301 },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    qualities: [65, 70, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;