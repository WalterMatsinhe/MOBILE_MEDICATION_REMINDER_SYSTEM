import { useState, useRef, useEffect } from 'react'
import { 
  Check, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Wifi, 
  Signal, 
  LogOut, 
  Stethoscope, 
  Phone, 
  PhoneOff, 
  MicOff, 
  Volume2, 
  Grid, 
  UserPlus, 
  Video, 
  Users, 
  ChevronLeft, 
  Plus, 
  ArrowUp, 
  Mic, 
  CalendarCheck2, 
  Play, 
  Pause, 
  Bell, 
  Flashlight, 
  Camera 
} from 'lucide-react'

export default function PatientMobileApp({ 
  patient, 
  onAcknowledgeMedication, 
  onLogout, 
  onSwitchToDoctorView 
}) {
  // Active channel on the iPhone: 'sms', 'push', 'voice', 'ussd'
  const [activeChannel, setActiveChannel] = useState('sms')

  // SMS thread state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: 'Health Center X: Medication Reminder.\nIt is time to take your ART dose (1 tablet - 08:00).\nTake care of your health! #HealthForAll\n\nReply 1 to confirm.',
      time: '08:00',
      type: 'medication'
    },
    {
      id: 2,
      sender: 'system',
      text: 'Health Center X: Clinic Visit & Refill Reminder.\nYour appointment with Dr. Almeida and 30-day ART refill is scheduled for Oct 20, 2026 at 08:30.\n\nReply 2 to confirm attendance.',
      time: '08:01',
      type: 'appointment'
    }
  ])
  
  const [replyInput, setReplyInput] = useState('')
  const [medTaken, setMedTaken] = useState(false)
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false)
  const [snoozeActive, setSnoozeActive] = useState(false)

  // Push notification state
  const [pushConfirmed, setPushConfirmed] = useState(false)
  
  // Voice call state
  const [isPlayingVoice, setIsPlayingVoice] = useState(false)
  const [voiceProgress, setVoiceProgress] = useState(12)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(true)

  // USSD state
  const [ussdStep, setUssdStep] = useState('menu') // 'menu', '1', '2', '3', '4'
  const [ussdInput, setUssdInput] = useState('')

  const chatBottomRef = useRef(null)

  // Scroll to bottom only when user responds, not on initial channel switch
  useEffect(() => {
    if (messages.length > 2 && chatBottomRef.current && activeChannel === 'sms') {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

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

  // Handle Medication confirmation via SMS
  const handleTake = () => {
    setMedTaken(true)
    setSnoozeActive(false)
    if (onAcknowledgeMedication) {
      onAcknowledgeMedication(patient?.id, true)
    }

    const userReply = {
      id: Date.now(),
      sender: 'user',
      text: '1',
      subText: 'Took medication',
      time: '08:02',
      status: 'Delivered'
    }
    setMessages(prev => [...prev, userReply])

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'system',
          text: '✓ Health Center X: Intake recorded successfully! Dr. Almeida notified. Next dose tomorrow at 08:00.',
          time: '08:02',
          type: 'confirm'
        }
      ])
    }, 600)
  }

  // Handle Appointment confirmation via SMS
  const handleConfirmAppointment = () => {
    setAppointmentConfirmed(true)
    const userReply = {
      id: Date.now(),
      sender: 'user',
      text: '2',
      subText: 'Confirm clinic visit',
      time: '08:03',
      status: 'Delivered'
    }
    setMessages(prev => [...prev, userReply])

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'system',
          text: '✓ Health Center X: Attendance confirmed for your visit on Oct 20, 2026 at 08:30 & 30-day ART supply refill.',
          time: '08:03',
          type: 'confirm'
        }
      ])
    }, 600)
  }

  // Handle Snooze
  const handleSnooze = () => {
    setSnoozeActive(true)
    const userReply = {
      id: Date.now(),
      sender: 'user',
      text: 'Remind me in 15 minutes',
      time: '08:02',
      status: 'Delivered'
    }
    setMessages(prev => [...prev, userReply])

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'system',
          text: 'Health Center X: Reminder snoozed. We will send another alert at 08:15.',
          time: '08:02',
          type: 'snooze'
        }
      ])
    }, 500)
  }

  // Handle custom typed SMS
  const handleSendCustomReply = (e) => {
    e.preventDefault()
    if (!replyInput.trim()) return

    const text = replyInput.trim()
    setReplyInput('')

    const userReply = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: '08:04',
      status: 'Delivered'
    }
    setMessages(prev => [...prev, userReply])

    const lower = text.toLowerCase()
    if (lower === '1' || lower.includes('took') || lower.includes('yes') || lower.includes('tomei')) {
      handleTake()
    } else if (lower === '2' || lower.includes('confirm') || lower.includes('visit') || lower.includes('appointment')) {
      handleConfirmAppointment()
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'system',
            text: 'Health Center X: Message received. Reply 1 to confirm medication, or reply 2 to confirm appointment attendance.',
            time: '08:04',
            type: 'info'
          }
        ])
      }, 600)
    }
  }

  const handleResetChat = () => {
    setMedTaken(false)
    setAppointmentConfirmed(false)
    setSnoozeActive(false)
    setMessages([
      {
        id: 1,
        sender: 'system',
        text: 'Health Center X: Medication Reminder.\nIt is time to take your ART dose (1 tablet - 08:00).\nTake care of your health! #HealthForAll\n\nReply 1 to confirm.',
        time: '08:00',
        type: 'medication'
      },
      {
        id: 2,
        sender: 'system',
        text: 'Health Center X: Clinic Visit & Refill Reminder.\nYour appointment with Dr. Almeida and 30-day ART refill is scheduled for Oct 20, 2026 at 08:30.\n\nReply 2 to confirm attendance.',
        time: '08:01',
        type: 'appointment'
      }
    ])
  }

  const handleUssdSubmit = (e) => {
    e?.preventDefault()
    const val = ussdInput.trim()
    if (!val) return
    if (['1', '2', '3', '4'].includes(val)) {
      setUssdStep(val)
      if (val === '1' && onAcknowledgeMedication) {
        onAcknowledgeMedication(patient?.id, true)
      }
    }
    setUssdInput('')
  }

  return (
    <div className="h-screen w-full bg-[#060c18] flex flex-col font-sans text-slate-100 overflow-hidden">
      
      {/* ================= TIER 1: TOP APPLICATION NAVBAR ================= */}
      {/* Clean, spacious bar with only Identity on the left and Actions on the right */}
      <header className="h-13 bg-[#0b162c] border-b border-slate-800/90 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        
        {/* Left: Patient Profile */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img 
            src="/app-logo.png" 
            alt="Patient Phone Logo" 
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm transition-transform hover:scale-105"
          />
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight shrink-0">
              Patient Phone
            </span>
            <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 truncate">
              {patient?.name || 'João Manuel Chivango'}
            </span>
          </div>
        </div>

        {/* Right: Portal Controls (Guaranteed never to clip or overlap) */}
        <div className="flex items-center gap-2 shrink-0">
          {onSwitchToDoctorView && (
            <button
              onClick={onSwitchToDoctorView}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700 hover:border-slate-600 shadow-xs shrink-0"
              title="Switch back to Clinician Portal"
            >
              <Stethoscope className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="hidden sm:inline">Doctor Portal</span>
              <span className="sm:hidden">Doctor</span>
            </button>
          )}

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 active:scale-95 text-rose-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-rose-500/40 shadow-xs shrink-0"
            title="Sign Out of the system"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* ================= TIER 2: DEDICATED CHANNEL SELECTOR TOOLBAR ================= */}
      {/* Own full-width row: 100% visible on all screen sizes, never competing with other buttons */}
      <div className="h-11 bg-[#091224] border-b border-slate-800/80 px-2 sm:px-4 flex items-center justify-center shrink-0 z-10 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden md:inline">
            Channels:
          </span>
          {[
            { id: 'sms', label: 'SMS Messages', icon: '💬' },
            { id: 'push', label: 'Push Alert', icon: '🔔' },
            { id: 'voice', label: 'Voice Call', icon: '📞' },
            { id: 'ussd', label: 'USSD (*123#)', icon: '📟' },
          ].map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeChannel === ch.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/40 ring-1 ring-blue-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{ch.icon}</span>
              <span>{ch.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================= TIER 3: MAIN VIEWPORT WITH TRUE iPHONE CHASSIS ================= */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-3 min-h-0 overflow-hidden">
        
        {/* TRUE iPHONE 16 PRO ASPECT-RATIO CHASSIS (aspect-[9/19.5]) */}
        <div className="h-full max-h-[615px] aspect-[9/19.5] bg-[#141416] rounded-[50px] p-[9px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] border-[4px] border-[#38383c] ring-1 ring-white/10 relative flex flex-col shrink-0 select-none">
          
          {/* Hardware side buttons */}
          <div className="absolute -left-[7px] top-24 w-[3.5px] h-10 bg-[#28282b] rounded-l-md"></div>
          <div className="absolute -left-[7px] top-37 w-[3.5px] h-10 bg-[#28282b] rounded-l-md"></div>
          <div className="absolute -right-[7px] top-28 w-[3.5px] h-13 bg-[#28282b] rounded-r-md"></div>

          {/* INNER SCREEN CONTAINER */}
          <div className="w-full h-full bg-[#F2F2F7] rounded-[40px] overflow-hidden flex flex-col relative text-slate-900 shadow-inner">
            
            {/* iOS Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
              <div className="w-20 h-5 bg-black rounded-full flex items-center justify-between px-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#1c1c1e]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-900/40 ring-1 ring-blue-500/20"></div>
              </div>
            </div>

            {/* iOS Status Bar */}
            <div className="h-9 pt-2 px-5 flex items-center justify-between text-xs z-30 shrink-0 font-semibold bg-transparent">
              <span className="font-bold tracking-tight text-[11px] text-current">9:41</span>
              <div className="flex items-center gap-1.5 text-current">
                <Signal className="w-3 h-3" />
                <span className="text-[9px] font-bold">5G</span>
                <Wifi className="w-3 h-3" />
                <div className="w-4 h-2 border border-current rounded-2xs p-0.5 flex items-center">
                  <div className="h-full bg-current rounded-3xs w-[85%]"></div>
                </div>
              </div>
            </div>

            {/* ================= MODE 1: iPHONE SMS MESSAGES APP ================= */}
            {activeChannel === 'sms' && (
              <div className="flex-1 flex flex-col min-h-0 bg-[#F2F2F7]">
                
                {/* Messages Navigation Bar */}
                <div className="bg-white/90 backdrop-blur-md px-2.5 py-1.5 border-b border-[#C6C6C8] flex items-center justify-between shrink-0 shadow-2xs z-10">
                  <div className="flex items-center text-blue-500 text-xs shrink-0 cursor-pointer">
                    <ChevronLeft className="w-4 h-4 -ml-1" />
                    <span className="text-[10px]">Back</span>
                  </div>

                  <div className="flex flex-col items-center flex-1 px-1 min-w-0">
                    <img 
                      src="/app-logo.png" 
                      alt="Health Center X" 
                      className="w-6 h-6 object-contain shrink-0 drop-shadow-2xs"
                    />
                    <div className="flex items-center justify-center gap-1 mt-0.5 w-full">
                      <span className="font-bold text-[10px] text-slate-900 whitespace-nowrap">Health Center X</span>
                      <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 fill-blue-500/20 shrink-0" />
                    </div>
                    <span className="text-[7.5px] text-slate-400 font-mono whitespace-nowrap leading-none">+258 84 123 4567</span>
                  </div>

                  <div className="w-7 text-right shrink-0">
                    <Phone className="w-3.5 h-3.5 ml-auto text-blue-500 cursor-pointer" />
                  </div>
                </div>

                {/* Messages Thread (Native look without desktop scrollbars) */}
                <div className="flex-1 px-3 py-2 overflow-y-auto space-y-2 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <div className="text-center my-0.5">
                    <span className="text-[8.5px] font-bold text-slate-400 tracking-wide uppercase">
                      Today 08:00 • SMS
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[85%] px-3 py-1.5 text-[10.5px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#34C759] text-white rounded-[16px] rounded-br-[3px] font-medium shadow-xs'
                          : 'bg-[#E9E9EB] text-slate-900 rounded-[16px] rounded-bl-[3px] shadow-xs'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        {msg.subText && (
                          <p className="text-[9px] opacity-80 mt-0.5 italic">({msg.subText})</p>
                        )}
                      </div>

                      {msg.sender === 'user' && (
                        <span className="text-[7.5px] text-slate-400 mt-0.5 mr-1 font-normal">
                          Delivered
                        </span>
                      )}
                    </div>
                  ))}

                  <div ref={chatBottomRef} />

                  {/* Interactive Quick-Response Buttons */}
                  <div className="pt-1 space-y-1">
                    <div className="text-[8.5px] text-slate-400 text-center font-medium">
                      One-tap SMS confirmation:
                    </div>

                    <div className="flex flex-col gap-1">
                      {!medTaken && (
                        <button
                          onClick={handleTake}
                          className="w-full py-1.5 px-2 bg-white hover:bg-emerald-50 active:scale-98 text-emerald-800 text-[10px] font-bold rounded-xl border border-emerald-300 shadow-2xs transition flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[8.5px]">1</span>
                            <span>Took medication (ART)</span>
                          </span>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        </button>
                      )}

                      {!appointmentConfirmed && (
                        <button
                          onClick={handleConfirmAppointment}
                          className="w-full py-1.5 px-2 bg-white hover:bg-blue-50 active:scale-98 text-blue-800 text-[10px] font-bold rounded-xl border border-blue-300 shadow-2xs transition flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[8.5px]">2</span>
                            <span>Confirm visit (Oct 20)</span>
                          </span>
                          <CalendarCheck2 className="w-3.5 h-3.5 text-blue-600" />
                        </button>
                      )}

                      {!snoozeActive && !medTaken && (
                        <button
                          onClick={handleSnooze}
                          className="w-full py-1 px-2 bg-white/70 hover:bg-slate-100 text-slate-600 text-[9.5px] font-medium rounded-lg border border-slate-200 transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Remind me in 15 minutes</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {(medTaken || appointmentConfirmed) && (
                    <div className="pt-0.5 text-center">
                      <button
                        onClick={handleResetChat}
                        className="text-[8.5px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                      >
                        <RotateCcw className="w-2.5 h-2.5 inline mr-1" /> Replay SMS simulation
                      </button>
                    </div>
                  )}
                </div>

                {/* iOS SMS Input Bar */}
                <form 
                  onSubmit={handleSendCustomReply}
                  className="bg-white/90 backdrop-blur-md px-2 py-1.5 border-t border-[#C6C6C8] flex items-center gap-1.5 shrink-0"
                >
                  <button type="button" className="w-6 h-6 rounded-full bg-[#E9E9EB] text-slate-600 flex items-center justify-center shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Text Message • SMS"
                      className="w-full pl-2.5 pr-7 py-1 text-xs bg-white border border-[#C6C6C8] rounded-full focus:outline-none focus:border-blue-500"
                    />
                    {replyInput.trim() ? (
                      <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#34C759] text-white flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        <ArrowUp className="w-3 h-3 stroke-[3]" />
                      </button>
                    ) : (
                      <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mic className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </form>

                {/* iOS Home indicator bar */}
                <div className="pb-1 pt-0.5 bg-white flex justify-center shrink-0">
                  <div className="w-24 h-1 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            )}

            {/* ================= MODE 2: iPHONE LOCK SCREEN WITH PUSH ================= */}
            {activeChannel === 'push' && (
              <div className="flex-1 bg-gradient-to-b from-[#1c2c4c] via-[#101b33] to-[#080d1a] text-white flex flex-col justify-between p-3.5 relative overflow-hidden">
                
                {/* Lock Screen Clock */}
                <div className="text-center pt-2 space-y-0.5">
                  <div className="text-[10px] font-medium text-blue-200/90 tracking-wide">
                    Monday, October 20
                  </div>
                  <div className="text-4xl font-extralight tracking-tight text-white drop-shadow-md">
                    08:00
                  </div>
                </div>

                {/* Stacked iOS Notification Card */}
                <div className="space-y-2 animate-fade-in my-auto">
                  <div className="bg-white/90 backdrop-blur-xl text-slate-900 rounded-2xl p-3 shadow-2xl border border-white/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-bold text-slate-800 uppercase tracking-wide">Health Center Alert</span>
                          <span className="text-[8.5px] text-slate-400 font-mono">now</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[11px] text-slate-900 leading-tight">Time for your medication</h4>
                      <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                        Please take your ART dose (1 tablet). Take care of your health! #HealthForAll
                      </p>
                    </div>

                    {/* Notification Actions */}
                    {pushConfirmed ? (
                      <div className="py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Recorded in Clinical Portal!
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                        <button
                          onClick={() => {
                            setPushConfirmed(true)
                            if (onAcknowledgeMedication) onAcknowledgeMedication(patient?.id, true)
                          }}
                          className="py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-xl shadow-xs transition cursor-pointer text-center"
                        >
                          Took it
                        </button>
                        <button
                          onClick={() => setPushConfirmed(false)}
                          className="py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-semibold rounded-xl transition cursor-pointer text-center"
                        >
                          Remind later
                        </button>
                      </div>
                    )}

                    {pushConfirmed && (
                      <button 
                        onClick={() => setPushConfirmed(false)}
                        className="text-[8.5px] text-slate-400 hover:text-slate-600 underline block mx-auto pt-0.5 cursor-pointer"
                      >
                        Reset notification
                      </button>
                    )}
                  </div>
                </div>

                {/* Lock screen bottom icons */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white/90 shadow-md">
                      <Flashlight className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[8px] text-white/60 tracking-wider">Swipe up to unlock</span>
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white/90 shadow-md">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center pb-0.5">
                    <div className="w-24 h-1 bg-white/70 rounded-full"></div>
                  </div>
                </div>

              </div>
            )}

            {/* ================= MODE 3: iPHONE PHONE CALL SCREEN (VOICE IVR) ================= */}
            {activeChannel === 'voice' && (
              <div className="flex-1 bg-gradient-to-b from-[#18181b] to-[#000000] text-white flex flex-col justify-between p-3.5">
                
                {/* Caller identity */}
                <div className="text-center pt-2 space-y-1.5">
                  <img 
                    src="/app-logo.png" 
                    alt="Health Center X" 
                    className="w-13 h-13 object-contain mx-auto drop-shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white">Health Center X</h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {isPlayingVoice ? `0:${voiceProgress < 10 ? `0${voiceProgress}` : voiceProgress}` : 'Call Connected'}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-medium border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Automated Voice IVR
                  </div>
                </div>

                {/* Spoken voice transcription preview & audio player */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/10 space-y-1.5 my-auto">
                  <div className="text-[8.5px] text-indigo-300 font-bold uppercase tracking-wider">
                    Spoken Voice Message:
                  </div>
                  <p className="text-[10px] text-slate-200 italic leading-snug">
                    "Hello João. This is Health Center X. It is 08:00, time for your daily ART medication. Please take one tablet now."
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                      className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[10px] flex items-center gap-1 cursor-pointer shadow-sm hover:scale-102 transition"
                    >
                      {isPlayingVoice ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                      <span>{isPlayingVoice ? 'Pause' : 'Play Voice'}</span>
                    </button>
                    <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${(voiceProgress / 25) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 6 iOS Call Action Buttons */}
                <div className="grid grid-cols-3 gap-2 px-1">
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className="flex flex-col items-center gap-0.5 cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isMuted ? 'bg-white text-slate-900' : 'bg-white/15 text-white'}`}>
                      <MicOff className="w-4 h-4" />
                    </div>
                    <span className="text-[8.5px] text-slate-300">mute</span>
                  </button>

                  <button className="flex flex-col items-center gap-0.5 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
                      <Grid className="w-4 h-4" />
                    </div>
                    <span className="text-[8.5px] text-slate-300">keypad</span>
                  </button>

                  <button 
                    onClick={() => setIsSpeaker(!isSpeaker)} 
                    className="flex flex-col items-center gap-0.5 cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isSpeaker ? 'bg-white text-slate-900' : 'bg-white/15 text-white'}`}>
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <span className="text-[8.5px] text-slate-300">speaker</span>
                  </button>

                  <button className="flex flex-col items-center gap-0.5 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <span className="text-[8.5px] text-slate-300">add call</span>
                  </button>

                  <button className="flex flex-col items-center gap-0.5 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
                      <Video className="w-4 h-4" />
                    </div>
                    <span className="text-[8.5px] text-slate-300">FaceTime</span>
                  </button>

                  <button className="flex flex-col items-center gap-0.5 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-[8.5px] text-slate-300">contacts</span>
                  </button>
                </div>

                {/* End Call Button */}
                <div className="space-y-2 pb-0.5">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => setIsPlayingVoice(false)}
                      className="w-11 h-11 rounded-full bg-[#FF3B30] text-white flex items-center justify-center shadow-lg active:scale-95 transition cursor-pointer"
                    >
                      <PhoneOff className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-24 h-1 bg-white/40 rounded-full"></div>
                  </div>
                </div>

              </div>
            )}

            {/* ================= MODE 4: iPHONE NATIVE USSD CARRIER SHEET (*123#) ================= */}
            {activeChannel === 'ussd' && (
              <div className="flex-1 bg-slate-900 relative flex flex-col justify-end p-3">
                
                {/* Background Keypad wallpaper */}
                <div className="absolute inset-0 p-3 opacity-20 pointer-events-none flex flex-col justify-center items-center text-white">
                  <div className="text-sm font-bold mb-3 font-mono">*123#</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                      <div key={k} className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold">
                        {k}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real iOS Network Carrier Dialog Box */}
                <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-white/60 text-slate-900 space-y-2 animate-fade-in my-auto">
                  
                  {/* Carrier header */}
                  <div className="text-center border-b border-slate-200 pb-1.5">
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Carrier Service • *123#
                    </div>
                    <h3 className="font-extrabold text-xs text-slate-900 mt-0.5">
                      HEALTHCARE PORTAL
                    </h3>
                  </div>

                  {/* USSD Menu Content */}
                  <div className="text-[10px] space-y-1 font-mono">
                    {ussdStep === 'menu' && (
                      <div className="space-y-0.5 text-slate-700 leading-tight">
                        <p className="font-bold text-blue-700">1. Confirm medication intake</p>
                        <p>2. Next clinic appointment</p>
                        <p>3. Next ART refill</p>
                        <p>4. Clinical support hotline</p>
                      </div>
                    )}

                    {ussdStep === '1' && (
                      <div className="space-y-0.5 text-slate-800">
                        <p className="font-bold text-emerald-700">✓ Intake recorded!</p>
                        <p className="text-[9px]">ART 08:00 recorded in Health Center X.</p>
                      </div>
                    )}

                    {ussdStep === '2' && (
                      <div className="space-y-0.5 text-slate-800 text-[9.5px]">
                        <p className="font-bold text-blue-700">NEXT VISIT:</p>
                        <p>Date: Oct 20, 2026 at 08:30</p>
                        <p>Clinician: Dr. Almeida</p>
                      </div>
                    )}

                    {ussdStep === '3' && (
                      <div className="space-y-0.5 text-slate-800 text-[9.5px]">
                        <p className="font-bold text-blue-700">REFILL:</p>
                        <p>Date: Oct 20, 2026 (30-day ART pack)</p>
                      </div>
                    )}

                    {ussdStep === '4' && (
                      <div className="space-y-0.5 text-slate-800 text-[9.5px]">
                        <p className="font-bold text-blue-700">CLINIC HOTLINE:</p>
                        <p>Toll-Free: 800 123 (Health Center X)</p>
                      </div>
                    )}
                  </div>

                  {/* Keypad selector buttons */}
                  <div className="pt-0.5 space-y-1.5">
                    <div className="grid grid-cols-4 gap-1">
                      {['1', '2', '3', '4'].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setUssdStep(num)
                            if (num === '1' && onAcknowledgeMedication) {
                              onAcknowledgeMedication(patient?.id, true)
                            }
                          }}
                          className={`py-1 rounded-lg font-mono text-[10px] font-bold transition cursor-pointer ${
                            ussdStep === num 
                              ? 'bg-blue-600 text-white shadow-xs' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setUssdStep('menu')}
                        className="flex-1 py-1 text-[10px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition cursor-pointer"
                      >
                        {ussdStep === 'menu' ? 'Dismiss' : '← Back'}
                      </button>

                      {ussdStep !== 'menu' && (
                        <button
                          type="button"
                          onClick={() => setUssdStep('menu')}
                          className="flex-1 py-1 text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer shadow-xs"
                        >
                          OK
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* Home bar */}
                <div className="flex justify-center pt-1 pb-0.5">
                  <div className="w-24 h-1 bg-white/40 rounded-full"></div>
                </div>

              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  )
}
