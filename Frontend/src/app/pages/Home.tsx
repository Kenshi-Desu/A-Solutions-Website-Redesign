import { Link } from 'react-router';
import { Code, Cpu, GraduationCap, Trophy, Users, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import heroImage from '../../imports/Image1_upscayl_2x_upscayl-standard-4x.png';
import achievementsImage from '../../imports/Image4_upscayl_3x_upscayl-standard-4x.png';
import partnerDeped from '../../imports/Partner-DEPED-LOGO.jpg';
import partnerDost from '../../imports/Partner-DOST-logo.jpg';
import partnerFelta from '../../imports/Partner-FELTA-logo.jpg';
import partnerGridBox from '../../imports/Partner-GridBox-logo.jpg';
import partnerSm from '../../imports/Partner-SM-CITY-CENTRAL-logo.jpg';
import partnerVirland from '../../imports/Partner-VIRLAND-logo.jpg';
import partnerOlongapo from '../../imports/Partner-olongapo-city-logo-png-download-barangay-east-bajac.jpg';

export default function Home() {
  const services = [
    {
      icon: <Code size={40} />,
      title: 'Coding and Robotics Classes',
      description: 'Hands-on programming and robotics education for students of all ages.',
    },
    {
      icon: <Sparkles size={40} />,
      title: 'Innovation Projects',
      description: 'Real-world projects that foster creativity and problem-solving skills.',
    },
    {
      icon: <GraduationCap size={40} />,
      title: 'Academic Tutorials',
      description: 'Personalized tutoring to excel in STEM subjects and beyond.',
    },
  ];

  const reviews = [
    {
      name: 'Maria Santos',
      role: 'Parent',
      comment: 'My daughter loves the robotics classes! She\'s learned so much and can\'t wait for each session.',
      rating: 5,
    },
    {
      name: 'Juan Reyes',
      role: 'Student',
      comment: 'The instructors are amazing and make coding fun. I built my first robot here!',
      rating: 5,
    },
    {
      name: 'Carmen Lopez',
      role: 'Parent',
      comment: 'A+ Solutions has been instrumental in developing my son\'s passion for technology.',
      rating: 5,
    },
  ];

  const achievements = [
    { icon: <Trophy />, text: 'OCRC Champions 2024' },
    { icon: <Users />, text: '500+ Students Trained' },
    { icon: <Cpu />, text: '50+ Projects Completed' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[#2A3A53]">
        <div className="absolute inset-0">
          <ImageWithFallback src={heroImage} alt="Students in robotics class" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#2A3A53] via-[#3d4e68] to-[#2A3A53]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#6F67BA_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-[#E37F4E]/20 rounded-full">
              <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
                Empowering Future Innovators
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="text-white">Build Your Future with </span>
              <span className="text-[#E37F4E]">Code</span>
              <span className="text-white"> and </span>
              <span className="text-[#E37F4E]">Robotics</span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join A+ Solutions Development Center and unlock your potential through innovative STEM education and hands-on learning experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-[#6F67BA] text-white font-semibold rounded-lg hover:bg-[#5d57a0] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Enroll Now
              </Link>
              <Link
                to="/ocrc"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#2A3A53] transition-all duration-300"
              >
                Explore OCRC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#2A3A53]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-[#6F67BA]/10 backdrop-blur-sm rounded-xl p-8 hover:bg-[#6F67BA] transition-all duration-300 transform hover:-translate-y-2 border border-[#6F67BA]/20 hover:shadow-2xl hover:shadow-[#6F67BA]/20"
              >
                <div className="w-16 h-16 bg-[#6F67BA] group-hover:bg-[#E37F4E] rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gradient-to-r from-[#6F67BA] to-[#5d57a0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback src={achievementsImage} alt="Students receiving awards" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#6F67BA]/80 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-center space-x-4 text-white">
                <div className="w-12 h-12 flex items-center justify-center">
                  {achievement.icon}
                </div>
                <span className="text-xl font-semibold">{achievement.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-[#2A3A53]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-[#1f2937] rounded-xl p-6 border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#E37F4E]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.comment}"</p>
                <div>
                  <p className="text-white font-semibold">{review.name}</p>
                  <p className="text-[#E37F4E] text-sm">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Our Partners
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">Trusted By Leading Institutions</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
            {[
              { name: 'DepEd', logo: partnerDeped },
              { name: 'DOST', logo: partnerDost },
              { name: 'Felta', logo: partnerFelta },
              { name: 'GridBox', logo: partnerGridBox },
              { name: 'SM City', logo: partnerSm },
              { name: 'Virland', logo: partnerVirland },
              { name: 'Olongapo City', logo: partnerOlongapo }
            ].map((partner, index) => (
              <div
                key={index}
                className="w-full max-w-[120px] aspect-square bg-white rounded-lg flex items-center justify-center border border-white/10 hover:border-[#6F67BA] transition-all duration-300 hover:scale-105 p-2 overflow-hidden shadow-lg"
              >
                <ImageWithFallback src={partner.logo} alt={`${partner.name} logo`} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6F67BA] to-[#5d57a0]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of students who are already building their future with coding and robotics.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-[#E37F4E] text-white font-semibold rounded-lg hover:bg-[#d36e3d] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
