"use client";

import { useEffect, useReducer } from "react";
import { plantMetrics, readingFor, SCENARIOS, STAGES, type Scenario, type StageId } from "./process";

export type TelemetrySample = {
  seconds: number;
  metrics: ReturnType<typeof plantMetrics>;
  readings: Record<StageId, number>;
};
export type SimulationEvent = { id: number; seconds: number; title: string; detail: string; severity: "info" | "warning" };

function sample(seconds: number, scenario: Scenario): TelemetrySample {
  return {
    seconds,
    metrics: plantMetrics(seconds, scenario),
    readings: Object.fromEntries(STAGES.map(stage => [stage.id, readingFor(stage, seconds, scenario)])) as Record<StageId, number>,
  };
}

function initialState() {
  return {
    running: true, speed: 1, seconds: 0, scenario: "normal" as Scenario, acknowledged: false,
    samples: [sample(0, "normal")],
    events: [{ id: 0, seconds: 0, title: "Simulation démarrée", detail: "Les 7 unités sont en fonctionnement nominal.", severity: "info" } as SimulationEvent],
    nextEventId: 1,
  };
}
type State = ReturnType<typeof initialState>;
type Action = { type: "tick" | "toggle" | "reset" | "acknowledge" } | { type: "speed"; value: number } | { type: "scenario"; value: Scenario };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return initialState();
  if (action.type === "toggle") return { ...state, running: !state.running };
  if (action.type === "speed") return { ...state, speed: action.value };
  if (action.type === "tick") {
    if (!state.running) return state;
    const seconds = state.seconds + state.speed;
    return { ...state, seconds, samples: [...state.samples, sample(seconds, state.scenario)].slice(-120) };
  }
  if (action.type === "scenario") {
    if (action.value === state.scenario) return state;
    const scenario = SCENARIOS.find(item => item.id === action.value)!;
    const event: SimulationEvent = { id: state.nextEventId, seconds: state.seconds, title: scenario.name, detail: scenario.description, severity: action.value === "normal" ? "info" : "warning" };
    return { ...state, scenario: action.value, acknowledged: false, samples: [...state.samples, sample(state.seconds, action.value)].slice(-120), events: [event, ...state.events].slice(0, 20), nextEventId: state.nextEventId + 1 };
  }
  if (action.type === "acknowledge" && state.scenario !== "normal" && !state.acknowledged) {
    const event: SimulationEvent = { id: state.nextEventId, seconds: state.seconds, title: "Alerte acquittée", detail: "Le défaut reste actif jusqu’au rétablissement du scénario nominal.", severity: "info" };
    return { ...state, acknowledged: true, events: [event, ...state.events].slice(0, 20), nextEventId: state.nextEventId + 1 };
  }
  return state;
}

export function useSimulation() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  useEffect(() => {
    if (!state.running) return;
    const timer = window.setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearInterval(timer);
  }, [state.running]);
  return { ...state, dispatch };
}
