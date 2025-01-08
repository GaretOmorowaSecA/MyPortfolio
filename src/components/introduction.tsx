/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';
import { Link as ScrollLink } from 'react-scroll';
import { 
  FaPaintBrush, 
  FaCode, 
  FaLaptopCode, 
  FaRocket, 
  FaDesktop, 
  FaBrain 
} from 'react-icons/fa';

const COLOR_SCHEMES = {
  web: {
    primary: '#1E293B',    
    secondary: '#3B82F6',  
    accent: '#FACC15',     
    background: '#F8FAFC', 
    text: '#111827'        
  },
  design: {
    primary: '#FF3E00',    
    secondary: '#22C55E',  
    accent: '#9333EA',     
    background: '#F0F4C3', 
    text: '#181818'        
  }
};

interface Role {
  title: string;
  description: string;
  skills: string[];
  icon: React.ElementType;
  color: string;
}

const backgroundGradients = {
  web: 'bg-gradient-to-br from-[#1E293B] via-[#2C3E50] to-[#111827]',
  design: 'bg-gradient-to-br from-[#FF3E00] via-[#9333EA] to-[#22C55E]'
};

const Introduction: React.FC = () => {
  const { mode } = useThemeMode();
  const currentColorScheme = COLOR_SCHEMES[mode];
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const roles = useMemo<Record<'design' | 'web', Role[]>>(() => ({
    design: [
      {
        title: 'Graphic Designer',
        description: 'Creating visual narratives that speak volumes',
        skills: ['Branding', 'UI/UX', 'Illustration'],
        icon: FaPaintBrush,
        color: currentColorScheme.primary
      },
      {
        title: 'Branding Specialist',
        description: 'Crafting identities that resonate and inspire',
        skills: ['Logo Design', 'Brand Strategy', 'Visual Identity'],
        icon: FaRocket,
        color: currentColorScheme.secondary
      },
      {
        title: 'Creative Illustrator',
        description: 'Transforming concepts into visual masterpieces',
        skills: ['Digital Art', 'Concept Design', 'Storytelling'],
        icon: FaDesktop,
        color: currentColorScheme.primary
      }
    ],
    web: [
      {
        title: 'Web Developer',
        description: 'Engineering digital solutions with precision',
        skills: ['Full Stack', 'React', 'Node.js'],
        icon: FaCode,
        color: currentColorScheme.secondary
      },
      {
        title: 'Programmer',
        description: 'Solving complex problems through code',
        skills: ['Algorithm Design', 'System Architecture', 'Performance Optimization'],
        icon: FaBrain,
        color: currentColorScheme.accent
      },
      {
        title: "Tech Innovator",
        description: "Pushing boundaries of digital possibilities",
        skills: ["Web Development", "Cloud Solutions", "Innovation in Technology"],
        icon: FaLaptopCode,
        color: "currentColorScheme.primary"
      }      
    ]
  }), [mode]);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typingState, setTypingState] = useState({
    text: '',
    isTyping: true,
    completed: false
  });

  useEffect(() => {
    const currentRoles = mode === 'design' ? roles.design : roles.web;
    const currentRole = currentRoles[currentRoleIndex];
    let typingTimer: NodeJS.Timeout;

    if (typingState.isTyping) {
      if (typingState.text.length < currentRole.title.length) {
        typingTimer = setTimeout(() => {
          setTypingState(prev => ({
            ...prev,
            text: currentRole.title.slice(0, prev.text.length + 1)
          }));
        }, 100);
      } else {
        typingTimer = setTimeout(() => {
          setTypingState(prev => ({
            ...prev,
            isTyping: false,
            completed: true
          }));
        }, 2000);
      }
    } else {
      if (typingState.text.length > 0) {
        typingTimer = setTimeout(() => {
          setTypingState(prev => ({
            ...prev,
            text: prev.text.slice(0, -1)
          }));
        }, 50);
      } else {
        setCurrentRoleIndex(prev => (prev + 1) % currentRoles.length);
        setTypingState({
          text: '',
          isTyping: true,
          completed: false
        });
      }
    }

    return () => clearTimeout(typingTimer);
  }, [currentRoleIndex, typingState, mode, roles]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  }, [mouseX, mouseY]);

  
  const generateDynamicBackground = useCallback(() => {
    return (
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
      >
        {[...Array(30)].map((_, i) => {
          const particleX = useTransform(
            mouseX, 
            [0, containerRef.current?.clientWidth || 0], 
            [0, Math.random() * 100 - 50]
          );
          const particleY = useTransform(
            mouseY, 
            [0, containerRef.current?.clientHeight || 0], 
            [0, Math.random() * 100 - 50]
          );

          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-sm"
              style={{
                backgroundColor: mode === 'web' 
                  ? currentColorScheme.secondary 
                  : currentColorScheme.accent,
                width: `${Math.random() * 80 + 20}px`,
                height: `${Math.random() * 80 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                x: particleX,
                y: particleY,
                opacity: 0.1,
                backdropFilter: 'blur(10px)'
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          );
        })}
      </motion.div>
    );
  }, [mode, currentColorScheme]);

  const SkillShowcase: React.FC = useCallback(() => {
    const currentRoles = mode === 'design' ? roles.design : roles.web;
    const currentRole = currentRoles[currentRoleIndex];
    const IconComponent = currentRole.icon;

    return (
      <motion.div 
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ color: currentRole.color }}
      >
        <div className="text-6xl">
          <IconComponent />
        </div>
        <div className="text-2xl font-bold">
          {currentRole.title}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {currentRole.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`px-3 py-1 bg-white/20 rounded-full ${mode === 'web' ? 'text-white' : 'text-black'}`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  }, [currentRoleIndex, mode, roles]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`
        min-h-screen 
        flex flex-col justify-center items-center 
        ${backgroundGradients[mode]} 
        text-center 
        px-4 py-16 
        overflow-hidden 
        relative
      `}
      style={{ 
        color: currentColorScheme.text,
        backgroundColor: currentColorScheme.background,
        perspective: '1000px' 
      }}
    >
      {generateDynamicBackground()}
  
      <div 
        className="z-10 w-full max-w-4xl space-y-6"
        style={{
          transform: `
            rotateX(${useTransform(mouseY, [0, window.innerHeight], [-5, 5])}deg)
            rotateY(${useTransform(mouseX, [0, window.innerWidth], [-5, 5])}deg)
          `,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`
            text-5xl md:text-7xl font-extrabold 
            ${mode === 'web' ? 'text-white' : 'text-black'}
            relative
          `}
          style={{
            textShadow: mode === 'web' 
              ? '0 4px 15px rgba(59, 130, 246, 0.4)' 
              : '0 4px 15px rgba(255, 62, 0, 0.3)',
          }}
        >
          Hi, I'm <span 
            className={`
              ${mode === 'web' 
                ? 'text-[#3B82F6]' 
                : 'text-[#FF3E00]'
              } 
              animate-pulse
            `}
          >
            Garet Omorowa
          </span>
        </motion.h1>
  
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`
            text-3xl md:text-4xl font-semibold tracking-wide 
            ${mode === 'web' ? 'text-white' : 'text-black'}
          `}
        >
          {typingState.text}
          <span className="animate-blink">|</span>
        </motion.div>
  
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className={`
            text-xl md:text-2xl max-w-2xl mx-auto px-4 font-medium 
            ${mode === 'web' ? 'text-white/80' : 'text-black/80'}
          `}
        >
          Blending creativity and code to craft unforgettable experiences.
        </motion.p>
  
        <SkillShowcase />
          
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">

          <ScrollLink 
            to="contact" 
            smooth={true} 
            duration={500} 
            className={`
              px-8 py-4 rounded-full font-bold text-lg 
              transition duration-300 ease-in-out
              ${mode === 'web' 
                ? 'bg-[#3B82F6] text-white hover:bg-[#2563EB]' 
                : 'bg-[#FF3E00] text-white hover:bg-[#FF5722]'
              }
              transform hover:shadow-lg
            `}
          >
            Let's Collaborate
          </ScrollLink>

          <ScrollLink 
            to="projects" 
            smooth={true} 
            duration={500} 
            className={`
              px-8 py-4 rounded-full font-bold text-lg 
              transition duration-300 ease-in-out
              ${mode === 'web' 
                ? 'border-2 border-[#3B82F6] text-white hover:bg-[#3B82F6]/10' 
                : 'border-2 border-[#22C55E] text-black hover:bg-[#22C55E]/10'
              } 
            `}
          >
            Explore My Work
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};

export default Introduction;