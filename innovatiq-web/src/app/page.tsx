import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProductsSection from '@/components/home/ProductsSection';
import CounterSection from '@/components/CounterSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import WhyUsSection from '@/components/home/WhyUsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProductsSection />
      <CounterSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
