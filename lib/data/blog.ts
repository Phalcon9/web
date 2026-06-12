export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  readTime: number; // minutes
  image: string;
  content: string[]; // paragraphs
}

export const blogCategories = [
  "All",
  "Heart Health",
  "Wellness",
  "Nutrition",
  "Mental Health",
  "Prevention",
  "Pediatrics",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "10-habits-for-a-healthy-heart",
    title: "10 Everyday Habits for a Healthier Heart",
    excerpt:
      "Small, consistent choices add up to powerful cardiovascular protection. Our cardiologists share the habits that matter most.",
    category: "Heart Health",
    author: "Dr. Amara Okafor",
    date: "2026-05-28",
    readTime: 6,
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Heart disease remains one of the leading health challenges worldwide, yet a large share of risk is preventable through daily habits. The encouraging truth is that you don't need dramatic change — consistency beats intensity.",
      "Start with movement. Just 30 minutes of brisk walking on most days strengthens the heart muscle, improves circulation, and helps regulate blood pressure. Pair this with a diet rich in vegetables, whole grains, and healthy fats while reducing processed foods and added salt.",
      "Sleep and stress are often overlooked. Aim for seven to eight hours of quality sleep, and build in moments of calm through breathing exercises or time outdoors. Finally, schedule regular check-ups so we can catch and manage risk factors early.",
      "If you have a family history of heart disease, talk to our cardiology team about a personalized screening plan. Prevention, after all, is the most powerful medicine.",
    ],
  },
  {
    slug: "understanding-childhood-vaccinations",
    title: "Understanding Childhood Vaccinations: A Parent's Guide",
    excerpt:
      "A clear, reassuring overview of why vaccines matter, how they work, and what to expect at each stage of your child's growth.",
    category: "Pediatrics",
    author: "Dr. Sofia Rahman",
    date: "2026-05-20",
    readTime: 5,
    image:
      "https://images.unsplash.com/photo-1632053002434-7b9b2b3ed7c8?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Vaccines are among the greatest achievements in modern medicine, protecting children from serious and once-common diseases. They work by safely training the immune system to recognize and fight specific infections.",
      "The childhood immunization schedule is carefully designed to protect children when they are most vulnerable. Mild reactions like a low fever or soreness are normal signs the body is building protection.",
      "If you have questions or concerns, our pediatric team is always happy to talk them through with you. An informed parent is a child's best advocate.",
    ],
  },
  {
    slug: "nutrition-myths-debunked",
    title: "5 Common Nutrition Myths, Debunked by Science",
    excerpt:
      "From 'carbs are the enemy' to detox teas, our clinical nutritionists separate evidence from hype.",
    category: "Nutrition",
    author: "Dr. Naomi Clarke",
    date: "2026-05-12",
    readTime: 7,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Nutrition advice is everywhere — and much of it is misleading. Let's look at what the evidence actually says.",
      "Myth one: carbohydrates are inherently bad. In reality, whole-food carbohydrates like oats, legumes, and fruit are vital sources of energy and fiber. Quality matters more than the macronutrient itself.",
      "Myth two: 'detox' products cleanse your body. Your liver and kidneys already do this remarkably well. A balanced diet supports them far better than any tea or juice cleanse.",
      "The most sustainable approach is rarely a trend — it's a varied, mostly whole-food diet enjoyed consistently over time.",
    ],
  },
  {
    slug: "managing-stress-in-a-busy-world",
    title: "Managing Stress and Protecting Your Mental Health",
    excerpt:
      "Practical, clinically-backed strategies to recognize burnout early and build everyday resilience.",
    category: "Mental Health",
    author: "Dr. James Mensah",
    date: "2026-05-04",
    readTime: 6,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Stress is a natural response, but when it becomes chronic it affects both mind and body — from sleep and mood to heart health and immunity.",
      "Recognizing early signs is key: persistent fatigue, irritability, difficulty concentrating, or withdrawing from others. These are signals, not weaknesses.",
      "Simple practices help: regular movement, consistent sleep, connection with others, and dedicated moments of rest. When stress feels unmanageable, reaching out for professional support is a sign of strength.",
    ],
  },
  {
    slug: "early-cancer-screening-saves-lives",
    title: "Why Early Cancer Screening Saves Lives",
    excerpt:
      "Catching cancer early dramatically improves outcomes. Here's what screenings you should consider and when.",
    category: "Prevention",
    author: "Dr. Grace Mwangi",
    date: "2026-04-26",
    readTime: 8,
    image:
      "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?auto=format&fit=crop&w=1200&q=80",
    content: [
      "When cancer is detected early, treatment is often simpler, less invasive, and far more successful. Screening is one of the most powerful tools we have.",
      "Recommended screenings vary by age, sex, and personal risk — including mammograms, cervical screening, colonoscopy, and skin checks. Family history can shift these timelines earlier.",
      "Speak with our oncology team about a screening plan tailored to you. A short appointment today can change everything tomorrow.",
    ],
  },
  {
    slug: "the-importance-of-quality-sleep",
    title: "The Science of Quality Sleep and Why It Matters",
    excerpt:
      "Sleep is not a luxury — it's foundational to nearly every system in your body. Learn how to improve yours.",
    category: "Wellness",
    author: "Dr. Sofia Rahman",
    date: "2026-04-18",
    readTime: 5,
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80",
    content: [
      "During sleep, your body repairs tissue, consolidates memory, and regulates hormones. Chronic poor sleep is linked to heart disease, weakened immunity, and low mood.",
      "Build a wind-down routine, keep a consistent schedule, and limit screens before bed. Your bedroom should be cool, dark, and quiet.",
      "If you regularly struggle to fall or stay asleep, our specialists can help identify underlying causes and solutions.",
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
