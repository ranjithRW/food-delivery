// import { FoodMenu } from "@/components/food-menu"
// import { Hero3D } from "@/components/hero-3d"
// import { FeaturedDish3D } from "@/components/featured-dish-3d"

// export default function Home() {
//   return (
//     <main className="min-h-screen">
//       <Hero3D />
//       <FeaturedDish3D />
//       <FoodMenu />
//     </main>
//   )
// }

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FoodMenu } from "@/components/food-menu"
import { Hero3D } from "@/components/hero-3d"
import { FeaturedDish3D } from "@/components/featured-dish-3d"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef(null)
  const heroRef = useRef(null)
  const featuredDishRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    // GSAP animations setup
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Featured dish animation
      gsap.from(featuredDishRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        scrollTrigger: {
          trigger: featuredDishRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Menu items animation - staggered effect
      gsap.from(".menu-item", {
        opacity: 0,
        y: 50,
        stagger: 0.5,
        duration: 0.9,
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })
    }, mainRef)

    // Cleanup function
    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="min-h-screen">
      <div ref={heroRef}>
        <Hero3D />
      </div>
      
      <div ref={featuredDishRef}>
        <FeaturedDish3D />
      </div>
      
      <div ref={menuRef}>
        <FoodMenu />
      </div>
    </main>
  )
}