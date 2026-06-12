export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  departmentSlug: string;
  experience: number; // years
  rating: number;
  image: string;
  bio: string;
  languages: string[];
  availability: string[]; // weekday short names
  credentials: string;
}

// Portraits use i.pravatar.cc for reliable, consistent professional headshots.
const portrait = (n: number) => `https://i.pravatar.cc/600?img=${n}`;

export const doctors: Doctor[] = [
  {
    id: "dr-amara-okafor",
    name: "Dr. Amara Okafor",
    specialty: "Interventional Cardiologist",
    departmentSlug: "cardiology",
    experience: 18,
    rating: 4.9,
    image: portrait(5),
    bio: "Pioneer in minimally invasive cardiac procedures with a focus on complex coronary interventions and structural heart disease.",
    languages: ["English", "French"],
    availability: ["Mon", "Tue", "Thu", "Fri"],
    credentials: "MBBS, MD, FACC",
  },
  {
    id: "dr-james-mensah",
    name: "Dr. James Mensah",
    specialty: "Consultant Neurologist",
    departmentSlug: "neurology",
    experience: 15,
    rating: 4.8,
    image: portrait(12),
    bio: "Specialist in stroke medicine and movement disorders, leading our comprehensive stroke and deep brain stimulation programs.",
    languages: ["English"],
    availability: ["Mon", "Wed", "Fri"],
    credentials: "MBBS, MRCP, PhD",
  },
  {
    id: "dr-sofia-rahman",
    name: "Dr. Sofia Rahman",
    specialty: "Pediatric Specialist",
    departmentSlug: "pediatrics",
    experience: 12,
    rating: 5.0,
    image: portrait(45),
    bio: "Dedicated to neonatal and child health, with special interest in childhood development and preventive pediatric care.",
    languages: ["English", "French"],
    availability: ["Tue", "Wed", "Thu", "Sat"],
    credentials: "MBBS, DCH, MRCPCH",
  },
  {
    id: "dr-daniel-adeyemi",
    name: "Dr. Daniel Adeyemi",
    specialty: "Orthopedic Surgeon",
    departmentSlug: "orthopedics",
    experience: 20,
    rating: 4.9,
    image: portrait(33),
    bio: "Expert in robotic-assisted joint replacement and sports injury reconstruction, helping patients return to active lives.",
    languages: ["English"],
    availability: ["Mon", "Tue", "Thu"],
    credentials: "MBBS, MS Ortho, FRCS",
  },
  {
    id: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    specialty: "Consultant Radiologist",
    departmentSlug: "radiology",
    experience: 14,
    rating: 4.7,
    image: portrait(44),
    bio: "Leads our AI-assisted imaging program, specializing in oncologic and neuroimaging with rapid, precise reporting.",
    languages: ["English", "French"],
    availability: ["Mon", "Wed", "Thu", "Fri"],
    credentials: "MBBS, MD Radiology",
  },
  {
    id: "dr-lucas-bianchi",
    name: "Dr. Lucas Bianchi",
    specialty: "Cosmetic & Implant Dentist",
    departmentSlug: "dentistry",
    experience: 11,
    rating: 4.8,
    image: portrait(13),
    bio: "Combines digital smile design with painless implant techniques to deliver natural, confident smiles.",
    languages: ["English", "French"],
    availability: ["Tue", "Wed", "Fri", "Sat"],
    credentials: "BDS, MSc Implantology",
  },
  {
    id: "dr-grace-mwangi",
    name: "Dr. Grace Mwangi",
    specialty: "Consultant Oncologist",
    departmentSlug: "oncology",
    experience: 16,
    rating: 4.9,
    image: portrait(16),
    bio: "Focused on precision medicine and immunotherapy, chairing our multidisciplinary tumor board for personalized treatment plans.",
    languages: ["English"],
    availability: ["Mon", "Thu", "Fri"],
    credentials: "MBBS, MD, FRCP Oncology",
  },
  {
    id: "dr-elena-petrova",
    name: "Dr. Elena Petrova",
    specialty: "Gynecologist & Obstetrician",
    departmentSlug: "gynecology",
    experience: 17,
    rating: 5.0,
    image: portrait(20),
    bio: "Specialist in high-risk maternity and minimally invasive gynecologic surgery, supporting women through every life stage.",
    languages: ["English", "French"],
    availability: ["Mon", "Tue", "Wed", "Sat"],
    credentials: "MBBS, MD, MRCOG",
  },
  {
    id: "dr-omar-haddad",
    name: "Dr. Omar Haddad",
    specialty: "Emergency Medicine Lead",
    departmentSlug: "emergency-medicine",
    experience: 13,
    rating: 4.8,
    image: portrait(59),
    bio: "Directs our 24/7 emergency department and trauma response, with extensive experience in critical and disaster medicine.",
    languages: ["English", "French"],
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    credentials: "MBBS, FACEM",
  },
  {
    id: "dr-naomi-clarke",
    name: "Dr. Naomi Clarke",
    specialty: "Clinical Pathologist",
    departmentSlug: "laboratory-services",
    experience: 19,
    rating: 4.7,
    image: portrait(47),
    bio: "Oversees our accredited laboratory, ensuring accurate molecular and histopathology diagnostics with rapid turnaround.",
    languages: ["English"],
    availability: ["Mon", "Tue", "Thu", "Fri"],
    credentials: "MBBS, MD Pathology",
  },
  {
    id: "dr-aisha-bello",
    name: "Dr. Aisha Bello",
    specialty: "Electrophysiologist",
    departmentSlug: "cardiology",
    experience: 10,
    rating: 4.8,
    image: portrait(48),
    bio: "Treats complex heart rhythm disorders with catheter ablation and advanced device implantation.",
    languages: ["English"],
    availability: ["Wed", "Thu", "Fri"],
    credentials: "MBBS, MD, FHRS",
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Pediatric Neurologist",
    departmentSlug: "neurology",
    experience: 14,
    rating: 4.9,
    image: portrait(60),
    bio: "Bridges neurology and pediatrics, caring for children with epilepsy and neurodevelopmental conditions.",
    languages: ["English", "French"],
    availability: ["Mon", "Tue", "Sat"],
    credentials: "MBBS, MD, FAAN",
  },
];

export function getDoctorsByDepartment(slug: string) {
  return doctors.filter((d) => d.departmentSlug === slug);
}

export function getDoctor(id: string) {
  return doctors.find((d) => d.id === id);
}
