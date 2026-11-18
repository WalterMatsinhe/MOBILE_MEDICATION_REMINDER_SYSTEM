import { useState } from 'react'
import { 
  Home, 
  Users, 
  Calendar, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut, 
  Smartphone, 
  Menu, 
  X,
  Search,
  Activity,
  CheckCircle2,
  ChevronDown
} from 'lucide-react'

export default function ClinicianLayout({ 
  currentTab, 
  setCurrentTab, 
  onLogout, 
  onSwitchToPatientView,
  children 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  // Enterprise navigation items with real badge counts
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'pacientes', label: 'Patient Cohort', icon: Users, badge: '6' },
    { id: 'consultas', label: 'Appointments & Refills', icon: Calendar, badge: '5' },
    { id: 'lembretes', label: 'Reminder Channels', icon: Bell, badge: '180' },
    { id: 'relatorios', label: 'Clinical Reports', icon: BarChart3 },
    { id: 'configuracoes', label: 'System Settings', icon: Settings },
  ]

  const handleNavClick = (id) => {
    setCurrentTab(id)
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. ENTERPRISE CLINICAL SIDEBAR: REFINED DEEP SLATE/NAVY PALETTE */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0b1320] text-slate-300 flex flex-col justify-between border-r border-slate-800/80 transition-transform duration-200 ease-in-out shrink-0
        md:static md:translate-x-0 md:z-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex-1 overflow-y-auto">
          
          {/* Institution Brand Header */}
          <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/app-logo.png" 
                  alt="Clinical Portal Logo" 
                  className="w-8 h-8 object-contain shrink-0 drop-shadow-sm"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0b1320]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400">Clinical Portal</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded font-mono">v2.4</span>
                </div>
                <div className="text-sm font-bold text-white tracking-tight truncate">Health Center X</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">MISAU · Maputo Central</div>
              </div>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Section Label */}
          <div className="px-5 pt-5 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Care Management
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer font-medium text-left ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/30 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 font-medium ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Clinical Service Status Card */}
          <div className="mx-3 mt-6 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Dispatch Engine
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Vodacom / mCel MZ gateway connected. SMS queue running on schedule.
            </p>
          </div>
        </div>

        {/* Bottom User Profile & Session Controls */}
        <div className="p-3 border-t border-slate-800/80 bg-[#080e18] shrink-0">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">
                DA
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-white truncate">Dr. Almeida</p>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Active on duty" />
                </div>
                <p className="text-[10px] text-slate-400 truncate">Clinical Officer · ART</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition cursor-pointer"
              title="Sign Out of Clinical Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
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
        <header className="h-14 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 z-10">
          
          {/* Left: Menu Toggle & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <img 
              src="/app-logo.png" 
              alt="Healthcare System Logo" 
              className="w-6 h-6 object-contain md:hidden shrink-0" 
            />

            {/* Breadcrumb Hierarchy */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
              <span className="font-semibold text-slate-700 hidden sm:inline">Health Center X</span>
              <span className="text-slate-300 hidden sm:inline">/</span>
              <span className="font-semibold text-blue-600 capitalize">
                {currentTab === 'dashboard' ? 'Overview' : 
                 currentTab === 'pacientes' ? 'Patient Cohort' :
                 currentTab === 'consultas' ? 'Appointments & Refills' :
                 currentTab === 'lembretes' ? 'Reminder Channels' :
                 currentTab === 'relatorios' ? 'Clinical Reports' : 'System Settings'}
              </span>
            </div>
          </div>

          {/* Center: Global Quick Patient Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className={`relative w-full transition-all duration-150 ${searchFocused ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}>
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient by name, NID, or phone..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-9 pr-12 py-1.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* View Patient Phone Simulator Button */}
            <button
              onClick={onSwitchToPatientView}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200/80 transition cursor-pointer shadow-2xs"
              title="Inspect patient SMS & Voice simulator"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="hidden sm:inline">Patient Phone View</span>
              <span className="sm:hidden">Patient</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            {/* Shift & Connectivity Status */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
              <span className="text-slate-400 text-[11px] font-mono">08:30 Shift</span>
            </div>
          </div>
        </header>

        {/* Scrollable Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 min-w-0 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

    </div>
  )
}
