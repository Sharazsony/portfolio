"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-4 h-4" />,
      url: "https://github.com/Sharazsony",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      url: "http://www.linkedin.com/in/sharaz-soni-542381313",
    },
    {
      name: "Email",
      icon: <Mail className="w-4 h-4" />,
      url: "sharazsony@gmail.com",
    },
  ]

  return (
    <footer className="relative py-8 bg-black border-t border-cyan-500/20">
      {/* Cybernetic blueprint background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1920')] opacity-5 bg-repeat"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative mb-4 md:mb-0"
          >
            <p className="text-gray-400 text-sm glitch-text">© 2030 Sharaz Masih | Innovating with Data & AI</p>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300"></div>
          </motion.div>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0.5 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

