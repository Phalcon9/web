// Accreditation / partner organizations rendered as elegant text logos
// (avoids brand-asset misuse; names are illustrative for this demo).
export interface Partner {
  name: string;
  detail: string;
}

export const partners: Partner[] = [
  { name: "JCI", detail: "Joint Commission Intl." },
  { name: "ISO 9001", detail: "Quality Certified" },
  { name: "WHO", detail: "Health Partner" },
  { name: "NABH", detail: "Accredited" },
  { name: "HIMSS", detail: "Stage 7 Digital" },
  { name: "Red Cross", detail: "Care Network" },
  { name: "Mayo Network", detail: "Care Affiliate" },
  { name: "GreenHealth", detail: "Sustainability" },
];
