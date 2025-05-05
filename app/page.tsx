import { FoodMenu } from "@/components/food-menu"
import { Hero3D } from "@/components/hero-3d"
import { FeaturedDish3D } from "@/components/featured-dish-3d"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero3D />
      <FeaturedDish3D />
      <FoodMenu />
    </main>
  )
}
