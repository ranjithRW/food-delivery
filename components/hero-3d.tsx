"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Float, Text } from "@react-three/drei"
import gsap from "gsap"
import { Button } from "@/components/ui/button"

export function Hero3D() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    // GSAP animations for text and buttons
    const tl = gsap.timeline()

    tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

    tl.fromTo(
      buttonRef.current.querySelectorAll("button"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.5",
    )

    // Subtle floating animation for the container
    gsap.to(containerRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <div className="relative h-[80vh] w-full bg-gradient-to-b from-green-50 to-white">
      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="sunset" />

          {/* 3D Floating Food Items */}
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5} position={[-4, 1, 0]}>
            <mesh>
              <sphereGeometry args={[1.2, 32, 32]} />
              <meshStandardMaterial color="#FF6B6B" roughness={0.4} metalness={0.1} />
            </mesh>
          </Float>

          <Float speed={2} rotationIntensity={0.7} floatIntensity={0.7} position={[4, -1, -2]}>
            <mesh>
              <torusGeometry args={[0.8, 0.3, 16, 32]} />
              <meshStandardMaterial color="#4ECDC4" roughness={0.3} metalness={0.2} />
            </mesh>
          </Float>

          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6} position={[0, 3, -1]}>
            <mesh>
              <octahedronGeometry args={[1]} />
              <meshStandardMaterial color="#FFD166" roughness={0.5} metalness={0.1} />
            </mesh>
          </Float>

          {/* 3D Text */}
          <Text
            position={[0, 0, 0]}
            fontSize={1.5}
            color="#2A9D8F"
            font="/fonts/Inter_Bold.json"
            anchorX="center"
            anchorY="middle"
          >
            FoodDelight
          </Text>

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div ref={containerRef} className="flex flex-col justify-center space-y-6">
            <div ref={textRef}>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Experience <span className="text-green-600">Culinary</span> Magic
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Discover a new dimension of taste with our vegetarian and non-vegetarian delights.
              </p>
            </div>
            <div ref={buttonRef} className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Order Now
              </Button>
              <Button size="lg" variant="outline">
                Explore Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
