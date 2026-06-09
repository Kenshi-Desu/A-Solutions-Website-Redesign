import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMissionVisions } from "../../hooks/useMissionVision";
import { MissionVisionPatchRequest } from "../../../api/api-client";

export default function MissionVision() {
  const [isSaving, setIsSaving] = useState(false);

  // 1. Destructure our state from the custom hook
  const { data: settings, isLoading, updateItem } = useMissionVisions();

  // 2. Wait for data before rendering the form to prevent empty textareas
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#6F67BA]" size={40} />
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    // Automatically extract all form values via their "name" attributes
    const formData = new FormData(e.currentTarget);

    const payload: MissionVisionPatchRequest = {
      id: settings?.id ?? 1,
      missionStatement: formData.get("missionStatement") as string,
      visionStatement: formData.get("visionStatement") as string,
    };

    try {
      if (updateItem) {
        await updateItem(payload);
      }
      toast.success("Mission & Vision updated successfully!", {
        style: {
          background: "#f0fdf4",
          color: "#16a34a",
          borderColor: "#4ade80",
        },
      });
    } catch (error) {
      toast.error("Failed to update Mission & Vision.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Mission & Vision
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>About Us Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Mission & Vision</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#333333]">
              Global Content
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Update the organization's core statements
            </p>
          </div>
        </div>

        {/* 3. Wrap everything in a form and attach onSubmit */}
        <form onSubmit={handleSave} className="p-6 space-y-8">
          
          {/* Mission Statement */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Mission Statement
            </label>
            <p className="text-sm text-gray-500 mb-3">
              This text defines the core purpose and focus of the organization.
            </p>
            <textarea
              name="missionStatement" // Matches the payload property
              rows={5}
              className="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow resize-y"
              defaultValue={settings?.missionStatement || ""}
              required
            />
          </div>

          <hr className="border-gray-100" />

          {/* Vision Statement */}
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Vision Statement
            </label>
            <p className="text-sm text-gray-500 mb-3">
              This text defines the long-term goal of the organization.
            </p>
            <textarea
              name="visionStatement" // Matches the payload property
              rows={5}
              className="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow resize-y"
              defaultValue={settings?.visionStatement || ""}
              required
            />
          </div>

          {/* Form Actions */}
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
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}