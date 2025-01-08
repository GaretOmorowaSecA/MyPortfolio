import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/header';
import Introduction from './components/introduction';
import About from './components/about';
import Skills from './components/skills';
import Projects from './components/project';
import Resume from './components/resume'
import Contact from './components/contact';
import Footer from './components/footer';

const App: React.FC = () => {
  useEffect(() => {
    const smoothScroll = () => {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          if (targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    };

    smoothScroll();
    return () => {
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="scroll-smooth">
        {/* Sticky Header */}
        <Header />
        
        {/* Main Sections */}
        <main>
          <Element name="introduction" className="element">
            <Introduction />
          </Element>
          
          <Element name="about" className="element">
            <About />
          </Element>
          
          <Element name="skills" className="element">
            <Skills />
          </Element>
          
          <Element name="projects" className="element">
            <Projects />
          </Element>

          <Element name="resume" className="element">
            <Resume />
          </Element>
          
          <Element name="contact" className="element">
            <Contact />
          </Element>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;