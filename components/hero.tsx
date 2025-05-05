import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Delicious Food <span className="text-green-600">Delivered</span> To Your Door
            </h1>
            <p className="text-xl text-gray-600">
              Explore our wide range of vegetarian and non-vegetarian dishes prepared with fresh ingredients.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Order Now
              </Button>
              <Button size="lg" variant="outline">
                View Menu
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-80 lg:h-96">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Delicious food platter"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
