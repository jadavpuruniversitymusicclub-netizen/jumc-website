import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { EVENTS_DATA } from '@/data/eventsData';
import MilaapDetailView from '@/components/events/MilaapDetailView';
import SubEventDetailView from '@/components/events/SubEventDetailView';

// Generate Static Params for all known events
export async function generateStaticParams() {
  return EVENTS_DATA.map((event) => ({
    slug: event.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: 'Event Not Found | JUMC & JUDW',
      description: 'The requested event could not be found.',
    };
  }

  const isMilaap = event.slug === 'milaap';
  const pageTitle = isMilaap
    ? 'milaap — EDITION I | Flagship Fest by JUMC & JUDW | Jadavpur University'
    : `${event.title} | JUMC Events | Jadavpur University`;

  const pageDescription = isMilaap
    ? 'milaap — EDITION I, the premier inter-college cultural festival jointly organised by Jadavpur University Music Club (JUMC) & JU Dance Wing (JUDW). Explore schedule, rulebooks, and sponsorship slabs.'
    : `${event.title} (${event.category}) hosted at ${event.venue} on ${event.date}. ${event.shortDescription}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      event.title,
      'milaap',
      'milaap EDITION I',
      'JUMC',
      'JUDW',
      'Jadavpur University',
      event.category,
      ...event.tags,
      'Kolkata cultural fest',
      'college events Kolkata',
    ],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://jumc.in/events/${event.slug}`,
      siteName: 'JUMC — Jadavpur University Music Club',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: `https://jumc.in/events/${event.slug}`,
    },
  };
}

export default async function EventSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = EVENTS_DATA.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  // Schema.org Event structured data for Google Search (Rich Snippets)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.shortDescription,
    startDate: event.startDateIso,
    endDate: event.endDateIso,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: `${event.venue}, Jadavpur University`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '188, Raja S.C. Mallick Road',
        addressLocality: 'Kolkata',
        postalCode: '700032',
        addressRegion: 'West Bengal',
        addressCountry: 'IN',
      },
    },
    organizer: [
      {
        '@type': 'Organization',
        name: 'Jadavpur University Music Club (JUMC)',
        url: 'https://jumc.in',
      },
      {
        '@type': 'Organization',
        name: 'Jadavpur University Dance Wing (JUDW)',
      },
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://jumc.in/events/${event.slug}`,
      validFrom: '2026-10-01',
    },
  };

  return (
    <>
      {/* Google Search Rich Snippets JSON-LD */}
      <Script
        id={`json-ld-event-${event.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#020617]/95 selection:bg-[#E60026]/30 selection:text-white">
        {event.slug === 'milaap' ? (
          <MilaapDetailView />
        ) : (
          <SubEventDetailView event={event} />
        )}
      </main>
    </>
  );
}
