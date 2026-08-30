import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import Button from "../../components/Button/Button";
import { services } from "../../data/services";

export default function Services() {
  return (
    <section id="services" className="relative bg-ink-soft py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionTitle
          eyebrow="What We Do"
          title="Our Services"
          subtitle="Everything your car needs, under one roof."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button as={Link} to="/services" variant="outline">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
