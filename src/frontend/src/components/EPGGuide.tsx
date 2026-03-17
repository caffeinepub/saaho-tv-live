import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Channel, Show } from "../data/channels";

const HOUR_WIDTH = 140; // px per hour
const CHANNEL_SIDEBAR_WIDTH = 180; // px
const ROW_HEIGHT = 72; // px
const HEADER_HEIGHT = 40; // px
const TOTAL_HOURS = 24;
const TOTAL_WIDTH = TOTAL_HOURS * HOUR_WIDTH;
const HOURS = Array.from({ length: TOTAL_HOURS }, (_, i) => i);

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getNowMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getShowLeft(startTime: string): number {
  return (timeToMinutes(startTime) / 60) * HOUR_WIDTH;
}

function getShowWidth(startTime: string, endTime: string): number {
  const start = timeToMinutes(startTime);
  const end = endTime === "24:00" ? 1440 : timeToMinutes(endTime);
  return ((end - start) / 60) * HOUR_WIDTH;
}

function isCurrentShow(show: Show): boolean {
  const now = getNowMinutes();
  const start = timeToMinutes(show.startTime);
  const end = show.endTime === "24:00" ? 1440 : timeToMinutes(show.endTime);
  return now >= start && now < end;
}

function isPastShow(show: Show): boolean {
  const now = getNowMinutes();
  const end = show.endTime === "24:00" ? 1440 : timeToMinutes(show.endTime);
  return now >= end;
}

interface EPGGuideProps {
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
}

