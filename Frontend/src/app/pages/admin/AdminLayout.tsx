import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Toaster } from "sonner";
import {
  Globe,
  Bot,
  Info,
  Phone,
  LogOut,
  LayoutDashboard,
  Newspaper,
  Menu,
  X,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import aplusLogo from "../../../imports/A__logo.png";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Your original grouped logic
  const navigationGroups = [
    {
      label: "Main",
      items: [
        {
          path: "/admin",
          icon: LayoutDashboard,
          label: "Dashboard Overview",
          end: true,
        },
      ],
    },
    {
      label: "Home Page Content",
      icon: Globe,
      items: [
        { path: "/admin/offers", label: "Manage Offers/Services" },
        { path: "/admin/achievements", label: "Manage Achievements/Awards" },
        { path: "/admin/feedback", label: "Manage Feedback/Testimonials" },
        { path: "/admin/partners", label: "Manage Partners" },
      ],
    },
    {
      label: "OCRC Event Info",
      icon: Bot,
      items: [
        { path: "/admin/event-details", label: "Manage Next Event Details" },
        { path: "/admin/timeline", label: "Manage OCRC Timeline" },
        { path: "/admin/highlights", label: "Manage Past Event Highlights" },
        { path: "/admin/sponsors", label: "Manage Event Sponsors" },
      ],
    },
    {
      label: "News & Updates",
      icon: Newspaper,
      items: [{ path: "/admin/news-sync", label: "Facebook API Sync Status" }],
    },
    {
      label: "About Us Content",
      icon: Info,
      items: [
        { path: "/admin/mission-vision", label: "Manage Mission & Vision" },
        { path: "/admin/core-values", label: "Manage Core Values" },
        { path: "/admin/employees", label: "Manage Employees" },
      ],
    },
    {
      label: "Contact Settings",
      icon: Phone,
      items: [
        { path: "/admin/contact-info", label: "Manage Contact Info & Hours" },
      ],
    },
  ];

  const handleLogout = () => {
    // Navigate to root based on your provided logout logic
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex overflow-hidden font-sans text-[#2A3A53]">
      {/* Mobile Sidebar Overlay */}
      {!isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#2A3A53]/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100/80 justify-between">
          <div className="flex items-center gap-3">
            {/* Logo integrated into the new design */}
            <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm p-1">
              <ImageWithFallback
                src={aplusLogo}
                alt="A+ Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-extrabold text-xl tracking-tight text-[#2A3A53] leading-none">
                Admin Panel
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E37F4E]">
                A+ Solutions
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6 custom-scrollbar">
          {navigationGroups.map((group, idx) => (
            <div key={idx}>
              {/* Group Header */}
              <div className="mb-3 px-3 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {group.icon && <group.icon size={14} />}
                <span>{group.label}</span>
              </div>

              {/* Group Links */}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 group ${
                        isActive
                          ? "bg-[#6F67BA]/10 text-[#6F67BA]"
                          : "text-gray-500 hover:bg-gray-50 hover:text-[#2A3A53]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.icon ? (
                          <item.icon
                            className={`h-5 w-5 transition-colors ${isActive ? "text-[#6F67BA]" : "text-gray-400 group-hover:text-[#2A3A53]"}`}
                          />
                        ) : (
                          // Spacer block so text without icons still aligns perfectly with text that does
                          <div className="w-5 h-5" />
                        )}
                        <span className="text-sm">{item.label}</span>
                        {/* Subtle active indicator dot */}
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6F67BA]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer / User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6F67BA] border-2 border-white shadow-sm flex items-center justify-center text-white font-bold">
                AD
              </div>
              <div>
                <p className="text-sm font-bold text-[#2A3A53]">System Admin</p>
                <p className="text-xs text-gray-500 font-medium">
                  admin@aplus.edu
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Added Toaster from Sonner here so it covers the whole screen */}
        <Toaster position="top-right" richColors />

        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-[#2A3A53] hidden sm:block">
              Dashboard Workspace
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-[#E37F4E]/10 text-[#E37F4E] text-sm font-bold rounded-lg hover:bg-[#E37F4E]/20 transition-colors"
            >
              View Website
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 relative">
          {/* Abstract decorative background behind content */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6F67BA]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
