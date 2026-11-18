import { useState } from 'react'
import { 
  Users, 
  UserPlus, 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Save,
  X
} from 'lucide-react'

export default function PatientsManagement({ patients, onAddPatient, initialOpenForm = false }) {
  const [isFormOpen, setIsFormOpen] = useState(initialOpenForm)
  const [searchQuery, setSearchQuery] = useState('')
  const [conditionFilter, setConditionFilter] = useState('All')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [selectedPatientModal, setSelectedPatientModal] = useState(null)

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    neighborhood: 'Maputo',
    houseNumber: '',
    phone: '',
    contactPerson: '',
    relationship: 'Sister',
    condition: 'HIV',
    healthCenter: 'Health Center X',
    doctor: 'Dr. Almeida',
    nextAppointment: '2026-10-20',
    nextRefill: '2026-10-20',
    medication: 'ART',
    medTime: '08:00',
    frequency: 'Daily'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const newPatient = {
      id: `P-${Math.floor(Math.random() * 900) + 100}`,
      name: formData.name,
      age: parseInt(formData.age, 10) || 40,
      gender: formData.gender,
      neighborhood: formData.neighborhood,
      houseNumber: formData.houseNumber,
      phone: formData.phone,
      contactPerson: formData.contactPerson,
      relationship: formData.relationship,
      condition: formData.condition,
      healthCenter: formData.healthCenter,
      doctor: formData.doctor,
      nextAppointment: formData.nextAppointment,
      nextRefill: formData.nextRefill,
      medications: [
        { name: formData.medication, dose: '1 dose', time: formData.medTime, frequency: formData.frequency }
      ],
      status: 'Stable',
      lastConfirmed: 'Just Registered',
      unconfirmedRemindersCount: 0
    }

    onAddPatient(newPatient)
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      setIsFormOpen(false)
    }, 1500)
  }

  // Filter patients
  const filteredPatients = patients.filter(p => {
    if (conditionFilter !== 'All' && !p.condition.includes(conditionFilter)) return false
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      const matchName = p.name.toLowerCase().includes(q)
      const matchPhone = p.phone.toLowerCase().includes(q)
      const matchArea = p.neighborhood.toLowerCase().includes(q)
      if (!matchName && !matchPhone && !matchArea) return false
    }
    return true
  })

  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Users className="w-4 h-4" /> Chronic Disease Clinical Management
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isFormOpen ? 'New Patient Registration' : 'Patient Registry'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isFormOpen 
              ? 'Record demographic details, caregiver contacts, appointments, and medication refill dates.'
              : `Total of ${patients.length} patients monitored for HIV and Diabetes.`}
          </p>
        </div>

        <div className="shrink-0">
          {isFormOpen ? (
            <button
              onClick={() => setIsFormOpen(false)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Registry
            </button>
          ) : (
            <button
              onClick={() => {
                setFormData({
                  name: '',
                  age: '',
                  gender: 'Male',
                  neighborhood: 'Maputo',
                  houseNumber: '',
                  phone: '',
                  contactPerson: '',
                  relationship: 'Sister',
                  condition: 'HIV',
                  healthCenter: 'Health Center X',
                  doctor: 'Dr. Almeida',
                  nextAppointment: '2026-10-20',
                  nextRefill: '2026-10-20',
                  medication: 'ART',
                  medTime: '08:00',
                  frequency: 'Daily'
                })
                setIsFormOpen(true)
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> New Patient
            </button>
          )}
        </div>
      </div>

      {/* VIEW A: REGISTRATION FORM */}
      {isFormOpen ? (
        <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xs space-y-6 sm:space-y-8">
          
          {saveSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Patient registered successfully and enrolled into the automated SMS reminder cycle!</span>
            </div>
          )}

          {/* Section 1: Personal Information */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. João Manuel Chivango"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1 lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="45"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-1 lg:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Neighborhood / City</label>
                <input
                  type="text"
                  name="neighborhood"
                  placeholder="e.g. Central Maputo, Polana Caniço"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">House Number</label>
                <input
                  type="text"
                  name="houseNumber"
                  placeholder="123"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Patient Phone (SMS)</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="84 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Caregiver Contact</label>
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="82 765 4321"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Relationship</label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Sister">Sister</option>
                  <option value="Brother">Brother</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Friend/Caregiver">Friend / Caregiver</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Follow-up Details */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Clinical Follow-up Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm font-bold bg-blue-50/60 border border-blue-200 text-blue-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="HIV">HIV</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="HIV & Diabetes">HIV & Diabetes (Dual Condition)</option>
                  <option value="Other Chronic">Other Chronic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Health Facility</label>
                <input
                  type="text"
                  name="healthCenter"
                  value={formData.healthCenter}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Attending Clinician</label>
                <input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Next Clinic Appointment</label>
                <input
                  type="date"
                  name="nextAppointment"
                  value={formData.nextAppointment}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Next Medication Refill Date</label>
                <input
                  type="date"
                  name="nextRefill"
                  value={formData.nextRefill}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Medications & Schedules */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Medications & Schedules
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Medication Name</label>
                <input
                  type="text"
                  name="medication"
                  placeholder="e.g. ART, Metformin, Insulin"
                  value={formData.medication}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Reminder Time</label>
                <input
                  type="time"
                  name="medTime"
                  value={formData.medTime}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Daily">Daily (1x daily)</option>
                  <option value="Every 12h">Every 12h (2x daily)</option>
                  <option value="Every 8h">Every 8h (3x daily)</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Patient
            </button>
          </div>
        </form>
      ) : (
        /* VIEW B: PATIENTS LIST TABLE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-4 sm:p-5">
          
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'HIV', 'Diabetes'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                    conditionFilter === cond
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or phone..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Table Container with smooth horizontal scroll */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[620px]">
              <thead className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50">
                <tr>
                  <th className="py-3 px-3 font-bold">Patient</th>
                  <th className="py-3 px-3 font-bold">Condition</th>
                  <th className="py-3 px-3 font-bold">Phone</th>
                  <th className="py-3 px-3 font-bold">Next Appt</th>
                  <th className="py-3 px-3 font-bold">Next Refill</th>
                  <th className="py-3 px-3 font-bold">Status</th>
                  <th className="py-3 px-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-bold text-slate-900 flex items-center gap-2.5 whitespace-nowrap">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div>{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{p.neighborhood} • {p.age} yrs ({p.gender})</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        p.condition.includes('HIV') && p.condition.includes('Diabetes')
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : p.condition.includes('HIV')
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {p.condition}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-slate-600 whitespace-nowrap">
                      {p.phone}
                    </td>

                    <td className="py-3.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                      {p.nextAppointment}
                    </td>

                    <td className="py-3.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                      {p.nextRefill}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {p.unconfirmedRemindersCount >= 3 ? (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5" /> At Risk ({p.unconfirmedRemindersCount})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedPatientModal(p)}
                        className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Responsive Patient Detail Modal */}
      {selectedPatientModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">{selectedPatientModal.name}</h3>
                <p className="text-xs text-slate-500">ID: {selectedPatientModal.id} • {selectedPatientModal.condition}</p>
              </div>
              <button
                onClick={() => setSelectedPatientModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-3.5 sm:p-4 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div><strong>Age / Gender:</strong> {selectedPatientModal.age} yrs, {selectedPatientModal.gender}</div>
                <div><strong>Address:</strong> {selectedPatientModal.neighborhood}, #{selectedPatientModal.houseNumber || 'N/A'}</div>
                <div><strong>Phone:</strong> {selectedPatientModal.phone}</div>
                <div><strong>Caregiver:</strong> {selectedPatientModal.contactPerson} ({selectedPatientModal.relationship})</div>
                <div><strong>Next Appointment:</strong> {selectedPatientModal.nextAppointment}</div>
                <div><strong>Next Refill:</strong> {selectedPatientModal.nextRefill}</div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <strong>Prescribed Medication:</strong>
                <p className="mt-0.5 text-slate-600">{selectedPatientModal.medications?.[0]?.name} at {selectedPatientModal.medications?.[0]?.time} ({selectedPatientModal.medications?.[0]?.frequency})</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPatientModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
