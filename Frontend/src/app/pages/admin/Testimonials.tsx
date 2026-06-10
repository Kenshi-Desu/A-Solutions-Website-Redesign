import { useState } from "react";
import {
  Save,
  Loader2,
  MessageSquare,
  User,
  Briefcase,
  Star,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useTestimonials } from "../../hooks/useTestimonials";
import {
  TestimonialPostRequest,
  TestimonialPatchRequest,
  TestimonialResponse,
} from "../../../api/api-client";

export default function Testimonials() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<TestimonialResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    data: testimonials,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useTestimonials();

  const handleAddNew = (): void => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: TestimonialResponse): void => {
    setEditingItem(item);
    setView("form");
  };

  const handleDelete = async (id: number | undefined): Promise<void> => {
    if (!id || !deleteItem) return;
    try {
      await deleteItem(id);
      toast.success("Testimonial deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete testimonial.");
    }
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);

    const payload: TestimonialPostRequest | TestimonialPatchRequest = {
      authorName: formData.get("authorName") as string,
      authorRole: formData.get("authorRole") as string,
      content: formData.get("content") as string,
      rate: Number(formData.get("rate")) || 5,
      isApproved: formData.get("isApproved") === "true",
    };

    try {
      if (editingItem?.id && updateItem) {
        await updateItem(editingItem.id, payload as TestimonialPatchRequest);
        toast.success("Testimonial updated successfully!");
      } else if (createItem) {
        await createItem(payload as TestimonialPostRequest);
        toast.success("Testimonial created successfully!");
      }
      setView("list");
    } catch (error) {
      toast.error(
        editingItem
          ? "Failed to update testimonial."
          : "Failed to create testimonial.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (view === "form") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>Home Content</span> /{" "}
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA]"
              >
                Testimonials
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
              <div>
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Author Name
                </label>
                <input
                  name="authorName"
                  defaultValue={editingItem?.authorName}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Author Role
                </label>
                <input
                  name="authorRole"
                  defaultValue={editingItem?.authorRole}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rate"
                  min="1"
                  max="5"
                  defaultValue={editingItem?.rate ?? 5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Status
                </label>
                <select
                  name="isApproved"
                  defaultValue={String(editingItem?.isApproved ?? true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="true">Approved</option>
                  <option value="false">Pending</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Content
                </label>
                <textarea
                  name="content"
                  rows={4}
                  defaultValue={editingItem?.content}
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

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Testimonials
          </h1>
          <div className="text-sm text-gray-500 mt-1">
            Home Content /{" "}
            <span className="text-[#E37F4E] font-medium">Testimonials</span>
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
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {testimonials?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#333333]">
                      {item.authorName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.authorRole}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-yellow-500 flex items-center gap-1">
                    {item.rate} <Star size={14} fill="currentColor" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[300px] truncate">
                    {item.content}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs flex w-fit items-center gap-1 ${item.isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {item.isApproved ? (
                        <CheckCircle size={12} />
                      ) : (
                        <XCircle size={12} />
                      )}
                      {item.isApproved ? "Approved" : "Pending"}
                    </span>
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
