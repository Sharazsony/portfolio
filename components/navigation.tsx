"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-cyan-500/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Link href="/" className="text-2xl font-bold tracking-tighter relative group">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                Sharaz Masih
              </span>
              <span className="absolute -inset-1 opacity-0 group-hover:opacity-100 bg-cyan-500/20 blur-lg transition-all duration-500"></span>
            </Link>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-20 blur-sm animate-pulse"></div>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative group text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400/30 blur-sm group-hover:w-full transition-all duration-500 z-0"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-0.5 bg-cyan-400 relative">
                <div className="w-6 h-0.5 bg-cyan-400 absolute -top-2"></div>
                <div className="w-6 h-0.5 bg-cyan-400 absolute top-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

