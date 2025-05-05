// "use client"

// import { useRef, useEffect } from "react"
// import { OrbitControls, PresentationControls, Environment, Html } from "@react-three/drei"
// import { Canvas } from "@react-three/fiber"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Leaf } from "lucide-react"

// export function FeaturedDish3D() {
//   const sectionRef = useRef(null)
//   const textRef = useRef(null)

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger)

//     // Animation for the section title
//     if (textRef.current && sectionRef.current) {
//       gsap.fromTo(
//         textRef.current,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top 80%",
//             end: "top 50%",
//             scrub: 1,
//           },
//         },
//       )
//     }
//   }, [])

//   return (
//     <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-green-50">
//       <div className="container mx-auto px-4">
//         <div ref={textRef} className="mb-12 text-center">
//           <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Featured Dishes</h2>
//           <p className="mx-auto max-w-2xl text-gray-600">
//             Explore our chef's special creations in a whole new dimension
//           </p>
//         </div>

//         <div className="grid gap-8 md:grid-cols-2">
//           {/* 3D Dish Showcase */}
//           <div className="h-[400px] rounded-xl bg-white shadow-lg">

//             <Canvas>
//               <ambientLight intensity={0.5} />
//               <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//               <PresentationControls
//                 global
//                 zoom={0.8}
//                 rotation={[0, -Math.PI / 4, 0]}
//                 polar={[-Math.PI / 4, Math.PI / 4]}
//                 azimuth={[-Math.PI / 4, Math.PI / 4]}
//               >
//                 {/* 3D Food Model - Using a placeholder sphere with material */}
//                 <group position={[0, 0, 0]}>
//                   <mesh>
//                     <sphereGeometry args={[2, 32, 32]} />

//                     <meshStandardMaterial color="#E76F51" roughness={0.4} metalness={0.2} />
//                   </mesh>

//                   {/* HTML content inside 3D scene */}
//                   <Html position={[0, 3, 0]} center>
//                     <Badge className="bg-green-600 hover:bg-green-700">
//                       <span className="flex items-center gap-1">
//                         <Leaf className="h-3 w-3" /> Vegetarian
//                       </span>
//                     </Badge>
//                   </Html>
//                 </group>
//                 <Environment preset="sunset" />
//               </PresentationControls>
//               <OrbitControls enableZoom={false} />
//             </Canvas>
//           </div>

//           {/* Dish Information */}
//           <div className="flex flex-col justify-center space-y-6">
//             <h3 className="text-3xl font-bold text-gray-900">Signature Paneer Tikka</h3>
//             <p className="text-gray-600">
//               Our chef's signature dish features marinated cottage cheese cubes grilled to perfection and served with a
//               rich, aromatic sauce that will transport your taste buds to culinary heaven.
//             </p>
//             <div className="flex items-center space-x-2">
//               <span className="text-2xl font-bold text-green-600">$14.99</span>
//               <Badge variant="outline" className="ml-2">
//                 Chef's Special
//               </Badge>
//             </div>
//             <div className="flex space-x-4">
//               <Button className="bg-green-600 hover:bg-green-700">Add to Cart</Button>
//               <Button variant="outline">View Details</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, Html, useGLTF } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

// Rotating model component that responds to scroll
function RotatingFruitModel({ scrollYProgress }) {
  const modelRef = useRef()
  const { scene } = useGLTF("/fruit.glb") // Adjust path if needed

  useFrame(() => {
    if (modelRef.current && scrollYProgress.current) {
      // Horizontal rotation (y-axis)
      modelRef.current.rotation.y = scrollYProgress.current * Math.PI * 2

      // Vertical rotation (x-axis)
      modelRef.current.rotation.x = scrollYProgress.current * Math.PI
    }
  })

  return <primitive ref={modelRef} object={scene} scale={8} />;
}

export function FeaturedDish3D() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const canvasRef = useRef(null)
  const scrollYProgress = useRef(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animation for text elements
    if (textRef.current && sectionRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      )
    }

    // Create scroll trigger for 3D model rotation
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        scrollYProgress.current = self.progress;
      },
    })

    return () => {
      // Clean up scroll triggers
      scrollTrigger.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div ref={textRef} className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Featured Dishes</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Explore our chef's special creations in a whole new dimension
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 3D Dish Showcase */}
          <div className="h-[400px] rounded-xl bg-white shadow-lg" ref={canvasRef}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, -Math.PI / 4, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              ></PresentationControls>
              <Suspense fallback={null}>
                <RotatingFruitModel scrollYProgress={scrollYProgress} />
                <Html position={[0, 3, 0]} center>
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <span className="flex items-center gap-1">
                      <Leaf className="h-3 w-3" /> Vegetarian
                    </span>
                  </Badge>
                </Html>
                <Environment preset="sunset" />
                <PresentationControls />
              </Suspense>
              {/* OrbitControls disabled to prevent conflict with scroll-based rotation */}
              <OrbitControls enableZoom={false} />

            </Canvas>
          </div>

          {/* Dish Information */}
          <div className="flex flex-col justify-center space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Signature Paneer Tikka</h3>
            <p className="text-gray-600">
              Our chef's signature dish features marinated cottage cheese cubes grilled to perfection and served with a
              rich, aromatic sauce that will transport your taste buds to culinary heaven.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">$14.99</span>
              <Badge variant="outline" className="ml-2">
                Chef's Special
              </Badge>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">Add to Cart</Button>
              <Button variant="outline">View Details</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}