import { useState } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Timeline() {
  const [isSaving, setIsSaving] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, year: '2018', description: 'Inaugural Olongapo City Robotics Cup with 50 participating schools.' },
    { id: 2, year: '2020', description: 'Transitioned to virtual competition format due to the pandemic.' },
    { id: 3, year: '2023', description: 'Largest attendance with over 500 student participants.' },
  ]);

  const handleAddEvent = () => {
    setTimelineEvents([...timelineEvents, { id: Date.now(), year: '', description: '' }]);
  };

  const handleRemoveEvent = (id: number) => {
    setTimelineEvents(timelineEvents.filter(e => e.id !== id));
  };

  const handleChange = (id: number, field: 'year' | 'description', value: string) => {
    setTimelineEvents(timelineEvents.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Timeline updated successfully", {
        style: { background: '#f0fdf4', color: '#16a34a', borderColor: '#4ade80' }
      });
    }, 1200);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">Manage OCRC Timeline</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>OCRC Event Info</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Timeline</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="space-y-4">
            {timelineEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="w-32">
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Year</label>
                  <input
                    type="text"
                    value={event.year}
                    onChange={(e) => handleChange(event.id, 'year', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                    placeholder="e.g. 2026"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Event Description</label>
                  <textarea
                    value={event.description}
                    onChange={(e) => handleChange(event.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent resize-y"
                    rows={2}
                    placeholder="Enter description..."
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveEvent(event.id)}
                  className="mt-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddEvent}
            className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg font-semibold hover:border-[#6F67BA] hover:text-[#6F67BA] transition-colors flex items-center justify-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Timeline Year</span>
          </button>

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