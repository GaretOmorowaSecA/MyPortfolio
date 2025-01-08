import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import html2pdf from 'html2pdf.js'
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  TrophyIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { useThemeMode } from '../context/ThemeContext'

const COLOR_SCHEMES = {
  web: {
    primary: '#F8FAFC',      
    secondary: '#3B82F6',    
    accent: '#FACC15',       
    text: '#111827',         
    border: '#1E293B'        
  },
  design: {
    primary: '#F0F4C3',      
    secondary: '#22C55E',    
    accent: '#FF3E00',       
    text: '#181818',         
    border: '#9333EA'        
  }
};

interface EducationItem {
  title: string;
  institution: string;
  period: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

interface TabContent {
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  awards: string[];
}

export default function Resume() {
  const { mode } = useThemeMode();
  const currentColorScheme = COLOR_SCHEMES[mode];
  
  const [activeTab, setActiveTab] = useState('education')
  const resumeRef = useRef<HTMLDivElement>(null)

  const downloadResume = () => {
    if (resumeRef.current) {
      const options = {
        margin: 0.9,
        filename: 'Garet_Omorowa_Resume_section.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      html2pdf().set(options).from(resumeRef.current).save()
    }
  }

  const tabs = [
    { id: 'education', label: 'Education', icon: AcademicCapIcon },
    { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
    { id: 'skills', label: 'Skills', icon: CodeBracketIcon },
    { id: 'awards', label: 'Awards', icon: TrophyIcon }
  ]

  const tabContent: TabContent = {
    education: [
      {
        title: 'Senior Secondary School Cert',
        institution: 'Leaders College Senior Secondary School, Benin City, Nigeria',
        period: '2018 – 2020'
      },
      {
        title: 'Diploma in Computer Appreciation',
        institution: 'Del Computers Training Institute, Benin City, Nigeria',
        period: 'February 2022 – August 2023',
      },
      {
        title: 'Diploma in Computer Programming',
        institution: 'Humber College, Toronto, ON',
        period: 'May 2024 – Present'
      }
    ],
    
    experience: [
      {
        title: 'Freelance Graphic Designer',
        company: 'Self-Employed, Nigeria',
        period: 'March 2021 – December 2023 (Part-Time)',
        responsibilities: [
          'Designed visually compelling logos, brochures, and digital marketing assets tailored to client needs.',
          'Collaborated with clients to understand branding requirements and deliver creative solutions.',
          'Utilized Adobe Creative Suite and Figma to produce high-quality graphic designs.',
          'Managed multiple projects simultaneously while meeting tight deadlines.',
          'Provided clients with branding consultation to enhance their market presence.'
        ]
      },
      {
        title: 'Web Designer & Developer',
        company: 'Freelance Projects, Nigeria',
        period: 'May 2021 – December 2023 (Part-Time)',
        responsibilities: [
          'Developed responsive websites and landing pages using HTML, CSS, JavaScript, and modern frameworks like React.',
          'Implemented user-friendly interfaces to improve client engagement and website functionality.',
          'Optimized websites for SEO and performance, ensuring faster load times and higher search rankings.',
          'Collaborated with graphic designers to integrate visuals seamlessly into web designs.',
          'Provided ongoing maintenance and updates to ensure websites remained functional and secure.'
        ]
      },
      {
        title: 'Junior Web Developer',
        company: 'Tech Innovators, Lagos, Nigeria',
        period: 'July 2021 – May 2022 (Full-Time)',
        responsibilities: [
          'Built and maintained responsive websites using HTML, CSS, JavaScript, and WordPress.',
          'Assisted in the development of e-commerce platforms and content management systems (CMS).',
          'Optimized websites for mobile responsiveness, cross-browser compatibility, and SEO.',
          'Participated in daily team meetings, collaborating on project progress and deadlines.',
          'Conducted website audits and troubleshooting to improve functionality and resolve bugs.'
        ]
      },
      {
        title: 'UI/UX Designer Intern',
        company: 'Creative Solutions, Toronto, ON',
        period: 'June 2023 – August 2023 (Internship)',
        responsibilities: [
          'Assisted senior designers in creating wireframes, prototypes, and UI elements for web and mobile applications.',
          'Conducted user research and usability testing to gather feedback and improve design decisions.',
          'Worked with developers to ensure the designs were implemented with precision and functionality.',
          'Created design specifications and style guides for the development team.',
          'Collaborated in cross-functional teams to deliver user-centered design solutions.'
        ]
      },
      {
        title: 'Bartender',
        company: 'MK Lounge, Toronto, ON',
        period: 'September 2023 – Present (Full-Time)',
        responsibilities: [
          'Provided outstanding service by personalizing drink orders to suit customer preferences.',
          'Ensured a clean, organized, and sanitary work environment, fostering a welcoming atmosphere.',
          'Improved operational efficiency by streamlining the ordering and service process.',
          'Conducted regular inventory checks and maintained accurate stock records.',
          'Strengthened customer loyalty through consistent and friendly interactions.'
        ]
      }
    ],  

    skills: [
      'Proficiency in Adobe Photoshop, Illustrator, Figma, and Adobe XD for graphic and web design',
      'Advanced Web Development: HTML5, CSS3, JavaScript, React, and modern frameworks',
      'UI/UX Design and Prototyping: Wireframing, user flow creation, and interactive prototypes',
      'Responsive Web Design: Creating mobile-first, user-friendly designs across all devices',
      'SEO Optimization and Web Accessibility: Implementing SEO best practices and WCAG guidelines',
      'Branding and Identity Design: Creating cohesive brand identities and logo designs',
      'Web Performance Optimization: Enhancing load speed and overall website performance',
      'Version Control: Proficient in Git and GitHub for code management and collaboration',
      'Collaboration and Communication: Working effectively with clients, teams, and stakeholders',
      'Problem-Solving and Troubleshooting: Identifying issues and providing practical solutions in design and development',
      'Proficiency in Office 365: Expert in Word, Excel, PowerPoint, and Outlook for office productivity',
      'Corel Draw: Skilled in vector graphics, logo creation, and digital illustration',
      'Computer Installation and Maintenance: Ability to set up, configure, and maintain hardware and software systems'
    ],
    
    awards: [
      'Best Web Design Award at Awwwards – 2024',
      'Adobe Certified Expert (ACE) in Photoshop and Illustrator – 2023',
      'Top 10 Finalist in Global UX/UI Design Challenge by Behance – 2023',
      'Outstanding Web Developer of the Year (Toptal) – 2022',
      'Award for Excellence in Branding and Identity Design (Pentagram Design) – 2022',
      'Best Innovative Web Development Project at Smashing Design Conference – 2021',
      'Recognized for Outstanding Collaboration and Team Leadership on Web Development Projects (CodeAcademy) – 2021',
      'SEO Excellence Award for Achieving Top 3 Google Search Rankings for Client Websites (Moz) – 2021'
    ]
    
  }

  return (
    <section 
      id="resume" 
      className="py-20"
      style={{ 
        backgroundColor: currentColorScheme.primary 
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={resumeRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <header 
            className="text-center py-8"
            style={{ 
              backgroundColor: currentColorScheme.secondary, 
              color: 'white' 
            }}
          >
            <h1 className="text-4xl font-bold">Garet Omorowa</h1>
            <p className="text-xl mt-2">Creative Design Specialist | Web Development Enthusiast</p>
          </header>

          <div className="p-6" style={{ color: currentColorScheme.text }}>
            <h2 
              className="text-2xl font-semibold mb-4"
              style={{ color: currentColorScheme.secondary }}
            >
              Objective
            </h2>
            <p className="mb-8">
              Highly motivated and customer-focused professional with hands-on experience in delivering exceptional design and development solutions in dynamic environments. Skilled in graphic design and web development, passionate about creating engaging user experiences and visually compelling brands through effective communication, problem-solving, and teamwork.     
            </p>
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? `text-white`
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    style={{
                      backgroundColor: activeTab === tab.id 
                        ? currentColorScheme.secondary 
                        : 'rgba(0,0,0,0.1)'
                    }}
                    aria-pressed={activeTab === tab.id}
                  >
                    <tab.icon 
                      className="w-5 h-5 mr-2" 
                      aria-hidden="true"
                      style={{ 
                        color: activeTab === tab.id 
                          ? 'white' 
                          : currentColorScheme.accent 
                      }}
                    />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div 
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderColor: currentColorScheme.border
                }}
              >
                {activeTab === 'education' && (
                  <ul className="space-y-4">
                    {tabContent.education.map((item: EducationItem, index: number) => (
                      <li 
                        key={index} 
                        className="border-b pb-4 last:border-b-0 last:pb-0"
                        style={{ 
                          borderColor: currentColorScheme.border + '33' 
                        }}
                      >
                        <h3 
                          className="font-semibold"
                          style={{ color: currentColorScheme.secondary }}
                        >
                          {item.title}
                        </h3>
                        <p>{item.institution}</p> <p className="text-sm opacity-70">{item.period}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'experience' && (
                  <ul className="space-y-6">
                    {tabContent.experience.map((item: ExperienceItem, index: number) => (
                      <li key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <h3 className="font-semibold" style={{ color: currentColorScheme.secondary }}>{item.title}</h3>
                        <p>{item.company}</p>
                        <p className="text-sm opacity-70 mb-2">{item.period}</p>
                        <ul className="list-disc list-inside">
                          {item.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'skills' && (
                  <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tabContent.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'awards' && (
                  <ul className="list-disc list-inside">
                    {tabContent.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={downloadResume}
                className="inline-flex items-center px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-300"
                style={{
                  backgroundColor: currentColorScheme.secondary,
                  color: 'white'
                }}
              >
                <DocumentArrowDownIcon className="w-5 h-5 mr-2" style={{ color: currentColorScheme.accent }} />
                Download Resume Section 
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}