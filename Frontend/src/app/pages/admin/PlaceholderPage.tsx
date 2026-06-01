import { useLocation } from 'react-router';

export default function PlaceholderPage() {
  const location = useLocation();
  
  const titleMap: Record<string, string> = {
    '/admin/offers': 'Manage Offers/Services',
    '/admin/achievements': 'Manage Achievements',
    '/admin/feedback': 'Manage Feedback/Testimonials',
    '/admin/partners': 'Manage Partners',
    '/admin/event-details': 'Manage Next Event Details',
    '/admin/timeline': 'Manage OCRC Timeline',
    '/admin/highlights': 'Manage Past Event Highlights',
    '/admin/sponsors': 'Manage Event Sponsors',
    '/admin/news-sync': 'Facebook API Sync Status',
    '/admin/core-values': 'Manage Core Values'
  };

  const title = titleMap[location.pathname] || 'Admin Module';

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">{title}</h1>
          <div className="text-sm text-gray-500 mt-1">
            Module under construction
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
        <div className="p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <h2 className="text-xl font-semibold text-[#333333] mb-2">Coming Soon</h2>
          <p className="text-gray-500 max-w-md">
            The {title} interface is currently being developed. Please check back later or use the available modules in the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
}