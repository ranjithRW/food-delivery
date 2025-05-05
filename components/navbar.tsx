"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, ShoppingCart } from "lucide-react"
import gsap from "gsap"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ]

  useEffect(() => {
    // Check if refs are available before animating
    if (navRef.current) {
      // Initial animation for navbar
      gsap.fromTo(navRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
    }

    if (logoRef.current) {
      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.7)" },
      )
    }

    if (linksRef.current?.children) {
      // Links animation
      gsap.fromTo(
        linksRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.4, ease: "power2.out" },
      )
    }

    // Scroll animation for navbar
    const handleScroll = () => {
      if (!navRef.current) return

      if (window.scrollY > 50) {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          backdropFilter: "blur(8px)",
          duration: 0.3,
        })
      } else {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <a ref={logoRef} href="#" className="text-2xl font-bold text-green-600">
            FoodDelight
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <div ref={linksRef} className="flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                2
              </span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">Order Now</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
              2
            </span>
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="space-y-2 py-6">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Order Now</Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
