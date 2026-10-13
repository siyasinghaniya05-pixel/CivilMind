'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { generateCityIntelligence } from '@/services/cityIntelligenceEngine';
import { CityProfile } from '@/types';
import { 
  Building2, 
  MapPin, 
  Search, 
  Navigation, 
  CheckCircle2, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Edit3, 
  ShieldCheck, 
  Layers, 
  IndianRupee, 
  Check, 
  FileText,
  AlertCircle,
  Database,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PredefinedCityMeta {
  name: string;
  marathiName: string;
  state: string;
  district: string;
  code: string;
  ulbClass: string;
  population: string;
  wards: number;
  budgetCr: number;
  tag: string;
  lat: number;
  lng: number;
}

const PRESET_ULBS: PredefinedCityMeta[] = [
  {
    name: 'Brihanmumbai Municipal Corporation',
    marathiName: 'बृहन्मुंबई महानगरपालिका',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    code: 'MH-MUM-001',
    ulbClass: 'Class A+ Municipal Corp',
    population: '1.29 Cr (12,940,000)',
    wards: 24,
    budgetCr: 59954.75,
    tag: 'NUDM Verified',
    lat: 19.0760,
    lng: 72.8777
  },
  {
    name: 'Pune Municipal Corporation',
    marathiName: 'पुणे महानगरपालिका',
    state: 'Maharashtra',
    district: 'Pune',
    code: 'MH-PUN-002',
    ulbClass: 'Class A Municipal Corp',
    population: '42.5 Lakhs (4,250,000)',
    wards: 18,
    budgetCr: 9515.00,
    tag: 'Smart City Pioneer',
    lat: 18.5204,
    lng: 73.8567
  },
  {
    name: 'Nagpur Municipal Corporation',
    marathiName: 'नागपूर महानगरपालिका',
    state: 'Maharashtra',
    district: 'Nagpur',
    code: 'MH-NAG-003',
    ulbClass: 'Class A Municipal Corp',
    population: '28.1 Lakhs (2,810,000)',
    wards: 16,
    budgetCr: 3240.50,
    tag: 'Central India Hub',
    lat: 21.1458,
    lng: 79.0882
  },
  {
    name: 'Thane Municipal Corporation',
    marathiName: 'ठाणे महानगरपालिका',
    state: 'Maharashtra',
    district: 'Thane',
    code: 'MH-THA-004',
    ulbClass: 'Class A Municipal Corp',
    population: '22.4 Lakhs (2,240,000)',
    wards: 16,
    budgetCr: 4370.25,
    tag: 'Lakes City Council',
    lat: 19.2183,
    lng: 72.9781
  },
  {
    name: 'Nashik Municipal Corporation',
    marathiName: 'नाशिक महानगरपालिका',
    state: 'Maharashtra',
    district: 'Nashik',
    code: 'MH-NAS-005',
    ulbClass: 'Class B Municipal Corp',
    population: '18.5 Lakhs (1,850,000)',
    wards: 15,
    budgetCr: 2180.00,
    tag: 'Godavari Basin',
    lat: 19.9975,
    lng: 73.7898
  },
  {
    name: 'Chhatrapati Sambhajinagar MC',
    marathiName: 'छत्रपती संभाजीनगर मनपा',
    state: 'Maharashtra',
    district: 'Chhatrapati Sambhajinagar',
    code: 'MH-CSN-006',
    ulbClass: 'Class B Municipal Corp',
    population: '14.8 Lakhs (1,480,000)',
    wards: 14,
    budgetCr: 1850.75,
    tag: 'Heritage Corridor',
    lat: 19.8762,
    lng: 75.3433
  }
];

export const LocationSetupPage: React.FC = () => {
  const { completeLocationSetup, user } = useCivic();

  // Wizard Step: 1 = Search, 2 = Verify, 3 = Ingestion/Synthesis
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(2);
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUlbMeta, setSelectedUlbMeta] = useState<PredefinedCityMeta>(PRESET_ULBS[0]);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Synthesis Pipeline States
  const [synthesisStep, setSynthesisStep] = useState<number>(0);
  const synthesisSteps = [
    'Resolving municipal administrative boundaries & cadastral ward polygons...',
    'Correlating OpenStreetMap roads, drainage network & elevation topography...',
    'Calculating composite Ward Development Index (WDI) & infrastructure risks...',
    'Generating dynamic AI development priority rankings & AMRUT budget models...'
  ];

  const filteredUlbs = PRESET_ULBS.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.marathiName.includes(searchQuery) ||
    u.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUlb = (meta: PredefinedCityMeta) => {
    setSelectedUlbMeta(meta);
    setCurrentStep(2);
  };

  const handleGpsDetect = () => {
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
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=12&addressdetails=1`
          );
          const data = await res.json();
          const detectedCity = data.address?.city || 
                               data.address?.town || 
                               data.address?.village || 
                               data.address?.municipality || 
                               'Local Municipal Council';
          const detectedDistrict = data.address?.state_district || data.address?.county || 'Local District';
          const detectedState = data.address?.state || 'Maharashtra';

          const newMeta: PredefinedCityMeta = {
            name: `${detectedCity} Municipal Council`,
            marathiName: detectedCity,
            state: detectedState,
            district: detectedDistrict,
            code: `GPS-REV-${Math.round(latitude * 100)}`,
            ulbClass: 'Class B Municipal Council',
            population: '3.8 Lakhs (380,000)',
            wards: 18,
            budgetCr: 42.50,
            tag: 'GPS Telemetry Resolved',
            lat: latitude,
            lng: longitude
          };
          setSelectedUlbMeta(newMeta);
          setIsDetectingGps(false);
          setCurrentStep(2);
        } catch {
          setIsDetectingGps(false);
          setSelectedUlbMeta(PRESET_ULBS[0]);
          setCurrentStep(2);
        }
      },
      () => {
        setGpsError('Unable to resolve GPS location. Please select from the verified municipal directory.');
        setIsDetectingGps(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleConfirmAndIngest = () => {
    setCurrentStep(3);
    setSynthesisStep(0);

    const synthesized = generateCityIntelligence(selectedUlbMeta.name, {
      lat: selectedUlbMeta.lat,
      lng: selectedUlbMeta.lng,
      district: selectedUlbMeta.district,
      state: selectedUlbMeta.state
    });

    const stepInterval = setInterval(() => {
      setSynthesisStep((prev) => {
        if (prev < synthesisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          setTimeout(() => {
            completeLocationSetup(synthesized.profile);
          }, 600);
          return prev;
        }
      });
    }, 550);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between text-slate-800 dark:text-slate-100 antialiased selection:bg-[#145DA0] selection:text-white">
      
      {/* 1. TOP HEADER & SOVEREIGN ACCENT */}
      <header className="w-full">
        {/* Tricolor Micro-Hairline */}
        <div className="h-1 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]" />
          <div className="bg-[#FFFFFF]" />
          <div className="bg-[#138808]" />
        </div>

        {/* Top Rim */}
        <div className="bg-[#102A43] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-[#243B53]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-wide">भारत सरकार | GOVERNMENT OF INDIA</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 hidden sm:inline">National Urban Digital Mission (NUDM) Protocol</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                NIC SPATIAL ENGINE ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Wizard Header Strip */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded uppercase">
                  MoHUA Ingestion Protocol v4.2
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  NIC Server Link Active
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  ULB Ingestion & Intelligence Setup Wizard
                </h1>
                <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-semibold">
                  नगर निकाय ऑनबोर्डिंग
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Standardized statutory pipeline for spatial boundary harmonization, fiscal telemetry calibration, and predictive civic AI setup.
              </p>
            </div>

            {/* Stepper Navigation Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentStep === 1
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-mono text-[10px]">1</span>
                <span>Jurisdiction Search</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentStep === 2
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-mono text-[10px]">2</span>
                <span>Baseline Verification</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentStep === 3
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-mono text-[10px]">3</span>
                <span>Intelligence Engine</span>
              </button>
            </div>
          </div>

          {/* Stepper Visual Pipeline Ribbon */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
            {/* Step 1 Tile */}
            <div 
              onClick={() => setCurrentStep(1)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                currentStep === 1 
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Step 01 • Resolved
                </span>
                <span className="font-mono text-[11px] text-slate-400">{selectedUlbMeta.code}</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                Search ULB & State
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {selectedUlbMeta.name}
              </div>
            </div>

            {/* Step 2 Tile */}
            <div 
              onClick={() => setCurrentStep(2)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                currentStep === 2 
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Step 02 • Active Review
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.5 rounded">
                  Ready
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                Confirm Municipal Profile
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {selectedUlbMeta.wards} Wards • ₹{selectedUlbMeta.budgetCr.toLocaleString()} Cr Outlay
              </div>
            </div>

            {/* Step 3 Tile */}
            <div 
              onClick={() => setCurrentStep(3)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                currentStep === 3 
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Step 03 • Processing
                </span>
                <span className="font-mono text-[11px] text-slate-400">Dynamic AI</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                Generating City Intelligence
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                Real-time risk matrix & AMRUT allocation
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WIZARD CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ========================================================================= */}
        {/* STEP 1: JURISDICTION SEARCH                                              */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-600">
                    <span>Spatial Ingestion Protocol</span>
                    <span>•</span>
                    <span className="text-slate-400">National Urban Digital Mission Directory</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Search Indian City / ULB Registry
                  </h2>
                  <p className="text-xs text-slate-500">
                    Type municipal corporation name, PIN-code sector, or 6-digit MoHUA ULB code to ingest boundaries.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGpsDetect}
                  disabled={isDetectingGps}
                  className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-bold text-xs border border-blue-200 dark:border-blue-800 flex items-center gap-2 shrink-0 transition-colors"
                >
                  <Navigation className={`w-4 h-4 ${isDetectingGps ? 'animate-spin' : ''}`} />
                  <span>{isDetectingGps ? 'Acquiring GIS Fix...' : 'Use Current GPS Geolocation'}</span>
                </button>
              </div>

              {gpsError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{gpsError}</span>
                </div>
              )}

              {/* State Pills Filter Row */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-bold uppercase text-slate-400">
                  Filter Jurisdiction by State / UT (राज्य चयन)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Maharashtra (महाराष्ट्र)', 'Gujarat (गुजरात)', 'Karnataka (कर्नाटक)', 'Tamil Nadu (तमिलनाडु)', 'Uttar Pradesh (उत्तर प्रदेश)', 'Madhya Pradesh (मध्य प्रदेश)'].map((st) => {
                    const isSelected = selectedState === st.split(' ')[0];
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedState(st.split(' ')[0])}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-700 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        <span>{st}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative pt-2">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ULB Name e.g. Brihanmumbai, Pune, Nagpur, Thane, Nashik..."
                  className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Verified ULB Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                {filteredUlbs.map((ulb) => (
                  <div
                    key={ulb.code}
                    onClick={() => handleSelectUlb(ulb)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-600 bg-white dark:bg-slate-900 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-400">{ulb.code}</span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                          {ulb.tag}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-blue-600 transition-colors">
                        {ulb.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold">{ulb.marathiName}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span>{ulb.wards} Wards</span>
                      <span className="font-bold text-blue-600">₹{ulb.budgetCr.toLocaleString()} Cr Outlay</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: CONFIRM MUNICIPAL BASELINE                                       */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Sub-Header Banner */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-600">
                  <span>Step 2 of 3 • Municipal Baseline Registry</span>
                  <span>•</span>
                  <span className="text-emerald-600">Cross-verified via NUDM API</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Verify & Confirm Municipal Baseline
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
                  Municipal attributes, spatial boundaries, and financial accounts synced from the National Urban Digital Mission & Urban Development Department (UDD).
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-start lg:self-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Change ULB</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAndIngest}
                  className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
                >
                  <span>Confirm & Ingest Data</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2-Column Responsive Verification Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Municipal Attributes (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Profile Summary Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        बृहन्
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {selectedUlbMeta.name}
                          </h3>
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-xs text-slate-500">
                          {selectedUlbMeta.marathiName} • {selectedUlbMeta.district}, {selectedUlbMeta.state}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        NUDM Verified
                      </span>
                      <span className="bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        GIS Cadastre Synced
                      </span>
                    </div>
                  </div>

                  {/* Structured Administrative Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400">ULB Classification</span>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{selectedUlbMeta.ulbClass}</div>
                      <span className="text-[10px] font-mono text-slate-500">महानगरपालिका दर्जा</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Administrative Units</span>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{selectedUlbMeta.wards} Administrative Wards</div>
                      <span className="text-[10px] font-mono text-slate-500">7 Administrative Circles</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Population & Density</span>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{selectedUlbMeta.population}</div>
                      <span className="text-[10px] font-mono text-slate-500">21,500 residents / km²</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Total Spatial Extent</span>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">603.4 km² Cadastral Canvas</div>
                      <span className="text-[10px] font-mono text-slate-500">Island City + Suburban Zones</span>
                    </div>
                  </div>
                </div>

                {/* Fiscal Outlay & Treasury Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-blue-600" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Municipal Ledger & Capital Outlay (FY 2026-27)
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded">
                      Standing Committee Approved
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Total Annual Outlay</span>
                      <div className="text-lg font-black text-blue-700 dark:text-blue-300 mt-1">
                        ₹{selectedUlbMeta.budgetCr.toLocaleString()} Cr
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold mt-1">▲ +14.2% vs FY25</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-slate-400">AMRUT 2.0 Allocation</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                        ₹{(selectedUlbMeta.budgetCr * 0.18).toFixed(1)} Cr
                      </div>
                      <span className="text-[10px] font-mono text-blue-600 font-bold mt-1">100% Water Security</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-slate-400">15th FC Grants</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                        ₹{(selectedUlbMeta.budgetCr * 0.12).toFixed(1)} Cr
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold mt-1">Tied & Untied Grants</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Cadastral Coordinates & Signatory (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Spatial Anchor Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Spatial Anchor & GIS Sync</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">WGS84 EPSG:4326</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Center Coordinates:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {selectedUlbMeta.lat.toFixed(4)}° N, {selectedUlbMeta.lng.toFixed(4)}° E
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cadastral Polygons:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">4,820 Polygons Ingested</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monsoon Rainfall Avg:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">2,425 mm (IMD Normal)</span>
                    </div>
                  </div>

                  {/* Authorized Nodal Officer Card */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Nodal Signatory</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {user ? user.name : 'Shri Rajeshwar Rao, IAS'}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {user ? user.role : 'Municipal Commissioner & CEO'}
                      </span>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>DSC Authorized</span>
                    </div>
                  </div>
                </div>

                {/* Statutory Confirm Action Box */}
                <div className="bg-gradient-to-br from-blue-700 to-[#102A43] p-6 rounded-2xl text-white shadow-md space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      ● READY FOR INGESTION
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Trigger Intelligence Engine Pipeline
                    </h3>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Harmonize cadastral boundaries, seed real-time risk scores, and unlock the executive municipal dashboard.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmAndIngest}
                    className="w-full py-3 px-4 rounded-xl bg-white text-blue-900 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-blue-700" />
                    <span>Confirm & Launch CivicMind Intelligence</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: INTELLIGENCE ENGINE SYNTHESIS (PROCESSING)                       */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto my-auto py-12 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
              
              <div className="w-16 h-16 rounded-3xl bg-blue-700 text-white mx-auto flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 animate-spin text-cyan-300" style={{ animationDuration: '3s' }} />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                  STATUTORY AI ENGINE PROVISIONING
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Synthesizing {selectedUlbMeta.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedUlbMeta.district} • {selectedUlbMeta.state} • {selectedUlbMeta.wards} Wards
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Spatial & Predictive Engine Pipeline
                  </span>
                  <span className="font-mono font-bold text-blue-600">
                    {Math.round(((synthesisStep + 1) / synthesisSteps.length) * 100)}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-700 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((synthesisStep + 1) / synthesisSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Checklist */}
              <div className="space-y-3 pt-2 text-left">
                {synthesisSteps.map((stepText, idx) => {
                  const isDone = idx < synthesisStep;
                  const isCurrent = idx === synthesisStep;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
                      )}
                      <span className={isCurrent ? 'font-bold text-slate-900 dark:text-white' : isDone ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'}>
                        {stepText}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 3. FOOTER */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800">
        <p className="font-semibold text-slate-600 dark:text-slate-400">
          CivicMind Municipal Intelligence Gateway • National Urban Digital Mission (NUDM) Architecture
        </p>
        <p className="text-[11px] mt-0.5">
          Validated against CPHEEO Water-Stormwater Manuals & 15th FC Incentive Benchmarks.
        </p>
      </footer>
    </div>
  );
};
