import React, { useState, useCallback, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {    
  FaGithub, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
  FaComment
} from 'react-icons/fa';
import { useThemeMode } from '../context/ThemeContext';
import { QRCodeCanvas } from 'qrcode.react';


const COLOR_PALETTE = {
  web: {
    primary: '#3B82F6',     
    secondary: '#1E293B',   
    accent: '#FACC15',      
    background: '#F8FAFC',  
    text: '#111827',        
    gradient: {
      start: '#3B82F6',
      end: '#1E40AF'
    }
  },
  design: {
    primary: '#22C55E',    
    secondary: '#9333EA',   
    accent: '#FF3E00',      
    background: '#F0F4C3',  
    text: '#181818',        
    gradient: {
      start: '#22C55E',
      end: '#15803D'
    }
  }
};


interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SocialLink {
  name: string;
  icon: React.ComponentType;
  url: string;
}

const Contact: React.FC = () => {
  const { mode } = useThemeMode();
  const palette = COLOR_PALETTE[mode];

 
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const socialLinks: SocialLink[] = [
    { 
      name: 'GitHub', 
      icon: FaGithub, 
      url: 'https://github.com/garetomorowa'
    }
  ];
  const getStyles = useCallback((): Record<string, CSSProperties> => {
    return {
      heroHeader: {
        background: `linear-gradient(135deg, ${palette.gradient.start}, ${palette.gradient.end})`,
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      },
      formSection: {
        backgroundColor: palette.background,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        padding: '20px'
      },
      inputContainer: {
        position: 'relative' as const,
        marginBottom: '15px'
      },
      inputIcon: {
        position: 'absolute' as const,
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: palette.secondary,
        zIndex: 10
      },
      socialIconContainer: {
        backgroundColor: palette.background,
        borderRadius: '50%',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
      },
      progressBar: {
        backgroundColor: palette.primary,
        height: '4px',
        width: `${formProgress}%`,
        transition: 'width 0.3s ease'
      }
    };
  }, [mode, formProgress, palette]);
  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    let progress = 0;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else {
      progress += 33;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    } else {
      progress += 33;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else {
      progress += 34;
    }

    setFormProgress(progress);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitted(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Submission error', error);
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Enhanced Hero Header */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-12 p-4 rounded-lg"
          style={getStyles().heroHeader}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Let's Connect
        </motion.h1>

        {/* Progress Bar */}
        <div 
          className="w-full h-1 mb-4"
          style={{ backgroundColor: palette.background }}
        >
          <div style={getStyles().progressBar}></div>
        </div>

        <div 
          className="grid md:grid-cols-2 gap-8 p-6 rounded-xl"
          style={getStyles().formSection}
        >
          { /* Contact Form */
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div style={getStyles().inputContainer}>
                <FaUser  style={getStyles().inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-lg border-2"
                  style={{
                    borderColor: formErrors.name ? 'red' : palette.secondary
                  }}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div style={getStyles().inputContainer}>
                <FaEnvelope style={getStyles().inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-lg border-2"
                  style={{
                    borderColor: formErrors.email ? 'red' : palette.secondary
                  }}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Message Textarea */}
              <div style={getStyles().inputContainer}>
                <FaComment style={getStyles().inputIcon} />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-lg border-2"
                  rows={4}
                  style={{
                    borderColor: formErrors.message ? 'red' : palette.secondary
                  }}
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full p-3 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: palette.primary,
                  color: 'white',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                disabled={isLoading}
              >
                <FaPaperPlane className="mr-2" /> {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
          }

          {/* Contact Information */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold" style={{ color: palette.primary }}>
              Contact Information
            </h3>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-2xl" style={{ color: palette.secondary }} />
              <a 
                href="mailto:omorowagaret@gmail.com" 
                className="hover:underline"
                style={{ color: palette.text }}
              >
                omorowagaret@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-2xl" style={{ color: palette.secondary }} />
              <a 
                href="tel:+14372339269" 
                className="hover:underline"
                style={{ color: palette.text }}
              >
                +1 (437) 233-9269
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-2xl" style={{ color: palette.secondary }} />
              <span style={{ color: palette.text }}>
                277 5 Jane Street, Toronto, ON, Canada
              </span>
            </div>

            <h3 className="text-2xl font-bold" style={{ color: palette.primary }}>
              Follow Me
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl transition-transform duration-300 hover:scale-110"
                    style={{ color: palette.secondary }}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* QR Code Section */}
        <div 
          className="mt-8 text-center p-6 rounded-xl"
          style={getStyles().formSection}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: palette.primary }}>
            Scan to Connect
          </h3>
          <div className="flex justify-center">
            <QRCodeCanvas  
              value="https://yourportfolio.com" 
              size={150} 
              fgColor={palette.text}
              bgColor={palette.background}
              style={{
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderRadius: '12px'
              }}
            />
          </div>
          <p className="mt-2" style={{ color: palette.text }}>
            Quickly save my contact details!
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;