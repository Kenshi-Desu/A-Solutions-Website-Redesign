import { useState } from "react";
import {
  Save,
  Loader2,
  Handshake,
  Link as LinkIcon,
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Globe,
  Hash,
  ListOrdered,
  ToggleRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAffiliates } from "../../hooks/useAffiliates";
import {
  AffiliatePostRequest,
  AffiliatePatchRequest,
  AffiliateResponse,
} from "../../../api/api-client";

export default function Affiliates() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<AffiliateResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: affiliates,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useAffiliates();

  const handleAddNew = () => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: AffiliateResponse) => {
    setEditingItem(item);
    setView("form");
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id || !deleteItem) return;
    try {
      await deleteItem(id);
      toast.success("Affiliate deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete affiliate.");
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);

    // Build the payload mapping the form data to the correct types
    const payload = {
      name: formData.get("name") as string,
      logoImageUrl: formData.get("logoUrl") as string,
      websiteUrl: formData.get("websiteUrl") as string,
      affiliateType: Number(formData.get("affiliateType")),
      displayOrder: Number(formData.get("displayOrder")),
      isActive: formData.get("isActive") === "true",
    };

    try {
      if (editingItem?.id && updateItem) {
        await updateItem(editingItem.id, {
          ...payload,
          id: editingItem.id,
        } as AffiliatePatchRequest);
        toast.success("Affiliate updated successfully!");
      } else if (createItem) {
        await createItem(payload as AffiliatePostRequest);
        toast.success("Affiliate created successfully!");
      }
      setView("list");
    } catch (error) {
      toast.error(
        editingItem
          ? "Failed to update affiliate."
          : "Failed to create affiliate.",
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
              {editingItem ? "Edit Affiliate" : "Add New Affiliate"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>Home Content</span>
              <span>/</span>
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA] transition-colors"
              >
                Affiliates
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
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <Handshake size={16} className="text-[#6F67BA]" />
                  <span>Affiliate Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                  defaultValue={editingItem?.name || ""}
                  required
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <ImageIcon size={16} className="text-[#6F67BA]" />
                  <span>Logo URL</span>
                </label>
                <input
                  type="url"
                  name="logoUrl"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                  defaultValue={editingItem?.logoImageUrl || ""}
                  required
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <Globe size={16} className="text-[#6F67BA]" />
                  <span>Website URL</span>
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                  defaultValue={editingItem?.websiteUrl || ""}
                  required
                />
              </div>

              {/* NEW FIELDS ADDED HERE */}
              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <Hash size={16} className="text-[#6F67BA]" />
                  <span>Affiliate Type (ID)</span>
                </label>
                <input
                  type="number"
                  name="affiliateType"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                  defaultValue={editingItem?.affiliateType || 0}
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <ListOrdered size={16} className="text-[#6F67BA]" />
                  <span>Display Order</span>
                </label>
                <input
                  type="number"
                  name="displayOrder"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                  defaultValue={editingItem?.displayOrder || 0}
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-xs font-bold text-[#333333] mb-2 uppercase tracking-wide">
                  <ToggleRight size={16} className="text-[#6F67BA]" />
                  <span>Status</span>
                </label>
                <select
                  name="isActive"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#6F67BA] focus:border-transparent"
                  defaultValue={String(editingItem?.isActive ?? true)}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setView("list")}
                className="px-6 py-2.5 text-[#333333] font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white px-6 py-2.5 rounded-lg flex items-center space-x-2 font-semibold shadow-sm transition-colors duration-200"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                <span>{isSaving ? "Saving..." : "Save Affiliate"}</span>
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
            Manage Affiliates
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Home Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Affiliates</span>
          </div>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 font-semibold shadow-sm"
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
        ) : affiliates?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Handshake size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No affiliates found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Logo</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Website</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {affiliates?.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.logoImageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#333333]">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 truncate max-w-[200px]">
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                      >
                        <LinkIcon size={14} /> {item.websiteUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.isActive !== false ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {item.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-500 hover:text-[#6F67BA] rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-500 hover:text-red-600 rounded-lg transition-colors"
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
