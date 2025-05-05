"use client"

import { useState, useRef, useEffect } from "react"
import { Utensils } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { DishCard } from "./dish-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample food data
const foodItems = [
  {
    id: 1,
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese cubes in a rich tomato gravy",
    price: 12.99,
    image: "/paneer.jpg",
    category: "veg",
    rating: 4.5,
    prepTime: "25 mins",
  },
  {
    id: 2,
    name: "Vegetable Biryani",
    description: "Fragrant rice dish with mixed vegetables and aromatic spices",
    price: 10.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "veg",
    rating: 4.3,
    prepTime: "30 mins",
  },
  {
    id: 3,
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach gravy",
    price: 11.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "veg",
    rating: 4.4,
    prepTime: "20 mins",
  },
  {
    id: 4,
    name: "Veg Manchurian",
    description: "Vegetable dumplings tossed in a spicy sauce",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "veg",
    rating: 4.2,
    prepTime: "15 mins",
  },
  {
    id: 5,
    name: "Butter Chicken",
    description: "Tender chicken pieces in a creamy tomato gravy",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "non-veg",
    rating: 4.7,
    prepTime: "25 mins",
  },
  {
    id: 6,
    name: "Chicken Biryani",
    description: "Fragrant rice dish with chicken and aromatic spices",
    price: 13.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "non-veg",
    rating: 4.6,
    prepTime: "35 mins",
  },
  {
    id: 7,
    name: "Fish Curry",
    description: "Fresh fish pieces cooked in a tangy curry",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "non-veg",
    rating: 4.4,
    prepTime: "20 mins",
  },
  {
    id: 8,
    name: "Chicken Tikka",
    description: "Grilled chicken pieces marinated in spices",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "non-veg",
    rating: 4.5,
    prepTime: "20 mins",
  },
]

export function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState("all")
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)
  const tabsRef = useRef(null)

  const filteredItems =
    activeCategory === "all" ? foodItems : foodItems.filter((item) => item.category === activeCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (headingRef.current && sectionRef.current) {
      // Animation for section heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
        },
      )
    }

    if (tabsRef.current && sectionRef.current) {
      // Animation for tabs
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 50%",
            scrub: 1,
          },
        },
      )
    }

    // Initial animation for cards
    animateCards()
  }, [])

  // Animate cards when category changes
  useEffect(() => {
    animateCards()
  }, [activeCategory])

  const animateCards = () => {
    // Reset any existing animations
    gsap.killTweensOf(".dish-card")

    // Animate cards with stagger effect
    gsap.fromTo(
      ".dish-card",
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
    )
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-green-50 to-white" id="menu">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="mb-12 text-center">
          <div className="mb-3 flex justify-center">
            <Utensils className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Our Menu</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Explore our wide range of delicious dishes prepared with the freshest ingredients
          </p>
        </div>

        <div ref={tabsRef}>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <div className="mb-8 flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="veg">Vegetarian</TabsTrigger>
                <TabsTrigger value="non-veg">Non-Vegetarian</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredItems.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="veg" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredItems.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="non-veg" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredItems.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
