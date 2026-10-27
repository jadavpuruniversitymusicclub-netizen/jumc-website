"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Music, 
  Radio, 
  Flame, 
  Award, 
  Layers, 
  X,
  Filter
} from 'lucide-react';
import { EVENTS_DATA, EventItem } from '@/data/eventsData';
import MilaapBrand from '@/components/MilaapBrand';
import MandalaBackground from '@/components/MandalaBackground';

const CATEGORIES = [
  'All',
  'Flagship Fest',
  'Eastern & Light Vocals',
  'Western & Band',
  'Instrumental',
  'Dance (JUDF)',
  'Workshops',
] as const;

const STATUSES = ['All', 'Open', 'Upcoming', 'Closed'] as const;

export default function EventsPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Live filtered events
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'All' && event.status !== selectedStatus) {
        return false;
      }
      // Search query filter (matches title, subtitle, tags, description, venue)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesSubtitle = event.subtitle?.toLowerCase().includes(query) ?? false;
        const matchesTags = event.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesDesc = event.shortDescription.toLowerCase().includes(query);
        const matchesClub = event.club.toLowerCase().includes(query);
        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesTags &&
          !matchesVenue &&
          !matchesDesc &&
          !matchesClub
        ) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const hasActiveFilters =
    selectedCategory !== 'All' || selectedStatus !== 'All' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen text-slate-100 relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dynamic Ambient Background Accents */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-900/20 blur-[140px]" />
        <div className="absolute top-[35%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#E60026]/15 blur-[160px]" />
        <div className="absolute bottom-[10%] left-[25%] w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[180px]" />
      </div>

      {/* Srijan JU Style Header Bar */}
      <div className="mb-10 p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle decorative top border glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E60026] via-amber-400 to-transparent opacity-80" />

        {/* Left: Bold EVENTS Heading with badge */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase bg-[#E60026]/20 border border-[#E60026]/40 text-[#ff4d6d]">
              CULTURAL CALENDAR • 2026
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-amber-500/10 border border-amber-500/30 text-amber-300">
              JUMC X JUDW
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white flex items-center gap-3">
            EVENTS
            <span className="text-sm font-medium font-mono text-slate-400 tracking-normal px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              PORTAL
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-md">
            Explore flagship fests, vocal battles, dance cyphers, and masterclasses across Jadavpur University.
          </p>
        </div>

        {/* Right: Sleek Chamfered Glassmorphic Search Bar */}
        <div className="w-full md:w-96 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full group">
            {/* Chamfered accent border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E60026]/40 via-amber-400/30 to-blue-600/40 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-300 blur-sm pointer-events-none" />

            <div className="relative flex items-center w-full bg-black/35 border border-white/15 focus-within:border-amber-400/80 rounded-xl backdrop-blur-xl px-4 py-3 transition-all">
              <Search className="w-5 h-5 text-amber-400/80 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by name or tag..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden w-full sm:w-auto px-4 py-3 rounded-xl bg-black/40 border border-white/15 flex items-center justify-center gap-2 text-sm font-semibold text-slate-200"
          >
            <Filter className="w-4 h-4 text-amber-400" />
            Filters {hasActiveFilters && '(Active)'}
          </button>
        </div>
      </div>

      {/* Portal Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar (Filters) */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Filter Container */}
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl sticky top-28">
            {/* Header with Total Count */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 block">
                  DIRECTORY STATUS
                </span>
                <p className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Showing {filteredEvents.length}{' '}
                  {filteredEvents.length === 1 ? 'event' : 'events'}
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* CATEGORIES Section with Srijan Angled Highlight Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-300 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#E60026]" />
                  CATEGORIES
                </h3>
              </div>

              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileFilterOpen(false);
                      }}
                      className={`relative w-full text-left px-3.5 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-between group overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-[#E60026]/20 via-amber-500/10 to-transparent text-white border border-[#E60026]/30 shadow-[0_0_12px_rgba(230,0,38,0.2)]'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {/* Srijan Active Angled Highlight Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#E60026] via-amber-400 to-[#E60026] rounded-r shadow-[0_0_8px_#E60026]" />
                      )}

                      <span className="flex items-center gap-2 pl-1.5">
                        {cat === 'All' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                        {cat === 'Flagship Fest' && <Flame className="w-3.5 h-3.5 text-[#E60026]" />}
                        {cat === 'Eastern & Light Vocals' && <Music className="w-3.5 h-3.5 text-yellow-400" />}
                        {cat === 'Western & Band' && <Radio className="w-3.5 h-3.5 text-blue-400" />}
                        {cat === 'Instrumental' && <Music className="w-3.5 h-3.5 text-emerald-400" />}
                        {cat === 'Dance (JUDF)' && <Award className="w-3.5 h-3.5 text-rose-400" />}
                        {cat === 'Workshops' && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                        <span className="truncate">{cat}</span>
                      </span>

                      {/* Pill with count */}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#E60026]/30 text-white font-bold'
                            : 'bg-white/5 text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        {cat === 'All'
                          ? EVENTS_DATA.length
                          : EVENTS_DATA.filter((e) => e.category === cat).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STATUS Section */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                STATUS
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {STATUSES.map((status) => {
                  const isActive = selectedStatus === status;
                  return (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setMobileFilterOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                        isActive
                          ? 'bg-amber-400/20 text-amber-200 border-amber-400/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                          : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border-white/5 hover:bg-white/[0.07]'
                      }`}
                    >
                      {status === 'Open' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                      {status === 'Upcoming' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                      {status === 'Closed' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      )}
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Club Synergy Banner */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-black border border-white/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#E60026] uppercase font-bold">
                    OFFICIAL JOINT FESTIVAL
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Organised synergistically by the <strong className="text-white">JUMC</strong> (Music Club) &amp; <strong className="text-amber-300">JUDW</strong> (Dance Wing).
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Event Grid */}
        <main className="lg:col-span-9">
          {filteredEvents.length === 0 ? (
            /* Empty State */
            <div className="p-12 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center flex flex-col items-center justify-center min-h-[400px]">
              <Search className="w-12 h-12 text-slate-500 mb-4 stroke-1" />
              <h3 className="text-xl font-bold text-white mb-2">No Events Found</h3>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                We couldn&apos;t find any events matching your current search or filter combination.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#E60026] hover:bg-[#c40020] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Responsive 3-to-4 Column Grid of Vertical Poster Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const isMilaapFlagship = event.slug === 'milaap';

                return (
                  <Link
                    key={event.slug}
                    href={`/events/${event.slug}`}
                    className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  >
                    {/* Poster Card Container with aspect-[3/4.2] */}
                    <div
                      className={`relative w-full aspect-[3/4.2] flex flex-col justify-between p-6 rounded-3xl transition-all duration-500 ${
                        isMilaapFlagship
                          ? 'bg-white/[0.05] backdrop-blur-xl border-2 border-amber-400/40 shadow-[0_0_35px_rgba(230,0,38,0.25)] hover:border-amber-300 hover:bg-white/[0.08] hover:shadow-[0_0_50px_rgba(245,158,11,0.35)]'
                          : 'bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
                      }`}
                    >
                      {/* Specialized Visual Background */}
                      {isMilaapFlagship ? (
                        /* Milaap Sacred Geometry Mandala & Deep Royal-Maroon Atmosphere */
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                          {/* Radial maroon-blue lighting */}
                          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-rose-900/30 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-900/40 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                          
                          {/* Central Rotating Mandala */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-45 transition-opacity duration-700">
                            <MandalaBackground size={360} opacity={0.4} animated />
                          </div>

                          {/* Shimmer overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        </div>
                      ) : (
                        /* Standard Event Ambient Gradient & Pattern */
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${event.bannerGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>
                      )}

                      {/* Top Header Row of Poster Card */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        {/* Club Badges (JUMC & JUDW) */}
                        <div className="flex items-center gap-1.5">
                          {event.club.includes('JUMC') && (
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-[#E60026]/20 border border-[#E60026]/40 text-[#ff4d6d] backdrop-blur-md">
                              JUMC
                            </span>
                          )}
                          {event.club.includes('JUDW') && (
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300 backdrop-blur-md">
                              JUDW
                            </span>
                          )}
                        </div>

                        {/* Status Pill */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-300">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              event.status === 'Open'
                                ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                                : event.status === 'Upcoming'
                                ? 'bg-amber-400'
                                : 'bg-slate-500'
                            }`}
                          />
                          {event.status}
                        </div>
                      </div>

                      {/* Middle Body / Graphic Section of Poster Card */}
                      <div className="relative z-10 my-auto py-4">
                        {isMilaapFlagship ? (
                          /* Custom Golden Milaap Typography with continuous shirorekha bar */
                          <div className="flex flex-col items-center text-center transform group-hover:scale-105 transition-transform duration-500">
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300/80 mb-1">
                              FLAGSHIP CULTURAL FEST
                            </span>
                            <MilaapBrand size="md" showSubtitle={true} centered={true} />
                          </div>
                        ) : (
                          /* Standard Event Title and Visual Graphic */
                          <div className="group-hover:translate-x-1 transition-transform duration-300">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 mb-3 group-hover:border-amber-400/50 group-hover:bg-amber-400/10 transition-colors">
                              {event.category.includes('Vocals') && <Music className="w-5 h-5 text-amber-300" />}
                              {event.category.includes('Band') && <Radio className="w-5 h-5 text-blue-400" />}
                              {event.category.includes('Instrumental') && <Music className="w-5 h-5 text-emerald-400" />}
                              {event.category.includes('Dance') && <Award className="w-5 h-5 text-rose-400" />}
                              {event.category.includes('Workshops') && <Sparkles className="w-5 h-5 text-purple-400" />}
                            </div>

                            <h3 className="text-xl font-extrabold text-white leading-snug group-hover:text-amber-200 transition-colors">
                              {event.title}
                            </h3>

                            {event.subtitle && (
                              <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">
                                {event.subtitle}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom Footer Section of Poster Card */}
                      <div className="relative z-10 space-y-3 pt-3 border-t border-white/10">
                        {/* Event Micro Details: Date & Venue */}
                        <div className="space-y-1.5 text-xs text-slate-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            <span className="truncate font-medium">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#E60026] flex-shrink-0" />
                            <span className="truncate text-slate-400">{event.venue}</span>
                          </div>
                        </div>

                        {/* Bottom Tags (Red/Gold Pills) */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {event.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border backdrop-blur-md ${
                                idx === 0
                                  ? 'bg-[#E60026]/15 border-[#E60026]/30 text-[#ff758f]'
                                  : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Interactive CTA Link Bar */}
                        <div className="pt-2 flex items-center justify-between text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          <span>
                            {isMilaapFlagship ? 'Explore Milaap Portal' : 'View Rules & Register'}
                          </span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
