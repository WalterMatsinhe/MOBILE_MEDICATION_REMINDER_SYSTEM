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
  ChevronRight 
} from 'lucide-react'

export default function DoctorDashboard({ 
  patients, 
  appointments, 
  metrics, 
  onNavigate 
}) {
  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-xs border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Clinical Health Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Real-time monitoring of medication adherence, clinic appointments, and drug refills for HIV and Diabetes
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('pacientes')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>New Patient</span>
          </button>
        </div>
      </div>

      {/* Top 6 KPI Metric Cards (Responsive 2 cols on mobile -> 3 cols on tablet -> 6 cols on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
        
        {/* Card 1: Total Patients */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">Total Patients</span>
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{patients.length}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 truncate">Active in cohort</div>
          </div>
        </div>

        {/* Card 2: HIV */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-rose-100 shadow-xs hover:border-rose-300 transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-600">HIV</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500/20 shrink-0" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {patients.filter(p => p.condition.includes('HIV')).length}
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">Regular ART</div>
          </div>
        </div>

        {/* Card 3: Diabetes */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-amber-100 shadow-xs hover:border-amber-300 transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-600">Diabetes</span>
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {patients.filter(p => p.condition.includes('Diabetes')).length}
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">Insulin / Metformin</div>
          </div>
        </div>

        {/* Card 4: Reminders Today */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">Reminders</span>
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{metrics.reminders.todayTotal}</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">SMS, App & USSD</div>
          </div>
        </div>

        {/* Card 5: Confirmed */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-600">Confirmed</span>
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600">{metrics.reminders.todayConfirmed}</div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5 truncate">84.4% adherence</div>
          </div>
        </div>

        {/* Card 6: Unconfirmed */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-rose-100 shadow-xs hover:border-rose-300 transition flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-600">Unconfirmed</span>
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 shrink-0" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-rose-600">{metrics.reminders.todayNotConfirmed}</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">For outreach</div>
          </div>
        </div>

      </div>

      {/* Split Grid: Upcoming Appointments (Left) + Patients at Risk (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* LEFT 2 COLS: Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-4 sm:p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Upcoming Appointments & Medication Refills</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Priority clinical schedules</p>
            </div>
            <button 
              onClick={() => onNavigate('consultas')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table Container with smooth horizontal scrolling on mobile */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-bold">Patient</th>
                  <th className="py-2.5 font-bold">Date</th>
                  <th className="py-2.5 font-bold">Type</th>
                  <th className="py-2.5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {appointments.slice(0, 5).map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {apt.patient.charAt(0)}
                      </div>
                      <span>{apt.patient}</span>
                    </td>
                    <td className="py-3 font-mono text-slate-600 whitespace-nowrap">{apt.date}</td>
                    <td className="py-3 whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{apt.type}</span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      {apt.status === 'Confirmed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmed
                        </span>
                      )}
                      {apt.status === 'Scheduled' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Scheduled
                        </span>
                      )}
                      {apt.status === 'Reminder sent' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Reminder sent
                        </span>
                      )}
                      {apt.status === 'Unconfirmed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Unconfirmed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT 1 COL: Patients at Risk */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Patients at Risk</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
              Outreach
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Patients flagged for proactive follow-up and clinical counseling:
          </p>

          <div className="space-y-2.5 sm:space-y-3">
            <div 
              onClick={() => onNavigate('pacientes')}
              className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">Unconfirmed</div>
                  <div className="text-[10px] text-slate-400 truncate">3+ reminders without response</div>
                </div>
              </div>
              <div className="text-base sm:text-lg font-black text-rose-600 shrink-0 ml-2">
                {metrics.riskMetrics.unconfirmed3Plus}
              </div>
            </div>

            <div 
              onClick={() => onNavigate('consultas')}
              className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">Overdue Visit</div>
                  <div className="text-[10px] text-slate-400 truncate">30+ days overdue</div>
                </div>
              </div>
              <div className="text-base sm:text-lg font-black text-amber-600 shrink-0 ml-2">
                {metrics.riskMetrics.missedAppointment30Days}
              </div>
            </div>

            <div 
              onClick={() => onNavigate('consultas')}
              className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">Delayed Refill</div>
                  <div className="text-[10px] text-slate-400 truncate">Risk of ART stockout</div>
                </div>
              </div>
              <div className="text-base sm:text-lg font-black text-indigo-600 shrink-0 ml-2">
                {metrics.riskMetrics.delayedRefill}
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900 leading-tight">
            <strong>Objective 4:</strong> Non-confirmation triggers support outreach, never treated as proof of treatment abandonment.
          </div>
        </div>

      </div>

    </div>
  )
}
