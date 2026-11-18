import { useState } from 'react'
import { 
  Search, 
  Calendar, 
  Package, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Send
} from 'lucide-react'

export default function AppointmentsAndRefills({ 
  appointments, 
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState('all') // 'all', 'consultas', 'levantamentos'
  const [diseaseFilter, setDiseaseFilter] = useState('All') // 'All', 'HIV', 'Diabetes'
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusMessage, setStatusMessage] = useState(null)

  // Filter logic
  const filtered = appointments.filter(item => {
    // Tab filter
    if (activeTab === 'consultas' && item.type !== 'Appointment') return false
    if (activeTab === 'levantamentos' && item.type !== 'Medication Refill') return false

    // Disease filter
    if (diseaseFilter !== 'All' && !item.condition.includes(diseaseFilter)) return false

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      const matchName = item.patient.toLowerCase().includes(q)
      const matchStatus = item.status.toLowerCase().includes(q)
      if (!matchName && !matchStatus) return false
    }

    return true
  })

  const triggerReminder = (patientName, type) => {
    setStatusMessage(`SMS Reminder for ${type} sent successfully to ${patientName}!`)
    setTimeout(() => setStatusMessage(null), 3000)
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. PROFESSIONAL CLINICAL HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span>Clinical Scheduling</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">Specific Objective 2 & 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Appointments & Medication Refills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Centralized queue for doctor consultations, viral load reviews, and 30-day pharmacy dispensary refill schedules.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium self-start sm:self-auto border border-slate-200/80">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
              activeTab === 'all' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('consultas')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'consultas' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <span>Consultations</span>
          </button>
          <button
            onClick={() => setActiveTab('levantamentos')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'levantamentos' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-blue-600" />
            <span>Refills</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        
        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Disease chips */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium self-start sm:self-auto">
            {['All', 'HIV', 'Diabetes'].map((category) => (
              <button
                key={category}
                onClick={() => setDiseaseFilter(category)}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  diseaseFilter === category
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name or status..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3 px-4 font-semibold">Patient</th>
                <th className="py-3 px-3 font-semibold">Condition</th>
                <th className="py-3 px-3 font-semibold">Scheduled Date</th>
                <th className="py-3 px-3 font-semibold">Type</th>
                <th className="py-3 px-3 font-semibold">Confirmation Status</th>
                <th className="py-3 px-4 font-semibold text-right">Reminder Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Patient Name */}
                  <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                        {item.patient.charAt(0)}
                      </div>
                      <span>{item.patient}</span>
                    </div>
                  </td>

                  {/* Condition */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                      item.condition.includes('HIV') && item.condition.includes('Diabetes')
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : item.condition.includes('HIV')
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.condition}
                    </span>
                  </td>

                  {/* Scheduled Date */}
                  <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Type */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                      item.type === 'Appointment'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {item.type === 'Appointment' ? (
                        <Calendar className="w-3 h-3 text-purple-600" />
                      ) : (
                        <Package className="w-3 h-3 text-blue-600" />
                      )}
                      <span>{item.type}</span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {item.status === 'Confirmed' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Confirmed (SMS)
                      </span>
                    )}
                    {item.status === 'Scheduled' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Scheduled
                      </span>
                    )}
                    {item.status === 'Reminder sent' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Reminder Sent
                      </span>
                    )}
                    {item.status === 'Unconfirmed' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Unconfirmed
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => triggerReminder(item.patient, item.type)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition cursor-pointer border border-blue-200/60"
                      title="Dispatch automated SMS reminder to patient"
                    >
                      <Send className="w-3 h-3 text-blue-600" />
                      <span>Send SMS</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-3 sm:p-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 bg-slate-50/50 text-xs text-slate-500">
          <span>
            Showing <strong>{filtered.length}</strong> scheduled clinical events
          </span>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-40 cursor-pointer"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            {[1, 2].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-md text-xs font-semibold transition cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(2, p + 1))}
              className="w-7 h-7 rounded-md border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white disabled:opacity-40 cursor-pointer"
              disabled={currentPage === 2}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
