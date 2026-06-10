import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Target, Eye, Trophy, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "../../imports/image2_upscayl_5x_upscayl-standard-4x.png";

// Hook imports based on your provided files
import { useAchievements } from "../hooks/useAchievements";
import { useCoreValuess } from "../hooks/useCoreValues";
import { useMissionVisions } from "../hooks/useMissionVision";
import { useTeamMemberss } from "../hooks/useTeamMembers";

export default function About() {
  // Fetching Data purely from API hooks
  const { data: missionVision, isLoading: loadingMV } = useMissionVisions();
  const { data: rawCoreValues, isLoading: loadingCV } = useCoreValuess();
  const { data: rawAchievements, isLoading: loadingAchievements } =
    useAchievements();
  const { data: rawTeamMembers, isLoading: loadingTeam } = useTeamMemberss();

  const isLoading =
    loadingMV || loadingCV || loadingAchievements || loadingTeam;

  // Formatting & Sorting Data
  const coreValues = [...(rawCoreValues || [])].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
  );

  const achievements = [...(rawAchievements || [])].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
  );

  const teamMembers = [...(rawTeamMembers || [])]
    .filter((m) => m.isActive !== false) // Only show active members
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Helper to dynamically render Lucide icons from a string name
  const renderIcon = (iconName: string, size: number = 32) => {
    // @ts-ignore - Indexing Icons dynamically
    const IconComponent = Icons[iconName] || Icons.Star;
    return <IconComponent size={size} />;
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
      <section className="relative min-h-[500px] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[40px]">
          <ImageWithFallback
            src={heroImage}
            alt="A+ Solutions facility"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-transparent backdrop-blur-md"></div>
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2 bg-white/60 backdrop-blur-md rounded-full border border-[#E37F4E]/30 shadow-sm">
            <span className="text-[#E37F4E] font-bold tracking-wide uppercase text-sm">
              Since 2015
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-[#2A3A53]">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E37F4E] to-[#6F67BA]">
              A+ Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#333333] max-w-3xl mx-auto font-medium leading-relaxed">
            Empowering the next generation of innovators through quality STEM
            education, preparing students for a rapidly advancing technological
            future.
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
                <Target
                  className="text-[#E37F4E] group-hover:text-white transition-colors duration-500"
                  size={40}
                />
              </div>
              <h2 className="text-3xl font-bold text-[#2A3A53] mb-6">
                Our Mission
              </h2>
              <p className="text-[#333333] text-lg leading-relaxed whitespace-pre-line">
                {missionVision?.missionStatement ||
                  "Mission statement content is currently being updated."}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-[#6F67BA]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#6F67BA] transition-colors duration-500">
                <Eye
                  className="text-[#6F67BA] group-hover:text-white transition-colors duration-500"
                  size={40}
                />
              </div>
              <h2 className="text-3xl font-bold text-[#2A3A53] mb-6">
                Our Vision
              </h2>
              <p className="text-[#333333] text-lg leading-relaxed whitespace-pre-line">
                {missionVision?.visionStatement ||
                  "Vision statement content is currently being updated."}
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
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {coreValues.length > 0 ? (
              coreValues.map((value) => (
                <div
                  key={value.id}
                  className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-md hover:shadow-xl hover:border-[#6F67BA]/30 hover:transform hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-20 h-20 bg-[#6F67BA]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-[#6F67BA]">
                      {renderIcon(value.iconName, 32)}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2A3A53] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[#333333] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Core values will be announced soon.
              </div>
            )}
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
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">
              Company Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
            {achievements.length > 0 ? (
              achievements.map((award) => (
                <div
                  key={award.id}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
                >
                  {/* Redesigned Image Container - Rectangular & Spacious */}
                  <div className="h-48 w-full bg-gradient-to-br from-[#6F67BA]/5 to-[#E37F4E]/5 flex items-center justify-center p-6 border-b border-gray-100/50 relative overflow-hidden">
                    {/* Decorative Background Blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E37F4E]/10 rounded-full blur-2xl group-hover:bg-[#E37F4E]/20 transition-colors duration-500 -mt-10 -mr-10"></div>

                    {award.imageUrl ? (
                      <ImageWithFallback
                        src={award.imageUrl}
                        alt={award.title}
                        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center relative z-10">
                        <Trophy size={32} className="text-[#E37F4E]" />
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-8 text-center flex flex-col items-center flex-grow">
                    <h3 className="text-xl font-bold text-[#2A3A53] mb-3">
                      {award.title}
                    </h3>
                    {award.achievementYear && (
                      <div className="inline-block px-4 py-1.5 bg-[#6F67BA]/10 rounded-full text-sm font-bold text-[#6F67BA] mb-4">
                        {award.achievementYear}
                      </div>
                    )}
                    <p className="text-[#333333] text-sm font-medium leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Achievements will be posted soon.
              </div>
            )}
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
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">
              Our Expert Instructors
            </h2>
            <p className="text-[#333333] mt-4 max-w-2xl mx-auto text-lg">
              Our passionate educators bring years of industry experience and
              teaching expertise to inspire and guide every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 group"
                >
                  {/* Avatar / Photo */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={member.profileImageUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#2A3A53] mb-2">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-[#E37F4E] font-bold text-sm uppercase tracking-wide mb-4">
                      {member.roleTitle}
                    </p>
                    <p className="text-[#333333] leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Team directory will be available soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A3A53] to-[#6F67BA]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Join Our Learning Community
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Discover how A+ Solutions can help you achieve your educational
            goals.
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
