import React, { 
    createContext, 
    useState, 
    useContext, 
    useEffect, 
    useCallback 
  } from 'react';
  
  type ThemeMode = 'design' | 'web';
  
  interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
    themeTransitionCount: number;
  }
  
  export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
  export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>('design');
    const [themeTransitionCount, setThemeTransitionCount] = useState(0);
    const [, setShowEasterEgg] = useState(false);
  
    useEffect(() => {
      const savedMode = localStorage.getItem('portfolioMode') as ThemeMode;
      if (savedMode) {
        setMode(savedMode);
      }
    }, []);
  
    useEffect(() => {
      document.documentElement.classList.toggle('design-mode', mode === 'design');
      document.documentElement.classList.toggle('web-mode', mode === 'web');
      localStorage.setItem('portfolioMode', mode);
    }, [mode]);
  
    const toggleMode = useCallback(() => {
      setMode(prevMode => prevMode === 'design' ? 'web' : 'design');
      
      setThemeTransitionCount(prev => {
        const newCount = prev + 1;
        
        if (newCount === 5) {
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 3000);
        }
        
        return newCount;
      });
    }, []);
  
    return (
      <ThemeContext.Provider value={{ mode, toggleMode, themeTransitionCount }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error('useThemeMode must be used within a ThemeProvider');
    }
    return context;
  };
  
  export const themeColors = {
    design: {
      primary: '#FF6B6B',    
      secondary: '#4ECDC4',   
      accent: '#45B7D1',      
      background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1)',
    },
    web: {
      primary: '#0A192F',     
      secondary: '#64FFDA',   
      accent: '#8892B0',      
      background: 'linear-gradient(135deg, #0A192F, #112240, #233554)',
    }
  };