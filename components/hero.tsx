"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import * as THREE from "three"; // Import THREE correctly
import Image from "next/image";

// Particle system component (unchanged)
function DataStreams() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    speeds[i] = Math.random() * 0.01 + 0.002;
  }

  useFrame(() => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= speeds[i];

      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 5;
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00ffff" transparent opacity={0.8} />
    </points>
  );
}

// Main Hero component
export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  // Add the role animation state and roles array here
  const [currentRole, setCurrentRole] = useState(0); // Track the current role index
  const roles = ["I am a Web Developer", "I am a Data Analyst", "I am a Python Developer"]; // Array of roles

  // Typewriter effect for the text
  useEffect(() => {
    if (!textRef.current) return;

    const text = "Decoding Data, Unlocking Possibilities";
    const element = textRef.current;
    element.innerText = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.innerText += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);

    // Animate profile rotation
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.01) % (2 * Math.PI));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Add the role cycling effect here
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length); // Update role index
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(interval);
  }, [roles.length]);

  // Scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-repeat"></div>

      {/* 3D Scene for particles */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#4b0082" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
          <DataStreams />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Profile Image with glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto mb-8 w-48 h-48"
          style={{ transform: `rotateY(${rotation}rad)` }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-md opacity-70"></div>

          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 blur-sm opacity-50"></div>

          {/* Image container */}
          <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-cyan-400">
            <Image
              src="/profile1.png" // Replace with your profile photo path
              alt="what is your name"
              width={200}
              height={200}
              className="w-full h-full object-cover"
              priority // Ensure the image loads quickly
            />
          </div>

          {/* Animated ring */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-pulse"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 glitch-text"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">
            Sharaz Masih
          </span>
        </motion.h1>

        {/* Replace the existing text section with the role animation */}
       
        <motion.div
          key={currentRole} // Use key to trigger animation on role change
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-2xl md:text-3xl font-bold mb-8"
          style={{
            color: "transparent", // Make the text color transparent
            WebkitTextStroke: "2px white", // Add a cyan outline to the text
            textShadow: "0 0 10px rgb(8, 113, 183), 0 0 20px rgb(46, 227, 227)", // Optional: Add a glow effect
          }}
        >
          {roles[currentRole]}
        </motion.div>
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Button
            onClick={scrollToAbout}
            className="relative group bg-transparent border border-cyan-500 hover:bg-cyan-950/30 text-cyan-400 px-8 py-6 rounded-md overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">Explore My Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-1 bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-cyan-400 animate-bounce" />
      </motion.div>
    </section>
  );
}