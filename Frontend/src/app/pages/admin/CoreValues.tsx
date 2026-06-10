import { useState } from "react";
import {
  Save,
  Loader2,
  Trophy,
  AlignLeft,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Hash,
} from "lucide-react";
import { toast } from "sonner";
import { useCoreValuess } from "../../hooks/useCoreValues";
import {
  CoreValuesPostRequest,
  CoreValuesPatchRequest,
  CoreValuesResponse,
} from "../../../api/api-client";

export default function CoreValues() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<CoreValuesResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    data: coreValues,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useCoreValuess();

  const handleAddNew = (): void => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: CoreValuesResponse): void => {
    setEditingItem(item);
    setView("form");
  };

  const handleDelete = async (id: number | undefined): Promise<void> => {
    if (!id || !deleteItem) return;
    try {
      await deleteItem(id);
      toast.success("Core value deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete core value.");
    }
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);

    const payload: CoreValuesPostRequest | CoreValuesPatchRequest = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      displayOrder: Number(formData.get("displayOrder")) || 0,
    };

    try {
      if (editingItem?.id && updateItem) {
        await updateItem(editingItem.id, payload as CoreValuesPatchRequest);
        toast.success("Core value updated successfully!");
      } else if (createItem) {
        await createItem(payload as CoreValuesPostRequest);
        toast.success("Core value created successfully!");
      }
      setView("list");
    } catch (error) {
      toast.error(
        editingItem
          ? "Failed to update core value."
          : "Failed to create core value.",
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
              {editingItem ? "Edit Core Value" : "Add New Core Value"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>About Us Content</span> /{" "}
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA]"
              >
                Core Values
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
                  Value Title
                </label>
                <input
                  name="title"
                  defaultValue={editingItem?.title}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
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
            Manage Core Values
          </h1>
          <div className="text-sm text-gray-500 mt-1">
            About Us Content /{" "}
            <span className="text-[#E37F4E] font-medium">Core Values</span>
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
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {coreValues?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-[#333333] flex items-center gap-2">
                    <Trophy size={16} className="text-[#6F67BA]" /> {item.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[400px] truncate">
                    {item.description}
                  </td>
                  <td className="px-6 py-4">{item.displayOrder}</td>
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
