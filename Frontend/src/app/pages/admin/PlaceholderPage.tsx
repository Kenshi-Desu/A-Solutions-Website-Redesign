import { useLocation } from "react-router";
import { Database } from "lucide-react";

export default function PlaceholderPage() {
  const location = useLocation();

  const titleMap: Record<string, string> = {
    "/admin/offers": "Manage Offers/Services",
    "/admin/feedback": "Manage Feedback/Testimonials",
    "/admin/partners": "Manage Partners",
    "/admin/highlights": "Manage Past Event Highlights",
    "/admin/sponsors": "Manage Event Sponsors",
    "/admin/news-sync": "Facebook API Sync Status",
    "/admin/employees": "Manage Employees",
  };

  const title = titleMap[location.pathname] || "Database Module";

  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">{title}</h1>
          <div className="text-sm text-gray-500 mt-1">
            Module under construction
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col items-center justify-center p-16 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-8 border-gray-100">
          <Database size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#333333] mb-3">
          Database Integration Coming Soon
        </h2>
        <p className="text-gray-500 max-w-md mb-8">
          This feature requires a connection to the ASP.NET Core Web API +
          Supabase backend. It will be activated in Phase 2 of the development
          lifecycle.
        </p>
      </div>
    </div>
  );
}
