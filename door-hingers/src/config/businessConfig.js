// Central business configuration.
// Every component should read business info from here — never hardcode
// phone numbers, emails, addresses, or social links inside components.
//
// NOTE: A business card was supplied under the name "Accessories Land"
// (GSTIN 32CBTPA9964R1ZN, Parappanagadi Road, Kariparambu, Malappuram,
// Kerala - 676306, Instagram @acce_soriesland). The site itself was
// requested under the brand name "Door Hingers". Both are kept below —
// `legalName` holds the registered business identity from the card, and
// `name` holds the public-facing brand used across the site. Update
// `legalName` if the two are unrelated businesses.

export const businessConfig = {
  name: "Door Hingers",
  legalName: "Accessories Land",
  tagline: "Auto Parts & Car Accessories",

  phone: "", // e.g. "+91 90000 00000"
  whatsapp: "", // digits only with country code, e.g. "919000000000"
  email: "", // e.g. "info@doorhingers.in"

  address: "Parappanagadi Road, Kariparambu, Malappuram, Kerala - 676306",
  gstin: "32CBTPA9964R1ZN",

  mapUrl: "https://www.google.com/maps/search/?api=1&query=Parappanagadi+Road+Kariparambu+Malappuram+Kerala+676306",

  businessHours: {
    monday: "9:30 AM – 7:30 PM",
    tuesday: "9:30 AM – 7:30 PM",
    wednesday: "9:30 AM – 7:30 PM",
    thursday: "9:30 AM – 7:30 PM",
    friday: "9:30 AM – 7:30 PM",
    saturday: "9:30 AM – 7:30 PM",
    sunday: "Closed",
  },

  social: {
    instagram: "https://instagram.com/acce_soriesland",
    facebook: "",
    youtube: "",
  },
};
