"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export function FeaturesVideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && userPaused.current !== true && (!motion.matches || userPaused.current === false)) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); motion.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); video.pause(); };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      userPaused.current = false;
      void videoRef.current.play().catch(() => {});
    } else {
      userPaused.current = true;
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {
        // Fallback to video element fullscreen if container fails
        if (videoRef.current && "webkitEnterFullscreen" in videoRef.current) {
          (videoRef.current as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
        }
      });
    }
  };

  return (
    <section className="sv-feature-video relative pt-2 pb-14 lg:pb-20">
      <div className="mx-auto max-w-[1132px] px-4">
        {/* Subtle radial cyan glow behind the player */}
        <div className="relative mx-auto flex flex-col items-center">
          <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-[#00c0e8]/10 blur-[90px]" />

          {/* Main Showcase Player Container */}
          <div
            ref={containerRef}
            className="group relative w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[640px] overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/15 bg-black shadow-[0_20px_60px_-15px_rgba(0,192,232,0.25)] transition-all duration-500 hover:border-[#00c0e8]/40"
          >
            {/* Aspect container for 9:16 vertical video */}
            <div className="relative aspect-[9/16] max-h-[82vh] w-full bg-black">
              <video
                ref={videoRef}
                src="/videos/ceo-video.mp4"
                poster="/images/ceo-video-poster.jpg"
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted={isMuted}
                loop
                playsInline
                className="h-full w-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Gradient overlays for contrast */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

              {/* Top Bar Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00c0e8] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#00c0e8]" />
                  </span>
                  <span className="text-[#00c0e8]">STEAM VALUE™</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/90">Jumeau Numérique Usine</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-md">
                  Télémétrie live
                </div>
              </div>

              {/* Bottom Interactive Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/15 bg-black/75 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
                    className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:scale-105 hover:bg-[#00c0e8] hover:text-black hover:border-transparent"
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                    className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:scale-105 hover:bg-[#00c0e8] hover:text-black hover:border-transparent"
                  >
                    {isMuted ? (
                      <VolumeX className="size-4 text-white/80" />
                    ) : (
                      <Volume2 className="size-4 text-[#00c0e8]" />
                    )}
                  </button>

                  <span className="hidden sm:inline text-xs font-medium text-white/80">
                    {isMuted ? "Audio désactivé" : "Audio actif"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Plein écran"
                    className="flex min-h-11 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white transition hover:scale-105 hover:bg-white/20"
                  >
                    <Maximize2 className="size-3.5 text-[#00c0e8]" />
                    <span>Plein écran</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
