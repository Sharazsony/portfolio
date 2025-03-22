"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skillCategories = [
  {
    name: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "C++", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "R", level: 75 },
    ],
  },
  {
    name: "Data Analysis",
    skills: [
      { name: "Pandas", level: 92 },
      { name: "NumPy", level: 88 },
      { name: "Matplotlib", level: 85 },
      { name: "Tableau", level: 80 },
    ],
  },
  {
    name: "Database Management",
    skills: [
      { name: "SQL", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    name: "Software Development",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 78 },
      { name: "Agile", level: 85 },
    ],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="skills" className="relative min-h-screen py-20 bg-gradient-to-b from-black via-purple-950/10 to-black">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-repeat"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
          >
            Technical Proficiencies
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillCategories.map((category) => (
              <motion.div key={category.name} variants={itemVariants} className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-md rounded-xl"></div>
                <div className="relative bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 h-full">
                  <h3 className="text-2xl font-semibold mb-6 text-cyan-300">{category.name}</h3>

                  <div className="grid grid-cols-2 gap-4">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm rounded-lg transition-opacity duration-300"></div>
                        <div className="relative bg-gray-900/80 border border-cyan-500/20 rounded-lg p-4 group-hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all duration-300">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-white">{skill.name}</h4>
                            <span className="text-sm text-cyan-300">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 relative"
                            >
                              <span className="absolute top-0 right-0 h-full w-1 bg-white/30 animate-pulse"></span>
                            </motion.div>
                          </div>
                          <div className="absolute -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 border border-cyan-500/30 rounded-lg p-2 text-xs text-gray-300 top-full mt-2 w-full">
                            Advanced proficiency with practical implementation experience
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

