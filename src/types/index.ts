export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'hospital' | 'admin';
  specialty?: string;
  crm?: string;
  phone: string;
  avatar?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

export interface Shift {
  id: string;
  hospitalId: string;
  doctorId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  specialty: string;
  status: 'open' | 'assigned' | 'completed' | 'cancelled';
  paymentValue: number;
} 