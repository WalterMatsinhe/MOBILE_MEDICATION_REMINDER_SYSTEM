import { useState } from 'react'
import { 
  Home, 
  User, 
  Calendar, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut, 
  Smartphone, 
  Menu, 
  X
} from 'lucide-react'

export default function ClinicianLayout({ 
  currentTab, 
  setCurrentTab, 
  onLogout, 
  onSwitchToPatientView,
  children 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 6 Tabs in English matching the exact visual style of the reference image
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'pacientes', label: 'Patients', icon: User },
    { id: 'consultas', label: 'Appointments', icon: Calendar },
    { id: 'lembretes', label: 'Reminders', icon: Bell },
    { id: 'relatorios', label: 'Reports', icon: BarChart3 },
    { id: 'configuracoes', label: 'Settings', icon: Settings },
  ]

  const handleNavClick = (id) => {
    setCurrentTab(id)
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen w-full bg-[#f4f7fb] overflow-hidden font-sans">
      
      {/* 1. SIDEBAR: DEEP MEDICAL NAVY BLUE WITH VIBRANT ACTIVE TAB HIGHLIGHT */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 bg-[#063363] text-white flex flex-col justify-between border-r border-[#05284f] transition-transform duration-200 ease-in-out shrink-0
        md:static md:translate-x-0 md:z-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex-1 overflow-y-auto pt-2">
          
          {/* Top Brand Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 mb-2">
            <div className="flex items-center gap-3">
              <img 
                src="/app-logo.png" 
                alt="Clinical Portal Logo" 
                className="w-9 h-9 object-contain drop-shadow-md shrink-0 transition-transform hover:scale-105"
              />
              <div className="min-w-0">
                <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider truncate">Clinical Portal</div>
                <div className="text-sm font-extrabold text-white tracking-tight leading-tight truncate">Health Center X</div>
              </div>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links (Home, Patients, Appointments, Reminders, Reports, Settings) */}
          <nav className="px-2.5 py-2 space-y-1.5 text-[13px]">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition duration-150 cursor-pointer font-medium ${
                    isActive
                      ? 'bg-[#1E75E5] text-white font-bold shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/40' // Exact vibrant electric blue highlight
                      : 'text-[#C2DBF5] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-[#A0C4EA]'}`} />
                  <span className="tracking-wide">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Sign Out */}
        <div className="p-3.5 border-t border-white/10 space-y-2.5 shrink-0 bg-[#042549]/60">
          <div className="flex items-center gap-2.5 px-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/30 text-blue-200 flex items-center justify-center font-bold text-xs border border-blue-400/30 shrink-0">
              DA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Dr. Almeida</p>
              <p className="text-[10px] text-blue-200/80 truncate">Clinical Medicine Officer</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-rose-500/30 hover:text-rose-200 text-blue-100 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer only (< md) */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* 2. MAIN APPLICATION WORKSPACE */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <img 
              src="/app-logo.png" 
              alt="Healthcare System Logo" 
              className="w-7 h-7 object-contain md:hidden shrink-0" 
            />

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium truncate">
              <span className="hidden sm:inline truncate">Chronic Disease Medication Reminder & Follow-up System</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-bold text-slate-800 text-xs sm:text-sm truncate">HIV & Diabetes</span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onSwitchToPatientView}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition cursor-pointer"
              title="Inspect patient SMS notification experience"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="hidden sm:inline">View Patient SMS</span>
              <span className="sm:hidden">SMS</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-1.5 pl-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-700 hidden sm:inline">Online</span>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 min-w-0 bg-[#f4f7fb]">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

    </div>
  )
}
