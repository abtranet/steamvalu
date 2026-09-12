"use client";

import { createContext, memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Grid, Environment, Lightformer } from "@react-three/drei";
import { FactoryCamera } from "./FactoryCamera";
import * as THREE from "three";
import { STAGES, statusFor, type StageId, type Scenario, type ViewPreset } from "./process";

const MotionContext = createContext({ running: true, speed: 1 });
const ScenarioContext = createContext<Scenario>("normal");
// Stable options keep Canvas configuration independent of telemetry renders.
const CAMERA_OPTIONS = { position: [-61, 49, 65] as [number, number, number], fov: 43, near: 0.5, far: 500 };
const GL_OPTIONS = { antialias: true, powerPreference: "high-performance" as const, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 };
const STATUS_COLORS = { normal: "#20bd9b", warning: "#f4ae35", critical: "#f06958" };
function ZoneMarker({ position, stageId, onClick }: { position: [number, number, number]; stageId: StageId; onClick: () => void }) {
  const status = statusFor(stageId, useContext(ScenarioContext));
  return <group position={position} onClick={(event) => { event.stopPropagation(); onClick(); }}><mesh position={[0, 0.7, 0]}><sphereGeometry args={[0.25, 12, 12]} /><meshStandardMaterial color={STATUS_COLORS[status]} emissive={STATUS_COLORS[status]} emissiveIntensity={0.65} /></mesh><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.03, 0.03, 0.6, 8]} /><meshStandardMaterial color="#3c5356" /></mesh></group>;
}
function StudioLighting() {
  return (
    <Environment resolution={256} frames={1} environmentIntensity={0.85}>
      <color attach="background" args={["#344461"]} />
      <Lightformer form="rect" intensity={3} color="#f4f8ff" position={[-12, 18, 8]} scale={[18, 12]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={2} color="#ffffff" position={[16, 8, 4]} scale={[6, 18]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={1.2} color="#53cfff" position={[0, 8, -18]} scale={[20, 5]} target={[0, 0, 0]} />
    </Environment>
  );
}

function VesselEndCap({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1.39, 1.39, 0.16, 64]} />
        <meshStandardMaterial color="#e5eaed" metalness={0.72} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.16, 0.055, 12, 64]} />
        <meshStandardMaterial color="#697580" metalness={0.86} roughness={0.22} />
      </mesh>
      {Array.from({ length: 12 }, (_, index) => {
        const angle = index * Math.PI / 6;
        return <mesh key={index} position={[Math.cos(angle) * 1.27, Math.sin(angle) * 1.27, 0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.11, 6]} />
          <meshStandardMaterial color="#798591" metalness={0.85} roughness={0.25} />
        </mesh>;
      })}
      <mesh position={[0, 0, 0.17]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.35, 0.045, 10, 32]} />
        <meshStandardMaterial color="#273641" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.17]}><boxGeometry args={[0.68, 0.05, 0.06]} /><meshStandardMaterial color="#7c8c98" metalness={0.8} roughness={0.23} /></mesh>
    </group>
  );
}

function FruitBunch({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0.3, 0.5, 0]} castShadow>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial color="#49261d" roughness={0.88} />
      </mesh>
      <mesh position={[0.18, 0.15, 0.15]} castShadow><sphereGeometry args={[0.16, 10, 10]} /><meshStandardMaterial color="#8c3f24" roughness={0.82} /></mesh>
      <mesh position={[-0.22, -0.04, 0.08]} castShadow><sphereGeometry args={[0.15, 10, 10]} /><meshStandardMaterial color="#71321f" roughness={0.82} /></mesh>
    </group>
  );
}

