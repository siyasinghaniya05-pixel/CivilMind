'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { PRE_INDEXED_CITIES } from '@/services/cityIntelligenceEngine';
import { 
  Building2, 
  Search, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Map, 
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({ isOpen, onClose }) => {
  const { currentCity, switchCity, searchAndSetCity, setActiveTab } = useCivic();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredCities = PRE_INDEXED_CITIES.filter(
    c => c.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
         c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (city: typeof PRE_INDEXED_CITIES[0]) => {
    switchCity(city);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    onClose();
  };

  const handleCustomSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    searchAndSetCity(searchQuery.trim());
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
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
      (position) => {
        const { latitude, longitude } = position.coords;
        // In real deployment this uses reverse geocoding; here we synthesize municipal territory for these coords
        searchAndSetCity(`GPS Location (${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E)`, {
          lat: latitude,
          lng: longitude
        });
        setIsDetectingGps(false);
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 }
        });
        onClose();
      },
      (error) => {
        setGpsError('Could not obtain GPS permission. Please enter city name manually.');
        setIsDetectingGps(false);
      },
      { timeout: 8000 }
    );
  };

  const handlePickOnMap = () => {
    onClose();
    setActiveTab('smart-map');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Pan-India Municipal Location Selector
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Select or Search Any City in India
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              CivicMind AI dynamically generates infrastructure intelligence and risk maps for any Nagar Parishad, Panchayat, or Municipal Council.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleCustomSearchSubmit} className="space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type ANY Indian city/town name (e.g. Kalamb, Jejuri, Wardha, Solapur, Baramati)..."
              className="w-full pl-11 pr-28 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
            >
              Analyze City
            </button>
          </div>

          {/* Quick Location Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleGpsDetect}
              disabled={isDetectingGps}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Navigation className={`w-3.5 h-3.5 text-blue-600 ${isDetectingGps ? 'animate-spin' : ''}`} />
              {isDetectingGps ? 'Detecting Location...' : 'Use Current GPS Location'}
            </button>

            <button
              type="button"
              onClick={handlePickOnMap}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Map className="w-3.5 h-3.5 text-emerald-600" />
              Pin on GIS OpenStreetMap
            </button>
          </div>

          {gpsError && (
            <p className="text-xs text-red-600 font-medium">{gpsError}</p>
          )}
        </form>

        {/* Currently Active City Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-emerald-900/10 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Currently Active Location</span>
              <strong className="text-sm text-slate-900 dark:text-white">
                {currentCity.cityName} {currentCity.ulbType}
              </strong>
              <span className="text-xs text-slate-500 ml-1">
                ({currentCity.district}, {currentCity.state})
              </span>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              Score: {currentCity.developmentScore}/100
            </span>
            <p className="text-[10px] text-slate-500">{currentCity.totalWards} Wards</p>
          </div>
        </div>

        {/* Pre-Indexed Benchmark Nagar Parishads & Councils */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span>Pre-Indexed Benchmark Cities</span>
            <span className="text-[11px] font-normal text-slate-500">Instant Full Telemetry</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCities.map((city) => {
              const isCurrent = currentCity.id === city.id;

              return (
                <div
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    isCurrent
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm ring-1 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {city.cityName}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        ({city.marathiName})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {city.ulbType} • {city.district}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                      <span>Pop: {city.totalPopulation.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span>₹{city.totalBudgetCr.toFixed(1)} Cr Outlay</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                      {city.developmentScore}
                    </span>
                    <span className="text-[10px] text-slate-400 block">WDI</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
