"use client";

import { useState, useMemo, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Cpu,
  Droplets,
  Factory,
  Flame,
  Gauge,
  Layers,
  Leaf,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  Thermometer,
  Users,
  Zap,
} from "lucide-react";
import {
  plantMetrics,
  readingFor,
  STAGES,
  statusFor,
  type Scenario,
  type StageId,
} from "./process";
import type { useSimulation } from "./useSimulation";
import styles from "./dashboard.module.css";

export type OperationsDashboardProps = {
  simulation: ReturnType<typeof useSimulation>;
  selected: StageId | null;
  onSelect: (id: StageId) => void;
  onReset: () => void;
  onOpen3d: () => void;
  preview: ReactNode;
};

/* SVG 5-Axis Spider / Radar Chart for Process Utilities */
function UtilityRadar({ values }: { values: number[] }) {
  const size = 130;
  const center = size / 2;
  const radius = 48;
  const numAxes = 5;

  const points = useMemo(() => {
    return values.map((val, i) => {
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const r = (val / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }, [values, radius, center, numAxes]);

  const webPolygons = [1, 0.66, 0.33].map((scale) => {
    return Array.from({ length: numAxes }, (_, i) => {
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const r = radius * scale;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={styles.radarSvg} aria-label="Graphe radar des utilités">
      {/* Background Web */}
      {webPolygons.map((poly, idx) => (
        <polygon
          key={idx}
          points={poly}
          fill="none"
          stroke="rgba(56, 189, 248, 0.18)"
          strokeWidth="1"
        />
      ))}
      {/* Axis Lines */}
      {Array.from({ length: numAxes }).map((_, i) => {
        const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(56, 189, 248, 0.22)"
            strokeWidth="1"
          />
        );
      })}
      {/* Data Polygon */}
      <polygon
        points={points}
        fill="rgba(0, 240, 255, 0.22)"
        stroke="#00f0ff"
        strokeWidth="1.8"
      />
      {/* Vertices */}
      {values.map((val, i) => {
        const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
        const r = (val / 100) * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="#38bdf8"
            stroke="#060d17"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}

/* Multi-line Trend Sparkline Chart */
function QualityTrendChart({ history }: { history: number[] }) {
  const width = 260;
  const height = 55;
  const padding = 6;

  const pointsA = useMemo(() => {
    if (history.length < 2) return "";
    const min = 0.5;
    const max = 3.5;
    return history.map((val, i) => {
      const x = padding + (i / (history.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - min) / (max - min)) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }, [history, width, height, padding]);

  const pointsB = useMemo(() => {
    if (history.length < 2) return "";
    const min = 0.5;
    const max = 3.5;
    return history.map((val, i) => {
      const modulated = Math.max(0.6, val * 0.7 + Math.sin(i) * 0.25);
      const x = padding + (i / (history.length - 1)) * (width - padding * 2);
      const y = height - padding - ((modulated - min) / (max - min)) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }, [history, width, height, padding]);

  return (
    <div className={styles.qualityChartContainer}>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.qualityChartSvg} aria-hidden="true">
        <defs>
          <linearGradient id="chartGradA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Baseline */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.08)" />
        {/* Line 1 (Acidité FFA) */}
        {pointsA && (
          <polyline
            points={pointsA}
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        )}
        {/* Line 2 (Humidité) */}
        {pointsB && (
          <polyline
            points={pointsB}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <div className={styles.chartAxis}>
        <span>POSTE 1</span>
        <span>POSTE 2</span>
        <span>POSTE 3</span>
        <span>POSTE 4</span>
        <span>POSTE 5</span>
        <span>POSTE 6</span>
      </div>
    </div>
  );
}

export function OperationsDashboard({
  simulation,
  selected,
  onSelect,
  onReset,
  onOpen3d,
  preview,
}: OperationsDashboardProps) {
  const { seconds, scenario, acknowledged, dispatch, running, speed, events } = simulation;
  const [activeTab, setActiveTab] = useState<"cockpit" | "overview" | "oer" | "commands" | "ecology">("cockpit");
  const [mapMode, setMapMode] = useState<"3d" | "grid" | "satellite">("3d");

  const metrics = plantMetrics(seconds, scenario);
  const active = STAGES.find(s => s.id === selected) || STAGES[3]; // Default to pressing if unselected
  const status = statusFor(active.id, scenario);
  const reading = readingFor(active, seconds, scenario);

  // Utility values for radar
  const utilityValues = useMemo(() => {
    const steamFactor = scenario === "steam" ? 52 : 90;
    const pressFactor = scenario === "press" ? 64 : 85;
    const clrFactor = scenario === "clarifier" ? 68 : 80;
    return [clrFactor, steamFactor, 75, pressFactor, 98];
  }, [scenario]);

  // Historical sample data for sparklines
  const historySamples = simulation.samples.slice(-20);
  const acidHistory = historySamples.map((s, idx) => {
    const base = scenario === "clarifier" ? 2.8 : 1.7;
    return base + Math.sin((s.seconds + idx) / 3) * 0.3;
  });

  return (
    <div className={styles.dashboard}>
      {/* TOP HUD NAVIGATION BAR */}
      <nav className={styles.hudNav} aria-label="Navigation Cockpit">
        <div className={styles.hudNavLeft}>
          <div className={styles.weatherBadge}>
            <Clock size={12} />
            <span>08:58 · 27°C / 78% HR</span>
          </div>
          <div className={styles.weatherBadge}>
            <Thermometer size={12} />
            <span>ENSOLEILLÉ</span>
          </div>
        </div>

        <div className={styles.hudTabs} role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "overview"}
            className={`${styles.hudTab} ${activeTab === "overview" ? styles.hudTabActive : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Vue d’ensemble
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "oer"}
            className={`${styles.hudTab} ${activeTab === "oer" ? styles.hudTabActive : ""}`}
            onClick={() => setActiveTab("oer")}
          >
            Rendement OER
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "cockpit"}
            className={`${styles.hudTab} ${activeTab === "cockpit" ? styles.hudTabActive : ""}`}
            onClick={() => setActiveTab("cockpit")}
          >
            <Sparkles size={11} />
            Cockpit Opérationnel
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "commands"}
            className={`${styles.hudTab} ${activeTab === "commands" ? styles.hudTabActive : ""}`}
            onClick={() => setActiveTab("commands")}
          >
            Commandes
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "ecology"}
            className={`${styles.hudTab} ${activeTab === "ecology" ? styles.hudTabActive : ""}`}
            onClick={() => setActiveTab("ecology")}
          >
            Énergie & Biomasse
          </button>
        </div>

        <div className={styles.hudNavRight}>
          <div className={`${styles.statusIndicator} ${scenario !== "normal" ? styles.statusIndicatorAlert : ""}`}>
            <span className={styles.pulseDot} />
            <span>{scenario === "normal" ? "SYSTÈME NOMINAL" : "ALERTE ACTIVE"}</span>
          </div>
          <button onClick={onOpen3d} className={styles.open3dAction} title="Basculer vers la vue 3D immersive">
            <Maximize2 size={13} />
            <span>Plein écran 3D</span>
          </button>
        </div>
      </nav>

      {/* TAB 1 & 3: RENDEMENT OER */}
      {activeTab === "oer" && (
        <div className={styles.tabViewWrapper}>
          <div className={styles.tabGrid4Col}>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Rendement OER Global</div>
              <div
                className={styles.miniMetricValue}
                style={{
                  color: scenario === "press" ? "#f43f5e" : "#10b981",
                  fontSize: 26,
                }}
              >
                {scenario === "press" ? "19.8 %" : "22.4 %"}
              </div>
              <div className={styles.miniMetricSub}>
                {scenario === "press" ? "Chute rendement presse (-2.6%)" : "+0.8% vs cible standard"}
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Production Huile Brute (CPO)</div>
              <div className={styles.miniMetricValue} style={{ fontSize: 26 }}>
                {metrics.oil.toFixed(2)} <span style={{ fontSize: 13, color: "var(--cyan)" }}>t/h</span>
              </div>
              <div className={styles.miniMetricSub}>Lot du jour · 2 520 t FFB</div>
            </div>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Extraction Presse Bi-Vis</div>
              <div className={styles.miniMetricValue} style={{ fontSize: 26 }}>
                {scenario === "press" ? "82.4 %" : "94.2 %"}
              </div>
              <div className={styles.miniMetricSub}>
                {scenario === "press" ? "Pression cône anormale" : "Pression cône nominale (65 bar)"}
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Pertes Résiduelles Totales</div>
              <div
                className={styles.miniMetricValue}
                style={{
                  fontSize: 26,
                  color: scenario === "press" ? "#f43f5e" : "#38bdf8",
                }}
              >
                {scenario === "press" ? "3.42 %" : "1.58 %"}
              </div>
              <div className={styles.miniMetricSub}>Norme d&apos;export ISO &lt; 1.8%</div>
            </div>
          </div>

          <div className={styles.tabGrid2Col}>
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.cardTitleBar} />
                  <span>Contrôle Qualité & Huile</span>
                </div>
                <Droplets size={13} color="#38bdf8" />
              </div>
              <QualityTrendChart history={acidHistory} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                <div className={styles.miniMetricBox}>
                  <div className={styles.miniMetricLabel}>Acidité Grasse (FFA)</div>
                  <div
                    className={styles.miniMetricValue}
                    style={{ color: scenario === "clarifier" ? "#f43f5e" : "#fff" }}
                  >
                    {scenario === "clarifier" ? "4.20 %" : "2.10 %"}
                  </div>
                  <div className={styles.miniMetricSub}>Cible max &lt; 3.50%</div>
                </div>
                <div className={styles.miniMetricBox}>
                  <div className={styles.miniMetricLabel}>Humidité Résiduelle</div>
                  <div className={styles.miniMetricValue}>0.18 %</div>
                  <div className={styles.miniMetricSub}>Cible max &lt; 0.20%</div>
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.cardTitleBar} />
                  <span>Rendement par Étape de Procédé</span>
                </div>
                <Activity size={13} color="#38bdf8" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
                {[
                  { name: "1. Stérilisation (Autoclave)", val: 96.2, state: "ok" },
                  { name: "2. Égrappage (Batteur)", val: 98.4, state: "ok" },
                  { name: "3. Malaxeur thermique", val: 94.8, state: "ok" },
                  {
                    name: "4. Pressage bi-vis",
                    val: scenario === "press" ? 82.4 : 94.2,
                    state: scenario === "press" ? "alert" : "ok",
                  },
                  {
                    name: "5. Clarification continue",
                    val: scenario === "clarifier" ? 86.1 : 98.9,
                    state: scenario === "clarifier" ? "alert" : "ok",
                  },
                ].map((item) => (
                  <div key={item.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                      <span style={{ color: "#e2e8f0" }}>{item.name}</span>
                      <strong style={{ color: item.state === "alert" ? "#f43f5e" : "var(--cyan)" }}>
                        {item.val}%
                      </strong>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${item.val}%`,
                          backgroundColor: item.state === "alert" ? "#f43f5e" : "#0284c7",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* TAB 4: COMMANDES & PILOTAGE */}
      {activeTab === "commands" && (
        <div className={styles.tabViewWrapper}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.cardTitleBar} />
                <span>Injecteur de Scénarios Opérationnels</span>
              </div>
              <Sliders size={13} color="#38bdf8" />
            </div>
            <div className={styles.scenarioGrid}>
              {[
                {
                  id: "normal",
                  name: "Scénario Nominal",
                  desc: "Régime continu optimal. Toutes les boucles de régulation sont asservies.",
                },
                {
                  id: "steam",
                  name: "Chute Pression Vapeur",
                  desc: "Perte de charge sur le collecteur HP de la chaudière biomasse.",
                },
                {
                  id: "press",
                  name: "Bourrage Presse Bi-vis",
                  desc: "Surcharge mécanique et montée du couple moteur sur la presse.",
                },
                {
                  id: "clarifier",
                  name: "Dérive Clarification",
                  desc: "Déphasage d'interface huile/boues et envolée de l'acidité FFA.",
                },
              ].map((s) => {
                const isActive = scenario === s.id;
                return (
                  <button
                    key={s.id}
                    className={`${styles.scenarioBtn} ${isActive ? styles.scenarioBtnActive : ""}`}
                    onClick={() => dispatch({ type: "scenario", value: s.id as Scenario })}
                  >
                    <div className={styles.scenarioBtnTitle}>
                      <span>{s.name}</span>
                      {isActive ? (
                        <CheckCircle2 size={13} color="#38bdf8" />
                      ) : (
                        <span style={{ fontSize: 9, opacity: 0.6 }}>Activer</span>
                      )}
                    </div>
                    <div className={styles.scenarioBtnDesc}>{s.desc}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <div className={styles.tabGrid2Col}>
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.cardTitleBar} />
                  <span>Pupitre de Commande & Simulation</span>
                </div>
                <Gauge size={13} color="#38bdf8" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Moteur de simulation :</span>
                  <button
                    className={styles.actionBtnPrimary}
                    style={{ padding: "6px 14px" }}
                    onClick={() => dispatch({ type: "toggle" })}
                  >
                    {running ? <Pause size={13} /> : <Play size={13} />}
                    <span>{running ? "Mettre en pause" : "Démarrer"}</span>
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Vitesse de calcul :</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[0.5, 1, 2, 4].map((v) => (
                      <button
                        key={v}
                        onClick={() => dispatch({ type: "speed", value: v })}
                        style={{
                          padding: "5px 10px",
                          borderRadius: 4,
                          fontSize: 10,
                          fontWeight: 600,
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor: speed === v ? "var(--cyan)" : "var(--border-dim)",
                          background: speed === v ? "rgba(14, 116, 144, 0.4)" : "rgba(10, 22, 38, 0.6)",
                          color: speed === v ? "#fff" : "var(--text-muted)",
                        }}
                      >
                        {v}×
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  {scenario !== "normal" && !acknowledged && (
                    <button
                      className={styles.actionBtnSecondary}
                      style={{ flex: 1 }}
                      onClick={() => dispatch({ type: "acknowledge" })}
                    >
                      <AlertTriangle size={13} color="#f59e0b" />
                      <span>Acquitter l&apos;incident</span>
                    </button>
                  )}
                  <button className={styles.actionBtnSecondary} style={{ flex: 1 }} onClick={onReset}>
                    <RotateCcw size={13} />
                    <span>Réinitialiser les paramètres</span>
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.cardTitleBar} />
                  <span>Journal des Événements & Ordres SCADA</span>
                </div>
                <Activity size={13} color="#38bdf8" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 180, overflowY: "auto" }}>
                {events && events.length > 0 ? (
                  events.slice(0, 6).map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        padding: "7px 10px",
                        background: "rgba(14, 28, 48, 0.5)",
                        border: "1px solid rgba(56, 189, 248, 0.15)",
                        borderRadius: 5,
                        fontSize: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <strong style={{ color: ev.severity === "warning" ? "#f59e0b" : "var(--cyan)" }}>
                          {ev.title}
                        </strong>
                        <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 9 }}>{ev.detail}</p>
                      </div>
                      <span style={{ fontSize: 9, color: "#839bb0" }}>
                        {Math.floor(ev.seconds / 60)}m {Math.floor(ev.seconds % 60)}s
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: 10, color: "var(--text-muted)" }}>Aucun événement enregistré.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* TAB 5: ÉNERGIE & BIOMASSE */}
      {activeTab === "ecology" && (
        <div className={styles.tabViewWrapper}>
          <div className={styles.tabGrid4Col}>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Autoconsommation Biomasse</div>
              <div className={styles.miniMetricValue} style={{ color: "#10b981", fontSize: 26 }}>
                100 %
              </div>
              <div className={styles.miniMetricSub}>Zéro combustible fossile</div>
            </div>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Cogénération Électrique</div>
              <div className={styles.miniMetricValue} style={{ fontSize: 26 }}>
                1 850 <span style={{ fontSize: 13, color: "var(--cyan)" }}>kW</span>
              </div>
              <div className={styles.miniMetricSub}>Autonomie totale du site</div>
            </div>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Émissions CO₂ Évitées</div>
              <div className={styles.miniMetricValue} style={{ fontSize: 26, color: "var(--cyan)" }}>
                -420 <span style={{ fontSize: 13, color: "var(--cyan)" }}>kg/t</span>
              </div>
              <div className={styles.miniMetricSub}>Captage biogaz POME</div>
            </div>
            <div className={styles.card}>
              <div className={styles.miniMetricLabel}>Recyclage Eau Process</div>
              <div className={styles.miniMetricValue} style={{ fontSize: 26 }}>
                82.5 %
              </div>
              <div className={styles.miniMetricSub}>Boucle fermée après décantation</div>
            </div>
          </div>

          <div className={styles.tabGrid2Col}>
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.cardTitleBar} />
                  <span>Bilan Utilités & Énergie (Radar 5 axes)</span>
                </div>
                <Zap size={13} color="#38bdf8" />
              </div>
              <div className={styles.radarContainer}>
                <UtilityRadar values={utilityValues} />
                <div className={styles.radarLegend}>
                  <div className={styles.radarLegendItem}>
                    <span>Eau process</span>
                    <strong>{utilityValues[0]}%</strong>
                  </div>
                  <div className={styles.radarLegendItem}>
                    <span>Vapeur MP</span>
                    <strong>{utilityValues[1]}%</strong>
                  </div>
                  <div className={styles.radarLegendItem}>
                    <span>Biomasse</span>
                    <strong>{utilityValues[2]}%</strong>
                  </div>
                  <div className={styles.radarLegendItem}>
                    <span>Électricité</span>
                    <strong>{utilityValues[3]}%</strong>
                  </div>
                  <div className={styles.radarLegendItem}>
                    <span>Air comprimé</span>
                    <strong>{utilityValues[4]}%</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.cardTitleBar} />
                  <span>Valorisation Circulaire des Sous-Produits</span>
                </div>
                <Leaf size={13} color="#10b981" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
                {[
                  {
                    title: "Fibres & Coques de noix",
                    desc: "Alimentation 100% biomasse de la chaudière haute pression à 25 bar.",
                    metric: "18.5 t/h",
                  },
                  {
                    title: "Rafles vides (EFB)",
                    desc: "Broyage et retour direct en plantation pour paillage nutritif et rétention d'eau.",
                    metric: "22.0 t/h",
                  },
                  {
                    title: "Effluents liquides (POME)",
                    desc: "Bioréacteur anaérobie avec captage de biométhane pour turbines électriques.",
                    metric: "65 m³/h",
                  },
                  {
                    title: "Cendres de chaudière",
                    desc: "Riches en potassium (K₂O), réinjectées comme fertilisant naturel sans chimie.",
                    metric: "1.2 t/h",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "9px 12px",
                      background: "rgba(10, 20, 36, 0.6)",
                      border: "1px solid rgba(32, 67, 104, 0.4)",
                      borderRadius: 6,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: 11, color: "#fff" }}>{item.title}</strong>
                      <p style={{ margin: "2px 0 0", fontSize: 9, color: "var(--text-muted)" }}>
                        {item.desc}
                      </p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--cyan)", marginLeft: 10 }}>
                      {item.metric}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* MAIN 3-COLUMN COCKPIT GRID (VUE D'ENSEMBLE & COCKPIT OPÉRATIONNEL) */}
      {(activeTab === "cockpit" || activeTab === "overview") && (
        <div className={styles.mainGrid}>
        {/* LEFT COLUMN: Data Overview, Ops, Radar, Quality */}
        <aside className={styles.leftColumn} aria-label="Indicateurs généraux">
          {/* CARD 1: DATA OVERVIEW */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.cardTitleBar} />
                <span>Vue Globale Procédé</span>
              </div>
              <Gauge size={13} color="#38bdf8" />
            </div>

            <div className={styles.statRowDual}>
              <div className={styles.miniMetricBox}>
                <div className={styles.miniMetricLabel}>Production FFB</div>
                <div className={styles.miniMetricValue}>
                  {(8620480 + seconds * 12).toLocaleString("fr-FR")}
                </div>
                <div className={styles.miniMetricSub}>kg traités</div>
              </div>
              <div className={styles.miniMetricBox}>
                <div className={styles.miniMetricLabel}>Rendement OER</div>
                <div className={styles.miniMetricValue}>22.4 %</div>
                <div className={styles.miniMetricSub}>+0.8% vs cible</div>
              </div>
            </div>

            <div className={styles.breakdownBox}>
              <div className={styles.breakdownHead}>
                <strong>Lot du jour · 2 520 t</strong>
                <span>EN COURS</span>
              </div>
              <div className={styles.breakdownBars}>
                <div className={styles.barRow}>
                  <span className={styles.barLabel}>Général</span>
                  <div className={styles.barTrack}>
                    <div className={`${styles.barFill} ${styles.barFillGen}`} style={{ width: "76%" }} />
                  </div>
                  <span className={styles.barVal}>1 256</span>
                </div>
                <div className={styles.barRow}>
                  <span className={styles.barLabel}>Important</span>
                  <div className={styles.barTrack}>
                    <div className={`${styles.barFill} ${styles.barFillImp}`} style={{ width: "42%" }} />
                  </div>
                  <span className={styles.barVal}>520</span>
                </div>
                <div className={styles.barRow}>
                  <span className={styles.barLabel}>Critique</span>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${styles.barFillUrg}`}
                      style={{ width: scenario !== "normal" ? "85%" : "12%" }}
                    />
                  </div>
                  <span className={styles.barVal}>{scenario !== "normal" ? "88" : "36"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* CARD 2: TOTAL PROCESS & OPERATORS */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.cardTitleBar} />
                <span>Flux Opérationnels</span>
              </div>
              <Activity size={13} color="#38bdf8" />
            </div>

            <div className={styles.opsGrid}>
              <div className={styles.opsBox}>
                <div className={styles.opsIcon}>
                  <Users size={16} />
                </div>
                <div className={styles.opsData}>
                  <div className={styles.opsNumber}>
                    <span>1 320</span>
                    <span className={styles.opsArrowUp}>↑</span>
                  </div>
                  <span className={styles.opsSub}>Opérateurs</span>
                </div>
              </div>

              <div className={styles.opsBox}>
                <div className={styles.opsIcon}>
                  <Boxes size={16} />
                </div>
                <div className={styles.opsData}>
                  <div className={styles.opsNumber}>
                    <span>2 508</span>
                    <span className={styles.opsArrowDown}>↓</span>
                  </div>
                  <span className={styles.opsSub}>Bennes FFB</span>
                </div>
              </div>
            </div>
          </section>

          {/* CARD 3: ECOSYSTEM & UTILITIES (RADAR SPIDER CHART) */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.cardTitleBar} />
                <span>Bilan Utilités & Énergie</span>
              </div>
              <Zap size={13} color="#38bdf8" />
            </div>

            <div className={styles.radarContainer}>
              <UtilityRadar values={utilityValues} />
              <div className={styles.radarLegend}>
                <div className={styles.radarLegendItem}>
                  <span>Eau process</span>
                  <strong>{utilityValues[0]}%</strong>
                </div>
                <div className={styles.radarLegendItem}>
                  <span>Vapeur MP</span>
                  <strong>{utilityValues[1]}%</strong>
                </div>
                <div className={styles.radarLegendItem}>
                  <span>Biomasse</span>
                  <strong>{utilityValues[2]}%</strong>
                </div>
                <div className={styles.radarLegendItem}>
                  <span>Électricité</span>
                  <strong>{utilityValues[3]}%</strong>
                </div>
                <div className={styles.radarLegendItem}>
                  <span>Air comprimé</span>
                  <strong>{utilityValues[4]}%</strong>
                </div>
              </div>
            </div>
          </section>

          {/* CARD 4: PROCESS QUALITY (LINE CHART) */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.cardTitleBar} />
                <span>Contrôle Qualité & Huile</span>
              </div>
              <Droplets size={13} color="#38bdf8" />
            </div>

            <QualityTrendChart history={acidHistory} />
          </section>
        </aside>

        {/* CENTER COLUMN: Top Pills, Interactive 3D Canvas, Bottom Matrix */}
        <main className={styles.centerColumn} aria-label="Visualisation centrale de l'usine">
          {/* Top Bar above 3D */}
          <div className={styles.centerTopBar}>
            <div className={styles.siteSelector}>
              <Factory size={17} className={styles.siteIcon} />
              <span>Site A · Huilerie de palme</span>
              <ChevronDown size={14} color="#839bb0" />
            </div>

            <div className={styles.topPillMetrics}>
              <div className={styles.topPill}>
                <span className={styles.pillDot} />
                <div className={styles.pillText}>
                  <span>Capacité nominale</span>
                  <strong>{metrics.throughput.toFixed(1)} t/h</strong>
                </div>
              </div>
              <div className={styles.topPill}>
                <span className={styles.pillDot} />
                <div className={styles.pillText}>
                  <span>Pression réseau</span>
                  <strong>{metrics.steam.toFixed(1)} bar</strong>
                </div>
              </div>
              <div className={styles.topPill}>
                <span className={styles.pillDot} />
                <div className={styles.pillText}>
                  <span>Santé globale</span>
                  <strong>{metrics.health} %</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded 3D Viewport Card */}
          <div className={styles.viewportCard}>
            {/* Corner Brackets */}
            <div className={styles.bracketTL} />
            <div className={styles.bracketTR} />
            <div className={styles.bracketBL} />
            <div className={styles.bracketBR} />

            {/* 3D Canvas */}
            <div className={styles.viewport3d}>{preview}</div>

            {/* Left Stage Selectors Stack */}
            <div className={styles.stageThumbnails} role="group" aria-label="Unités de procédé">
              {STAGES.map((st) => {
                const isCur = active.id === st.id;
                const stStat = statusFor(st.id, scenario);
                return (
                  <button
                    key={st.id}
                    className={`${styles.thumbBtn} ${isCur ? styles.thumbBtnActive : ""}`}
                    onClick={() => onSelect(st.id)}
                  >
                    <span className={styles.thumbCode}>{st.code}</span>
                    <span>{st.name}</span>
                    <span
                      className={`${styles.thumbDot} ${
                        stStat === "critical"
                          ? styles.thumbDotCritical
                          : stStat === "warning"
                          ? styles.thumbDotWarning
                          : ""
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Contextual Pin Callout */}
            <div
              className={`${styles.calloutPin} ${
                status !== "normal" ? styles.calloutPinAlert : ""
              }`}
            >
              <div className={styles.calloutTitle}>
                {status === "normal" ? "POINT DE MESURE ACTIF" : "ANOMALIE DÉTECTÉE"}
              </div>
              <div className={styles.calloutName}>
                {active.code} · {active.name}
              </div>
            </div>

            {/* Viewport Bottom Controls */}
            <div className={styles.viewportBottomBar}>
              <div className={styles.mapModes}>
                <button
                  className={`${styles.modeBtn} ${mapMode === "3d" ? styles.modeBtnActive : ""}`}
                  onClick={() => setMapMode("3d")}
                >
                  <Compass size={11} style={{ display: "inline", marginRight: 4 }} />
                  3D MAP
                </button>
                <button
                  className={`${styles.modeBtn} ${mapMode === "grid" ? styles.modeBtnActive : ""}`}
                  onClick={() => setMapMode("grid")}
                >
                  <Layers size={11} style={{ display: "inline", marginRight: 4 }} />
                  GRILLE
                </button>
                <button
                  className={`${styles.modeBtn} ${mapMode === "satellite" ? styles.modeBtnActive : ""}`}
                  onClick={() => setMapMode("satellite")}
                >
                  SATELLITE
                </button>
              </div>

              <button className={styles.open3dAction} onClick={onOpen3d}>
                <Maximize2 size={12} />
                <span>Ouvrir l’explorateur 3D complet</span>
              </button>
            </div>
          </div>

          {/* Bottom Factory Data Matrix */}
          <div className={styles.factoryMatrixGrid}>
            <div className={styles.matrixCard}>
              <div className={styles.matrixGraphic}>
                <Cpu size={24} />
              </div>
              <div className={styles.matrixContent}>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>INDEX D’EXPLOITATION</span>
                  <span className={styles.matrixValue}>560.000</span>
                </div>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>COMMANDE LOT</span>
                  <span className={styles.matrixValue}>1.958.200</span>
                </div>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>DÉBIT FLOTTANT</span>
                  <span className={styles.matrixValue}>{metrics.throughput.toFixed(2)} t/h</span>
                </div>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>PASSAGES VAPEUR</span>
                  <span className={styles.matrixValue}>158.935</span>
                </div>
              </div>
            </div>

            <div className={styles.matrixCard}>
              <div className={styles.matrixGraphic}>
                <Flame size={24} />
              </div>
              <div className={styles.matrixContent}>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>HUILE PRODUITE</span>
                  <span className={styles.matrixValue}>{metrics.oil.toFixed(2)} t/h</span>
                </div>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>EFFICACITÉ GLOBALE</span>
                  <span className={styles.matrixValue}>{metrics.health}.5 %</span>
                </div>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>PRESSION VAPEUR</span>
                  <span className={styles.matrixValue}>{metrics.steam.toFixed(1)} bar</span>
                </div>
                <div className={styles.matrixItem}>
                  <span className={styles.matrixLabel}>TEMPO PROCÉDÉ</span>
                  <span className={styles.matrixValue}>{Math.floor(seconds / 60)}m {seconds % 60}s</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Equipment Diagnostic (Mount, Articulation, End Effector, Upkeep) */}
        <aside className={styles.rightColumn} aria-label="Diagnostic de l'équipement sélectionné">
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.cardTitleBar} />
                <span>Diagnostic Équipement</span>
              </div>
              <ChevronDown size={13} color="#839bb0" />
            </div>

            <div className={styles.equipmentHeader}>
              <span className={styles.equipmentCode}>{active.code}</span>
              <h2 className={styles.equipmentName}>{active.name}</h2>
              <div
                className={`${styles.equipmentStatusBadge} ${
                  status !== "normal" ? styles.statusAlert : ""
                }`}
              >
                {status === "normal" ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                <span>{status === "normal" ? "Fonctionnement Nominal" : "Anomalie Signalée"}</span>
              </div>
            </div>

            {/* Sub-Components Breakdown (Mount, Articulation, End Effector) */}
            <div className={styles.subComponentsList}>
              <div className={styles.subComponentRow}>
                <div className={styles.subComponentName}>
                  <span className={styles.subComponentDot} />
                  <span>Motorisation & Palier (Mount)</span>
                </div>
                <div className={styles.subComponentMeta}>
                  <span className={styles.subComponentStateOk}>État : Normal</span>
                  <span>Maintenance : 3 cycles</span>
                </div>
              </div>

              <div className={styles.subComponentRow}>
                <div className={styles.subComponentName}>
                  <span className={styles.subComponentDot} />
                  <span>Transmission & Organes (Articulation)</span>
                </div>
                <div className={styles.subComponentMeta}>
                  <span className={styles.subComponentStateOk}>État : Normal</span>
                  <span>Maintenance : 1 cycle</span>
                </div>
              </div>

              <div className={styles.subComponentRow}>
                <div className={styles.subComponentName}>
                  <span
                    className={styles.subComponentDot}
                    style={{
                      backgroundColor: status !== "normal" ? "#f43f5e" : "#10b981",
                    }}
                  />
                  <span>Actionneur / Purgeur (End Effector)</span>
                </div>
                <div className={styles.subComponentMeta}>
                  <span
                    className={
                      status !== "normal"
                        ? styles.subComponentStateAlert
                        : styles.subComponentStateOk
                    }
                  >
                    État : {status === "normal" ? "Normal" : "Anormal"}
                  </span>
                  <span>Maintenance : {status !== "normal" ? "Immédiate" : "4 cycles"}</span>
                </div>
              </div>
            </div>

            {/* Upkeep Countdown & Progress Bar */}
            <div className={styles.upkeepBox}>
              <div className={styles.upkeepHeader}>
                <span className={styles.upkeepLabel}>Maintenance Préventive</span>
                <span className={styles.upkeepValue}>256 Jours</span>
              </div>
              <div className={styles.upkeepProgressTrack}>
                <div className={styles.upkeepProgressBar} style={{ width: "28%" }} />
              </div>
              <span className={styles.upkeepNote}>28% du potentiel de révision restant</span>
            </div>

            {/* Primary Telemetry Readout */}
            <div className={styles.telemetryReadout}>
              <div className={styles.telemetryLabel}>{active.metric}</div>
              <div className={styles.telemetryBig}>
                {reading.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}
                <span>{active.unit}</span>
              </div>
              <p style={{ fontSize: 9, color: "#839bb0", margin: 0 }}>
                {active.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className={styles.actionGroup}>
              <button className={styles.actionBtnPrimary} onClick={onOpen3d}>
                <ArrowUpRight size={14} />
                <span>Explorer en 3D immersive</span>
              </button>

              {scenario !== "normal" && !acknowledged && (
                <button
                  className={styles.actionBtnSecondary}
                  onClick={() => dispatch({ type: "acknowledge" })}
                >
                  <AlertTriangle size={13} color="#f59e0b" />
                  <span>Acquitter l’incident</span>
                </button>
              )}

              <button className={styles.actionBtnSecondary} onClick={onReset}>
                <RotateCcw size={13} />
                <span>Réinitialiser les paramètres</span>
              </button>
            </div>
          </section>
        </aside>
      </div>
    )}
    </div>
  );
}