function StudioFloor({ theme }: { theme?: "light" | "blue" }) {
  return (
    <mesh position={[0, -0.62, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[180, 180]} />
      <meshStandardMaterial color={theme === "blue" ? "#0a2069" : "#d8d6d0"} roughness={0.62} metalness={theme === "blue" ? 0.22 : 0.02} />
    </mesh>
  );
}

function IndustrialPipe({ points, radius = 0.24, color = '#b8bec0' }: { points: [number, number, number][]; radius?: number; color?: string }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    'centripetal',
  ), [points]);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 64, radius, 20, false]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.18} />
      </mesh>
      {points.slice(1, -1).map(([x, y, z], index) => (
        <mesh key={`${x}-${y}-${z}-${index}`} position={[x, y, z]} castShadow>
          <sphereGeometry args={[radius * 1.16, 16, 12]} />
          <meshStandardMaterial color="#899093" metalness={0.82} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function ProcessColumn({ position, height = 17, radius = 1.35, accent = '#d28d28' }: { position: [number, number, number]; height?: number; radius?: number; accent?: string }) {
  const platformLevels = [0.28, 0.58, 0.84];
  const railPosts = Array.from({ length: 8 }, (_, index) => (index / 8) * Math.PI * 2);
  const ladderRungs = Array.from({ length: 13 }, (_, index) => index * 0.88 + 1.2);
  const shellBands = Array.from({ length: Math.max(3, Math.floor(height / 2.2)) }, (_, index) => 1.05 + index * 2.2);

  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 64]} />
        <meshStandardMaterial color="#e1e6e9" metalness={0.88} roughness={0.21} />
      </mesh>
      <mesh position={[0, height, 0]} castShadow>
        <sphereGeometry args={[radius, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#edf0f2" metalness={0.9} roughness={0.18} />
      </mesh>
      {shellBands.map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius + 0.035, 0.045, 8, 40]} />
          <meshStandardMaterial color="#7f8789" metalness={0.82} roughness={0.28} />
        </mesh>
      ))}
      <group position={[0, height * 0.16, radius + 0.02]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.08, 24]} />
          <meshStandardMaterial color="#667073" metalness={0.78} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.27, 0.025, 8, 24]} />
          <meshStandardMaterial color="#d28d28" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      {platformLevels.map((ratio) => {
        const y = height * ratio;
        return (
          <group key={ratio} position={[0, y, 0]}>
            <mesh>
              <cylinderGeometry args={[radius + 0.28, radius + 0.28, 0.18, 40]} />
              <meshStandardMaterial color="#30393a" metalness={0.75} roughness={0.35} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius + 0.62, 0.045, 8, 40]} />
              <meshStandardMaterial color={accent} metalness={0.75} roughness={0.28} />
            </mesh>
            {railPosts.map((angle) => (
              <mesh key={angle} position={[Math.cos(angle) * (radius + 0.62), 0.5, Math.sin(angle) * (radius + 0.62)]}>
                <cylinderGeometry args={[0.036, 0.036, 0.95, 8]} />
                <meshStandardMaterial color={accent} metalness={0.75} roughness={0.28} />
              </mesh>
            ))}
          </group>
        );
      })}
      <group position={[radius + 0.45, 0, 0]}>
        <mesh position={[-0.26, height * 0.42, 0]}><cylinderGeometry args={[0.035, 0.035, height * 0.84, 8]} /><meshStandardMaterial color="#343c3d" metalness={0.7} roughness={0.3} /></mesh>
        <mesh position={[0.26, height * 0.42, 0]}><cylinderGeometry args={[0.035, 0.035, height * 0.84, 8]} /><meshStandardMaterial color="#343c3d" metalness={0.7} roughness={0.3} /></mesh>
        {ladderRungs.map((y) => <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.025, 0.025, 0.52, 8]} /><meshStandardMaterial color="#343c3d" metalness={0.7} roughness={0.3} /></mesh>)}
      </group>
    </group>
  );
}

