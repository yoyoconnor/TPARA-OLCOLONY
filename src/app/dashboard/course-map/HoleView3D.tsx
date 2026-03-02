"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import type { HoleInfo } from "@/lib/course-data";

const DEFAULT_CAMERA_POS = new THREE.Vector3(45, 35, 45);
const DEFAULT_LOOKAT = new THREE.Vector3(0, 0, 25);
const FLY_DURATION = 0.9; // seconds

/** Fairway strip from tee toward green (along +Z) */
function Fairway({ length }: { length: number }) {
  const width = 28;
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(width / 2, 0);
  shape.lineTo(width / 2, length);
  shape.lineTo(-width / 2, length);
  shape.closePath();
  const geom = new THREE.ShapeGeometry(shape);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, length / 2]} receiveShadow>
      <primitive object={geom} attach="geometry" />
      <meshStandardMaterial color="#2d5a27" roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

function TeeBox() {
  return (
    <group position={[0, 0.15, -4]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[12, 0.3, 6]} />
        <meshStandardMaterial color="#3d6b35" roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}

function Green({ radius = 14 }: { radius?: number }) {
  return (
    <group position={[0, 0.2, 52]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius + 0.5, 0.4, 32]} />
        <meshStandardMaterial color="#1e4d1a" roughness={0.8} metalness={0} />
      </mesh>
    </group>
  );
}

function Water({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[25, 12]} />
      <meshStandardMaterial color="#1a4a6e" transparent opacity={0.85} roughness={0.2} metalness={0.1} />
    </mesh>
  );
}

function Bunker({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[8, 0.4, 4]} />
      <meshStandardMaterial color="#c4a574" roughness={0.95} metalness={0} />
    </mesh>
  );
}

function SceneContent({ hole }: { hole: HoleInfo }) {
  const hasWater = hole.features?.includes("W");
  const hasBunker = hole.features?.includes("B");
  const length = 50 + (hole.yards / 20);

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[20, 30, 20]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-far={150} shadow-camera-left={-40} shadow-camera-right={40} shadow-camera-top={40} shadow-camera-bottom={-40} />
      <Fairway length={length} />
      <TeeBox />
      <Green radius={14} />
      {hasWater && <Water position={[10, 0.01, length * 0.4]} />}
      {hasBunker && <Bunker position={[-12, 0.2, length * 0.35]} />}
      {hasBunker && hole.par >= 4 && <Bunker position={[8, 0.2, length * 0.75]} />}
    </group>
  );
}

/** Animates camera and controls target toward default view when hole changes */
function CameraFly({ holeNumber, onFlyComplete }: { holeNumber: number; onFlyComplete?: () => void }) {
  const { camera, controls } = useThree();
  const prevHole = useRef(holeNumber);
  const startPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const t = useRef(0);
  const flying = useRef(false);

  useEffect(() => {
    if (prevHole.current === holeNumber) return;
    startPos.current.copy(camera.position);
    const ctrl = controls as unknown as { target: THREE.Vector3 };
    if (ctrl?.target) startTarget.current.copy(ctrl.target);
    prevHole.current = holeNumber;
    t.current = 0;
    flying.current = true;
  }, [holeNumber, camera, controls]);

  useFrame((_, delta) => {
    if (!flying.current) return;
    const ctrl = controls as unknown as { target: THREE.Vector3 };
    if (!ctrl?.target) return;

    t.current += delta / FLY_DURATION;
    const s = Math.min(1, t.current);
    const eased = 1 - Math.pow(1 - s, 2); // ease out quad

    camera.position.lerpVectors(startPos.current, DEFAULT_CAMERA_POS, eased);
    ctrl.target.lerpVectors(startTarget.current, DEFAULT_LOOKAT, eased);

    if (s >= 1) {
      flying.current = false;
      onFlyComplete?.();
    }
  });

  return null;
}

function Scene({ hole, onFlyComplete }: { hole: HoleInfo; onFlyComplete?: () => void }) {
  return (
    <>
      <SceneContent hole={hole} />
      <CameraFly holeNumber={hole.number} onFlyComplete={onFlyComplete} />
    </>
  );
}

export default function HoleView3D({
  hole,
  onFlyComplete,
}: {
  hole: HoleInfo;
  onFlyComplete?: () => void;
}) {
  return (
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shadow-xl">
      <Canvas shadows camera={{ position: [45, 35, 45], fov: 45 }} dpr={[1, 2]}>
        <Scene hole={hole} onFlyComplete={onFlyComplete} />
        <OrbitControls enablePan makeDefault minDistance={25} maxDistance={120} />
        <Environment preset="park" />
      </Canvas>
    </div>
  );
}
