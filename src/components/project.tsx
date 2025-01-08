import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaPalette, 
  FaRocket, 
  FaFilter, 
  FaListUl, 
  FaThLarge,
  FaTimes,
  FaSearch
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
    primary: '#22C55E',    
    secondary: '#9333EA',   
    accent: '#FF3E00',      
    background: '#F0F4C3',  
    text: '#181818'         
  }
};

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'graphic-design' | 'web-development' | 'ui-ux';
  technologies: string[];
  link: string;
  complexity: number;
  tags: string[];
  featured?: boolean;
}

const Projects: React.FC = () => {
  const { mode } = useThemeMode();
  const currentColorScheme = COLOR_SCHEMES[mode];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Digital Brand Transformation',
      description: 'Comprehensive rebranding strategy for a global tech startup',
      image: '/projects/brand_design.jpeg',
      category: 'graphic-design',
      technologies: ['Adobe Creative Suite', 'Figma', 'Sketch'],
      link: '#',
      complexity: 85,
      tags: ['Branding', 'Identity', 'Marketing'],
      featured: true
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'Full-stack web application with advanced user experience',
      image: '/projects/ecommerce_dev.jpeg',
      category: 'web-development',
      technologies: ['React', 'Node.js', 'GraphQL'],
      link: '#',
      complexity: 95,
      tags: ['Frontend', 'Backend', 'Full-Stack']
    },
    {
      id: 3,
      title: 'Portfolio Showcase Website',
      description: 'Custom portfolio website for a creative professional',
      image: '/projects/portfolio_site.jpeg',
      category: 'web-development',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress'],
      link: '#',
      complexity: 70,
      tags: ['Portfolio', 'Frontend', 'WordPress']
    },
    {
      id: 4,
      title: 'Product Packaging Design',
      description: 'Creative packaging design for a luxury cosmetics brand',
      image: '/projects/packaging_design.jpeg',
      category: 'graphic-design',
      technologies: ['Adobe Illustrator', 'Photoshop'],
      link: '#',
      complexity: 80,
      tags: ['Packaging', 'Graphics', 'Marketing']
    },
    {
      id: 5,
      title: 'Responsive Corporate Website',
      description: 'Modern and responsive corporate website for a law firm',
      image: '/projects/corporate_web.jpeg',
      category: 'web-development',
      technologies: ['React', 'Tailwind CSS', 'Next.js'],
      link: '#',
      complexity: 85,
      tags: ['Frontend', 'Responsive Design', 'Corporate']
    },
    {
      id: 6,
      title: 'Social Media Campaign Design',
      description: 'Dynamic and engaging graphics for a social media marketing campaign',
      image: '/projects/social_media_design.jpeg',
      category: 'graphic-design',
      technologies: ['Canva', 'Photoshop', 'Figma'],
      link: '#',
      complexity: 75,
      tags: ['Social Media', 'Marketing', 'Graphics']
    },
    {
      id: 7,
      title: 'Online Learning Platform UI',
      description: 'Clean and intuitive user interface for an e-learning platform',
      image: '/projects/learning_platform_ui.jpeg',
      category: 'ui-ux',
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
      link: '#',
      complexity: 85,
      tags: ['UI/UX', 'Design Systems', 'E-Learning']
    },
    {
      id: 8,
      title: 'Event Landing Page Design',
      description: 'High-converting landing page for a global tech conference',
      image: '/projects/event_landing_page.jpeg',
      category: 'web-development',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      link: '#',
      complexity: 65,
      tags: ['Landing Page', 'Frontend', 'Design']
    },
    {
      id: 9,
      title: 'Logo Design for Montessori School',
      description: 'Designed a creative and child-friendly logo for a Montessori school to enhance their brand identity.',
      image: '/projects/montessori_logo.jpg',
      category: 'graphic-design',
      technologies: ['Adobe Illustrator', 'Photoshop', 'CorelDraw'],
      link: '#',
      complexity: 80,
      tags: ['Logo Design', 'Education', 'Branding'],
      featured: true
    }
  ];


  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectView, setProjectView] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      (selectedCategory === 'all' || project.category === selectedCategory) &&
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [selectedCategory, searchTerm]);


  const CategoryFilter = () => {
    const categories = [
      { value: 'all', icon: FaRocket, label: 'All Projects' },
      { value: 'graphic-design', icon: FaPalette, label: 'Design' },
      { value: 'web-development', icon: FaCode, label: 'Development' },
      { value: 'ui-ux', icon: FaFilter, label: 'UI/UX' }
    ];

    return (
      <>
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: currentColorScheme.secondary,
              color: 'white'
            }}
          >
            <FaFilter className="mr-2" />
            Filter Projects
          </button>
          <div className="flex items-center">
            <button 
              onClick={() => setProjectView('grid')}
              className={`mr-2 ${projectView === 'grid' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <FaThLarge />
            </button>
            <button 
              onClick={() => setProjectView('list')}
              className={projectView === 'list' ? 'text-blue-500' : 'text-gray-500'}
            >
              <FaListUl />
            </button>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div 
              className="fixed inset-0 z-50 bg-white"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filter Projects</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <FaTimes className="text-2xl" />
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`
                        flex 
                        w-full 
                        items-center 
                        px-4 
                        py-2 
                        rounded-full 
                        transition-all 
                        duration-300
                        ${selectedCategory === category.value 
                          ? `bg-${mode === 'web' ? '[#3B82F6]' : '[#22C55E]'} text-white` 
                          : 'bg-gray-200 text-gray-700'}
                      `}
                    >
                      <category.icon className="mr-2" />
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Filter */}
        <div className="hidden md:flex justify-center space-x-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`
                flex 
                items-center 
                px-4 
                py-2 
                rounded-full 
                transition-all 
                duration-300
                ${selectedCategory === category.value 
                  ? `bg-${mode === 'web' ? '[#3B82F6]' : '[#22C 55E]'} text-white` 
                  : 'bg-gray-200 text-gray-700'}
              `}
            >
              <category.icon className="mr-2" />
              {category.label}
            </button>
          ))}
        </div>
      </>
    );
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
      <motion.div
        className={`
          rounded-xl 
          overflow-hidden 
          shadow-lg 
          cursor-pointer
          transform 
          transition-all 
          duration-300
          ${mode === 'web' ? 'bg-[#1E293B]' : 'bg-[#9333EA]'}
        `}
        whileHover={{ 
          scale: 1.05,
          boxShadow: mode === 'web' 
            ? '0 10px 15px rgba(59, 130, 246, 0.2)' 
            : '0 10px 15px rgba(255, 62, 0, 0.2)'
        }}
        onClick={() => setSelectedProject(project)}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-white">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className={`
                  px-2 
                  py-1 
                  rounded-full 
                  text-xs
                  ${mode === 'web' ? 'bg-[#3B82F6]/20' : 'bg-[#22C55E]/20'}
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const ProjectModal: React.FC<{ project: Project }> = ({ project }) => {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`
            max-w-2xl 
            w-full 
            rounded-xl 
            overflow-hidden
            ${mode === 'web' ? 'bg-[#1E293B]' : 'bg-[#9333EA]'}
            text-white
          `}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
           <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
            <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-md mb-4" />
            <p className="mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span 
                  key={tech} 
                  className={`px-2 py-1 rounded-full text-xs ${mode === 'web' ? 'bg-[#3B82F6]/20' : 'bg-[#22C55E]/20'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
            <button 
              onClick={() => setSelectedProject(null)} 
              className="mt-4 bg-red-500 text-white rounded px-4 py-2"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div 
      className="relative min-h-screen"
      style={{ 
        backgroundColor: currentColorScheme.background 
      }}
    >
      <div className="container mx-auto p-4">
        <h1 
          className="text-3xl font-bold mb-4 text-center"
          style={{ color: currentColorScheme.secondary }}
        >
          Projects
        </h1>
        
        {/* Search and View Toggle for Desktop */}
        <div className="hidden md:flex justify-between items-center mb-4">
  <input
    type="text"
    placeholder="Search projects..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} 
    className="px-4 py-2 border rounded-full w-full max-w-md"
  />
  <div className="flex items-center">
    <button
      onClick={() => setProjectView('grid')}
      className={`mr-2 ${projectView === 'grid' ? 'text-blue-500' : 'text-gray-500'}`}
    >
      <FaThLarge />
    </button>
    <button
      onClick={() => setProjectView('list')}
      className={projectView === 'list' ? 'text-blue-500' : 'text-gray-500'}
    >
      <FaListUl />
    </button>
  </div>
</div>


        <CategoryFilter />
        
        <div 
          className={`
            grid 
            ${projectView === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
              : 'grid-cols-1 gap-4'
            }
          `}
        >
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;