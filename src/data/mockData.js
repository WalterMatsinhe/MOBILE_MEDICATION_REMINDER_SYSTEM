// Mock Data for Mobile Medication Reminder System (HIV & Diabetes)

export const initialPatients = [
  {
    id: 'P-101',
    name: 'João Manuel Chivango',
    age: 45,
    gender: 'Male',
    neighborhood: 'Central Maputo',
    houseNumber: '123',
    phone: '84 123 4567',
    contactPerson: '82 765 4321',
    relationship: 'Sister',
    condition: 'HIV',
    healthCenter: 'Health Center X',
    doctor: 'Dr. Almeida',
    nextAppointment: '2026-10-20',
    nextRefill: '2026-10-20',
    medications: [
      { name: 'ART (Tenofovir/Lamivudine/Dolutegravir)', dose: '1 tablet', time: '08:00', frequency: 'Daily' }
    ],
    status: 'Stable',
    lastConfirmed: 'Today 08:00',
    unconfirmedRemindersCount: 0
  },
  {
    id: 'P-102',
    name: 'Maria Silva',
    age: 52,
    gender: 'Female',
    neighborhood: 'Polana Caniço',
    houseNumber: '45B',
    phone: '84 234 5678',
    contactPerson: '84 999 1122',
    relationship: 'Son',
    condition: 'Diabetes',
    healthCenter: 'Health Center X',
    doctor: 'Dr. Almeida',
    nextAppointment: '2026-09-18',
    nextRefill: '2026-09-22',
    medications: [
      { name: 'Metformin', dose: '850mg', time: '08:00', frequency: 'Daily' },
      { name: 'Glibenclamide', dose: '5mg', time: '20:00', frequency: 'Daily' }
    ],
    status: 'Stable',
    lastConfirmed: 'Today 08:00',
    unconfirmedRemindersCount: 1
  },
  {
    id: 'P-103',
    name: 'Ana Paula Mondlane',
    age: 38,
    gender: 'Female',
    neighborhood: 'Mavalane',
    houseNumber: '78',
    phone: '82 345 6789',
    contactPerson: '84 555 6677',
    relationship: 'Spouse',
    condition: 'HIV & Diabetes',
    healthCenter: 'Health Center X',
    doctor: 'Dr. Graça',
    nextAppointment: '2026-09-22',
    nextRefill: '2026-09-22',
    medications: [
      { name: 'ART', dose: '1 tablet', time: '08:00', frequency: 'Daily' },
      { name: 'NPH Insulin', dose: '20 IU', time: '07:30', frequency: 'Daily' }
    ],
    status: 'Under Follow-up',
    lastConfirmed: 'Yesterday 20:00',
    unconfirmedRemindersCount: 0
  },
  {
    id: 'P-104',
    name: 'Carlos Mendes',
    age: 61,
    gender: 'Male',
    neighborhood: 'Maxaquene',
    houseNumber: '12',
    phone: '84 456 7890',
    contactPerson: '86 111 2233',
    relationship: 'Nephew',
    condition: 'Diabetes',
    healthCenter: 'Health Center X',
    doctor: 'Dr. Almeida',
    nextAppointment: '2026-09-25',
    nextRefill: '2026-09-28',
    medications: [
      { name: 'Metformin', dose: '1000mg', time: '09:00', frequency: 'Daily' }
    ],
    status: 'At Risk',
    lastConfirmed: '3 days ago',
    unconfirmedRemindersCount: 4 // Objective 4: Recorded as unconfirmed without assuming missed
  },
  {
    id: 'P-105',
    name: 'Fernanda José',
    age: 29,
    gender: 'Female',
    neighborhood: 'Chamanculo',
    houseNumber: '90',
    phone: '87 567 8901',
    contactPerson: '84 777 8899',
    relationship: 'Mother',
    condition: 'HIV',
    healthCenter: 'Health Center X',
    doctor: 'Dr. Almeida',
    nextAppointment: '2026-09-27',
    nextRefill: '2026-09-27',
    medications: [
      { name: 'ART', dose: '1 tablet', time: '20:00', frequency: 'Daily' }
    ],
    status: 'Stable',
    lastConfirmed: 'Today 20:00',
    unconfirmedRemindersCount: 0
  },
  {
    id: 'P-106',
    name: 'José Manuel Sitoe',
    age: 48,
    gender: 'Male',
    neighborhood: 'Airport B',
    houseNumber: '304',
    phone: '84 678 9012',
    contactPerson: '82 888 9900',
    relationship: 'Daughter',
    condition: 'HIV',
    healthCenter: 'Health Center X',
    doctor: 'Dr. Almeida',
    nextAppointment: '2026-09-30',
    nextRefill: '2026-10-02',
    medications: [
      { name: 'ART', dose: '1 tablet', time: '08:00', frequency: 'Daily' }
    ],
    status: 'At Risk',
    lastConfirmed: '5 days ago',
    unconfirmedRemindersCount: 3
  }
];

export const initialAppointments = [
  { id: 'APT-1', patient: 'Maria Silva', condition: 'Diabetes', date: '2026-09-18', type: 'Appointment', status: 'Confirmed' },
  { id: 'APT-2', patient: 'João Chivango', condition: 'HIV', date: '2026-09-20', type: 'Appointment', status: 'Scheduled' },
  { id: 'APT-3', patient: 'Ana Paula', condition: 'HIV & Diabetes', date: '2026-09-22', type: 'Medication Refill', status: 'Reminder sent' },
  { id: 'APT-4', patient: 'Carlos Mendes', condition: 'Diabetes', date: '2026-09-25', type: 'Appointment', status: 'Unconfirmed' },
  { id: 'APT-5', patient: 'Fernanda José', condition: 'HIV', date: '2026-09-27', type: 'Medication Refill', status: 'Scheduled' },
  { id: 'APT-6', patient: 'José Manuel', condition: 'HIV', date: '2026-09-30', type: 'Appointment', status: 'Scheduled' },
  { id: 'APT-7', patient: 'Lucas Nhantumbo', condition: 'Diabetes', date: '2026-10-05', type: 'Medication Refill', status: 'Confirmed' },
  { id: 'APT-8', patient: 'Beatriz Cossa', condition: 'HIV', date: '2026-10-12', type: 'Appointment', status: 'Reminder sent' }
];

export const monthlyMetrics = {
  month: 'September 2026',
  totalPatients: 450,
  hivPatients: 250,
  diabetesPatients: 200,
  reminders: {
    todayTotal: 180,
    todayConfirmed: 152,
    todayNotConfirmed: 28,
    monthlySent: 5400,
    monthlyConfirmed: 4720,
    monthlyConfirmedPct: '87.4%',
    monthlyUnconfirmed: 680,
    monthlyUnconfirmedPct: '12.6%'
  },
  consultations: {
    scheduled: 320,
    confirmed: 290,
    confirmedPct: '90.6%',
    unconfirmed: 30,
    unconfirmedPct: '9.4%'
  },
  refills: {
    scheduled: 300,
    completed: 276,
    completedPct: '92.0%',
    pending: 24,
    pendingPct: '8.0%'
  },
  riskMetrics: {
    unconfirmed3Plus: 18,
    missedAppointment30Days: 12,
    delayedRefill: 7
  }
};
