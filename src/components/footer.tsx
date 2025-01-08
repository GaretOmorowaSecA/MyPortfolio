import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll'; 
import {  
  FaGithub, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaHome,
  FaUser,
  FaLaptopCode,
  FaProjectDiagram,
  FaFileAlt,
  FaAddressCard
} from 'react-icons/fa';
import { useThemeMode } from '../context/ThemeContext';

const COLOR_SCHEMES = {
  web: {
    primary: '#1E293B',
    secondary: '#F8FAFC',
    accent: '#FACC15',
    text: '#F8FAFC',
    linkHover: '#3B82F6',
    divider: '#4B5563',
    background: 'linear-gradient(135deg, #1E293B 0%, #2C3E50 100%)'
  },
  design: {
    primary: '#9333EA',
    secondary: '#F0F4C3',
    accent: '#FF3E00',
    text: '#181818',
    linkHover: '#22C55E',
    divider: '#A855F7',
    background: 'linear-gradient(135deg, #9333EA 0%, #6A0572 100%)'
  }
};

const Footer: React.FC = () => {
  const { mode } = useThemeMode();
  const currentColorScheme = COLOR_SCHEMES[mode];
  const [isEasterEggVisible, setIsEasterEggVisible] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  const navigationLinks = [
    { name: 'Home', path: 'introduction', icon: FaHome },
    { name: 'About', path: 'about', icon: FaUser },
    { name: 'Skills', path: 'skills', icon: FaLaptopCode },
    { name: 'Projects', path: 'projects', icon: FaProjectDiagram },
    { name: 'Resume', path: 'resume', icon: FaFileAlt },
    { name: 'Contact', path: 'contact', icon: FaAddressCard }
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: FaGithub, 
      url: 'https://github.com/GaretOmorowaSecA',
      color: '#333',
      hoverEffect: {
        scale: 1.2,
        rotate: 360,
        backgroundColor: '#33333320'
      }
    },
  ];
  const ParticleBackground = () => {
    const particleCount = window.innerWidth < 640 ? 30 : 50;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (window.innerWidth < 640 ? 3 : 5) + 1,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3
    }));

    return (
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: mode === 'design' 
                ? `${currentColorScheme.accent}30` 
                : `${currentColorScheme.accent}30`,
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity
            }}
            animate={{
              x: [-15, 15, -15],
              y: [0, 15, -15],
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, 1, particle.opacity]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </motion.div>
    );
  };

  const EasterEggConfetti = () => {
    const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7'];
    
    return (
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5
            }}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 100,
              x: Math.random() * window.innerWidth,
              opacity: [1, 0.5, 0],
              rotate: [0, Math.random() * 360, Math.random() * 720]
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 0.5
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.footer
      className="relative py-12 overflow-hidden"
      style={{ 
        background: currentColorScheme.background,
        color: currentColorScheme.text
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Navigation Links with Section Divider */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-6  border-b-2 pb-2" 
                style={{ borderColor: currentColorScheme.divider }}>
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon; 
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-2 cursor-pointer hover:text-opacity-80 transition-all"
                  >
                    <IconComponent />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Information with Enhanced Styling */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" 
                style={{ borderColor: currentColorScheme.divider }}>
              Get in Touch
            </h3>
            <div className="space-y-4">
              <motion.a 
                href="mailto:omorowagaret@gmail.com"
                className="flex items-center justify-center md:justify-start gap-2"
                style={{ color: currentColorScheme.text }}
                whileHover={{ 
                  scale: 1.05,
                  color: currentColorScheme.linkHover
                }}
              >
                <FaEnvelope />
                omorowagaret@gmail.com
              </motion.a>
              <motion.a 
                href="tel:+14372339269"
                className="flex items-center justify-center md:justify-start gap-2"
                style={{ color: currentColorScheme.text }}
                whileHover={{ 
                  scale: 1.05,
                  color: currentColorScheme.linkHover
                }}
              >
                <FaPhone />
                +1 (437) 233-9269
              </motion.a>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FaMapMarkerAlt />
                <p>2775 Jane Street, Toronto, ON, Canada</p>
              </div>
            </div>
          </div>

          {/* Social Media Icons with Advanced Interactions */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-6 border-b-2 pb-2" 
                style={{ borderColor: currentColorScheme.divider }}>
              Connect
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon; 
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl sm:text-3xl"
                    style={{ color: link.color }}
                    whileHover={{ 
                      scale: link.hoverEffect.scale,
                      rotate: link.hoverEffect.rotate,
                      backgroundColor: link.hoverEffect.backgroundColor
                    }}
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright and Easter Egg Section */}
        <div className="text-center mt-8 relative">
          <motion.p
            className={`text-sm ${mode === 'design' ? 'text-white-600' : 'text-white-300'}`}
            onHoverStart={() => setIsEasterEggVisible(true)}
            onHoverEnd={() => setIsEasterEggVisible(false)}
          >
            © {new Date().getFullYear()} Garet Omorowa. All rights reserved.
            {isEasterEggVisible && (
              <motion.span
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-white p-1 rounded shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Thanks for visiting!
              </motion.span>
            )}
          </motion.p>
        </div>
      </div>

      {/* Easter Egg Confetti Animation */}
      {isEasterEggVisible && <EasterEggConfetti />}
    </motion.footer>
  );
};

export default Footer;