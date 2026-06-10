import { useState } from "react";
import {
  Save,
  Loader2,
  Calendar,
  AlignLeft,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { useOCRCEventHighlights } from "../../hooks/useOCRCEventHighlights";
import {
  OCRCEventHighlightsPostRequest,
  OCRCEventHighlightsPatchRequest,
  OCRCEventHighlightsResponse,
} from "../../../api/api-client";

export default function EventHighlights() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] =
    useState<OCRCEventHighlightsResponse | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    data: events,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useOCRCEventHighlights();

  const handleAddNew = (): void => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: OCRCEventHighlightsResponse): void => {
    setEditingItem(item);
    setView("form");
  };

  const handleDelete = async (id: number | undefined): Promise<void> => {
    if (!id || !deleteItem) return;
    try {
      await deleteItem(id);
      toast.success("Event highlight deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete event highlight.");
    }
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);

    const payload:
      | OCRCEventHighlightsPostRequest
      | OCRCEventHighlightsPatchRequest = {
      title: formData.get("title") as string,
      eventYear: Number(formData.get("eventYear")) || new Date().getFullYear(),
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      displayOrder: Number(formData.get("displayOrder")) || 0,
    };

    try {
      if (editingItem?.id && updateItem) {
        await updateItem(
          editingItem.id,
          payload as OCRCEventHighlightsPatchRequest,
        );
        toast.success("Event highlight updated successfully!");
      } else if (createItem) {
        await createItem(payload as OCRCEventHighlightsPostRequest);
        toast.success("Event highlight created successfully!");
      }
      setView("list");
    } catch (error) {
      toast.error(
        editingItem
          ? "Failed to update event highlight."
          : "Failed to create event highlight.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // --- FORM VIEW ---
  if (view === "form") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              {editingItem ? "Edit Event" : "Add New Event"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>OCRC Event Info</span> /{" "}
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA]"
              >
                Event Highlights
              </button>{" "}
              /
              <span className="text-[#E37F4E] font-medium">
                {editingItem ? "Edit" : "New"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setView("list")}
            className="px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-4xl p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Event Title
                </label>
                <input
                  name="title"
                  defaultValue={editingItem?.title}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Event Year
                </label>
                <input
                  type="number"
                  name="eventYear"
                  defaultValue={
                    editingItem?.eventYear ?? new Date().getFullYear()
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Display Order
                </label>
                <input
                  type="number"
                  name="displayOrder"
                  defaultValue={editingItem?.displayOrder ?? 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  defaultValue={editingItem?.imageUrl}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={editingItem?.description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setView("list")}
                className="px-6 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#6F67BA] text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}{" "}
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Event Highlights
          </h1>
          <div className="text-sm text-gray-500 mt-1">
            OCRC Event Info /{" "}
            <span className="text-[#E37F4E] font-medium">Event Highlights</span>
          </div>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-[#6F67BA] text-white px-5 py-2.5 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="animate-spin text-[#6F67BA]" size={40} />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {events?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-12 h-12 rounded object-cover border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#333333]">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.eventYear}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.displayOrder}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-500 hover:text-[#6F67BA]"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
