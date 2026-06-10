import {
  Users,
  Handshake,
  Briefcase,
  Trophy,
  MessageSquare,
} from "lucide-react";
import { useTeamMemberss } from "../../hooks/useTeamMembers";
import { useAffiliates } from "../../hooks/useAffiliates";
import { useServices } from "../../hooks/useService";
import { useAchievements } from "../../hooks/useAchievements";
import { useTestimonials } from "../../hooks/useTestimonials";

export default function Dashboard() {
  const { data: team } = useTeamMemberss();
  const { data: affiliates } = useAffiliates();
  const { data: services } = useServices();
  const { data: achievements } = useAchievements();
  const { data: testimonials } = useTestimonials();

  const stats = [
    {
      label: "Team Members",
      value: team?.length || 0,
      color: "border-[#6F67BA]",
      icon: Users,
    },
    {
      label: "Active Affiliates",
      value: affiliates?.filter((a) => a.isActive)?.length || 0,
      color: "border-[#E37F4E]",
      icon: Handshake,
    },
    {
      label: "Services Offered",
      value: services?.filter((s) => s.isActive)?.length || 0,
      color: "border-[#2A3A53]",
      icon: Briefcase,
    },
    {
      label: "Achievements",
      value: achievements?.length || 0,
      color: "border-[#6F67BA]",
      icon: Trophy,
    },
    {
      label: "Pending Reviews",
      value: testimonials?.filter((t) => !t.isApproved)?.length || 0,
      color: "border-[#E37F4E]",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back. Here is the current status of your platform content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 ${stat.color}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </h3>
                <Icon size={18} className="text-gray-400" />
              </div>
              <p className="text-3xl font-bold text-[#333333] mt-2">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#333333] mb-4">
          A+ Solutions Admin Portal
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Manage your website content efficiently. The metrics above reflect
          live data from your database. Use the navigation menu to perform CRUD
          operations on specific modules.
        </p>
      </div>
    </div>
  );
}
