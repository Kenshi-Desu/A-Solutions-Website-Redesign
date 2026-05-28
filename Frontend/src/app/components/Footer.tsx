import { Link } from "react-router";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";
import aplusLogo from "../../imports/A_LogoNoBackground_upscayl_4x_upscayl-standard-4x__1_.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1f2937] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <ImageWithFallback
                  src={aplusLogo}
                  alt="A+ Solutions Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">
                  A+ Solutions
                </div>
                <div className="text-[#E37F4E] text-sm">Development Center</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering the next generation through coding, robotics, and
              innovation education.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#6F67BA] rounded-lg flex items-center justify-center hover:bg-[#E37F4E] transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-[#E37F4E] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ocrc"
                  className="text-gray-300 hover:text-[#E37F4E] transition-colors"
                >
                  OCRC
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-gray-300 hover:text-[#E37F4E] transition-colors"
                >
                  News & Updates
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-[#E37F4E] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-[#E37F4E] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone size={18} className="mt-1 text-[#E37F4E]" />
                <a
                  href="tel:+639178326822"
                  className="text-gray-300 hover:text-[#E37F4E] transition-colors"
                >
                  +63 917 832 6822
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="mt-1 text-[#E37F4E]" />
                <a
                  href="mailto:info@aplussolutions.com"
                  className="text-gray-300 hover:text-[#E37F4E] transition-colors"
                >
                  info@aplussolutions.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 text-[#E37F4E]" />
                <span className="text-gray-300">
                  Olongapo City, Philippines
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} A+ Solutions Development Center. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
