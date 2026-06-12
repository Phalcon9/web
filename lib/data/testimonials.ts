export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

const avatar = (n: number) => `https://i.pravatar.cc/200?img=${n}`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Adaeze Nwosu",
    role: "Cardiology Patient",
    quote:
      "From the moment I arrived, I felt cared for. The cardiac team explained every step and the facilities are like nothing I've experienced. They truly saved my life.",
    rating: 5,
    image: avatar(31),
  },
  {
    id: "t2",
    name: "Thomas Reine",
    role: "Father of Patient",
    quote:
      "The pediatric wing turned a scary time into a comforting one. Warm staff, beautiful spaces, and doctors who genuinely listened to my daughter.",
    rating: 5,
    image: avatar(52),
  },
  {
    id: "t3",
    name: "Fatima Al-Sayed",
    role: "Maternity Patient",
    quote:
      "World-class maternity care with such a human touch. The midwives and Dr. Petrova made me feel safe through a high-risk pregnancy. Forever grateful.",
    rating: 5,
    image: avatar(24),
  },
  {
    id: "t4",
    name: "Kwame Asante",
    role: "Orthopedic Patient",
    quote:
      "I was back on my feet weeks ahead of schedule thanks to the robotic knee surgery and the incredible physiotherapy team. Highly recommend.",
    rating: 5,
    image: avatar(68),
  },
  {
    id: "t5",
    name: "Isabella Cruz",
    role: "Oncology Patient",
    quote:
      "Facing cancer is terrifying, but this team surrounded me with expertise and compassion. The support services made all the difference in my recovery.",
    rating: 5,
    image: avatar(49),
  },
  {
    id: "t6",
    name: "David Okonkwo",
    role: "Emergency Patient",
    quote:
      "The ambulance arrived within minutes and the ER team was ready before I got there. Their speed and calm professionalism is remarkable.",
    rating: 5,
    image: avatar(15),
  },
];

// Mock Google-reviews summary for the reviews section.
export const googleReviews = {
  rating: 4.9,
  total: 3284,
  breakdown: [
    { stars: 5, percent: 92 },
    { stars: 4, percent: 6 },
    { stars: 3, percent: 1 },
    { stars: 2, percent: 0.5 },
    { stars: 1, percent: 0.5 },
  ],
};
