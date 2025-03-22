"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

const skills = [
  { name: "Python", level: 90 },
  { name: "C++", level: 85 },
  { name: "Data Analysis", level: 92 },
  { name: "SQL", level: 88 },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  return (
    <section id="about" className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
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
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
          >
            Who is Sharaz Masih?
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="relative bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-xl p-8 mb-12 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-md rounded-xl"></div>
            <p className="text-lg text-gray-300 leading-relaxed relative z-10">
              Aspiring Data Scientist with expertise in programming, data analysis, and database management. Passionate
              about AI-driven solutions and predictive analytics.
            </p>
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-8 text-center text-cyan-300">
            Core Competencies
          </motion.h3>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative group perspective"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 h-40 flex flex-col items-center justify-center transform transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-sm rounded-lg group-hover:opacity-30 transition-opacity duration-300"></div>

                  <div className="w-20 h-20 mb-4 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-800"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-cyan-400"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.level / 100)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-cyan-300">
                      {skill.level}%
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

