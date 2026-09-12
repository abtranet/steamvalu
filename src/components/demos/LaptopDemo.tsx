"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Hand, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { PLANT_3D_HREF } from "@/components/palm-oil/view";
import { cn } from "@/lib/utils";

type DemoId = "plant" | "compressor";

type LaptopDemoProps = {
  interacting?: boolean;
  onInteractingChange?: (value: boolean) => void;
};

export function LaptopDemo({ interacting = false, onInteractingChange }: LaptopDemoProps) {
  const { language } = useLanguage();
  const french = language === "fr";
  const [selected, setSelected] = useState<DemoId>("plant");
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const frameId = useId();
  const choices = [
    { id: "plant" as const, name: french ? "Huilerie de palme" : "Palm-oil mill", src: "/demo/embed", href: PLANT_3D_HREF },
    { id: "compressor" as const, name: french ? "Compresseur C-02" : "Compressor C-02", src: "/demos/value-stream-twin-demo.html", href: "/demo/compressor" },
  ];
  const demo = choices.find((choice) => choice.id === selected)!;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setLoaded(false);
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} data-laptop-demo className="relative w-full">
      <Image width={1823} height={1120} src="/steam-value/images/macbook-device.png" alt={french ? "Les démos STEAM VALUE dans un ordinateur portable" : "STEAM VALUE demos inside a laptop"} className="pointer-events-none relative z-[2] w-full" />
      <div data-lenis-prevent inert={!interacting} className={cn("absolute inset-[2%_9%_8%_8%] z-[1] overflow-hidden bg-[#050d38]", interacting ? "pointer-events-auto" : "pointer-events-none")}>
        {visible && <iframe key={selected} id={frameId} src={demo.src} title={`${demo.name} — ${french ? "démo interactive sur données simulées" : "interactive demo with simulated data"}`} tabIndex={interacting ? 0 : -1} allow="fullscreen" allowFullScreen onLoad={() => setLoaded(true)} className="absolute inset-0 h-[160%] w-[160%] origin-top-left scale-[0.625] border-0 bg-[#050d38]" />}
        {(!visible || !loaded) && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#050d38] px-4 text-center text-white"><Play className="h-7 w-7 text-[#00c0e8]" aria-hidden="true" /><span className="text-base">{demo.name}</span><span className="text-sm text-[#a5bddb]">{french ? "Chargement de la démo…" : "Loading demo…"}</span></div>}
      </div>
      <div className="pointer-events-auto absolute inset-x-0 top-full z-20 flex flex-col items-center gap-3 pt-4" data-laptop-controls>
        <div role="group" aria-label={french ? "Choisir la démo sur le portable" : "Choose the laptop demo"} className="flex max-w-full flex-wrap justify-center gap-1 rounded-xl border border-white/20 bg-[#0c1b28] p-1">
          {choices.map((choice) => <Button key={choice.id} aria-pressed={selected === choice.id} onClick={() => { if (choice.id !== selected) { setLoaded(false); setSelected(choice.id); } }} className={cn("min-h-11 rounded-lg px-4 text-sm", selected === choice.id ? "bg-[#00c0e8] text-[#062330] hover:bg-[#36d3f2]" : "bg-transparent text-white hover:bg-white/10")}>{choice.name}</Button>)}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {onInteractingChange && <Button aria-pressed={interacting} aria-controls={frameId} onClick={() => onInteractingChange(!interacting)} variant="ghost" className="hidden min-h-11 gap-2 px-3 text-sm text-white hover:bg-white/10 hover:text-white lg:inline-flex">{interacting ? <X size={16} /> : <Hand size={16} />}{interacting ? (french ? "Reprendre la visite" : "Resume the tour") : (french ? "Interagir avec la démo" : "Interact with the demo")}</Button>}
          <Link href={demo.href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[#6ce2f3] underline underline-offset-4 hover:text-white">{french ? "Ouvrir la démo en grand" : "Open full-size demo"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <p className="text-center text-xs text-white/60">{french ? "Données simulées" : "Simulated data"}<span className="lg:hidden"> · {french ? "Ouvrez en grand pour utiliser les commandes" : "Open full size to use the controls"}</span></p>
      </div>
    </div>
  );
}
