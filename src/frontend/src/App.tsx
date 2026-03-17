import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import Hls from "hls.js";
import {
  AlertCircle,
  ChevronRight,
  LayoutGrid,
  Maximize,
  Pause,
  Play,
  Radio,
  Signal,
  Tv,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EPGGuide } from "./components/EPGGuide";
import { CHANNELS, type Category, type Channel } from "./data/channels";

const CATEGORIES: Category[] = [
  "All",
  "News",
  "Entertainment",
  "Sports",
  "Movies",
];

type View = "player" | "guide";

function LiveBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold tracking-widest bg-tv-red text-white ${className}`}
    >
      <span className="live-pulse w-1.5 h-1.5 rounded-full bg-white inline-block" />
      LIVE
    </span>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="h-1 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.1)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: "#e53e3e" }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(CHANNELS[0]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [activeView, setActiveView] = useState<View>("player");
  const [streamError, setStreamError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // HLS stream setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    video.pause();
    video.src = "";
    setStreamError(null);
    setIsBuffering(false);

    const streamUrl = selectedChannel.streamUrl;
    if (!streamUrl) return;

    const startStream = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsRef.current = hls;

        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsBuffering(false);
          // Always attempt autoplay when stream loads
          video.play().catch(() => {
            // Autoplay blocked by browser — user interaction required
          });
        });

        hls.on(Hls.Events.BUFFER_APPENDING, () => {
          setIsBuffering(false);
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            setStreamError("Stream unavailable. Please try again later.");
            setIsBuffering(false);
          }
        });

        setIsBuffering(true);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS (Safari)
        video.src = streamUrl;
        video.addEventListener("loadedmetadata", () => {
          setIsBuffering(false);
          video.play().catch(() => {});
        });
        setIsBuffering(true);
      } else {
        setStreamError("HLS streaming is not supported in this browser.");
      }
    };

    startStream();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChannel.streamUrl]);

  // Sync play/pause state with video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedChannel.streamUrl) return;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, selectedChannel.streamUrl]);

  // Sync volume/mute with video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume / 100;
    video.muted = isMuted;
  }, [volume, isMuted]);

  const filteredChannels =
    activeCategory === "All"
      ? CHANNELS
      : CHANNELS.filter((c) => c.category === activeCategory);

  const liveProgress = 62;

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }
  };

  const handleGuideSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    setActiveView("player");
  };

  const hasStream = !!selectedChannel.streamUrl;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0a0a0f", fontFamily: "Figtree, sans-serif" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-3 z-50 sticky top-0"
        style={{
          background: "rgba(10,10,15,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/saaho-tv-logo-transparent.dim_400x120.png"
            alt="Saaho TV Live"
            className="h-9 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span
            className="font-display font-bold text-xl text-white tracking-tight hidden sm:block"
            style={{ letterSpacing: "-0.02em" }}
          >
            SAAHO <span style={{ color: "#e53e3e" }}>TV</span> LIVE
          </span>
          <LiveBadge />
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => setActiveView("player")}
            className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-white"
            style={{
              color:
                activeView === "player" ? "white" : "rgba(255,255,255,0.55)",
              background:
                activeView === "player"
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
            }}
          >
            Home
          </button>
          <button
            type="button"
            data-ocid="guide.tab"
            onClick={() => setActiveView("guide")}
            className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-white flex items-center gap-1.5"
            style={{
              color:
                activeView === "guide" ? "white" : "rgba(255,255,255,0.55)",
              background:
                activeView === "guide" ? "rgba(229,62,62,0.15)" : "transparent",
              border:
                activeView === "guide"
                  ? "1px solid rgba(229,62,62,0.3)"
                  : "1px solid transparent",
            }}
          >
            <LayoutGrid size={14} />
            24H Guide
          </button>
          {[
            { label: "Movies", ocid: "nav.movies.link" },
            { label: "Sports", ocid: "nav.sports.link" },
          ].map(({ label, ocid }) => (
            <button
              type="button"
              key={label}
              data-ocid={ocid}
              className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile guide toggle */}
          <button
            type="button"
            data-ocid="guide.tab"
            onClick={() =>
              setActiveView(activeView === "guide" ? "player" : "guide")
            }
            className="md:hidden p-2 rounded-md transition-all"
            style={{
              color:
                activeView === "guide" ? "#e53e3e" : "rgba(255,255,255,0.6)",
              background:
                activeView === "guide" ? "rgba(229,62,62,0.12)" : "transparent",
            }}
          >
            <LayoutGrid size={18} />
          </button>
          <Signal
            size={14}
            style={{ color: "#e53e3e" }}
            className="live-pulse"
          />
          <span
            className="text-sm font-mono"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {currentTime}
          </span>
        </div>
      </header>

      {/* Guide View */}
      <AnimatePresence mode="wait">
        {activeView === "guide" && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col overflow-hidden"
            style={{ minHeight: 0, height: "calc(100vh - 57px - 48px)" }}
          >
            {/* Guide header bar */}
            <div
              className="flex items-center justify-between px-6 py-3 flex-shrink-0"
              style={{
                background: "#12121a",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid size={16} style={{ color: "#e53e3e" }} />
                <span className="text-sm font-semibold text-white">
                  24-Hour Program Guide
                </span>
              </div>
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                All times shown in local time
              </span>
            </div>

            <div className="flex-1 overflow-hidden">
              <EPGGuide
                channels={CHANNELS}
                onSelectChannel={handleGuideSelectChannel}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player View */}
      <AnimatePresence mode="wait">
        {activeView === "player" && (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-1 overflow-hidden"
          >
            {/* Sidebar */}
            <aside
              className="hidden md:flex flex-col w-72 flex-shrink-0"
              style={{
                background: "#12121a",
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="flex gap-1 p-3 overflow-x-auto"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    data-ocid="channel.filter.tab"
                    onClick={() => setActiveCategory(cat)}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
                    style={{
                      background:
                        activeCategory === cat
                          ? "#e53e3e"
                          : "rgba(255,255,255,0.06)",
                      color:
                        activeCategory === cat
                          ? "white"
                          : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <ScrollArea className="flex-1">
                <AnimatePresence mode="popLayout">
                  {filteredChannels.map((channel, idx) => {
                    const isActive = channel.id === selectedChannel.id;
                    const ocidIndex =
                      CHANNELS.findIndex((c) => c.id === channel.id) + 1;
                    return (
                      <motion.button
                        type="button"
                        key={channel.id}
                        data-ocid={`channel.item.${ocidIndex}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15, delay: idx * 0.04 }}
                        onClick={() => setSelectedChannel(channel)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 relative"
                        style={{
                          background: isActive
                            ? "rgba(229,62,62,0.12)"
                            : "transparent",
                          borderLeft: isActive
                            ? "3px solid #e53e3e"
                            : "3px solid transparent",
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl"
                          style={{
                            background: isActive
                              ? "rgba(229,62,62,0.2)"
                              : "rgba(255,255,255,0.06)",
                          }}
                        >
                          {channel.emoji}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className="text-sm font-semibold truncate"
                              style={{
                                color: isActive
                                  ? "white"
                                  : "rgba(255,255,255,0.85)",
                              }}
                            >
                              {channel.name}
                            </span>
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0 live-pulse"
                              style={{ background: channel.color }}
                            />
                          </div>
                          <p
                            className="text-xs truncate"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            {channel.currentShow.title}
                          </p>
                        </div>
                        {channel.streamUrl && (
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                            style={{
                              background: "rgba(229,62,62,0.2)",
                              color: "#ff6b6b",
                              border: "1px solid rgba(229,62,62,0.3)",
                            }}
                          >
                            LIVE
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </ScrollArea>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col overflow-y-auto">
              <div className="p-4 md:p-6">
                <div
                  ref={playerRef}
                  data-ocid="player.canvas_target"
                  className="relative rounded-xl overflow-hidden w-full"
                  style={{ aspectRatio: "16/9", background: "#0d0d18" }}
                >
                  {/* Real HLS video element — always rendered, shown only when channel has a stream */}
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      objectFit: "cover",
                      display: hasStream ? "block" : "none",
                    }}
                    playsInline
                    autoPlay
                  >
                    <track kind="captions" />
                  </video>

                  {/* Fake player UI — shown when no stream URL */}
                  {!hasStream && (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at 30% 50%, ${selectedChannel.color}22 0%, transparent 60%),
                                       radial-gradient(ellipse at 70% 50%, rgba(229,62,62,0.08) 0%, transparent 60%),
                                       linear-gradient(135deg, #0d0d18 0%, #12121a 50%, #0a0a0f 100%)`,
                        }}
                      />

                      {isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div
                            className="signal-ring absolute w-32 h-32 rounded-full border"
                            style={{
                              borderColor: `${selectedChannel.color}40`,
                            }}
                          />
                          <div
                            className="signal-ring-delay absolute w-32 h-32 rounded-full border"
                            style={{
                              borderColor: `${selectedChannel.color}25`,
                            }}
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="text-5xl mb-2">
                          {selectedChannel.emoji}
                        </div>
                        <h2
                          className="font-display font-bold text-2xl md:text-3xl text-white text-center px-4"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          {selectedChannel.name}
                        </h2>
                        <p
                          className="text-sm md:text-base text-center px-8"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          {selectedChannel.currentShow.title}
                        </p>
                        {!isPlaying && (
                          <div
                            className="mt-2 px-4 py-2 rounded-full text-sm font-semibold"
                            style={{
                              background: "rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            Paused
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Buffering overlay */}
                  {hasStream && isBuffering && !streamError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
                        style={{
                          borderColor: "#e53e3e",
                          borderTopColor: "transparent",
                        }}
                        data-ocid="player.loading_state"
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        Loading stream…
                      </span>
                    </div>
                  )}

                  {/* Stream error overlay */}
                  {hasStream && streamError && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70"
                      data-ocid="player.error_state"
                    >
                      <AlertCircle size={32} style={{ color: "#e53e3e" }} />
                      <p
                        className="text-sm font-medium text-center px-8"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {streamError}
                      </p>
                    </div>
                  )}

                  {/* Top-left badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <LiveBadge />
                    {hasStream && !streamError && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold tracking-widest"
                        style={{
                          background: "rgba(0,180,100,0.85)",
                          color: "white",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        📡 TEST STREAM
                      </span>
                    )}
                  </div>

                  <Badge
                    className="absolute top-3 right-3 text-xs font-bold"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      color: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    HD
                  </Badge>

                  {!hasStream && isPlaying && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-5"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
                      }}
                    />
                  )}
                </div>

                {/* Player Controls */}
                <div
                  className="flex items-center gap-4 px-4 py-3 mt-2 rounded-lg"
                  style={{
                    background: "#12121a",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-base">{selectedChannel.emoji}</span>
                    <span className="text-sm font-semibold truncate text-white">
                      {selectedChannel.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      data-ocid="player.toggle"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                      style={{ background: "#e53e3e" }}
                    >
                      {isPlaying ? (
                        <Pause size={16} className="text-white" />
                      ) : (
                        <Play size={16} className="text-white ml-0.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded transition-colors"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX size={18} />
                      ) : (
                        <Volume2 size={18} />
                      )}
                    </button>

                    <div className="w-20 hidden sm:block">
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(v) => {
                          setVolume(v[0]);
                          setIsMuted(v[0] === 0);
                        }}
                        className="cursor-pointer"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="p-2 rounded transition-colors"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      <Maximize size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Now Playing Info */}
              <div className="px-4 md:px-6 pb-4">
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "#12121a",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <LiveBadge />
                        <span
                          className="text-xs font-medium"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {selectedChannel.currentShow.startTime} —{" "}
                          {selectedChannel.currentShow.endTime}
                        </span>
                      </div>
                      <h3
                        className="font-display font-bold text-xl text-white mb-2"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {selectedChannel.currentShow.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {selectedChannel.currentShow.description}
                      </p>
                    </div>

                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${selectedChannel.color}20` }}
                    >
                      {selectedChannel.emoji}
                    </div>
                  </div>

                  <div className="mb-4">
                    <ProgressBar progress={liveProgress} />
                    <div className="flex justify-between mt-1.5">
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {selectedChannel.currentShow.startTime}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        {selectedChannel.currentShow.endTime}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <ChevronRight
                      size={16}
                      style={{ color: "#f6932a" }}
                      className="flex-shrink-0"
                    />
                    <div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: "#f6932a" }}
                      >
                        NEXT UP
                      </span>
                      <p className="text-sm font-semibold text-white">
                        {selectedChannel.nextShow.title}
                      </p>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {selectedChannel.nextShow.startTime} —{" "}
                        {selectedChannel.nextShow.endTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* EPG Strip */}
              <div className="px-4 md:px-6 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Tv size={15} style={{ color: "#e53e3e" }} />
                    Program Guide
                  </h4>
                  <button
                    type="button"
                    data-ocid="guide.tab"
                    onClick={() => setActiveView("guide")}
                    className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <LayoutGrid size={12} />
                    Full 24H Guide
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {selectedChannel.epg.map((show, idx) => {
                    const isCurrent =
                      show.title === selectedChannel.currentShow.title;
                    return (
                      <motion.div
                        key={show.startTime}
                        data-ocid={`epg.item.${idx + 1}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.06 }}
                        className="flex-shrink-0 w-44 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: isCurrent
                            ? "rgba(229,62,62,0.15)"
                            : "#1a1a25",
                          border: isCurrent
                            ? "1px solid rgba(229,62,62,0.4)"
                            : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-xs font-mono font-medium"
                            style={{
                              color: isCurrent
                                ? "#e53e3e"
                                : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {show.startTime}
                          </span>
                          {isCurrent && (
                            <LiveBadge className="text-[10px] px-1.5 py-0" />
                          )}
                        </div>
                        <p
                          className="text-xs font-semibold leading-snug"
                          style={{
                            color: isCurrent
                              ? "white"
                              : "rgba(255,255,255,0.7)",
                          }}
                        >
                          {show.title}
                        </p>
                        <span
                          className="text-xs mt-1 block"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {show.endTime}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom channel strip — only in player view */}
      {activeView === "player" && (
        <div
          className="md:hidden flex gap-3 overflow-x-auto p-3"
          style={{
            background: "#12121a",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex gap-2">
            {CHANNELS.map((channel, idx) => {
              const isActive = channel.id === selectedChannel.id;
              return (
                <button
                  type="button"
                  key={channel.id}
                  data-ocid={`channel.item.${idx + 1}`}
                  onClick={() => setSelectedChannel(channel)}
                  className="flex-shrink-0 flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200"
                  style={{
                    background: isActive
                      ? "rgba(229,62,62,0.15)"
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? "1px solid rgba(229,62,62,0.35)"
                      : "1px solid transparent",
                    minWidth: "60px",
                  }}
                >
                  <span className="text-xl">{channel.emoji}</span>
                  <span
                    className="text-[10px] font-medium text-center leading-tight"
                    style={{
                      color: isActive ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {channel.name.replace("Saaho ", "")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <footer
        className="py-3 px-6 text-center text-xs"
        style={{
          background: "#0a0a0f",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        <span className="flex items-center justify-center gap-1">
          <Radio
            size={11}
            className="live-pulse"
            style={{ color: "#e53e3e" }}
          />
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            caffeine.ai
          </a>
        </span>
      </footer>
    </div>
  );
}
