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

import { useContactSettingss } from "../../hooks/useContactSettings";
import { ContactSettingsPatchRequest } from "../../../api/api-client";
import { handleAdminFormSubmit } from "../../utils/adminFormUitils"; // Ensure this matches your file spelling

// ============================================================================
// IMPORTING YOUR REUSABLE UI COMPONENTS
// ============================================================================
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";

export default function ContactInfo() {
  const [isSaving, setIsSaving] = useState(false);

  const { data: settings, isLoading, updateItem } = useContactSettingss();

  // --- SAVE HANDLER ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    // We use the singleton update pattern
    await handleAdminFormSubmit<any, ContactSettingsPatchRequest>({
      event: e,
      isUpdate: true,
      editingId: settings?.id || 1,
      updateSingletonItem: updateItem,
      setIsSaving,
      successMessage: "Contact settings updated successfully!",
      buildPayload: (formData) => ({
        contactPhone: formData.get("contactPhone") as string,
        contactEmail: formData.get("contactEmail") as string,
        physicalAddress: formData.get("physicalAddress") as string,
        businessHours: formData.get("businessHours") as string,
      }),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#6F67BA]" size={40} />
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

      <Card className="max-w-3xl border-gray-200 shadow-sm overflow-hidden">
        {/* Header Section */}
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

        <CardContent className="p-8">
          <form onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone Number */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Phone size={16} className="text-[#6F67BA]" />
                  <span>Primary Phone</span>
                </Label>
                <Input
                  type="text"
                  name="contactPhone"
                  defaultValue={settings?.contactPhone || ""}
                  placeholder="+63 917 832 6822"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Mail size={16} className="text-[#6F67BA]" />
                  <span>Support Email</span>
                </Label>
                <Input
                  type="email"
                  name="contactEmail"
                  defaultValue={settings?.contactEmail || ""}
                  placeholder="info@aplussolutions.com"
                  required
                />
              </div>
            </div>

            {/* Physical Address */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#6F67BA]" />
                <span>Physical Address</span>
              </Label>
              <Input
                type="text"
                name="physicalAddress"
                defaultValue={settings?.physicalAddress || ""}
                placeholder="Olongapo City, Philippines"
                required
              />
            </div>

            <hr className="border-gray-100" />

            {/* Business Hours */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Clock size={16} className="text-[#6F67BA]" />
                <span>Business Hours Display Text</span>
              </Label>
              <textarea
                name="businessHours"
                rows={3}
                className="flex w-full min-h-20 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                defaultValue={settings?.businessHours || ""}
                placeholder="Monday - Friday: 9:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 3:00 PM&#10;Sunday: Closed"
                required
              />
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white flex items-center space-x-2 px-8"
              >
                {isSaving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                <span>{isSaving ? "Saving..." : "Save Contact Settings"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
