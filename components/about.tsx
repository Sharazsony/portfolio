"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showOptions, setShowOptions] = useState(false)

  // Background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    const createParticles = () => {
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(
            Math.random() * 200 + 50,
          )}, ${Math.floor(Math.random() * 100 + 150)}, ${Math.random() * 0.5 + 0.2})`,
        })
      }
    }

    createParticles()

    let mouseX = 0
    let mouseY = 0

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply force if mouse is close
        if (distance < 100) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (100 - distance) / 100
          particle.speedX += forceDirectionX * force * 0.2
          particle.speedY += forceDirectionY * force * 0.2
        }

        // Apply some friction
        particle.speedX *= 0.98
        particle.speedY *= 0.98

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(0, 255, 255, 0.05)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  const handleCVAction = (action: "preview" | "download") => {
    const cvUrl = "/SharazCV.pdf"
    if (action === "preview") {
      window.open(cvUrl, "_blank")
    } else {
      const link = document.createElement("a")
      link.href = cvUrl
      link.download = "Sharaz_Masih_CV.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    setShowOptions(false)
  }

  return (
    <section id="about" className="relative min-h-[60vh] py-12 flex items-center justify-center overflow-hidden">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Floating headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Who is Sharaz Masih?
          </motion.h2>

          {/* Animated description with typewriter effect */}
          <motion.div
            variants={itemVariants}
            className="relative bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-8 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-md rounded-xl"></div>
            <motion.p
              className="text-lg text-gray-300 leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Versatile tech enthusiast with a strong foundation in programming, data analysis, and web development. 
              Skilled in C++ (OOP, DS), databases, and Python (Pandas, Matplotlib, NumPy) for transforming data into actionable insights. 
              Experienced in Power BI and exploratory data analysis (EDA). 
              Passionate about building innovative solutions that connect technology with real-world impact.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* CV/Resume Icon with Fire Animation */}
      <div className="fixed left-8 bottom-8 z-20">
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:scale-105 transition-transform relative"
          >
            {/* Fire Animation */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "9999px",
                animation: "fire 1.5s infinite",
                boxShadow: "0 0 10px rgba(0, 191, 255, 0.5), 0 0 20px rgba(0, 191, 255, 0.5), 0 0 30px rgba(0, 191, 255, 0.5)",
              }}
            ></div>
            <img src="/icons.png" alt="CV" className="w-10 h-10 relative z-10" />
          </button>
          {showOptions && (
            <div className="absolute left-0 bottom-14 bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.3)] p-2">
              <button
                onClick={() => handleCVAction("preview")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-cyan-500/10 rounded-lg"
              >
                Preview CV
              </button>
              <button
                onClick={() => handleCVAction("download")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-cyan-500/10 rounded-lg"
              >
                Download CV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inline CSS for Fire Animation */}
      <style>
        {`
          @keyframes fire {
            0% {
              box-shadow: 0 0 10px rgba(185, 158, 19, 0.5), 0 0 20px rgba(188, 177, 32, 0.5), 0 0 30px rgba(255, 98, 0, 0.5);
            }
            50% {
              box-shadow: 0 0 15px rgba(255, 145, 0, 0.7), 0 0 25px rgba(255, 166, 0, 0.7), 0 0 35px rgba(255, 0, 0, 0.7);
            }
            100% {
              box-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(0, 191, 255, 0.5), 0 0 30px rgba(195, 255, 0, 0.5);
            }
          }
        `}
      </style>
    </section>
  )
}