import { Database } from 'lucide-react';

export default function Employees() {
  return (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">Manage Employees</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>About Us Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Employees</span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col items-center justify-center p-16 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-8 border-gray-100">
          <Database size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#333333] mb-3">Database Integration Coming Soon</h2>
        <p className="text-gray-500 max-w-md mb-8">
          This feature requires a connection to the ASP.NET Core Web API + Supabase backend. It will be activated in Phase 2 of the development lifecycle.
        </p>
      </div>
    </div>
  );
}