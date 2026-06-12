export type Locale = "en" | "fr";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "fr", label: "Français", flag: "FR" },
];

// Translation keys cover navigation, hero, CTAs, section headings & footer.
// Long-form body copy stays in English by design (see plan) to keep scope sane.
const en = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.departments": "Departments",
  "nav.doctors": "Doctors",
  "nav.appointments": "Appointments",
  "nav.emergency": "Emergency",
  "nav.portal": "Patient Portal",
  "nav.blog": "Health Tips",
  "nav.contact": "Contact",

  "cta.book": "Book Appointment",
  "cta.emergency": "Emergency Care",
  "cta.contact": "Contact Us",
  "cta.callNow": "Call Now",
  "cta.requestAmbulance": "Request Ambulance",
  "cta.learnMore": "Learn More",
  "cta.viewAll": "View All",
  "cta.subscribe": "Subscribe",

  "hero.badge": "Accredited • JCI Gold Seal • 24/7 Care",
  "hero.title": "Advanced Healthcare With Compassion & Excellence.",
  "hero.subtitle":
    "World-class specialists, intelligent diagnostics, and a healing environment designed entirely around you and your family.",
  "hero.stat1": "Specialist Doctors",
  "hero.stat2": "Years of Care",
  "hero.stat3": "Patient Satisfaction",

  "section.services": "Centers of Excellence",
  "section.servicesSub": "Comprehensive, specialist-led care under one roof.",
  "section.stats": "Trusted by Thousands",
  "section.testimonials": "Stories of Healing",
  "section.partners": "Accredited & Trusted By",
  "section.blog": "Latest Health Insights",
  "section.emergency": "24/7 Emergency & Critical Care",

  "footer.tagline":
    "Delivering world-class, compassionate medical care with the most advanced technology available.",
  "footer.quickLinks": "Quick Links",
  "footer.services": "Services",
  "footer.newsletter": "Health Newsletter",
  "footer.newsletterSub": "Wellness tips and hospital news, monthly.",
  "footer.emailPlaceholder": "Your email address",
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
} as const;

export type TranslationKey = keyof typeof en;

const fr: Record<TranslationKey, string> = {
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.departments": "Départements",
  "nav.doctors": "Médecins",
  "nav.appointments": "Rendez-vous",
  "nav.emergency": "Urgences",
  "nav.portal": "Espace Patient",
  "nav.blog": "Conseils Santé",
  "nav.contact": "Contact",

  "cta.book": "Prendre Rendez-vous",
  "cta.emergency": "Soins d'Urgence",
  "cta.contact": "Nous Contacter",
  "cta.callNow": "Appeler",
  "cta.requestAmbulance": "Demander une Ambulance",
  "cta.learnMore": "En Savoir Plus",
  "cta.viewAll": "Voir Tout",
  "cta.subscribe": "S'abonner",

  "hero.badge": "Accrédité • Sceau d'Or JCI • Soins 24/7",
  "hero.title": "Des Soins Avancés Avec Compassion & Excellence.",
  "hero.subtitle":
    "Des spécialistes de classe mondiale, des diagnostics intelligents et un environnement de guérison conçu entièrement autour de vous et de votre famille.",
  "hero.stat1": "Médecins Spécialistes",
  "hero.stat2": "Années de Soins",
  "hero.stat3": "Satisfaction des Patients",

  "section.services": "Centres d'Excellence",
  "section.servicesSub": "Des soins spécialisés complets sous un même toit.",
  "section.stats": "La Confiance de Milliers de Patients",
  "section.testimonials": "Histoires de Guérison",
  "section.partners": "Accrédité & Approuvé Par",
  "section.blog": "Dernières Actualités Santé",
  "section.emergency": "Urgences & Soins Critiques 24/7",

  "footer.tagline":
    "Des soins médicaux de classe mondiale et compatissants, avec la technologie la plus avancée.",
  "footer.quickLinks": "Liens Rapides",
  "footer.services": "Services",
  "footer.newsletter": "Newsletter Santé",
  "footer.newsletterSub": "Conseils bien-être et actualités, chaque mois.",
  "footer.emailPlaceholder": "Votre adresse e-mail",
  "footer.rights": "Tous droits réservés.",
  "footer.privacy": "Politique de Confidentialité",
  "footer.terms": "Conditions d'Utilisation",
};

export const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  en,
  fr,
};
