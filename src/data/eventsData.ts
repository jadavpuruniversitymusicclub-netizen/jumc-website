export interface EventItem {
  slug: string;
  title: string;
  subtitle?: string;
  category:
    | 'Flagship Fest'
    | 'Eastern & Light Vocals'
    | 'Western & Band'
    | 'Instrumental'
    | 'Dance (JUDF)'
    | 'Workshops';
  status: 'Open' | 'Upcoming' | 'Closed';
  isFeatured?: boolean;
  club: 'JUMC' | 'JUDW' | 'JUMC X JUDW';
  date: string;
  startDateIso: string;
  endDateIso: string;
  time: string;
  venue: string;
  locationDetails: string;
  tags: string[];
  bannerGradient: string;
  shortDescription: string;
  fullDescription: string;
  prizes?: {
    first?: string;
    second?: string;
    third?: string;
    totalPool?: string;
  };
  rules?: string[];
  schedule?: { time: string; activity: string }[];
  coordinators?: { name: string; role: string; contact?: string }[];
}

export const EVENTS_DATA: EventItem[] = [
  {
    slug: 'milaap',
    title: 'milaap — EDITION I',
    subtitle: 'The Premier Cultural Fest of Jadavpur University',
    category: 'Flagship Fest',
    status: 'Open',
    isFeatured: true,
    club: 'JUMC X JUDW',
    date: 'Nov 28 – 30, 2026',
    startDateIso: '2026-11-28T09:00:00+05:30',
    endDateIso: '2026-11-30T22:00:00+05:30',
    time: '9:00 AM – 10:00 PM Daily',
    venue: 'Jadavpur University Main Campus',
    locationDetails: 'Gandhi Bhavan Auditorium, Open Air Theatre (OAT) & Campus Hubs',
    tags: ['FLAGSHIP', 'JUMC X JUDW', 'INTER-COLLEGE', 'MUSIC & DANCE'],
    bannerGradient: 'from-amber-600/30 via-rose-900/40 to-blue-950/80',
    shortDescription:
      'The landmark fusion fest uniting Jadavpur University Music Club & JU Dance Wing. 3 days of virtuosic music, explosive dance battles, workshops, and high-energy concerts.',
    fullDescription:
      'milaap — EDITION I represents the historic convergence of Jadavpur University’s two powerhouse creative wings: JUMC (Music Club) and JUDW (Dance Wing). Designed as an inter-college cultural festival with state-wide reach, milaap brings together over 160,000+ digital viewers and 15,000+ campus footfall for three historic days of music, dance, artistic competition, and celebrated guest headliners.',
    prizes: {
      totalPool: '₹1,50,000+',
      first: 'Trophies, Cash Awards & National Studio Feature',
      second: 'Runner-up Cash & Certificate of Excellence',
    },
    rules: [
      'Open to all verified college and university students with valid student ID.',
      'Participants can register in solo, duet, and team categories across music and dance wings.',
      'Decisions made by the panel of distinguished judges are final and binding.',
      'All attendees must adhere to the campus decorum and code of conduct.',
    ],
    schedule: [
      { time: 'Day 1 (Nov 28) 10:00 AM', activity: 'Grand Inauguration & Classical Lighting Ceremony' },
      { time: 'Day 1 (Nov 28) 11:30 AM', activity: 'Eastern Light Vocals & Classical Solo Prelims' },
      { time: 'Day 1 (Nov 28) 04:30 PM', activity: 'Western Vocals & Acoustic Jam Session at OAT' },
      { time: 'Day 2 (Nov 29) 11:00 AM', activity: 'Instrumental Showdown (Strings, Percussion, Wind)' },
      { time: 'Day 2 (Nov 29) 02:30 PM', activity: 'Western & Street Dance Battle (Cypher & Crew Battle)' },
      { time: 'Day 2 (Nov 29) 06:00 PM', activity: 'INDAK — Eastern & Folk Group Dance Showcase' },
      { time: 'Day 3 (Nov 30) 11:00 AM', activity: 'K-Pop & Movement Workshop with JUDW Masters' },
      { time: 'Day 3 (Nov 30) 05:30 PM', activity: 'Grand Award Gala & Headliner Celebrity Musical Concert' },
    ],
    coordinators: [
      { name: 'Core JUMC Convenor', role: 'President, Music Wing', contact: '+91 98301 23456' },
      { name: 'Core JUDW Convenor', role: 'President, Dance Wing', contact: '+91 98312 67890' },
      { name: 'Sponsorship Team', role: 'Corporate Outreach', contact: 'sponsorship@jumc.in' },
    ],
  },
  {
    slug: 'eastern-light-vocals',
    title: 'Eastern Light Vocals & Classical',
    subtitle: 'Sur, Taal, and Timeless Melody',
    category: 'Eastern & Light Vocals',
    status: 'Open',
    club: 'JUMC',
    date: 'Nov 28, 2026',
    startDateIso: '2026-11-28T11:00:00+05:30',
    endDateIso: '2026-11-28T16:00:00+05:30',
    time: '11:00 AM – 4:00 PM',
    venue: 'Gandhi Bhavan Auditorium',
    locationDetails: 'Main Auditorium Stage, Jadavpur University',
    tags: ['EASTERN', 'SOLO', 'CLASSICAL', 'KABIR SUMAN TRIBUTE'],
    bannerGradient: 'from-amber-700/30 via-red-950/40 to-slate-950',
    shortDescription:
      'Solo classical and light vocal battle honoring the foundational legacy of founder Kabir Suman and AIU national youth festival champions.',
    fullDescription:
      'Immerse in the profound heritage of Hindustani classical, semi-classical, Rabindrasangeet, and contemporary Eastern light music. Judged on pitch accuracy, rhythmic mastery, and expressive storytelling.',
    prizes: {
      first: '₹8,000 + Winner Trophy & Studio Recording Session',
      second: '₹4,000 + Certificate of Merit',
      third: '₹2,000 + Certificate',
    },
    rules: [
      'Time limit: 5 to 7 minutes on stage including mic check.',
      'Accompaniment: Electronic Tanpura / Tabla app allowed, or 1 live accompanist.',
      'Choice of genre: Hindustani / Carnatic Classical, Semi-Classical (Thumri, Dadra, Ghazal), or Eastern Light Melody.',
    ],
    schedule: [
      { time: '10:30 AM', activity: 'Registration verification & slot lottery' },
      { time: '11:00 AM', activity: 'Round 1: Classical & Semi-Classical Solos' },
      { time: '02:00 PM', activity: 'Round 2: Eastern Light & Contemporary Vocals' },
      { time: '04:00 PM', activity: 'Judges Commentary & Results Declaration' },
    ],
    coordinators: [
      { name: 'Sayan Gayen', role: 'AIU Awardee & Event Head', contact: '+91 98305 11122' },
    ],
  },
  {
    slug: 'western-vocals-acoustic',
    title: 'Western Vocals & Acoustic Jam',
    subtitle: 'From Unplugged Melodies to Arena Anthems',
    category: 'Western & Band',
    status: 'Open',
    club: 'JUMC',
    date: 'Nov 28, 2026',
    startDateIso: '2026-11-28T16:00:00+05:30',
    endDateIso: '2026-11-28T21:00:00+05:30',
    time: '4:00 PM – 9:00 PM',
    venue: 'Open Air Theatre (OAT)',
    locationDetails: 'Iconic JU Open Air Theatre',
    tags: ['WESTERN', 'BAND', 'ACOUSTIC', 'LIVE ROCK'],
    bannerGradient: 'from-blue-700/30 via-indigo-950/50 to-slate-950',
    shortDescription:
      'Unplugged western harmonies and full band jam session inspired by our IIT Spring Fest champion ensemble "Iqraar".',
    fullDescription:
      'The JU Open Air Theatre comes alive with driving basslines, acoustic guitar pickings, soaring high registers, and powerhouse band arrangements. Open to solo western vocalists, acoustic duets, and 3-6 piece rock/indie outfits.',
    prizes: {
      first: '₹15,000 Band / ₹6,000 Solo + Custom Gold Crest',
      second: '₹8,000 Band / ₹3,000 Solo',
      third: 'Merit Plaques',
    },
    rules: [
      'Bands receive 15 minutes total (including 5 min line-check and setup).',
      'Solos/Duets receive 6 minutes total.',
      'Standard 5-piece drum kit, guitar/bass amplifiers, and PA are provided.',
      'Original compositions score bonus points in judging metrics.',
    ],
    schedule: [
      { time: '03:30 PM', activity: 'Sound check & equipment staging' },
      { time: '04:00 PM', activity: 'Western Solo & Acoustic Duet Showcase' },
      { time: '06:00 PM', activity: 'Battle of the Bands Main Event' },
      { time: '08:45 PM', activity: 'Judge Jam Session & Winners Announced' },
    ],
    coordinators: [
      { name: 'Rupam Banerjee', role: 'Western Wing Lead', contact: '+91 98306 33344' },
      { name: 'Ujaan Sengupta', role: 'Band Coordinator', contact: '+91 98307 55566' },
    ],
  },
  {
    slug: 'instrumental-showdown',
    title: 'Instrumental Showdown',
    subtitle: 'Strings, Percussion, Keys & Brass',
    category: 'Instrumental',
    status: 'Upcoming',
    club: 'JUMC',
    date: 'Nov 29, 2026',
    startDateIso: '2026-11-29T13:00:00+05:30',
    endDateIso: '2026-11-29T17:00:00+05:30',
    time: '1:00 PM – 5:00 PM',
    venue: 'Techtix Stage, Main Campus',
    locationDetails: 'Indoor Cultural Amphitheatre',
    tags: ['INSTRUMENTAL', 'SOLO/DUET', 'VIRTUOSO', 'FUSION'],
    bannerGradient: 'from-emerald-700/30 via-slate-900/50 to-slate-950',
    shortDescription:
      'Virtuosic solo & duet instrumental battle honoring AIU Instrumental Youth Festival winner Swarnendu Mondal.',
    fullDescription:
      'Let the instruments speak without words. From fiery sitar and sarod taans to blistering electric guitar solos, intricate fingerstyle, soulful violin, and thunderous percussion jugalbandis.',
    prizes: {
      first: '₹7,000 + Gold Medal & Instrument Endorsement Kit',
      second: '₹3,500 + Silver Plaque',
      third: 'Certificate of Excellence',
    },
    rules: [
      'Time slot: 6 minutes strict stage performance.',
      'No pre-recorded backtrack with lead melody permitted.',
      'One percussion accompanist allowed for non-percussion lead competitors.',
    ],
    schedule: [
      { time: '12:30 PM', activity: 'Registration & instrument tuning station' },
      { time: '01:00 PM', activity: 'Classical & Ethnic Instruments Category' },
      { time: '03:00 PM', activity: 'Western Melodic & Contemporary Instruments' },
      { time: '04:45 PM', activity: 'Results & Trophy Presentation' },
    ],
    coordinators: [
      { name: 'Swarnendu Mondal', role: 'AIU Awardee & Event Director', contact: '+91 98308 77788' },
    ],
  },
  {
    slug: 'indak-folk-dance',
    title: 'INDAK — Eastern & Folk Group Dance',
    subtitle: 'Signature Annual Dance Festival of JUDW',
    category: 'Dance (JUDF)',
    status: 'Open',
    club: 'JUDW',
    date: 'Nov 29, 2026',
    startDateIso: '2026-11-29T17:00:00+05:30',
    endDateIso: '2026-11-29T21:30:00+05:30',
    time: '5:00 PM – 9:30 PM',
    venue: 'Gandhi Bhavan Main Stage',
    locationDetails: 'Gandhi Bhavan Stage, Jadavpur University',
    tags: ['JUDF', 'ODISSI / KATHAK', 'FOLK', 'INDAK'],
    bannerGradient: 'from-crimson/30 via-rose-950/60 to-slate-950',
    shortDescription:
      'JUDW’s flagship classical & folk dance spectacle. Grand stage productions across Odissi, Kathak, Manipuri, and folk heritage.',
    fullDescription:
      'For over 8 years, JU Dance Wing has dominated Eastern/Folk group dance categories across national university festivals. INDAK is their magnum opus: a theatrical journey of mudras, footwork, vibrant traditional attires, and breathtaking ensemble synchronization.',
    prizes: {
      first: '₹20,000 + Prestigious INDAK Rolling Trophy & Medals',
      second: '₹10,000 + Silver Crest',
      third: '₹5,000 + Certificates',
    },
    rules: [
      'Group size: 6 to 16 members.',
      'Time duration: 8 to 10 minutes total.',
      'Styles: Classical (Odissi, Kathak, Bharatanatyam, Manipuri) or Indian Folk (Chhau, Bihu, Garba, Lavani, Bhangra).',
      'Props and costumes must be safe and managed entirely by the performing crew.',
    ],
    schedule: [
      { time: '04:00 PM', activity: 'Green room call & technical sound cue check' },
      { time: '05:00 PM', activity: 'Traditional Lamp Lighting & Opening Odissi Invocation' },
      { time: '05:30 PM', activity: 'Eastern Classical & Folk Group Dance Battles' },
      { time: '09:00 PM', activity: 'Grand INDAK Award Ceremony' },
    ],
    coordinators: [
      { name: 'JUDW Dance Convenor', role: 'Head of Classical Choreography', contact: '+91 98319 99001' },
    ],
  },
  {
    slug: 'street-dance-battle',
    title: 'Western & Street Dance Battle',
    subtitle: 'Hip-Hop, Breaking, Popping & 1v1 Cyphers',
    category: 'Dance (JUDF)',
    status: 'Open',
    club: 'JUDW',
    date: 'Nov 29, 2026',
    startDateIso: '2026-11-29T14:30:00+05:30',
    endDateIso: '2026-11-29T18:30:00+05:30',
    time: '2:30 PM – 6:30 PM',
    venue: 'Subanna Hub Stage',
    locationDetails: 'Open-air battle arena with 360-degree cypher ring',
    tags: ['JUDF', 'HIP-HOP / BREAKING', 'CYPHER', 'ALL-STYLES'],
    bannerGradient: 'from-purple-800/30 via-fuchsia-950/40 to-slate-950',
    shortDescription:
      'High-octane crew showcases and intense 1v1 cypher battles across Hip-Hop, Afro, Breaking, and Popping.',
    fullDescription:
      'Step inside Kolkata’s most energetic underground college cypher! Raw street beats curated by live DJs, explosive freeze battles, popping mechanics, and contemporary storytelling.',
    prizes: {
      first: 'Crew: ₹16,000 + Championship Belt / 1v1 Cypher: ₹5,000',
      second: 'Crew: ₹8,000 / 1v1 Cypher: ₹2,500',
      third: 'Cypher King & Queen Badges',
    },
    rules: [
      'Crew Battle: 4 to 12 dancers, 5-7 minutes choreography routine.',
      '1v1 All-Styles Cypher: Sudden death rounds, 45 seconds per round with live DJ spins.',
      'Respect the circle; zero physical contact tolerance.',
    ],
    schedule: [
      { time: '02:00 PM', activity: 'Cypher warm-up & DJ groove set' },
      { time: '02:30 PM', activity: 'Western Crew Dance Championship Prelims' },
      { time: '04:30 PM', activity: 'Top 16 to Finals 1v1 All-Styles Battle' },
      { time: '06:00 PM', activity: 'Champion Crowning & Freestyle Jam' },
    ],
    coordinators: [
      { name: 'Street Battle Head', role: 'JUDW Urban Crew Lead', contact: '+91 98320 11223' },
    ],
  },
  {
    slug: 'kpop-choreography-workshop',
    title: 'K-Pop & Choreography Workshop',
    subtitle: 'Movement Precision, Isolations & Formation Masterclass',
    category: 'Workshops',
    status: 'Upcoming',
    club: 'JUDW',
    date: 'Nov 30, 2026',
    startDateIso: '2026-11-30T11:00:00+05:30',
    endDateIso: '2026-11-30T14:30:00+05:30',
    time: '11:00 AM – 2:30 PM',
    venue: 'JU Club Room & Dance Studio',
    locationDetails: 'Air-conditioned Mirror Studio, Jadavpur University',
    tags: ['WORKSHOP', 'JUDF', 'K-POP', 'BEGINNER TO ADVANCED'],
    bannerGradient: 'from-pink-700/30 via-rose-950/40 to-slate-950',
    shortDescription:
      'Exclusive intensive dance masterclass featuring viral choreography, isolation techniques, and freestyle formation drills.',
    fullDescription:
      'Led by JUDW’s senior urban choreographers, this workshop deconstructs iconic K-Pop choreography formations, dynamic speed variations, and razor-sharp isolations. Open to dancers of all skill levels.',
    prizes: {
      first: 'Official Certificate of Choreography Completion',
      second: 'VIP Backstage Access to Milaap Headliner Night',
    },
    rules: [
      'Comfortable dance footwear and athletic attire required.',
      'Limited to 60 registered seats for personalized instructor attention.',
      'Free for registered Milaap attendees.',
    ],
    schedule: [
      { time: '10:45 AM', activity: 'Check-in & dynamic warmup session' },
      { time: '11:15 AM', activity: 'Session 1: Speed Control & Sharp Isolations' },
      { time: '12:30 PM', activity: 'Session 2: K-Pop Signature Chorus Choreo' },
      { time: '01:45 PM', activity: 'Session 3: Group Video Shoot & Feedback' },
    ],
    coordinators: [
      { name: 'Workshop Master', role: 'JUDW Master Instructor', contact: '+91 98321 44556' },
    ],
  },
];

