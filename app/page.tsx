'use client';

import Hero from '../src/components/sections/Hero';
import Problem from '../src/components/sections/Problem';
import AboutSeminar from '../src/components/sections/AboutSeminar';
import AboutDavid from '../src/components/sections/AboutDavid';
import WhySeminar from '../src/components/sections/WhySeminar';
import SeminarBreakdown from '../src/components/sections/SeminarBreakdown';
import Testimonials from '../src/components/sections/Testimonials';
import UpcomingSeminars from '../src/components/sections/UpcomingSeminars';
import FAQ from '../src/components/sections/FAQ';
import ContactForm from '../src/components/sections/ContactForm';
import Header from '../src/components/common/Header';
import Footer from '../src/components/common/Footer';
import FloatingWhatsApp from '../src/components/common/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <AboutSeminar />
        <WhySeminar />
        <SeminarBreakdown />
        <AboutDavid />
        <Testimonials />
        <UpcomingSeminars />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}