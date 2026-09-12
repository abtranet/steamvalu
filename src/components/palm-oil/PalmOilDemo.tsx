"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Activity, ArrowLeft, ArrowUpRight, Box, ChevronDown, ChevronRight, CircleHelp, Clock3, Crosshair, Droplets, Factory, Flame, Grid2X2, Layers3, Maximize2, Minimize2, MousePointer2, Pause, Play, RotateCcw, Search, Settings2, Tag, TriangleAlert, X } from "lucide-react";
import { plantMetrics, readingFor, SCENARIOS, STAGES, statusFor, type Scenario, type StageId, type ViewPreset } from "./process";
import styles from "./demo.module.css";
import { SteamValueMark } from "@/components/sites/steam-value/shared/icons";
import { ReferenceBoard } from "./ReferenceBoard";
import { useSimulation } from "./useSimulation";
import type { FactorySceneProps } from "./FactoryScene";
import type { DemoView } from "./view";

/** Shown while the 3D chunk downloads and while the first frame is rendered. */
function SceneLoading({ label = "Préparation du jumeau numérique…" }: { label?: string }) {
  return <div className={styles.loading} role="status" aria-live="polite">
    <span className={styles.loadingMark}><SteamValueMark className={styles.loadingMarkSvg} dark /></span>
    <span className={styles.loadingTitle}>{label}</span>
    <small>Usine de transformation d’huile de palme · données simulées</small>
    <span className={styles.loadingBar} aria-hidden="true"><span /></span>
  </div>;
}

const FactoryScene = dynamic(() => import("./FactoryScene").then(module => module.FactoryScene), { ssr: false, loading: () => <SceneLoading /> });

/**
 * WebGL can fail for reasons we cannot fix from here (no hardware acceleration,
 * a lost context, a blocked driver). Say so honestly and offer both a retry and
 * the dashboard, which carries the same data without a GPU.
 */
class SceneBoundary extends Component<{ children: ReactNode; onFallback?: () => void; onFailedChange?: (failed: boolean) => void }, { failed: boolean; attempt: number }> {
  state = { failed: false, attempt: 0 };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailedChange?.(true); }
  retry = () => { this.props.onFailedChange?.(false); this.setState(state => ({ failed: false, attempt: state.attempt + 1 })); };
  render() {
    if (!this.state.failed) return <div key={this.state.attempt} className={styles.sceneMount}>{this.props.children}</div>;
    return <div className={`${styles.loading} ${styles.sceneError}`} role="alert">
      <TriangleAlert size={28} />
      <strong>La vue 3D n’a pas pu démarrer.</strong>
      <span>Votre navigateur n’a pas pu initialiser WebGL. Activez l’accélération graphique, puis réessayez.</span>
      <div className={styles.sceneErrorActions}>
        <button type="button" className={styles.focusButton} onClick={this.retry}><RotateCcw size={14} />Réessayer</button>
        {this.props.onFallback && <button type="button" className={styles.sceneErrorGhost} onClick={this.props.onFallback}><Activity size={14} />Ouvrir le tableau de bord</button>}
      </div>
      <small>Les indicateurs et la simulation restent disponibles.</small>
    </div>;
  }
}
/**
 * Owns the loading veil for one mounted scene: readiness resets naturally when
 * the viewer is left and re-entered, and a scene that never reports a frame
 * (no WebGL, so `useFrame` never runs) uncovers whatever the canvas fell back
 * to rather than spinning forever.
 */
function Scene({ onFallback, ...props }: Omit<FactorySceneProps, "onReady"> & { onFallback?: () => void }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    if (ready || failed) return;
    const timer = window.setTimeout(() => setReady(true), 12000);
    return () => window.clearTimeout(timer);
  }, [ready, failed]);
  return <div className={styles.scene}>
    <SceneBoundary onFailedChange={setFailed} onFallback={onFallback}>
      <FactoryScene {...props} onReady={handleReady} />
    </SceneBoundary>
    {!ready && !failed && <div className={styles.sceneVeil}><SceneLoading /></div>}
  </div>;
}