function VesselSaddles({ position }: { position: [number, number, number] }) {
  const supportStations = [-2.35, 2.35];
  return (
    <group position={position}>
      {supportStations.map((z) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[0, 0.14, 0]} receiveShadow>
            <boxGeometry args={[2.7, 0.28, 0.92]} />
            <meshStandardMaterial color="#7b817f" roughness={0.76} />
          </mesh>
          {[-0.92, 0.92].map((x) => (
            <group key={x} position={[x, 0.9, 0]}>
              <mesh castShadow><boxGeometry args={[0.2, 1.5, 0.28]} /><meshStandardMaterial color="#3d4c5c" metalness={0.72} roughness={0.3} /></mesh>
              <mesh position={[x > 0 ? -0.3 : 0.3, -0.04, 0]} rotation={[0, 0, x > 0 ? -0.58 : 0.58]}><boxGeometry args={[0.12, 1.15, 0.2]} /><meshStandardMaterial color="#3d4c5c" metalness={0.72} roughness={0.3} /></mesh>
            </group>
          ))}
          <mesh position={[0, 1.58, 0]} castShadow>
            <boxGeometry args={[2.35, 0.18, 0.42]} />
            <meshStandardMaterial color="#3d4c5c" metalness={0.72} roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.2, 0]} rotation={[0, 0, Math.PI]} castShadow>
            <torusGeometry args={[1.27, 0.09, 8, 28, Math.PI]} />
            <meshStandardMaterial color="#c58a32" metalness={0.75} roughness={0.28} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ConveyorMechanics({ length }: { length: number }) {
  return (
    <group>
      <group>
        {[-length / 2 + 0.32, length / 2 - 0.32].map((x) => (
          <mesh key={x} position={[x, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.52, 0.52, 1.25, 20]} />
            <meshStandardMaterial color="#7c8585" metalness={0.88} roughness={0.2} />
          </mesh>
        ))}
      </group>
      {[-length / 2 + 1, 0, length / 2 - 1].map((x) => (
        <group key={x} position={[x, -0.62, 0]}>
          <mesh position={[0, 0, -0.53]} castShadow><boxGeometry args={[0.13, 1.28, 0.13]} /><meshStandardMaterial color="#3c4b59" metalness={0.7} roughness={0.32} /></mesh>
          <mesh position={[0, 0, 0.53]} castShadow><boxGeometry args={[0.13, 1.28, 0.13]} /><meshStandardMaterial color="#3c4b59" metalness={0.7} roughness={0.32} /></mesh>
          <mesh position={[0, -0.59, 0]} castShadow><boxGeometry args={[0.8, 0.12, 1.3]} /><meshStandardMaterial color="#3c4b59" metalness={0.7} roughness={0.32} /></mesh>
        </group>
      ))}
      <group position={[length / 2 - 0.22, -0.08, -0.92]}>
        <mesh castShadow><boxGeometry args={[0.72, 0.62, 0.56]} /><meshStandardMaterial color="#33484a" metalness={0.72} roughness={0.29} /></mesh>
        <mesh position={[0.43, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.2, 0.2, 0.34, 16]} /><meshStandardMaterial color="#939b9b" metalness={0.85} roughness={0.2} /></mesh>
      </group>
    </group>
  );
}

function SteelFrame({ position, width, height, depth }: { position: [number, number, number]; width: number; height: number; depth: number }) {
  const posts: [number, number][] = [[-width / 2, -depth / 2], [width / 2, -depth / 2], [-width / 2, depth / 2], [width / 2, depth / 2]];
  return (
    <group position={position}>
      {posts.map(([x, z]) => <mesh key={`${x}-${z}`} position={[x, height / 2, z]} castShadow><boxGeometry args={[0.28, height, 0.28]} /><meshStandardMaterial color="#364758" metalness={0.72} roughness={0.3} /></mesh>)}
      <mesh position={[0, height, -depth / 2]} castShadow><boxGeometry args={[width, 0.25, 0.25]} /><meshStandardMaterial color="#364758" metalness={0.72} roughness={0.3} /></mesh>
      <mesh position={[0, height, depth / 2]} castShadow><boxGeometry args={[width, 0.25, 0.25]} /><meshStandardMaterial color="#364758" metalness={0.72} roughness={0.3} /></mesh>
    </group>
  );
}

function ServiceDeck({ position, width, depth }: { position: [number, number, number]; width: number; depth: number }) {
  const railPosts = [-width / 2 + 0.35, 0, width / 2 - 0.35];
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, 0.18, depth]} />
        <meshStandardMaterial color="#3b4545" metalness={0.78} roughness={0.32} />
      </mesh>
      {[-depth / 2 + 0.14, depth / 2 - 0.14].map((z) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[0, 0.78, 0]}><boxGeometry args={[width, 0.045, 0.045]} /><meshStandardMaterial color="#d28d28" metalness={0.72} roughness={0.3} /></mesh>
          {railPosts.map((x) => <mesh key={x} position={[x, 0.39, 0]}><cylinderGeometry args={[0.034, 0.034, 0.8, 8]} /><meshStandardMaterial color="#d28d28" metalness={0.72} roughness={0.3} /></mesh>)}
        </group>
      ))}
    </group>
  );
}

