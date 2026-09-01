import Hero from "../sections/Hero/Hero";
import About from "../sections/About/About";
import Services from "../sections/Services/Services";
import Process from "../sections/Process/Process";
import WhyChooseUs from "../sections/WhyChooseUs/WhyChooseUs";
import Gallery from "../sections/Gallery/Gallery";
import Testimonials from "../sections/Testimonials/Testimonials";
import Careers from "../sections/Careers/Careers";
import CTA from "../sections/CTA/CTA";
import Contact from "../sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <WhyChooseUs />
      <Gallery limit={9} showFilters={false} />
      <Testimonials />
      <Careers />
      <CTA />
      <Contact />
    </>
  );
}
