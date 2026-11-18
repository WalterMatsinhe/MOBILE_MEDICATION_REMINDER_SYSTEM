import { useState } from 'react'
import { 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  Activity, 
  Package
} from 'lucide-react'

export default function MonthlyReport({ metrics }) {
  const [selectedMonth, setSelectedMonth] = useState('September 2026')
  const [downloadNotice, setDownloadNotice] = useState(null)

  const handleExport = (type) => {
    setDownloadNotice(`${type} report for "${selectedMonth}" generated successfully!`)
    setTimeout(() => setDownloadNotice(null), 3500)
  }

  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      
      {/* Top Controls & Header Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="September 2026">September 2026</option>
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
            <option value="June 2026">June 2026</option>
          </select>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => handleExport('PDF')}
            className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Generate PDF
          </button>
          <button
            onClick={() => handleExport('Excel (.xlsx)')}
            className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Export Excel
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Main Report Document Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 space-y-6 sm:space-y-8">
        
        {/* Report Title */}
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img 
              src="/app-logo.png" 
              alt="Health Center X Logo" 
              className="w-11 h-11 object-contain drop-shadow-sm shrink-0"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Monthly Adherence Report – {selectedMonth}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Specific Objective 5: Comprehensive reports on medication schedules, clinic attendance, and medication refill dates
              </p>
            </div>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="text-xs font-mono text-slate-400">Issued: Nov 19, 2026</span>
            <div className="text-xs font-bold text-blue-600">Health Center X</div>
          </div>
        </div>

        {/* 4 Primary Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          
          {/* Block 1: Total Patients */}
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 sm:space-y-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Total Patients</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{metrics.totalPatients}</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" /> HIV
                </span>
                <span className="font-bold text-slate-900">{metrics.hivPatients}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Activity className="w-3.5 h-3.5 text-amber-500" /> Diabetes
                </span>
                <span className="font-bold text-slate-900">{metrics.diabetesPatients}</span>
              </div>
            </div>
          </div>

          {/* Block 2: Reminders */}
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 sm:space-y-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Reminders</span>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Dispatched</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {metrics.reminders.monthlySent.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Confirmed
                </span>
                <span className="font-bold text-emerald-700 whitespace-nowrap">
                  {metrics.reminders.monthlyConfirmed.toLocaleString()} ({metrics.reminders.monthlyConfirmedPct})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-rose-600 font-medium truncate">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Unconfirmed
                </span>
                <span className="font-bold text-rose-600 whitespace-nowrap">
                  {metrics.reminders.monthlyUnconfirmed} ({metrics.reminders.monthlyUnconfirmedPct})
                </span>
              </div>
            </div>
          </div>

          {/* Block 3: Appointments */}
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 sm:space-y-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Appointments</span>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Scheduled</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{metrics.consultations.scheduled}</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Attended
                </span>
                <span className="font-bold text-emerald-700 whitespace-nowrap">
                  {metrics.consultations.confirmed} ({metrics.consultations.confirmedPct})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-rose-600 font-medium truncate">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Unconfirmed
                </span>
                <span className="font-bold text-rose-600 whitespace-nowrap">
                  {metrics.consultations.unconfirmed} ({metrics.consultations.unconfirmedPct})
                </span>
              </div>
            </div>
          </div>

          {/* Block 4: Medication Refills */}
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 sm:space-y-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Medication Refills</span>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Scheduled</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{metrics.refills.scheduled}</div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium truncate">
                  <Package className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Dispensed
                </span>
                <span className="font-bold text-emerald-700 whitespace-nowrap">
                  {metrics.refills.completed} ({metrics.refills.completedPct})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-amber-700 font-medium truncate">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Pending
                </span>
                <span className="font-bold text-amber-700 whitespace-nowrap">
                  {metrics.refills.pending} ({metrics.refills.pendingPct})
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Progress Breakdown */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 sm:space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Overall Treatment Adherence & Pharmacy Refill Rates
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>SMS / Mobile Reminder Adherence Rate</span>
                <span className="text-emerald-600 font-bold">87.4%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '87.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Clinic Appointment Attendance Rate</span>
                <span className="text-blue-600 font-bold">90.6%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '90.6%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Antiretroviral & Diabetes Drug Refill Completion</span>
                <span className="text-indigo-600 font-bold">92.0%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Conclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs text-slate-600">
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="font-bold text-slate-800">HIV Cohort Findings:</span>
            <p>
              Viral load suppression and antiretroviral retention achieved 92.0% aided by automated refill reminders, preventing critical treatment interruptions.
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <span className="font-bold text-slate-800">Diabetes Cohort Findings:</span>
            <p>
              Synchronized pre-meal reminders for insulin and metformin significantly reduced missed doses and improved self-reported adherence.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}
