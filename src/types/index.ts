export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  status: 'available' | 'busy' | 'on-leave';
  rating: number;
  experience: number;
  education: string;
  about: string;
  availability: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  slots: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  email: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface AppointmentForm {
  patientName: string;
  email: string;
  date: string;
  time: string;
}

export interface SearchFilters {
  query: string;
  status: string;
  specialization: string;
}