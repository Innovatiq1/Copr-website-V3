'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollReset from './ScrollReset';
import Chatbot from './Chatbot';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      <ScrollReset />
      {!isAdmin && <Navbar />}
      <main className="relative z-10">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <Chatbot />}
    </>
  );
}
