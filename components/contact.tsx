"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock API call to simulate sending an email
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Your transmission has been received. I'll respond shortly.",
        })
        setFormState({
          name: "",
          email: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/Sharazsony",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/sharaz-soni-542381313",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:sharazsony@gmail.com",
    },
  ]

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 bg-gradient-to-b from-black via-purple-950/10 to-black"
    >
      {/* Space-tech gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black"></div>

      {/* Particle animation would go here in a production site */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* This would be replaced with actual particle animation in production */}
          <div className="h-full w-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-repeat opacity-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
          >
            Let&apos;s Connect to Build the Future
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential collaborations? Send me a message and let&apos;s create
            something amazing together.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="bg-black/50 border-cyan-500/30 focus:border-cyan-400 h-12 text-white placeholder:text-gray-500"
                  />
                  <div className="absolute inset-0 -z-10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute -inset-0.5 bg-cyan-500/20 blur-md rounded-md"></div>
                  </div>
                </div>

                <div className="relative">
                  <Input
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your Email"
                    required
                    className="bg-black/50 border-cyan-500/30 focus:border-cyan-400 h-12 text-white placeholder:text-gray-500"
                  />
                  <div className="absolute inset-0 -z-10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute -inset-0.5 bg-cyan-500/20 blur-md rounded-md"></div>
                  </div>
                </div>

                <div className="relative">
                  <Textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="bg-black/50 border-cyan-500/30 focus:border-cyan-400 min-h-[150px] text-white placeholder:text-gray-500 resize-none"
                  />
                  <div className="absolute inset-0 -z-10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute -inset-0.5 bg-cyan-500/20 blur-md rounded-md"></div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group bg-transparent border border-cyan-500 hover:bg-cyan-950/30 text-cyan-400 py-6 rounded-md overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending Transmission..." : "Send Transmission"}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -inset-1 bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-cyan-300">Connect With Me</h3>

                <p className="text-gray-300 mb-8">
                  I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your
                  vision.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>sharazsony@gmail.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-medium mb-4 text-cyan-300">Find Me On</h4>

                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-black/60 border border-cyan-500/30 rounded-full text-cyan-400 hover:text-white transition-colors duration-300">
                        {link.icon}
                        <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Mock API handler (for demonstration purposes)
const mockApiHandler = async (req: any, res: any) => {
  if (req.method === "POST") {
    // Simulate a delay to mimic network latency
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate a successful response
    res.status(200).json({ message: "Email sent successfully" })
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

// Mock fetch implementation (for demonstration purposes)
const fetch = async (url: string, options: any) => {
  if (url === "/api/send-email" && options.method === "POST") {
    const req = { method: "POST", body: options.body }
    const res = {
      status: (code: number) => ({
        json: (data: any) => ({ ok: code === 200, ...data }),
      }),
    }

    await mockApiHandler(req, res)
    return res.status(200).json({ message: "Email sent successfully" })
  }

  return { ok: false }
}