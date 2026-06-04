import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import aplusLogo from '../../imports/A__logo.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/ocrc', label: 'OCRC' },
    { path: '/news', label: 'News & Updates' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-16 h-16 flex items-center justify-center">
              <ImageWithFallback src={aplusLogo} alt="A+ Solutions Logo" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div className="hidden md:block">
              <div className="text-[#2A3A53] font-bold text-lg leading-tight">
                A+ Solutions
              </div>
              <div className="text-[#E37F4E] text-sm font-semibold">Development Center</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 font-semibold transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#E37F4E]'
                    : 'text-[#2A3A53] hover:text-[#E37F4E]'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E37F4E] rounded-t-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2A3A53] p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg absolute left-0 right-0 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 font-semibold transition-colors duration-200 rounded-lg ${
                  location.pathname === link.path
                    ? 'text-[#E37F4E] bg-[#E37F4E]/10'
                    : 'text-[#2A3A53] hover:text-[#E37F4E] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
