import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPaintBrush, 
  FaVectorSquare, 
  FaFigma,
  FaVideo,   FaCube, 
  FaJsSquare, 
  FaReact, 
  FaPython, 
  FaWordpress, 
  FaNodeJs, 
  FaCode,
  FaCogs,
  FaMicrosoft
} from 'react-icons/fa';

import { useThemeMode } from '../context/ThemeContext';

const COLOR_SCHEMES = {
  web: {
    primary: '#3B82F6',     
    secondary: '#1E293B',   
    accent: '#FACC15',      
    background: '#F8FAFC',  
    text: '#111827',        
    gradient: {
      from: '#3B82F6',
      via: '#FACC15',
      to: '#1E293B'
    }
  },
  design: {
    primary: '#22C55E',     
    secondary: '#9333EA',  
    accent: '#FF3E00',      
    background: '#F0F4C3',  
    text: '#181818',        
    gradient: {
      from: '#22C55E',
      via: '#9333EA',
      to: '#FF3E00'
    }
  }
};

interface Skill {
  name: string;
  level: number;
  category: 'design' | 'development';
  icon: React.ElementType;
  description: string;
  color: string;
  tools: string[];
  projects: number;
}

const Skills: React.FC = () => {
  const { mode } = useThemeMode();
  const currentColorScheme = COLOR_SCHEMES[mode];
  
  const [activeCategory, setActiveCategory] = useState<'design' | 'development'>(
    mode === 'design' ? 'design' : 'development'
  );
  
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const skillDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveCategory(mode === 'design' ? 'design' : 'development');
  }, [mode]);


  const skills: Skill[] = [
    {
      name: 'Photoshop',
      level: 95,
      category: 'design',
      icon: FaPaintBrush,
      description: 'Advanced image manipulation and graphic design',
      color: mode === 'web' ? '#3B82F6' : '#22C55E',
      tools: ['Layer Styles', 'Compositing', 'Photo Retouching'],
      projects: 50
    },
    {
      name: 'Illustrator',
      level: 90,
      category: 'design',
      icon: FaVectorSquare,
      description: 'Vector graphics and logo creation',
      color: mode === 'web' ? '#FACC15' : '#9333EA',
      tools: ['Vector Drawing', 'Logo Design', 'Illustration'],
      projects: 40
    },
    {
      name: 'Figma',
      level: 85,
      category: 'design',
      icon: FaFigma,
      description: 'UI/UX design and prototyping',
      color: mode === 'web' ? '#1E293B' : '#FF3E00',
      tools: ['Wireframing', 'Prototyping', 'Design Systems'],
      projects: 30
    },
    {
      name: 'Adobe XD',
      level: 80,
      category: 'design',
      icon: FaVideo, 
      description: 'Designing and prototyping user interfaces',
      color: mode === 'web' ? '#FF3E00' : '#3B82F6',
      tools: ['Interactive Prototyping', 'UI Components', 'Collaboration'],
      projects: 20
    },
    {
      name: 'Blender',
      level: 75,
      category: 'design',
      icon: FaCube,
      description: '3D modeling and animation for creative projects',
      color: mode === 'web' ? '#9333EA' : '#22C55E',
      tools: ['Modeling', 'Texturing', 'Rendering'],
      projects: 15
    },
  
    {
      name: 'JavaScript',
      level: 90,
      category: 'development',
      icon: FaJsSquare,
      description: 'Full-stack web development',
      color: mode === 'web' ? '#FACC15' : '#22C55E',
      tools: ['ES6+', 'Async Programming', 'Functional Programming'],
      projects: 45
    },
    {
      name: 'React',
      level: 95,
      category: 'development',
      icon: FaReact,
      description: 'Modern frontend framework expertise',
      color: mode === 'web' ? '#3B82F6' : '#9333EA',
      tools: ['Hooks', 'Redux', 'Next.js'],
      projects: 55
    },
    {
      name: 'Python',
      level: 85,
      category: 'development',
      icon: FaPython,
      description: 'Backend development and data science',
      color: mode === 'web' ? '#1E293B' : '#FF3E00',
      tools: ['Django', 'Flask', 'Data Analysis'],
      projects: 35
    },
    {
      name: 'WordPress',
      level: 80,
      category: 'development',
      icon: FaWordpress,
      description: 'Building and customizing websites with CMS',
      color: mode === 'web' ? '#21759B' : '#FF3E00',
      tools: ['Theme Development', 'Plugins', 'SEO Optimization'],
      projects: 40
    },
    {
      name: 'Node.js',
      level: 85,
      category: 'development',
      icon: FaNodeJs,
      description: 'Server-side development for scalable applications',
      color: mode === 'web' ? '#3B82F6' : '#22C55E',
      tools: ['Express.js', 'REST APIs', 'Real-Time Applications'],
      projects: 30
    },
    {
      name: 'TypeScript',
      level: 80,
      category: 'development',
      icon: FaCode,
      description: 'Enhancing JavaScript with static typing',
      color: mode === 'web' ? '#3178C6' : '#9333EA',
      tools: ['Interfaces', 'Generics', 'Type Inference'],
      projects: 25
    },
  
    {
      name: 'Office 365',
      level: 80,
      category: 'development',
      icon: FaMicrosoft,
      description: 'Proficient in Office 365 tools for work and collaboration',
      color: mode === 'web' ? '#1E293B' : '#FF3E00',
      tools: ['Excel', 'PowerPoint', 'Word', 'Teams'],
      projects: 20
    },
    {
      name: 'Corel Draw',
      level: 75,
      category: 'design',
      icon: FaPaintBrush,
      description: 'Vector graphic design and illustrations',
      color: mode === 'web' ? '#9333EA' : '#22C55E',
      tools: ['Vector Graphics', 'Logo Design', 'Digital Art'],
      projects: 15
    },
    {
      name: 'Computer Installation',
      level: 85,
      category: 'development',
      icon: FaCogs,
      description: 'Installation and setup of computer systems and software',
      color: mode === 'web' ? '#3B82F6' : '#FF3E00',
      tools: ['Hardware Setup', 'System Configuration', 'Software Installation'],
      projects: 20
    }
  ];
  
    const ParticleBackground = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      delay: Math.random() * 2
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
            className={`absolute rounded-full ${
              mode === 'design' 
                ? 'bg-[#9333EA]/50' 
                : 'bg-[#3B82F6]/50'
            }`}
            initial={{
              position: 'absolute',
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: 0
            }}
            animate={{
              x: [-10, 10, -10],
              y: [0, 10, -10],
              opacity: [0, 1, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: particle.delay
              }
            }}
          />
        ))}
      </motion.div>
    );
  };

  const SkillCarousel = () => {
    const filteredSkills = skills.filter(skill => skill.category === activeCategory);
    
    return (
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredSkills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <motion.div
              key={skill.name}
              className={`
                p-4 
                rounded-lg 
                cursor-pointer 
                text-center 
                transition-all 
                duration-300
                relative
                group
                ${mode === 'web' 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-white/20 hover:bg-white/40 text-black'
                }
                hover:shadow-lg
                ${selectedSkill?.name === skill.name ? 'scale-110 shadow-2xl' : ''}
              `}
              onClick={() => setSelectedSkill(skill)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="text-5xl mb-2 flex justify-center"
                style={{ color: skill.color }}
              >
                <IconComponent />
              </div>
              <h3 
                className="text-xl font-semibold"
                style={{ 
                  color: mode === 'web' 
                    ? currentColorScheme.primary 
                    : currentColorScheme.primary 
                }}
              >
                {skill.name}
              </h3>
    
              <div 
                className="w-full h-1 mt-2 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${
                    mode === 'web' 
                      ? currentColorScheme.primary 
                      : currentColorScheme.primary
                  } ${skill.level}%, #E5E7EB 0%)`
                }}
              />
              <div 
                className="text-xs mt-1 opacity-70"
                style={{ 
                  color: mode === 'web' 
                    ? 'white' 
                    : currentColorScheme.text 
                }}
              >
                Proficiency: {skill.level}%
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  const SkillDetailsModal = () => {
    if (!selectedSkill) return null;

    const IconComponent = selectedSkill.icon;

    return (
        <motion.div 
        ref={skillDetailsRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => setSelectedSkill(null)}
      >
        <motion.div 
          className={`
            rounded-2xl 
            p-4 
            sm:p-6 
            md:p-8 
            w-full 
            max-w-md 
            mx-4 
            shadow-2xl
            relative
            ${mode === 'design' 
              ? 'bg-gradient-to-br from-[#22C55E] to-[#9333EA]' 
              : 'bg-gradient-to-br from-[#1E293B] to-[#3B82F6]'
            }
            text-white
          `}

          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >

            <button 
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => setSelectedSkill(null)}
            className={`
              absolute 
              top-4 
              right-4 
              w-10 
              h-10 
              flex 
              items-center 
              justify-center 
              rounded-full 
              transition-all 
              duration-300
              ${mode === 'design' 
                ? 'hover:bg-[#9333EA] hover:text-white' 
                : 'hover:bg-[#3B82F6] hover:text-white'
              }
            `}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          <div className="flex items-center mb-4 sm:mb-6">
            <IconComponent 
              className={`text-4xl sm:text-6xl mr-2 sm:mr-4`}
              style={{ color: selectedSkill.color }}
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {selectedSkill.name}
            </h2>
          </div>
          
          <p className="mb-4 text-sm sm:text-base text-gray-300">
            {selectedSkill.description}
          </p>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Key Tools:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSkill.tools.map((tool) => (
                <span 
                  key={tool} 
                  className={`
                    px-2 
                    py-1 
                    text-xs 
                    sm:text-sm
                    ${mode === 'design' 
                      ? 'bg-[#22C55E]/20 text-[#22C55E]' 
                      : 'bg-[#3B82F6]/20 text-[#3B82F6]'
                    }
                    rounded-full
                  `}
                >
                  {tool}
                </span>
              ))}
            </div>
          </ div>

          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-sm sm:text-base">Proficiency</p>
              <div className="flex items-center">
                <div 
                  className="w-16 h-2 rounded-full mr-2"
                  style={{
                    background: `linear-gradient(to right, ${
                      mode === 'design' ? '#22C55E' : '#3B82F6'
                    } ${selectedSkill.level}%, #E5E7EB 0%)`
                  }}
                />
                <span className="text-sm sm:text-base">{selectedSkill.level}%</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base">Projects</p>
              <p className="text-sm sm:text-base">{selectedSkill.projects}+</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.section 
      className={`
        relative min-h-screen p-6 sm:p-12
        ${mode === 'design' 
          ? 'bg-[#F0F4C3]' 
          : currentColorScheme.background
        }
        ${mode === 'design' ? 'text-black' : 'text-white'}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ParticleBackground />
      <div className="container mx-auto text-center">
        <h2 
          className={`
            text-3xl sm:text-4xl font-bold mb-4 sm:mb-6
            ${mode === 'design' ? 'text-black' : 'text-white'}
          `}
        >
          My Skills
        </h2>
        <div className="flex justify-center mb-4 space-x-2 sm:space-x-4">
          <button 
            className={`
              px-3 sm:px-4 
              py-1 sm:py-2 
              text-sm sm:text-base
              rounded-lg 
              transition-all 
              duration-300
              ${activeCategory === 'design' 
                ? (mode === 'design' 
                  ? 'bg-[#9333EA] text-white' 
                  : 'bg-[#3B82F6] text-white') 
                : (mode === 'design'
                  ? 'bg-gray-200 text-black hover:bg-gray-300'
                  : 'bg-white/20 text-white hover:bg-white/30')
              }
            `}
            onClick={() => setActiveCategory('design')}
          >
            Design
          </button>
          <button 
            className={`
              px-3 sm:px-4 
              py-1 sm:py-2 
              text-sm sm:text-base
              rounded-lg 
              transition-all 
              duration-300
              ${activeCategory === 'development' 
                ? (mode === 'design' 
                  ? 'bg-[#22C55E] text-white' 
                  : 'bg-[#3B82F6] text-white') 
                : (mode === 'design'
                  ? 'bg-gray-200 text-black hover:bg-gray-300'
                  : 'bg-white/20 text-white hover:bg-white/30')
              }
            `}
            onClick={() => setActiveCategory('development')}
          >
            Development
          </button>
        </div>
        <SkillCarousel />
        <AnimatePresence>
          {selectedSkill && <SkillDetailsModal />}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Skills;
