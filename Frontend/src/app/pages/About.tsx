import { Target, Eye, Heart, Users, Lightbulb, Rocket, Award, Medal, Trophy, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import heroImage from '../../imports/image2_upscayl_5x_upscayl-standard-4x.png';

export default function About() {
  const values = [
    {
      icon: <Lightbulb size={32} />,
      title: 'Innovation',
      description: 'We foster creative thinking and encourage students to explore new ideas.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Excellence',
      description: 'We maintain the highest standards in education and student development.',
    },
    {
      icon: <Users size={32} />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and community learning.',
    },
    {
      icon: <Rocket size={32} />,
      title: 'Growth',
      description: 'We are committed to continuous improvement and lifelong learning.',
    },
  ];

  const awards = [
    { icon: <Trophy size={40} className="text-[#E37F4E]" />, title: 'Best STEM Center', year: '2025', org: 'National Education Board' },
    { icon: <Medal size={40} className="text-[#6F67BA]" />, title: 'Innovation in Robotics', year: '2024', org: 'Tech Educators Association' },
    { icon: <Star size={40} className="text-[#E37F4E]" />, title: 'Outstanding Curriculum', year: '2023', org: 'Global EdTech Awards' },
    { icon: <Award size={40} className="text-[#6F67BA]" />, title: 'Community Impact', year: '2022', org: 'City Council of Olongapo' },
  ];

  const team = [
    {
      name: 'Engr. Maria Santos',
      role: 'Lead Robotics Instructor',
      bio: 'Electronics Engineer with 10+ years in STEM education. Passionate about making technology accessible to all students.',
      expertise: 'Robotics, Electronics',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90JTIwd29tYW58ZW58MXx8fHwxNzgwNTQ5MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'John Reyes',
      role: 'Programming Instructor',
      bio: 'Software developer turned educator. Specializes in Python, JavaScript, and game development for young learners.',
      expertise: 'Programming, Game Dev',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc4MDUzMzA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Dr. Carmen Lopez',
      role: 'Academic Director',
      bio: 'PhD in Education Technology. Dedicated to curriculum development and innovative teaching methodologies.',
      expertise: 'Curriculum, Pedagogy',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90JTIwd29tYW58ZW58MXx8fHwxNzgwNTQ5MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Miguel Torres',
      role: 'Innovation Coach',
      bio: 'Former startup founder with expertise in design thinking and project-based learning approaches.',
      expertise: 'Innovation, Design',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc4MDUzMzA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Sofia Reyes',
      role: 'STEM Coordinator',
      bio: 'Mathematics and Science educator focused on hands-on learning and real-world applications.',
      expertise: 'Math, Science',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90JTIwd29tYW58ZW58MXx8fHwxNzgwNTQ5MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Carlos Mendoza',
      role: 'Competition Coach',
      bio: 'Robotics competition veteran who has mentored multiple championship teams across the region.',
      expertise: 'Competition Prep',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc4MDUzMzA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[40px]">
          <ImageWithFallback src={heroImage} alt="A+ Solutions facility" className="w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-transparent backdrop-blur-md"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full border border-[#E37F4E]/30 shadow-sm">
            <span className="text-[#E37F4E] font-bold tracking-wide uppercase text-sm">
              Since 2015
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-[#2A3A53]">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E37F4E] to-[#6F67BA]">A+ Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#333333] max-w-3xl mx-auto font-medium leading-relaxed">
            Empowering the next generation of innovators through quality STEM education, preparing students for a rapidly advancing technological future.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-96 bg-gradient-to-r from-[#6F67BA]/10 to-[#E37F4E]/10 blur-3xl -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-[#E37F4E]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#E37F4E] transition-colors duration-500">
                <Target className="text-[#E37F4E] group-hover:text-white transition-colors duration-500" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-[#2A3A53] mb-6">Our Mission</h2>
              <p className="text-[#333333] text-lg leading-relaxed">
                To provide accessible, high-quality STEM education that empowers students with the skills,
                knowledge, and confidence to become innovators and problem-solvers in an increasingly
                technological world.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-[#6F67BA]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#6F67BA] transition-colors duration-500">
                <Eye className="text-[#6F67BA] group-hover:text-white transition-colors duration-500" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-[#2A3A53] mb-6">Our Vision</h2>
              <p className="text-[#333333] text-lg leading-relaxed">
                To be the leading STEM education center in the region, recognized for excellence in
                teaching, innovation in curriculum, and our commitment to developing future leaders who
                will shape tomorrow's technology landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white/40 border-y border-white/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              What Drives Us
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-md hover:shadow-xl hover:border-[#6F67BA]/30 hover:transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-[#6F67BA]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-[#6F67BA]">{value.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-[#2A3A53] mb-4">{value.title}</h3>
                <p className="text-[#333333] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Achievements & Awards */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative z-10">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Recognitions
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">Company Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
            {awards.map((award, index) => (
               <div key={index} className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 text-center border border-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-6 border border-gray-50">
                    {award.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2A3A53] mb-2">{award.title}</h3>
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-bold text-[#333333] mb-4">
                    {award.year}
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{award.org}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white/40 border-t border-white/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Meet The Team
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">Our Expert Instructors</h2>
            <p className="text-[#333333] mt-4 max-w-2xl mx-auto text-lg">
              Our passionate educators bring years of industry experience and teaching expertise to inspire and guide every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 group"
              >
                {/* Avatar / Photo */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <ImageWithFallback src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#2A3A53] mb-2">{member.name}</h3>
                  <p className="text-[#E37F4E] font-bold text-sm uppercase tracking-wide mb-4">{member.role}</p>
                  <p className="text-[#333333] mb-6 leading-relaxed line-clamp-3">{member.bio}</p>
                  <div className="flex items-center">
                    <span className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-[#2A3A53] font-bold border border-gray-100">
                      {member.expertise}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A3A53] to-[#6F67BA]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Join Our Learning Community</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Discover how A+ Solutions can help you achieve your educational goals.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-5 bg-[#E37F4E] text-white font-bold rounded-xl hover:bg-[#d36e3d] transition-all duration-300 transform hover:-translate-y-1 shadow-2xl text-lg"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}
