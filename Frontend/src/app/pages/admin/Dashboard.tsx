export default function Dashboard() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">Dashboard Overview</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Dashboard</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#6F67BA]">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Employees</h3>
          <p className="text-3xl font-bold text-[#333333]">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#E37F4E]">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Active Partners</h3>
          <p className="text-3xl font-bold text-[#333333]">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#2A3A53]">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">OCRC Registered Teams</h3>
          <p className="text-3xl font-bold text-[#333333]">45</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-[#333333] mb-4">Welcome to A+ Solutions Admin</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Use the sidebar navigation on the left to manage the dynamic content of the website. 
          Changes made here will be reflected instantly on the public frontend.
        </p>
      </div>
    </div>
  );
}