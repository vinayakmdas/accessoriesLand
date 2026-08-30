import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { services } from "../../data/services";
import Button from "../Button/Button";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const initialState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[0-9+\-\s]{7,15}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Please add a short message.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      // Not configured yet — fail gracefully instead of pretending to send.
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
          service: values.service || "Not specified",
          message: values.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setValues(initialState);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full bg-ink border border-white/10 focus:border-red rounded-sm px-4 py-3 text-sm text-paper placeholder:text-steel outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={values.name}
            onChange={handleChange}
            className={fieldClass}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-red-bright text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={values.phone}
            onChange={handleChange}
            className={fieldClass}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-red-bright text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email (optional)"
          value={values.email}
          onChange={handleChange}
          className={fieldClass}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-red-bright text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="service" className="sr-only">
          Service Required
        </label>
        <select
          id="service"
          name="service"
          value={values.service}
          onChange={handleChange}
          className={`${fieldClass} appearance-none`}
        >
          <option value="">Service Required (optional)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us what you need..."
          value={values.message}
          onChange={handleChange}
          className={fieldClass}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-red-bright text-xs mt-1">{errors.message}</p>}
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </Button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-green-400">
          <CheckCircle2 size={18} /> Your enquiry has been sent. We'll get back to you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-bright">
          <AlertCircle size={18} />
          Couldn't send your enquiry right now. Please call or WhatsApp us directly, or try again in a moment.
        </p>
      )}
    </form>
  );
}
