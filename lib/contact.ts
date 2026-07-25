// PLACEHOLDER contact details. Every place that displays contact info
// (Contact section, Footer, etc.) pulls from here so real values only need
// to be swapped in once, in one place, when the client provides them.
export const contactInfo = {
  phone: "(000) 000-0000",
  phoneHref: "tel:+10000000000",
  email: "hello@codeit.com",
  address: "Address coming soon",
  socials: [
    { label: "LinkedIn", href: "#", icon: "LinkedIn" },
    { label: "X (Twitter)", href: "#", icon: "X" },
    { label: "Facebook", href: "#", icon: "Facebook" },
    { label: "Instagram", href: "#", icon: "Instagram" },
  ],
} as const;
