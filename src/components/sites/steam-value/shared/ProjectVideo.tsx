"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const VIDEO_BASE = "/steam-value";
export type ProjectVideoClip = "hero-5" | "manage" | "factory" | "warehouse" | "see" | "know";

/** Original device footage shot for the project. */
export function ProjectVideo({ clip = "manage" }: { clip?: ProjectVideoClip }) {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  // Autoplay waits until the page has loaded, so multi-megabyte footage never
  // competes with the first paint; data-saver connections keep the poster.
  const [autoplayReady, setAutoplayReady] = useState(false);
  const poster = clip === "hero-5" ? "hero-5-poster" : `poster-${clip}`;

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    let timer = 0;
    const arm = () => { timer = window.setTimeout(() => setAutoplayReady(true), 1500); };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && (paused === false || (autoplayReady && !motion.matches && paused !== true))) {
        void video.play().catch(() => { /* Keep the poster if autoplay is blocked. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [paused, clip, autoplayReady]);

  return (
    <div className="relative h-full w-full bg-[#101d21]">
      <video
        ref={videoRef}
        src={`${VIDEO_BASE}/videos/${clip}.mp4`}
        poster={`${VIDEO_BASE}/video-posters/${poster}.jpg`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={language === "fr" ? "Démonstration de jumeau numérique industriel" : "Industrial digital twin demonstration"}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={() => setPaused(videoRef.current ? !videoRef.current.paused : false)}
        aria-label={language === "fr" ? (playing ? "Mettre la vidéo en pause" : "Lire la vidéo") : (playing ? "Pause video" : "Play video")}
        className="sv-video-toggle absolute right-[8%] bottom-[5%] z-10 grid min-h-11 min-w-11 place-items-center rounded-full border border-white/30 bg-black/75 p-2 text-sm text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-white"
      >
        {playing ? "Ⅱ" : "▶"}
      </button>
    </div>
  );
}
