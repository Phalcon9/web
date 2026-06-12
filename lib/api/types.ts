// Shapes returned by the LifeCare API (hand-maintained mirror of the backend).

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  patientId: string | null;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
}

export interface PortalAppointment {
  id: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

export interface PortalPrescription {
  id: string;
  medication: string;
  dosage: string;
  prescribedBy: string;
  date: string;
  refills: number;
  active: boolean;
  refillStatus: string | null;
}

export interface PortalResult {
  id: string;
  test: string;
  date: string;
  status: string;
  value: string;
}

export interface PortalRecord {
  id: string;
  title: string;
  doctor: string;
  department: string;
  date: string;
  status: string;
  summary: string;
}

export interface PortalDashboard {
  appointments: PortalAppointment[];
  prescriptions: PortalPrescription[];
  results: PortalResult[];
  records: PortalRecord[];
  stats: {
    appointments: number;
    prescriptions: number;
    results: number;
    records: number;
  };
}

export interface AppointmentConfirmation {
  reference: string;
  status: string;
  id: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
}
