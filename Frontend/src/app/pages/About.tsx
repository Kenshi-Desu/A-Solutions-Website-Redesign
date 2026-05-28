import { Target, Eye, Heart, Users, Lightbulb, Rocket } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "../../imports/image2_upscayl_5x_upscayl-standard-4x.png";

export default function About() {
  const values = [
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description:
        "We foster creative thinking and encourage students to explore new ideas.",
    },
    {
      icon: <Heart size={32} />,
      title: "Excellence",
      description:
        "We maintain the highest standards in education and student development.",
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and community learning.",
    },
    {
      icon: <Rocket size={32} />,
      title: "Growth",
      description:
        "We are committed to continuous improvement and lifelong learning.",
    },
  ];

  const team = [
    {
      name: "Engr. Maria Santos",
      role: "Lead Robotics Instructor",
      bio: "Electronics Engineer with 10+ years in STEM education. Passionate about making technology accessible to all students.",
      expertise: "Robotics, Electronics",
    },
    {
      name: "John Reyes",
      role: "Programming Instructor",
      bio: "Software developer turned educator. Specializes in Python, JavaScript, and game development for young learners.",
      expertise: "Programming, Game Dev",
    },
    {
      name: "Dr. Carmen Lopez",
      role: "Academic Director",
      bio: "PhD in Education Technology. Dedicated to curriculum development and innovative teaching methodologies.",
      expertise: "Curriculum, Pedagogy",
    },
    {
      name: "Miguel Torres",
      role: "Innovation Coach",
      bio: "Former startup founder with expertise in design thinking and project-based learning approaches.",
      expertise: "Innovation, Design",
    },
    {
      name: "Sofia Reyes",
      role: "STEM Coordinator",
      bio: "Mathematics and Science educator focused on hands-on learning and real-world applications.",
      expertise: "Math, Science",
    },
    {
      name: "Carlos Mendoza",
      role: "Competition Coach",
      bio: "Robotics competition veteran who has mentored multiple championship teams across the region.",
      expertise: "Competition Prep",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-[#2A3A53]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="A+ Solutions facility"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#6F67BA]/90 via-[#5d57a0]/80 to-[#2A3A53]/90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white">
              About <span className="text-[#E37F4E]">A+ Solutions</span>
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Empowering the next generation of innovators through quality STEM
              education since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[#2A3A53]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-[#1f2937] rounded-xl p-10 border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
              <div className="w-16 h-16 bg-[#E37F4E] rounded-full flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To provide accessible, high-quality STEM education that empowers
                students with the skills, knowledge, and confidence to become
                innovators and problem-solvers in an increasingly technological
                world.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#1f2937] rounded-xl p-10 border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
              <div className="w-16 h-16 bg-[#6F67BA] rounded-full flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be the leading STEM education center in the region,
                recognized for excellence in teaching, innovation in curriculum,
                and our commitment to developing future leaders who will shape
                tomorrow's technology landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              What Drives Us
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-[#2A3A53] rounded-xl p-8 text-center border border-[#6F67BA]/20 hover:border-[#6F67BA] hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#6F67BA] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#2A3A53]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Meet The Team
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">
              Our Expert Instructors
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Our passionate educators bring years of industry experience and
              teaching expertise to inspire and guide every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-[#1f2937] rounded-xl overflow-hidden border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                {/* Avatar */}
                <div className="relative h-48 bg-gradient-to-br from-[#6F67BA] to-[#5d57a0] flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
                    <Users className="text-white" size={48} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#E37F4E] font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-[#6F67BA]/20 rounded-full text-sm text-[#6F67BA] font-medium">
                      {member.expertise}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#6F67BA] to-[#5d57a0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">9+</div>
              <div className="text-white/90">Years of Excellence</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-white/90">Students Trained</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-white/90">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-white/90">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2A3A53]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Learning Community
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover how A+ Solutions can help you achieve your educational
            goals.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-[#6F67BA] text-white font-semibold rounded-lg hover:bg-[#5d57a0] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}
