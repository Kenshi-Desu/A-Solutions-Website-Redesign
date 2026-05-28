import { Calendar, MapPin, Users, Download, Award, Target } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "../../imports/ORCR-image1_upscayl_2x_upscayl-standard-4x.png";
import galleryImg1 from "../../imports/Image3_upscayl_3x_upscayl-standard-4x.png";
import galleryImg2 from "../../imports/Image4_upscayl_3x_upscayl-standard-4x.png";
import galleryImg3 from "../../imports/Image1_upscayl_2x_upscayl-standard-4x.png";
import ocrcLogo from "../../imports/OCRC-Logo.jpg";
import partnerGridBox from "../../imports/Partner-GridBox-logo.jpg";
import partnerSm from "../../imports/Partner-SM-CITY-CENTRAL-logo.jpg";
import partnerVirland from "../../imports/Partner-VIRLAND-logo.jpg";
import partnerOlongapo from "../../imports/Partner-olongapo-city-logo-png-download-barangay-east-bajac.jpg";
import partnerDost from "../../imports/Partner-DOST-logo.jpg";
import partnerIstream from "../../imports/Partner-istream-education.png";

export default function OCRC() {
  const timelineEvents = [
    {
      year: "2018",
      title: "OCRC Inaugural Event",
      description:
        "The first Olongapo City Robotics Cup was held with 15 participating teams.",
    },
    {
      year: "2019",
      title: "Expansion Year",
      description:
        "Doubled participation with 30 teams from various schools across the region.",
    },
    {
      year: "2020",
      title: "Virtual Competition",
      description:
        "Adapted to online format due to pandemic, maintaining student engagement.",
    },
    {
      year: "2022",
      title: "Return to Physical",
      description:
        "Triumphant return with record 45 teams at Ayala Mall Olongapo.",
    },
    {
      year: "2024",
      title: "Biggest Event Yet",
      description:
        "Over 60 teams competed, making it the largest robotics event in the region.",
    },
  ];

  const galleryImages = [
    {
      title: "Robot Competition",
      image: galleryImg1,
      color: "from-[#6F67BA] to-[#5d57a0]",
    },
    {
      title: "Team Collaboration",
      image: galleryImg2,
      color: "from-[#E37F4E] to-[#d36e3d]",
    },
    {
      title: "Award Ceremony",
      image: galleryImg3,
      color: "from-[#6F67BA] to-[#E37F4E]",
    },
    {
      title: "Innovation Showcase",
      image: galleryImg2,
      color: "from-[#5d57a0] to-[#6F67BA]",
    },
    {
      title: "Student Presentations",
      image: galleryImg1,
      color: "from-[#d36e3d] to-[#E37F4E]",
    },
    {
      title: "Judges Panel",
      image: galleryImg3,
      color: "from-[#6F67BA] to-[#d36e3d]",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-[#2A3A53]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="OCRC Event"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#E37F4E]/80 via-[#d36e3d]/70 to-[#6F67BA]/80"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="w-32 h-32 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-white">
              <ImageWithFallback
                src={ocrcLogo}
                alt="OCRC Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Award className="text-white" size={20} />
              <span className="text-white font-semibold tracking-wide uppercase text-sm">
                Annual Robotics Competition
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
              Olongapo City Robotics Cup
            </h1>

            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
              The premier robotics competition showcasing innovation,
              creativity, and technical excellence from students across the
              region.
            </p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-[#2A3A53]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Next Event
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">OCRC 2026</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#1f2937] rounded-xl p-8 text-center border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
              <div className="w-16 h-16 bg-[#6F67BA] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Date & Time
              </h3>
              <p className="text-gray-300">October 15-17, 2026</p>
              <p className="text-[#E37F4E] text-sm mt-1">8:00 AM - 6:00 PM</p>
            </div>

            <div className="bg-[#1f2937] rounded-xl p-8 text-center border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
              <div className="w-16 h-16 bg-[#E37F4E] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Venue</h3>
              <p className="text-gray-300">Ayala Mall Olongapo</p>
              <p className="text-[#E37F4E] text-sm mt-1">Main Event Hall</p>
            </div>

            <div className="bg-[#1f2937] rounded-xl p-8 text-center border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300">
              <div className="w-16 h-16 bg-[#6F67BA] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Eligibility
              </h3>
              <p className="text-gray-300">Elementary to High School</p>
              <p className="text-[#E37F4E] text-sm mt-1">
                Team of 3-5 students
              </p>
            </div>
          </div>

          <div className="text-center space-x-4">
            <button className="px-8 py-4 bg-[#6F67BA] text-white font-semibold rounded-lg hover:bg-[#5d57a0] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Register Your Team
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-[#E37F4E] text-[#E37F4E] font-semibold rounded-lg hover:bg-[#E37F4E] hover:text-white transition-all duration-300">
              <span className="flex items-center space-x-2">
                <Download size={20} />
                <span>Download Rules (PDF)</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">
              OCRC Timeline
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#6F67BA]/30"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0
                    ? "md:pr-1/2 md:text-right"
                    : "md:pl-1/2 md:ml-auto"
                } md:w-1/2`}
              >
                {/* Circle */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#E37F4E] rounded-full border-4 border-[#1f2937] z-10"></div>

                <div
                  className={`ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                  } bg-[#2A3A53] rounded-xl p-6 border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-colors duration-300`}
                >
                  <div className="inline-block px-3 py-1 bg-[#6F67BA] rounded-full mb-3">
                    <span className="text-white font-bold text-sm">
                      {event.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#2A3A53]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Media Gallery
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">
              Past Events Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative h-64 rounded-xl overflow-hidden group cursor-pointer bg-gradient-to-br ${image.color}`}
              >
                <ImageWithFallback
                  src={image.image}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Target className="text-white w-12 h-12 mx-auto mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <p className="text-white font-semibold text-lg drop-shadow-md">
                      {image.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors & Authority Section */}
      <section className="py-20 bg-[#1f2937]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#E37F4E] font-semibold tracking-wide uppercase text-sm">
              Supported By
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">
              Our Partners & Sponsors
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-12 max-w-4xl mx-auto">
            {[
              { name: "Grid Box", logo: partnerGridBox },
              { name: "DOST", logo: partnerDost },
              { name: "SM City", logo: partnerSm },
              { name: "VIRLAND", logo: partnerVirland },
              { name: "Olongapo City", logo: partnerOlongapo },
              { name: "iStream Education", logo: partnerIstream },
            ].map((sponsor, index) => (
              <div
                key={index}
                className="w-full max-w-[140px] aspect-square bg-white rounded-xl flex items-center justify-center border border-white/10 hover:border-[#6F67BA] transition-all duration-300 hover:scale-105 p-3 overflow-hidden shadow-lg"
              >
                <ImageWithFallback
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 bg-[#E37F4E] text-white font-semibold rounded-lg hover:bg-[#d36e3d] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Become a Sponsor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