export function EPGGuide({ channels, onSelectChannel }: EPGGuideProps) {
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const gridScrollRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  // Sync header and grid scrolls
  useEffect(() => {
    const header = headerScrollRef.current;
    const grid = gridScrollRef.current;
    if (!header || !grid) return;

    const onGridScroll = () => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      header.scrollLeft = grid.scrollLeft;
      isSyncing.current = false;
    };
    const onHeaderScroll = () => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      grid.scrollLeft = header.scrollLeft;
      isSyncing.current = false;
    };

    grid.addEventListener("scroll", onGridScroll);
    header.addEventListener("scroll", onHeaderScroll);
    return () => {
      grid.removeEventListener("scroll", onGridScroll);
      header.removeEventListener("scroll", onHeaderScroll);
    };
  }, []);

  // Auto-scroll to current time on mount
  useEffect(() => {
    const grid = gridScrollRef.current;
    if (!grid) return;
    const nowMinutes = getNowMinutes();
    const nowX = (nowMinutes / 60) * HOUR_WIDTH;
    const containerWidth = grid.clientWidth;
    const scrollTarget = Math.max(0, nowX - containerWidth / 2);
    grid.scrollLeft = scrollTarget;
  }, []);

  const nowMinutes = getNowMinutes();
  const nowX = (nowMinutes / 60) * HOUR_WIDTH;

  return (
    <div
      className="flex flex-col"
      style={{ background: "#0a0a0f", height: "100%", overflow: "hidden" }}
    >
      {/* Time header row */}
      <div
        className="flex flex-shrink-0"
        style={{ height: HEADER_HEIGHT, background: "#12121a" }}
      >
        {/* Corner cell */}
        <div
          className="flex-shrink-0 flex items-center px-4"
          style={{
            width: CHANNEL_SIDEBAR_WIDTH,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Channel
          </span>
        </div>

        {/* Scrollable time labels */}
        <div
          ref={headerScrollRef}
          className="flex-1 overflow-x-hidden"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            scrollbarWidth: "none",
          }}
        >
          <div className="relative h-full" style={{ width: TOTAL_WIDTH }}>
            {HOURS.map((hour) => (
              <div
                key={`header-h${hour}`}
                className="absolute top-0 bottom-0 flex items-center"
                style={{
                  left: hour * HOUR_WIDTH,
                  width: HOUR_WIDTH,
                  borderLeft:
                    hour > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <span
                  className="pl-2 text-xs font-mono font-medium select-none"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {String(hour).padStart(2, "0")}:00
                </span>
              </div>
            ))}

            {/* NOW label in header */}
            <div
              className="absolute top-0 bottom-0 flex items-center pointer-events-none"
              style={{ left: nowX }}
            >
              <div
                className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest"
                style={{
                  background: "#e53e3e",
                  color: "white",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                }}
              >
                NOW
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rows area */}
      <div className="flex flex-1" style={{ overflow: "hidden" }}>
        {/* Fixed channel sidebar */}
        <div
          className="flex-shrink-0 overflow-y-auto"
          style={{
            width: CHANNEL_SIDEBAR_WIDTH,
            background: "#12121a",
            borderRight: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {channels.map((channel, idx) => (
            <button
              type="button"
              key={channel.id}
              data-ocid={`guide.channel.item.${idx + 1}`}
              className="w-full flex items-center gap-2.5 px-3 cursor-pointer transition-colors hover:bg-white/5 text-left"
              style={{
                height: ROW_HEIGHT,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                flexShrink: 0,
                background: "transparent",
              }}
              onClick={() => onSelectChannel(channel)}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: `${channel.color}20` }}
              >
                {channel.emoji}
              </div>
              <div className="min-w-0">
                <p
                  className="text-xs font-semibold truncate leading-tight"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {channel.name.replace("Saaho ", "")}
                </p>
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1 live-pulse"
                  style={{ background: channel.color }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Scrollable show grid */}
        <div ref={gridScrollRef} className="flex-1 overflow-auto">
          <div
            style={{
              width: TOTAL_WIDTH,
              position: "relative",
              height: channels.length * ROW_HEIGHT,
            }}
          >
            {/* Vertical hour lines */}
            {HOURS.map((hour) => (
              <div
                key={`grid-h${hour}`}
                className="absolute top-0 bottom-0"
                style={{
                  left: hour * HOUR_WIDTH,
                  width: 1,
                  background: "rgba(255,255,255,0.04)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            ))}

            {/* NOW vertical line */}
            <div
              className="absolute top-0 bottom-0 z-10 pointer-events-none"
              style={{
                left: nowX,
                width: 2,
                background:
                  "linear-gradient(to bottom, #e53e3e, rgba(229,62,62,0.3))",
              }}
            />

            {/* Channel show rows */}
            {channels.map((channel, channelIdx) => (
              <div
                key={channel.id}
                className="absolute left-0 right-0 flex items-stretch"
                style={{
                  top: channelIdx * ROW_HEIGHT,
                  height: ROW_HEIGHT,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {channel.epg24h.map((show, showIdx) => {
                  const left = getShowLeft(show.startTime);
                  const width = getShowWidth(show.startTime, show.endTime);
                  const isCurrent = isCurrentShow(show);
                  const isPast = isPastShow(show);
                  const globalIdx =
                    channels
                      .slice(0, channelIdx)
                      .reduce((acc, c) => acc + c.epg24h.length, 0) +
                    showIdx +
                    1;

                  return (
                    <motion.button
                      type="button"
                      key={`${channel.id}-${show.startTime}`}
                      data-ocid={`guide.show.item.${globalIdx}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(channelIdx * 0.03, 0.2),
                      }}
                      onClick={() => onSelectChannel(channel)}
                      className="absolute top-1 bottom-1 flex flex-col justify-center px-2.5 rounded-md overflow-hidden text-left transition-all duration-150 hover:brightness-125 focus-visible:outline-none"
                      style={{
                        left: left + 1,
                        width: Math.max(width - 2, 2),
                        background: isCurrent
                          ? `${channel.color}40`
                          : isPast
                            ? "rgba(255,255,255,0.03)"
                            : `${channel.color}18`,
                        border: isCurrent
                          ? `1px solid ${channel.color}80`
                          : isPast
                            ? "1px solid rgba(255,255,255,0.06)"
                            : `1px solid ${channel.color}35`,
                        opacity: isPast ? 0.45 : 1,
                        cursor: "pointer",
                        zIndex: isCurrent ? 2 : 1,
                      }}
                    >
                      {width > 60 && (
                        <>
                          <span
                            className="text-[10px] font-mono block leading-none mb-0.5 truncate"
                            style={{
                              color: isCurrent
                                ? channel.color
                                : "rgba(255,255,255,0.35)",
                            }}
                          >
                            {show.startTime}
                          </span>
                          <span
                            className="text-xs font-semibold leading-snug truncate"
                            style={{
                              color: isCurrent
                                ? "white"
                                : isPast
                                  ? "rgba(255,255,255,0.35)"
                                  : "rgba(255,255,255,0.8)",
                            }}
                          >
                            {show.title}
                          </span>
                        </>
                      )}
                      {isCurrent && width > 100 && (
                        <span
                          className="absolute top-1 right-1 text-[8px] font-bold tracking-widest px-1 py-0.5 rounded"
                          style={{
                            background: channel.color,
                            color: "white",
                          }}
                        >
                          LIVE
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
