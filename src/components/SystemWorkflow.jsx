import { 
  UserPlus, 
  Smartphone, 
  CheckCircle2, 
  Stethoscope, 
  BarChart3, 
  PlusCircle, 
  ShieldCheck, 
  Heart,
  ChevronRight
} from 'lucide-react'

export default function SystemWorkflow({ onNavigate }) {
  const steps = [
    {
      num: 1,
      title: '1. Patient Registration',
      desc: 'Demographic details, caregiver contact, clinical condition, medication schedule, and clinic visits.',
      icon: UserPlus,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      screen: 'pacientes',
      btnText: 'View Patient Registry'
    },
    {
      num: 2,
      title: '2. Reminder Dispatch',
      desc: 'Automated medication, clinic visit, and refill alerts dispatched via SMS, Voice, and USSD.',
      icon: Smartphone,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      screen: 'lembretes',
      btnText: 'Explore Reminder Channels'
    },
    {
      num: 3,
      title: '3. Patient Acknowledgment',
      desc: 'Patients reply to SMS reminders (1 to confirm dose) without non-confirmation implying treatment failure.',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      screen: 'dashboard',
      btnText: 'View Adherence Flow'
    },
    {
      num: 4,
      title: '4. Clinical Follow-up',
      desc: 'Clinicians monitor confirmations and trigger active phone outreach for at-risk patients.',
      icon: Stethoscope,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      screen: 'dashboard',
      btnText: 'Open Clinical Dashboard'
    },
    {
      num: 5,
      title: '5. Monthly Reporting',
      desc: 'Aggregated adherence statistics, refill completion rates, and exportable PDF/Excel reports.',
      icon: BarChart3,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
      screen: 'relatorios',
      btnText: 'View Monthly Report'
    },
    {
      num: 6,
      title: '6. Modular Expansion',
      desc: 'Architected to easily extend to hypertension, epilepsy, asthma, and other chronic conditions.',
      icon: PlusCircle,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      screen: 'dashboard',
      btnText: 'Check Readiness'
    }
  ]

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
            <Heart className="w-3.5 h-3.5 text-blue-600 fill-blue-600/20" /> Healthcare Methodology & Architecture
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            System Workflow & Operational Cycle
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            End-to-end healthcare workflow designed for chronic medication management: from clinic enrollment, 
            multi-channel reminder delivery, patient self-acknowledgment, to real-time clinician oversight.
          </p>
        </div>
      </div>

      {/* Step-by-Step Flow Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div 
              key={step.num}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition group relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-blue-600 font-mono">
                    STAGE 0{step.num}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(step.screen)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group-hover:translate-x-0.5 transition cursor-pointer"
                >
                  <span>{step.btnText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Security & Privacy Banner */}
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-emerald-600/20 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-1 text-center sm:text-left flex-1">
          <h2 className="text-lg font-bold">Data Security & Patient Privacy</h2>
          <p className="text-xs text-emerald-100 leading-relaxed max-w-4xl">
            Protection of confidential patient records in accordance with national health guidelines, end-to-end transmission encryption, 
            role-based access controls (clinician vs. patient vs. administrator), and informed consent for family caregiver outreach.
          </p>
        </div>
      </div>

    </div>
  )
}
