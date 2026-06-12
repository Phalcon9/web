import {
  Heart,
  Brain,
  Baby,
  Bone,
  ScanLine,
  Stethoscope,
  Activity,
  FlaskConical,
  Ambulance,
  Ribbon,
  type LucideIcon,
} from "lucide-react";

export interface Department {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  highlights: string[];
  procedures: string[];
  image: string;
  accent: string; // tailwind gradient classes for the icon tile
}

export const departments: Department[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: Heart,
    tagline: "Comprehensive heart & vascular care",
    description:
      "Our Heart Institute combines interventional cardiology, electrophysiology, and cardiac surgery with 24/7 catheterization labs to treat the full spectrum of cardiovascular disease.",
    highlights: [
      "24/7 cardiac catheterization lab",
      "Minimally invasive valve repair",
      "Advanced heart failure program",
    ],
    procedures: [
      "Angioplasty & stenting",
      "Pacemaker implantation",
      "Echocardiography",
      "Coronary bypass surgery",
    ],
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=1200&q=80",
    accent: "from-red-500 to-rose-600",
  },
  {
    slug: "neurology",
    name: "Neurology",
    icon: Brain,
    tagline: "Brain, spine & nervous system",
    description:
      "From stroke intervention to epilepsy monitoring, our neuroscience team delivers precise diagnosis and advanced treatment for disorders of the brain, spine, and nerves.",
    highlights: [
      "Comprehensive stroke center",
      "Epilepsy monitoring unit",
      "Neuro-rehabilitation program",
    ],
    procedures: [
      "EEG & EMG studies",
      "Deep brain stimulation",
      "Stroke thrombolysis",
      "Spinal surgery",
    ],
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    accent: "from-violet-500 to-purple-600",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    tagline: "Gentle care for little ones",
    description:
      "A dedicated children's wing with playful spaces, pediatric specialists, and a Level III NICU ensures the youngest patients receive expert, compassionate care.",
    highlights: [
      "Level III neonatal ICU",
      "Child-friendly environments",
      "Pediatric emergency team",
    ],
    procedures: [
      "Newborn & well-child care",
      "Childhood immunizations",
      "Pediatric surgery",
      "Developmental assessment",
    ],
    image:
      "https://images.unsplash.com/photo-1632053002928-1919fc4f67d3?auto=format&fit=crop&w=1200&q=80",
    accent: "from-sky-400 to-cyan-500",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    tagline: "Movement & musculoskeletal health",
    description:
      "Restore mobility with our joint replacement, sports medicine, and spine programs supported by robotic-assisted surgery and on-site physiotherapy.",
    highlights: [
      "Robotic joint replacement",
      "Sports medicine clinic",
      "On-site rehabilitation",
    ],
    procedures: [
      "Hip & knee replacement",
      "Arthroscopy",
      "Fracture care",
      "Spine surgery",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    accent: "from-amber-500 to-orange-600",
  },
  {
    slug: "radiology",
    name: "Radiology",
    icon: ScanLine,
    tagline: "Precision diagnostic imaging",
    description:
      "State-of-the-art 3T MRI, low-dose CT, and AI-assisted reporting deliver fast, accurate imaging to guide every clinical decision.",
    highlights: [
      "3T MRI & 256-slice CT",
      "AI-assisted reporting",
      "Same-day results",
    ],
    procedures: [
      "MRI & CT scans",
      "Digital mammography",
      "Ultrasound",
      "Interventional radiology",
    ],
    image:
      "https://images.unsplash.com/photo-1516069677018-378515003435?auto=format&fit=crop&w=1200&q=80",
    accent: "from-teal-500 to-emerald-600",
  },
  {
    slug: "dentistry",
    name: "Dentistry",
    icon: Stethoscope,
    tagline: "Complete oral & dental health",
    description:
      "Cosmetic, restorative, and surgical dentistry in a calm, modern setting — from routine cleanings to full smile makeovers and dental implants.",
    highlights: [
      "Digital smile design",
      "Painless implant surgery",
      "Pediatric dentistry",
    ],
    procedures: [
      "Dental implants",
      "Root canal therapy",
      "Teeth whitening",
      "Orthodontics",
    ],
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    slug: "oncology",
    name: "Oncology",
    icon: Ribbon,
    tagline: "Advanced cancer care",
    description:
      "Our Cancer Center offers precision medicine, immunotherapy, and a multidisciplinary tumor board, all wrapped in dedicated psychological and palliative support.",
    highlights: [
      "Multidisciplinary tumor board",
      "Targeted immunotherapy",
      "Dedicated support services",
    ],
    procedures: [
      "Chemotherapy",
      "Radiation therapy",
      "Surgical oncology",
      "Genetic counseling",
    ],
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1200&q=80",
    accent: "from-pink-500 to-fuchsia-600",
  },
  {
    slug: "gynecology",
    name: "Gynecology",
    icon: Activity,
    tagline: "Women's health & maternity",
    description:
      "Comprehensive women's health from adolescence through menopause, including high-risk maternity, minimally invasive surgery, and fertility services.",
    highlights: [
      "High-risk pregnancy care",
      "Minimally invasive surgery",
      "Fertility & IVF clinic",
    ],
    procedures: [
      "Prenatal & maternity care",
      "Laparoscopic surgery",
      "Fertility treatment",
      "Well-woman screening",
    ],
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    accent: "from-rose-400 to-pink-500",
  },
  {
    slug: "emergency-medicine",
    name: "Emergency Medicine",
    icon: Ambulance,
    tagline: "24/7 rapid response",
    description:
      "A fully equipped emergency department with trauma bays, rapid triage, and a dedicated ambulance fleet ready around the clock for any critical situation.",
    highlights: [
      "Level I trauma capability",
      "Average triage under 10 min",
      "GPS-tracked ambulance fleet",
    ],
    procedures: [
      "Trauma & critical care",
      "Resuscitation",
      "Emergency surgery",
      "Acute stroke & cardiac care",
    ],
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    accent: "from-red-600 to-red-700",
  },
  {
    slug: "laboratory-services",
    name: "Laboratory Services",
    icon: FlaskConical,
    tagline: "Accurate, fast diagnostics",
    description:
      "An accredited, fully automated laboratory delivers a comprehensive test menu with rapid turnaround and secure digital reporting to your patient portal.",
    highlights: [
      "Fully automated analyzers",
      "Results to patient portal",
      "Home sample collection",
    ],
    procedures: [
      "Blood chemistry panels",
      "Microbiology & cultures",
      "Histopathology",
      "Molecular diagnostics",
    ],
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    accent: "from-emerald-500 to-green-600",
  },
];

export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug);
}
