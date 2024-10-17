'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaInstagram, FaTelegram, FaFacebookF, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSun, FaMoon, FaArrowUp, FaGithub, FaFileDownload, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import { SiMicrosoft, SiTelegram } from 'react-icons/si'
import { MdRealEstateAgent, MdComputer, MdBusiness, MdAnalytics, MdTrendingUp, MdPeople, MdSearch } from 'react-icons/md'
import Head from 'next/head'
import Image from 'next/image'

const navItems = ['Home', 'About', 'Experience', 'Skills', 'Services', 'Portfolio', 'Testimonials', 'Blog', 'Contact', 'FAQ']

const neonColors = {
  primary: '#00ffff',
  secondary: '#ff00ff',
  tertiary: '#ffff00',
  quaternary: '#ff8000',
}

export function EnhancedPersonalWebsite() {
  const [activePage, setActivePage] = useState('Home')
  const [darkMode, setDarkMode] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

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

  const closeMenuAndNavigate = useCallback((id: string) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans transition-colors duration-300`}>
      <Head>
        <title>Omar Hassan - Real Estate Consultant & Digital Marketing Expert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />
      <header className={`${darkMode ? 'bg-gray-800 bg-opacity-95' : 'bg-white bg-opacity-95'} backdrop-filter backdrop-blur-lg py-4 px-6 sticky top-0 z-40 transition-colors duration-300`}>
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold font-poppins cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Omar Hassan
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
                    {item}
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
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">☰</span>
            </motion.button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
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
                onClick={() => setMenuOpen(false)}
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
                      {item}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
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
        <AnimatedSection darkMode={darkMode} />
      </main>
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} py-12 transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Omar Hassan
                </span>
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Empowering businesses with innovative digital strategies and cutting-edge real estate solutions.
              </p>
              <div className="flex space-x-4">
                <SocialIcon Icon={FaFacebookF} url="https://facebook.com/Omar.Tnzxo" darkMode={darkMode} />
                <SocialIcon Icon={FaInstagram} url="https://Instagram.com/Omar.Tnzxo" darkMode={darkMode} />
                <SocialIcon Icon={FaLinkedin} url="https://LinkedIn.com/in/Omar-Tnzxo" darkMode={darkMode} />
                <SocialIcon Icon={FaTiktok} url="https://tiktok.com/@omar.tnzxo" darkMode={darkMode} />
                <SocialIcon Icon={FaTelegram} url="https://t.me/Omar_Tnzxo" darkMode={darkMode} />
                <SocialIcon Icon={FaTwitter} url="https://x.com/OmarTnzxo" darkMode={darkMode} />
                <SocialIcon Icon={FaGithub} url="https://github.com/Omar-Tnzxo" darkMode={darkMode} />
                <SocialIcon Icon={FaWhatsapp} url="https://wa.me/+201029752972" darkMode={darkMode} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                {navItems.map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`cursor-pointer ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <ul className={`space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-center">
                  <FaEnvelope className="mr-4 text-blue-400" /> omar-agha@engineer.com
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-4 text-green-400" /> +201029752972
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-4 text-red-400" /> Egypt, Giza, 6 October City
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>© 2024 Omar Hassan. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {showScrollTop && (
        <motion.button
          className={`fixed bottom-8 right-8 p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
      <motion.a
        href="https://wa.me/201029752972"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 p-3 rounded-full bg-green-500 text-white"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -10, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <FaWhatsapp size={24} />
      </motion.a>
      <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <motion.li key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                
                href={`#${item.toLowerCase()}`}
                className={`w-3 h-3 rounded-full block transition-all duration-300 ${
                  activePage === item ? 'bg-gradient-to-r from-blue-400 to-purple-600 w-6' : `${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`
                }`}
                title={item}
                onClick={() => closeMenuAndNavigate(item.toLowerCase())}
              />
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function SocialIcon({ Icon, url, darkMode }: { Icon: React.ElementType, url: string, darkMode: boolean }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${darkMode ? 'text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600' : 'text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600'} transition-colors`}
      whileHover={{ scale: 1.2, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
    >
      <Icon />
    </motion.a>
  )
}

function HomePage({ darkMode }: { darkMode: boolean }) {
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
              borderRadius: ["50%", "40%", "50%"]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </motion.div>
        <motion.h2 
          className="text-5xl font-bold font-poppins mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Omar Hassan
        </motion.h2>
        <motion.h3 
          className={`text-3xl font-poppins mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Real Estate Consultant & Digital Marketing Expert
        </motion.h3>
        <motion.p 
          className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Empowering businesses with innovative digital strategies and cutting-edge real estate solutions. With 2 years of experience since 2023, I blend technology and marketing expertise to drive growth and success.
        </motion.p>
        <motion.div 
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a 
            href="#portfolio"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-roboto hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.a>
          <motion.a 
            href="#contact"
            className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full font-roboto hover:bg-blue-500 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 0, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  )
}

function AboutPage({ darkMode }: { darkMode: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)

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
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">About Me</h2>
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
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            I&apos;m Omar Hassan, a passionate real estate consultant and digital marketing expert with 2 years of experience since 2023. My journey began when I recognized the untapped potential of digital strategies in the real estate sector.
          </p>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Currently, I&apos;m pursuing a Bachelor&apos;s degree in Management Information Systems at Pharaohs Higher Institute, which I started in August 2022. This academic pursuit complements my professional experience, allowing me to bring cutting-edge knowledge to my work.
          </p>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            With a unique blend of technological expertise and marketing acumen, I&apos;ve helped numerous businesses thrive in the digital age while excelling in the real estate sector. My approach combines data-driven insights with creative problem-solving to deliver tailored solutions that drive growth and maximize ROI.
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Throughout my career, I&apos;ve successfully:
                </p>
                <ul className={`list-disc list-inside mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>Increased online lead generation by 200% for a major real estate firm</li>
                  <li>Developed and implemented AI-driven property valuation tools</li>
                  <li>Created comprehensive digital marketing strategies for over 50 clients</li>
                  <li>Spoken at industry conferences on the intersection of tech and real estate</li>
                </ul>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  My goal is to continue pushing the boundaries of what&apos;s possible in real estate and digital marketing, helping businesses and individuals achieve unprecedented success in an ever-evolving digital landscape.
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
              {isExpanded ? 'Read Less' : 'Read More'}
            </motion.button>
            <motion.button 
              onClick={downloadCV}
              className="flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-roboto hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFileDownload className="mr-2" /> Download CV
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function ExperiencePage({ darkMode }: { darkMode: boolean }) {
  const experiences = [
    {
      company: "The Avenue Properties",
      role: "Real Estate Consultant & Organic Marketer",
      period: "March 5, 2024 - November 1, 2024",
      description: "As a Real Estate Consultant and Organic Marketer at The Avenue Properties, I leveraged my expertise in both real estate and digital marketing to drive growth and success for the company. My role involved:",
      achievements: [
        "Developed and implemented organic marketing strategies that increased property inquiries by 150%",
        "Provided expert real estate consultation to clients, resulting in a 30% increase in successful property transactions",
        "Created and optimized content for social media and the company website, improving online visibility and engagement",
        "Conducted market research and analysis to identify emerging trends and opportunities in the real estate sector",
        "Collaborated with the sales team to develop targeted marketing campaigns for high-value properties"
      ]
    }
  ]

  return (
    <motion.div
      id="experience"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Work Experience</h2>
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className={`mb-12 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
          <h4 className="text-xl font-semibold mb-2">{exp.role}</h4>
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

function SkillsPage({ darkMode }: { darkMode: boolean }) {
  const skills = [
    { name: "Property Consultant", level: 88, icon: MdRealEstateAgent, color: neonColors.tertiary },
    { name: "Web Design", level: 85, icon: MdComputer, color: neonColors.primary },
    { name: "Digital Marketing", level: 90, icon: MdTrendingUp, color: neonColors.secondary },
    { name: "Organic Marketing", level: 92, icon: MdTrendingUp, color: neonColors.quaternary },
    { name: "Social Media Management", level: 87, icon: MdPeople, color: neonColors.primary },
    { name: "Real Estate Copywriting", level: 85, icon: MdBusiness, color: neonColors.secondary },
    { name: "Telegram Bots Development", level: 80, icon: SiTelegram, color: neonColors.tertiary },
    { name: "Data Extraction", level: 82, icon: MdAnalytics,  color: neonColors.quaternary },
    { name: "Tech Savvy", level: 95, icon: MdComputer, color: neonColors.primary },
    { name: "Microsoft Excel", level: 88, icon: SiMicrosoft, color: neonColors.secondary },
    { name: "Research Skills", level: 90, icon: MdSearch, color: neonColors.tertiary },
  ]

  return (
    <motion.div
      id="skills"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <skill.icon className="text-3xl mr-4" style={{ color: skill.color }} />
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
                <span>Beginner</span>
                <span>Advanced</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ServicesPage({ darkMode }: { darkMode: boolean }) {
  const services = [
    {
      title: "Real Estate Consultation",
      description: "Expert advice on property investments, market trends, and strategic decision-making in the real estate sector.",
      icon: MdRealEstateAgent,
      color: neonColors.primary
    },
    {
      title: "Digital Marketing Strategy",
      description: "Comprehensive digital marketing plans tailored to your business needs, focusing on ROI and brand growth.",
      icon: MdTrendingUp,
      color: neonColors.secondary
    },
    {
      title: "Social Media Management",
      description: "Engaging content creation and community management across various social media platforms to boost your online presence.",
      icon: MdPeople,
      color: neonColors.tertiary
    },
    {
      title: "Web Design & Development",
      description: "Creating responsive, user-friendly websites that convert visitors into customers and enhance your digital footprint.",
      icon: MdComputer,
      color: neonColors.quaternary
    },
    {
      title: "SEO Optimization",
      description: "Improving your website's search engine rankings to drive organic traffic and increase visibility.",
      icon: MdSearch,
      color: neonColors.primary
    },
    {
      title: "Data Analysis & Reporting",
      description: "In-depth analysis of marketing and real estate data to provide actionable insights and performance reports.",
      icon: MdAnalytics,
      color: neonColors.secondary
    }
  ]

  return (
    <motion.div
      id="services"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">My Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <service.icon className="text-5xl mb-4" style={{ color: service.color }} />
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function PortfolioPage({ darkMode }: { darkMode: boolean }) {
  const projects = [
    {
      title: "Luxury Real Estate Website",
      description: "Designed and developed a high-end real estate website showcasing premium properties with virtual tours and advanced search functionality.",
      image: "https://i.ibb.co/Qp1SXBk/real-estate-website.jpg",
      tags: ["Web Development", "Real Estate", "UI/UX Design"]
    },
    {
      title: "Social Media Campaign for Property Developer",
      description: "Created and managed a multi-platform social media campaign that increased engagement by 200% and led to a 50% increase in property inquiries.",
      image: "https://i.ibb.co/C6ZGJgk/social-media-campaign.jpg",
      tags: ["Digital Marketing", "Social Media", "Real Estate"]
    },
    {
      title: "Real Estate Market Analysis Dashboard",
      description: "Developed an interactive dashboard for real-time market analysis, helping investors make data-driven decisions in the property market.",
      image: "https://i.ibb.co/Jt8Jq3Q/market-analysis-dashboard.jpg",
      tags: ["Data Analysis", "Web Development", "Real Estate"]
    },
    {
      title: "AI-Powered Property Valuation Tool",
      description: "Built an AI-driven tool that provides accurate property valuations based on various factors, improving pricing strategies for real estate agencies.",
      image: "https://i.ibb.co/Qf8Gx9P/ai-valuation-tool.jpg",
      tags: ["AI", "Web Development", "Real Estate"]
    },
    {
      title: "Email Marketing Automation for Real Estate",
      description: "Implemented an automated email marketing system that nurtures leads and provides personalized property recommendations, resulting in a 30% increase in conversions.",
      image: "https://i.ibb.co/Lx6zqxc/email-marketing-automation.jpg",
      tags: ["Digital Marketing", "Automation", "Real Estate"]
    },
    {
      title: "Virtual Reality Property Tours Platform",
      description: "Developed a VR platform allowing potential buyers to take immersive virtual tours of properties, increasing engagement and reducing physical viewings.",
      image: "https://i.ibb.co/Ry0K098/vr-property-tours.jpg",
      tags: ["VR", "Web Development", "Real Estate"]
    }
  ]

  return (
    <motion.div
      id="portfolio"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">My Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className={`px-2 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function TestimonialsPage({ darkMode }: { darkMode: boolean }) {
  const testimonials = [
    {
      name: "Ahmed Al-Mansour",
      role: "CEO, TechStart Inc.",
      content: "Omar's digital marketing strategies transformed our online presence. His innovative approach and deep understanding of the tech industry helped us reach our target audience effectively.",
      image: "https://i.ibb.co/Ld6JYXJ/sarah-johnson.jpg"
    },
    {
      name: "Layla El-Masri",
      role: "Real Estate Investor",
      content: "Working with Omar was a game-changer for my real estate investments. His market insights and data-driven approach helped me make informed decisions and maximize my returns.",
      image: "https://i.ibb.co/Ld6JYXJ/michael-chen.jpg"
    },
    {
      name: "Fatima Al-Sayed",
      role: "Marketing Director, GreenHome Properties",
      content: "Omar's expertise in both real estate and digital marketing was exactly what we needed. He developed a comprehensive strategy that significantly increased our property inquiries and sales.",
      image: "https://i.ibb.co/Ld6JYXJ/emily-rodriguez.jpg"
    },
    {
      name: "Karim Nour",
      role: "Founder, AI Solutions Ltd.",
      content: "Omar's ability to blend AI technology with real estate applications is truly impressive. His AI-powered property valuation tool has become an integral part of our business operations.",
      image: "https://i.ibb.co/Ld6JYXJ/david-thompson.jpg"
    },
    {
      name: "Nadia Hassan",
      role: "Social Media Influencer",
      content: "I've worked with many digital marketers, but Omar stands out. His creative content strategies and deep understanding of social media algorithms helped me grow my following exponentially.",
      image: "https://i.ibb.co/Ld6JYXJ/lisa-patel.jpg"
    },
    {
      name: "Youssef El-Sherif",
      role: "CTO, PropTech Innovations",
      content: "Omar's technical skills are top-notch. He developed a custom web application for our company that streamlined our operations and improved our customer experience significantly.",
      image: "https://i.ibb.co/Ld6JYXJ/alex-novak.jpg"
    }
  ]

  return (
    <motion.div
      id="testimonials"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center mb-4">
              <Image 
                src={testimonial.image} 
                alt={testimonial.name} 
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{testimonial.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
              </div>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{testimonial.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function BlogPage({ darkMode }: { darkMode: boolean }) {
  const blogPosts = [
    {
      title: "The Future of Real Estate: AI and Virtual Reality",
      excerpt: "Explore how artificial intelligence and virtual reality are revolutionizing the real estate industry, from property valuations to virtual tours.",
      date: "May 15, 2024",
      image: "https://i.ibb.co/Qf8Gx9P/ai-valuation-tool.jpg",
      category: "Technology"
    },
    {
      title: "5 Digital Marketing Strategies Every Real Estate Agent Needs",
      excerpt: "Discover the essential digital marketing techniques that can help real estate agents stand out in a competitive market and attract more clients.",
      date: "April 28, 2024",
      image: "https://i.ibb.co/C6ZGJgk/social-media-campaign.jpg",
      category: "Marketing"
    },
    {
      title: "Sustainable Living: The Rise of Eco-Friendly Properties",
      excerpt: "Learn about the growing trend of sustainable properties and how it's shaping the future of real estate development and investment.",
      date: "April 10, 2024",
      image: "https://i.ibb.co/Qp1SXBk/real-estate-website.jpg",
      category: "Real Estate Trends"
    },
    {
      title: "Mastering SEO for Real Estate Websites",
      excerpt: "A comprehensive guide to optimizing your real estate website for search engines and driving organic traffic to your listings.",
      date: "March 22, 2024",
      image: "https://i.ibb.co/Lx6zqxc/email-marketing-automation.jpg",
      category: "SEO"
    },
    {
      title: "The Power of Data Analytics in Real Estate Investment",
      excerpt: "Explore how big data and analytics are transforming real estate investment strategies and decision-making processes.",
      date: "March 5, 2024",
      image: "https://i.ibb.co/Jt8Jq3Q/market-analysis-dashboard.jpg",
      category: "Investment"
    },
    {
      title: "Creating Engaging Content for Real Estate Social Media",
      excerpt: "Tips and tricks for creating compelling social media content that attracts potential buyers and sellers in the real estate market.",
      date: "February 18, 2024",
      image: "https://i.ibb.co/Ry0K098/vr-property-tours.jpg",
      category: "Social Media"
    }
  ]

  return (
    <motion.div
      id="blog"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-shadow duration-300`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-200 text-blue-800'}`}>
                {post.category}
              </span>
              <h3 className="text-xl font-bold mt-2 mb-2">{post.title}</h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.date}</span>
                <motion.a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Read More
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ContactPage({ darkMode }: { darkMode: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    }
    setIsSubmitting(false)
  }

  return (
    <motion.div
      id="contact"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Contact Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            I&apos;m always open to new opportunities and collaborations. Whether you have a question about real estate, digital marketing, or just want to say hello, I&apos;d love to hear from you!
          </p>
          <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="flex items-center">
              <FaEnvelope className="mr-4 text-blue-500" />
              <span>omar-agha@engineer.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-4 text-green-500" />
              <span>+201029752972</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-4 text-red-500" />
              <span>Egypt, Giza, 6 October City</span>
            </div>
          </div>
          <div className="mt-8 flex space-x-4">
            <SocialIcon Icon={FaFacebookF} url="https://facebook.com/Omar.Tnzxo" darkMode={darkMode} />
            <SocialIcon Icon={FaInstagram} url="https://Instagram.com/Omar.Tnzxo" darkMode={darkMode} />
            <SocialIcon Icon={FaLinkedin} url="https://LinkedIn.com/in/Omar-Tnzxo" darkMode={darkMode} />
            <SocialIcon Icon={FaTiktok} url="https://tiktok.com/@omar.tnzxo" darkMode={darkMode} />
            <SocialIcon Icon={FaTelegram} url="https://t.me/Omar_Tnzxo" darkMode={darkMode} />
            <SocialIcon Icon={FaTwitter} url="https://x.com/OmarTnzxo" darkMode={darkMode} />
            <SocialIcon Icon={FaGithub} url="https://github.com/Omar-Tnzxo" darkMode={darkMode} />
            <SocialIcon Icon={FaWhatsapp} url="https://wa.me/+201029752972" darkMode={darkMode} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              />
            </div>
            <div>
              <label htmlFor="message" className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              ></textarea>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-lg ${
                isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              } text-white font-bold transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
          {submitStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-500 font-semibold"
            >
              Message sent successfully!
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-500 font-semibold"
            >
              An error occurred. Please try again later.
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

function FAQPage({ darkMode }: { darkMode: boolean }) {
  const faqs = [
    {
      question: "What real estate consulting services do you offer?",
      answer: "I offer a wide range of real estate consulting services, including market analysis, property valuation, investment strategies, and portfolio optimization."
    },
    {
      question: "How can digital marketing help in the real estate sector?",
      answer: "Digital marketing can significantly increase property visibility, improve lead quality, and accelerate sales through strategies like social media marketing, SEO, and targeted advertising."
    },
    {
      question: "What's your experience with real estate technology?",
      answer: "I have extensive experience applying technology in real estate, including developing AI-powered valuation tools, virtual tour platforms, and custom CRM systems for real estate agencies."
    },
    {
      question: "How can I start investing in real estate?",
      answer: "To start investing in real estate, I recommend educating yourself about the local market, defining your investment goals, and building a network of real estate professionals. I can help you develop a customized investment strategy that aligns with your goals and budget."
    },
    {
      question: "What are the latest digital marketing trends in real estate?",
      answer: "The latest digital marketing trends in real estate include the use of AR and VR for property tours, video marketing, AI-powered personalization of customer experiences, and influencer marketing in the real estate niche."
    }
  ]

  return (
    <motion.div
      id="faq"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.h3 
              className="text-xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {faq.question}
            </motion.h3>
            <motion.p 
              className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function AnimatedSection({ darkMode }: { darkMode: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = [
    { title: "Innovative Solutions", description: "Bringing cutting-edge technology to real estate" },
    { title: "Data-Driven Decisions", description: "Leveraging analytics for smarter investments" },
    { title: "Digital Transformation", description: "Revolutionizing the real estate industry" },
    { title: "Client-Centric Approach", description: "Tailored strategies for your success" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [items.length])

  return (
    <motion.div
      id="animated-section"
      className="py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-4xl font-bold font-poppins mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Continuous Innovation
      </h2>
      <div className="relative h-64">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} p-8 rounded-lg`}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              y: index === currentIndex ? 0 : 50,
            }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
