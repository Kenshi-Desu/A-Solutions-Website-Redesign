import { Link } from 'react-router';
import { Facebook, Mail, Phone, MapPin, Lock } from 'lucide-react';
import aplusLogo from '../../imports/A__logo.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2A3A53] text-white relative z-10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-xl p-2 backdrop-blur-sm border border-white/20">
                <ImageWithFallback src={aplusLogo} alt="A+ Solutions Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-white font-bold text-2xl leading-tight">
                  A+ Solutions
                </div>
                <div className="text-[#E37F4E] text-sm font-semibold tracking-wide uppercase mt-1">Development Center</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              Empowering the next generation through coding, robotics, and innovation education. We shape future leaders in technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/APSDevCenter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#6F67BA] border border-white/20 hover:border-[#6F67BA] transition-all duration-300 hover:-translate-y-1"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#E37F4E] transition-colors flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#E37F4E] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ocrc" className="text-gray-300 hover:text-[#E37F4E] transition-colors flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#E37F4E] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  OCRC
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-[#E37F4E] transition-colors flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#E37F4E] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#E37F4E] transition-colors flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#E37F4E] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#E37F4E] transition-colors flex items-center group">
                  <span className="w-2 h-2 rounded-full bg-[#E37F4E] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="mt-1 bg-white/10 p-2 rounded-lg group-hover:bg-[#E37F4E] transition-colors">
                  <Phone size={18} className="text-white" />
                </div>
                <a href="tel:+639178326822" className="text-gray-300 hover:text-white transition-colors mt-1">
                  +63 917 832 6822
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="mt-1 bg-white/10 p-2 rounded-lg group-hover:bg-[#E37F4E] transition-colors">
                  <Mail size={18} className="text-white" />
                </div>
                <a href="mailto:info@aplussolutions.com" className="text-gray-300 hover:text-white transition-colors mt-1 break-all">
                  info@aplussolutions.com
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="mt-1 bg-white/10 p-2 rounded-lg group-hover:bg-[#E37F4E] transition-colors">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-gray-300 mt-1">Olongapo City, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex items-center justify-between text-gray-400">
          <p className="flex-1 text-center md:text-left">&copy; {currentYear} A+ Solutions Development Center. All rights reserved.</p>
          <Link to="/admin/login" className="flex items-center text-gray-500 hover:text-white transition-colors ml-4 bg-white/5 p-2 rounded-full hover:bg-[#6F67BA]" title="Admin Login">
            <Lock size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
