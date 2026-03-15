// src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Droplets } from 'lucide-react';

interface WaterLevelThresholds {
  minSafe: number;
  warning: number;
  critical: number;
  unit: string;
}

const DEFAULT_THRESHOLDS: WaterLevelThresholds = {
  minSafe: 200,
  warning: 250,
  critical: 280,
  unit: 'cm',
};

const STORAGE_KEY = 'hydroguard_water_thresholds';

export function Settings() {
  const [thresholds, setThresholds] = useState<WaterLevelThresholds>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_THRESHOLDS;
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-save whenever thresholds change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(thresholds));
      setSaved(true);
      setError(null);
      const timer = setTimeout(() => setSaved(false), 2200);
      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to save settings');
      console.error('localStorage error:', err);
    }
  }, [thresholds]);

  const handleChange = (key: keyof WaterLevelThresholds, value: string) => {
    const numValue = key === 'unit' ? value : Number(value);
    setThresholds(prev => ({
      ...prev,
      [key]: numValue,
    }));
  };

  const resetToDefault = () => {
    if (window.confirm('Reset all thresholds to default values?')) {
      setThresholds(DEFAULT_THRESHOLDS);
    }
  };

  const validateThresholds = () => {
    if (thresholds.minSafe >= thresholds.warning) {
      setError('Minimum safe level must be lower than warning level');
      return false;
    }
    if (thresholds.warning >= thresholds.critical) {
      setError('Warning level must be lower than critical level');
      return false;
    }
    if (thresholds.minSafe < 0 || thresholds.warning < 0 || thresholds.critical < 0) {
      setError('Thresholds cannot be negative');
      return false;
    }
    return true;
  };

  const handleManualSave = () => {
    if (validateThresholds()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(thresholds));
      setSaved(true);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pb-24 pt-6 px-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-3.5 rounded-2xl shadow-lg shadow-indigo-600/40 animate-pulse-slow">
            <Droplets className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Threshold Settings</h1>
            <p className="text-sm text-slate-400 mt-1">
              Define water level boundaries for alerts and visualization
            </p>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl border border-indigo-500/30 shadow-2xl shadow-indigo-900/20 p-6 space-y-7">
          {/* Inputs */}
          {[
            {
              key: 'minSafe',
              label: 'Minimum Safe Level',
              description: 'Below this value → low water risk / drought alert',
              color: 'text-cyan-400',
            },
            {
              key: 'warning',
              label: 'Warning Level',
              description: 'Above this value → increasing risk, close monitoring',
              color: 'text-amber-400',
            },
            {
              key: 'critical',
              label: 'Critical / Flood Level',
              description: 'Above this value → high flood danger',
              color: 'text-red-400',
            },
          ].map(field => (
            <div key={field.key} className="space-y-2.5">
              <label
                htmlFor={field.key}
                className={`block text-base font-semibold ${field.color}`}
              >
                {field.label}
              </label>
              <p className="text-xs text-slate-400 leading-relaxed">
                {field.description}
              </p>
              <div className="flex items-center gap-3">
                <input
                  id={field.key}
                  type="number"
                  value={thresholds[field.key as keyof WaterLevelThresholds]}
                  onChange={e => handleChange(field.key as keyof WaterLevelThresholds, e.target.value)}
                  className="flex-1 bg-slate-900/70 border border-indigo-500/40 rounded-lg px-4 py-3.5 text-white text-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  min={0}
                  step={1}
                />
                <span className="text-slate-300 font-medium min-w-[3ch]">
                  {thresholds.unit}
                </span>
              </div>
            </div>
          ))}

          {/* Unit selector (optional) */}
          <div className="space-y-2.5 pt-2">
            <label htmlFor="unit" className="block text-sm font-medium text-slate-300">
              Measurement Unit
            </label>
            <select
              id="unit"
              value={thresholds.unit}
              onChange={e => handleChange('unit', e.target.value)}
              className="w-full bg-slate-900/70 border border-indigo-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition-all"
            >
              <option value="cm">Centimeters (cm)</option>
              <option value="m">Meters (m)</option>
              <option value="mm">Millimeters (mm)</option>
            </select>
          </div>

          {/* Feedback & Actions */}
          <div className="pt-5 space-y-4">
            <div className="flex gap-4">
              <button
                onClick={handleManualSave}
                disabled={!!error}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-700/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Settings
              </button>

              <button
                onClick={resetToDefault}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3.5 rounded-xl transition-all border border-slate-600 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>

            {saved && !error && (
              <p className="text-center text-sm text-emerald-400 font-medium animate-pulse">
                ✓ Settings saved successfully
              </p>
            )}

            {error && (
              <p className="text-center text-sm text-red-400 font-medium bg-red-950/40 py-2 px-4 rounded-lg border border-red-500/30">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Info footer */}
        <div className="text-center text-xs text-slate-500 pt-6">
          <p>Values are stored in your browser (localStorage)</p>
          <p className="mt-1">Used for real-time alerts, chart zones and status colors</p>
        </div>
      </div>

      {/* Optional animation keyframes (if not already global) */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}