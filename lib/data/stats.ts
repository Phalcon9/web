export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { label: "Specialist Doctors", value: 240, suffix: "+" },
  { label: "Years of Excellence", value: 28 },
  { label: "Patients Treated", value: 1.2, suffix: "M+", decimals: 1 },
  { label: "Patient Satisfaction", value: 98, suffix: "%" },
];

export const heroStats: Stat[] = [
  { label: "Specialist Doctors", value: 240, suffix: "+" },
  { label: "Years of Care", value: 28 },
  { label: "Satisfaction", value: 98, suffix: "%" },
];
