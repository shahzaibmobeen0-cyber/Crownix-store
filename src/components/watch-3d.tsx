"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * The Crownix signature element: a procedurally modelled watch (no external
 * GLTF asset, no third-party branding) whose hour/minute hands track the
 * viewer's actual local time — the hero doesn't just show a watch, it keeps
 * one. Built entirely from primitives so it ships with zero binary assets.
 */
function WatchModel() {
  const group = useRef<THREE.Group>(null);
  const hourHand = useRef<THREE.Mesh>(null);
  const minuteHand = useRef<THREE.Mesh>(null);
  const secondHand = useRef<THREE.Mesh>(null);

  const indices = useMemo(() => {
    const arr: { angle: number; major: boolean }[] = [];
    for (let i = 0; i < 60; i++) {
      arr.push({ angle: (i / 60) * Math.PI * 2, major: i % 5 === 0 });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds() + clock.getElapsedTime() % 1;

    if (hourHand.current) hourHand.current.rotation.z = -((h + m / 60) / 12) * Math.PI * 2;
    if (minuteHand.current) minuteHand.current.rotation.z = -((m + s / 60) / 60) * Math.PI * 2;
    if (secondHand.current) secondHand.current.rotation.z = -(s / 60) * Math.PI * 2;

    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.28;
    }
  });

  const gold = new THREE.Color("#C6A664");
  const onyx = new THREE.Color("#0A0A0B");
  const ivory = new THREE.Color("#F6F4EF");

  return (
    <group ref={group} rotation={[0.15, 0, 0]}>
      {/* Case */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.35, 0.34, 64]} />
        <meshStandardMaterial color={gold} metalness={0.95} roughness={0.22} />
      </mesh>

      {/* Bezel ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <torusGeometry args={[1.32, 0.055, 32, 100]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.12} />
      </mesh>

      {/* Crown */}
      <mesh position={[1.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.16, 24]} />
        <meshStandardMaterial color={gold} metalness={0.95} roughness={0.25} />
      </mesh>

      {/* Dial */}
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.12, 64]} />
        <meshStandardMaterial color={onyx} metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Hour markers */}
      {indices.map((idx, i) => {
        const r = 0.96;
        const x = Math.sin(idx.angle) * r;
        const z = -Math.cos(idx.angle) * r;
        return (
          <mesh
            key={i}
            position={[x, 0.19, z]}
            rotation={[Math.PI / 2, 0, -idx.angle]}
          >
            <boxGeometry args={idx.major ? [0.05, 0.14, 0.02] : [0.02, 0.06, 0.015]} />
            <meshStandardMaterial color={idx.major ? gold : ivory} metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}

      {/* Hour hand */}
      <mesh ref={hourHand} position={[0, 0.2, 0]}>
        <boxGeometry args={[0.05, 0.5, 0.02]} />
        <meshStandardMaterial color={ivory} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Minute hand */}
      <mesh ref={minuteHand} position={[0, 0.2, 0]}>
        <boxGeometry args={[0.04, 0.75, 0.02]} />
        <meshStandardMaterial color={ivory} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Second hand */}
      <mesh ref={secondHand} position={[0, 0.21, 0]}>
        <boxGeometry args={[0.015, 0.8, 0.015]} />
        <meshStandardMaterial color={gold} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Center pin */}
      <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.1} />
      </mesh>

      {/* Strap — two tapered bands */}
      {[1, -1].map((dir) => (
        <mesh key={dir} position={[0, -0.17, dir * 1.7]} rotation={[dir * 0.35, 0, 0]}>
          <boxGeometry args={[1.0, 0.28, 1.9]} />
          <meshStandardMaterial color={"#141416"} metalness={0.1} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#C6A664" />
      <Float speed={1.1} floatIntensity={0.6} rotationIntensity={0.15}>
        <WatchModel />
      </Float>
      <ContactShadows position={[0, -1.05, 0]} opacity={0.55} blur={2.4} far={2} />
      <Environment preset="city" />
    </>
  );
}

export default function Watch3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0.6, 4.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
