import React from 'react';
import Hero from '../components/sections/Hero';
import AboutDavid from '../components/sections/AboutDavid';
import WhySeminar from '../components/sections/WhySeminar';
import SeminarBreakdown from '../components/sections/SeminarBreakdown';
import Testimonials from '../components/sections/Testimonials';
import UpcomingSeminars from '../components/sections/UpcomingSeminars';
import ContactFAQ from '../components/sections/ContactFAQ';
import GymOwners from '../components/sections/GymOwners';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <AboutDavid />
      <WhySeminar />
      <SeminarBreakdown />
      <Testimonials />
      <UpcomingSeminars />
      <ContactFAQ />
      <GymOwners />
    </div>
  );
};

export default Home; 