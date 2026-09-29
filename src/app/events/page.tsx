import Link from 'next/link';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Events | JUMC',
  description: 'Discover upcoming and past events, gigs, and auditions hosted by the Jadavpur University Music Club.',
};

const eventsList = [
  {
    slug: 'annual-musical-night',
    title: 'Annual Musical Night',
    date: 'November 15, 6:00 PM',
    location: 'Main Auditorium, JUMC Campus',
    status: 'UPCOMING',
    statusColor: 'bg-green-500',
    description: 'Experience an unforgettable evening of melodies and harmonies with the finest talents for a grand celebration of music.',
  },
  {
    slug: 'acoustic-evening',
    title: 'Acoustic Evening',
    date: 'December 5, 7:00 PM',
    location: 'Open Air Theatre, JUMC',
    status: 'LIVE',
    statusColor: 'bg-red-500',
    description: 'Unwind with unplugged performances under the stars. Join us for an intimate acoustic session featuring soulful vocals.',
  },
  {
    slug: 'fresher-auditions',
    title: 'Fresher Auditions',
    date: 'August 20, 10:00 AM',
    location: 'Club Room',
    status: 'PAST',
    statusColor: 'bg-gray-500',
    description: 'Showcase your musical talent and join the JUMC family. Open to all first-year students passionate about music.',
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen relative py-24 md:py-32 px-6">
      {/* Container for content */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 drop-shadow-sm">
            Our Gigs & Auditions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
            Stay tuned to the heartbeat of the campus. From electrifying stage shows to intimate acoustic nights, witness the magic of JUMC.
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsList.map((event) => (
            <div 
              key={event.slug}
              className="group relative rounded-3xl p-8 bg-white/[0.03] border border-white/10 backdrop-blur-lg overflow-hidden hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Status Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="relative flex h-3 w-3">
                    {event.status !== 'PAST' && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${event.statusColor}`}></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${event.statusColor}`}></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                    {event.status}
                  </span>
                </div>

                {/* Event Details */}
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-100 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-400 mb-8 text-sm line-clamp-3 leading-relaxed flex-grow">
                  {event.description}
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CalendarDays className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link 
                  href={`/events/${event.slug}`}
                  className="inline-flex mt-auto items-center justify-center w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors group/btn"
                >
                  View Details
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
