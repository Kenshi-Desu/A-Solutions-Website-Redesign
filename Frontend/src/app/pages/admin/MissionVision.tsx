import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function MissionVision() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call to save data
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Global content updated successfully!", {
        style: { background: '#f0fdf4', color: '#16a34a', borderColor: '#4ade80' }
      });
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">Manage Mission & Vision</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>About Us Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Mission & Vision</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-[#333333] text-lg">Global Content Edit</h2>
          <span className="text-xs bg-[#E37F4E]/10 text-[#E37F4E] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Live on site
          </span>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-8">
          {/* Mission Field */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
              Our Mission
            </label>
            <p className="text-xs text-gray-500 mb-3">This text appears in the hero section of the About Us page.</p>
            <textarea 
              rows={5}
              className="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow resize-y"
              defaultValue="To empower the next generation with the knowledge, skills, and confidence to thrive in a technology-driven world through innovative education in coding, robotics, and STEM."
            />
          </div>

          {/* Vision Field */}
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
              Our Vision
            </label>
            <p className="text-xs text-gray-500 mb-3">This text defines the long-term goal of the organization.</p>
            <textarea 
              rows={5}
              className="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow resize-y"
              defaultValue="To be the premier development center recognized globally for nurturing innovative thinkers, problem solvers, and tech leaders of tomorrow."
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
            <button 
              type="button" 
              disabled={isSaving}
              className="px-6 py-2.5 text-[#333333] font-semibold hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white px-6 py-2.5 rounded-lg flex items-center space-x-2 font-semibold shadow-sm transition-colors duration-200 disabled:opacity-75"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}