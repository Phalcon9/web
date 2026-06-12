import type { TranslationKey } from "@/lib/i18n/dictionaries";

export const site = {
  name: "LifeCare Specialist Hospital",
  shortName: "LifeCare",
  description:
    "LifeCare Specialist Hospital delivers world-class, compassionate medical care with advanced technology across cardiology, neurology, pediatrics, oncology and more.",
  url: "https://lifecare-hospital.example.com",
  emergencyPhone: "+1 (800) 911-2580",
  emergencyPhoneHref: "tel:+18009112580",
  mainPhone: "+1 (800) 555-0142",
  mainPhoneHref: "tel:+18005550142",
  ambulancePhone: "+1 (800) 911-0000",
  ambulancePhoneHref: "tel:+18009110000",
  email: "care@lifecare-hospital.example.com",
  address: "1200 Wellness Boulevard, Marina District, Lagos 101233",
  hours: "Outpatient: Mon–Sat 8:00 – 20:00 • Emergency: 24/7",
  mapEmbed:
    "https://www.google.com/maps?q=Marina,Lagos,Nigeria&output=embed",
  socials: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ],
};

export interface NavLink {
  href: string;
  key: TranslationKey;
}

export const navLinks: NavLink[] = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/departments", key: "nav.departments" },
  { href: "/doctors", key: "nav.doctors" },
  { href: "/blog", key: "nav.blog" },
  { href: "/contact", key: "nav.contact" },
];
