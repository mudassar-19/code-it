"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Instance, Instances, type PositionMesh } from "@react-three/drei";
import { colors } from "@/lib/theme";

// ---------------------------------------------------------------------------
// A small cluster of connected nodes that assembles into a bird-in-flight
// silhouette — CodeIT's mark — rather than an abstract, unbranded shape.
// Both wings sweep up and out from a shared center point in a shallow
// chevron (the classic minimal "bird in flight" glyph); one cross-strut
// ties them together low across the chest so the cluster also reads as a
// connected network — the services CodeIT brings together — not just an
// outline.
// ---------------------------------------------------------------------------

type Point = [number, number, number];
type BirdNode = { id: string; position: Point };
type Edge = [string, string];

const SILHOUETTE_SCALE = 1.25;

function scalePoint([x, y, z]: Point): Point {
  return [x * SILHOUETTE_SCALE, y * SILHOUETTE_SCALE, z * SILHOUETTE_SCALE];
}

function wingNodes(side: 1 | -1, prefix: string): BirdNode[] {
  return [
    { id: `${prefix}Shoulder`, position: scalePoint([0.2 * side, 0.05, 0]) },
    { id: `${prefix}Mid`, position: scalePoint([0.55 * side, 0.42, -0.1]) },
    { id: `${prefix}Peak`, position: scalePoint([0.95 * side, 0.6, -0.2]) },
    { id: `${prefix}Tip`, position: scalePoint([1.3 * side, 0.35, -0.3]) },
  ];
}

const NODES: BirdNode[] = [
  { id: "body", position: scalePoint([0, -0.05, 0.1]) },
  ...wingNodes(1, "r"),
  ...wingNodes(-1, "l"),
];

const EDGES: Edge[] = [
  ["body", "rShoulder"],
  ["rShoulder", "rMid"],
  ["rMid", "rPeak"],
  ["rPeak", "rTip"],
  ["body", "lShoulder"],
  ["lShoulder", "lMid"],
  ["lMid", "lPeak"],
  ["lPeak", "lTip"],
  ["rMid", "lMid"],
];

const NODE_INDEX = new Map(NODES.map((node, i) => [node.id, i]));

const TEAL = new THREE.Color(colors.teal);
const NAVY = new THREE.Color(colors.navy);
const MAX_WINGSPAN = Math.max(...NODES.map((node) => Math.abs(node.position[0])));

// Teal at the wingtips fading to navy through the spine — the brand
// teal/navy gradient the cluster is meant to read as.
function colorForNode(position: Point): THREE.Color {
  const t = MAX_WINGSPAN === 0 ? 0 : Math.abs(position[0]) / MAX_WINGSPAN;
  return NAVY.clone().lerp(TEAL, t);
}

const ASSEMBLE_DURATION = 2.4;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Non-uniform on purpose — this only needs to look like a loose scatter for
// the intro, not be a physically accurate random-sphere distribution.
function randomScatterPoint(radius: number): Point {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = radius * (0.4 + Math.random() * 0.6);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

function NodeCluster() {
  const nodeRefs = useRef<(PositionMesh | null)[]>([]);
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
  const groupRef = useRef<THREE.Group>(null);
  const assembled = useRef(false);

  const scatterStarts = useMemo(
    () => NODES.map(() => randomScatterPoint(2)),
    [],
  );

  const linePositions = useMemo(
    () => new Float32Array(EDGES.length * 2 * 3),
    [],
  );

  const lineColors = useMemo(() => {
    const array = new Float32Array(EDGES.length * 2 * 3);
    EDGES.forEach(([a, b], i) => {
      const colorA = colorForNode(NODES[NODE_INDEX.get(a)!].position);
      const colorB = colorForNode(NODES[NODE_INDEX.get(b)!].position);
      array.set([colorA.r, colorA.g, colorA.b], i * 6);
      array.set([colorB.r, colorB.g, colorB.b], i * 6 + 3);
    });
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!assembled.current) {
      const t = Math.min(1, state.clock.elapsedTime / ASSEMBLE_DURATION);
      const eased = easeOutCubic(t);

      NODES.forEach((node, i) => {
        const ref = nodeRefs.current[i];
        if (!ref) return;
        const start = scatterStarts[i];
        const target = node.position;
        ref.position.set(
          start[0] + (target[0] - start[0]) * eased,
          start[1] + (target[1] - start[1]) * eased,
          start[2] + (target[2] - start[2]) * eased,
        );
        ref.scale.setScalar(0.3 + eased * 0.7);
      });

      EDGES.forEach(([a, b], i) => {
        const posA = nodeRefs.current[NODE_INDEX.get(a)!]?.position;
        const posB = nodeRefs.current[NODE_INDEX.get(b)!]?.position;
        if (!posA || !posB) return;
        linePositions.set([posA.x, posA.y, posA.z], i * 6);
        linePositions.set([posB.x, posB.y, posB.z], i * 6 + 3);
      });
      if (lineGeometryRef.current) {
        lineGeometryRef.current.attributes.position.needsUpdate = true;
      }

      if (t >= 1) assembled.current = true;
    }

    // The gentle continuous "orbit" once assembled — a rigid rotation of
    // the whole cluster, so connections never need per-frame recomputation.
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={groupRef}>
        <Instances limit={NODES.length} range={NODES.length}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshStandardMaterial roughness={0.3} metalness={0.15} toneMapped={false} />
          {NODES.map((node, i) => (
            <Instance
              key={node.id}
              ref={(ref: PositionMesh | null) => {
                nodeRefs.current[i] = ref;
              }}
              position={scatterStarts[i]}
              scale={0.3}
              color={colorForNode(node.position)}
            />
          ))}
        </Instances>

        <lineSegments>
          <bufferGeometry ref={lineGeometryRef}>
            <bufferAttribute
              attach="attributes-position"
              count={EDGES.length * 2}
              array={linePositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={EDGES.length * 2}
              array={lineColors}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial vertexColors transparent opacity={0.55} toneMapped={false} />
        </lineSegments>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[65%] w-[65%] rounded-full bg-gradient-to-br from-teal/20 via-transparent to-navy/15 blur-3xl" />
      </div>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.1} color={colors.white} />
        <pointLight position={[-3, -2, -3]} intensity={0.5} color={colors.teal} />
        <NodeCluster />
      </Canvas>
    </>
  );
}
