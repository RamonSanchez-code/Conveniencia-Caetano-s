
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ParticleFieldProps = {
  count: number;
  size: number;
  color: string;
  opacity: number;
  spread: number;
  speed: number;
};

function ParticleField({ count, size, color, opacity, spread, speed }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.72;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.55;
    }
    return arr;
  }, [count, spread]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * speed;
    ref.current.rotation.z = t * speed * 0.28;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatRocks() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const baseY = (child.userData.baseY as number) ?? child.position.y;
      child.position.y = baseY + Math.sin(t * 0.45 + i * 2.1) * 0.28;
      child.rotation.x = t * 0.14 + i * 1.4;
      child.rotation.y = t * 0.2 + i * 0.8;
    });
  });

  return (
    <group ref={group}>
      <mesh position={[3.3, 1.1, -2.4]} userData={{ baseY: 1.1 }}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshBasicMaterial wireframe color="#33333b" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-3.8, -1.3, -1.8]} userData={{ baseY: -1.3 }}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial wireframe color="#ff5c0a" transparent opacity={0.4} />
      </mesh>
      <mesh position={[2.7, -2, -2.9]} userData={{ baseY: -2 }}>
        <torusKnotGeometry args={[0.42, 0.13, 64, 8]} />
        <meshBasicMaterial wireframe color="#26262e" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-3, 1.9, -3.4]} userData={{ baseY: 1.9 }}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial wireframe color="#ffb23c" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/** Camera rig com parallax suave seguindo o ponteiro. */
function Rig() {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.045;
    camera.position.y += (pointer.y * 0.45 - camera.position.y) * 0.045;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Rig />
      <ParticleField count={260} size={0.055} color="#ff7a2a" opacity={0.5} spread={14} speed={0.028} />
      <ParticleField count={420} size={0.02} color="#f4f1ea" opacity={0.35} spread={16} speed={-0.02} />
      <FloatRocks />
    </Canvas>
  );
}
