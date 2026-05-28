import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Facebook, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import heroImage from '../../imports/ContactUs-image1_upscayl_2x_upscayl-standard-4x.png';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#2A3A53]">
      {/* Hero Section */}
      <section className="relative py-16 bg-[#2A3A53] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={heroImage} alt="Contact Us" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#6F67BA]/90 to-[#5d57a0]/80"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-extrabold text-white mb-4">Get In Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">
                  Reach out to us through any of the following channels. We're here to help!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4 p-6 bg-[#1f2937] rounded-xl border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#6F67BA] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Phone</h3>
                    <a
                      href="tel:+639178326822"
                      className="text-[#E37F4E] hover:underline text-lg"
                    >
                      +63 917 832 6822
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Mon-Fri, 8:00 AM - 6:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-6 bg-[#1f2937] rounded-xl border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#E37F4E] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:info@aplussolutions.com"
                      className="text-[#E37F4E] hover:underline text-lg break-all"
                    >
                      info@aplussolutions.com
                    </a>
                    <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-6 bg-[#1f2937] rounded-xl border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#6F67BA] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-300">
                      123 Innovation Drive<br />
                      Olongapo City, Zambales<br />
                      Philippines 2200
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 p-6 bg-[#1f2937] rounded-xl border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#E37F4E] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Business Hours</h3>
                    <div className="text-gray-300 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#6F67BA] rounded-lg flex items-center justify-center hover:bg-[#E37F4E] transition-colors duration-300"
                  >
                    <Facebook className="text-white" size={24} />
                  </a>
                  <a
                    href="https://m.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#6F67BA] rounded-lg flex items-center justify-center hover:bg-[#E37F4E] transition-colors duration-300"
                  >
                    <MessageCircle className="text-white" size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="bg-[#1f2937] rounded-xl p-8 border border-[#6F67BA]/20">
                <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#2A3A53] border border-[#6F67BA]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#2A3A53] border border-[#6F67BA]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#2A3A53] border border-[#6F67BA]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-colors"
                      placeholder="+63 XXX XXX XXXX"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#2A3A53] border border-[#6F67BA]/30 rounded-lg text-white focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="enrollment">Enrollment Inquiry</option>
                      <option value="ocrc">OCRC Registration</option>
                      <option value="general">General Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-[#2A3A53] border border-[#6F67BA]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#6F67BA] text-white font-semibold rounded-lg hover:bg-[#5d57a0] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>

                  <p className="text-gray-400 text-sm text-center">
                    We'll respond to your inquiry within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Find Us
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">Our Location</h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative h-96 bg-[#2A3A53] rounded-xl overflow-hidden border border-[#6F67BA]/20">
              {/* Embedded Map Placeholder */}
              <iframe
                title="A+ Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30863.70890899433!2d120.27!3d14.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ5JzQ4LjAiTiAxMjDCsDE2JzEyLjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
