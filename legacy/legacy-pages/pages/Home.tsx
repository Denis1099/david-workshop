import React from 'react';
import Hero from '../components/sections/Hero';
import Problem from '../components/sections/Problem';
import AboutSeminar from '../components/sections/AboutSeminar';
import AboutDavid from '../components/sections/AboutDavid';
import WhySeminar from '../components/sections/WhySeminar';
import SeminarBreakdown from '../components/sections/SeminarBreakdown';
import Testimonials from '../components/sections/Testimonials';
import UpcomingSeminars from '../components/sections/UpcomingSeminars';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';

const Home: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home; 