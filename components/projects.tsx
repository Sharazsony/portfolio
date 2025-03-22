"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, Github } from "lucide-react"; // Import Github icon

const projects = [
  {
    id: 1,
    title: "Flex Management System",
    techStack: ["C++", "OOP", "Text Files"],
    description:
      "A comprehensive management system built with C++ that utilizes object-oriented programming principles for efficient data handling and storage in text files.",
    longDescription:
      "This project implements a robust management system using C++ with a focus on object-oriented design patterns. It features user authentication, role-based access control, and efficient data manipulation. The system uses file I/O operations to persist data in text files, making it lightweight and portable. Custom data structures ensure optimal performance even with large datasets.",
    image: "/voting.jpg?height=400&width=600",
    githubLink: "https://github.com/yourusername/flex-management-system", // Add GitHub link
  },
  {
    id: 2,

    "title": "Election Management System",
    "techStack": ["C#", ".NET Framework", "Oracle DB", "SQL", "PL/SQL"],
    "description": "Desktop application for comprehensive election data management. Features role-based access control and tracking.",
    "longDescription": "A robust and secure election management system designed for efficient handling of voter data. This application ensures role-based access control, secure database management using Oracle DB, and streamlined processes for election tracking. Built with C# and .NET Framework, it provides an intuitive user interface and ensures data integrity through SQL and PL/SQL-based operations.",
    
    image: "/voting.jpg?height=400&width=600",
    githubLink: "https://github.com/yourusername/predictive-analytics-dashboard", // Add GitHub link
  },
  {
    id: 3,
    "title": "DODGE-EM-Game",
    "description": "Console-based implementation. The player drives a brown car to collect rewards while avoiding blue opponent cars in a racing arena. Collisions reduce lives, refill rewards, and the score and lives are shown on the screen.",
    "techStack": ["C++", "Console-based", "Data Structures", "Algorithms"],
    image: "/DODGE-EM.png?height=400&width=600",
    githubLink: "https://github.com/yourusername/neural-network-classifier", // Add GitHub link
  },
  {
    id: 4,
    title: "English Dictionary",
    "description": "Console-based Dictionary. Features include efficient text storage, intelligent word suggestions based on a pre-defined dictionary using trie-based data structures, and customizable font sizes.",
    "techStack": ["C++", "Data Structures", "Algorithms", "Trie Trees", "Stack"],
    image: "/dictionary.png?height=400&width=600",
    githubLink: "https://github.com/yourusername/distributed-database-system", // Add GitHub link
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Function to handle project click
  const handleProjectClick = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    if (project?.githubLink) {
      window.open(project.githubLink, "_blank"); // Open GitHub link in a new tab
    } else {
      setSelectedProject(projectId); // Fallback to modal if no GitHub link
    }
  };

  return (
    <section id="projects" className="relative min-h-screen py-20 bg-black">
      {/* Matrix background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-repeat"></div>
      </div>

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
            Featured Projects
          </motion.h2>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="relative group perspective"
                whileHover={{
                  rotateY: 5,
                  rotateX: -5,
                  z: 10,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="relative bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => handleProjectClick(project.id)} // Updated click handler
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 group-hover:opacity-30 blur-md rounded-xl transition-opacity duration-300"></div>

                  <div className="h-48 bg-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold mb-2 text-cyan-300 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs bg-purple-950/50 border border-purple-500/30 text-purple-300 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                    <div className="text-cyan-400 text-sm font-medium flex items-center group-hover:text-cyan-300 transition-colors duration-300">
                      <Github className="w-5 h-5" /> {/* GitHub icon */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedProject(null)}
            ></motion.div>

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[80vh] overflow-y-auto z-50 bg-black/90 border border-cyan-500/30 rounded-xl p-6"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {projects.find((p) => p.id === selectedProject) && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    {projects.find((p) => p.id === selectedProject)?.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects
                      .find((p) => p.id === selectedProject)
                      ?.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="text-sm bg-purple-950/50 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>

                  <div className="mb-6 h-64 bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={projects.find((p) => p.id === selectedProject)?.image || "/placeholder.svg"}
                      alt={projects.find((p) => p.id === selectedProject)?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    {projects.find((p) => p.id === selectedProject)?.longDescription}
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}