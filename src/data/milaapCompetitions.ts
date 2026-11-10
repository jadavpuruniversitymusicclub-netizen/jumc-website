export interface MilaapCompetition {
  id: string;
  title: string;
  category: "Music" | "Dance";
  format: "Solo" | "Solo/Duet" | "Group" | "Group/Solo";
  shortDescription: string;
  timeLimit: string;
  teamSize: string;
  prizePool: string;
  date: string;
  venue: string;
  gradient: string;
  accentColor: string;
  rulebook: {
    overview: string;
    constraints: string[];
    timeLimits: string;
    rules: string[];
    judgingCriteria: string[];
  };
}

export const MILAAP_COMPETITIONS: MilaapCompetition[] = [
  {
    id: "eastern-light-vocals",
    title: "Eastern Light Vocals & Classical",
    category: "Music",
    format: "Solo",
    shortDescription:
      "Solo classical, semi-classical, Rabindrasangeet, and regional folk vocal showcase celebrating the soul of Indian music.",
    timeLimit: "5 Mins Performance + 2 Mins Setup",
    teamSize: "Solo (1 Singer + up to 2 Accompanists)",
    prizePool: "₹20,000",
    date: "Nov 28, 2026",
    venue: "Gandhi Bhavan Auditorium",
    gradient: "from-amber-600/30 via-yellow-950/40 to-neutral-950",
    accentColor: "#F59E0B",
    rulebook: {
      overview:
        "Eastern Light Vocals invites vocalists to showcase the depth and heritage of Indian vocal music, from classical Khayal and Thumri to Rabindrasangeet, Ghazal, and regional folk.",
      constraints: [
        "Solo vocalists only with valid college student ID card.",
        "Maximum 2 live acoustic accompanists (e.g. Harmonium, Tabla) or 1 standard karaoke/tanpura track.",
        "Pre-recorded vocal backing or auto-tuned audio tracks are strictly banned."
      ],
      timeLimits:
        "5 minutes performance time with 2 minutes setup/soundcheck. Overtime leads to penalty deductions.",
      rules: [
        "Permitted genres: Classical (Khayal/Dhrupad), Semi-Classical (Thumri/Dadra), Ghazal, Rabindrasangeet, Nazrulgeeti, or Regional Folk.",
        "A tanpura drone (acoustic or electronic tanpura droid) is mandatory for classical presentations.",
        "Backing tracks (if any) must be submitted in MP3 format at the sound desk 45 minutes prior to the slot.",
        "Judges' decisions are final, binding, and irrevocable."
      ],
      judgingCriteria: [
        "Sur, Shruti, and pitch accuracy (35%)",
        "Taal, Laya, and rhythmic precision (25%)",
        "Bhava, emotional expression, and voice modulation (25%)",
        "Song selection and overall presentation (15%)"
      ]
    }
  },
  {
    id: "western-vocals",
    title: "Western Vocals",
    category: "Music",
    format: "Solo",
    shortDescription:
      "Solo vocal showdown celebrating Pop, Rock, Soul, R&B, Jazz, and acoustic singer-songwriter anthems.",
    timeLimit: "5 Mins Total Stage Time",
    teamSize: "Solo (1 Performer)",
    prizePool: "₹20,000",
    date: "Nov 28, 2026",
    venue: "Worldview Amphitheatre",
    gradient: "from-blue-600/30 via-indigo-950/40 to-black",
    accentColor: "#3B82F6",
    rulebook: {
      overview:
        "Western Vocals is the platform for vocal dynamics, expressive tone, and acoustic interpretations in the scenic open-air campus amphitheatre.",
      constraints: [
        "Solo vocalists only. Participants may self-accompany on acoustic guitar or keyboard, or bring 1 accompanist.",
        "Instrumental backing tracks without lead vocals allowed via 3.5mm jack or USB drive.",
        "Valid college ID is mandatory for registration check-in."
      ],
      timeLimits:
        "Strict 5 minutes total stage time including stage entrance and mic check.",
      rules: [
        "Eligible genres: Pop, Rock, Soul, Blues, Country, Jazz, Ballads, and Acoustic Indie.",
        "Original compositions and creative cover rearrangements are actively encouraged and earn bonus points.",
        "Backing tracks containing backing vocal stems or pitch correction are strictly disqualified.",
        "All competitors must report at least 30 minutes before the scheduled time slot."
      ],
      judgingCriteria: [
        "Vocal range, tone quality, and pitch stability (35%)",
        "Dynamics, breath control, and expression (25%)",
        "Stage presence and audience connection (25%)",
        "Clarity of diction and interpretation (15%)"
      ]
    }
  },
  {
    id: "instrumental",
    title: "Instrumental",
    category: "Music",
    format: "Solo/Duet",
    shortDescription:
      "Solo and duet virtuosity across frets, keys, winds, and percussions in Eastern and Western disciplines.",
    timeLimit: "6 Mins Performance Time",
    teamSize: "Solo or Duet (1 – 2 Musicians)",
    prizePool: "₹18,000",
    date: "Nov 29, 2026",
    venue: "Gandhi Bhavan Auditorium",
    gradient: "from-amber-700/30 via-purple-950/40 to-stone-950",
    accentColor: "#F59E0B",
    rulebook: {
      overview:
        "The Instrumental Showdown puts the spotlight on pure instrumental skill—from screaming guitar solos and soaring violin melodies to intricate sitar meends and complex percussive grooves.",
      constraints: [
        "Solo performer or duet (maximum 2 performers on stage).",
        "Drone/tanpura box is allowed for Eastern instruments.",
        "Backing rhythm tracks and auto-accompaniment modes are barred."
      ],
      timeLimits:
        "6 minutes total stage time. A warning indicator is flashed at 5 minutes.",
      rules: [
        "Any acoustic or electric instrument is eligible (Sitar, Guitar, Flute, Violin, Keyboard, Drums, Percussion, etc.).",
        "Keyboards must be played in real-time; auto-accompaniment modes (arpeggiators/styles) are barred.",
        "Instrumentalists must bring their own cables, processors, and instruments. Amplifiers and standard drum kit provided.",
        "Judging is calibrated across both classical disciplines and modern progressive/fusion styles."
      ],
      judgingCriteria: [
        "Technical virtuosity, speed, and accuracy (35%)",
        "Rhythmic groove, improvisational depth, and cadence (30%)",
        "Tone purity, dynamics, and articulation (20%)",
        "Difficulty of repertoire (15%)"
      ]
    }
  },
  {
    id: "battle-of-bands",
    title: "Battle of the Bands",
    category: "Music",
    format: "Group",
    shortDescription:
      "The premier collegiate amplified live rock, metal, and fusion band competition on the main festival stage.",
    timeLimit: "15 Mins Performance + 5 Mins Soundcheck",
    teamSize: "3 – 8 Members per Band",
    prizePool: "₹40,000",
    date: "Nov 29, 2026",
    venue: "Open Air Theatre (OAT)",
    gradient: "from-red-600/30 via-amber-950/40 to-stone-950",
    accentColor: "#EF4444",
    rulebook: {
      overview:
        "Battle of the Bands is the centerpiece of Milaap’s musical lineup. From indie rock to heavy metal and classical-fusion, bands battle for state-wide supremacy on an industry-grade amplified stage.",
      constraints: [
        "Minimum 3, maximum 8 members. Cross-college band combinations are allowed.",
        "All members must carry valid collegiate student ID cards."
      ],
      timeLimits:
        "Strict 20 minutes total stage time (15 mins performance + 5 mins setup/soundcheck). A warning bell rings at 13 mins of performance.",
      rules: [
        "A standard 5-piece drumkit, bass amplifier, and two guitar amplifiers will be provided on stage.",
        "Bands must bring their own instruments (guitars, keyboards, processors, cables, drum sticks).",
        "Bands may perform original compositions or covers. Original compositions carry bonus evaluation points.",
        "Backing tracks and pre-recorded synth sequences are strictly prohibited; all sound must be produced live.",
        "Foul language or derogatory stage conduct leads to immediate disqualification."
      ],
      judgingCriteria: [
        "Tightness, rhythmic locking, and musical arrangement (30%)",
        "Vocal dynamics, instrumental dexterity, and solo execution (30%)",
        "Originality, crowd response, and stage command (25%)",
        "Time management and stage discipline (15%)"
      ]
    }
  },
  {
    id: "indak-eastern-dance",
    title: "INDAK: Eastern Group Dance",
    category: "Dance",
    format: "Group",
    shortDescription:
      "JUDF's signature group dance competition celebrating Indian Classical and vibrant regional Folk choreography.",
    timeLimit: "8 – 12 Mins on Stage",
    teamSize: "6 – 16 Dancers per Team",
    prizePool: "₹35,000",
    date: "Nov 29, 2026",
    venue: "Open Air Theatre (OAT)",
    gradient: "from-purple-600/30 via-rose-950/40 to-black",
    accentColor: "#A855F7",
    rulebook: {
      overview:
        "INDAK is the flagship dance festival of JUDF, uniting Kathak, Bharatanatyam, Odissi, Manipuri, and vibrant folk traditions in breathtaking group formations under festival stage lights.",
      constraints: [
        "Teams must have 6 to 16 dancers on stage.",
        "Valid student ID cards required for all team members.",
        "Empty stage to cleared stage protocol must be completed within 2 minutes."
      ],
      timeLimits:
        "8 to 12 minutes performance window on stage. Negative marking applies for exceeding 12 minutes.",
      rules: [
        "Accepted dance styles: Bharatanatyam, Kathak, Odissi, Manipuri, Mohiniyattam, Folk (Bhangra, Garba, Chhau, Bihu, Lavani, etc.).",
        "Fusion between multiple classical or folk styles is welcomed with a coherent thematic narrative.",
        "Fire, water, live flames, powders, and hazardous props are strictly prohibited on stage.",
        "Soundtracks must be submitted in MP3 format (320kbps) on a USB drive at least 2 hours before the event."
      ],
      judgingCriteria: [
        "Synchronization, formation transitions, and spatial choreography (30%)",
        "Abhinaya, expressions, mudras, and posture authenticity (30%)",
        "Costume, aesthetics, and thematic representation (20%)",
        "Rhythm adherence, stamina, and energy flow (20%)"
      ]
    }
  },
  {
    id: "street-dance-battle",
    title: "Street Dance Battle",
    category: "Dance",
    format: "Group/Solo",
    shortDescription:
      "High-octane 1v1 and 2v2 street dance battles spanning Hip-Hop, Breaking, Popping, Krump, Afro, and All-Styles.",
    timeLimit: "45s per Round (Call-outs in Finals)",
    teamSize: "1v1 Solo or 2v2 Crew Duo",
    prizePool: "₹22,000",
    date: "Nov 29, 2026",
    venue: "Gandhi Bhavan Lawns & Cypher Arena",
    gradient: "from-emerald-600/30 via-teal-950/40 to-slate-950",
    accentColor: "#10B981",
    rulebook: {
      overview:
        "The Street Dance Battle is the ultimate test of musicality, freestyle spontaneity, and athletic execution. Dancers battle round-by-round to live beats spun by our resident battle DJ.",
      constraints: [
        "Solo (1v1) or Duos (2v2) registered in advance.",
        "Open to all verified college dancers with valid student credentials."
      ],
      timeLimits:
        "Preliminary round: 45s cypher run. Quarter/Semi-finals: 2 rounds of 45s each. Finals: 3 rounds.",
      rules: [
        "DJ drops random tracks (Hip-hop, Funk, Breaks, Trap, Afro, House). No pre-choreographed routines.",
        "Physical contact, unsportsmanlike behavior, or aggressive touching leads to immediate elimination.",
        "Top 16 dancers from open cyphers qualify for 1v1 knockouts; top 8 duos qualify for 2v2 knockouts.",
        "Decisions by the guest judges are instantaneous, impartial, and irrevocable."
      ],
      judgingCriteria: [
        "Musicality, beat responsiveness, and rhythm texture (35%)",
        "Technique, foundation, and body control (30%)",
        "Originality, freestyle spontaneity, and attitude (25%)",
        "Battle attitude and crowd engagement (10%)"
      ]
    }
  }
];
