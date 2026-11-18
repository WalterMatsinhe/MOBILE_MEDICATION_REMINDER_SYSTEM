import { useState } from 'react'
import { 
  Users, 
  Heart, 
  Activity, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  ShieldAlert, 
  Plus, 
  ChevronRight,
  PhoneCall,
  Clock,
  Pill,
  Stethoscope,
  Filter,
  ArrowUpRight
} from 'lucide-react'

export default function DoctorDashboard({ 
  patients, 
  appointments, 
  metrics, 
  onNavigate 
}) {
  const [filterType, setFilterType] = useState('all') // 'all', 'Appointment', 'Medication Refill'

  const filteredAppointments = appointments.filter(apt => {
    if (filterType === 'all') return true
    return apt.type === filterType
  })

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. PROFESSIONAL CLINICAL HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>MISAU Health Network</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">Ambulatory Chronic Care</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Clinical Adherence & Refill Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Real-time adherence monitoring for HIV (ART) and Diabetes mellitus cohort. Dispatches automated reminders and flags patients requiring clinician outreach.
          </p>
        </div>

        {/* Primary Action Group */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200/90 rounded-lg text-xs text-slate-600 font-medium shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Today: Nov 19, 2026</span>
          </div>

          <button
            onClick={() => onNavigate('pacientes')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      {/* 2. 6 CLINICAL KPI CARDS (ENGINEERED SO ALL ICONS & TEXT STAY 100% INSIDE CARDS WITH ZERO OVERFLOW) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
        
        {/* Card 1: Total Patients */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-slate-500 leading-tight truncate">
              Total Patients
            </span>
            <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
              {patients.length}
            </div>
            <div className="text-[10px] sm:text-[10.5px] text-emerald-600 font-semibold mt-2 leading-tight truncate">
              Active in cohort
            </div>
          </div>
        </div>

        {/* Card 2: HIV */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-rose-600 leading-tight">
              HIV
            </span>
            <div className="w-5 h-5 rounded-md bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <Heart className="w-3 h-3 fill-rose-500/20" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
              {patients.filter(p => p.condition.includes('HIV')).length}
            </div>
            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium mt-2 leading-tight truncate">
              Regular ART
            </div>
          </div>
        </div>

        {/* Card 3: Diabetes */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-amber-600 leading-tight">
              Diabetes
            </span>
            <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Activity className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
              {patients.filter(p => p.condition.includes('Diabetes')).length}
            </div>
            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium mt-2 leading-tight truncate">
              Insulin / Metformin
            </div>
          </div>
        </div>

        {/* Card 4: Reminders */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-slate-500 leading-tight">
              Reminders
            </span>
            <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Bell className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
              {metrics.reminders.todayTotal}
            </div>
            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium mt-2 leading-tight truncate">
              SMS, App & USSD
            </div>
          </div>
        </div>

        {/* Card 5: Confirmed */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-emerald-600 leading-tight">
              Confirmed
            </span>
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-2xl xl:text-3xl font-black text-emerald-600 leading-none">
              {metrics.reminders.todayConfirmed}
            </div>
            <div className="text-[10px] sm:text-[10.5px] text-emerald-700 font-semibold mt-2 leading-tight truncate">
              84.4% adherence
            </div>
          </div>
        </div>

        {/* Card 6: Unconfirmed (Immune to icon overflow) */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-rose-600 leading-tight">
              Unconfirmed
            </span>
            <div className="w-5 h-5 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-2xl xl:text-3xl font-black text-rose-600 leading-none">
              {metrics.reminders.todayNotConfirmed}
            </div>
            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium mt-2 leading-tight truncate">
              For outreach
            </div>
          </div>
        </div>

      </div>

      {/* 3. SPLIT SECTION: SCHEDULED VISITS (LEFT) + CLINICAL OUTREACH QUEUE (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLS: Upcoming Appointments & Medication Refills */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          
          {/* Table Header & Quick Filters */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Scheduled Appointments & Drug Refills
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Centralized cohort schedule for doctor consultations and 30-day medication pickups.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium self-start sm:self-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  filterType === 'all' 
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({appointments.length})
              </button>
              <button
                onClick={() => setFilterType('Appointment')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  filterType === 'Appointment' 
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Visits
              </button>
              <button
                onClick={() => setFilterType('Medication Refill')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  filterType === 'Medication Refill' 
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Refills
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Confirmation Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredAppointments.slice(0, 6).map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Patient & Condition */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                          {apt.patient.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{apt.patient}</div>
                          <div className="text-[10px] text-slate-400">
                            {apt.condition.includes('HIV') ? 'HIV · ART Protocol' : 'Diabetes Mellitus'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Schedule Type */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                        apt.type === 'Appointment'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {apt.type === 'Appointment' ? (
                          <Stethoscope className="w-3 h-3 text-purple-600" />
                        ) : (
                          <Pill className="w-3 h-3 text-blue-600" />
                        )}
                        <span>{apt.type}</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-600">
                      {apt.date}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {apt.status === 'Confirmed' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Confirmed (SMS)
                        </span>
                      )}
                      {apt.status === 'Scheduled' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Scheduled
                        </span>
                      )}
                      {apt.status === 'Reminder sent' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Reminder Dispatched
                        </span>
                      )}
                      {apt.status === 'Unconfirmed' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Unconfirmed
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => onNavigate('consultas')}
                        className="text-slate-400 hover:text-blue-600 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition"
                      >
                        <span>Manage</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-3 bg-slate-50/50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <span>Showing next 6 priority items</span>
            <button 
              onClick={() => onNavigate('consultas')}
              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
            >
              View Full Clinical Schedule →
            </button>
          </div>
        </div>

        {/* RIGHT 1 COL: Clinical Outreach & Risk Triage Queue */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900">Clinical Outreach Queue</h2>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              Active Triage
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Automated alerts requiring direct healthcare provider phone contact or community health worker follow-up:
          </p>

          {/* Action Queue List */}
          <div className="space-y-3">
            
            {/* Priority Item 1 */}
            <div 
              onClick={() => onNavigate('pacientes')}
              className="p-3 rounded-lg border border-rose-200/90 bg-rose-50/40 hover:bg-rose-50 transition cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  3+ Unconfirmed Reminders
                </span>
                <span className="text-base font-extrabold text-rose-700">
                  {metrics.riskMetrics.unconfirmed3Plus}
                </span>
              </div>
              <p className="text-[11px] text-rose-700/80">
                Patients who missed 3 consecutive SMS dose confirmations.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-semibold text-rose-800">
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" /> Initiate Outreach Call
                </span>
                <span>Review cohort →</span>
              </div>
            </div>

            {/* Priority Item 2 */}
            <div 
              onClick={() => onNavigate('consultas')}
              className="p-3 rounded-lg border border-amber-200/90 bg-amber-50/40 hover:bg-amber-50 transition cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Overdue Clinic Visits
                </span>
                <span className="text-base font-extrabold text-amber-700">
                  {metrics.riskMetrics.missedAppointment30Days}
                </span>
              </div>
              <p className="text-[11px] text-amber-700/80">
                Routine clinical consultations overdue by 30+ days.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-semibold text-amber-800">
                <span>Reschedule via SMS alert</span>
                <span>Open calendar →</span>
              </div>
            </div>

            {/* Priority Item 3 */}
            <div 
              onClick={() => onNavigate('consultas')}
              className="p-3 rounded-lg border border-blue-200/90 bg-blue-50/40 hover:bg-blue-50 transition cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Pending Pharmacy Refills
                </span>
                <span className="text-base font-extrabold text-blue-700">
                  {metrics.riskMetrics.delayedRefill}
                </span>
              </div>
              <p className="text-[11px] text-blue-700/80">
                Patients approaching drug stockout date for ART/Insulin.
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-semibold text-blue-800">
                <span>Fast-track dispensary</span>
                <span>Refill queue →</span>
              </div>
            </div>

          </div>

          {/* Clinical Policy Guidance Card (Specific Objective 4) */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>National Adherence Protocol</span>
            </div>
            <p>
              Under MISAU Specific Objective 4, automated reminders serve as supportive scaffolding. A patient's lack of SMS confirmation triggers supportive contact, never penalty or assumption of treatment default.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}
