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
    <div className="space-y-4 sm:space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Upcoming Appointments & Medication Refills</h1>
          <p className="text-xs text-slate-500 mt-1">
            Specific Objectives 2 & 5: Centralized management of clinic attendance dates and drug collection schedules
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
              activeTab === 'all' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('consultas')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'consultas' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Appointments
          </button>
          <button
            onClick={() => setActiveTab('levantamentos')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'levantamentos' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Refills
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar Row */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        
        {/* Disease chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'HIV', 'Diabetes'].map((category) => (
            <button
              key={category}
              onClick={() => setDiseaseFilter(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer shrink-0 ${
                diseaseFilter === category
                  ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Patient</th>
                <th className="py-3 px-4 font-semibold">Condition</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5 whitespace-nowrap">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {item.patient.charAt(0)}
                    </div>
                    <span>{item.patient}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {item.condition}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-600 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`font-semibold ${item.type === 'Appointment' ? 'text-blue-700' : 'text-indigo-700'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {item.status === 'Confirmed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed
                      </span>
                    )}
                    {item.status === 'Scheduled' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> Scheduled
                      </span>
                    )}
                    {item.status === 'Reminder sent' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Send className="w-3.5 h-3.5 text-amber-500" /> Reminder sent
                      </span>
                    )}
                    {item.status === 'Unconfirmed' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Unconfirmed
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => triggerReminder(item.patient, item.type)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                    >
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-3 sm:p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <span className="text-xs text-slate-500">
            Showing <strong>{filtered.length}</strong> scheduled records
          </span>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(3, p + 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              disabled={currentPage === 3}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
