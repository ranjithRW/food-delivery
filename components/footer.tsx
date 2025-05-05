"use client"

import { useRef, useEffect } from "react"
import { Facebook, Instagram, Twitter } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (footerRef.current) {
      const footerItems = footerRef.current.querySelectorAll(".footer-item")

      if (footerItems.length > 0) {
        // Animate footer elements when scrolled into view
        gsap.fromTo(
          footerItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            },
          },
        )
      }
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="footer-item">
            <h3 className="mb-4 text-xl font-bold">FoodDelight</h3>
            <p className="text-gray-400">
              Bringing delicious food right to your doorstep. Experience the magic of culinary excellence.
            </p>
          </div>

          <div className="footer-item">
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="text-gray-400 hover:text-green-400">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-item">
            <h4 className="mb-4 font-semibold">Contact Us</h4>
            <address className="not-italic text-gray-400">
              <p>123 Food Street</p>
              <p>Delicious City, DC 12345</p>
              <p className="mt-2">Email: info@fooddelight.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>

          <div className="footer-item">
            <h4 className="mb-4 font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="rounded-full bg-gray-700 p-2 hover:bg-green-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-gray-700 p-2 hover:bg-green-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-gray-700 p-2 hover:bg-green-600">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md border-0 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button className="rounded-r-md bg-green-600 px-4 py-2 font-medium hover:bg-green-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-item mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 FoodDelight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
