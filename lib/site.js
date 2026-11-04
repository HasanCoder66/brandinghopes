// EDIT THESE: your real contact details and social links (used by the About page)
export const CONTACT = {
  whatsapp: "03170243866", // country code + number, no + or spaces
  phone: "+92 317 0243866",
  email: "hello@brandinghopes.com",
  address: "Karachi, Pakistan",
  hours: "Mon to Sat, 10am to 7pm",
  social: [
    { n: "Facebook", u: "https://facebook.com/brandinghopes" },
    { n: "Instagram", u: "https://instagram.com/brandinghopes" },
    { n: "LinkedIn", u: "https://linkedin.com/company/brandinghopes" },
    { n: "YouTube", u: "https://youtube.com/@brandinghopes" },
  ],
};

export const WA = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello BrandingHopes, I would like a quote for my project.")}`;
