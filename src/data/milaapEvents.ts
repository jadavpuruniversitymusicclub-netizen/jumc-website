export interface MilaapEvent {
  id: string;
  title: string;
  subtitle: string;
  category: 'Music' | 'Dance' | 'Flagship';
  status: 'Registrations Open' | 'Coming Soon';
  shortDescription: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  timeLimit: string;
  prizePool: string;
  gradient: string;
  accentColor: string;
  rulebook: {
    overview: string;
    teamConstraints: string;
    timeConstraints: string;
    rules: string[];
    judgingCriteria: string[];
    coordinators: { name: string; phone: string; club: string }[];
  };
}

export const MILAAP_EVENTS: MilaapEvent[] = [
  {
    id: 'milaap-flagship',
    title: 'Milaap — Edition I (Grand Cultural Fest)',
    subtitle: 'Two Legacies • One Heartbeat',
    category: 'Flagship',
    status: 'Registrations Open',
    shortDescription:
      'The historic 3-day convergence uniting Jadavpur University Music Club (JUMC) & JU Dance Wing (JUDF) with live showdowns, workshops, and headline concerts.',
    date: 'Nov 28 – 30, 2026',
    time: '09:00 AM – 10:00 PM Daily',
    venue: 'Jadavpur University Main Campus',
    teamSize: 'Solo & Teams (All Categories)',
    timeLimit: '3 Full Festival Days',
    prizePool: '₹1,50,000+',
    gradient: 'from-amber-600/30 via-red-950/40 to-stone-950',
    accentColor: '#F59E0B',
    rulebook: {
      overview:
        'Milaap Edition I is the premier inter-college cultural festival hosted jointly by JUMC and JUDF. Participants from colleges across the nation gather for 3 days of high-stakes musical duels, dance battles, masterclasses, and celebrity pro-nights.',
      teamConstraints: 'Open to verified college and university students with valid institutional ID.',
      timeConstraints: 'Nov 28 – 30, 2026. Gate entry begins at 8:30 AM daily.',
      rules: [
        'A single Milaap Delegate pass grants campus entry and eligibility for competition registrations.',
        'All competitors must carry their official college student ID card and registration confirmation QR code.',
        'Cross-college teams are permitted for designated band and crew categories.',
        'Decisions made by the judging panels across all events are final and binding.',
        'Strict decorum, anti-ragging policies, and campus safety protocols must be observed at all times.'
      ],
      judgingCriteria: [
        'Artistic excellence, originality, and technical proficiency.',
        'Stage presence, synchronization, and audience engagement.',
        'Adherence to festival guidelines and prompt reporting times.'
      ],
      coordinators: [
        { name: 'Aditya Bhattacharyya', phone: '+91 62909 21928', club: 'JUMC' },
        { name: 'Tanisha Das', phone: '+91 88374 13287', club: 'JUDF' }
      ]
    }
  },
  {
    id: 'battle-of-bands',
    title: 'Battle of the Bands',
    subtitle: 'Amplified Live Rock & Fusion Showdown',
    category: 'Music',
    status: 'Registrations Open',
    shortDescription:
      'The high-octane collegiate band showdown on the Open Air Theatre main stage. Plug in, turn up the gain, and electrify the crowd.',
    date: 'Nov 29, 2026',
    time: '02:00 PM – 07:00 PM',
    venue: 'Open Air Theatre (OAT)',
    teamSize: '3 – 8 Members per Band',
    timeLimit: '15 Mins Performance + 5 Mins Soundcheck',
    prizePool: '₹40,000',
    gradient: 'from-red-600/30 via-amber-950/40 to-stone-950',
    accentColor: '#EF4444',
    rulebook: {
      overview:
        'Battle of the Bands is the crown jewel of Milaap’s musical lineup. From indie rock to heavy metal and classical-fusion, bands battle for state-wide supremacy on an industry-grade amplified stage.',
      teamConstraints: 'Minimum 3, maximum 8 members. Cross-college combinations are allowed.',
      timeConstraints: 'Strict 20 minutes total stage time (15 mins performance + 5 mins setup/soundcheck). A warning bell rings at 13 mins.',
      rules: [
        'A standard 5-piece drumkit, bass amplifier, and two guitar amplifiers will be provided on stage.',
        'Bands must bring their own instruments (guitars, keyboards, processors, cables, drum sticks).',
        'Bands may perform original compositions or covers. Original compositions carry bonus evaluation points.',
        'Backing tracks and pre-recorded synth sequences are strictly prohibited; all sound must be live.',
        'Any foul language, offensive lyrics, or disrespectful stage conduct will lead to immediate disqualification.'
      ],
      judgingCriteria: [
        'Tightness, rhythmic locking, and musical arrangement (30%).',
        'Vocal dynamics, instrumental dexterity, and solo execution (30%).',
        'Originality, crowd response, and stage command (25%).',
        'Time management and stage etiquette (15%).'
      ],
      coordinators: [
        { name: 'Aditya Bhattacharyya', phone: '+91 62909 21928', club: 'JUMC Coordinator' }
      ]
    }
  },
  {
    id: 'eastern-light-vocals',
    title: 'Eastern Light Vocals & Classical',
    subtitle: 'Raga, Bhava & Timeless Indian Melody',
    category: 'Music',
    status: 'Registrations Open',
    shortDescription:
      'Solo classical and light vocal arena honoring the foundational legacy of founder Kabir Suman and legendary Indian vocal traditions.',
    date: 'Nov 28, 2026',
    time: '11:00 AM – 03:30 PM',
    venue: 'Gandhi Bhavan Auditorium',
    teamSize: 'Solo (1 Singer + up to 2 Accompanists)',
    timeLimit: '5 Minutes + 2 Minutes Soundcheck',
    prizePool: '₹20,000',
    gradient: 'from-amber-600/30 via-yellow-950/40 to-neutral-950',
    accentColor: '#F59E0B',
    rulebook: {
      overview:
        'Eastern Light Vocals invites vocalists to showcase the depth of Indian music—from Khayal, Thumri, and Ghazal to Rabindrasangeet, Nazrulgeeti, and contemporary light compositions.',
      teamConstraints: '1 vocalist with up to 2 live instrumental accompanists (e.g., Tabla, Harmonium, Tanpura) or standard karaoke/tanpura track.',
      timeConstraints: '5 minutes performance time with 2 minutes setup. Overtime results in negative scoring.',
      rules: [
        'Participants can choose Indian Classical, Semi-Classical, Ghazal, Rabindrasangeet, or Regional Folk.',
        'A tanpura droid or acoustic tanpura is mandatory for classical presentations.',
        'Pre-recorded vocal backing or auto-tuned audio tracks are strictly banned.',
        'Participants must submit their track (if using an audio backing) at the registration desk 45 minutes prior.'
      ],
      judgingCriteria: [
        'Sur, Shruti, and pitch accuracy (35%).',
        'Taal, Laya, and rhythmic precision (25%).',
        'Bhava, emotional expression, and voice modulation (25%).',
        'Song selection and overall presentation (15%).'
      ],
      coordinators: [
        { name: 'Aditya Bhattacharyya', phone: '+91 62909 21928', club: 'JUMC Coordinator' }
      ]
    }
  },
  {
    id: 'western-vocals',
    title: 'Western Vocals & Acoustic Jam',
    subtitle: 'Unplugged Harmonies & Soulful Anthems',
    category: 'Music',
    status: 'Registrations Open',
    shortDescription:
      'Solo and duet vocal showcase celebrating Pop, Rock, Soul, R&B, Jazz, and organic acoustic arrangements.',
    date: 'Nov 28, 2026',
    time: '04:00 PM – 07:30 PM',
    venue: 'Worldview Amphitheatre',
    teamSize: 'Solo (1) or Duet (2 Performers)',
    timeLimit: '5 Minutes Total Stage Time',
    prizePool: '₹20,000',
    gradient: 'from-blue-600/30 via-indigo-950/40 to-black',
    accentColor: '#3B82F6',
    rulebook: {
      overview:
        'Western Vocals & Acoustic Jam is the platform for raw vocal power, vocal harmonies, and unplugged instrumentals in the scenic open-air campus amphitheatre.',
      teamConstraints: 'Solo vocalist or vocal duet (maximum 2 performers on stage).',
      timeConstraints: 'Strict 5-minute performance window.',
      rules: [
        'Performers may self-accompany on acoustic guitar or keyboard, or bring 1 accompanist.',
        'Instrumental backing tracks without lead vocals are permitted via 3.5mm jack or Bluetooth.',
        'Genres: Pop, Rock, Country, Soul, Blues, Jazz, Ballads, and Acoustic Indie.',
        'Original compositions and creative cover rearrangements are actively encouraged.'
      ],
      judgingCriteria: [
        'Vocal range, tone quality, and pitch stability (35%).',
        'Harmonic coordination (for duets) and dynamics (25%).',
        'Acoustic arrangement and stage presence (25%).',
        'Clarity of diction and interpretation (15%).'
      ],
      coordinators: [
        { name: 'Aditya Bhattacharyya', phone: '+91 62909 21928', club: 'JUMC Coordinator' }
      ]
    }
  },
  {
    id: 'instrumental-showdown',
    title: 'Instrumental Showdown',
    subtitle: 'Solo Virtuosity on Strings, Keys & Percussion',
    category: 'Music',
    status: 'Registrations Open',
    shortDescription:
      'Solo instrumental duel celebrating dexterous fretwork, percussive mastery, and soulful wind melodies across all acoustic and electric genres.',
    date: 'Nov 29, 2026',
    time: '11:00 AM – 02:30 PM',
    venue: 'Gandhi Bhavan Auditorium',
    teamSize: 'Solo (1 Performer + Optional Tanpura)',
    timeLimit: '6 Minutes Performance Time',
    prizePool: '₹18,000',
    gradient: 'from-amber-700/30 via-purple-950/40 to-stone-950',
    accentColor: '#F59E0B',
    rulebook: {
      overview:
        'The Instrumental Showdown puts the spotlight solely on the instrument and player. Whether it is the soaring notes of a violin, lightning guitar solos, intricate sitar meends, or complex tabla kaydas.',
      teamConstraints: 'Solo performer only. A drone/tanpura track is allowed for Eastern instruments.',
      timeConstraints: '6 minutes total stage time. No backing rhythm tracks allowed.',
      rules: [
        'Any acoustic or electric instrument is eligible (Sitar, Guitar, Flute, Violin, Keyboard, Drums, Percussion).',
        'Keyboards must be played in real-time; auto-accompaniment modes (arpeggiators/styles) are barred.',
        'Judging is calibrated across both classical disciplines and modern progressive/fusion styles.',
        'Instrumentalists must bring their own cables, processors, and instruments.'
      ],
      judgingCriteria: [
        'Technical virtuosity, speed, and accuracy (35%).',
        'Rhythmic groove, improvisational depth, and cadence (30%).',
        'Tone purity, dynamics, and articulation (20%).',
        'Difficulty of repertoire (15%).'
      ],
      coordinators: [
        { name: 'Aditya Bhattacharyya', phone: '+91 62909 21928', club: 'JUMC Coordinator' }
      ]
    }
  },
  {
    id: 'indak-eastern-dance',
    title: 'INDAK — Eastern & Folk Group Dance',
    subtitle: 'Classical Grace & Vibrant Folk Traditions',
    category: 'Dance',
    status: 'Registrations Open',
    shortDescription:
      'JUDF’s signature flagship Eastern dance spectacle featuring classical traditions (Kathak, Bharatanatyam, Odissi) and high-energy regional folk choreography.',
    date: 'Nov 29, 2026',
    time: '05:30 PM – 09:30 PM',
    venue: 'Open Air Theatre (OAT)',
    teamSize: '6 – 16 Dancers per Team',
    timeLimit: '8 – 12 Minutes on Stage',
    prizePool: '₹35,000',
    gradient: 'from-purple-600/30 via-rose-950/40 to-black',
    accentColor: '#A855F7',
    rulebook: {
      overview:
        'INDAK has been JUDF’s signature festival for years. It celebrates the vibrant heritage of Indian classical and folk dance forms in grand ensemble formations under festival stage lights.',
      teamConstraints: 'Teams must have 6 to 16 dancers on stage.',
      timeConstraints: '8 to 12 minutes on stage. Empty stage to clear stage protocol in 2 minutes.',
      rules: [
        'Accepted dance styles: Bharatanatyam, Kathak, Odissi, Manipuri, Mohiniyattam, Folk (Bhangra, Garba, Chhau, Bihu, Lavani, etc.).',
        'Fusion between multiple classical or folk styles is welcomed with coherent thematic narrative.',
        'Fire, water, live flames, and hazardous props are strictly prohibited on stage.',
        'Soundtracks must be submitted in MP3 format (320kbps) on a USB drive at least 2 hours before the event.'
      ],
      judgingCriteria: [
        'Synchronization, formation transitions, and spatial choreography (30%).',
        'Abhinaya, expressions, mudras, and posture authenticity (30%).',
        'Costume, aesthetics, and thematic representation (20%).',
        'Rhythm adherence and energy flow (20%).'
      ],
      coordinators: [
        { name: 'Tanisha Das', phone: '+91 88374 13287', club: 'JUDF Coordinator' }
      ]
    }
  },
  {
    id: 'street-dance-battle',
    title: 'Western & Street Dance Battle',
    subtitle: 'Cyphers, All-Styles & Crew Showdowns',
    category: 'Dance',
    status: 'Registrations Open',
    shortDescription:
      'Electrifying 1v1 and 2v2 street dance battles spanning Hip-Hop, Breaking, Popping, Krump, Afro, and Waacking judged by battle veterans.',
    date: 'Nov 29, 2026',
    time: '02:00 PM – 06:00 PM',
    venue: 'Gandhi Bhavan Lawns & Cypher Arena',
    teamSize: '1v1 Solo or 2v2 Crew Duo',
    timeLimit: '45 Seconds per Round (Call-outs in Finals)',
    prizePool: '₹22,000',
    gradient: 'from-emerald-600/30 via-teal-950/40 to-slate-950',
    accentColor: '#10B981',
    rulebook: {
      overview:
        'The Street Dance Battle is the ultimate test of musicality, freestyle spontaneity, and athletic execution. Dancers battle round-by-round to live beats spun by our resident battle DJ.',
      teamConstraints: 'Solo (1v1) or Duos (2v2) registered in advance.',
      timeConstraints: 'Preliminary round: 45s cypher run. Quarter/Semi-finals: 2 rounds of 45s each.',
      rules: [
        'DJ drops random tracks (Hip-hop, Funk, Breaks, Trap, Afro, House). No pre-choreographed songs.',
        'Physical contact, unsportsmanlike behavior, or aggressive touching leads to immediate elimination.',
        'Top 16 dancers from open cyphers qualify for 1v1 knockouts; top 8 duos qualify for 2v2 knockouts.',
        'Decisions by the guest judges are instantaneous and irrevocable.'
      ],
      judgingCriteria: [
        'Musicality, beat response, and rhythm texture (35%).',
        'Technique, foundation, and control (30%).',
        'Originality, freestyle innovation, and personality (25%).',
        'Battle aggression and crowd interaction (10%).'
      ],
      coordinators: [
        { name: 'Tanisha Das', phone: '+91 88374 13287', club: 'JUDF Coordinator' }
      ]
    }
  },
  {
    id: 'choreography-showcase',
    title: 'Choreography & Duet Showcase',
    subtitle: 'Thematic Storytelling & Contemporary Fusion',
    category: 'Dance',
    status: 'Coming Soon',
    shortDescription:
      'Thematic storytelling and contemporary fusion dance through synchronized duets, lyrical movements, and choreographed emotional drama.',
    date: 'Nov 30, 2026',
    time: '11:00 AM – 03:00 PM',
    venue: 'Gandhi Bhavan Auditorium',
    teamSize: '2 – 8 Performers per Act',
    timeLimit: '6 – 9 Minutes on Stage',
    prizePool: '₹25,000',
    gradient: 'from-fuchsia-600/30 via-pink-950/40 to-neutral-950',
    accentColor: '#D946EF',
    rulebook: {
      overview:
        'This competition challenges choreographers to weave narrative, emotive depth, and contemporary movement into a theatrical stage production.',
      teamConstraints: '2 to 8 dancers. Open to all collegiate teams.',
      timeConstraints: '6 to 9 minutes including stage setup.',
      rules: [
        'Choreographies must follow a defined concept or storyline (brief synopsis to be read out by MC).',
        'Fusion across Contemporary, Ballet, Lyrical Jazz, Urban, and Semi-Classical is encouraged.',
        'Props must be declared during registration; no glitter, confetti, or messy substances permitted on stage.'
      ],
      judgingCriteria: [
        'Choreographic complexity and thematic translation (35%).',
        'Synchronization, partnering, and lift mechanics (30%).',
        'Emotional resonance and stage presence (25%).',
        'Costume and music edit seamlessness (10%).'
      ],
      coordinators: [
        { name: 'Tanisha Das', phone: '+91 88374 13287', club: 'JUDF Coordinator' }
      ]
    }
  },
  {
    id: 'pro-night-gala',
    title: 'Pro-Night & Cultural Gala',
    subtitle: 'Grand Finale, Awards & Celebrity Concert',
    category: 'Flagship',
    status: 'Coming Soon',
    shortDescription:
      'The star-studded climax of Milaap Edition I featuring celebrity artists, electrifying sound production, and award felicitations.',
    date: 'Nov 30, 2026',
    time: '05:00 PM – 10:00 PM',
    venue: 'Jadavpur University Main Stadium',
    teamSize: 'Open Campus & Registered Delegates',
    timeLimit: '5-Hour Grand Night Extravaganza',
    prizePool: 'Trophies & Star Headliner Concert',
    gradient: 'from-amber-500/30 via-rose-900/40 to-zinc-950',
    accentColor: '#F59E0B',
    rulebook: {
      overview:
        'The grand finale of Milaap Edition I! A celebratory evening uniting thousands of college students for the trophy award ceremony, followed by an unforgettable live performance from a top national headliner.',
      teamConstraints: 'Open entry to all registered festival participants and valid college ID holders.',
      timeConstraints: 'Gates open at 04:30 PM. Final entry closes at 07:00 PM.',
      rules: [
        'Valid physical student ID card and festival entry wristband/QR pass are required at all security check gates.',
        'Strictly no outside food, alcohol, or prohibited items allowed inside the stadium arena.',
        'All general campus safety and Kolkata police event guidelines strictly enforced.'
      ],
      judgingCriteria: [
        'Grand Trophy Distribution across all Milaap 2026 winners and runner-ups.'
      ],
      coordinators: [
        { name: 'Aditya Bhattacharyya', phone: '+91 62909 21928', club: 'JUMC' },
        { name: 'Tanisha Das', phone: '+91 88374 13287', club: 'JUDF' }
      ]
    }
  }
];

