import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

import { useMissionVisions } from "../../hooks/useMissionVision";
import { MissionVisionPatchRequest } from "../../../api/api-client";
import { handleAdminFormSubmit } from "../../utils/adminFormUitils"; // Ensure this matches your file spelling exactly

// ============================================================================
// IMPORTING YOUR REUSABLE UI COMPONENTS
// ============================================================================
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";

export default function MissionVision() {
  const [isSaving, setIsSaving] = useState(false);

  const { data: settings, isLoading, updateItem } = useMissionVisions();

  // --- SAVE HANDLER ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    // We pass `any` for TCreate since a singleton page only ever updates (PATCH)
    await handleAdminFormSubmit<any, MissionVisionPatchRequest>({
      event: e,
      isUpdate: true, // Always true for singleton settings pages
      editingId: settings?.id || 1,

      // Magic fix: Using the new Singleton update property
      updateSingletonItem: updateItem,

      setIsSaving,
      successMessage: "Mission & Vision updated successfully!",
      buildPayload: (formData) => ({
        missionStatement: formData.get("missionStatement") as string,
        visionStatement: formData.get("visionStatement") as string,
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
            Manage Mission & Vision
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>About Us Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Mission & Vision</span>
          </div>
        </div>
      </div>

      <Card className="max-w-4xl border-gray-200 shadow-sm overflow-hidden">
        {/* Custom Header matching the old design */}
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

        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Mission Statement */}
            <div className="space-y-2">
              <Label className="block text-sm font-semibold text-[#333333] mb-1 normal-case tracking-normal">
                Mission Statement
              </Label>
              <p className="text-sm text-gray-500 mb-3">
                This text defines the core purpose and focus of the
                organization.
              </p>
              <textarea
                name="missionStatement"
                rows={5}
                className="flex min-h-25 w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                defaultValue={settings?.missionStatement || ""}
                required
              />
            </div>

            <hr className="border-gray-100" />

            {/* Vision Statement */}
            <div className="space-y-2">
              <Label className="block text-sm font-semibold text-[#333333] mb-1 normal-case tracking-normal">
                Vision Statement
              </Label>
              <p className="text-sm text-gray-500 mb-3">
                This text defines the long-term goal of the organization.
              </p>
              <textarea
                name="visionStatement"
                rows={5}
                className="flex min-h-25 w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                defaultValue={settings?.visionStatement || ""}
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
                <span>{isSaving ? "Saving Changes..." : "Save Changes"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
