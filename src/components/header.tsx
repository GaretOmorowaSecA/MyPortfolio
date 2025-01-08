import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { 
  FaHome, 
  FaUser, 
  FaLaptopCode,
  FaProjectDiagram,
  FaFileAlt, 
  FaAddressCard, 
  FaPaintBrush, 
  FaCode,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useThemeMode } from '../context/ThemeContext';

const COLOR_SCHEMES = {
  web: {
    primary: '#3B82F6',     
    secondary: '#1E293B',   
    accent: '#FACC15',      
    background: '#F8FAFC',  
    text: '#111827'         
  },
  design: {
    primary: '#9333EA',     
    secondary: '#22C55E',   
    accent: '#FF3E00',      
    background: '#F0F4C3',  
    text: '#181818'         
  }
};

const Header: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();
  const currentColorScheme = COLOR_SCHEMES[mode];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { 
      name: 'Home', 
      path: 'introduction', 
      icon: FaHome,
      description: 'Welcome to my portfolio'
    },
    { 
      name: 'About', 
      path: 'about', 
      icon: FaUser,
      description: 'My journey and story'
    },
    { 
      name: 'Skills', 
      path: 'skills', 
      icon: FaLaptopCode ,
      description: 'Expertise and capabilities'
    },
    { 
      name: 'Projects', 
      path: 'projects', 
      icon: FaProjectDiagram ,
      description: 'Showcase of work'
    },
    { 
      name: 'Resume', 
      path: 'resume', 
      icon: FaFileAlt  ,
      description: 'Details info'
    },
    { 
      name: 'Contact', 
      path: 'contact', 
      icon: FaAddressCard ,
      description: 'Get in touch'
    }
  ];

const ThemeToggleButton = () => {
  return (
    <motion.button
      onClick={toggleMode}
      className={`
        flex items-center justify-center 
        px-4 py-2 rounded-full 
        transition-all duration-300 
        hover:scale-105
      `}
      style={{
        backgroundColor: mode === 'design' 
          ? 'rgba(255, 62, 0, 0.7)' 
          : `${currentColorScheme.primary}`,
        color: 'white',
        boxShadow: mode === 'design' 
          ? '0 4px 6px rgba(255, 62, 0, 0.3)' 
          : '0 4px 6px rgba(59, 130, 246, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Theme"
    >
      {mode === 'design' ? (
        <div className="flex items-center">
          <FaCode className="mr-2" />
          <span>Web Mode</span>
        </div>
      ) : (
        <div className="flex items-center">
          <FaPaintBrush className="mr-2" />
          <span>Design Mode</span>
        </div>
      )}
    </motion.button>
  );
};

const MobileMenu = () => {
  if (!isMenuOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween' }}
      className={`
        fixed top-0 left-0 right-0 bottom-0 z-40 
        flex flex-col 
        bg-gradient-to-br
        ${mode === 'design'
          ? 'from-[#9333EA] via-[#FF3E00] to-[#22C55E]'
          : 'from-[#1E293B] via-[#3B82F6] to-[#111827]'
        }
      `}
      style={{
        backgroundColor: currentColorScheme.background,
        backgroundImage: `
          linear-gradient(
            to bottom right, 
            ${mode === 'design' 
              ? 'rgba(147, 51, 234, 0.9), rgba(255, 62, 0, 0.7)' 
              : 'rgba(30, 41, 59, 0.9), rgba(59, 130, 246, 0.7)'
            }
          )
        `,
      }}
    >
      <div className="flex justify-between items-center p-4">
        <ScrollLink 
          to="introduction" 
          smooth={true} 
          duration={500}
          className="cursor-pointer text-xl font-bold"
          style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
          onClick={() => setIsMenuOpen(false)}
        >
          Garet Omorowa
        </ScrollLink>

        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setIsMenuOpen(false)}
            whileTap={{ scale: 0.9 }}
            style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
            className="text-2xl"
          >
            <FaTimes />
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow space-y-6 px-4">
        {menuItems.map((item) => (
          <ScrollLink
            key={item.path}
            to={item.path}
            smooth={true}
            duration={500}
            offset={-70}
            className="text-2xl cursor-pointer flex items-center w-full px-4 py-2 rounded-lg transition-all duration-300 hover:bg-opacity-20"
            style={{ 
              color: mode === 'design' ? '#F0F4C3' : 'white',
              backgroundColor: mode === 'design' 
                ? 'rgba(255, 62, 0, 0.2)' 
                : 'rgba(59, 130, 246, 0.2)',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <item.icon 
              className="mr-3" 
              style={{ 
                color: mode === 'design' ? '#22C55E' : '#FACC15',
                marginRight: '10px'
              }}
            />
            {item.name}
          </ScrollLink>
        ))}
      </div>
    </motion.div>
  );
};

return (
  <motion.header
    ref={headerRef}
    className={`
      fixed top-0 left-0 right-0 z-30 
      transition-all duration-300
      backdrop-blur-md shadow-sm
    `}
    style={{ 
      backgroundColor: `${currentColorScheme.background}80`, 
    }}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
  >
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      {/* Logo */}
      <ScrollLink 
        to="introduction" 
        smooth={true} 
        duration={500}
        className="cursor-pointer text-xl font-bold"
        style={{ 
          color: mode === 'design' 
            ? '#FF3E00'  
            : currentColorScheme.primary 
        }}
      >
        Garet Omorowa
      </ScrollLink>

      {/* Desktop Navigation */}

      <div className="hidden md:flex items-center space-x-6">
        {/* Desktop Menu Items */}
        {menuItems.map((item) => (
          <ScrollLink
            key={item.path}
            to={item.path}
            smooth={true}
            duration={500}
            offset={-70}
            className={`
              flex items-center cursor-pointer
              ${mode === 'design' 
                ? 'text-[#000000]'   
                : 'text-[' + currentColorScheme.secondary + ']'
              }
            `}
            style={{ 
              transition: 'color 0.3s ease',
            }}
          >
            <item.icon 
              className="mr-2" 
              style={{ 
                color: mode === 'design' 
                  ? '#9333EA'   
                  : currentColorScheme.primary 
              }}
            />
            {item.name}
          </ScrollLink>
        ))}

        {/* Theme Toggle for Desktop */}
        <ThemeToggleButton />
      </div>

      {/* Mobile Menu Toggle and Theme Toggle */}
      <div className="md:hidden flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <ThemeToggleButton />

        {/* Hamburger Menu */}
        <motion.button
          onClick={() => setIsMenuOpen(true)}
          whileTap={{ scale: 0.9 }}
          style={{ 
            color: mode === 'design' 
              ? '#FF3E00'  
              : currentColorScheme.primary 
          }}
          className="text-2xl"
        >
          <FaBars />
        </motion.button>
      </div>
    </nav>

    {/* Mobile Menu */}
    <MobileMenu />
    </motion.header>
  );
};

export default Header;