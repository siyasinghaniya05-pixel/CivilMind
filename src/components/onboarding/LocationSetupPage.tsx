'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { generateCityIntelligence } from '@/services/cityIntelligenceEngine';
import { CityProfile } from '@/types';
import { 
  Sparkles, 
  Search, 
  Navigation, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  ShieldAlert,
  Loader2
} from 'lucide-react';

export const LocationSetupPage: React.FC = () => {
  const { completeLocationSetup, user } = useCivic();

  const [selectedMethod, setSelectedMethod] = useState<'gps' | 'search'>('gps');
  const [cityName, setCityName] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState(0);
  const [targetProfile, setTargetProfile] = useState<CityProfile | null>(null);

  const synthesisSteps = [
    'Resolving municipal administrative boundaries & ward contours...',
    'Correlating OpenStreetMap roads, drainage network & elevation topography...',
    'Calculating composite Ward Development Index (WDI) & infrastructure risks...',
    'Generating dynamic AI development priority rankings & budget simulations...'
  ];

  const triggerSynthesisFlow = (profile: CityProfile) => {
    setTargetProfile(profile);
    setIsSynthesizing(true);
    setSynthesisStep(0);

    const stepInterval = setInterval(() => {
      setSynthesisStep((prev) => {
        if (prev < synthesisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            completeLocationSetup(profile);
          }, 500);
          return prev;
        }
      });
    }, 450);
  };

  const handleUseCurrentLocation = () => {
    setGpsError(null);
    setIsDetectingGps(true);

    if (!navigator.geolocation) {
      setIsDetectingGps(false);
      setGpsError('Geolocation is not supported by your browser. Please use Option 2 to search your city.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          // Attempt reverse geocoding via OpenStreetMap Nominatim
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`, {
            headers: { 'Accept': 'application/json' }
          });
          const data = await res.json();
          const detectedCity = data.address?.city || data.address?.town || data.address?.village || data.address?.municipality || 'Current Location';
          const detectedDistrict = data.address?.state_district || data.address?.county || 'District Region';
          const detectedState = data.address?.state || 'India';

          const synthesized = generateCityIntelligence(detectedCity, { lat, lng });
          synthesized.profile.district = detectedDistrict;
          synthesized.profile.state = detectedState;
          
          setIsDetectingGps(false);
          triggerSynthesisFlow(synthesized.profile);
        } catch {
          // Fallback if reverse geocoding request fails
          const synthesized = generateCityIntelligence('Selected Municipality', { lat, lng });
          setIsDetectingGps(false);
          triggerSynthesisFlow(synthesized.profile);
        }
      },
      (error) => {
        setIsDetectingGps(false);
        setGpsError(error.message || 'GPS location permission denied. Please search your city or municipality below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    const synthesized = generateCityIntelligence(cityName.trim());
    if (district.trim()) {
      synthesized.profile.district = district.trim().toLowerCase().includes('district') 
        ? district.trim() 
        : `${district.trim()} District`;
    }
    if (state.trim()) {
      synthesized.profile.state = state.trim();
    }

    triggerSynthesisFlow(synthesized.profile);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-zinc-950">CivicMind AI</span>
            <p className="text-[10px] text-zinc-400">Step 2 of 2 • Spatial Location Context</p>
          </div>
        </div>

        {user && (
          <div className="text-right text-xs">
            <span className="font-semibold text-zinc-900">{user.name}</span>
            <span className="text-zinc-400 block text-[11px]">{user.role} • {user.organization}</span>
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xl p-6 sm:p-10 space-y-8">
          {/* Headline */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[11px] font-semibold text-blue-700">
              <Compass className="w-3.5 h-3.5" />
              <span>Location-Agnostic Dynamic Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
              Select Your Municipality
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500">
              CivicMind AI does not use hardcoded data. Select your location to dynamically synthesize ward telemetry, infrastructure risks, projects, and budget planning.
            </p>
          </div>

          {/* 2 Primary Selection Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPTION 1: Use Current Location */}
            <div className={`p-6 sm:p-8 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-6 ${
              selectedMethod === 'gps' 
                ? 'border-blue-600 bg-blue-50/20 shadow-md' 
                : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/40'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 mb-1">
                    OPTION 1
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">Use Current Location</h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Automatically detect your live GPS coordinates. CivicMind AI will resolve your administrative boundary and build your local municipal canvas.
                  </p>
                </div>

                {gpsError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{gpsError}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedMethod('gps');
                  handleUseCurrentLocation();
                }}
                disabled={isDetectingGps || isSynthesizing}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDetectingGps ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Detecting GPS Coordinates...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    <span>Detect & Initialize Location</span>
                  </>
                )}
              </button>
            </div>

            {/* OPTION 2: Search City / Municipality */}
            <div className={`p-6 sm:p-8 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-6 ${
              selectedMethod === 'search' 
                ? 'border-blue-600 bg-blue-50/20 shadow-md' 
                : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/40'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-xs">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 text-zinc-800 mb-1">
                    OPTION 2
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">Search City / Municipality</h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Enter ANY Indian city, town, Nagar Parishad, Nagar Panchayat, or Municipal Council.
                  </p>
                </div>

                <form id="search-city-form" onSubmit={handleSearchSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-700">City / Municipality Name *</label>
                    <input
                      type="text"
                      required
                      value={cityName}
                      onFocus={() => setSelectedMethod('search')}
                      onChange={(e) => setCityName(e.target.value)}
                      placeholder="e.g. Alwar, Solapur, Baramati, Badlapur, Jalna..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-700">District (Optional)</label>
                      <input
                        type="text"
                        value={district}
                        onFocus={() => setSelectedMethod('search')}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="District / Region"
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-700">State</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Other State">Other State</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <button
                type="submit"
                form="search-city-form"
                disabled={!cityName.trim() || isSynthesizing}
                onClick={() => setSelectedMethod('search')}
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <span>Synthesize & Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-4xl w-full mx-auto text-center text-zinc-400 text-[11px] py-2">
        CivicMind AI Platform • Spatial Intelligence System for Any Indian Urban Local Body
      </div>

      {/* AI Intelligence Synthesis Modal Overlay */}
      {isSynthesizing && targetProfile && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <h3 className="text-xl font-black text-zinc-950">
                  Synthesizing {targetProfile.cityName}
                </h3>
                <p className="text-xs text-zinc-500">
                  {targetProfile.district} • {targetProfile.state}
                </p>
              </div>
            </div>

            {/* Synthesis Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-600">AI Spatial Intelligence Synthesis</span>
                <span className="font-mono text-zinc-400">
                  {Math.round(((synthesisStep + 1) / synthesisSteps.length) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((synthesisStep + 1) / synthesisSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Steps Checklist */}
            <div className="space-y-3 pt-2">
              {synthesisSteps.map((stepText, idx) => {
                const isDone = idx < synthesisStep;
                const isCurrent = idx === synthesisStep;
                return (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-zinc-200 shrink-0" />
                    )}
                    <span className={isCurrent ? 'font-semibold text-zinc-900' : isDone ? 'text-zinc-700' : 'text-zinc-400'}>
                      {stepText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
