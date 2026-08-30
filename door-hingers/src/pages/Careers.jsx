import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Briefcase, MapPin, Clock, Loader2, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import Button from "../components/Button/Button";
import { hasOpenings, jobOpenings } from "../data/careers";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function CVForm() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", note: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          phone: values.phone,
          reply_to: values.email,
          message: `CV submission. Note: ${values.note || "None"}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setValues({ name: "", phone: "", email: "", note: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full bg-ink border border-white/10 focus:border-red rounded-sm px-4 py-3 text-sm text-paper placeholder:text-steel outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-xl mx-auto">
      <p className="flex items-center gap-2 text-steel-light text-sm">
        <Upload size={16} className="text-red" />
        Note: this form currently collects your contact details — email your CV as an
        attachment separately, or share a link to it in the note field, until direct file
        upload is enabled.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input
            name="name"
            placeholder="Your Name"
            value={values.name}
            onChange={handleChange}
            className={fieldClass}
          />
          {errors.name && <p className="text-red-bright text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={values.phone}
            onChange={handleChange}
            className={fieldClass}
          />
          {errors.phone && <p className="text-red-bright text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className={fieldClass}
        />
        {errors.email && <p className="text-red-bright text-xs mt-1">{errors.email}</p>}
      </div>
      <textarea
        name="note"
        rows={3}
        placeholder="Position of interest / link to CV"
        value={values.note}
        onChange={handleChange}
        className={fieldClass}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          "Submit Your CV"
        )}
      </Button>
      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-green-400">
          <CheckCircle2 size={18} /> Thanks — we'll keep your details on file.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-bright">
          <AlertCircle size={18} /> Couldn't submit right now. Please email or WhatsApp us
          directly instead.
        </p>
      )}
    </form>
  );
}

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24 bg-ink">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionTitle
          eyebrow="Careers"
          title="Build Your Career With Door Hingers"
          subtitle="We're always looking for passionate and skilled people who want to grow with us."
        />

        {hasOpenings ? (
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {jobOpenings.map((job, i) => (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-ink-card border border-white/5 rounded-md p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-red" />
                  <h3 className="font-display text-lg font-semibold uppercase text-paper">
                    {job.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-steel-light">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {job.type}
                  </span>
                </div>
                <p className="text-steel-light text-sm">{job.description}</p>
                <ul className="text-sm text-steel-light space-y-1">
                  {job.requirements.map((req) => (
                    <li key={req} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" /> {req}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-2 self-start">
                  Apply Now
                </Button>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 mb-16">
            <Briefcase size={32} className="text-red" />
            <p className="text-steel-light max-w-lg">
              No current openings. Please send us your CV and we'll contact you when a
              suitable opportunity becomes available.
            </p>
          </div>
        )}

        <div className="bg-ink-card border border-white/5 rounded-md p-6 sm:p-10">
          <h3 className="font-display text-xl font-semibold uppercase text-center text-paper mb-6">
            Submit Your CV
          </h3>
          <CVForm />
        </div>
      </div>
    </div>
  );
}
