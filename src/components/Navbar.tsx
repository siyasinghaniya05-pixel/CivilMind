'use client';

import React from 'react';
import { useCivic } from '@/context/CivicContext';
import { 
  Sparkles, 
  MapPin, 
  Search, 
  Bell, 
  ChevronDown,
  Command
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenNewProjectModal: () => void }> = () => {
  const { currentCity, setIsCityModalOpen, setCurrentView, user, logoutUser } = useCivic();
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="flex h-14 items-center justify-between px-4 lg:px-8 max-w-[1600px] mx-auto">
        {/* Left: Modern Logo & City Selector */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setCurrentView('landing')}
            title="Go to Landing Page"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-base tracking-tight text-zinc-950">
                CivicMind
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
                AI
              </span>
            </div>
          </div>

          {/* City Selector Dropdown Pill */}
          <button
            onClick={() => setCurrentView('location-setup')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs font-medium text-zinc-800"
            title="Click to Switch City"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{currentCity ? `${currentCity.cityName}, ${currentCity.state}` : 'Selected Municipality'}</span>
            <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5" />
          </button>
        </div>

        {/* Center: Minimalist Search (⌘K style) */}
        <div className="hidden md:flex items-center max-w-sm w-full mx-6">
          <button
            onClick={() => setCurrentView('location-setup')}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50/80 hover:bg-zinc-100/80 text-zinc-400 text-xs transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search projects, wards, risks...</span>
            </div>
            <div className="flex items-center gap-0.5 text-[10px] font-mono text-zinc-400 bg-white border border-zinc-200 px-1.5 py-0.5 rounded">
              <Command className="w-2.5 h-2.5" /> K
            </div>
          </button>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3 relative">
          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 pl-2 border-l border-zinc-200 hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center font-semibold text-xs uppercase">
                {user ? user.name.slice(0, 2) : 'CO'}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <p className="font-medium text-zinc-900">{user?.name || 'Chief Officer'}</p>
                <p className="text-[11px] text-zinc-400">{user?.role || 'Municipal Admin'}</p>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-zinc-200 shadow-xl py-1.5 z-50 text-xs text-zinc-700 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-zinc-100">
                  <p className="font-semibold text-zinc-950 truncate">{user?.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{user?.organization}</p>
                </div>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setCurrentView('location-setup');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-50 text-zinc-700 flex items-center justify-between"
                >
                  <span>Switch Location</span>
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setCurrentView('landing');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-50 text-zinc-700"
                >
                  Landing Page
                </button>
                <div className="pt-1 border-t border-zinc-100">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logoutUser();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 font-medium"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
