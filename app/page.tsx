"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useState, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Star, Send } from "lucide-react";
import { useMagnetic } from "@/hooks/use-magnetic";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

interface WorkItemProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

interface TestimonialCardProps {
  author: string;
  role: string;
  company: string;
  content: string;
}

const MagneticButton = ({ children, className = "" }: MagneticButtonProps) => {
  const { ref, position } = useMagnetic();
  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const WorkItem = ({ title, description, image, index }: WorkItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="flex flex-col md:flex-row items-center gap-8 mb-32"
    >
      <div className="flex-1">
        <motion.h3 
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-400 text-lg mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {description}
        </motion.p>
        <MagneticButton>
          <motion.button
            whileHover={{ x: 10 }}
            className="flex items-center gap-2 text-blue-500"
          >
            View Case Study <ArrowRight className="w-5 h-5" />
          </motion.button>
        </MagneticButton>
      </div>
      <motion.div
        className="flex-1 relative aspect-[4/3] overflow-hidden rounded-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const TestimonialCard = ({ author, role, company, content }: TestimonialCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-neutral-800 p-8 rounded-2xl"
    >
      <p className="text-xl mb-6">{content}</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          {author.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold">{author}</h4>
          <p className="text-sm text-gray-400">{role} at {company}</p>
        </div>
      </div>
    </motion.div>
  );
};

const works = [
  {
    title: "Immersive Virtual Gallery",
    description: "A groundbreaking digital art platform that redefines how we experience contemporary art in the digital age.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Future of Finance",
    description: "Revolutionary fintech platform that brings blockchain technology to traditional banking systems.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Connected Living",
    description: "Smart home ecosystem that seamlessly integrates IoT devices with intuitive user experiences.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=2000&q=80",
  },
] as const;

const testimonials = [
  {
    author: "Sarah Chen",
    role: "Creative Director",
    company: "ArtSpace Digital",
    content: "The team's attention to detail and innovative approach to digital experiences has transformed how we showcase art online. Simply outstanding.",
  },
  {
    author: "Marcus Rodriguez",
    role: "CEO",
    company: "TechFin Solutions",
    content: "Their work on our financial platform exceeded all expectations. The user experience is seamless, and the animations are butter-smooth.",
  },
  {
    author: "Emily Watson",
    role: "Product Lead",
    company: "SmartHome Co",
    content: "The interface they designed for our IoT platform is both beautiful and intuitive. Our user engagement has increased by 300%.",
  },
  {
    author: "James Mitchell",
    role: "Marketing Director",
    company: "Global Innovations",
    content: "Working with this team was a game-changer. They brought our vision to life with creativity and technical excellence.",
  },
] as const;

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  const y = useParallax(smoothProgress, 300);

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,24,0.8),rgba(0,0,0,1))]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              We Create
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Digital Magic
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Award-winning digital studio crafting immersive experiences
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Works Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {works.map((work, index) => (
            <WorkItem key={index} {...work} index={index} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <Star className="w-12 h-12 mx-auto mb-6 text-yellow-500" />
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Client Stories</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, #2563eb 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, #2563eb 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, #2563eb 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, #2563eb 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Send className="w-16 h-16 mx-auto mb-8 text-blue-500" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's Create Together</h2>
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 mx-auto"
              >
                Start a Project
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}