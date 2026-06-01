import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

// Mock employee data
const mockEmployees = [
  {
    id: 'EMP-001',
    name: 'Maria Santos',
    role: 'Lead Instructor',
    dateAdded: 'Jan 15, 2026',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'EMP-002',
    name: 'David Reyes',
    role: 'Robotics Engineer',
    dateAdded: 'Feb 03, 2026',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'EMP-003',
    name: 'Elena Cortez',
    role: 'Operations Manager',
    dateAdded: 'Mar 12, 2026',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'EMP-004',
    name: 'Juan Dela Cruz',
    role: 'Software Developer',
    dateAdded: 'Apr 28, 2026',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  },
];

export default function Employees() {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<typeof mockEmployees>([]);

  // Simulate API fetch
  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      setEmployees(mockEmployees);
      setIsLoading(false);
      // Removed the success toast here so it's not annoying on page load, 
      // but showing we use sonner.
    }, 1500);

    return () => clearTimeout(fetchTimer);
  }, []);

  const handleDelete = (id: string) => {
    toast.error("Employee removed successfully", {
      style: { background: '#fef2f2', color: '#ef4444', borderColor: '#f87171' }
    });
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleAdd = () => {
    toast.success("Adding new employee form would open", {
      style: { background: '#f0fdf4', color: '#16a34a', borderColor: '#4ade80' }
    });
  };

  const handleEdit = () => {
    toast.success("Employee updated successfully", {
      style: { background: '#f0fdf4', color: '#16a34a', borderColor: '#4ade80' }
    });
  };

  return (
    <div className="animate-in fade-in duration-300">
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
        <button 
          onClick={handleAdd}
          className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 font-semibold shadow-sm transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Add New Employee</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex justify-between items-center">
        <div className="relative w-64">
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-[#333333] border border-gray-300 px-4 py-2 rounded-lg text-sm bg-gray-50">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium border-b border-gray-200 w-1/3">Employee</th>
              <th className="px-6 py-4 font-medium border-b border-gray-200 w-1/4">Role</th>
              <th className="px-6 py-4 font-medium border-b border-gray-200 w-1/5">Date Added</th>
              <th className="px-6 py-4 font-medium border-b border-gray-200 w-1/6">Status</th>
              <th className="px-6 py-4 font-medium border-b border-gray-200 text-right w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {isLoading ? (
              // Skeleton Loading State
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-100 rounded w-16"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Actual Data
              employees.map((emp) => (
                <tr 
                  key={emp.id} 
                  className="hover:bg-blue-50/50 transition-colors duration-150 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
                        <ImageWithFallback src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#333333]">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{emp.role}</td>
                  <td className="px-6 py-4 text-gray-500">{emp.dateAdded}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      emp.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={handleEdit}
                        className="p-2 text-gray-400 hover:text-[#6F67BA] hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(emp.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{isLoading ? 0 : employees.length}</span> of <span className="font-medium">{isLoading ? 0 : employees.length}</span> results
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 text-gray-600" disabled>Previous</button>
            <button className="px-3 py-1 bg-[#6F67BA] text-white border border-[#6F67BA] rounded text-sm font-medium">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 text-gray-600" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}