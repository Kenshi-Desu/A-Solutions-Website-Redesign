import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "../../imports/ContactUs-image1_upscayl_2x_upscayl-standard-4x.png";
import { useContactSettingss } from "../hooks/useContactSettings";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Fetching Data from actual API hook
  const { data: contactSettings, isLoading } = useContactSettingss();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Loader2 className="animate-spin text-[#6F67BA] w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative py-24 bg-white overflow-hidden rounded-b-[40px]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Contact Us"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-transparent backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full border border-gray-200 shadow-sm">
            <span className="text-[#6F67BA] font-bold tracking-wide uppercase text-sm">
              We're Here to Help
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#2A3A53] mb-6 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-xl text-[#333333] max-w-2xl mx-auto font-medium">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-[#2A3A53] mb-4">
                  Contact Information
                </h2>
                <p className="text-[#333333] text-lg mb-8 leading-relaxed">
                  Reach out to us through any of the following channels. We're
                  here to help!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-5 p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#6F67BA]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#6F67BA]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-[#2A3A53] font-bold text-xl mb-1">
                      Phone
                    </h3>
                    <a
                      href={`tel:${contactSettings?.contactPhone || "+639178326822"}`}
                      className="text-[#E37F4E] hover:text-[#d36e3d] transition-colors font-medium text-lg block mb-1"
                    >
                      {contactSettings?.contactPhone || "+63 917 832 6822"}
                    </a>
                    <p className="text-[#333333] text-sm">
                      Mon-Fri, 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-5 p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#E37F4E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#E37F4E]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-[#2A3A53] font-bold text-xl mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${contactSettings?.contactEmail || "info@aplussolutions.com"}`}
                      className="text-[#E37F4E] hover:text-[#d36e3d] transition-colors font-medium text-lg block mb-1 break-all"
                    >
                      {contactSettings?.contactEmail ||
                        "info@aplussolutions.com"}
                    </a>
                    <p className="text-[#333333] text-sm">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-5 p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#6F67BA]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#6F67BA]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-[#2A3A53] font-bold text-xl mb-2">
                      Address
                    </h3>
                    <p className="text-[#333333] font-medium leading-relaxed whitespace-pre-line">
                      {contactSettings?.physicalAddress ||
                        "123 Innovation Drive\nOlongapo City, Zambales\nPhilippines 2200"}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-5 p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#E37F4E]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[#E37F4E]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-[#2A3A53] font-bold text-xl mb-2">
                      Business Hours
                    </h3>
                    <div className="text-[#333333] space-y-2 font-medium whitespace-pre-line">
                      {contactSettings?.businessHours ? (
                        contactSettings.businessHours
                      ) : (
                        <>
                          <p className="flex justify-between w-48">
                            <span>Mon - Fri:</span>{" "}
                            <span>8:00 AM - 6:00 PM</span>
                          </p>
                          <p className="flex justify-between w-48">
                            <span>Saturday:</span>{" "}
                            <span>9:00 AM - 4:00 PM</span>
                          </p>
                          <p className="flex justify-between w-48 text-gray-500">
                            <span>Sunday:</span> <span>Closed</span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h3 className="text-[#2A3A53] font-bold text-xl mb-6">
                  Connect With Us directly
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white border border-gray-200 shadow-sm rounded-xl flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <Facebook
                      className="text-[#2A3A53] group-hover:text-blue-600 transition-colors"
                      size={28}
                    />
                  </a>
                  <a
                    href="https://m.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white border border-gray-200 shadow-sm rounded-xl flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <MessageCircle
                      className="text-[#2A3A53] group-hover:text-blue-500 transition-colors"
                      size={28}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-2xl relative">
                <div className="absolute top-0 right-10 w-24 h-2 bg-[#E37F4E] rounded-b-full"></div>

                <h2 className="text-3xl font-bold text-[#2A3A53] mb-8">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[#333333] font-bold mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-all bg-white"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[#333333] font-bold mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-all bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[#333333] font-bold mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-all bg-white"
                      placeholder="+63 XXX XXX XXXX"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-[#333333] font-bold mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#333333] focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-all bg-white appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="enrollment">Enrollment Inquiry</option>
                      <option value="ocrc">OCRC Registration</option>
                      <option value="general">General Question</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[#333333] font-bold mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#6F67BA] focus:ring-2 focus:ring-[#6F67BA]/20 transition-all bg-white resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-5 bg-[#6F67BA] text-white font-bold rounded-xl hover:bg-[#5d57a0] transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#6F67BA]/30 flex items-center justify-center space-x-3 text-lg mt-4"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>

                  <p className="text-gray-500 text-sm text-center font-medium mt-4">
                    We'll respond to your inquiry within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm border-t border-white/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Find Us
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">
              Our Location
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative h-[500px] bg-gray-100 rounded-[16px] overflow-hidden border-4 border-white shadow-2xl">
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
