import { Outlet } from 'react-router';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#F8F9FA]">
      {/* Global Background Mesh Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6F67BA] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-[#E37F4E] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-[#2A3A53] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navigation />
      <main className="flex-grow pt-20 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
