import { useState } from "react";
import {
  Save,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useOCRCEventDetailss } from "../../hooks/useOCRCEventDetails";
import { OCRCEventDetailsPatchRequest } from "../../../api/api-client";

export default function EventDetails() {
  const [isSaving, setIsSaving] = useState(false);

  const { data: settings, isLoading, updateItem } = useOCRCEventDetailss();

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

    const formData = new FormData(e.currentTarget);

    // Added '| any' to prevent TypeScript errors if the ID property isn't fully registered in api-client.ts yet
    const payload: OCRCEventDetailsPatchRequest | any = {
      // The crucial missing ID for the backend singleton update
      id: settings?.id ?? 1,
      // Extracted as a string to match the DateOnly API
      eventDate: formData.get("eventDate") as any,
      eventTime: formData.get("eventTime") as string,
      venueName: formData.get("venueName") as string,
      eligibility: formData.get("eligibility") as string,
      rulesPdfUrl: formData.get("rulesPdfUrl") as string,
    };

    try {
      if (updateItem) {
        await updateItem(payload);
      }
      toast.success("Event details updated successfully!", {
        style: {
          background: "#f0fdf4",
          color: "#16a34a",
          borderColor: "#4ade80",
        },
      });
    } catch (error) {
      toast.error("Failed to update event details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Next Event Details
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>OCRC Event Info</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">
              Next Event Details
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-3xl">
        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Date (Updated for DateOnly) */}
            <div>
              <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                <Calendar size={16} className="text-[#6F67BA]" />
                <span>Event Date</span>
              </label>
              <input
                type="date"
                name="eventDate"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                // .split('T')[0] guarantees it strictly matches YYYY-MM-DD for the HTML date input
                defaultValue={
                  settings?.eventDate
                    ? String(settings.eventDate).split("T")[0]
                    : ""
                }
                required
              />
            </div>

            {/* Event Time */}
            <div>
              <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                <Clock size={16} className="text-[#6F67BA]" />
                <span>Event Time</span>
              </label>
              <input
                type="text"
                name="eventTime"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                defaultValue={settings?.eventTime || ""}
                placeholder="e.g., 8:00 AM - 5:00 PM"
                required
              />
            </div>
          </div>

          {/* Venue Name */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
              <MapPin size={16} className="text-[#6F67BA]" />
              <span>Venue Name</span>
            </label>
            <input
              type="text"
              name="venueName"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
              defaultValue={settings?.venueName || ""}
              placeholder="e.g., SMX Convention Center"
              required
            />
          </div>

          {/* Eligibility */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
              <Users size={16} className="text-[#6F67BA]" />
              <span>Eligibility Requirements</span>
            </label>
            <input
              type="text"
              name="eligibility"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
              defaultValue={settings?.eligibility || ""}
              placeholder="e.g., High School and College Students"
              required
            />
          </div>

          {/* Rules PDF URL */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
              <LinkIcon size={16} className="text-[#6F67BA]" />
              <span>Rules & Guidelines (PDF URL)</span>
            </label>
            <input
              type="url"
              name="rulesPdfUrl"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
              defaultValue={settings?.rulesPdfUrl || ""}
              placeholder="https://example.com/rules.pdf"
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
