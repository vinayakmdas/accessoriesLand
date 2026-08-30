import Hero from "../sections/Hero/Hero";
import About from "../sections/About/About";
import Services from "../sections/Services/Services";
import WhyChooseUs from "../sections/WhyChooseUs/WhyChooseUs";
import Gallery from "../sections/Gallery/Gallery";
import Careers from "../sections/Careers/Careers";
import CTA from "../sections/CTA/CTA";
import Contact from "../sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Gallery limit={6} showFilters={false} />
      <Careers />
      <CTA />
      <Contact />
    </>
  );
}
