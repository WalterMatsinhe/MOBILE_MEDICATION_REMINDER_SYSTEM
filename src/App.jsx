import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import ClinicianLayout from './components/ClinicianLayout'
import DoctorDashboard from './components/DoctorDashboard'
import PatientsManagement from './components/PatientsManagement'
import AppointmentsAndRefills from './components/AppointmentsAndRefills'
import RemindersShowcase from './components/RemindersShowcase'
import MonthlyReport from './components/MonthlyReport'
import SystemWorkflow from './components/SystemWorkflow'
import SettingsScreen from './components/SettingsScreen'
import PatientMobileApp from './components/PatientMobileApp'
import { initialPatients, initialAppointments, monthlyMetrics } from './data/mockData'

export default function App() {
  // App starts on the Login Screen by default
  const [currentUser, setCurrentUser] = useState(null)

  // Clinician active tab inside ClinicianLayout
  const [clinicianTab, setClinicianTab] = useState('dashboard')

  // Shared application state
  const [patients, setPatients] = useState(initialPatients)
  const [appointments, setAppointments] = useState(initialAppointments)
  const [metrics, setMetrics] = useState(monthlyMetrics)

  // Handle new patient registration (Objectives 1 & 2)
  const handleAddPatient = (newPatient) => {
    setPatients(prev => [newPatient, ...prev])
    
    // Add appointments generated during registration
    const newApt = {
      id: `APT-${Date.now()}`,
      patient: newPatient.name,
      condition: newPatient.condition,
      date: newPatient.nextAppointment,
      type: 'Appointment',
      status: 'Scheduled'
    }
    const newRefill = {
      id: `REF-${Date.now()}`,
      patient: newPatient.name,
      condition: newPatient.condition,
      date: newPatient.nextRefill,
      type: 'Medication Refill',
      status: 'Scheduled'
    }
    setAppointments(prev => [newApt, newRefill, ...prev])

    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalPatients: prev.totalPatients + 1,
      hivPatients: newPatient.condition.includes('HIV') ? prev.hivPatients + 1 : prev.hivPatients,
      diabetesPatients: newPatient.condition.includes('Diabetes') ? prev.diabetesPatients + 1 : prev.diabetesPatients
    }))
  }

  // Handle patient acknowledgment (Objective 4: Record confirmation without assuming missed)
  const handleAcknowledgeMedication = (patientId, confirmed) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          lastConfirmed: confirmed ? 'Today 08:00 (Confirmed)' : p.lastConfirmed,
          unconfirmedRemindersCount: confirmed ? 0 : p.unconfirmedRemindersCount
        }
      }
      return p
    }))

    if (confirmed) {
      setMetrics(prev => ({
        ...prev,
        reminders: {
          ...prev.reminders,
          todayConfirmed: prev.reminders.todayConfirmed + 1,
          todayNotConfirmed: Math.max(0, prev.reminders.todayNotConfirmed - 1)
        }
      }))
    }
  }

  // Login handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    if (user.role === 'doctor') {
      setClinicianTab('dashboard')
    }
  }

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null)
  }

  // Direct switch to patient SMS view from clinician portal
  const handleSwitchToPatientView = () => {
    setCurrentUser({
      role: 'patient',
      name: 'João Manuel Chivango',
      subtitle: 'Patient (HIV & Diabetes)'
    })
  }

  // Direct switch back to clinician view from patient view
  const handleSwitchToDoctorView = () => {
    setCurrentUser({
      role: 'doctor',
      name: 'Dr. Almeida',
      subtitle: 'Clinical Medicine Officer'
    })
    setClinicianTab('dashboard')
  }

  // Active patient for mobile view
  const activePatient = patients.find(p => p.name.includes('João')) || patients[0]

  // 1. IF NOT LOGGED IN -> RENDER LOGIN SCREEN BY DEFAULT
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />
  }

  // 2. IF LOGGED IN AS PATIENT -> RENDER PATIENT SMS NOTIFICATIONS (iPHONE)
  if (currentUser.role === 'patient') {
    return (
      <PatientMobileApp 
        patient={activePatient}
        onAcknowledgeMedication={handleAcknowledgeMedication}
        onLogout={handleLogout}
        onSwitchToDoctorView={handleSwitchToDoctorView}
      />
    )
  }

  // 3. IF LOGGED IN AS DOCTOR -> RENDER PROFESSIONAL CLINICAL PORTAL
  return (
    <ClinicianLayout
      currentTab={clinicianTab}
      setCurrentTab={setClinicianTab}
      onLogout={handleLogout}
      onSwitchToPatientView={handleSwitchToPatientView}
    >
      {clinicianTab === 'dashboard' && (
        <DoctorDashboard 
          patients={patients} 
          appointments={appointments} 
          metrics={metrics} 
          onNavigate={setClinicianTab}
        />
      )}

      {clinicianTab === 'pacientes' && (
        <PatientsManagement 
          patients={patients} 
          onAddPatient={handleAddPatient} 
        />
      )}

      {clinicianTab === 'consultas' && (
        <AppointmentsAndRefills 
          appointments={appointments} 
          onNavigate={setClinicianTab}
        />
      )}

      {clinicianTab === 'lembretes' && (
        <RemindersShowcase />
      )}

      {clinicianTab === 'relatorios' && (
        <MonthlyReport metrics={metrics} />
      )}

      {clinicianTab === 'configuracoes' && (
        <SettingsScreen />
      )}

      {clinicianTab === 'fluxo' && (
        <SystemWorkflow onNavigate={setClinicianTab} />
      )}
    </ClinicianLayout>
  )
}