function AccessStairs({ position, steps = 10, rotation = [0, 0, 0] }: { position: [number, number, number]; steps?: number; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {Array.from({ length: steps }, (_, index) => (
        <mesh key={index} position={[index * 0.34, index * 0.46, 0]} castShadow>
          <boxGeometry args={[0.38, 0.1, 1.05]} />
          <meshStandardMaterial color="#596766" metalness={0.72} roughness={0.34} />
        </mesh>
      ))}
      {[-0.58, 0.58].map((z) => (
        <mesh key={z} position={[1.7, 2.62, z]} rotation={[0, 0, -0.94]}>
          <cylinderGeometry args={[0.03, 0.03, 5.75, 8]} />
          <meshStandardMaterial color="#d28d28" metalness={0.72} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function MovingConveyorLoad({ length }: { length: number }) {
  const fruitRunRef = useRef<THREE.Group>(null);
  const slatRunRef = useRef<THREE.Group>(null);

  const motion = useContext(MotionContext);
  useFrame((_, delta) => {
    if (!motion.running) return;
    delta = Math.min(delta, 0.05) * motion.speed;
    if (fruitRunRef.current) {
      fruitRunRef.current.position.x += delta * 0.78;
      if (fruitRunRef.current.position.x >= 0.86) fruitRunRef.current.position.x -= 0.86;
    }
    if (slatRunRef.current) {
      slatRunRef.current.position.x += delta * 0.78;
      if (slatRunRef.current.position.x >= 1.1) slatRunRef.current.position.x -= 1.1;
    }
  });

  return (
    <>
      <group ref={slatRunRef}>
        {Array.from({ length: Math.floor(length / 1.1) + 1 }, (_, index) => (
          <mesh key={index} position={[-length / 2 - 0.55 + index * 1.1, 0.27, 0]}>
            <boxGeometry args={[0.1, 0.14, 1.2]} />
            <meshStandardMaterial color="#a8aaa5" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
      <group ref={fruitRunRef}>
        {Array.from({ length: Math.floor(length * 1.15) + 1 }, (_, index) => (
          <FruitBunch key={index} position={[-length / 2 - 0.31 + index * 0.86, 0.58, index % 2 ? 0.22 : -0.2]} scale={0.65} />
        ))}
      </group>
    </>
  );
}

function ScraperConveyor({ position, length, rotation = [0, 0, 0] }: { position: [number, number, number]; length: number; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.35, 1.45]} />
        <meshStandardMaterial color="#364647" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.45, -0.73]}><boxGeometry args={[length, 0.42, 0.1]} /><meshStandardMaterial color="#242c2d" metalness={0.82} roughness={0.24} /></mesh>
      <mesh position={[0, 0.45, 0.73]}><boxGeometry args={[length, 0.42, 0.1]} /><meshStandardMaterial color="#242c2d" metalness={0.82} roughness={0.24} /></mesh>
      <ConveyorMechanics length={length} />
      <MovingConveyorLoad length={length} />
    </group>
  );
}

const FactoryLayout = memo(function FactoryLayout({ onSelectTwin }: { onSelectTwin: (id: StageId) => void }) {
  // Base materials for factory structures
  const concreteMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#455568', roughness: 0.74, metalness: 0.12 }), []);
  const steelMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d4dde4', metalness: 0.72, roughness: 0.24 }), []);
  const tankMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e4e9eb', metalness: 0.76, roughness: 0.23 }), []);

  useEffect(() => () => { concreteMaterial.dispose(); steelMaterial.dispose(); tankMaterial.dispose(); }, [concreteMaterial, steelMaterial, tankMaterial]);

  return (
    <group>
      {/* FACTORY GROUNDS */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[70, 1, 50]} />
        <primitive attach="material" object={concreteMaterial} />
      </mesh>
      <SiteDetails />

      {/* Palm-oil material flow: FFB reception → sterilisation → threshing → digestion/pressing. */}
      <ScraperConveyor position={[-27.5, 1.2, -8]} length={14} />
      <ScraperConveyor position={[-19, 2.0, -8]} length={3.4} rotation={[0, 0, 0.45]} />
      <ScraperConveyor position={[-16.8, 2.75, -8]} length={4.5} />
      <ScraperConveyor position={[-13, 3.2, -8]} length={3.2} />
      <group position={[-10.6, 3.4, -8]}>
        <mesh castShadow><boxGeometry args={[1.2, 1.8, 2.1]} /><meshStandardMaterial color="#ccdce8" metalness={0.4} roughness={0.4} /></mesh>
        <mesh position={[0, 0.15, 1.08]}><boxGeometry args={[0.75, 0.7, 0.08]} /><meshStandardMaterial color="#183c3c" /></mesh>
        <FruitBunch position={[0.15, 0.55, 1.25]} scale={0.72} />
      </group>
      <ScraperConveyor position={[-8.2, 4.4, -8]} length={5} rotation={[0, 0, 0.5]} />
      <ScraperConveyor position={[-1, 5.6, -8]} length={10} />
      
      {/* ZONE 1: STERILIZATION (Autoclaves) */}
      <group position={[-17, 0, -8]} onClick={(event) => { event.stopPropagation(); onSelectTwin("sterilization"); }}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow><boxGeometry args={[10, 0.7, 11]} /><primitive attach="material" object={concreteMaterial} /></mesh>
        {/* Horizontal fruit cages feeding the tall steriliser */}
        <mesh position={[-2.3, 2.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[1.35, 1.35, 7.6, 64]} /><primitive attach="material" object={tankMaterial} /></mesh>
        <mesh position={[2.3, 2.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[1.35, 1.35, 7.6, 64]} /><primitive attach="material" object={tankMaterial} /></mesh>
        <VesselSaddles position={[-2.3, 0, 0]} /><VesselEndCap position={[-2.3, 2.2, 3.86]} />
        <VesselSaddles position={[2.3, 0, 0]} /><VesselEndCap position={[2.3, 2.2, 3.86]} />
        <mesh position={[-2.3, 2.2, 3.83]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.12, 0.1, 10, 32]} /><meshStandardMaterial color="#d7e6df" metalness={0.8} roughness={0.25} /></mesh>
        <mesh position={[2.3, 2.2, 3.83]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.12, 0.1, 10, 32]} /><meshStandardMaterial color="#d7e6df" metalness={0.8} roughness={0.25} /></mesh>
        <SteelFrame position={[0, 0.7, -3.4]} width={6.8} height={9.6} depth={4.2} />
        <ProcessColumn position={[0, 0, -3.4]} height={10.2} radius={1.75} />
        <ServiceDeck position={[0, 5.05, -3.4]} width={6.5} depth={4.05} />
        <AccessStairs position={[3.35, 0.7, -1.1]} rotation={[0, Math.PI / 2, 0]} />
        <IndustrialPipe points={[[-2.3, 3.5, 0], [-2.3, 4.3, -0.9], [-1.75, 4.3, -3.4]]} radius={0.2} />
        <IndustrialPipe points={[[2.3, 3.5, 0], [2.3, 4.7, -1], [1.75, 4.7, -3.4]]} radius={0.2} />
        <ZoneMarker position={[0, 10.8, -3.4]} stageId='sterilization' onClick={() => onSelectTwin('sterilization')} />
      </group>

      {/* ZONE 2: PRESSING (Extraction) */}
      <group position={[5, 0, -8]} onClick={(event) => { event.stopPropagation(); onSelectTwin("pressing"); }}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow><boxGeometry args={[10, 0.76, 10]} /><primitive attach="material" object={concreteMaterial} /></mesh>
        <SteelFrame position={[0, 0.76, 0]} width={9.2} height={7.4} depth={8.8} />
        {/* Digesters & Presses */}
        <mesh position={[-2, 3.4, 0]} castShadow>
          <cylinderGeometry args={[1.5, 1.5, 5.2, 32]} />
          <primitive attach="material" object={tankMaterial} />
        </mesh>
        <mesh position={[2, 3.4, 0]} castShadow>
          <cylinderGeometry args={[1.5, 1.5, 5.2, 32]} />
          <primitive attach="material" object={tankMaterial} />
        </mesh>
        <IndustrialPipe points={[[-2, 6.1, 0], [-2, 7.2, 0], [2, 7.2, 0], [2, 6.1, 0]]} radius={0.22} />
        <ZoneMarker position={[0, 7.4, 0]} stageId='pressing' onClick={() => onSelectTwin('pressing')} />
      </group>

      {/* ZONE 3: CLARIFICATION (Tanks) */}
      <group position={[24, 0, -8]} onClick={(event) => { event.stopPropagation(); onSelectTwin("clarification"); }}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[12, 0.8, 10]} />
          <primitive attach="material" object={concreteMaterial} />
        </mesh>
        {/* Vertical Clarifier Tanks */}
        <mesh position={[-3, 4, -2]} castShadow>
          <cylinderGeometry args={[2, 2, 8, 32]} />
          <primitive attach="material" object={tankMaterial} />
        </mesh>
        <mesh position={[3, 4, -2]} castShadow>
          <cylinderGeometry args={[2, 2, 8, 32]} />
          <primitive attach="material" object={tankMaterial} />
        </mesh>
        <mesh position={[0, 3, 2]} castShadow>
          <cylinderGeometry args={[1.5, 1.5, 6, 32]} />
          <primitive attach="material" object={tankMaterial} />
        </mesh>
        <IndustrialPipe points={[[-3, 8.2, -2], [-3, 9.4, -2], [3, 9.4, -2], [3, 8.2, -2]]} radius={0.25} />
        <ZoneMarker position={[0, 9.6, 0]} stageId='clarification' onClick={() => onSelectTwin('clarification')} />
      </group>

      {/* ZONE 4: BOILER & POWER PLANT */}
      <group position={[14, 0, 14]} onClick={(event) => { event.stopPropagation(); onSelectTwin("boiler"); }}>
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[12, 0.84, 12]} />
          <primitive attach="material" object={steelMaterial} />
        </mesh>
        <SteelFrame position={[0, 0.84, 1]} width={11.2} height={8.6} depth={10.5} />
        <ProcessColumn position={[-1.4, 0.84, -1.8]} height={16.4} radius={1.25} accent="#d28d28" />
        <ServiceDeck position={[-1.4, 7.2, -1.8]} width={4.8} depth={4.2} />
        <AccessStairs position={[1.2, 0.84, 0.1]} rotation={[0, Math.PI / 2, 0]} steps={14} />
        {/* Chimneys */}
        <mesh position={[-3, 12, -3]} castShadow>
          <cylinderGeometry args={[0.8, 1.2, 16, 32]} />
          <primitive attach="material" object={concreteMaterial} />
        </mesh>
        <mesh position={[3, 10, -3]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 12, 32]} />
          <primitive attach="material" object={concreteMaterial} />
        </mesh>
        <IndustrialPipe points={[[-0.15, 11.1, -1.8], [1.1, 11.1, -1.8], [2.2, 10.2, -2.4], [2.22, 10.2, -3]]} radius={0.38} color="#bdc3c4" />
        <IndustrialPipe points={[[-2.2, 8.2, -3], [-1.3, 8.2, -3], [1.6, 8.2, -3], [2.22, 8.2, -3]]} radius={0.24} color="#c38636" />
        <ZoneMarker position={[-1.4, 17.8, -1.8]} stageId='boiler' onClick={() => onSelectTwin('boiler')} />
      </group>

      <FinishingStations onSelect={onSelectTwin} />
      {/* CONNECTING PIPELINES */}
      <IndustrialPipe points={[[-15.25, 7.4, -11.4], [-12, 7.4, -11.4], [-8, 7.4, -9.5], [1.5, 6.1, -8]]} radius={0.34} color="#c1c6c7" />
      <IndustrialPipe points={[[8.5, 6.1, -8], [13, 6.1, -8], [18, 6.1, -9.2], [19, 7.1, -10]]} radius={0.25} color="#b78b43" />
    </group>
  );
});

function SiteDetails() {
  return <group>
    {/* Low perimeter fence leaves the complete production line visible. */}
    {[-24, 24].map(z => <group key={z}>
      {Array.from({ length: 18 }, (_, i) => <mesh key={i} position={[-34 + i * 4, 1.2, z]}><boxGeometry args={[0.13, 2.4, 0.13]} /><meshStandardMaterial color="#536b68" /></mesh>)}
      {[0.6, 1.8].map(y => <mesh key={y} position={[0, y, z]}><boxGeometry args={[68, 0.06, 0.06]} /><meshStandardMaterial color="#536b68" /></mesh>)}
    </group>)}
    {[-33, 33].map(x => <mesh key={x} position={[x, 0.03, 0]}><boxGeometry args={[0.15, 0.05, 46]} /><meshStandardMaterial color="#e3b73c" /></mesh>)}
    {Array.from({ length: 14 }, (_, i) => <mesh key={i} position={[-29 + i * 4.4, 0.03, 3]}><boxGeometry args={[2.2, 0.05, 0.13]} /><meshStandardMaterial color="#f4f1d8" /></mesh>)}
    {[-30, -24, 28].map(x => <group key={x} position={[x, 0, 19]}><mesh position={[0, 1.8, 0]}><cylinderGeometry args={[0.22, 0.36, 3.6, 8]} /><meshStandardMaterial color="#817663" /></mesh>{Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[Math.cos(i) * 1.3, 3.9, Math.sin(i) * 1.3]} rotation={[0.3, i, 0.65]}><sphereGeometry args={[1, 8, 5]} /><meshStandardMaterial color="#668777" /></mesh>)}</group>)}
  </group>;
}

