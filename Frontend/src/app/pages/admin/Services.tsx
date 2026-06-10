import { useState } from "react";
import {
  Save,
  Loader2,
  Briefcase,
  AlignLeft,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Layout,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { toast } from "sonner";
import { useServices } from "../../hooks/useService";
import {
  ServicePostRequest,
  ServicePatchRequest,
  ServiceResponse,
} from "../../../api/api-client";

const ICON_LIST: string[] = [
  "Briefcase",
  "Layout",
  "Code",
  "Database",
  "Smartphone",
  "Globe",
  "Zap",
  "Shield",
  "Cloud",
  "Settings",
  "Terminal",
  "Cpu",
  "Monitor",
];

export default function Services() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<ServiceResponse | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [selectedIcon, setSelectedIcon] = useState<string>(ICON_LIST[0]);

  const {
    data: services,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useServices();

  const renderIcon = (
    name: string | undefined,
    className: string = "",
  ): JSX.Element => {
    const iconName = name ?? "Layout";
    const IconComponent = (LucideIcons as any)[iconName] || Layout;
    return <IconComponent className={className} />;
  };

  const handleAddNew = (): void => {
    setEditingItem(null);
    setSelectedIcon(ICON_LIST[0]);
    setView("form");
  };

  const handleEdit = (item: ServiceResponse): void => {
    setEditingItem(item);
    setSelectedIcon(item.iconName ?? ICON_LIST[0]);
    setView("form");
  };

  const handleDelete = async (id: number | undefined): Promise<void> => {
    if (!id || !deleteItem) return;
    try {
      await deleteItem(id);
      toast.success("Service deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete service.");
    }
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);

    const payload: ServicePostRequest | ServicePatchRequest = {
      title: formData.get("title") as string,
      shortDescription: formData.get("shortDescription") as string,
      iconName: selectedIcon,
      displayOrder: Number(formData.get("displayOrder")) || 0,
      isActive: formData.get("isActive") === "true",
    };

    try {
      if (editingItem?.id && updateItem) {
        await updateItem(editingItem.id, payload as ServicePatchRequest);
        toast.success("Service updated successfully!");
      } else if (createItem) {
        await createItem(payload as ServicePostRequest);
        toast.success("Service created successfully!");
      }
      setView("list");
    } catch (error) {
      toast.error(
        editingItem ? "Failed to update service." : "Failed to create service.",
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
              {editingItem ? "Edit Service" : "Add New Service"}
            </h1>
            {/* Restored Home Content Breadcrumb */}
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>Home Content</span> /
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA]"
              >
                Services
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
                  Service Title
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
                  Display Order
                </label>
                <input
                  type="number"
                  name="displayOrder"
                  defaultValue={editingItem?.displayOrder ?? 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Status
                </label>
                <select
                  name="isActive"
                  defaultValue={String(editingItem?.isActive ?? true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Select Icon
                </label>
                <div className="grid grid-cols-6 sm:grid-cols-13 gap-2 border border-gray-200 p-4 rounded-lg bg-gray-50">
                  {ICON_LIST.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-3 rounded-lg flex justify-center ${selectedIcon === icon ? "bg-[#6F67BA] text-white" : "bg-white hover:bg-gray-100"}`}
                    >
                      {renderIcon(icon, "size-6")}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-[#333333] mb-2 block uppercase">
                  Description
                </label>
                <textarea
                  name="shortDescription"
                  rows={4}
                  defaultValue={editingItem?.shortDescription}
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
          <h1 className="text-3xl font-bold text-[#333333]">Manage Services</h1>
          {/* Restored Home Content Breadcrumb */}
          <div className="text-sm text-gray-500 mt-1">
            Home Content /{" "}
            <span className="text-[#E37F4E] font-medium">Services</span>
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
        {/* Added Loading State Logic */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-[#6F67BA]" size={40} />
          </div>
        ) : services?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Layout size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No services found</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-[#6F67BA]">
                      {renderIcon(item.iconName, "size-6")}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#333333]">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[250px] truncate">
                    {item.shortDescription}
                  </td>
                  <td className="px-6 py-4 text-sm">{item.displayOrder}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
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