export const BROCHURE_DATA = {
  aboutJu: {
    title: 'About Jadavpur University',
    established: '1955',
    rank: 'Ranked 9th by NIRF across all Indian State Universities',
    status: 'Institute of Eminence across Arts, Science, and Engineering',
    description:
      'Established in 1955 to propagate scientific, technical and literary thought in a newly independent India. Ranked 9th by NIRF across all Indian State Universities, an Institute of Eminence across Arts, Science, and Engineering.',
  },
  aboutJumc: {
    title: 'About JUMC (Jadavpur University Music Club)',
    founder: 'Founded by renowned singer-songwriter Kabir Suman',
    notableAlumni: [
      'Anupam Ray',
      'Madhubanti Bagchi',
      'Pramantha Mohun Tagore',
      'Swarnendu Mondal',
      'Saptak Hossain',
      'Sayor Dabba Ghosh',
    ],
    bands: ['Iqraar (Winners at IIT Spring Fest 2024)'],
    aiuAwardees: [
      'Rupam Banerjee & Ujaan Sengupta (Western)',
      'Swarnendu Mondal (Instrumental)',
      'Sayan Gayen (Eastern Light Vocals)',
    ],
    description:
      'Founded by renowned singer-songwriter Kabir Suman. Notable alumni include Anupam Ray, Madhubanti Bagchi, Pramantha Mohun Tagore, Swarnendu Mondal, Saptak Hossain, and Sayor Dabba Ghosh. Produced "Iqraar" the band (Winners at IIT Spring Fest 2024). AIU Youth Festival awardees: Rupam Banerjee & Ujaan Sengupta (Western), Swarnendu Mondal (Instrumental), and Sayan Gayen (Eastern Light Vocals).',
  },
  aboutJudf: {
    title: 'About JUDF / JUDW (JU Dance Wing)',
    legacy: '8+ years uniting diverse dance forms',
    westernForms: ['Hip-Hop', 'Afro', 'Breaking', 'Popping'],
    easternForms: ['Odissi', 'Bharatanatyam', 'Kathak', 'Manipuri'],
    signatureFest: 'INDAK',
    achievements:
      'Secured 1st position in both Eastern/Folk and Western/Contemporary Group Dance categories across national university circuits.',
    description:
      '8+ years uniting diverse dance forms—Hip-Hop, Afro, Breaking, and Popping (Western) alongside Odissi, Bharatanatyam, Kathak, and Manipuri (Eastern). Home of signature annual festival INDAK, securing 1st position in both Eastern/Folk and Western/Contemporary Group Dance categories.',
  },
  socialMediaImpact: {
    headline: '160,000+ VIEWS — TWO STUDENT CLUBS. ONE UNIVERSITY.',
    judw: {
      views: '120K+',
      instagram: '1.5K',
      facebook: '4.2K',
      subscribers: '10K+',
    },
    jumc: {
      views: '40K+',
      instagram: '1K',
      facebook: '4.3K',
      subscribers: '8K+',
    },
    totalFootfall: '15,000+ Campus Footfall',
  },
  sponsorshipSlabs: [
    {
      id: 'title',
      name: 'Title Sponsor',
      amount: '₹1,20,000',
      rawAmount: 120000,
      badge: 'One Slot Only',
      tagline: 'The Face of the Event',
      popular: true,
      perks: [
        'Exclusive "Presented By [Your Brand]" title status across all channels',
        'Dominant branding on Main Stage Backdrop at Gandhi Bhavan & OAT',
        'Top placement on all digital posters, teaser videos, and official brochures',
        'Largest dedicated campus stall space in prime high-footfall main corridor',
        'On-stage presence and felicitations during award ceremonies & inaugurations',
        'Dedicated 10-minute sponsored presentation slot to 15,000+ students',
        'Permanent hyperlinked brand presence on official JUMC website',
      ],
    },
    {
      id: 'supporting',
      name: 'Supporting Sponsor',
      amount: '₹70,000',
      rawAmount: 70000,
      badge: 'Limited Slots',
      tagline: 'Strong Visibility & Impact',
      popular: false,
      perks: [
        'Prominent stage backdrop secondary banner placement',
        'High-visibility stall space on the central campus quadrangle',
        'Dedicated brand spotlight feature in official aftermovie & Instagram reels',
        'Logo placement on all competition certificates, passes, and schedule flyers',
        'Hyperlinked logo in the official sponsors portal on the JUMC website',
        'Direct student survey and promotional sampling rights',
      ],
    },
    {
      id: 'associate',
      name: 'Associate Sponsor',
      amount: '₹50,000',
      rawAmount: 50000,
      badge: '2 Slots Only',
      tagline: 'Founding Edition Partner',
      popular: false,
      perks: [
        'Exclusive Founding Edition Partner recognition badge',
        'Branding on all campus posters, banners, and digital promo flyers',
        'Shared promotional stall and brand merchandise/flyer distribution desk',
        'Formal acknowledgment in all official press releases and email broadcasts',
        'Website listing on the dedicated Milaap sponsor directory',
      ],
    },
    {
      id: 'sound',
      name: 'Sound Partner',
      amount: '₹20,000',
      rawAmount: 20000,
      badge: 'Official Tech Partner',
      tagline: 'Acoustic & Audio Excellence',
      popular: false,
      perks: [
        'Official Sound Partner credit across all 3 festival days',
        'Prominent logo placement on the sound setup area & stage audio consoles',
        'Live on-stage acoustic mentions throughout all musical battles and concerts',
        'Social media shoutouts highlighting your brand’s technical collaboration',
        'Permanent recognition on the JUMC website equipment credits',
      ],
    },
  ],
  benefitsBreakdown: {
    pr: {
      title: 'PR & Media Benefits',
      highlights: [
        'Joint press release co-branding distributed to Kolkata leading media houses',
        'Kolkata youth & cultural influencer engagement amplifying brand reach',
        'Dedicated spotlight Instagram Reels reaching 160,000+ organic youth impressions',
        'Feature showcase in the cinematic Milaap Official Aftermovie (4K release)',
        'Full brand mention in post-event campus recaps and college publications',
      ],
    },
    web: {
      title: 'Web & Digital Benefits',
      highlights: [
        'Permanent recognition & hyperlinked corporate logo on the official JUMC website (jumc.in)',
        'Continuous year-round visibility to university alumni, prospective students, and cultural leaders',
        'Direct high-authority backlink equity boosting your domain SEO ranking',
        'Digital sponsorship brochure download branding with trackable outbound leads',
        'Featured sponsor card on the interactive /events directory & Milaap showcase',
      ],
    },
    venue: {
      title: 'Venue & Ground Benefits',
      highlights: [
        'Interactive floor time & live promotional workshops directly on the main stage',
        'Prominent high-density campus stalls in the Main Concourse & Gandhi Bhavan entrance',
        'Direct student surveys, app downloads, and physical product sampling (15,000+ campus footfall)',
        'Keynote mention and honorary VIP seating during the grand inaugural and closing ceremonies',
        'Exclusive banner placement along high-traffic campus avenues and hostel gates',
      ],
    },
  },
};
