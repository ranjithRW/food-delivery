"use client"

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  Text,
  Html,
  PresentationControls,
  useGLTF
} from "@react-three/drei"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const PizzaModel = () => {
  const pizzaRef = useRef()
  const { scene } = useGLTF("/pizza.glb")

  // Add a rotation animation
  useFrame((state) => {
    if (pizzaRef.current) {
      pizzaRef.current.rotation.y += 0.005
    }
  })

  return (
    <primitive
      ref={pizzaRef}
      object={scene}
      scale={10} // Increased scale from 0.5 to 2.0
      position={[0, 0, 0]}
    />
  )
}

// Pizza layer component that creates geometric shapes instead of using GLB models
const PizzaLayer = ({ layerType, position, rotation, scale, scrollY, appearAt, finalY = 0, color, initialY }) => {
  const modelRef = useRef()
  const [visible, setVisible] = useState(false)
  // const [yPos, setYPos] = useState(position[1] + 10) // Start above final position.  Removed as now using initialY

  useEffect(() => {
    // Calculate scroll position in a way that considers the component's appearAt
    const currentScrollPosition = scrollY;


    // Scroll Down Animations
    if (currentScrollPosition >= appearAt && !visible) {
      setVisible(true);

      // Drop animation when layer appears
      gsap.to(modelRef.current.position, {
        y: finalY,
        duration: 1.2,
        ease: "bounce.out"
      });
    }

     // Scroll Up Animations (Reverse)
    if (currentScrollPosition < appearAt && visible) {
          // Use initialY to reset position
        gsap.to(modelRef.current.position, {
            y: initialY, // Move it back to its initial (hidden) position
            duration: 0.8, // Reduced duration
            ease: "power2.out", // Adjust the easing as needed
            onComplete: () => {
                setVisible(false); // Hide the element after the animation completes
            },
        });
    }

  }, [scrollY, appearAt, visible, finalY, initialY]); // Include initialY in dependency array


  // Add a subtle rotation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });


  return (
    <group
      ref={modelRef}
      position={[position[0], visible ? finalY : initialY, position[2]]} // Use finalY or initialY
      rotation={rotation}
      scale={scale}
      visible={visible}
    >
      {layerType === "crust" && (
        <mesh>
          <cylinderGeometry args={[5, 5, 0.5, 32]} />
          <meshStandardMaterial color="#E2A96A" roughness={0.8} />
        </mesh>
      )}

      {layerType === "sauce" && (
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[4.8, 4.8, 0.2, 32]} />
          <meshStandardMaterial color="#C53030" roughness={0.5} />
        </mesh>
      )}

      {layerType === "cheese" && (
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[4.8, 4.8, 0.2, 32]} />
          <meshStandardMaterial color="#FDF6B2" roughness={0.3} />
        </mesh>
      )}

      {layerType === "toppings" && (
        <group>
          {/* Generate random toppings */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const radius = 3 * Math.random() + 1;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const scale = 0.3 + Math.random() * 0.3;

            return (
              <mesh key={i} position={[x, 0.6, z]} scale={[scale, 0.1, scale]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 8]} />
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#805AD5" : i % 2 === 0 ? "#38A169" : "#E53E3E"}
                  roughness={0.7}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
};

// ScrollTracker component to monitor scroll position
const ScrollTracker = ({ setScrollY }) => {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollY]);

  return null;
};

export function Hero3D() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const pizzaSectionRef = useRef(null);

  useEffect(() => {
    // GSAP animations for text and buttons
    const tl = gsap.timeline();

    tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });

    tl.fromTo(
      buttonRef.current.querySelectorAll("button"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.5"
    );

    // Subtle floating animation for the container
    gsap.to(containerRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div className="h-[80vh] w-full bg-gradient-to-b from-green-50 to-white">
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
            {/* Left Column - Text Content */}
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

            {/* Right Column - Pizza Preview */}
            <div className="relative h-[50vh] w-full">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <PresentationControls
                  global
                  zoom={0.8}
                  rotation={[0, -Math.PI / 4, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                  <Suspense fallback={null}>
                    <PizzaModel />
                    {/* <Html position={[0, 3, 0]} center>
                    <Badge className="bg-green-600 hover:bg-green-700">
                      <span className="flex items-center gap-1">
                        <Leaf className="h-3 w-3" /> Vegetarian
                      </span>
                    </Badge>
                  </Html> */}
                    <Environment preset="sunset" />
                  </Suspense>
                </PresentationControls>
                {/* OrbitControls disabled to prevent conflict with scroll-based rotation */}
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Pizza Assembly Section */}
      <div ref={pizzaSectionRef} className="h-[200vh] bg-gradient-to-b from-white to-orange-50">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Watch Our Pizza Come Together</h2>


          {/* Pizza Assembly Canvas */}
          <div className="h-[60vh] w-full max-w-2xl">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 5, 12]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Environment preset="sunset" />

              {/* Pizza Layers */}
              <group position={[0, -1, 0]} rotation={[0.2, 0, 0]}>
                <Suspense fallback={null}>
                  {/* Pizza Base/Crust */}
                  <PizzaLayer
                    layerType="crust"
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    scrollY={scrollY}
                    appearAt={100}
                    finalY={0}
                    color="#E2A96A"
                    initialY={10} // Start 10 units above
                  />

                  {/* Sauce Layer */}
                  <PizzaLayer
                    layerType="sauce"
                    position={[0, 0.5, 0]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    scrollY={scrollY}
                    appearAt={400}
                    finalY={0.2}
                    color="#C53030"
                    initialY={10} // Start 10 units above
                  />

                  {/* Cheese Layer */}
                  <PizzaLayer
                    layerType="cheese"
                    position={[0, 1, 0]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    scrollY={scrollY}
                    appearAt={700}
                    finalY={0.4}
                    color="#FDF6B2"
                    initialY={10} // Start 10 units above
                  />

                  {/* Toppings */}
                  <PizzaLayer
                    layerType="toppings"
                    position={[0, 1.5, 0]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    scrollY={scrollY}
                    appearAt={1000}
                    finalY={0.6}
                    color={undefined}
                    initialY={10} // Start 10 units above
                  />
                </Suspense>
              </group>
              <ScrollTracker setScrollY={setScrollY} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}