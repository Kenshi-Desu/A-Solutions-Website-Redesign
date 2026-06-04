import { ExternalLink, Calendar, Facebook, Share2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Mock data for Facebook posts
const facebookPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    text: 'Exciting news! Our students just completed their final robotics projects. The innovation and creativity displayed were truly inspiring. Swipe to see some of the amazing creations! 🤖✨',
    date: 'May 28, 2026',
    link: 'https://www.facebook.com/APSDevCenter',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    text: 'Registration for our upcoming Summer Coding Bootcamp is now open! 🌞💻 Give your child the gift of learning this summer with our comprehensive courses in Python, Web Development, and Game Design. Spaces are limited, so secure your spot today!',
    date: 'May 25, 2026',
    link: 'https://www.facebook.com/APSDevCenter',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    text: 'A huge congratulations to the A+ Solutions team for winning 1st place at the Regional STEM Fair! 🏆 Your hard work and dedication have paid off. We are so proud of you!',
    date: 'May 20, 2026',
    link: 'https://www.facebook.com/APSDevCenter',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    text: 'Sneak peek at our new state-of-the-art computer lab! 🖥️🚀 We are constantly upgrading our facilities to provide the best learning environment for our students. Can\'t wait to see what they will build here!',
    date: 'May 15, 2026',
    link: 'https://www.facebook.com/APSDevCenter',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    text: 'Join us next week for a free introductory workshop on AI and Machine Learning. Perfect for high school students looking to explore the world of artificial intelligence. Register via the link in our bio!',
    date: 'May 10, 2026',
    link: 'https://www.facebook.com/APSDevCenter',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    text: 'Throwback to last year\'s OCRC event! 🤖 The energy and excitement were off the charts. We can\'t wait to bring that same spirit to OCRC 2026. Are you ready?',
    date: 'May 5, 2026',
    link: 'https://www.facebook.com/APSDevCenter',
  },
];

export default function News() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6F67BA]/80 to-[#5d57a0]/80"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E37F4E] rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/40 shadow-sm">
            <Facebook className="text-white" size={20} />
            <span className="text-white font-bold tracking-wide uppercase text-sm drop-shadow-md">
              Official Feed
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">News & Updates</h1>
          <p className="text-xl text-white/95 max-w-2xl mx-auto font-medium drop-shadow-md">
            Stay up to date with the latest announcements, events, and student highlights from A+ Solutions.
          </p>
        </div>
      </section>

      {/* Grid Layout Section */}
      <section className="py-24 relative z-20 -mt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* We'll use a CSS columns layout for a masonry effect */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {facebookPosts.map((post) => (
              <div 
                key={post.id} 
                className="break-inside-avoid bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col group transform hover:-translate-y-2"
              >
                {/* Facebook header mockup */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white/60">
                   <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-[#2A3A53] rounded-full flex items-center justify-center text-white font-bold">
                       A+
                     </div>
                     <div>
                       <p className="text-[#2A3A53] font-bold text-sm leading-tight">A+ Solutions</p>
                       <div className="flex items-center text-gray-500 text-xs mt-0.5 space-x-1">
                         <span>{post.date}</span>
                         <span>•</span>
                         <Facebook size={10} className="text-[#6F67BA]" />
                       </div>
                     </div>
                   </div>
                   <button className="text-gray-400 hover:text-[#6F67BA] transition-colors">
                     <Share2 size={18} />
                   </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow bg-white/40">
                  <p className="text-[#333333] mb-5 flex-grow text-[15px] leading-relaxed line-clamp-4">
                    {post.text}
                  </p>
                  
                  {/* Image Placeholder */}
                  <div className="relative rounded-xl overflow-hidden shadow-sm mb-6 aspect-video">
                    <ImageWithFallback 
                      src={post.image} 
                      alt="Facebook post thumbnail" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Read More Link */}
                  <div className="pt-4 border-t border-gray-100/80">
                    <a 
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-3 bg-[#E37F4E]/10 text-[#E37F4E] font-bold rounded-xl hover:bg-[#E37F4E] hover:text-white transition-all duration-300 space-x-2"
                    >
                      <span>Read More on Facebook</span>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center relative z-20">
            <a 
              href="https://www.facebook.com/APSDevCenter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 px-10 py-5 bg-[#6F67BA] text-white font-bold rounded-xl hover:bg-[#5d57a0] transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-[#6F67BA]/50 text-lg"
            >
              <Facebook size={24} />
              <span>Follow Us on Facebook</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}