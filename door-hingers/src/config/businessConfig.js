// Central business configuration.
// Every component should read business info from here — never hardcode
// phone numbers, emails, addresses, or social links inside components.
//
// NOTE: Business registered as "Accessories Land"
// (GSTIN 32CBTPA9964R1ZN, Parappanagadi Road, Kariparambu, Malappuram,
// Kerala - 676306, Instagram @acce_soriesland).

export const businessConfig = {
  name: "Accessories Land",
  legalName: "Accessories Land",
  tagline: "Auto Parts & Car Accessories",

  phone: "+91 9995474127", // digits only with country code, e.g. "+919000000000"
  whatsapp: "9995474127", // digits only with country code, e.g. "919000000000"
  email: "vinayakmdaz@gmail.com", // e.g. "info@accessoriesland.in"

  address: "Parappanagadi Road, Kariparambu, Malappuram, Kerala - 676306",
  gstin: "32CBTPA9964R1ZN",

  mapCoordinates: "11.0419865,75.8994217",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=11.0419865,75.8994217",

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
