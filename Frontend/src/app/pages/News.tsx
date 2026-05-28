import { ExternalLink, Calendar, Facebook } from 'lucide-react';
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
    <div className="min-h-screen bg-[#2A3A53]">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#6F67BA] to-[#5d57a0] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-white/20 rounded-full">
            <Facebook className="text-white" size={20} />
            <span className="text-white font-semibold tracking-wide uppercase text-sm">
              Official Feed
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">News & Updates</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Stay up to date with the latest announcements, events, and student highlights from A+ Solutions.
          </p>
        </div>
      </section>

      {/* Grid Layout Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facebookPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-[#1f2937] rounded-xl overflow-hidden border border-[#6F67BA]/20 hover:border-[#6F67BA] transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6F67BA]/10"
              >
                {/* Image Placeholder */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback 
                    src={post.image} 
                    alt="Facebook post thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#2A3A53]/80 backdrop-blur-sm p-2 rounded-full">
                    <Facebook className="text-[#6F67BA] w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  
                  <p className="text-gray-300 line-clamp-4 mb-6 flex-grow">
                    {post.text}
                  </p>
                  
                  {/* Read More Link */}
                  <a 
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[#E37F4E] font-semibold hover:text-[#d36e3d] transition-colors mt-auto"
                  >
                    <span>Read More on Facebook</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="https://www.facebook.com/APSDevCenter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#6F67BA] text-white font-semibold rounded-lg hover:bg-[#5d57a0] transition-all duration-300 transform hover:scale-105 shadow-lg"
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