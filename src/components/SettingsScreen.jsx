import { useState } from 'react'
import { 
  Settings, 
  Bell, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Save, 
  CheckCircle2, 
  Radio, 
  Smartphone, 
  Key,
  Globe
} from 'lucide-react'

export default function SettingsScreen() {
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [settings, setSettings] = useState({
    healthCenterName: 'Health Center X',
    district: 'Central Maputo',
    contactPhone: '+258 84 123 4567',
    tollFreeLine: '800 123',
    morningReminderTime: '08:00',
    eveningReminderTime: '20:00',
    appointmentAdvanceDays: '2',
    smsGateway: 'Vodacom MZ SMS Gateway (HTTP API)',
    smsSenderId: 'CS_SAUDE',
    autoSnoozeDuration: '15',
    unconfirmedAlertThreshold: '3',
    enableUssd: true,
    enableVoice: true,
    enableTwoFactor: true
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. PROFESSIONAL SETTINGS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            <span>System Preferences</span>
            <span>•</span>
            <span className="text-blue-600 font-bold">Facility Infrastructure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Configuration & Gateways
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Manage Mozambique telecommunications SMS/USSD gateways, clinical adherence thresholds, and automated reminder schedules.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-fade-in shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Health Facility Profile */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Healthcare Facility Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Facility Name</label>
              <input
                type="text"
                name="healthCenterName"
                value={settings.healthCenterName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Health District / Province</label>
              <input
                type="text"
                name="district"
                value={settings.district}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Facility SMS Outbound Number</label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Emergency Patient Toll-free</label>
              <input
                type="text"
                name="tollFreeLine"
                value={settings.tollFreeLine}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Automated Reminder Schedules & Timings */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Automated Notification Schedules (Objective 3)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Morning Dose Reminder</label>
              <input
                type="time"
                name="morningReminderTime"
                value={settings.morningReminderTime}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Evening Dose Reminder</label>
              <input
                type="time"
                name="eveningReminderTime"
                value={settings.eveningReminderTime}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Visit Pre-alert Advance Days</label>
              <select
                name="appointmentAdvanceDays"
                value={settings.appointmentAdvanceDays}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="1">1 day before appointment</option>
                <option value="2">2 days before appointment</option>
                <option value="3">3 days before appointment</option>
                <option value="7">1 week before appointment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Snooze Window Duration</label>
              <select
                name="autoSnoozeDuration"
                value={settings.autoSnoozeDuration}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: SMS Gateway & Channels */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Radio className="w-4 h-4 text-indigo-600" />
            <span>Cellular Gateway & Channels Integration</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Telecom Gateway</label>
              <input
                type="text"
                name="smsGateway"
                value={settings.smsGateway}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">SMS Alphanumeric Sender ID</label>
              <input
                type="text"
                name="smsSenderId"
                value={settings.smsSenderId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">High-Risk Alert Threshold</label>
              <select
                name="unconfirmedAlertThreshold"
                value={settings.unconfirmedAlertThreshold}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="2">2 unconfirmed reminders</option>
                <option value="3">3 unconfirmed reminders (Standard)</option>
                <option value="5">5 unconfirmed reminders</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-6 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="enableUssd"
                checked={settings.enableUssd}
                onChange={handleChange}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold">Enable *123# USSD Channel for basic phones</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="enableVoice"
                checked={settings.enableVoice}
                onChange={handleChange}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold">Enable Automated Voice Reminders (Low Literacy)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="enableTwoFactor"
                checked={settings.enableTwoFactor}
                onChange={handleChange}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold">Require 2FA for Clinical Staff logins</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>

      </form>

    </div>
  )
}
