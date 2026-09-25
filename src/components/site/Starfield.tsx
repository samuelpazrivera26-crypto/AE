"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Points() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0006;
    ref.current.rotation.x = state.pointer.y * 0.05;
    ref.current.rotation.y += state.pointer.x * 0.00005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#d4d4dc" transparent opacity={0.6} />
    </points>
  );
}

/**
 * Fondo espacial minimalista: un campo de partículas que reacciona muy
 * sutilmente al cursor. Deliberadamente ligero (sin postprocesado) para que
 * cargue rápido; el "peso" cinematográfico lo aportan la tipografía y el
 * grano analógico superpuesto en CSS.
 */
export default function Starfield() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      className="!absolute inset-0"
      gl={{ antialias: true, alpha: true }}
    >
      <Points />
    </Canvas>
  );
}
