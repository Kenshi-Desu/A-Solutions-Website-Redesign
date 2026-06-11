import { useState } from "react";
import {
  Save,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
} from "lucide-react";

import { useOCRCEventDetailss } from "../../hooks/useOCRCEventDetails";
import { OCRCEventDetailsPatchRequest } from "../../../api/api-client";
import { handleAdminFormSubmit } from "../../utils/adminFormUitils"; // Make sure the spelling matches your utility file name

// ============================================================================
// IMPORTING YOUR REUSABLE UI COMPONENTS
// ============================================================================
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";

export default function EventDetails() {
  const [isSaving, setIsSaving] = useState(false);

  const { data: settings, isLoading, updateItem } = useOCRCEventDetailss();

  // --- SAVE HANDLER ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleAdminFormSubmit<any, OCRCEventDetailsPatchRequest>({
      event: e,
      isUpdate: true, // Always true for singleton settings pages
      editingId: settings?.id || 1,
      updateSingletonItem: updateItem,
      setIsSaving,
      successMessage: "Event details updated successfully!",
      buildPayload: (formData) => ({
        eventDate: formData.get("eventDate") as string,
        eventTime: formData.get("eventTime") as string,
        venueName: formData.get("venueName") as string,
        eligibility: formData.get("eligibility") as string,
        rulesPdfUrl: formData.get("rulesPdfUrl") as string,
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Event Details
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>OCRC Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Event Details</span>
          </div>
        </div>
      </div>

      <Card className="max-w-4xl border-gray-200 shadow-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Date */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Calendar size={16} className="text-[#6F67BA]" />
                  <span>Event Date</span>
                </Label>
                <Input
                  type="date"
                  name="eventDate"
                  defaultValue={
                    settings?.eventDate
                      ? new Date(settings.eventDate).toISOString().split("T")[0]
                      : ""
                  }
                  required
                />
              </div>

              {/* Event Time */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Clock size={16} className="text-[#6F67BA]" />
                  <span>Event Time</span>
                </Label>
                <Input
                  type="text"
                  name="eventTime"
                  defaultValue={settings?.eventTime || ""}
                  placeholder="e.g., 8:00 AM - 5:00 PM"
                  required
                />
              </div>

              {/* Venue Name */}
              <div className="md:col-span-2 space-y-2">
                <Label className="flex items-center space-x-2">
                  <MapPin size={16} className="text-[#6F67BA]" />
                  <span>Venue Name</span>
                </Label>
                <Input
                  type="text"
                  name="venueName"
                  defaultValue={settings?.venueName || ""}
                  placeholder="e.g., SMX Convention Center"
                  required
                />
              </div>

              {/* Eligibility */}
              <div className="md:col-span-2 space-y-2">
                <Label className="flex items-center space-x-2">
                  <Users size={16} className="text-[#6F67BA]" />
                  <span>Eligibility Requirements</span>
                </Label>
                <Input
                  type="text"
                  name="eligibility"
                  defaultValue={settings?.eligibility || ""}
                  placeholder="e.g., High School and College Students"
                  required
                />
              </div>

              {/* Rules PDF URL */}
              <div className="md:col-span-2 space-y-2">
                <Label className="flex items-center space-x-2">
                  <FileText size={16} className="text-[#6F67BA]" />
                  <span>Rules & Guidelines (PDF URL)</span>
                </Label>
                <Input
                  type="url"
                  name="rulesPdfUrl"
                  defaultValue={settings?.rulesPdfUrl || ""}
                  placeholder="https://example.com/rules.pdf"
                  required
                />
              </div>
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
                <span>
                  {isSaving ? "Saving Changes..." : "Save Event Details"}
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
