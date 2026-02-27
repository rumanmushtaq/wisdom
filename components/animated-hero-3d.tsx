"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Ring } from "@react-three/drei"
import { useRef, Suspense } from "react"
import * as THREE from "three"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#BFFF00"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingRing({
  position,
  rotation,
  scale,
}: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Ring ref={ringRef} args={[0.8, 1, 32]} position={position} rotation={rotation} scale={scale}>
        <meshStandardMaterial color="#BFFF00" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = new Float32Array(200 * 3)
  for (let i = 0; i < 200; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 15
    particles[i * 3 + 1] = (Math.random() - 0.5) * 15
    particles[i * 3 + 2] = (Math.random() - 0.5) * 15
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#BFFF00" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function AnimatedHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#BFFF00" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#BFFF00" />

          <AnimatedSphere />

          <FloatingRing position={[3, 1, 0]} rotation={[0.5, 0.5, 0]} scale={1} />
          <FloatingRing position={[-3, -1, -1]} rotation={[0, 0.8, 0.3]} scale={0.8} />
          <FloatingRing position={[0, 2.5, -2]} rotation={[0.3, 0, 0.5]} scale={1.2} />

          <ParticleField />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
