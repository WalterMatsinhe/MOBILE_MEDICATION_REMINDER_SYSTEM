import { useState } from 'react'
import { User, Lock } from 'lucide-react'

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('dr.almeida')
  const [password, setPassword] = useState('••••••••')

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanUser = username.trim().toLowerCase()
    
    // Smart routing based on entered credential:
    // If user enters a phone number (e.g., 84...) or 'joao'/'patient', open patient SMS view; otherwise doctor view.
    if (cleanUser.startsWith('8') || cleanUser.includes('joao') || cleanUser.includes('patient') || cleanUser.includes('paciente')) {
      onLoginSuccess({
        role: 'patient',
        name: 'João Manuel Chivango',
        subtitle: 'Patient (HIV & Diabetes)'
      })
    } else {
      onLoginSuccess({
        role: 'doctor',
        name: 'Dr. Almeida',
        subtitle: 'Clinical Medicine Officer'
      })
    }
  }

  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden relative flex items-center justify-center p-3 font-sans select-none bg-[#030914]">
      
      {/* 1. Authentic Widescreen Background: Centro de Saúde, Moçambique with subtle blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center sm:bg-[center_bottom] bg-no-repeat scale-102 transition-all duration-300"
        style={{
          backgroundImage: 'url("/centro-de-saude.jpg")',
          filter: 'contrast(1.08) saturate(1.15) brightness(0.88) blur(1.5px)',
        }}
      />
      
      {/* 2. Professional Contrast Overlay - Gradient + Vignette for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/35 to-sky-950/45 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.15)_0%,_rgba(0,0,0,0.55)_100%)] pointer-events-none" />

      {/* 3. High-Contrast Floating Login Card */}
      <div className="relative z-10 w-full max-w-[325px] sm:max-w-[345px] animate-fade-in">
        <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.75),0_0_35px_rgba(0,0,0,0.25)] px-6 py-5 sm:px-7 sm:py-6 space-y-3.5 border border-white/90 ring-1 ring-black/10">
          
          {/* Official Healthcare Blue Heart with Cross Logo */}
          <div className="flex justify-center -mt-1">
            <img 
              src="/app-logo.png" 
              alt="Health Center Logo" 
              className="w-13 h-13 sm:w-15 sm:h-15 object-contain drop-shadow-md transition-transform hover:scale-105 duration-150"
            />
          </div>

          {/* Title Header */}
          <div className="text-center space-y-0.5">
            <h1 className="text-[15px] sm:text-[16px] font-extrabold text-[#112d4e] leading-tight tracking-tight">
              Chronic Disease Reminder &<br />Follow-up System
            </h1>
            <p className="text-[11px] font-semibold text-[#112d4e] pt-0.5">
              <span className="text-[#0066FF] font-bold">HIV</span>
              <span className="text-slate-400 mx-1.5">|</span>
              <span className="text-[#0066FF] font-bold">Diabetes</span>
              <span className="text-slate-400 mx-1.5">|</span>
              <span className="text-slate-500">Others</span>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-0.5">
            
            {/* Input 1: Username */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50/80 hover:bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition shadow-2xs font-medium"
              />
            </div>

            {/* Input 2: Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50/80 hover:bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition shadow-2xs font-medium"
              />
            </div>

            {/* Button: Sign In */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-[#005ce6] to-[#0066FF] hover:from-[#0052cc] hover:to-[#005ce6] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/35 transition cursor-pointer mt-0.5"
            >
              Sign In
            </button>

            {/* Bottom Links */}
            <div className="space-y-1 pt-0.5 text-center">
              <div>
                <a 
                  href="#forgot" 
                  onClick={(e) => e.preventDefault()} 
                  className="text-[11px] text-[#0066FF] hover:underline font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <div>
                <p className="text-[10px] sm:text-[10.5px] text-slate-600 font-medium leading-tight">
                  Together for better treatment adherence
                </p>
              </div>
            </div>

            {/* Helper pill for prototype demo */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-medium">Quick Access:</span>
              <div className="flex items-center gap-1.5 font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setUsername('dr.almeida')
                    setPassword('••••••••')
                  }}
                  className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Doctor
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setUsername('841234567')
                    setPassword('••••••••')
                  }}
                  className="text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
                >
                  Patient (SMS)
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>

    </div>
  )
}
