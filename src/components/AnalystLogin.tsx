import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  KeyRound, 
  Compass, 
  AlertCircle, 
  ArrowRight,
  Eye,
  EyeOff,
  Fingerprint
} from 'lucide-react';

export interface AnalystUser {
  id: string;
  name: string;
  callsign: string;
  role: string;
  department: string;
  clearanceLevel: string;
  badgeId: string;
}

interface AnalystLoginProps {
  onLoginSuccess: (user: AnalystUser) => void;
  onExploreTechStack: () => void;
}

export const AnalystLogin: React.FC<AnalystLoginProps> = ({ 
  onLoginSuccess,
  onExploreTechStack
}) => {
  const [analystId, setAnalystId] = useState('DGIS-7429');
  const [accessKey, setAccessKey] = useState('••••••••');
  const [clearanceLevel, setClearanceLevel] = useState('LEVEL_3_SECRET');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!analystId.trim()) {
      setError('Please provide a valid Analyst Service ID.');
      return;
    }

    setIsLoading(true);

    // Simulate air-gapped cryptographic challenge authentication
    setTimeout(() => {
      setIsLoading(false);
      const authenticatedUser: AnalystUser = {
        id: analystId.toUpperCase(),
        name: 'Capt. A. Sharma',
        callsign: 'VANGUARD-4',
        role: 'Senior Geospatial Intelligence Analyst',
        department: 'DGIS | Ministry of Defence',
        clearanceLevel: 'LEVEL 3 (TOP SECRET // SI/TK)',
        badgeId: 'IN-DEF-88219-GEO'
      };
      
      // Store in session storage for local offline session persistence
      sessionStorage.setItem('terrasphere_auth_user', JSON.stringify(authenticatedUser));
      onLoginSuccess(authenticatedUser);
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setAnalystId('DGIS-7429');
    setAccessKey('OPSEC-2026');
    const demoUser: AnalystUser = {
      id: 'DGIS-7429',
      name: 'Capt. A. Sharma',
      callsign: 'VANGUARD-4',
      role: 'Senior Geospatial Intelligence Analyst',
      department: 'DGIS | Ministry of Defence',
      clearanceLevel: 'LEVEL 3 (TOP SECRET // SI/TK)',
      badgeId: 'IN-DEF-88219-GEO'
    };
    sessionStorage.setItem('terrasphere_auth_user', JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
  };

  return (
    <div className="min-h-screen bg-[#070b13] flex flex-col justify-between text-slate-100 selection:bg-cyan-500/30">
      {/* Top Classification Header */}
      <div className="w-full bg-[#05080f] border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2 text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-bold tracking-wider uppercase">
            RESTRICTED ACCESS // AUTHORIZED DEFENCE PERSONNEL ONLY
          </span>
        </div>
        <div className="text-slate-500 hidden sm:block">
          NODE: AIRGAP-SEC-NODE-04 • TERMINAL: ENCRYPTED
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-[#0c1424] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Subtle Corner Brackets for Military HUD Aesthetic */}
          <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

          {/* Header & Emblem */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600/30 via-emerald-500/20 to-blue-600/30 border border-cyan-500/40 shadow-inner mb-3">
              <Compass className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400">
              TERRASPHERE
            </h1>
            <p className="text-xs font-semibold text-slate-300 tracking-wide mt-0.5">
              Directorate General of Information Systems (DGIS)
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Ministry of Defence • National Satellite Intelligence Console
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Analyst ID Field */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
                <span>Analyst Service / Badge ID</span>
                <span className="text-[10px] font-mono text-cyan-400">SEC-ID</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={analystId}
                  onChange={(e) => setAnalystId(e.target.value)}
                  placeholder="e.g. DGIS-7429"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono text-xs transition"
                />
              </div>
            </div>

            {/* Access Passcode / Key */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
                <span>Security Token / Passcode</span>
                <span className="text-[10px] font-mono text-slate-400">AES-256</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Enter security key..."
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono text-xs transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Clearance Level Selector */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center justify-between">
                <span>Clearance Authorization Scope</span>
                <span className="text-[10px] text-emerald-400 font-mono">VERIFIED</span>
              </label>
              <select
                value={clearanceLevel}
                onChange={(e) => setClearanceLevel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="LEVEL_3_SECRET">LEVEL 3 - Top Secret // Geospatial Intel (DGIS)</option>
                <option value="LEVEL_2_CONFIDENTIAL">LEVEL 2 - Operational Confidential</option>
                <option value="LEVEL_1_RESTRICTED">LEVEL 1 - Surveillance Restricted Read-Only</option>
              </select>
            </div>

            {/* Authenticate Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-cyan-900/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Access Intelligence Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Bypass Button for Convenience */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 text-[11px] font-medium transition flex items-center justify-center gap-1.5"
            >
              <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Analyst Login (Capt. A. Sharma)</span>
            </button>

            <button
              type="button"
              onClick={onExploreTechStack}
              className="text-center text-[11px] text-slate-400 hover:text-slate-200 underline pt-1"
            >
              Preview 9-Stage Tech Stack Architecture
            </button>
          </div>
        </div>
      </div>

      {/* Footer Legal & Security Notice */}
      <footer className="w-full bg-[#05080f] border-t border-slate-800/80 px-4 py-3 text-center text-[10px] text-slate-500 font-mono">
        <p>
          DEFENCE INFORMATION WARFARE SECURITY STANDARD • UNAUTHORIZED ATTEMPTS ARE LOGGED & PROSECUTED UNDER SECTION 66F IT ACT
        </p>
      </footer>
    </div>
  );
};