function Drum() {
  const ref = useRef<THREE.Group>(null);
  const motion = useContext(MotionContext);
  useFrame((_, delta) => { if (ref.current && motion.running) ref.current.rotation.x += Math.min(delta, 0.05) * motion.speed * 0.4; });
  return <group ref={ref}>
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[1.5, 1.5, 5.2, 20, 1, true]} /><meshStandardMaterial color="#758f89" metalness={0.6} roughness={0.35} side={THREE.DoubleSide} /></mesh>
    {[-2.5, 0, 2.5].map(x => <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[1.52, 0.11, 8, 24]} /><meshStandardMaterial color="#dfb250" /></mesh>)}
    {Array.from({ length: 10 }, (_, i) => <mesh key={i} position={[0, Math.cos(i * Math.PI / 5) * 1.51, Math.sin(i * Math.PI / 5) * 1.51]}><boxGeometry args={[5.4, 0.07, 0.07]} /><meshStandardMaterial color="#c7d3ce" /></mesh>)}
  </group>;
}

function FinishingStations({ onSelect }: { onSelect: (id: StageId) => void }) {
  return <group>
    <group position={[-28, 0, -8]} onClick={event => { event.stopPropagation(); onSelect('reception'); }}>
      <mesh position={[-2, 2, 0]} castShadow><cylinderGeometry args={[2, 0.8, 2.5, 4]} /><meshStandardMaterial color="#66837c" metalness={0.5} roughness={0.45} /></mesh>
      {Array.from({ length: 15 }, (_, i) => <FruitBunch key={i} position={[-2 + Math.sin(i * 5) * 1.3, 3.2, Math.cos(i * 3) * 1.1]} scale={0.75} />)}
      <ZoneMarker position={[-2, 3.8, 0]} stageId='reception' onClick={() => onSelect('reception')} />
    </group>
    <group position={[-6, 3.4, -8]} onClick={event => { event.stopPropagation(); onSelect('threshing'); }}>
      <Drum /><SteelFrame position={[0, -3.4, 0]} width={5} height={2} depth={3} />
    </group>
    <group position={[5, 1.3, -3]} onClick={event => { event.stopPropagation(); onSelect('pressing'); }}>
      {[-2.2, 2.2].map(x => <group key={x} position={[x, 0, 0]}><mesh rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.6, 0.6, 4, 16]} /><meshStandardMaterial color="#b2bebe" metalness={0.7} roughness={0.3} /></mesh><mesh position={[0, 0, 2.3]}><boxGeometry args={[1.3, 1.4, 1.2]} /><meshStandardMaterial color="#d8e1e8" metalness={0.5} roughness={0.4} /></mesh></group>)}
    </group>
    <group position={[-12, 0, 13]} onClick={event => { event.stopPropagation(); onSelect('storage'); }}>
      {[-4, 4].map(x => <group key={x} position={[x, 0, 0]}><mesh position={[0, 0.2, 0]} receiveShadow><cylinderGeometry args={[3.6, 3.6, 0.4, 32]} /><meshStandardMaterial color="#aeb9b6" /></mesh><mesh position={[0, 3, 0]} castShadow><cylinderGeometry args={[3, 3, 5.6, 64]} /><meshStandardMaterial color="#ccd5d3" metalness={0.55} roughness={0.4} /></mesh><mesh position={[0, 6, 0]} castShadow><coneGeometry args={[3.03, 0.8, 32]} /><meshStandardMaterial color="#a7b8b4" metalness={0.6} roughness={0.3} /></mesh>{[1.5, 4.5].map(y => <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[3.02, 0.045, 6, 32]} /><meshStandardMaterial color="#748c85" /></mesh>)}</group>)}
      <ZoneMarker position={[0, 6, 0]} stageId='storage' onClick={() => onSelect('storage')} />
    </group>
    <IndustrialPipe points={[[24, 3, -4], [24, 3, 5], [-12, 3, 5], [-12, 3, 10]]} radius={0.2} color="#c59845" />
    <IndustrialPipe points={[[14, 8, 12], [10, 8, 10], [-17, 8, 10], [-17, 8, -8]]} radius={0.18} color="#abc5cf" />
  </group>;
}

