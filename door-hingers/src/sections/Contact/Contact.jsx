import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ContactForm from "../../components/ContactForm/ContactForm";
import { businessConfig } from "../../config/businessConfig";

const dayLabels = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export default function Contact() {
  return (
    <section id="contact" className="relative bg-ink-soft py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="Have a question or need a quote? Reach out and our team will get back to you."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-red mt-1 shrink-0" />
              <div>
                <p className="font-display uppercase text-sm tracking-wide text-paper">Address</p>
                <p className="text-steel-light text-sm">{businessConfig.address}</p>
              </div>
            </div>

            {businessConfig.phone && (
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-red mt-1 shrink-0" />
                <div>
                  <p className="font-display uppercase text-sm tracking-wide text-paper">Phone</p>
                  <a href={`tel:${businessConfig.phone}`} className="text-steel-light text-sm hover:text-red">
                    {businessConfig.phone}
                  </a>
                </div>
              </div>
            )}

            {businessConfig.email && (
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-red mt-1 shrink-0" />
                <div>
                  <p className="font-display uppercase text-sm tracking-wide text-paper">Email</p>
                  <a href={`mailto:${businessConfig.email}`} className="text-steel-light text-sm hover:text-red">
                    {businessConfig.email}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Clock size={20} className="text-red mt-1 shrink-0" />
              <div>
                <p className="font-display uppercase text-sm tracking-wide text-paper mb-1">
                  Business Hours
                </p>
                <ul className="text-steel-light text-sm space-y-0.5">
                  {Object.entries(businessConfig.businessHours).map(([day, hours]) => (
                    <li key={day} className="flex justify-between gap-6">
                      <span>{dayLabels[day]}</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {businessConfig.mapUrl && (
              <div className="rounded-md overflow-hidden border border-white/10 mt-2">
                <iframe
                  title="Accessories Land location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    businessConfig.mapCoordinates || businessConfig.address
                  )}&output=embed`}
                  className="w-full h-56 grayscale contrast-125 invert-[0.92]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-3 bg-ink-card border border-white/5 rounded-md p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
