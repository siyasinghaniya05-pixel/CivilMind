'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { PRE_INDEXED_CITIES, generateCityIntelligence } from '@/services/cityIntelligenceEngine';
import { CityProfile } from '@/types';
import { 
  Sparkles, 
  MapPin, 
  Search, 
  Navigation, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Activity,
  Layers,
  ShieldAlert
} from 'lucide-react';

export const LocationSetupPage: React.FC = () => {
  const { completeLocationSetup, user } = useCivic();

  const [activeTab, setActiveTab] = useState<'city' | 'parishad' | 'panchayat' | 'gps'>('city');
  const [searchQuery, setSearchQuery] = useState('');
  const [cityName, setCityName] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Maharashtra');
  
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState(0);
  const [selectedTargetCity, setSelectedTargetCity] = useState<CityProfile | null>(null);

  const synthesisSteps = [
    'Detecting administrative boundaries & GIS ward polygons...',
    'Correlating OpenStreetMap roads, drainage network & satellite topography...',
    'Synthesizing infrastructure hazards & composite WDI scores...',
    'Generating AI development priority rankings & budget simulations...'
  ];

  const handleSelectCity = (profile: CityProfile) => {
    setSelectedTargetCity(profile);
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
          }, 400);
          return prev;
        }
      });
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    const synthesized = generateCityIntelligence(cityName);
    if (district.trim()) synthesized.profile.district = `${district} District`;
    if (state.trim()) synthesized.profile.state = state;

    handleSelectCity(synthesized.profile);
  };

  const handleUseCurrentLocation = () => {
    setActiveTab('gps');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const synthesized = generateCityIntelligence('Detected Municipality', { lat, lng });
          synthesized.profile.cityName = 'Kalamb (Local ULB)';
          synthesized.profile.district = 'Yavatmal District';
          handleSelectCity(synthesized.profile);
        },
        () => {
          // Fallback to default Kalamb on error or permission deny
          handleSelectCity(PRE_INDEXED_CITIES[0]);
        }
      );
    } else {
      handleSelectCity(PRE_INDEXED_CITIES[0]);
    }
  };

  // Filter pre-indexed cities by tab and query
  const filteredCities = PRE_INDEXED_CITIES.filter((c) => {
    const matchesSearch = c.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.district.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'parishad') {
      return matchesSearch && c.ulbType === 'Nagar Parishad';
    }
    if (activeTab === 'panchayat') {
      return matchesSearch && c.ulbType === 'Nagar Panchayat';
    }
    return matchesSearch;
  });

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
            <p className="text-[10px] text-zinc-400">Step 2 of 2 • Spatial Configuration</p>
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
              <span>Pan-India Spatial Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
              Select Your City or Municipality
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500">
              Every dashboard, GIS map, infrastructure hazard model, and budget allocation will dynamically configure for this location.
            </p>
          </div>

          {/* Option Filters (The 4 options specified) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('city')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'city' 
                  ? 'bg-zinc-950 text-white shadow-xs' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              1. Search City
            </button>
            <button
              onClick={() => setActiveTab('parishad')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'parishad' 
                  ? 'bg-zinc-950 text-white shadow-xs' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              2. Search Nagar Parishad
            </button>
            <button
              onClick={() => setActiveTab('panchayat')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'panchayat' 
                  ? 'bg-zinc-950 text-white shadow-xs' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              3. Search Nagar Panchayat
            </button>
            <button
              onClick={handleUseCurrentLocation}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'gps' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>4. Use Current Location</span>
            </button>
          </div>

          {/* Quick Pre-Configured Examples (Kalamb, Yavatmal, Wardha, Jejuri, Pune) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-900">Recommended Indian Municipal Profiles:</span>
              <span className="text-zinc-400">Click any municipality to initialize</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="p-4 rounded-2xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white hover:border-blue-500 hover:shadow-md transition-all text-left group space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-700">
                      {city.ulbType}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Health: {city.cityHealthScore}/100
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-zinc-950 group-hover:text-blue-600 transition-colors">
                      {city.cityName}
                    </h4>
                    <p className="text-xs text-zinc-500">
                      {city.district}, {city.state}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-200/60 text-[10px] text-zinc-500">
                    <div>
                      <span className="text-zinc-400 block">Wards</span>
                      <strong className="text-zinc-800">{city.totalWards}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Population</span>
                      <strong className="text-zinc-800">{city.totalPopulation.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Budget</span>
                      <strong className="text-zinc-800">₹{city.totalBudgetCr.toFixed(1)} Cr</strong>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Search / Location Input Form */}
          <div className="pt-6 border-t border-zinc-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Or Enter Any Custom Indian Municipality
            </h3>

            <form onSubmit={handleCustomSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">City / Municipality Name</label>
                <input
                  type="text"
                  required
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="e.g. Kalamb, Jejuri, Wardha"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/60 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Yavatmal"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/60 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Synthesize</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Synthesis Modal / Loading Overlay */}
      {isSynthesizing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-zinc-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-7 h-7 animate-spin" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-zinc-950">
                Synthesizing City Intelligence
              </h3>
              <p className="text-xs text-zinc-500">
                Configuring dynamic spatial environment for <strong className="text-blue-600">{selectedTargetCity?.cityName}</strong>.
              </p>
            </div>

            {/* Step list */}
            <div className="space-y-2.5 text-left text-xs">
              {synthesisSteps.map((step, idx) => {
                const isCurrent = idx === synthesisStep;
                const isPassed = idx < synthesisStep;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 p-2 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-blue-50 text-blue-900 font-semibold'
                        : isPassed
                        ? 'text-emerald-700 font-medium'
                        : 'text-zinc-400 opacity-60'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <Activity className="w-4 h-4 text-blue-600 shrink-0 animate-pulse" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-zinc-300 shrink-0" />
                    )}
                    <span className="text-[11px] leading-tight">{step}</span>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${((synthesisStep + 1) / synthesisSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer text */}
      <div className="text-center text-[11px] text-zinc-400">
        CivicMind AI • Automatically supports all 4,500+ statutory Indian Urban Local Bodies
      </div>
    </div>
  );
};
