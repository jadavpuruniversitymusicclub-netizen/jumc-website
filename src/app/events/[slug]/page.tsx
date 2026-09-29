import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalendarDays, MapPin } from 'lucide-react';
import Script from 'next/script';
import Link from 'next/link';

// Mock event database
const events = [
  {
    slug: 'annual-musical-night',
    title: 'Annual Musical Night',
    date: '2026-11-15T18:00:00+05:30',
    displayDate: 'November 15, 6:00 PM',
    location: 'Main Auditorium, JUMC Campus',
    description: 'Experience an unforgettable evening of melodies and harmonies. The Annual Musical Night brings together the finest talents for a grand celebration of music and art.',
    tags: ['Music', 'Live Performance', 'Annual Event'],
  },
  {
    slug: 'acoustic-evening',
    title: 'Acoustic Evening',
    date: '2026-12-05T19:00:00+05:30',
    displayDate: 'December 5, 7:00 PM',
    location: 'Open Air Theatre, JUMC',
    description: 'Unwind with unplugged performances under the stars. Join us for an intimate acoustic session featuring soulful vocals and intricate guitar work.',
    tags: ['Acoustic', 'Unplugged', 'Outdoor'],
  }
];

// Dynamic SEO metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: 'Event Not Found | JUMC',
      description: 'The requested event could not be found.',
    };
  }

  return {
    title: `${event.title} | JUMC Events`,
    description: event.description,
    openGraph: {
      title: `${event.title} | JUMC Events`,
      description: event.description,
      type: 'website',
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  // JSON-LD structured data for Google Search (Rich Snippets)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    endDate: event.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'JUMC Campus'
      }
    },
    description: event.description,
  };

  return (
    <>
      {/* Inject Structured Data */}
      <Script
        id={`json-ld-event-${event.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-hidden relative">
        {/* Dynamic Background Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute top-[40%] -right-[20%] w-[40%] h-[60%] rounded-full bg-purple-600/10 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32">
          {/* Navigation */}
          <Link 
            href="/events" 
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mb-16 uppercase tracking-widest"
          >
            &larr; All Events
          </Link>

          {/* Hero Section */}
          <header className="mb-16 md:mb-24">
            <div className="flex flex-wrap gap-3 mb-8">
              {event.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 rounded-full backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500">
              {event.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
              {event.description}
            </p>
          </header>

          {/* Key Details - Glassmorphism UI */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="group relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
              <CalendarDays className="w-10 h-10 text-indigo-400 mb-6" />
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">Date & Time</h3>
              <p className="text-2xl md:text-3xl font-medium text-white tracking-tight">{event.displayDate}</p>
            </div>
            
            <div className="group relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
              <MapPin className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">Location</h3>
              <p className="text-2xl md:text-3xl font-medium text-white tracking-tight">{event.location}</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20 text-lg">
              Register Now
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/[0.03] text-white border border-white/10 font-semibold rounded-full hover:bg-white/[0.08] backdrop-blur-xl transition-all duration-300 focus:outline-none text-lg">
              Add to Calendar
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
