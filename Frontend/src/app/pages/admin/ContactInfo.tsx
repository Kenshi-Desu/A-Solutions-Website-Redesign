import { useState } from "react";
import {
  Save,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useContactSettingss } from "../../hooks/useContactSettings";
import { ContactSettingsPatchRequest } from "../../../api/api-client";

export default function ContactInfo() {
  const [isSaving, setIsSaving] = useState(false);

  // Destructure state and actions directly from your custom hook
  const { data: settings, isLoading, updateItem } = useContactSettingss();

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

    const payload: ContactSettingsPatchRequest = {
      // Fallback to 1 if id doesn't exist yet
      id: settings?.id ?? 1,
      contactPhone: formData.get("contactPhone") as string,
      contactEmail: formData.get("contactEmail") as string,
      physicalAddress: formData.get("physicalAddress") as string,
      businessHours: formData.get("businessHours") as string,
    };

    try {
      // Call the update method from your hook
      if (updateItem) {
        await updateItem(payload);
      }

      toast.success("Contact settings updated successfully", {
        style: {
          background: "#f0fdf4",
          color: "#16a34a",
          borderColor: "#4ade80",
        },
      });
    } catch (error) {
      console.error("Failed to update contact settings:", error);
      toast.error("An error occurred while saving the changes.");
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state skeleton/spinner handled by the hook's isLoading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-[#6F67BA]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-500">
          Loading contact settings...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Contact Info & Hours
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Contact Settings</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">
              Contact Info & Hours
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-3xl">
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-[#333333] text-lg">
              Local Display Settings
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              This information is displayed in the footer and on the Contact Us
              page.
            </p>
          </div>
          {!settings?.id && (
            <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <AlertCircle size={14} className="mr-1.5" /> First Time Setup
            </span>
          )}
        </div>

        {/* Adding key forces the form to re-render with the fetched defaultValues once loaded */}
        <form
          onSubmit={handleSave}
          className="p-8 space-y-8"
          key={settings?.id || "new"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone Number */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
                <Phone size={16} className="text-[#6F67BA]" />
                <span>Primary Phone</span>
              </label>
              <input
                type="text"
                name="contactPhone"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                defaultValue={settings?.contactPhone || ""}
                placeholder="+63 917 832 6822"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
                <Mail size={16} className="text-[#6F67BA]" />
                <span>Support Email</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                defaultValue={settings?.contactEmail || ""}
                placeholder="info@aplussolutions.com"
                required
              />
            </div>
          </div>

          {/* Physical Address */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
              <MapPin size={16} className="text-[#6F67BA]" />
              <span>Physical Address</span>
            </label>
            <input
              type="text"
              name="physicalAddress"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
              defaultValue={settings?.physicalAddress || ""}
              placeholder="Olongapo City, Philippines"
              required
            />
          </div>

          <hr className="border-gray-100" />

          {/* Business Hours */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-[#333333] mb-2 uppercase tracking-wide">
              <Clock size={16} className="text-[#6F67BA]" />
              <span>Business Hours Display Text</span>
            </label>
            <textarea
              rows={3}
              name="businessHours"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow resize-y"
              defaultValue={settings?.businessHours || ""}
              placeholder={
                "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 3:00 PM\nSunday: Closed"
              }
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
