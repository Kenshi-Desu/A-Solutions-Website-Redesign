import { useState } from 'react';
import { Save, Loader2, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function EventDetails() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Event details updated successfully", {
        style: { background: '#f0fdf4', color: '#16a34a', borderColor: '#4ade80' }
      });
    }, 1200);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">Manage Next Event Details</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>OCRC Event Info</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Next Event Details</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-3xl">
        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
                <Calendar size={16} className="text-[#6F67BA]" />
                <span>Event Date</span>
              </label>
              <input 
                type="date"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                defaultValue="2026-10-15"
                required
              />
            </div>
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
                <Clock size={16} className="text-[#6F67BA]" />
                <span>Time</span>
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                defaultValue="8:00 AM - 5:00 PM"
                required
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
              <MapPin size={16} className="text-[#6F67BA]" />
              <span>Venue Name</span>
            </label>
            <input 
              type="text"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
              defaultValue="Olongapo City Convention Center"
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
              <Users size={16} className="text-[#6F67BA]" />
              <span>Eligibility Requirements</span>
            </label>
            <select
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
              defaultValue="elementary-highschool"
            >
              <option value="all">All Ages / Open</option>
              <option value="elementary">Elementary Students Only</option>
              <option value="highschool">High School Students Only</option>
              <option value="elementary-highschool">Elementary & High School Students</option>
              <option value="college">College Students Only</option>
            </select>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
             <button 
              type="submit" 
              disabled={isSaving}
              className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white px-6 py-2.5 rounded-lg flex items-center space-x-2 font-semibold shadow-sm transition-colors duration-200 disabled:opacity-75"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}