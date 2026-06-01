import { Link, Outlet, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import { 
  Home, 
  Globe, 
  Bot, 
  Info, 
  Phone, 
  LogOut, 
  LayoutDashboard,
  Users,
  Settings,
  Newspaper,
  Image as ImageIcon
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import aplusLogo from '../../../imports/A_LogoNoBackground_upscayl_4x_upscayl-standard-4x__1_.svg';

export default function AdminLayout() {
  const location = useLocation();

  const navigationGroups = [
    {
      label: 'Main',
      items: [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard Overview' },
      ]
    },
    {
      label: 'Home Page Content',
      icon: Globe,
      items: [
        { path: '/admin/offers', label: 'Manage Offers/Services' },
        { path: '/admin/achievements', label: 'Manage Achievements' },
        { path: '/admin/feedback', label: 'Manage Feedback/Testimonials' },
        { path: '/admin/partners', label: 'Manage Partners' },
      ]
    },
    {
      label: 'OCRC Event Info',
      icon: Bot,
      items: [
        { path: '/admin/event-details', label: 'Manage Next Event Details' },
        { path: '/admin/timeline', label: 'Manage OCRC Timeline' },
        { path: '/admin/highlights', label: 'Manage Past Event Highlights' },
        { path: '/admin/sponsors', label: 'Manage Event Sponsors' },
      ]
    },
    {
      label: 'News & Updates',
      icon: Newspaper,
      items: [
        { path: '/admin/news-sync', label: 'Facebook API Sync Status' },
      ]
    },
    {
      label: 'About Us Content',
      icon: Info,
      items: [
        { path: '/admin/mission-vision', label: 'Manage Mission & Vision' },
        { path: '/admin/core-values', label: 'Manage Core Values' },
        { path: '/admin/employees', label: 'Manage Employees' },
      ]
    },
    {
      label: 'Contact Settings',
      icon: Phone,
      items: [
        { path: '/admin/contact-info', label: 'Manage Contact Info & Hours' },
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-[#2A3A53] text-white flex flex-col fixed h-full shadow-xl z-20 overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-lg p-2 mb-3">
            <ImageWithFallback src={aplusLogo} alt="A+ Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-bold text-lg text-center tracking-wide">Admin Dashboard</h2>
          <span className="text-[#E37F4E] text-xs font-semibold uppercase tracking-wider mt-1">A+ Solutions</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6">
          {navigationGroups.map((group, idx) => (
            <div key={idx}>
              <div className="flex items-center space-x-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-3 px-3">
                {group.icon && <group.icon size={14} />}
                <span>{group.label}</span>
              </div>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        isActive(item.path)
                          ? 'bg-[#6F67BA] text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.icon && <item.icon size={18} className={isActive(item.path) ? 'text-white' : 'text-gray-400'} />}
                      <span className={item.icon ? '' : 'pl-2'}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#6F67BA] flex items-center justify-center text-white font-bold text-lg">
              AD
            </div>
            <div>
              <p className="text-sm font-bold text-white">System Admin</p>
              <p className="text-xs text-gray-400">admin@aplus.edu</p>
            </div>
          </div>
          <Link to="/" className="flex items-center space-x-2 text-sm text-[#E37F4E] hover:text-white transition-colors w-full p-2 rounded-lg hover:bg-white/10">
            <LogOut size={16} />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <Toaster position="top-right" richColors />
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}