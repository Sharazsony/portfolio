"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Define icon paths stored in the `public/icons/` folder
const icons = {
  cpp: "/clogo.png",
  c: "/clogo.png",
  python: "/python.png",
  javascript: "/jslogo.png",
  css: "/csslogo.png",
  html: "/htmllogo.png",
  git: "/gitlogo.png",
  github: "/githublogo.png",
  bootstrap: "/bootstraplogo.png",
  jupyter: "/jupyter.png",
  react: "/reactlogo.png",
  oracle: "/Oracle-removebg-preview.png",
  mysql: "/SQL.png",
  wireshark: "/wireshark.png",
  cisco: "/cisco.png",
  googlecolab: "/google.png",
  powerBI:"/powerbi.png",
  pycharm:"/pycharm.svg"
}

// Function to get background and glow colors based on icon name
const getColors = (name) => {
  switch (name) {
    case "cpp":
    case "c":
      return { bg: "rgba(0, 90, 156, 0.2)", glow: "#00d2ff" } // Blue for C/C++
    case "python":
      return { bg: "rgba(87, 192, 46, 0.2)", glow: "#ffdf00" } // Yellow for Python
    case "javascript":
      return { bg: "rgba(247, 223, 30, 0.2)", glow: "#f7df1e" } // Yellow for JavaScript
    case "css":
      return { bg: "rgba(21, 114, 182, 0.2)", glow: "#1572b6" } // Blue for CSS
    case "html":
      return { bg: "rgba(227, 79, 38, 0.2)", glow: "#e34f26" } // Orange for HTML
    case "git":
    case "github":
      return { bg: "rgba(240, 81, 51, 0.2)", glow: "#f05133" } // Orange for Git/GitHub
    case "bootstrap":
      return { bg: "rgba(121, 82, 179, 0.2)", glow: "#7952b3" } // Purple for Bootstrap
    case "jupyter":
      return { bg: "rgba(255, 112, 20, 0.2)", glow: "#ff7014" } // Orange for Jupyter
    case "react":
      return { bg: "rgba(97, 218, 251, 0.2)", glow: "#61dafb" } // Cyan for React
    case "oracle":
      return { bg: "rgba(255, 0, 0, 0.2)", glow: "#ff0000" } // Red for Oracle
    case "mysql":
      return { bg: "rgba(0, 117, 143, 0.2)", glow: "#00758f" } // Blue for MySQL
    case "wireshark":
      return { bg: "rgba(201, 0, 204, 0.2)", glow: "#0099cc" } // Blue for Wireshark
    case "cisco":
      return { bg: "rgba(0, 102, 153, 0.2)", glow: "#006699" } // Blue for Cisco
    case "googlecolab":
      return { bg: "rgba(251, 103, 5, 0.2)", glow: "#fbbc05" } // Yellow for Google Colab
    case "powerBI":
      return { bg: "rgba(210, 185, 26, 0.2)", glow: "rgb(245, 100, 11)" } // Yellow for Google Colab
    case "pycharm":
      return { bg: "rgba(26, 210, 35, 0.2)", glow: "rgb(120, 245, 11)" } // Yellow for Google Colab
      
    default:
      return { bg: "rgba(0, 0, 0, 0.1)", glow: "#00d2ff" } // Default cyan
  }
}

// Component to render an individual icon
const IconComponent = ({ name, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const colors = getColors(name)

  useEffect(() => {
    // Stagger the appearance of icons
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 100)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center justify-center p-4 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particle effect background */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        {isHovered && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                initial={{
                  opacity: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  backgroundColor: colors.glow,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Glowing background */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-lg"
            style={{
              background: colors.bg,
              boxShadow: `0 0 15px ${colors.glow}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        animate={{
          y: isHovered ? [0, -5, 0] : 0,
          rotate: isHovered ? [0, -5, 5, -3, 0] : 0,
        }}
        transition={{
          duration: isHovered ? 2 : 0.3,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          repeatType: "loop",
        }}
        className="z-10"
      >
        <motion.img
          src={icons[name]}
          alt={name}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-16 w-16 object-contain z-10 drop-shadow-lg" // Increased icon size
          loading="lazy"
        />
      </motion.div>

      {/* Text label with glow effect */}
      <motion.span
        animate={{
          textShadow: isHovered ? `0 0 8px ${colors.glow}` : "none",
          color: isHovered ? colors.glow : "#94a3b8",
        }}
        className="text-sm font-semibold capitalize mt-3 z-10 transition-all duration-300"
      >
        {name}
      </motion.span>
    </motion.div>
  )
}

// Floating particles component for background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          initial={{
            opacity: Math.random() * 0.5 + 0.1,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
          }}
        />
      ))}
    </div>
  )
}

// Main component
export default function TechStack() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-gray-900 via-[#0c1222] to-black text-white overflow-hidden">
      {/* Background particles */}
      <FloatingParticles />

      {/* Gradient text heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 relative"
      >
        My Tech Stack
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.h1>

      {/* Icons grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 p-6 max-w-7xl" // Adjusted grid and gap
      >
        {Object.keys(icons).map((key, index) => (
          <IconComponent key={key} name={key} index={index} />
        ))}
      </motion.div>

      {/* Glowing border */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 border-2 border-transparent rounded-lg opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent, #00d2ff, #3a7bd5, transparent) border-box",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>
    </div>
  )
}