function Sparkline({ values, warning = false }: { values: number[]; warning?: boolean }) {
  const clean = values.filter((value) => Number.isFinite(value));
  const min = clean.length > 0 ? Math.min(...clean) - 0.4 : 0;
  const range = clean.length > 0 ? Math.max(0.8, Math.max(...clean) - min) : 0.8;
  const points = clean.map((value, i) => `${i * 150 / Math.max(1, clean.length - 1)},${36 - ((value - min) / range) * 28}`).join(" ");
  return <svg viewBox="0 0 150 42" className={warning ? styles.sparkWarning : styles.spark} aria-hidden="true"><path d="M0 36H150" stroke="currentColor" opacity="0.14" />{clean.length > 1 ? <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /> : null}</svg>;
}
const format = (value: number, digits = 1) => value.toLocaleString("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
export function PalmOilDemo({ embedded = false, initialView = "dashboard" }: { embedded?: boolean; initialView?: DemoView }) {
  const simulation = useSimulation();
  const { running, speed, seconds, scenario, acknowledged, dispatch } = simulation;
  // Resolved on the server from `?view=`, so the requested view is the first
  // one painted. Nothing stored locally is allowed to override it.
  const [view, setView] = useState<DemoView>(embedded ? "3d" : initialView);
  const [selected, setSelected] = useState<StageId | null>(null);
  const [labels, setLabels] = useState(true);
  const [grid, setGrid] = useState(true);
  const [preset, setPreset] = useState<ViewPreset>("perspective");
  const [revision, setRevision] = useState(0);
  const [focusRevision, setFocusRevision] = useState(0);
  const [query, setQuery] = useState("");
  const [leftOpen, setLeftOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const shell = useRef<HTMLDivElement>(null);
  const bottomOverlay = useRef<HTMLDivElement>(null);
  const helpDialog = useRef<HTMLElement>(null);
  const helpButton = useRef<HTMLButtonElement>(null);
  const setRunning = () => dispatch({ type: "toggle" });
  const setSpeed = (value: number) => dispatch({ type: "speed", value });
  const setAcknowledged = () => dispatch({ type: "acknowledge" });
  // Keep the address bar in step with the view so a refresh, a share or a back
  // navigation reopens exactly what the visitor was looking at.
  useEffect(() => {
    if (embedded) return;
    const url = new URL(window.location.href);
    const current = url.searchParams.get("view");
    if (current === view) return;
    // Leave a plain /demo URL untouched; only mirror an actual change.
    if (current === null && view === "dashboard") return;
    url.searchParams.set("view", view);
    window.history.replaceState(window.history.state, "", url);
  }, [view, embedded]);

  // The equipment inspector is anchored above the control bar on narrow
  // screens. Measure the bar instead of guessing, so play/speed/scenario,
  // the camera presets and the process strip are never covered.
  useEffect(() => {
    const bar = bottomOverlay.current;
    const root = shell.current;
    if (!bar || !root) return;
    const update = () => root.style.setProperty("--sv-bottom-h", `${Math.ceil(bar.getBoundingClientRect().height)}px`);
    update();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(bar);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      root.style.removeProperty("--sv-bottom-h");
    };
  }, [view, scenario]);

  useEffect(() => {
    const changed = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", changed);
    return () => document.removeEventListener("fullscreenchange", changed);
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setHelpOpen(false); setLeftOpen(false); setSelected(null); }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (!helpOpen) return;
    const trigger = helpButton.current;
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(helpDialog.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? []);
      const first = items[0]; const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", trap);
    return () => { document.removeEventListener("keydown", trap); trigger?.focus(); };
  }, [helpOpen]);
  const metrics = plantMetrics(seconds, scenario);
  const active = STAGES.find(stage => stage.id === selected);
  const affected = STAGES.filter(stage => statusFor(stage.id, scenario) !== "normal");
  const selectStage = useCallback((id: StageId) => { setSelected(id); setLeftOpen(false); }, []);
  const showView = useCallback((next: DemoView) => { setView(next); if (next === "dashboard") setLeftOpen(false); }, []);
  const changeScenario = (value: Scenario) => dispatch({ type: "scenario", value });
  const reset = () => { dispatch({ type: "reset" }); setSelected(null); setFocusRevision(0); setPreset("perspective"); setRevision(r => r + 1); };
  const toggleFullscreen = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await shell.current?.requestFullscreen(); } catch { setHelpOpen(true); }
  };
  const elapsed = `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const history = simulation.samples.slice(-24).map(sample => sample.metrics);
  return <div ref={shell} className={`${styles.shell} ${view === "dashboard" ? styles.dashboardShell : ""}`}>
    <header className={styles.header}>
      {!embedded && <>
      <Link href="/#demos" className={styles.back} aria-label="Retour aux démos" title="Toutes les démos"><ArrowLeft size={17} /></Link>
      <Link href="/" className={styles.brand} aria-label="STEAM VALUE"><span className={styles.brandMark}><SteamValueMark className={styles.brandMarkSvg} dark={true} /></span><span>STEAM VALUE<small>DIGITAL TWIN PLATFORM</small></span></Link>
      <span className={styles.headerDivider} />
      <div className={styles.project}><Factory size={16} /><span>Huilerie de palme <span className={styles.projectSub}>/ Site A</span></span><ChevronDown size={12} /></div>
      </>}
      <div className={styles.viewSwitch} role="group" aria-label="Mode d’affichage">
        <button type="button" aria-pressed={view === "dashboard"} onClick={() => showView("dashboard")}><Activity size={14} />Tableau de bord</button>
        <button type="button" aria-pressed={view === "3d"} onClick={() => showView("3d")}><Box size={14} />Démo 3D</button>
      </div>
      <div className={styles.headerRight}><span className={styles.simBadge}><span />DONNÉES SIMULÉES</span><button ref={helpButton} onClick={() => setHelpOpen(true)} aria-label="Aide et navigation" className={styles.iconButton}><CircleHelp size={18} /></button><button onClick={toggleFullscreen} aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"} className={styles.iconButton}>{fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}</button><span className={styles.avatar}>SV</span></div>
    </header>
    {view === "dashboard" ? <ReferenceBoard
      simulation={simulation}
      selected={selected}
      onSelect={selectStage}
      onReset={reset}
      onOpen3d={() => { showView("3d"); setFocusRevision(value => value + 1); }}
      preview={<SceneBoundary><FactoryScene running={running} speed={speed} scenario={scenario} selected={selected} onSelect={selectStage} labels={false} grid={true} preset="perspective" revision={revision} focusRevision={selected ? 1 : 0} theme="blue" /></SceneBoundary>}
    /> : <div className={styles.workspace}>
      <aside id="plant-explorer" className={`${styles.sidebar} ${leftOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarTitle}><span>EXPLORATEUR DU SITE</span><button className={styles.mobileClose} onClick={() => setLeftOpen(false)} aria-label="Fermer l’explorateur"><X size={16} /></button><Layers3 size={15} className={styles.desktopOnly} /></div>
        <label className={styles.search}><Search size={14} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un équipement" aria-label="Rechercher un équipement" /></label>
        <button className={`${styles.siteRoot} ${!selected ? styles.siteRootActive : ''}`} onClick={() => { setSelected(null); setPreset('perspective'); setRevision(r => r + 1); }}><ChevronDown size={14} /><Factory size={16} /><span>Usine de transformation<small>7 unités de procédé</small></span><span className={styles.dot} /></button>
        <div className={styles.tree}>
          {STAGES.filter(stage => `${stage.name} ${stage.code} ${stage.equipment}`.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr'))).map((stage, index) => <button key={stage.id} className={`${styles.stageRow} ${selected === stage.id ? styles.stageSelected : ''}`} onClick={() => selectStage(stage.id)}><span className={styles.treeLine} /><span className={styles.stageIndex}>{String(index + 1).padStart(2, '0')}</span><span>{stage.name}<small>{stage.code}</small></span><span className={`${styles.dot} ${statusFor(stage.id, scenario) === 'critical' ? styles.critical : statusFor(stage.id, scenario) === 'warning' ? styles.warning : ''}`} /></button>)}
          {query && !STAGES.some(s => `${s.name} ${s.code} ${s.equipment}`.toLowerCase().includes(query.toLowerCase())) && <p className={styles.empty}>Aucun équipement trouvé.</p>}
        </div>
        <div className={styles.sidebarBottom}><span className={styles.eyebrow}>CHAÎNE DE TRANSFORMATION</span><h2>Du régime à l’huile.</h2><p>Un seul environnement pour observer chaque étape du procédé.</p><div className={styles.siteMeta}><span><Box size={13} /> 7 unités</span><span><Activity size={13} /> Simulation locale</span></div></div>
        <Link href="/about" target={embedded ? "_top" : undefined} className={styles.aboutLink}>À propos de STEAM VALUE <ArrowUpRight size={14} /></Link>
      </aside>
      <main className={styles.viewer} aria-label="Jumeau numérique 3D d’une huilerie de palme">
        <Scene onFallback={embedded ? undefined : () => showView("dashboard")} running={running} speed={speed} scenario={scenario} selected={selected} onSelect={selectStage} labels={labels} grid={grid} preset={preset} revision={revision} focusRevision={focusRevision} theme="blue" />
        <div className={styles.topOverlay}>
          <div className={styles.viewHeading}><div><span className={styles.eyebrow}>JUMEAU NUMÉRIQUE INDUSTRIEL</span><h1>Une usine. Une vision complète.</h1></div><span className={styles.liveBadge}><span className={running ? styles.dot : styles.pausedDot} />{running ? 'Simulation active' : 'En pause'}</span></div>
          <div className={styles.kpis}>
            {[{label:'RÉGIMES TRAITÉS',value:format(metrics.throughput),unit:'t/h',icon:Factory,values:history.map(m=>m.throughput),note:'Capacité nominale · 30 t/h'}, {label:'HUILE BRUTE',value:format(metrics.oil),unit:'t/h',icon:Droplets,values:history.map(m=>m.oil),note:'Sortie de clarification'}, {label:'SANTÉ DU SYSTÈME',value:metrics.health,unit:'%',icon:Activity,values:history.map(m=>m.health + Math.sin(history.indexOf(m))),note:scenario==='normal'?'Tous les systèmes nominaux':`${affected.length} unités affectées`}, {label:'PRESSION VAPEUR',value:format(metrics.steam),unit:'bar',icon:Flame,values:history.map(m=>m.steam),note:'Réseau énergie · chaudière'}].map(kpi=><div key={kpi.label} className={styles.kpi}><div className={styles.kpiLabel}>{kpi.label}<kpi.icon size={13} /></div><div className={styles.kpiValue}>{kpi.value}<span>{kpi.unit}</span><Sparkline values={kpi.values} warning={scenario!=='normal'} /></div><small>{kpi.note}</small></div>)}
          </div>
        </div>
        <div className={styles.viewTools}>
          <button className={`${styles.toolButton} ${styles.explorerToggle}`} onClick={() => setLeftOpen(v=>!v)} aria-controls="plant-explorer" aria-expanded={leftOpen} aria-label="Ouvrir l’explorateur"><Layers3 size={18} /></button>
          <button className={styles.toolButton} onClick={() => { setPreset('perspective'); setRevision(r=>r+1); setFocusRevision(0); }} aria-label="Recentrer la vue" title="Recentrer la vue"><Crosshair size={18} /></button>
          <button className={`${styles.toolButton} ${labels?styles.toolActive:''}`} onClick={() => setLabels(v=>!v)} aria-label="Afficher les étiquettes" aria-pressed={labels} title="Étiquettes"><Tag size={18} /></button>
          <button className={`${styles.toolButton} ${grid?styles.toolActive:''}`} onClick={() => setGrid(v=>!v)} aria-label="Afficher la grille" aria-pressed={grid} title="Grille"><Grid2X2 size={18} /></button>
        </div>
        {active && <section className={styles.inspector} aria-label="Détails de l’équipement">
          <div className={styles.inspectorTop}><span className={styles.eyebrow}>ÉQUIPEMENT SÉLECTIONNÉ</span><button onClick={()=>setSelected(null)} aria-label="Fermer les détails"><X size={16} /></button></div>
          <span className={styles.equipmentCode}>{active.code}</span><h2>{active.name}</h2><p>{active.equipment}</p>
          <span className={`${styles.equipmentStatus} ${statusFor(active.id,scenario)!=='normal'?styles.statusAlert:''}`}><span className={styles.dot} />{statusFor(active.id,scenario)==='normal'?'Fonctionnement nominal':statusFor(active.id,scenario)==='warning'?'Impact sur le procédé':'Défaut simulé'}</span>
          <div className={styles.readout}><span>{active.metric}</span><strong>{format(readingFor(active,seconds,scenario))}<small>{active.unit}</small></strong><Sparkline values={Array.from({length:24},(_,i)=>readingFor(active,Math.max(0,seconds-23+i),scenario))} warning={statusFor(active.id,scenario)!=='normal'} /></div>
          <p className={styles.description}>{active.description}</p><button className={styles.focusButton} onClick={()=>setFocusRevision(v=>v+1)}><Crosshair size={14} />Centrer sur l’équipement</button>
        </section>}
        {!active && <div className={styles.sceneCaption}><span className={styles.captionRule} /><span>HUILERIE DE PALME<small>Vue composée · Site A</small></span></div>}
        <div ref={bottomOverlay} className={styles.bottomOverlay}>
          {scenario!=='normal' && <div className={`${styles.alarm} ${acknowledged?styles.alarmAcknowledged:''}`} role="status"><TriangleAlert size={18} /><div><strong>{SCENARIOS.find(s=>s.id===scenario)?.name}</strong><span>{SCENARIOS.find(s=>s.id===scenario)?.description}</span></div><button onClick={setAcknowledged} disabled={acknowledged}>{acknowledged?'Acquittée':'Acquitter'}</button><button onClick={()=>changeScenario('normal')} aria-label="Rétablir le fonctionnement nominal"><RotateCcw size={15} /></button></div>}
          <div className={styles.controls}>
            <div className={styles.playControls}><button className={styles.playButton} onClick={setRunning} aria-label={running?'Mettre en pause':'Reprendre la simulation'}>{running?<Pause size={16} fill="currentColor" />:<Play size={16} fill="currentColor" />}</button><button className={styles.resetButton} onClick={reset} aria-label="Réinitialiser la simulation" title="Réinitialiser"><RotateCcw size={16} /></button><span className={styles.timer}>{elapsed}</span><select aria-label="Vitesse de simulation" value={speed} onChange={e=>setSpeed(Number(e.target.value))}>{[0.5,1,2,4].map(s=><option key={s} value={s}>{s}×</option>)}</select></div>
            <div className={styles.cameraPresets} aria-label="Angles de caméra">{([['perspective','Perspective'],['top','Vue du dessus'],['front','Vue de face']] as const).map(([id,label])=><button key={id} aria-pressed={preset===id} className={preset===id?styles.presetActive:''} onClick={()=>{setPreset(id);setRevision(r=>r+1);setFocusRevision(0);}}>{label}</button>)}</div>
            <label className={styles.scenarioSelect}><Settings2 size={15} /><select aria-label="Scénario de simulation" value={scenario} onChange={e=>changeScenario(e.target.value as Scenario)}>{SCENARIOS.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
          </div>
          <div className={styles.processStrip}>{STAGES.filter(s=>s.id!=='boiler').map((stage,index)=><button key={stage.id} onClick={()=>selectStage(stage.id)} className={selected===stage.id?styles.processActive:''}><span>{String(index+1).padStart(2,'0')}</span>{stage.name}<ChevronRight size={13} /></button>)}</div>
        </div>
      </main>
    </div>}
    <footer className={styles.statusbar}><span><span className={styles.dot} />STEAM VALUE™ <span className={styles.muted}>/ Démonstrateur industriel</span></span><span className={styles.navigationHint}><MousePointer2 size={12} /> Glisser pour orbiter <span>·</span> Molette pour zoomer <span>·</span> Clic droit pour déplacer</span><span><Clock3 size={12} /> Simulation locale <span className={styles.muted}>· aucune donnée de production</span></span></footer>
    {helpOpen && <div className={styles.modalBackdrop} onClick={()=>setHelpOpen(false)}><section ref={helpDialog} role="dialog" aria-modal="true" aria-labelledby="help-title" className={styles.help} onClick={e=>e.stopPropagation()}><button autoFocus className={styles.helpClose} onClick={()=>setHelpOpen(false)} aria-label="Fermer l’aide"><X size={18} /></button><Box size={30} /><h2 id="help-title">Explorez votre usine.</h2><p>Glissez sur le modèle pour tourner autour de l’usine. Utilisez la molette ou pincez l’écran pour zoomer. Le clic droit déplace la vue.</p><p>Sélectionnez un équipement dans le modèle ou l’explorateur pour lire ses indicateurs. Choisissez un scénario pour observer ses effets sur la ligne.</p><div>Modèle de démonstration représentatif. Toutes les valeurs sont simulées ; elles ne constituent pas des consignes de conduite d’une usine réelle.</div><button className={styles.focusButton} onClick={()=>setHelpOpen(false)}>Commencer l’exploration <ArrowUpRight size={15} /></button></section></div>}
  </div>;
}
