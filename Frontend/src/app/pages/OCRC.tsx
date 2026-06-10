import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  Download,
  Award,
  Target,
  Loader2,
} from "lucide-react";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "../../imports/ORCR-image1_upscayl_2x_upscayl-standard-4x.png";
import ocrcLogo from "../../imports/OCRC-Logo.jpg";

import { useAffiliates } from "../hooks/useAffiliates";
import { useOCRCEventDetailss } from "../hooks/useOCRCEventDetails";
import { useOCRCEventHighlights } from "../hooks/useOCRCEventHighlights";
import { useOCRCTimelines } from "../hooks/useOCRCTimeline";

export default function OCRC() {
  // Fetching Data purely from API hooks
  const { data: eventDetails, isLoading: loadingDetails } =
    useOCRCEventDetailss();
  const { data: affiliates, isLoading: loadingAffiliates } = useAffiliates();
  const { data: highlights, isLoading: loadingHighlights } =
    useOCRCEventHighlights();
  const { data: timelines, isLoading: loadingTimelines } = useOCRCTimelines();

  const isLoading =
    loadingDetails ||
    loadingAffiliates ||
    loadingHighlights ||
    loadingTimelines;

  // Formatting & Sorting Data
  const formatDate = (dateValue: Date | string | undefined) => {
    if (!dateValue) return "TBA";
    const d = new Date(dateValue);
    return isNaN(d.getTime())
      ? "TBA"
      : d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
  };

  const sortedTimelines = [...(timelines || [])].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
  );

  const sortedHighlights = [...(highlights || [])].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0),
  );

  // Filter Active Sponsors matching Affiliate Type 1 or 2
  const sponsors =
    affiliates
      ?.filter(
        (a) =>
          (a.affiliateType === 1 || a.affiliateType === 2) &&
          a.isActive !== false,
      )
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) || [];

  const galleryColors = [
    "from-[#6F67BA]/80 to-[#5d57a0]/80",
    "from-[#E37F4E]/80 to-[#d36e3d]/80",
    "from-[#6F67BA]/80 to-[#E37F4E]/80",
    "from-[#5d57a0]/80 to-[#6F67BA]/80",
    "from-[#d36e3d]/80 to-[#E37F4E]/80",
    "from-[#6F67BA]/80 to-[#d36e3d]/80",
  ];

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
      <section className="relative min-h-[600px] flex items-center justify-center pt-10 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#6F67BA]/40 via-[#E37F4E]/20 to-transparent blur-3xl opacity-60"></div>
        </div>

        <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 bg-white/40 backdrop-blur-2xl border border-white/50 p-10 md:p-14 rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-[1.02]">
            <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-white/60 rounded-full border border-white/50 shadow-sm">
              <Award className="text-[#E37F4E]" size={20} />
              <span className="text-[#2A3A53] font-bold tracking-wide uppercase text-sm">
                Annual Robotics Competition
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-[#2A3A53]">
              Olongapo City <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F67BA] to-[#E37F4E]">
                Robotics Cup
              </span>
            </h1>

            <p className="text-xl text-[#333333] font-medium mb-8 max-w-xl">
              The premier robotics competition showcasing innovation,
              creativity, and technical excellence from students across the
              region.
            </p>

            <button className="px-8 py-4 bg-[#6F67BA] text-white font-bold rounded-xl hover:bg-[#5d57a0] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#6F67BA]/50">
              Register Your Team
            </button>
          </div>

          <div className="flex-1 w-full max-w-lg relative hidden lg:block">
            <div className="absolute inset-0 bg-[#E37F4E] rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
            <div className="w-full aspect-square rounded-[3rem] overflow-hidden border-8 border-white/60 shadow-2xl relative z-10 transform rotate-3">
              <ImageWithFallback
                src={heroImage}
                alt="OCRC Event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full p-4 border-4 border-white shadow-xl z-20 transform -rotate-6">
              <ImageWithFallback
                src={ocrcLogo}
                alt="OCRC Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Actionable Details */}
      <section className="py-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
              <div className="p-8 text-center flex flex-col items-center justify-center bg-white/40 hover:bg-white/60 transition-colors">
                <div className="w-16 h-16 bg-[#6F67BA]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Calendar className="text-[#6F67BA]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#2A3A53] mb-1">
                  Date & Time
                </h3>
                <p className="text-[#333333] font-medium">
                  {formatDate(eventDetails?.eventDate)}
                </p>
                <p className="text-[#E37F4E] font-bold text-sm mt-1">
                  {eventDetails?.eventTime || "TBA"}
                </p>
              </div>

              <div className="p-8 text-center flex flex-col items-center justify-center bg-white/40 hover:bg-white/60 transition-colors">
                <div className="w-16 h-16 bg-[#E37F4E]/10 rounded-2xl flex items-center justify-center mb-4">
                  <MapPin className="text-[#E37F4E]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#2A3A53] mb-1">Venue</h3>
                <p className="text-[#333333] font-medium">
                  {eventDetails?.venueName || "TBA"}
                </p>
                <p className="text-[#E37F4E] font-bold text-sm mt-1">
                  Main Event Hall
                </p>
              </div>

              <div className="p-8 text-center flex flex-col items-center justify-center bg-white/40 hover:bg-white/60 transition-colors">
                <div className="w-16 h-16 bg-[#6F67BA]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="text-[#6F67BA]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#2A3A53] mb-1">
                  Eligibility
                </h3>
                <p className="text-[#333333] font-medium">
                  {eventDetails?.eligibility || "TBA"}
                </p>
              </div>

              <div className="p-8 flex flex-col items-center justify-center bg-[#6F67BA]/5 hover:bg-[#6F67BA]/10 transition-colors">
                {eventDetails?.rulesPdfUrl ? (
                  <a
                    href={eventDetails.rulesPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 mb-4 bg-transparent border-2 border-[#6F67BA] text-[#6F67BA] font-bold rounded-xl hover:bg-[#6F67BA] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Download size={20} />
                    <span>Rules (PDF)</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 mb-4 bg-transparent border-2 border-gray-300 text-gray-400 font-bold rounded-xl flex items-center justify-center space-x-2 cursor-not-allowed"
                  >
                    <Download size={20} />
                    <span>Rules (Pending)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">
              OCRC Timeline
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E37F4E] via-[#6F67BA] to-transparent rounded-full transform md:-translate-x-1/2"></div>

            {sortedTimelines.length > 0 ? (
              sortedTimelines.map((event, index) => (
                <div
                  key={event.id || index}
                  className={`relative mb-12 ${
                    index % 2 === 0
                      ? "md:pr-[50%] md:text-right text-left"
                      : "md:pl-[50%] md:ml-auto text-left"
                  }`}
                >
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-[#6F67BA] shadow-md z-10 mt-6"></div>

                  <div
                    className={`ml-16 md:ml-0 ${
                      index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                    } bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative`}
                  >
                    <div
                      className={`absolute top-8 ${index % 2 === 0 ? "md:-right-3 -left-3" : "-left-3"} w-6 h-6 bg-white/70 rotate-45 transform border-t border-r border-white/60 hidden md:block ${index % 2 === 0 ? "" : "border-b border-l"}`}
                    ></div>

                    <div className="inline-block px-4 py-1.5 bg-[#E37F4E]/10 rounded-full mb-4">
                      <span className="text-[#E37F4E] font-extrabold text-sm">
                        {event.timelineYear || "Year TBA"}
                      </span>
                    </div>
                    {event.title && (
                      <h3 className="text-2xl font-bold text-[#2A3A53] mb-3">
                        {event.title}
                      </h3>
                    )}
                    <p className="text-[#333333] text-lg font-medium leading-relaxed">
                      {event.eventDescription}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                No timeline events found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white/40 border-y border-white/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Media Gallery
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">
              Past Events Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sortedHighlights.length > 0 ? (
              sortedHighlights.map((highlight, index) => (
                <div
                  key={highlight.id || index}
                  className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${galleryColors[index % galleryColors.length]} opacity-80 mix-blend-multiply z-10 transition-opacity duration-300 group-hover:opacity-40`}
                  ></div>
                  <ImageWithFallback
                    src={highlight.imageUrl}
                    alt={highlight.title}
                    className="absolute inset-0 w-full h-full object-cover z-0 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Target className="text-white w-12 h-12 mx-auto mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-lg" />
                      <p className="text-white font-bold text-xl drop-shadow-lg px-4">
                        {highlight.title}
                      </p>
                      {highlight.eventYear && (
                        <span className="text-white/80 font-medium">
                          {highlight.eventYear}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No highlights available at this moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sponsors & Authority Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#E37F4E] font-bold tracking-wider uppercase text-sm">
              Supported By
            </span>
            <h2 className="text-4xl font-bold text-[#2A3A53] mt-2">
              Our Partners & Sponsors
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-16 max-w-4xl mx-auto">
            {sponsors.length > 0 ? (
              sponsors.map((sponsor, index) => (
                <a
                  key={sponsor.id || index}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[160px] aspect-square bg-white rounded-3xl flex items-center justify-center border border-gray-100 hover:border-[#6F67BA]/40 transition-all duration-500 hover:-translate-y-2 p-6 shadow-sm hover:shadow-xl"
                >
                  <ImageWithFallback
                    src={sponsor.logoImageUrl}
                    alt={`${sponsor.name} logo`}
                    className="w-full h-full object-contain mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </a>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Sponsors to be announced.
              </div>
            )}
          </div>

          <div className="text-center">
            <button className="px-10 py-5 bg-[#E37F4E] text-white font-bold rounded-xl hover:bg-[#d36e3d] transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-[#E37F4E]/50 text-lg">
              Become a Sponsor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
