export const portalRecords = [
  {
    id: "rec-1",
    title: "Annual Physical Examination",
    doctor: "Dr. Amara Okafor",
    department: "Cardiology",
    date: "2026-05-14",
    status: "Reviewed",
    summary: "Routine cardiovascular check-up. All vitals within normal range.",
  },
  {
    id: "rec-2",
    title: "Lipid Profile & Blood Work",
    doctor: "Dr. Naomi Clarke",
    department: "Laboratory Services",
    date: "2026-04-30",
    status: "Reviewed",
    summary: "Cholesterol slightly elevated. Dietary plan recommended.",
  },
  {
    id: "rec-3",
    title: "Chest X-Ray",
    doctor: "Dr. Priya Sharma",
    department: "Radiology",
    date: "2026-03-22",
    status: "Reviewed",
    summary: "Clear lung fields. No abnormalities detected.",
  },
];

export const portalPrescriptions = [
  {
    id: "rx-1",
    medication: "Atorvastatin 10mg",
    dosage: "Once daily, evening",
    prescribedBy: "Dr. Amara Okafor",
    date: "2026-05-14",
    refills: 2,
    active: true,
  },
  {
    id: "rx-2",
    medication: "Vitamin D3 2000 IU",
    dosage: "Once daily with food",
    prescribedBy: "Dr. Sofia Rahman",
    date: "2026-04-10",
    refills: 5,
    active: true,
  },
  {
    id: "rx-3",
    medication: "Amoxicillin 500mg",
    dosage: "Three times daily, 7 days",
    prescribedBy: "Dr. Omar Haddad",
    date: "2026-02-18",
    refills: 0,
    active: false,
  },
];

export const portalResults = [
  {
    id: "res-1",
    test: "Complete Blood Count (CBC)",
    date: "2026-04-30",
    status: "Normal",
    value: "Within reference range",
  },
  {
    id: "res-2",
    test: "Total Cholesterol",
    date: "2026-04-30",
    status: "Attention",
    value: "212 mg/dL (Borderline high)",
  },
  {
    id: "res-3",
    test: "Blood Glucose (Fasting)",
    date: "2026-04-30",
    status: "Normal",
    value: "92 mg/dL",
  },
  {
    id: "res-4",
    test: "Vitamin D",
    date: "2026-04-10",
    status: "Normal",
    value: "38 ng/mL",
  },
];

export const portalAppointments = [
  {
    id: "apt-1",
    doctor: "Dr. Amara Okafor",
    department: "Cardiology",
    date: "2026-06-18",
    time: "10:30 AM",
    type: "Follow-up Consultation",
    status: "Confirmed",
  },
  {
    id: "apt-2",
    doctor: "Dr. Naomi Clarke",
    department: "Laboratory Services",
    date: "2026-06-25",
    time: "08:15 AM",
    type: "Blood Work",
    status: "Confirmed",
  },
  {
    id: "apt-3",
    doctor: "Dr. Priya Sharma",
    department: "Radiology",
    date: "2026-07-02",
    time: "02:00 PM",
    type: "MRI Scan",
    status: "Pending",
  },
];
