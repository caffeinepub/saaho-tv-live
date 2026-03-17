export type Category = "All" | "News" | "Entertainment" | "Sports" | "Movies";

export interface Show {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface Channel {
  id: number;
  name: string;
  emoji: string;
  category: Exclude<Category, "All">;
  currentShow: Show;
  nextShow: Show;
  epg: Show[];
  epg24h: Show[];
  color: string;
  streamUrl?: string;
}

export const CHANNELS: Channel[] = [
  {
    id: 1,
    name: "Saaho News",
    emoji: "📺",
    category: "News",
    color: "#e53e3e",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    currentShow: {
      title: "Prime Time Evening News",
      startTime: "20:00",
      endTime: "21:00",
      description:
        "Comprehensive coverage of today's top stories — politics, economy, and breaking developments from around the world.",
    },
    nextShow: {
      title: "World Report",
      startTime: "21:00",
      endTime: "22:00",
      description: "In-depth international news analysis.",
    },
    epg: [
      {
        title: "Morning Bulletin",
        startTime: "06:00",
        endTime: "08:00",
        description: "Start your day with the latest news.",
      },
      {
        title: "Midday Update",
        startTime: "12:00",
        endTime: "13:00",
        description: "Afternoon news round-up.",
      },
      {
        title: "The Daily Brief",
        startTime: "17:00",
        endTime: "19:00",
        description: "Evening news summary.",
      },
      {
        title: "Prime Time Evening News",
        startTime: "20:00",
        endTime: "21:00",
        description: "Top stories of the day.",
      },
      {
        title: "World Report",
        startTime: "21:00",
        endTime: "22:00",
        description: "International news analysis.",
      },
      {
        title: "Late Night Dispatch",
        startTime: "23:00",
        endTime: "24:00",
        description: "Late-breaking headlines.",
      },
    ],
    epg24h: [
      {
        title: "Overnight Headlines",
        startTime: "00:00",
        endTime: "06:00",
        description: "Overnight news repeat and breaking alerts.",
      },
      {
        title: "Morning Bulletin",
        startTime: "06:00",
        endTime: "08:00",
        description: "Start your day with the latest news.",
      },
      {
        title: "Business Hour",
        startTime: "08:00",
        endTime: "09:00",
        description: "Markets, economy, and business headlines.",
      },
      {
        title: "Live Coverage",
        startTime: "09:00",
        endTime: "11:00",
        description: "Live rolling news coverage.",
      },
      {
        title: "Documentary Hour",
        startTime: "11:00",
        endTime: "12:00",
        description: "In-depth documentary journalism.",
      },
      {
        title: "Midday Update",
        startTime: "12:00",
        endTime: "13:00",
        description: "Afternoon news round-up.",
      },
      {
        title: "Afternoon Analysis",
        startTime: "13:00",
        endTime: "15:00",
        description: "Deep-dive policy and political analysis.",
      },
      {
        title: "Regional Reports",
        startTime: "15:00",
        endTime: "17:00",
        description: "Local and regional news from across the country.",
      },
      {
        title: "The Daily Brief",
        startTime: "17:00",
        endTime: "19:00",
        description: "Evening news summary.",
      },
      {
        title: "Weather & More",
        startTime: "19:00",
        endTime: "20:00",
        description: "Weather forecast and human-interest stories.",
      },
      {
        title: "Prime Time Evening News",
        startTime: "20:00",
        endTime: "21:00",
        description: "Top stories of the day.",
      },
      {
        title: "World Report",
        startTime: "21:00",
        endTime: "22:00",
        description: "International news analysis.",
      },
      {
        title: "Night Desk",
        startTime: "22:00",
        endTime: "23:00",
        description: "Late evening wrap-up and global headlines.",
      },
      {
        title: "Late Night Dispatch",
        startTime: "23:00",
        endTime: "24:00",
        description: "Late-breaking headlines.",
      },
    ],
  },
  {
    id: 2,
    name: "Saaho Entertainment",
    emoji: "🎭",
    category: "Entertainment",
    color: "#9b59b6",
    currentShow: {
      title: "The Grand Stage",
      startTime: "19:30",
      endTime: "21:00",
      description:
        "Live variety show featuring performances, celebrity interviews, and audience challenges in front of a live studio crowd.",
    },
    nextShow: {
      title: "Celebrity Roast Night",
      startTime: "21:00",
      endTime: "23:00",
      description: "Comedy special featuring top comedians.",
    },
    epg: [
      {
        title: "Morning Spark",
        startTime: "07:00",
        endTime: "09:00",
        description: "Energetic morning talk show.",
      },
      {
        title: "Soap & Drama",
        startTime: "14:00",
        endTime: "16:00",
        description: "Afternoon drama series marathon.",
      },
      {
        title: "The Grand Stage",
        startTime: "19:30",
        endTime: "21:00",
        description: "Live variety entertainment.",
      },
      {
        title: "Celebrity Roast Night",
        startTime: "21:00",
        endTime: "23:00",
        description: "Comedy special.",
      },
      {
        title: "Late Night Laughs",
        startTime: "23:00",
        endTime: "24:00",
        description: "Stand-up comedy showcase.",
      },
    ],
    epg24h: [
      {
        title: "Late Night Comedy Vault",
        startTime: "00:00",
        endTime: "03:00",
        description: "Classic stand-up specials and comedy archive.",
      },
      {
        title: "Night Infomercials",
        startTime: "03:00",
        endTime: "06:00",
        description: "Overnight programming.",
      },
      {
        title: "Early Riser Show",
        startTime: "06:00",
        endTime: "07:00",
        description: "Light morning entertainment.",
      },
      {
        title: "Morning Spark",
        startTime: "07:00",
        endTime: "09:00",
        description: "Energetic morning talk show.",
      },
      {
        title: "Daytime Drama",
        startTime: "09:00",
        endTime: "11:00",
        description: "Fan-favourite daytime drama series.",
      },
      {
        title: "Talk Time Live",
        startTime: "11:00",
        endTime: "13:00",
        description: "Celebrity guests and hot topics.",
      },
      {
        title: "Lunchtime Clips",
        startTime: "13:00",
        endTime: "14:00",
        description: "Viral moments and best-of clips.",
      },
      {
        title: "Soap & Drama",
        startTime: "14:00",
        endTime: "16:00",
        description: "Afternoon drama series marathon.",
      },
      {
        title: "Reality Rewind",
        startTime: "16:00",
        endTime: "17:00",
        description: "Best moments from reality TV.",
      },
      {
        title: "Evening Countdown",
        startTime: "17:00",
        endTime: "19:30",
        description: "Entertainment news and previews.",
      },
      {
        title: "The Grand Stage",
        startTime: "19:30",
        endTime: "21:00",
        description: "Live variety entertainment.",
      },
      {
        title: "Celebrity Roast Night",
        startTime: "21:00",
        endTime: "23:00",
        description: "Comedy special.",
      },
      {
        title: "Late Night Laughs",
        startTime: "23:00",
        endTime: "24:00",
        description: "Stand-up comedy showcase.",
      },
    ],
  },
  {
    id: 3,
    name: "Saaho Sports",
    emoji: "⚽",
    category: "Sports",
    color: "#27ae60",
    currentShow: {
      title: "Champions League Highlights",
      startTime: "20:00",
      endTime: "22:00",
      description:
        "Extended highlights, post-match analysis, and expert commentary from tonight's Champions League fixtures across Europe.",
    },
    nextShow: {
      title: "Sports Center Tonight",
      startTime: "22:00",
      endTime: "23:00",
      description: "Daily sports wrap-up show.",
    },
    epg: [
      {
        title: "Morning Fitness Hour",
        startTime: "06:00",
        endTime: "07:00",
        description: "Daily workout and wellness.",
      },
      {
        title: "Football Preview Show",
        startTime: "12:00",
        endTime: "14:00",
        description: "Pre-match analysis and predictions.",
      },
      {
        title: "Live Football: Premier League",
        startTime: "16:00",
        endTime: "18:30",
        description: "Live match broadcast.",
      },
      {
        title: "Champions League Highlights",
        startTime: "20:00",
        endTime: "22:00",
        description: "Match highlights and analysis.",
      },
      {
        title: "Sports Center Tonight",
        startTime: "22:00",
        endTime: "23:00",
        description: "Daily sports wrap-up.",
      },
    ],
    epg24h: [
      {
        title: "Sports Archive Overnight",
        startTime: "00:00",
        endTime: "05:00",
        description: "Classic matches and sports archives.",
      },
      {
        title: "Early Sports News",
        startTime: "05:00",
        endTime: "06:00",
        description: "Morning sports headlines.",
      },
      {
        title: "Morning Fitness Hour",
        startTime: "06:00",
        endTime: "07:00",
        description: "Daily workout and wellness.",
      },
      {
        title: "Weekend Warmup",
        startTime: "07:00",
        endTime: "09:00",
        description: "Preview of the day's fixtures.",
      },
      {
        title: "Live Tennis: Grand Slam",
        startTime: "09:00",
        endTime: "12:00",
        description: "Live Grand Slam coverage.",
      },
      {
        title: "Football Preview Show",
        startTime: "12:00",
        endTime: "14:00",
        description: "Pre-match analysis and predictions.",
      },
      {
        title: "Athletics Highlights",
        startTime: "14:00",
        endTime: "16:00",
        description: "Track and field highlights.",
      },
      {
        title: "Live Football: Premier League",
        startTime: "16:00",
        endTime: "18:30",
        description: "Live match broadcast.",
      },
      {
        title: "Post-Match Show",
        startTime: "18:30",
        endTime: "20:00",
        description: "Analysis and fan reactions.",
      },
      {
        title: "Champions League Highlights",
        startTime: "20:00",
        endTime: "22:00",
        description: "Match highlights and analysis.",
      },
      {
        title: "Sports Center Tonight",
        startTime: "22:00",
        endTime: "23:00",
        description: "Daily sports wrap-up.",
      },
      {
        title: "Late Night Sport",
        startTime: "23:00",
        endTime: "24:00",
        description: "Late scores and reactions.",
      },
    ],
  },
  {
    id: 4,
    name: "Saaho Movies",
    emoji: "🎬",
    category: "Movies",
    color: "#e67e22",
    currentShow: {
      title: "Velocity: Reborn",
      startTime: "20:00",
      endTime: "22:15",
      description:
        "A high-octane action thriller following an elite operative who must race against time to prevent a global catastrophe. Rated 8.1/10.",
    },
    nextShow: {
      title: "Midnight in Marseille",
      startTime: "22:15",
      endTime: "00:00",
      description: "A romantic mystery set in southern France.",
    },
    epg: [
      {
        title: "Classic Cinema: Casablanca",
        startTime: "10:00",
        endTime: "12:00",
        description: "Timeless classic in full HD.",
      },
      {
        title: "Afternoon Blockbuster",
        startTime: "14:00",
        endTime: "16:30",
        description: "Today's featured film.",
      },
      {
        title: "Director's Cut Series",
        startTime: "17:00",
        endTime: "19:30",
        description: "Extended director editions.",
      },
      {
        title: "Velocity: Reborn",
        startTime: "20:00",
        endTime: "22:15",
        description: "Action thriller premiere.",
      },
      {
        title: "Midnight in Marseille",
        startTime: "22:15",
        endTime: "00:00",
        description: "Romantic mystery.",
      },
    ],
    epg24h: [
      {
        title: "Midnight Movie: Noir Classic",
        startTime: "00:00",
        endTime: "02:00",
        description: "Black-and-white noir thriller.",
      },
      {
        title: "Night Screen: Drama",
        startTime: "02:00",
        endTime: "04:00",
        description: "Late-night award-winning drama.",
      },
      {
        title: "Early Morning Film",
        startTime: "04:00",
        endTime: "06:00",
        description: "Sunrise cinema selection.",
      },
      {
        title: "Morning Movie",
        startTime: "06:00",
        endTime: "08:00",
        description: "Light morning feature.",
      },
      {
        title: "Golden Era Cinema",
        startTime: "08:00",
        endTime: "10:00",
        description: "Hollywood golden age classics.",
      },
      {
        title: "Classic Cinema: Casablanca",
        startTime: "10:00",
        endTime: "12:00",
        description: "Timeless classic in full HD.",
      },
      {
        title: "Afternoon Blockbuster",
        startTime: "12:00",
        endTime: "14:30",
        description: "Today's featured film.",
      },
      {
        title: "Director's Feature",
        startTime: "14:30",
        endTime: "17:00",
        description: "Award-winning director's selection.",
      },
      {
        title: "Director's Cut Series",
        startTime: "17:00",
        endTime: "19:30",
        description: "Extended director editions.",
      },
      {
        title: "Coming Up Tonight",
        startTime: "19:30",
        endTime: "20:00",
        description: "Tonight's movie preview.",
      },
      {
        title: "Velocity: Reborn",
        startTime: "20:00",
        endTime: "22:15",
        description: "Action thriller premiere.",
      },
      {
        title: "Midnight in Marseille",
        startTime: "22:15",
        endTime: "24:00",
        description: "Romantic mystery set in southern France.",
      },
    ],
  },
  {
    id: 5,
    name: "Saaho Music",
    emoji: "🎵",
    category: "Entertainment",
    color: "#3498db",
    currentShow: {
      title: "Top 40 Countdown LIVE",
      startTime: "19:00",
      endTime: "21:00",
      description:
        "Live countdown of this week's hottest tracks with exclusive artist interviews, behind-the-scenes footage, and live performances.",
    },
    nextShow: {
      title: "Unplugged Sessions",
      startTime: "21:00",
      endTime: "23:00",
      description: "Acoustic performances by chart-topping artists.",
    },
    epg: [
      {
        title: "Morning Grooves",
        startTime: "07:00",
        endTime: "09:00",
        description: "Wake up with the best music.",
      },
      {
        title: "Retro Rewind",
        startTime: "12:00",
        endTime: "14:00",
        description: "Classic hits from the 80s & 90s.",
      },
      {
        title: "New Releases Friday",
        startTime: "16:00",
        endTime: "18:00",
        description: "This week's freshest drops.",
      },
      {
        title: "Top 40 Countdown LIVE",
        startTime: "19:00",
        endTime: "21:00",
        description: "Weekly countdown show.",
      },
      {
        title: "Unplugged Sessions",
        startTime: "21:00",
        endTime: "23:00",
        description: "Acoustic performances.",
      },
    ],
    epg24h: [
      {
        title: "After Hours Beats",
        startTime: "00:00",
        endTime: "02:00",
        description: "Deep electronic and ambient sets.",
      },
      {
        title: "Overnight Chill Mix",
        startTime: "02:00",
        endTime: "05:00",
        description: "Smooth overnight music.",
      },
      {
        title: "Early Morning Vibes",
        startTime: "05:00",
        endTime: "07:00",
        description: "Gentle sunrise soundtrack.",
      },
      {
        title: "Morning Grooves",
        startTime: "07:00",
        endTime: "09:00",
        description: "Wake up with the best music.",
      },
      {
        title: "Pop Hits Parade",
        startTime: "09:00",
        endTime: "11:00",
        description: "Non-stop pop chart bangers.",
      },
      {
        title: "Indie Discovery",
        startTime: "11:00",
        endTime: "12:00",
        description: "Emerging artists showcase.",
      },
      {
        title: "Retro Rewind",
        startTime: "12:00",
        endTime: "14:00",
        description: "Classic hits from the 80s & 90s.",
      },
      {
        title: "Afternoon Acoustic",
        startTime: "14:00",
        endTime: "16:00",
        description: "Soft acoustic sessions.",
      },
      {
        title: "New Releases Friday",
        startTime: "16:00",
        endTime: "18:00",
        description: "This week's freshest drops.",
      },
      {
        title: "Chart Watch",
        startTime: "18:00",
        endTime: "19:00",
        description: "Chart movement analysis.",
      },
      {
        title: "Top 40 Countdown LIVE",
        startTime: "19:00",
        endTime: "21:00",
        description: "Weekly countdown show.",
      },
      {
        title: "Unplugged Sessions",
        startTime: "21:00",
        endTime: "23:00",
        description: "Acoustic performances.",
      },
      {
        title: "Midnight Mixtape",
        startTime: "23:00",
        endTime: "24:00",
        description: "Curated late-night mix.",
      },
    ],
  },
  {
    id: 6,
    name: "Saaho Kids",
    emoji: "🧒",
    category: "Entertainment",
    color: "#f39c12",
    currentShow: {
      title: "Adventure Planet",
      startTime: "19:00",
      endTime: "20:00",
      description:
        "Join Captain Luna and her crew as they explore mysterious planets, solve puzzles, and make new alien friends in this animated series.",
    },
    nextShow: {
      title: "Bedtime Stories Live",
      startTime: "20:00",
      endTime: "21:00",
      description: "Soothing animated bedtime tales.",
    },
    epg: [
      {
        title: "Good Morning Kids",
        startTime: "07:00",
        endTime: "09:00",
        description: "Morning cartoons and learning.",
      },
      {
        title: "Science with Zara",
        startTime: "10:00",
        endTime: "11:00",
        description: "Fun experiments for kids.",
      },
      {
        title: "Cartoon Bonanza",
        startTime: "15:00",
        endTime: "17:00",
        description: "Two hours of top cartoons.",
      },
      {
        title: "Adventure Planet",
        startTime: "19:00",
        endTime: "20:00",
        description: "Space exploration animated series.",
      },
      {
        title: "Bedtime Stories Live",
        startTime: "20:00",
        endTime: "21:00",
        description: "Animated bedtime tales.",
      },
    ],
    epg24h: [
      {
        title: "Overnight Sleep Stories",
        startTime: "00:00",
        endTime: "06:00",
        description: "Calming overnight stories.",
      },
      {
        title: "Rise & Shine",
        startTime: "06:00",
        endTime: "07:00",
        description: "Good morning songs and activities.",
      },
      {
        title: "Good Morning Kids",
        startTime: "07:00",
        endTime: "09:00",
        description: "Morning cartoons and learning.",
      },
      {
        title: "Learning Land",
        startTime: "09:00",
        endTime: "10:00",
        description: "Educational programming for all ages.",
      },
      {
        title: "Science with Zara",
        startTime: "10:00",
        endTime: "11:00",
        description: "Fun experiments for kids.",
      },
      {
        title: "Art & Craft Hour",
        startTime: "11:00",
        endTime: "12:00",
        description: "Creative crafts and drawing.",
      },
      {
        title: "Lunchtime Toons",
        startTime: "12:00",
        endTime: "13:00",
        description: "Lunchtime cartoon favourites.",
      },
      {
        title: "Afternoon Adventures",
        startTime: "13:00",
        endTime: "15:00",
        description: "Action-packed animated adventures.",
      },
      {
        title: "Cartoon Bonanza",
        startTime: "15:00",
        endTime: "17:00",
        description: "Two hours of top cartoons.",
      },
      {
        title: "Game Time Challenge",
        startTime: "17:00",
        endTime: "18:00",
        description: "Kids game show.",
      },
      {
        title: "Story Hour",
        startTime: "18:00",
        endTime: "19:00",
        description: "Classic tales brought to life.",
      },
      {
        title: "Adventure Planet",
        startTime: "19:00",
        endTime: "20:00",
        description: "Space exploration animated series.",
      },
      {
        title: "Bedtime Stories Live",
        startTime: "20:00",
        endTime: "21:00",
        description: "Animated bedtime tales.",
      },
      {
        title: "Silent Nighttime",
        startTime: "21:00",
        endTime: "24:00",
        description: "Peaceful ambient overnight programming.",
      },
    ],
  },
  {
    id: 7,
    name: "Saaho Business",
    emoji: "💼",
    category: "News",
    color: "#1abc9c",
    currentShow: {
      title: "Market Close Report",
      startTime: "18:30",
      endTime: "20:00",
      description:
        "End-of-day market analysis covering stock movements, currency fluctuations, commodity prices, and expert financial forecasts.",
    },
    nextShow: {
      title: "Global Business Tonight",
      startTime: "20:00",
      endTime: "21:30",
      description: "International business headlines and CEO interviews.",
    },
    epg: [
      {
        title: "Pre-Market Prep",
        startTime: "07:00",
        endTime: "09:00",
        description: "Pre-market analysis and forecasts.",
      },
      {
        title: "Trading Floor Live",
        startTime: "09:30",
        endTime: "12:00",
        description: "Live market coverage.",
      },
      {
        title: "Midday Markets",
        startTime: "12:00",
        endTime: "13:00",
        description: "Market midday update.",
      },
      {
        title: "Market Close Report",
        startTime: "18:30",
        endTime: "20:00",
        description: "End-of-day analysis.",
      },
      {
        title: "Global Business Tonight",
        startTime: "20:00",
        endTime: "21:30",
        description: "International business news.",
      },
    ],
    epg24h: [
      {
        title: "Asia Markets Overnight",
        startTime: "00:00",
        endTime: "05:00",
        description: "Live coverage of Asian markets.",
      },
      {
        title: "European Market Open",
        startTime: "05:00",
        endTime: "07:00",
        description: "Early European trading session.",
      },
      {
        title: "Pre-Market Prep",
        startTime: "07:00",
        endTime: "09:00",
        description: "Pre-market analysis and forecasts.",
      },
      {
        title: "Market Open Bell",
        startTime: "09:00",
        endTime: "09:30",
        description: "Opening bell coverage.",
      },
      {
        title: "Trading Floor Live",
        startTime: "09:30",
        endTime: "12:00",
        description: "Live market coverage.",
      },
      {
        title: "Midday Markets",
        startTime: "12:00",
        endTime: "13:00",
        description: "Market midday update.",
      },
      {
        title: "Afternoon Business Hour",
        startTime: "13:00",
        endTime: "15:00",
        description: "Business interviews and features.",
      },
      {
        title: "Tech Sector Report",
        startTime: "15:00",
        endTime: "16:00",
        description: "Technology stocks and innovation.",
      },
      {
        title: "Closing Bell",
        startTime: "16:00",
        endTime: "17:00",
        description: "Market closing analysis.",
      },
      {
        title: "After-Market Analysis",
        startTime: "17:00",
        endTime: "18:30",
        description: "Post-market review.",
      },
      {
        title: "Market Close Report",
        startTime: "18:30",
        endTime: "20:00",
        description: "End-of-day analysis.",
      },
      {
        title: "Global Business Tonight",
        startTime: "20:00",
        endTime: "21:30",
        description: "International business news.",
      },
      {
        title: "Crypto & Digital Assets",
        startTime: "21:30",
        endTime: "23:00",
        description: "Cryptocurrency and blockchain updates.",
      },
      {
        title: "Tomorrow's Market Preview",
        startTime: "23:00",
        endTime: "24:00",
        description: "Preview of tomorrow's trading day.",
      },
    ],
  },
  {
    id: 8,
    name: "Saaho Cricket",
    emoji: "🏏",
    category: "Sports",
    color: "#e74c3c",
    currentShow: {
      title: "LIVE: India vs Australia — T20 World Cup",
      startTime: "19:30",
      endTime: "23:30",
      description:
        "Live coverage of the electrifying T20 World Cup showdown between India and Australia. Full commentary, expert analysis, and fan zone updates.",
    },
    nextShow: {
      title: "Post-Match Analysis",
      startTime: "23:30",
      endTime: "01:00",
      description: "In-depth post-match discussion.",
    },
    epg: [
      {
        title: "Cricket Breakfast",
        startTime: "07:00",
        endTime: "09:00",
        description: "Morning cricket news and fixtures.",
      },
      {
        title: "Classic Matches Vault",
        startTime: "10:00",
        endTime: "13:00",
        description: "Best cricket matches in history.",
      },
      {
        title: "Pre-Match Show",
        startTime: "18:00",
        endTime: "19:30",
        description: "Build-up to tonight's match.",
      },
      {
        title: "LIVE: India vs Australia — T20 World Cup",
        startTime: "19:30",
        endTime: "23:30",
        description: "Live T20 World Cup match.",
      },
      {
        title: "Post-Match Analysis",
        startTime: "23:30",
        endTime: "24:00",
        description: "Full post-match coverage.",
      },
    ],
    epg24h: [
      {
        title: "Overnight Test Match Archives",
        startTime: "00:00",
        endTime: "03:00",
        description: "Classic test match replays.",
      },
      {
        title: "Classic Test Cricket",
        startTime: "03:00",
        endTime: "06:00",
        description: "Historic test series highlights.",
      },
      {
        title: "Cricket Dawn Show",
        startTime: "06:00",
        endTime: "07:00",
        description: "Early morning cricket updates.",
      },
      {
        title: "Cricket Breakfast",
        startTime: "07:00",
        endTime: "09:00",
        description: "Morning cricket news and fixtures.",
      },
      {
        title: "Women's Cricket Highlights",
        startTime: "09:00",
        endTime: "10:00",
        description: "Best moments from women's cricket.",
      },
      {
        title: "Classic Matches Vault",
        startTime: "10:00",
        endTime: "13:00",
        description: "Best cricket matches in history.",
      },
      {
        title: "IPL Rewind",
        startTime: "13:00",
        endTime: "15:00",
        description: "Greatest IPL moments.",
      },
      {
        title: "Cricket Academy",
        startTime: "15:00",
        endTime: "16:00",
        description: "Coaching tips and skills tutorials.",
      },
      {
        title: "County Cricket Live",
        startTime: "16:00",
        endTime: "18:00",
        description: "Live domestic cricket coverage.",
      },
      {
        title: "Pre-Match Show",
        startTime: "18:00",
        endTime: "19:30",
        description: "Build-up to tonight's match.",
      },
      {
        title: "LIVE: India vs Australia — T20 World Cup",
        startTime: "19:30",
        endTime: "23:30",
        description: "Live T20 World Cup match.",
      },
      {
        title: "Post-Match Analysis",
        startTime: "23:30",
        endTime: "24:00",
        description: "Full post-match coverage.",
      },
    ],
  },
];
