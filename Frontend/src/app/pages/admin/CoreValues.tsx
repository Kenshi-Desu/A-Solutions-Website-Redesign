import { useState } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CoreValues() {
  const [isSaving, setIsSaving] = useState(false);
  const [values, setValues] = useState([
    { id: 1, text: 'Innovation in Education' },
    { id: 2, text: 'Excellence in Technology' },
    { id: 3, text: 'Empowering Future Leaders' },
  ]);

  const handleAddValue = () => {
    setValues([...values, { id: Date.now(), text: '' }]);
  };

  const handleRemoveValue = (id: number) => {
    setValues(values.filter(v => v.id !== id));
  };

  const handleChange = (id: number, text: string) => {
    setValues(values.map(v => v.id === id ? { ...v, text } : v));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Core Values updated successfully", {
        style: { background: '#f0fdf4', color: '#16a34a', borderColor: '#4ade80' }
      });
    }, 1200);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">Manage Core Values</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>About Us Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Core Values</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-3xl">
        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="space-y-4">
            {values.map((value, index) => (
              <div key={value.id} className="flex items-center space-x-4">
                <span className="text-gray-400 font-bold w-6">{index + 1}.</span>
                <input
                  type="text"
                  value={value.text}
                  onChange={(e) => handleChange(value.id, e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                  placeholder="Enter core value"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveValue(value.id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddValue}
            className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg font-semibold hover:border-[#6F67BA] hover:text-[#6F67BA] transition-colors flex items-center justify-center space-x-2"
          >
            <Plus size={18} />
            <span>Add New Core Value</span>
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