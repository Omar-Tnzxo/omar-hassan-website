import React, { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaInstagram, FaTelegram, FaFacebookF, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSun, FaMoon, FaArrowUp, FaGithub, FaFileDownload, FaWhatsapp, FaTiktok, FaChevronDown, FaUser, FaLanguage } from 'react-icons/fa'
import { MdRealEstateAgent, MdComputer, MdBusiness, MdAnalytics, MdTrendingUp, MdPeople, MdSearch, MdEmail, MdMessage } from 'react-icons/md'
import Head from 'next/head'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

// Create context for theme and language
const ThemeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
})

const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {},
})

// Custom hook for animations
const useAnimatedEntrance = (delay = 0) => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  }
}

const navItems = ['Home', 'About', 'Experience', 'Skills', 'Services', 'Portfolio', 'Testimonials', 'Blog', 'Contact', 'FAQ']

const neonColors = {
  primary: '#00ffff',
  secondary: '#ff00ff',
  tertiary: '#ffff00',
  quaternary: '#ff8000',
}

export default function EnhancedPersonalWebsite({ initialDarkMode = true, initialLanguage = 'en' }: { initialDarkMode?: boolean, initialLanguage?: string }) {
  const [darkMode, setDarkMode] = useState(initialDarkMode)
  const [language, setLanguage] = useState(initialLanguage)
  const [activePage, setActivePage] = useState('Home')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const { t, i18n } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
      const sections = navItems.map(item => document.getElementById(item.toLowerCase()))
      const currentSection = sections.findIndex(section => {
        if (section) {
          const rect = section.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection !== -1) {
        setActivePage(navItems[currentSection])
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en')
    i18n.changeLanguage(language === 'en' ? 'ar' : 'en')
  }, [language, i18n])

  const closeMenuAndNavigate = useCallback((id: string) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans transition-colors duration-300 ${language === 'ar' ? 'font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Head>
            <title>{t('siteTitle')}</title>
            <link rel="icon" href="/assets/favicon.ico" />
            <meta name="description" content={t('siteDescription')} />
            <meta name="keywords" content={t('siteKeywords')} />
            <meta name="author" content="Omar Hassan" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content={t('siteTitle')} />
            <meta property="og:description" content={t('siteDescription')} />
            <meta property="og:image" content="https://i.ibb.co/8BhdGRT/Picsart-23-08-31-06-07-05-897.jpg" />
            <meta property="og:url" content="https://www.omarhassan.com" />
            <meta name="twitter:card" content="summary_large_image" />
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
          </Head>
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
            style={{ scaleX }}
          />
          <Header darkMode={darkMode} language={language} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} activePage={activePage} setMenuOpen={setMenuOpen} />
          <AnimatePresence>
            {menuOpen && (
              <MobileMenu darkMode={darkMode} activePage={activePage} closeMenuAndNavigate={closeMenuAndNavigate} />
            )}
          </AnimatePresence>
          <main className="container mx-auto px-4 py-8">
            <HomePage darkMode={darkMode} />
            <AboutPage darkMode={darkMode} />
            <ExperiencePage darkMode={darkMode} />
            <SkillsPage darkMode={darkMode} />
            <ServicesPage darkMode={darkMode} />
            <PortfolioPage darkMode={darkMode} />
            <TestimonialsPage darkMode={darkMode} />
            <BlogPage darkMode={darkMode} />
            <ContactPage darkMode={darkMode} />
            <FAQPage darkMode={darkMode} />
            <ContinuousInnovation darkMode={darkMode} />
          </main>
          <Footer darkMode={darkMode} />
          <ScrollToTopButton showScrollTop={showScrollTop} />
          <WhatsAppButton />
          <SideNavigation activePage={activePage} closeMenuAndNavigate={closeMenuAndNavigate} />
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  )
}

function Header({ darkMode, language, toggleDarkMode, toggleLanguage, activePage, setMenuOpen }) {
  const { t } = useTranslation()

  return (
    <header className={`${darkMode ? 'bg-gray-800 bg-opacity-95' : 'bg-white bg-opacity-95'} backdrop-filter backdrop-blur-lg py-4 px-6 sticky top-0 z-40 transition-colors duration-300`}>
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1 
          className="text-2xl font-bold font-poppins cursor-pointer"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {t('name')}
          </span>
        </motion.h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <motion.li key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`font-roboto cursor-pointer ${
                    activePage === item ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600' : `${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600`
                  } transition-colors`}
                >
                  {t(item.toLowerCase())}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </motion.button>
          <motion.button
            onClick={toggleLanguage}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLanguage className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </motion.button>
          <motion.button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(prev => !prev)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">☰</span>
          </motion.button>
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ darkMode, activePage, closeMenuAndNavigate }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-gray-800 bg-opacity-95' : 'bg-white bg-opacity-95'} backdrop-filter backdrop-blur-lg`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-8 rounded-lg relative"
      >
        <motion.button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => closeMenuAndNavigate(activePage.toLowerCase())}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
        >
          ✕
        </motion.button>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {navItems.map((item) => (
            <motion.div key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className={`font-roboto block w-full text-center py-2 px-4 rounded ${
                  activePage === item ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600' : `${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600`
                } transition-colors`}
                onClick={() => closeMenuAndNavigate(item.toLowerCase())}
              >
                {t(item.toLowerCase())}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function HomePage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  return (
    <motion.div
      id="home"
      className="min-h-screen flex items-center justify-center text-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <motion.div 
          className="relative w-64 h-64 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src="https://i.ibb.co/8BhdGRT/Picsart-23-08-31-06-07-05-897.jpg"
            alt="Omar Hassan" 
            width={256}
            height={256}
            className="rounded-full w-full h-full object-cover z-10 relative"
          />
          
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              borderRadius: ["50%", "25%", "50%"]
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-600 opacity-50"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 0, 360],
              borderRadius: ["25%", "50%", "25%"]
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              times: [0, 

 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </motion.div>
        <motion.h2 
          className="text-5xl font-bold font-poppins mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          {...animatedEntrance}
        >
          {t('name')}
        </motion.h2>
        <motion.h3 
          className={`text-3xl font-poppins mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          {...animatedEntrance}
        >
          {t('jobTitle')}
        </motion.h3>
        <motion.p 
          className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          {...animatedEntrance}
        >
          {t('homeDescription')}
        </motion.p>
        <motion.div 
          className="flex justify-center space-x-4"
          {...animatedEntrance}
        >
          <motion.a 
            href="#portfolio"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-roboto hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('exploreWork')}
          </motion.a>
          <motion.a 
            href="#contact"
            className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full font-roboto hover:bg-blue-500 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contactMe')}
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  )
}

function AboutPage({ darkMode }) {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const animatedEntrance = useAnimatedEntrance()

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/my-cv.pdf';
    link.download = 'Omar-Hassan-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      id="about"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('aboutMe')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src="https://i.ibb.co/YkgjdD2/IMG-20241008-171603.jpg"
            alt="Omar Hassan" 
            width={600}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {t('iAmOmar')}
          </h3>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('aboutDescription1')}
          </p>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('aboutDescription2')}
          </p>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('aboutDescription3')}
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('aboutDescription4')}
                </p>
                <ul className={`list-disc list-inside mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('achievements', { returnObjects: true }).map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('aboutDescription5')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex space-x-4">
            <motion.button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-roboto hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? t('readLess') : t('readMore')}
            </motion.button>
            <motion.button 
              onClick={downloadCV}
              className="flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-roboto hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFileDownload className="mr-2" /> {t('downloadCV')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function ExperiencePage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const experiences = t('experiences', { returnObjects: true })

  return (
    <motion.div
      id="experience"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('professionalExperience')}</h2>
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className={`mb-12 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          {...animatedEntrance}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{exp.company}</h3>
          <h4 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{exp.role}</h4>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.period}</p>
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>
          <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {exp.achievements.map((achievement, i) => (
              <li key={i} className="mb-2">{achievement}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}

function SkillsPage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const skills = t('skills', { returnObjects: true })

  return (
    <motion.div
      id="skills"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('myExpertise')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            {...animatedEntrance}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              {React.createElement(skill.icon, { className: "text-3xl mr-4", style: { color: skill.color } })}
              <h3 className="text-xl font-bold">{skill.name}</h3>
            </div>
            <div className="relative pt-1">
              <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                <motion.div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('proficient')}</span>
                <span>{t('expert')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ServicesPage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const services = t('services', { returnObjects: true })

  return (
    <motion.div
      id="services"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('servicesIOffer')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            {...animatedEntrance}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {React.createElement(service.icon, { className: "text-5xl mb-4", style: { color: service.color } })}
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function PortfolioPage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const projects = t('projects', { returnObjects: true })

  return (
    <motion.div
      id="portfolio"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('featuredProjects')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            {...animatedEntrance}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src={project.image} 
              alt={project.title} 
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
              <div className="flex justify-between">
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                >
                  {t('viewLive')}
                </a>
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600 transition-colors duration-300"
                >
                  {t('viewCode')}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function TestimonialsPage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const testimonials = t('testimonials', { returnObjects: true })

  return (
    <motion.div
      id="testimonials"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('clientTestimonials')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            {...animatedEntrance}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center mb-4">
              <Image 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                width={64}
                height={64}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.position}</p>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} italic`}>{testimonial.quote}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function BlogPage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const blogPosts = t('blogPosts', { returnObjects: true })

  return (
    <motion.div
      id="blog"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('latestBlogPosts')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            {...animatedEntrance}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src={post.image} 
              alt={post.title} 
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.excerpt}</p>
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                {t('readMore')}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ContactPage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSubmitMessage(t('messageSent'))
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <motion.div
      id="contact"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('getInTouch')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          {...animatedEntrance}
        >
          <h3 className="text-2xl font-bold mb-4">{t('contactInfo')}</h3>
          <div className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FaEnvelope className="inline-block mr-2" />
            <a href="mailto:contact@omarhassan.com" className="hover:text-blue-500 transition-colors duration-300">contact@omarhassan.com</a>
          </div>
          <div className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FaPhone className="inline-block mr-2" />
            <a href="tel:+1234567890" className="hover:text-blue-500 transition-colors duration-300">+1 (234) 567-890</a>
          </div>
          <div className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FaMapMarkerAlt className="inline-block mr-2" />
            {t('location')}
          </div>
          <div className="flex space-x-4">
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="text-2xl" />
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter className="text-2xl" />
            </motion.a>
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-300`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-2xl" />
            </motion.a>
          </div>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          {...animatedEntrance}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">{t('name')}</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">{t('email')}</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">{t('message')}</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
            ></textarea>
          </div>
          <motion.button 
            type="submit"
            className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-roboto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'} transition-all duration-300`}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('sending') : t('sendMessage')}
          </motion.button>
          {submitMessage && (
            <motion.p 
              className="mt-4 text-green-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {submitMessage}
            </motion.p>
          )}
        </motion.form>
      </div>
    </motion.div>
  )
}

function FAQPage({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const faqs = t('faqs', { returnObjects: true })

  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <motion.div
      id="faq"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('frequentlyAskedQuestions')}</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`mb-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            {...animatedEntrance}
            transition={{ delay: index * 0.1 }}
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <FaChevronDown className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 pt-0"
                >
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ContinuousInnovation({ darkMode }) {
  const { t } = useTranslation()
  const animatedEntrance = useAnimatedEntrance()

  const innovations = t('innovations', { returnObjects: true })

  return (
    <motion.div
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('continuousInnovation')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {innovations.map((innovation, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            {...animatedEntrance}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 0, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="text-5xl mb-4"
              style={{ color: innovation.color }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {React.createElement(innovation.icon)}
            </motion.div>
            <h3 className="text-xl font-bold mb-2">{innovation.title}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{innovation.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Footer({ darkMode }) {
  const { t } = useTranslation()

  return (
    <footer className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{t('name')}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('footerDescription')}</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul>
              {navItems.map((item) => (
                <li key={item} className="mb-2">
                  <a href={`#${item.toLowerCase()}`} className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-300`}>{t(item.toLowerCase())}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">{t('followMe')}</h4>
            <div className="flex space-x-4">
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin className="text-2xl" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter className="text-2xl" />
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="text-2xl" />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>&copy; 2024 Omar Hassan. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}

function ScrollToTopButton({ showScrollTop }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 bg-green-500 text-white p-3 rounded-full shadow-lg z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp className="text-2xl" />
    </motion.a>
  )
}

function SideNavigation({ activePage, closeMenuAndNavigate }) {
  return (
    <motion.nav
      className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="space-y-2">
        {navItems.map((item) => (
          <motion.li key={item}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={`#${item.toLowerCase()}`}
              onClick={() => closeMenuAndNavigate(item.toLowerCase())}
              className={`block w-3 h-3 rounded-full ${
                activePage === item ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            >
              <span className="sr-only">{item}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}
