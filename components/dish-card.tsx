"use client"

import { useRef, useEffect } from "react"
import { Leaf, Clock, Star } from "lucide-react"
import gsap from "gsap"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Dish {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  prepTime: string
}

interface DishCardProps {
  dish: Dish
}

export function DishCard({ dish }: DishCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Setup hover animations
    const card = cardRef.current

    // Only add event listeners if the card element exists
    if (card) {
      const enterAnimation = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const leaveAnimation = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          duration: 0.3,
          ease: "power2.out",
        })
      }

      card.addEventListener("mouseenter", enterAnimation)
      card.addEventListener("mouseleave", leaveAnimation)

      return () => {
        card.removeEventListener("mouseenter", enterAnimation)
        card.removeEventListener("mouseleave", leaveAnimation)
      }
    }
  }, [])

  return (
    <Card ref={cardRef} className="dish-card overflow-hidden transition-all duration-200">
      <div className="relative">
        <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="h-48 w-full object-cover" />
        <Badge
          className={`absolute right-2 top-2 ${
            dish.category === "veg" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {dish.category === "veg" ? (
            <span className="flex items-center gap-1">
              <Leaf className="h-3 w-3" /> Veg
            </span>
          ) : (
            <span>Non-Veg</span>
          )}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-0">
        <h3 className="text-xl font-semibold">{dish.name}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="mb-3 text-sm text-gray-600">{dish.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <span>{dish.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{dish.prepTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold">${dish.price.toFixed(2)}</span>
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
