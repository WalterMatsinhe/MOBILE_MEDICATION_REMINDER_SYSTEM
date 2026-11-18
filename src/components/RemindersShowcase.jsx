import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Bell, 
  Volume2, 
  Smartphone, 
  Play, 
  Pause, 
  Send, 
  Check, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Radio,
  RotateCcw,
  Wifi,
  Signal,
  Phone,
  PhoneOff,
  MicOff,
  Grid,
  ChevronLeft,
  Plus,
  ArrowUp,
  Flashlight,
  Camera
} from 'lucide-react'

export default function RemindersShowcase() {
  // Voice simulation state
  const [isPlayingVoice, setIsPlayingVoice] = useState(false)
  const [voiceProgress, setVoiceProgress] = useState(8)

  // App notification state
  const [appConfirmed, setAppConfirmed] = useState(false)
  const [appSnoozed, setAppSnoozed] = useState(false)

  // USSD simulation state
  const [ussdStep, setUssdStep] = useState('menu') // 'menu', '1', '2', '3', '4'

  // SMS live test simulation
  const [smsReplied, setSmsReplied] = useState(false)
  const [broadcastActive, setBroadcastActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isPlayingVoice) {
      interval = setInterval(() => {
        setVoiceProgress((prev) => {
          if (prev >= 25) {
            setIsPlayingVoice(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlayingVoice])

  const toggleVoice = () => {
    setIsPlayingVoice(!isPlayingVoice)
  }

  const triggerBroadcast = () => {
    setBroadcastActive(true)
    setTimeout(() => setBroadcastActive(false), 3500)
  }

  return (
    <div className="w-full flex flex-col space-y-3 font-sans">
      
      {/* 1. Header Bar */}
      <div className="bg-white rounded-xl px-4 py-3 shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <img 
            src="/app-logo.png" 
            alt="Reminders Showcase Logo" 
            className="w-9 h-9 object-contain shrink-0 drop-shadow-sm transition-transform hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                Multi-Channel Reminder Channels
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                <ShieldCheck className="w-3 h-3" /> Objective 3
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-tight mt-0.5">
              Interactive previews for SMS, Push Alerts, Voice Calls, and USSD carrier sessions
            </p>
          </div>
        </div>

        <button
          onClick={triggerBroadcast}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/20 flex items-center gap-1.5 transition cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5" /> 
          <span>Trigger Test Broadcast</span>
        </button>
      </div>

      {/* Broadcast alert toast */}
      {broadcastActive && (
        <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center justify-between animate-fade-in shadow-xs">
          <span className="font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Simulated test reminders dispatched across all 4 patient channels!
          </span>
          <span className="font-mono text-[11px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
            All Channels: Delivered
          </span>
        </div>
      )}

      {/* 2. All 4 Multi-Channel iPhones Side-by-Side with True iPhone Dimensions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">

        {/* ================= CHANNEL 1: iPHONE SMS (MESSAGES) ================= */}
        <div className="flex flex-col items-center">
          <div className="w-[210px] sm:w-[220px] h-[430px] bg-[#161618] rounded-[38px] p-[6px] shadow-lg border-2 border-slate-700/80 flex flex-col justify-between relative ring-1 ring-white/5 select-none shrink-0">
            
            {/* Screen Inner */}
            <div className="w-full h-full bg-[#F2F2F7] rounded-[32px] overflow-hidden flex flex-col justify-between relative text-slate-900 shadow-inner">
              
              {/* Dynamic Island */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="w-14 h-4 bg-black rounded-full flex items-center justify-between px-1.5 shadow-2xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40"></div>
                </div>
              </div>

              {/* Status bar */}
              <div className="pt-1.5 px-4 pb-1 flex items-center justify-between text-[10px] z-20 shrink-0 font-semibold bg-white/70 backdrop-blur-md">
                <span className="font-bold">9:41</span>
                <div className="flex items-center gap-1">
                  <Signal className="w-2.5 h-2.5" />
                  <Wifi className="w-2.5 h-2.5" />
                  <div className="w-3.5 h-1.5 border border-current rounded-3xs p-0.5 flex items-center">
                    <div className="h-full bg-current w-full rounded-4xs"></div>
                  </div>
                </div>
              </div>

              {/* iOS Messages Header */}
              <div className="bg-white/85 px-2 py-1 border-b border-[#C6C6C8] flex items-center justify-between shrink-0 shadow-2xs">
                <div className="flex items-center text-blue-500 text-[10px]">
                  <ChevronLeft className="w-3.5 h-3.5 -ml-1" />
                </div>
                <div className="flex flex-col items-center">
                  <img 
                    src="/app-logo.png" 
                    alt="Health Center X" 
                    className="w-5 h-5 object-contain"
                  />
                  <span className="font-bold text-[9.5px] text-slate-900 leading-none mt-0.5">Health Center X</span>
                </div>
                <Phone className="w-3 h-3 text-blue-500" />
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-2 flex flex-col justify-between overflow-y-auto space-y-1.5 text-[10px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="text-[8px] text-center text-slate-400 font-bold uppercase">
                  Today 08:00
                </div>

                <div className="space-y-1.5">
                  {/* Incoming gray bubble */}
                  <div className="bg-[#E9E9EB] text-slate-900 rounded-[14px] rounded-bl-[2px] p-2 text-[9.5px] leading-tight space-y-0.5 max-w-[90%] shadow-2xs">
                    <p className="font-semibold text-slate-800">Medication Reminder:</p>
                    <p>Time for your ART dose (08:00).</p>
                    <p className="text-blue-600 font-bold text-[8.5px]">#HealthForAll</p>
                  </div>

                  {/* Outgoing green bubble */}
                  {smsReplied ? (
                    <div className="bg-[#34C759] text-white rounded-[14px] rounded-br-[2px] p-1.5 text-[9.5px] font-bold text-right ml-auto max-w-[75%] shadow-2xs animate-fade-in">
                      <span>1 (Took ART)</span>
                      <div className="text-[7px] text-emerald-100 flex items-center justify-end gap-0.5 font-normal">
                        <span>08:01</span>
                        <Check className="w-2 h-2" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-[8.5px] text-slate-500 italic bg-white/70 p-1 rounded-lg border border-slate-200">
                      Reply 1 to confirm intake.
                    </div>
                  )}
                </div>

                {/* Reply trigger button */}
                <button
                  onClick={() => setSmsReplied(!smsReplied)}
                  className={`w-full py-1 px-1.5 rounded-lg text-[9px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    smsReplied 
                      ? 'bg-slate-200 text-slate-700' 
                      : 'bg-[#34C759] hover:bg-emerald-600 text-white shadow-2xs'
                  }`}
                >
                  {smsReplied ? (
                    <>
                      <RotateCcw className="w-2.5 h-2.5" /> Reset Reply
                    </>
                  ) : (
                    <>
                      <Send className="w-2.5 h-2.5" /> Tap to Reply "1"
                    </>
                  )}
                </button>
              </div>

              {/* iOS Message Input Bar */}
              <div className="bg-white/90 px-2 py-1 border-t border-[#C6C6C8] flex items-center gap-1 shrink-0">
                <Plus className="w-3 h-3 text-slate-400" />
                <div className="flex-1 bg-white border border-[#C6C6C8] rounded-full px-2 py-0.5 text-[8.5px] text-slate-400">
                  Text Message • SMS
                </div>
              </div>

              {/* Home bar */}
              <div className="pb-0.5 pt-0.5 bg-white flex justify-center shrink-0">
                <div className="w-16 h-0.5 bg-slate-400 rounded-full"></div>
              </div>

            </div>

          </div>

          <div className="mt-2 text-center">
            <h3 className="font-bold text-xs text-slate-800">1. SMS Messages</h3>
            <p className="text-[10px] text-slate-500 font-medium">Cellular SMS Service</p>
          </div>
        </div>

        {/* ================= CHANNEL 2: iPHONE APP PUSH (LOCK SCREEN) ================= */}
        <div className="flex flex-col items-center">
          <div className="w-[210px] sm:w-[220px] h-[430px] bg-[#161618] rounded-[38px] p-[6px] shadow-lg border-2 border-slate-700/80 flex flex-col justify-between relative ring-1 ring-white/5 select-none shrink-0">
            
            {/* Screen Inner */}
            <div className="w-full h-full bg-gradient-to-b from-[#1b2b4a] via-[#111c33] to-[#070b14] text-white rounded-[32px] overflow-hidden flex flex-col justify-between p-2 relative shadow-inner">
              
              {/* Dynamic Island */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="w-14 h-4 bg-black rounded-full flex items-center justify-between px-1.5 shadow-2xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40"></div>
                </div>
              </div>

              {/* Status bar */}
              <div className="pt-1.5 px-3 pb-1 flex items-center justify-between text-[10px] z-20 shrink-0 font-semibold text-white/90">
                <span className="font-bold">9:41</span>
                <div className="flex items-center gap-1">
                  <Signal className="w-2.5 h-2.5" />
                  <Wifi className="w-2.5 h-2.5" />
                  <div className="w-3.5 h-1.5 border border-white/80 rounded-3xs p-0.5 flex items-center">
                    <div className="h-full bg-white w-full rounded-4xs"></div>
                  </div>
                </div>
              </div>

              {/* Big Clock */}
              <div className="text-center pt-1 space-y-0.5">
                <div className="text-[9px] text-blue-200/80 font-medium">Monday, Oct 20</div>
                <div className="text-3xl font-extralight tracking-tight text-white drop-shadow-sm">08:00</div>
              </div>

              {/* Floating iOS Notification Card */}
              <div className="bg-white/90 backdrop-blur-md text-slate-900 rounded-xl p-2 shadow-xl border border-white/50 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-4.5 h-4.5 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bell className="w-2.5 h-2.5" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-[8.5px] font-bold text-slate-800 uppercase tracking-wide">HEALTH ALERT</span>
                    <span className="text-[7.5px] text-slate-400 font-mono">now</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[10px] text-slate-900 leading-tight">Medication Reminder</h4>
                  <p className="text-[9px] text-slate-600 mt-0.5 leading-snug">
                    Time to take your ART medication (08:00).
                  </p>
                </div>

                {appConfirmed ? (
                  <div className="py-1 bg-emerald-100 text-emerald-800 rounded-md text-[9px] font-bold flex items-center justify-center gap-1">
                    <Check className="w-2.5 h-2.5 text-emerald-600" /> Recorded!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1 pt-0.5">
                    <button
                      onClick={() => setAppConfirmed(true)}
                      className="py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold rounded-md shadow-2xs transition cursor-pointer text-center"
                    >
                      Took it
                    </button>
                    <button
                      onClick={() => setAppConfirmed(false)}
                      className="py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[9px] font-semibold rounded-md transition cursor-pointer text-center"
                    >
                      Snooze
                    </button>
                  </div>
                )}
              </div>

              {/* Lock screen bottom */}
              <div className="space-y-1">
                <div className="flex items-center justify-between px-1">
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                    <Flashlight className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-[7.5px] text-white/50">Swipe up to open</span>
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                    <Camera className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                {/* Home bar */}
                <div className="flex justify-center pb-0.5">
                  <div className="w-16 h-0.5 bg-white/60 rounded-full"></div>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-2 text-center">
            <h3 className="font-bold text-xs text-slate-800">2. App Push Alert</h3>
            <p className="text-[10px] text-slate-500 font-medium">Smartphone App Notification</p>
          </div>
        </div>

        {/* ================= CHANNEL 3: iPHONE VOICE CALL (PHONE APP) ================= */}
        <div className="flex flex-col items-center">
          <div className="w-[210px] sm:w-[220px] h-[430px] bg-[#161618] rounded-[38px] p-[6px] shadow-lg border-2 border-slate-700/80 flex flex-col justify-between relative ring-1 ring-white/5 select-none shrink-0">
            
            {/* Screen Inner */}
            <div className="w-full h-full bg-gradient-to-b from-[#18181b] to-black text-white rounded-[32px] overflow-hidden flex flex-col justify-between p-2.5 relative shadow-inner">
              
              {/* Dynamic Island */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="w-14 h-4 bg-black rounded-full flex items-center justify-between px-1.5 shadow-2xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40"></div>
                </div>
              </div>

              {/* Status bar */}
              <div className="pt-1.5 px-3 pb-1 flex items-center justify-between text-[10px] z-20 shrink-0 font-semibold text-white/90">
                <span className="font-bold">9:41</span>
                <div className="flex items-center gap-1">
                  <Signal className="w-2.5 h-2.5" />
                  <Wifi className="w-2.5 h-2.5" />
                  <div className="w-3.5 h-1.5 border border-white/80 rounded-3xs p-0.5 flex items-center">
                    <div className="h-full bg-white w-full rounded-4xs"></div>
                  </div>
                </div>
              </div>

              {/* Call Header */}
              <div className="text-center pt-1 space-y-1">
                <img 
                  src="/app-logo.png" 
                  alt="Health Center X" 
                  className="w-10 h-10 object-contain mx-auto drop-shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-[11px] text-white">Health Center X</h4>
                  <p className="text-[9px] text-slate-400 font-mono">
                    {isPlayingVoice ? `0:${voiceProgress < 10 ? `0${voiceProgress}` : voiceProgress}` : 'Connected'}
                  </p>
                </div>
              </div>

              {/* Spoken voice transcription */}
              <div className="bg-white/10 rounded-xl p-2 border border-white/10 space-y-1.5">
                <div className="text-[8px] text-indigo-300 font-bold uppercase tracking-wider">
                  Voice IVR Spoken Audio:
                </div>
                <p className="text-[9px] text-slate-200 italic leading-snug">
                  "Hello João. Time for your 08:00 ART medication."
                </p>

                <div className="flex items-center gap-1.5 pt-0.5">
                  <button
                    onClick={toggleVoice}
                    className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    {isPlayingVoice ? <Pause className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current ml-0.5" />}
                  </button>
                  <div className="flex-1 bg-white/20 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(voiceProgress / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 6 mini iOS call buttons */}
              <div className="grid grid-cols-3 gap-2 px-1 text-center">
                {['mute', 'keypad', 'audio', 'add', 'FaceTime', 'contacts'].map((btn) => (
                  <div key={btn} className="flex flex-col items-center gap-0.5">
                    <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-[8px] text-white">
                      •
                    </div>
                    <span className="text-[7px] text-slate-300">{btn}</span>
                  </div>
                ))}
              </div>

              {/* Red end call */}
              <div className="space-y-1 pb-0.5">
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF3B30] text-white flex items-center justify-center shadow-md">
                    <PhoneOff className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-0.5 bg-white/50 rounded-full"></div>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-2 text-center">
            <h3 className="font-bold text-xs text-slate-800">3. Voice Call</h3>
            <p className="text-[10px] text-slate-500 font-medium">Interactive Voice Response (IVR)</p>
          </div>
        </div>

        {/* ================= CHANNEL 4: iPHONE USSD (*123# CARRIER SHEET) ================= */}
        <div className="flex flex-col items-center">
          <div className="w-[210px] sm:w-[220px] h-[430px] bg-[#161618] rounded-[38px] p-[6px] shadow-lg border-2 border-slate-700/80 flex flex-col justify-between relative ring-1 ring-white/5 select-none shrink-0">
            
            {/* Screen Inner */}
            <div className="w-full h-full bg-slate-900 text-white rounded-[32px] overflow-hidden flex flex-col justify-end p-2 relative shadow-inner">
              
              {/* Dynamic Island */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="w-14 h-4 bg-black rounded-full flex items-center justify-between px-1.5 shadow-2xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40"></div>
                </div>
              </div>

              {/* Background Keypad wallpaper */}
              <div className="absolute inset-0 p-3 opacity-20 pointer-events-none flex flex-col justify-center items-center">
                <div className="text-sm font-bold mb-2 font-mono">*123#</div>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                    <div key={k} className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold">
                      {k}
                    </div>
                  ))}
                </div>
              </div>

              {/* Real iOS Network Carrier Dialog Box */}
              <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-2xl p-2.5 shadow-2xl border border-white/60 text-slate-900 space-y-1.5 animate-fade-in">
                <div className="text-center border-b border-slate-200 pb-1">
                  <div className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    *123# CARRIER SERVICE
                  </div>
                  <h4 className="font-extrabold text-[10px] text-slate-900">HEALTHCARE PORTAL</h4>
                </div>

                <div className="text-[8.5px] font-mono space-y-0.5">
                  {ussdStep === 'menu' && (
                    <div className="space-y-0.5 text-slate-700 leading-tight">
                      <p className="font-bold text-blue-700">1. Confirm ART intake</p>
                      <p>2. Next clinic visit</p>
                      <p>3. Next drug refill</p>
                      <p>4. Clinical hotline</p>
                    </div>
                  )}

                  {ussdStep === '1' && (
                    <div className="space-y-0.5 text-slate-800">
                      <p className="font-bold text-emerald-700">✓ Dose Recorded!</p>
                      <p className="text-[8px]">ART 08:00 recorded in clinic.</p>
                    </div>
                  )}

                  {ussdStep === '2' && (
                    <div className="text-[8px] text-slate-800">
                      <p className="font-bold text-blue-700">NEXT VISIT:</p>
                      <p>20 Oct 2026 • 08:30</p>
                    </div>
                  )}

                  {ussdStep === '3' && (
                    <div className="text-[8px] text-slate-800">
                      <p className="font-bold text-blue-700">REFILL:</p>
                      <p>30-day ART pack ready.</p>
                    </div>
                  )}

                  {ussdStep === '4' && (
                    <div className="text-[8px] text-slate-800">
                      <p className="font-bold text-blue-700">SUPPORT:</p>
                      <p>Toll-Free 800 123</p>
                    </div>
                  )}
                </div>

                {/* Keypad selector */}
                <div className="pt-0.5 space-y-1">
                  <div className="grid grid-cols-4 gap-1">
                    {['1', '2', '3', '4'].map((num) => (
                      <button
                        key={num}
                        onClick={() => setUssdStep(num)}
                        className={`py-1 rounded-md font-mono text-[9px] font-bold transition cursor-pointer ${
                          ussdStep === num ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {ussdStep !== 'menu' && (
                    <button
                      onClick={() => setUssdStep('menu')}
                      className="w-full py-0.5 text-[8px] text-slate-600 bg-slate-100 rounded-md font-medium cursor-pointer"
                    >
                      ← Back
                    </button>
                  )}
                </div>
              </div>

              {/* Home bar */}
              <div className="flex justify-center pt-1.5 pb-0.5">
                <div className="w-16 h-0.5 bg-white/40 rounded-full"></div>
              </div>

            </div>

          </div>

          <div className="mt-2 text-center">
            <h3 className="font-bold text-xs text-slate-800">4. USSD Service</h3>
            <p className="text-[10px] text-slate-500 font-medium">Carrier Interactive Menu (*123#)</p>
          </div>
        </div>

      </div>

    </div>
  )
}
