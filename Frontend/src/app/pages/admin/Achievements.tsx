import { useState } from "react";
import {
  Save,
  Loader2,
  Trophy,
  Calendar,
  Image as ImageIcon,
  FileText,
  Hash,
  Tag,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useAchievements } from "../../hooks/useAchievements";
import {
  AchievementPostRequest,
  AchievementPatchRequest,
  AchievementResponse,
} from "../../../api/api-client";

export default function Achievements() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<AchievementResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  // Destructure from the useCrudBase hook
  const {
    data: achievements,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useAchievements();

  // Handle switching to the create form
  const handleAddNew = () => {
    setEditingItem(null);
    setView("form");
  };

  // Handle switching to the edit form
  const handleEdit = (item: AchievementResponse) => {
    setEditingItem(item);
    setView("form");
  };

  // Handle deleting an item
  const handleDelete = async (id: number | undefined) => {
    if (!id || !deleteItem) return;
    try {
      await deleteItem(id);
      toast.success("Achievement deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete achievement.");
    }
  };

  // Handle saving (both Create and Update)
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);

    const payload: AchievementPostRequest | AchievementPatchRequest = {
      title: formData.get("title") as string,
      achievementYear:
        Number(formData.get("achievementYear")) || new Date().getFullYear(),
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      // Note: 'achivementType' retains the spelling generated in api-client.ts
      achivementType: Number(formData.get("achivementType")) || 0,
      displayOrder: Number(formData.get("displayOrder")) || 0,
    };

    try {
      if (editingItem?.id && updateItem) {
        // Update existing
        await updateItem(editingItem.id, payload as AchievementPatchRequest);
        toast.success("Achievement updated successfully!", {
          style: {
            background: "#f0fdf4",
            color: "#16a34a",
            borderColor: "#4ade80",
          },
        });
      } else if (createItem) {
        // Create new
        await createItem(payload as AchievementPostRequest);
        toast.success("Achievement created successfully!", {
          style: {
            background: "#f0fdf4",
            color: "#16a34a",
            borderColor: "#4ade80",
          },
        });
      }
      setView("list");
    } catch (error) {
      toast.error(
        editingItem
          ? "Failed to update achievement."
          : "Failed to create achievement.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // --------------------------------------------------------
  // FORM VIEW
  // --------------------------------------------------------
  if (view === "form") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              {editingItem ? "Edit Achievement" : "Add New Achievement"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>Home Content</span>
              <span>/</span>
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA] transition-colors"
              >
                Achievements
              </button>
              <span>/</span>
              <span className="text-[#E37F4E] font-medium">
                {editingItem ? "Edit" : "New"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setView("list")}
            className="px-4 py-2 text-[#333333] hover:bg-gray-100 rounded-lg flex items-center space-x-2 transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            <span>Back to List</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <Trophy size={16} className="text-[#6F67BA]" />
                  <span>Achievement Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                  defaultValue={editingItem?.title || ""}
                  placeholder="e.g., Best Solutions Provider 2025"
                  required
                />
              </div>

              {/* Achievement Year */}
              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <Calendar size={16} className="text-[#6F67BA]" />
                  <span>Year</span>
                </label>
                <input
                  type="number"
                  name="achievementYear"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                  defaultValue={
                    editingItem?.achievementYear || new Date().getFullYear()
                  }
                  placeholder="e.g., 2025"
                />
              </div>

              {/* Achievement Type */}
              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <Tag size={16} className="text-[#6F67BA]" />
                  <span>Type (Numeric ID)</span>
                </label>
                <input
                  type="number"
                  name="achivementType"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                  defaultValue={editingItem?.achivementType || 0}
                  placeholder="e.g., 1 for Awards, 2 for Certifications"
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <ImageIcon size={16} className="text-[#6F67BA]" />
                  <span>Image URL</span>
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                  defaultValue={editingItem?.imageUrl || ""}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <FileText size={16} className="text-[#6F67BA]" />
                  <span>Description</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow resize-y"
                  defaultValue={editingItem?.description || ""}
                  placeholder="Provide a short description of the achievement..."
                  required
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <Hash size={16} className="text-[#6F67BA]" />
                  <span>Display Order</span>
                </label>
                <input
                  type="number"
                  name="displayOrder"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent transition-shadow"
                  defaultValue={editingItem?.displayOrder || 0}
                  placeholder="e.g., 1 (Lower numbers show first)"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setView("list")}
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
                <span>{isSaving ? "Saving..." : "Save Achievement"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // LIST VIEW
  // --------------------------------------------------------
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Achievements
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Home Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Achievements</span>
          </div>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 font-semibold shadow-sm transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-[#6F67BA]" size={40} />
          </div>
        ) : achievements?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Trophy size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No achievements found</p>
            <p className="text-sm">
              Click "Add New" to create your first achievement.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Year</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {achievements.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {item.imageUrl ? (
                        <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#333333]">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">
                        {item.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.achievementYear || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.displayOrder}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-500 hover:text-[#6F67BA] hover:bg-purple-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
