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
    setIsDetectingGps(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      setIsDetectingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Attempt reverse geocoding via OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=12&addressdetails=1`
          );
          const data = await res.json();
          const detectedCity = data.address?.city || 
                               data.address?.town || 
                               data.address?.village || 
                               data.address?.municipality || 
                               data.address?.county || 
                               'Local Municipality';
          const detectedDistrict = data.address?.state_district || data.address?.county || 'District Administration';
          const detectedState = data.address?.state || 'Maharashtra';

          const synthesized = generateCityIntelligence(detectedCity, {
            lat: latitude,
            lng: longitude,
            district: detectedDistrict,
            state: detectedState
          });
          setIsDetectingGps(false);
          triggerSynthesisFlow(synthesized.profile);
        } catch {
          // Offline / Fallback handling
          const synthesized = generateCityIntelligence('Local Municipality', {
            lat: latitude,
            lng: longitude,
            district: 'District ULB',
            state: 'State Administration'
          });
          setIsDetectingGps(false);
          triggerSynthesisFlow(synthesized.profile);
        }
      },
      () => {
        setGpsError('Unable to retrieve your location. Please grant location permissions or search your municipality manually.');
        setIsDetectingGps(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    const synthesized = generateCityIntelligence(cityName.trim(), {
      district: district.trim() || undefined,
      state: state.trim() || undefined
    });
    triggerSynthesisFlow(synthesized.profile);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#52606D] flex flex-col justify-between p-4 sm:p-6 lg:p-8 antialiased selection:bg-[#145DA0] selection:text-white">
      
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-4 border-b border-[#CBD5E1]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#102A43] text-[#F0B429] flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[16px] font-bold text-[#102A43]">CivicMind AI</span>
            <p className="text-[11.5px] text-[#7B8794]">Step 2 of 2 • Spatial Location Context</p>
          </div>
        </div>

        {user && (
          <div className="text-right text-[12.5px]">
            <span className="font-semibold text-[#102A43]">{user.name}</span>
            <span className="text-[#7B8794] block text-[11px]">{user.role} • {user.organization}</span>
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-md p-6 sm:p-10 space-y-8">
          
          {/* Headline */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EBF8FF] border border-[#BEE3F8] text-[11.5px] font-semibold text-[#1E3A5F] font-gov-label">
              <Compass className="w-3.5 h-3.5 text-[#145DA0]" />
              <span>Location-Agnostic Dynamic Engine</span>
            </div>
            <h1 className="text-[32px] sm:text-[38px] font-bold tracking-tight text-[#102A43]">
              Select Your Municipality
            </h1>
            <p className="text-[14.5px] text-[#52606D] leading-relaxed">
              CivicMind AI does not use hardcoded data. Select your location to dynamically synthesize ward telemetry, infrastructure risks, projects, and budget planning.
            </p>
          </div>

          {/* 2 Primary Selection Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OPTION 1: Use Current Location */}
            <div className={`p-6 sm:p-7 rounded-lg border-2 transition-all flex flex-col justify-between space-y-6 ${
              selectedMethod === 'gps' 
                ? 'border-[#145DA0] bg-[#F0F4F8]/60 shadow-xs' 
                : 'border-[#CBD5E1] hover:border-[#94A3B8] bg-white'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded bg-[#145DA0] text-white flex items-center justify-center shadow-xs">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-[#EBF8FF] text-[#1E3A5F] mb-1 font-gov-label">
                    OPTION 1
                  </div>
                  <h3 className="text-[19px] font-bold text-[#102A43]">Use Current Location</h3>
                  <p className="text-[13.5px] text-[#52606D] mt-1 leading-relaxed">
                    Automatically detect your live GPS coordinates. CivicMind AI will resolve your administrative boundary and build your local municipal canvas.
                  </p>
                </div>

                {gpsError && (
                  <div className="p-3 rounded bg-red-50 border border-red-200 text-[12px] text-[#C53030] flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#C53030]" />
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
                className="w-full py-3 px-4 rounded bg-[#145DA0] hover:bg-[#0E4477] text-white font-semibold text-[15px] shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-[#145DA0]"
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
            <div className={`p-6 sm:p-7 rounded-lg border-2 transition-all flex flex-col justify-between space-y-6 ${
              selectedMethod === 'search' 
                ? 'border-[#145DA0] bg-[#F0F4F8]/60 shadow-xs' 
                : 'border-[#CBD5E1] hover:border-[#94A3B8] bg-white'
            }`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded bg-[#102A43] text-white flex items-center justify-center shadow-xs">
                  <Search className="w-6 h-6 text-[#F0B429]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-[#EBF8FF] text-[#1E3A5F] mb-1 font-gov-label">
                    OPTION 2
                  </div>
                  <h3 className="text-[19px] font-bold text-[#102A43]">Search City / Municipality</h3>
                  <p className="text-[13.5px] text-[#52606D] mt-1 leading-relaxed">
                    Enter ANY Indian city, town, Nagar Parishad, Nagar Panchayat, or Municipal Council.
                  </p>
                </div>

                <form id="search-city-form" onSubmit={handleSearchSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-[#1E3A5F] font-gov-label">City / Municipality Name *</label>
                    <input
                      type="text"
                      required
                      value={cityName}
                      onFocus={() => setSelectedMethod('search')}
                      onChange={(e) => setCityName(e.target.value)}
                      placeholder="e.g. Alwar, Solapur, Baramati, Badlapur, Jalna..."
                      className="w-full px-3.5 py-2.5 rounded border border-[#CBD5E1] bg-white text-[13.5px] text-[#102A43] focus:outline-none focus:ring-1 focus:ring-[#145DA0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#1E3A5F] font-gov-label">District (Optional)</label>
                      <input
                        type="text"
                        value={district}
                        onFocus={() => setSelectedMethod('search')}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="District / Region"
                        className="w-full px-3 py-2 rounded border border-[#CBD5E1] bg-white text-[13px] text-[#102A43] focus:outline-none focus:ring-1 focus:ring-[#145DA0]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#1E3A5F] font-gov-label">State</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-[#CBD5E1] bg-white text-[13px] text-[#102A43] focus:outline-none focus:ring-1 focus:ring-[#145DA0] font-medium cursor-pointer"
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
                className="w-full py-3 px-4 rounded bg-[#102A43] hover:bg-[#243B53] text-white font-semibold text-[15px] shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-40 border border-[#102A43]"
              >
                <span>Synthesize & Launch Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#F0B429]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-4xl w-full mx-auto text-center text-[#7B8794] text-[11.5px] py-2">
        CivicMind AI Platform • Spatial Intelligence System for Any Indian Urban Local Body
      </div>

      {/* AI Intelligence Synthesis Modal Overlay */}
      {isSynthesizing && targetProfile && (
        <div className="fixed inset-0 z-50 bg-[#102A43]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 border border-[#CBD5E1]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-[#145DA0] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-6 h-6 animate-spin text-[#F0B429]" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-[#102A43]">
                  Synthesizing {targetProfile.cityName}
                </h3>
                <p className="text-[13px] text-[#52606D]">
                  {targetProfile.district} • {targetProfile.state}
                </p>
              </div>
            </div>

            {/* Synthesis Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-[#145DA0] font-gov-label">AI Spatial Intelligence Synthesis</span>
                <span className="font-mono text-[#7B8794]">
                  {Math.round(((synthesisStep + 1) / synthesisSteps.length) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#145DA0] rounded-full transition-all duration-300 ease-out"
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
                  <div key={idx} className="flex items-center gap-3 text-[13px]">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16866B] shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#145DA0] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#CBD5E1] shrink-0" />
                    )}
                    <span className={isCurrent ? 'font-semibold text-[#102A43]' : isDone ? 'text-[#52606D]' : 'text-[#7B8794]'}>
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
