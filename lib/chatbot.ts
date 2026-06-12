export interface BotReply {
  text: string;
  quickReplies?: string[];
}

const KNOWLEDGE: { match: RegExp; reply: BotReply }[] = [
  {
    match: /appointment|book|schedule|consult/i,
    reply: {
      text: "I can help you book an appointment! You can choose your department, doctor, and preferred time on our booking page. Would you like me to take you there?",
      quickReplies: ["Book appointment", "See departments", "Emergency"],
    },
  },
  {
    match: /emergency|ambulance|urgent|911|accident/i,
    reply: {
      text: "If this is a medical emergency, please call our 24/7 line at +1 (800) 911-2580 immediately, or use the red emergency button to request an ambulance. Our ER never closes.",
      quickReplies: ["Request ambulance", "Emergency page"],
    },
  },
  {
    match: /hour|open|time|when|close/i,
    reply: {
      text: "Our outpatient clinics are open Mon–Sat, 8:00–20:00. Our Emergency Department is open 24 hours a day, 7 days a week.",
      quickReplies: ["Book appointment", "Departments"],
    },
  },
  {
    match: /department|service|specialty|cardio|neuro|pediatric|dental|cancer|onco/i,
    reply: {
      text: "We have 10 centers of excellence including Cardiology, Neurology, Pediatrics, Oncology, Orthopedics, Radiology and more. Which would you like to know about?",
      quickReplies: ["See departments", "Find a doctor"],
    },
  },
  {
    match: /doctor|specialist|physician|surgeon/i,
    reply: {
      text: "Our 240+ specialists are leaders in their fields. You can browse profiles, see availability, and book directly from our Doctors page.",
      quickReplies: ["Find a doctor", "Book appointment"],
    },
  },
  {
    match: /location|address|where|map|direction|park/i,
    reply: {
      text: "We're located at 1200 Wellness Boulevard, Marina District. You'll find an interactive map and directions on our Contact page, along with free patient parking.",
      quickReplies: ["Contact page", "Book appointment"],
    },
  },
  {
    match: /portal|record|result|prescription|login/i,
    reply: {
      text: "The Patient Portal lets you view medical records, test results, prescriptions, and manage appointments securely. You can log in from the Patient Portal page.",
      quickReplies: ["Patient portal", "Book appointment"],
    },
  },
  {
    match: /insurance|cost|price|pay|bill|payment/i,
    reply: {
      text: "We work with major insurers and offer transparent self-pay pricing with secure online payment. Our billing team is happy to give you an estimate before any procedure.",
      quickReplies: ["Contact us", "Book appointment"],
    },
  },
  {
    match: /hello|hi|hey|good (morning|afternoon|evening)/i,
    reply: {
      text: "Hello! 👋 I'm Aria, your LifeCare virtual assistant. How can I help you today?",
      quickReplies: ["Book appointment", "Find a doctor", "Emergency", "Opening hours"],
    },
  },
  {
    match: /thank|thanks|bye|great/i,
    reply: {
      text: "You're very welcome! Take care, and remember — LifeCare is here for you 24/7. 💙",
      quickReplies: ["Book appointment", "Departments"],
    },
  },
];

const FALLBACK: BotReply = {
  text: "I'm a virtual assistant and still learning. I can help with appointments, departments, doctors, opening hours, our location, the patient portal, and emergencies. For anything else, our team is reachable on the Contact page.",
  quickReplies: ["Book appointment", "Find a doctor", "Emergency", "Contact us"],
};

export function getBotReply(message: string): BotReply {
  const found = KNOWLEDGE.find((k) => k.match.test(message));
  return found ? found.reply : FALLBACK;
}

export const GREETING: BotReply = {
  text: "Hi there! I'm Aria, your LifeCare virtual assistant. 💙 How can I help you today?",
  quickReplies: ["Book appointment", "Find a doctor", "Opening hours", "Emergency"],
};

// Map quick-reply labels to routes for navigation shortcuts.
export const QUICK_ROUTES: Record<string, string> = {
  "Book appointment": "/appointments",
  "See departments": "/departments",
  Departments: "/departments",
  "Find a doctor": "/doctors",
  "Emergency page": "/emergency",
  Emergency: "/emergency",
  "Patient portal": "/portal",
  "Contact page": "/contact",
  "Contact us": "/contact",
};
