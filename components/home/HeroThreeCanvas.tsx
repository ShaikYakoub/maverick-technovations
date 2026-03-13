"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Particle count and connection config ──────────────────────────────────
const PARTICLE_COUNT = 140;
const CONNECTION_DIST = 2.6;
const SPREAD = 7;

interface ParticleNetworkProps {
  mouseRef: React.MutableRefObject<[number, number]>;
}

function ParticleNetwork({ mouseRef }: ParticleNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { camera } = useThree();

  // ── Generate particle positions (once)
  const { positions, linePositions, lineColors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // distribute in a flat-ish sphere biased toward center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPREAD * Math.cbrt(Math.random()); // cube-root for uniform density
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.45; // flatten Y
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.6;
    }

    // Pre-compute connections
    const linePosArr: number[] = [];
    const lineColArr: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CONNECTION_DIST) {
          linePosArr.push(
            pos[i * 3],
            pos[i * 3 + 1],
            pos[i * 3 + 2],
            pos[j * 3],
            pos[j * 3 + 1],
            pos[j * 3 + 2],
          );
          const alpha = 1 - d / CONNECTION_DIST;
          // orange → red gradient based on x position
          const t = (pos[i * 3] + SPREAD) / (SPREAD * 2);
          const r = 1.0;
          const g = 0.33 * (1 - t);
          const b = 0.0;
          lineColArr.push(r, g, b, alpha, r * 0.9, g * 0.9, b, alpha);
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(linePosArr),
      lineColors: new Float32Array(lineColArr),
    };
  }, []);

  // ── Particle colors
  const particleColors = useMemo(() => {
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // mix orange/red
      const t = Math.random();
      cols[i * 3] = 1.0;
      cols[i * 3 + 1] = 0.33 * (1 - t);
      cols[i * 3 + 2] = 0.0;
    }
    return cols;
  }, []);

  // ── Drift velocities for subtle float animation
  const velocities = useMemo(() => {
    const v = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      v[i * 3] = (Math.random() - 0.5) * 0.004;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return v;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Drift particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Soft bounce at bounds
      if (Math.abs(pos[i * 3]) > SPREAD) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > SPREAD * 0.45) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > SPREAD * 0.6) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Camera tilt follows mouse (subtle)
    const [mx, my] = mouseRef.current;
    camera.position.x += (mx * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (my * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[lineColors, 4]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

interface HeroThreeCanvasProps {
  mouseRef: React.MutableRefObject<[number, number]>;
}

export default function HeroThreeCanvas({ mouseRef }: HeroThreeCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ParticleNetwork mouseRef={mouseRef} />
    </Canvas>
  );
}
