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
  ArrowUpRight,
  TrendingUp,
  Radio,
  Download,
  Check,
  Send,
  Sparkles,
  Info
} from 'lucide-react'

export default function DoctorDashboard({ 
  patients, 
  appointments, 
  metrics, 
  onNavigate 
}) {
  const [filterType, setFilterType] = useState('all') // 'all', 'Appointment', 'Medication Refill'
  const [selectedDayIndex, setSelectedDayIndex] = useState(6) // default to Sunday (today)
  const [activeTimeframe, setActiveTimeframe] = useState('7d') // '7d', '30d', 'quarter'
  const [toastMessage, setToastMessage] = useState(null)

  // 7-day longitudinal adherence data (Mon - Sun)
  const weeklyData = [
    { day: 'Mon', date: 'Nov 13', dispatched: 172, confirmed: 142, unconfirmed: 30, rate: 82.5, sms: 124, voice: 31, ussd: 17 },
    { day: 'Tue', date: 'Nov 14', dispatched: 178, confirmed: 153, unconfirmed: 25, rate: 86.0, sms: 128, voice: 32, ussd: 18 },
    { day: 'Wed', date: 'Nov 15', dispatched: 175, confirmed: 147, unconfirmed: 28, rate: 84.0, sms: 126, voice: 31, ussd: 18 },
    { day: 'Thu', date: 'Nov 16', dispatched: 182, confirmed: 162, unconfirmed: 20, rate: 89.0, sms: 131, voice: 33, ussd: 18 },
    { day: 'Fri', date: 'Nov 17', dispatched: 180, confirmed: 154, unconfirmed: 26, rate: 85.5, sms: 130, voice: 32, ussd: 18 },
    { day: 'Sat', date: 'Nov 18', dispatched: 176, confirmed: 155, unconfirmed: 21, rate: 88.0, sms: 127, voice: 31, ussd: 18 },
    { day: 'Sun', date: 'Nov 19', dispatched: 180, confirmed: 152, unconfirmed: 28, rate: 84.4, sms: 130, voice: 32, ussd: 18 }
  ]

  const selectedDay = weeklyData[selectedDayIndex]

  const filteredAppointments = appointments.filter(apt => {
    if (filterType === 'all') return true
    return apt.type === filterType
  })

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. PROFESSIONAL CLINICAL HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>MISAU Health Network</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">Maputo Central Health Center</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Unit MZ-042</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Clinical Health & Adherence Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Real-time longitudinal telemetry for HIV (ART) and Diabetes mellitus cohort. Dispatches automated multi-channel reminders and highlights patients requiring clinical support.
          </p>
        </div>

        {/* Action & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          
          {/* Timeframe selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium border border-slate-200">
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: 'quarter', label: 'Quarter' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTimeframe(t.id)}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  activeTimeframe === t.id 
                    ? 'bg-white text-slate-900 font-bold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Export Report button */}
          <button
            onClick={() => showToast('Weekly clinical adherence summary exported to PDF successfully!')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          {/* Register Patient primary button */}
          <button
            onClick={() => onNavigate('pacientes')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enroll Patient</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-between shadow-2xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-600">Generated</span>
        </div>
      )}

      {/* 2. 6 CLINICAL KPI CARDS WITH SPARKLINES (ZERO OVERFLOW, ZERO TRUNCATION) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
        
        {/* Card 1: Total Patients */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-slate-500 leading-tight truncate">
              Total Patients
            </span>
            <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
                {patients.length}
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded">
                100%
              </span>
            </div>
            
            {/* Mini Sparkline SVG */}
            <div className="h-4 w-full my-1.5">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,15 16,13 32,14 48,10 64,8 80,6 100,5"
                />
              </svg>
            </div>

            <div className="text-[10px] sm:text-[10.5px] text-emerald-600 font-semibold leading-tight truncate">
              Active in cohort
            </div>
          </div>
        </div>

        {/* Card 2: HIV */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-rose-600 leading-tight">
              HIV
            </span>
            <div className="w-5 h-5 rounded-md bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <Heart className="w-3 h-3 fill-rose-500/20" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
                {patients.filter(p => p.condition.includes('HIV')).length}
              </span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1 py-0.2 rounded">
                ART
              </span>
            </div>

            {/* Mini Sparkline SVG */}
            <div className="h-4 w-full my-1.5">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,12 20,12 40,10 60,10 80,8 100,8"
                />
              </svg>
            </div>

            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium leading-tight truncate">
              Regular ART
            </div>
          </div>
        </div>

        {/* Card 3: Diabetes */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-amber-600 leading-tight">
              Diabetes
            </span>
            <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Activity className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
                {patients.filter(p => p.condition.includes('Diabetes')).length}
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1 py-0.2 rounded">
                Glycemic
              </span>
            </div>

            {/* Mini Sparkline SVG */}
            <div className="h-4 w-full my-1.5">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,14 20,14 40,11 60,11 80,9 100,9"
                />
              </svg>
            </div>

            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium leading-tight truncate">
              Insulin / Metformin
            </div>
          </div>
        </div>

        {/* Card 4: Reminders */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-slate-500 leading-tight">
              Reminders
            </span>
            <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Bell className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-2xl xl:text-3xl font-black text-slate-900 leading-none">
                {metrics.reminders.todayTotal}
              </span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1 py-0.2 rounded">
                Today
              </span>
            </div>

            {/* Mini Sparkline SVG */}
            <div className="h-4 w-full my-1.5">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,8 16,14 32,7 48,12 64,5 80,9 100,6"
                />
              </svg>
            </div>

            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium leading-tight truncate">
              SMS, App & USSD
            </div>
          </div>
        </div>

        {/* Card 5: Confirmed */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-emerald-600 leading-tight">
              Confirmed
            </span>
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-2xl xl:text-3xl font-black text-emerald-600 leading-none">
                {metrics.reminders.todayConfirmed}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                84.4%
              </span>
            </div>

            {/* Mini Sparkline SVG */}
            <div className="h-4 w-full my-1.5">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,12 16,7 32,10 48,5 64,8 80,6 100,7"
                />
              </svg>
            </div>

            <div className="text-[10px] sm:text-[10.5px] text-emerald-700 font-semibold leading-tight truncate">
              84.4% adherence
            </div>
          </div>
        </div>

        {/* Card 6: Unconfirmed (Immune to overflow) */}
        <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wide text-rose-600 leading-tight">
              Unconfirmed
            </span>
            <div className="w-5 h-5 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-3 h-3" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-2xl xl:text-3xl font-black text-rose-600 leading-none">
                {metrics.reminders.todayNotConfirmed}
              </span>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1 py-0.2 rounded">
                Priority
              </span>
            </div>

            {/* Mini Sparkline SVG */}
            <div className="h-4 w-full my-1.5">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,6 16,11 32,8 48,13 64,10 80,12 100,11"
                />
              </svg>
            </div>

            <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium leading-tight truncate">
              For outreach
            </div>
          </div>
        </div>

      </div>

      {/* 3. INTERACTIVE CLINICAL CHARTS & TELEMETRY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART 1 (LEFT 2 COLS): 7-Day Adherence & Confirmation Longitudinal Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4">
          
          {/* Chart Header & Day Inspector */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">
                  7-Day Longitudinal Adherence & Reminder Confirmations
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparison of daily automated reminder alerts sent vs verified dose confirmations.
              </p>
            </div>

            {/* Adherence Rate Badge for Selected Day */}
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  {selectedDay.date} ({selectedDay.day})
                </div>
                <div className="text-lg font-black text-emerald-600 leading-none">
                  {selectedDay.rate}% <span className="text-[11px] font-medium text-slate-500">adherence</span>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Interactive SVG Adherence Chart */}
          <div className="relative pt-4 pb-2">
            
            {/* 85% Target Adherence Line indicator */}
            <div className="absolute top-10 left-0 right-0 flex items-center justify-between pointer-events-none z-10 px-2">
              <div className="w-full border-b border-dashed border-emerald-500/50" />
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 ml-2">
                MISAU Target: 85%
              </span>
            </div>

            {/* SVG Visual Area & Bar Chart */}
            <div className="h-56 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                
                <defs>
                  {/* Gradient for confirmed area */}
                  <linearGradient id="confirmedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Gradient for dispatched bar */}
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0, 50, 100, 150].map((y) => (
                  <line 
                    key={y} 
                    x1="0" 
                    y1={y} 
                    x2="700" 
                    y2={y} 
                    stroke="#f1f5f9" 
                    strokeWidth="1" 
                  />
                ))}

                {/* Background Bars: Dispatched Reminders */}
                {weeklyData.map((d, i) => {
                  const x = 50 + i * 100
                  const height = (d.dispatched / 200) * 160
                  const y = 180 - height
                  const isSelected = selectedDayIndex === i
                  return (
                    <g key={d.day} className="cursor-pointer" onClick={() => setSelectedDayIndex(i)}>
                      <rect
                        x={x - 22}
                        y={y}
                        width="44"
                        height={height}
                        rx="6"
                        fill={isSelected ? '#c7d2fe' : 'url(#barGradient)'}
                        stroke={isSelected ? '#6366f1' : '#cbd5e1'}
                        strokeWidth={isSelected ? '1.5' : '1'}
                        className="transition-all duration-200 hover:opacity-90"
                      />
                      <text
                        x={x}
                        y={y - 8}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill="#64748b"
                      >
                        {d.dispatched}
                      </text>
                    </g>
                  )
                })}

                {/* Smooth Area under Confirmed Line */}
                <path
                  d={`
                    M 50,${180 - (weeklyData[0].confirmed / 200) * 160}
                    C 100,${180 - (weeklyData[0].confirmed / 200) * 160} 100,${180 - (weeklyData[1].confirmed / 200) * 160} 150,${180 - (weeklyData[1].confirmed / 200) * 160}
                    C 200,${180 - (weeklyData[1].confirmed / 200) * 160} 200,${180 - (weeklyData[2].confirmed / 200) * 160} 250,${180 - (weeklyData[2].confirmed / 200) * 160}
                    C 300,${180 - (weeklyData[2].confirmed / 200) * 160} 300,${180 - (weeklyData[3].confirmed / 200) * 160} 350,${180 - (weeklyData[3].confirmed / 200) * 160}
                    C 400,${180 - (weeklyData[3].confirmed / 200) * 160} 400,${180 - (weeklyData[4].confirmed / 200) * 160} 450,${180 - (weeklyData[4].confirmed / 200) * 160}
                    C 500,${180 - (weeklyData[4].confirmed / 200) * 160} 500,${180 - (weeklyData[5].confirmed / 200) * 160} 550,${180 - (weeklyData[5].confirmed / 200) * 160}
                    C 600,${180 - (weeklyData[5].confirmed / 200) * 160} 600,${180 - (weeklyData[6].confirmed / 200) * 160} 650,${180 - (weeklyData[6].confirmed / 200) * 160}
                    L 650, 180 L 50, 180 Z
                  `}
                  fill="url(#confirmedGradient)"
                />

                {/* Confirmed Polyline (Glowing Green) */}
                <path
                  d={`
                    M 50,${180 - (weeklyData[0].confirmed / 200) * 160}
                    C 100,${180 - (weeklyData[0].confirmed / 200) * 160} 100,${180 - (weeklyData[1].confirmed / 200) * 160} 150,${180 - (weeklyData[1].confirmed / 200) * 160}
                    C 200,${180 - (weeklyData[1].confirmed / 200) * 160} 200,${180 - (weeklyData[2].confirmed / 200) * 160} 250,${180 - (weeklyData[2].confirmed / 200) * 160}
                    C 300,${180 - (weeklyData[2].confirmed / 200) * 160} 300,${180 - (weeklyData[3].confirmed / 200) * 160} 350,${180 - (weeklyData[3].confirmed / 200) * 160}
                    C 400,${180 - (weeklyData[3].confirmed / 200) * 160} 400,${180 - (weeklyData[4].confirmed / 200) * 160} 450,${180 - (weeklyData[4].confirmed / 200) * 160}
                    C 500,${180 - (weeklyData[4].confirmed / 200) * 160} 500,${180 - (weeklyData[5].confirmed / 200) * 160} 550,${180 - (weeklyData[5].confirmed / 200) * 160}
                    C 600,${180 - (weeklyData[5].confirmed / 200) * 160} 600,${180 - (weeklyData[6].confirmed / 200) * 160} 650,${180 - (weeklyData[6].confirmed / 200) * 160}
                  `}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points on Confirmed Line */}
                {weeklyData.map((d, i) => {
                  const x = 50 + i * 100
                  const y = 180 - (d.confirmed / 200) * 160
                  const isSelected = selectedDayIndex === i
                  return (
                    <g key={d.day} className="cursor-pointer" onClick={() => setSelectedDayIndex(i)}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? '6.5' : '4.5'}
                        fill="#ffffff"
                        stroke="#10b981"
                        strokeWidth={isSelected ? '3.5' : '2.5'}
                        className="transition-all duration-150"
                      />
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Day Selector Buttons & Labels */}
            <div className="grid grid-cols-7 text-center pt-2 gap-1">
              {weeklyData.map((d, i) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDayIndex(i)}
                  className={`py-1.5 px-1 rounded-lg transition text-xs cursor-pointer ${
                    selectedDayIndex === i 
                      ? 'bg-blue-600 text-white font-bold shadow-2xs' 
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <div className="font-bold">{d.day}</div>
                  <div className={`text-[10px] ${selectedDayIndex === i ? 'text-blue-100' : 'text-slate-400'}`}>
                    {d.rate}%
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Chart Footer: Legend & Day Telemetry Inspection */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-3 h-3 rounded bg-indigo-100 border border-indigo-300" />
                Dispatched Alerts
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                Confirmed Doses
              </span>
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              Selected Day: <strong>{selectedDay.confirmed} confirmed</strong> out of <strong>{selectedDay.dispatched} alerts</strong> ({selectedDay.unconfirmed} unconfirmed).
            </div>
          </div>

        </div>

        {/* CHART 2 (RIGHT 1 COL): Multi-Channel Mix & Refill Horizon */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-900">Carrier Dispatch Channels</h2>
              </div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Objective 3
              </span>
            </div>

            {/* Channel Breakdown Visual */}
            <div className="space-y-3">
              
              {/* Channel 1: SMS */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    SMS Notifications (72%)
                  </span>
                  <span className="font-mono text-slate-600 font-bold">130 / day</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '72%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>99.4% carrier delivery rate</span>
                  <span>88.2% confirmation</span>
                </div>
              </div>

              {/* Channel 2: Voice IVR */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Automated Voice Calls (18%)
                  </span>
                  <span className="font-mono text-slate-600 font-bold">32 / day</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full" style={{ width: '18%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Spoken Portuguese audio prompt</span>
                  <span>Keypress 1 to confirm</span>
                </div>
              </div>

              {/* Channel 3: USSD */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    USSD Carrier Menu (*123#) (10%)
                  </span>
                  <span className="font-mono text-slate-600 font-bold">18 / day</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '10%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Zero-rated for 2G feature phones</span>
                  <span>Interactive session</span>
                </div>
              </div>

            </div>
          </div>

          {/* Pharmacy Refill Runway Watch */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-blue-600" />
                Medication Supply Horizon
              </span>
              <span className="text-[10px] text-slate-500 font-normal">Next 30 Days</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="p-2 rounded bg-rose-50 border border-rose-200">
                <div className="font-black text-rose-700 text-sm">2</div>
                <div className="text-[10px] text-rose-800 font-medium">&lt; 3 days left</div>
              </div>
              <div className="p-2 rounded bg-amber-50 border border-amber-200">
                <div className="font-black text-amber-700 text-sm">1</div>
                <div className="text-[10px] text-amber-800 font-medium">4 - 10 days</div>
              </div>
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                <div className="font-black text-emerald-700 text-sm">3</div>
                <div className="text-[10px] text-emerald-800 font-medium">&gt; 10 days</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. SPLIT OPERATIONAL SECTION: SCHEDULED VISITS (LEFT) + CLINICAL OUTREACH QUEUE (RIGHT) */}
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
                        onClick={() => showToast(`SMS Reminder notification triggered for ${apt.patient}!`)}
                        className="text-slate-400 hover:text-blue-600 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition p-1 rounded hover:bg-blue-50"
                        title="Send SMS reminder"
                      >
                        <Send className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600">Remind</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-3 bg-slate-50/50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <span>Showing next 6 priority clinical items</span>
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
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
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
