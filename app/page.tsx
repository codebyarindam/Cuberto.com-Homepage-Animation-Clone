"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles, MousePointer2, Code, Lightbulb } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

const MagneticButton = ({ children, className = "" }) => {
  const { ref, position } = useMagnetic({ strength: 30 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      animate={shouldReduceMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  const y = useParallax(smoothProgress, 300);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    setMousePosition({ x, y });
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <Sparkles className="w-16 h-16 mx-auto text-blue-500 mb-6" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500"
          >
            We Create
            <br />
            Digital Magic
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Award-winning digital studio crafting immersive experiences that push the boundaries
            of what's possible on the web.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center gap-6 flex-wrap"
          >
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Start Project
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </MagneticButton>
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/20 px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                View Work
              </motion.button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.h2 
              style={{ scale }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500"
            >
              Selected Work
            </motion.h2>
            <p className="text-gray-400 text-lg md:text-xl">
              Discover our latest projects and creative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={containerRef} className="py-20 relative">
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-16 h-16 mx-auto mb-8 text-blue-500" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500">
              Transforming Ideas into Digital Reality
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              We specialize in creating immersive digital experiences that connect
              brands with their audience in meaningful ways.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

const ProjectCard = ({ title, description, image, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="relative aspect-[4/3] overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-8"
      >
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
        <motion.div
          whileHover={{ x: 10 }}
          className="mt-4 inline-flex items-center text-blue-400"
        >
          View Project <ArrowRight className="ml-2 w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = ({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-blue-900/20 hover:to-blue-900/5 transition-colors border border-white/5"
    >
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-12 h-12 mb-6 text-blue-400" />
      </motion.div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const projects = [
  {
    title: "Digital Experience Platform",
    description: "Interactive web platform for enterprise solutions",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Brand Evolution",
    description: "Complete brand redesign and digital transformation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "E-commerce Revolution",
    description: "Next-generation shopping experience",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mobile Innovation",
    description: "Cutting-edge mobile application design",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
];

const services = [
  {
    icon: MousePointer2,
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user experiences that delight and convert.",
  },
  {
    icon: Code,
    title: "Development",
    description: "Building robust and scalable applications with cutting-edge technologies.",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    description: "Crafting digital strategies that drive growth and engagement.",
  },
];