function Selection({ selected, onSelect, labels }: { selected: StageId | null; onSelect: (id: StageId) => void; labels: boolean }) {
  const scenario = useContext(ScenarioContext);
  return <group>{STAGES.map(stage => <group key={stage.id} position={stage.position}>
    {selected === stage.id && <mesh position={[0, -stage.position[1] + 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[5.4, 5.65, 48]} /><meshBasicMaterial color="#22dfff" transparent opacity={0.85} side={THREE.DoubleSide} /></mesh>}
    {labels && <Html position={[0, stage.id === 'boiler' ? 12 : 8, 0]} center zIndexRange={[20, 0]}><button onClick={() => onSelect(stage.id)} className={`factory-label ${selected === stage.id ? 'factory-label-selected' : ''}`}><span className={`factory-dot factory-dot-${statusFor(stage.id, scenario)}`} />{stage.code}<span className="factory-label-name">{stage.name}</span></button></Html>}
  </group>)}</group>;
}

/** Reports the first painted frame so the viewer can retire its loading state. */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    if (!onReady || frames.current > 1) return;
    frames.current += 1;
    if (frames.current > 1) onReady();
  });
  return null;
}

export type FactorySceneProps = { running: boolean; speed: number; scenario: Scenario; selected: StageId | null; onSelect: (id: StageId) => void; labels: boolean; grid: boolean; preset: ViewPreset; revision: number; focusRevision: number; theme?: "light" | "blue"; onReady?: () => void };
export const FactoryScene = memo(function FactoryScene(props: FactorySceneProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const motion = useMemo(() => ({ running: props.running && !reducedMotion, speed: props.speed }), [props.running, props.speed, reducedMotion]);
  const isBlue = props.theme === "blue";
  return <Canvas shadows="percentage" dpr={[1, 1.5]} camera={CAMERA_OPTIONS} gl={GL_OPTIONS} fallback={<div className="factory-fallback">La vue 3D nécessite WebGL. Les indicateurs et la simulation restent disponibles.</div>}>
    <color attach="background" args={[isBlue ? '#08164e' : '#e5e9e8']} />
    <StudioLighting />
    <fog attach="fog" args={[isBlue ? "#08164e" : "#e5e9e8", 125, 245]} />
    <ambientLight intensity={0.55} />
    <hemisphereLight args={isBlue ? ['#e8f3ff', '#182c67', 1.1] : ['#e4f4ff', '#6b7e70', 2]} />
    <directionalLight position={[-25, 55, 30]} intensity={3.2} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-50} shadow-camera-right={50} shadow-camera-top={45} shadow-camera-bottom={-45} shadow-bias={-0.0003} shadow-normalBias={0.06} shadow-radius={4} />
    <directionalLight position={[35, 20, -20]} intensity={2.2} color="#60bdff" />
    <StudioFloor theme={props.theme} />
    {props.grid && <Grid position={[0, -0.59, 0]} args={[180, 180]} cellSize={2} sectionSize={10} cellColor={isBlue ? '#174284' : '#b9c2be'} sectionColor={isBlue ? '#23569d' : '#a0ada7'} fadeDistance={150} cellThickness={0.5} sectionThickness={0.7} />}
    <MotionContext.Provider value={motion}><ScenarioContext.Provider value={props.scenario}><FactoryLayout onSelectTwin={props.onSelect} /><Selection selected={props.selected} onSelect={props.onSelect} labels={props.labels} /></ScenarioContext.Provider></MotionContext.Provider>
    <FactoryCamera preset={props.preset} revision={props.revision} selected={props.selected} focusRevision={props.focusRevision} />
    <ReadySignal onReady={props.onReady} />
  </Canvas>;
});
