import { Link } from 'react-router';
import { Code, GraduationCap, Trophy, Users, Sparkles, Medal } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import heroImage from '../../imports/Image1_upscayl_2x_upscayl-standard-4x.png';
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
      icon: <Code size={36} />,
      title: 'Coding and Robotics Classes',
      description: 'Hands-on programming and robotics education for students of all ages.',
    },
    {
      icon: <Sparkles size={36} />,
      title: 'Innovation Projects',
      description: 'Real-world projects that foster creativity and problem-solving skills.',
    },
    {
      icon: <GraduationCap size={36} />,
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
    { icon: <Medal size={24} className="text-[#E37F4E]" />, text: '10+ Years Experience' },
    { icon: <Users size={24} className="text-[#E37F4E]" />, text: '500+ Students' },
    { icon: <Trophy size={24} className="text-[#E37F4E]" />, text: '15+ Robotics Awards' },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Light Theme Hero Section */}
      <section className="relative pt-24 pb-32 px-4 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
        {/* Brand-colored background accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-[#6F67BA]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-[#E37F4E]/5 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-7xl mx-auto">
            
            {/* Left Column: Text Content */}
            <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-none mx-auto">
              <div className="inline-block mb-6 px-5 py-2 bg-[#E37F4E]/10 rounded-full border border-[#E37F4E]/20">
                <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
                  Empowering Future Innovators
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-[#2A3A53]">
                Build Your Future with <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F67BA] to-[#E37F4E]">Code</span> and <span className="text-[#E37F4E]">Robotics</span>
              </h1>

              <p className="text-xl text-[#555555] font-medium mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Join A+ Solutions Development Center and unlock your potential through innovative STEM education and hands-on learning experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-[#6F67BA] text-white font-bold rounded-xl hover:bg-[#5d57a0] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#6F67BA]/50 flex items-center justify-center gap-2"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/ocrc"
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-[#2A3A53] font-bold rounded-xl hover:border-[#6F67BA] hover:text-[#6F67BA] transition-all duration-300 transform hover:-translate-y-1 shadow-sm flex items-center justify-center"
                >
                  Explore OCRC
                </Link>
              </div>
            </div>

            {/* Right Column: Image Content */}
            <div className="flex-1 relative w-full max-w-xl lg:max-w-none mx-auto mt-10 lg:mt-0">
              {/* Decorative back-plate matching brand colors */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6F67BA] to-[#E37F4E] rounded-[40px] transform rotate-3 scale-[1.02] opacity-20"></div>
              
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback 
                  src={heroImage} 
                  alt="Students in robotics class" 
                  className="w-full h-full object-cover aspect-[4/3] lg:aspect-square" 
                />
              </div>
              
              {/* Floating Achievement Badge */}
              <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 transform transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#E37F4E]/10 rounded-full flex items-center justify-center">
                  <Trophy className="text-[#E37F4E]" size={24} />
                </div>
                <div className="pr-2">
                  <p className="text-sm text-gray-500 font-medium">Recognized Excellence</p>
                  <p className="text-[#2A3A53] font-bold">Award Winning Center</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Achievements Banner */}
      <section className="relative z-20 -mt-10 container mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-around gap-8 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#E37F4E]/10 flex items-center justify-center">
                {achievement.icon}
              </div>
              <span className="text-lg font-bold text-[#333333]">{achievement.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Our Services
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-lg rounded-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 border border-white/60 shadow-lg hover:shadow-2xl hover:bg-white"
              >
                <div className="w-16 h-16 bg-[#6F67BA]/10 group-hover:bg-[#6F67BA] rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 shadow-inner">
                  <div className="text-[#6F67BA] group-hover:text-white transition-colors duration-500">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-[#2A3A53] mb-4 group-hover:text-[#E37F4E] transition-colors">{service.title}</h3>
                <p className="text-[#333333] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white/40 backdrop-blur-md border-y border-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:border-[#6F67BA]/30 transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                <div className="absolute top-0 right-8 transform -translate-y-1/2 opacity-10">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#6F67BA" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/></svg>
                </div>
                <div className="flex mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#E37F4E]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#333333] mb-6 italic text-lg leading-relaxed">"{review.comment}"</p>
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-[#2A3A53] font-bold text-lg">{review.name}</p>
                  <p className="text-[#E37F4E] font-medium">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Our Partners
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">Trusted By Leading Institutions</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center max-w-6xl mx-auto">
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
                className="w-full max-w-[140px] aspect-square bg-white rounded-2xl flex items-center justify-center border border-gray-100 hover:border-[#6F67BA]/30 transition-all duration-500 hover:-translate-y-2 p-6 shadow-sm hover:shadow-xl"
              >
                <ImageWithFallback src={partner.logo} alt={`${partner.name} logo`} className="w-full h-full object-contain mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6F67BA] to-[#2A3A53]"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_2px,_transparent_2px)] bg-[length:40px_40px]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Join hundreds of students who are already building their future with coding and robotics.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-[#E37F4E] text-white font-bold rounded-xl hover:bg-[#d36e3d] transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-[#E37F4E]/50 text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}