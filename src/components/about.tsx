import React, { useState, useRef, ReactNode } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform 
} from 'framer-motion';
import { 
  FaCode, 
  FaPalette, 
  FaLightbulb, 
  FaRocket 
} from 'react-icons/fa';

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

const COLOR_SCHEMES = {
  web: {
    primary: '#3B82F6',     
    secondary: '#1E293B',   
    accent: '#FACC15',     
    background: '#F8FAFC',  
    text: '#111827',        
    gradient: {
      from: '#1E293B',
      via: '#3B82F6', 
      to: '#111827'
    }
  },
  design: {
    primary: '#9333EA',     
    secondary: '#FF3E00',   
    accent: '#22C55E',     
    background: '#F0F4C3', 
    text: '#181818',        
    gradient: {
      from: '#9333EA',
      via: '#FF3E00', 
      to: '#22C55E'
    }
  }
};

interface MilestoneData {
  id: string;
  year: string;
  title: string;
  description: string;
  technologies: string[];
  impact: number;
  achievements: string[];
  challenges: string[];
  image: string;
  icon: ReactNode;
}

interface ThemeModeContextType {
  mode: 'web' | 'design';
  toggleMode: () => void;
}

const useThemeMode = (): ThemeModeContextType => {
  const [mode, setMode] = useState<'web' | 'design'>('web');
  
  const toggleMode = () => {
    setMode(mode === 'web' ? 'design' : 'web');
  };

  return { mode, toggleMode };
};

const MilestoneIcons = {
  design: <FaPalette className="w-10 h-10 text-[#9333EA]" />,
  code: <FaCode className="w-10 h-10 text-[#3B82F6]" />,
  innovation: <FaLightbulb className="w-10 h-10 text-[#22C55E]" />,
  launch: <FaRocket className="w-10 h-10 text-[#FF3E00]" />
};

const About: React.FC = () => {
  const { mode } = useThemeMode();
  const currentColorScheme = COLOR_SCHEMES[mode];
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneData | null>(null);

  const milestones: MilestoneData[] = [
    {
      id: 'milestone-1',
      year: '2018',
      title: 'Design Inception',
      description: 'Pioneering visual storytelling through innovative design methodologies.',
      technologies: ['Adobe Creative Suite', 'Figma', 'Sketch'],
      impact: 85,
      achievements: [
        'Developed award-winning design system',
        'Implemented user-centric design approach',
      ],
      challenges: [
        'Overcoming traditional design limitations',
        'Creating scalable visual language',
      ],
      image: '/MyPortfolio/images/design_inception.jpeg',
      icon: MilestoneIcons.design,
    },
    {
      id: 'milestone-2',
      year: '2021',
      title: 'Code Revolution',
      description: 'Transforming conceptual designs into scalable digital experiences.',
      technologies: ['React', 'TypeScript', 'Next.js'],
      impact: 90,
      achievements: [
        'Built complex web applications',
        'Implemented advanced state management',
      ],
      challenges: [
        'Integrating complex frontend architectures',
        'Optimizing performance at scale',
      ],
      image: '/MyPortfolio/images/code_revolution.jpeg',
      icon: MilestoneIcons.code,
    },
    {
      "id": "milestone-3",
      "year": "2023",
      "title": "Innovative Fusion",
      "description": "Bridging design, technology, and user experience.",
      "technologies": ["Web Design", "UI/UX", "Responsive Design"],
      "impact": 95,
      "achievements": [
        "Developed advanced web design tools",
        "Created user-centered UI/UX solutions"
      ],
      "challenges": [
        "Balancing innovative design with user needs",
        "Ensuring seamless technology integration"
      ],
      "image": "/MyPortfolio/images/innovation_design.jpeg",
      icon: MilestoneIcons.innovation,
    },
  ];
 
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const renderMilestoneDetails = (milestone: MilestoneData) => {
    const { primary, secondary, accent, text } = currentColorScheme;

    return (
      <motion.div 
        className={`
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-8 
          p-8 
          rounded-3xl 
          shadow-2xl 
          bg-gradient-to-br 
          ${mode === 'design' 
            ? 'from-[#9333EA] to-[#FF3E00]' 
            : 'from-[#1E293B] to-[#3B82F6]'
          }
        `}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Detailed Milestone Content */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {milestone.icon}
            <h2 
              className="text-4xl font-bold"
              style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
            >
              {milestone.title}
            </h2>
          </div>

          <p 
            className="text-lg"
            style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
          >
            {milestone.description}
          </p>

          {/* Technology Visualization */}
          <div className="flex flex-wrap gap-3">
            {milestone.technologies.map((tech) => (
              <span 
                key={tech}
                className="
                  px-4 
                  py-2 
                  rounded-full 
                  text-sm 
                  font-semibold
                  transition 
                  hover:scale-110
                "
                style={{ 
                  backgroundColor: accent,
                  color: text
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Impact and Achievements Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
              >
                Key Achievements
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                {milestone.achievements.map((achievement) => (
                  <li 
                    key={achievement}
                    className="text-sm"
                    style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
              >
                Challenges Overcome
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                {milestone.challenges.map((challenge) => (
                  <li 
                    key={challenge}
                    className="text-sm"
                    style={{ color: mode === 'design' ? '#F0F4C3' : 'white' }}
                  >
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Image or Media Showcase */}
        {milestone.image && (
          <motion.img 
            src={milestone.image}
            alt={milestone.title}
            className="
              w-full 
              h-full 
              object-cover 
              rounded-2xl 
              shadow-2xl
            "
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <motion.section 
      ref={containerRef}
      className={`
        relative 
        min-h-screen 
        p-8 
        md:p-16 
        bg-gradient-to-tl 
        ${mode === 'design' 
          ? 'from-[#9333EA] via-[#FF3E00] to-[#22C55E]' 
          : 'from-[#1E293B] via-[#3B82F6] to-[#111827]'
        }
      `}
      style={{ scale, opacity }}
    >
      <h1 className="text-5xl font-bold text-center mb-10" style={{ color: currentColorScheme.text }}>
        Evolutionary Milestones
      </h1>
      <AnimatePresence>
        {milestones.map((milestone) => (
          <motion.div 
            key={milestone.id}
            onClick={() => setSelectedMilestone(milestone)}
            className="cursor-pointer"
          >
            {renderMilestoneDetails(milestone)}
          </motion.div>
        ))}
      </AnimatePresence>
      {selectedMilestone && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedMilestone(null)}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {renderMilestoneDetails(selectedMilestone)}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default About;

