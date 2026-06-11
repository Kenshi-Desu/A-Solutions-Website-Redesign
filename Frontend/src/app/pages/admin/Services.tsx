import { useState } from "react";
import {
  Save,
  Loader2,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  AlertTriangle,
  Layout,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import { useServices } from "../../hooks/useService";
import {
  ServicePostRequest,
  ServicePatchRequest,
  ServiceResponse,
} from "../../../api/api-client";
import {
  handleAdminDelete,
  handleAdminFormSubmit,
} from "../../utils/adminFormUitils";

// ============================================================================
// IMPORTING YOUR REUSABLE UI COMPONENTS
// ============================================================================
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Card, CardContent } from "../../components/ui/card";

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

  // Modal State
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: services,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useServices();

  // --- UI STATE HANDLERS ---
  const handleAddNew = () => {
    setEditingItem(null);
    setSelectedIcon(ICON_LIST[0]);
    setView("form");
  };

  const handleEdit = (item: ServiceResponse) => {
    setEditingItem(item);
    setSelectedIcon(item.iconName || ICON_LIST[0]);
    setView("form");
  };

  const handleDeleteClick = (id: number | undefined) => {
    if (id) setItemToDelete(id);
  };

  // --- DELETE HANDLER ---
  const confirmDelete = async () => {
    if (!itemToDelete || !deleteItem) return;
    setIsDeleting(true);
    await handleAdminDelete({
      action: () => deleteItem(itemToDelete),
      successMessage: "Service deleted successfully.",
    });
    setIsDeleting(false);
    setItemToDelete(null);
  };

  // --- SAVE HANDLER ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const isUpdate = !!editingItem?.id;

    await handleAdminFormSubmit<ServicePostRequest, ServicePatchRequest>({
      event: e,
      isUpdate,
      editingId: editingItem?.id,
      createItem,
      updateItem,
      setIsSaving,
      successMessage: `Service ${isUpdate ? "updated" : "created"} successfully!`,
      onSuccess: () => setView("list"),
      buildPayload: (formData) => ({
        title: formData.get("title") as string,
        shortDescription: formData.get("shortDescription") as string,
        detailedDescription: formData.get("detailedDescription") as string,
        iconName: selectedIcon,
        displayOrder: Number(formData.get("displayOrder")) || 0,
        isActive: formData.get("isActive") === "on", // Reads the checkbox
      }),
    });
  };

  // ============================================================================
  // RENDER: FORM VIEW
  // ============================================================================
  if (view === "form") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">
              {editingItem ? "Edit Service" : "Add New Service"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>Home Content</span>
              <span>/</span>
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA] transition-colors"
              >
                Services
              </button>
              <span>/</span>
              <span className="text-[#E37F4E] font-medium">
                {editingItem ? "Edit" : "New"}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setView("list")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Back to List</span>
          </Button>
        </div>

        <Card className="max-w-4xl border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Briefcase size={16} className="text-[#6F67BA]" />
                    <span>Service Title</span>
                  </Label>
                  <Input
                    name="title"
                    defaultValue={editingItem?.title || ""}
                    placeholder="e.g., Custom Software Development"
                    required
                  />
                </div>

                {/* Short Description */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Layout size={16} className="text-[#6F67BA]" />
                    <span>Short Description (For Homepage)</span>
                  </Label>
                  <textarea
                    name="shortDescription"
                    rows={3}
                    className="flex w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                    defaultValue={editingItem?.shortDescription || ""}
                    placeholder="Brief summary of the service..."
                    required
                  />
                </div>

                {/* Short Description */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Layout size={16} className="text-[#6F67BA]" />
                    <span> Description (For Service Page)</span>
                  </Label>
                  <textarea
                    name="Short Description"
                    rows={6}
                    className="flex w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                    defaultValue={editingItem?.shortDescription || ""}
                    placeholder="Full explanation of the service offerings..."
                  />
                </div>

                {/* Icon Selector */}
                <div className="md:col-span-2 space-y-3">
                  <Label>Select an Icon</Label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                    {ICON_LIST.map((iconName) => {
                      const IconComponent = (LucideIcons as any)[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setSelectedIcon(iconName)}
                          className={`p-3 rounded-lg border flex items-center justify-center transition-all ${
                            selectedIcon === iconName
                              ? "bg-purple-50 border-[#6F67BA] text-[#6F67BA] ring-2 ring-[#6F67BA] ring-opacity-50 shadow-sm"
                              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                          title={iconName}
                        >
                          {IconComponent && <IconComponent size={24} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Display Order */}
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    name="displayOrder"
                    defaultValue={editingItem?.displayOrder || 0}
                    placeholder="e.g., 1 (Lower numbers show first)"
                  />
                </div>

                {/* Is Active Toggle */}
                <div className="flex items-center space-x-3 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked={editingItem ? editingItem.isActive : true}
                    className="w-5 h-5 text-[#6F67BA] bg-gray-50 border-gray-300 rounded focus:ring-[#6F67BA] cursor-pointer"
                  />
                  <Label
                    htmlFor="isActive"
                    className="cursor-pointer normal-case tracking-normal"
                  >
                    Active (Visible on Website)
                  </Label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setView("list")}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#6F67BA] hover:bg-[#5d57a0] text-white flex items-center space-x-2"
                >
                  {isSaving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  <span>{isSaving ? "Saving..." : "Save Service"}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ============================================================================
  // RENDER: LIST VIEW
  // ============================================================================
  return (
    <div className="animate-in fade-in duration-300 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333]">Manage Services</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Home Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Services</span>
          </div>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-[#6F67BA] hover:bg-[#5d57a0] flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add New</span>
        </Button>
      </div>

      <Card className="shadow-sm border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-[#6F67BA]" size={40} />
          </div>
        ) : services?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Briefcase size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No services found</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-20 text-center">Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Short Description</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((item) => {
                const IconComponent = (LucideIcons as any)[
                  item.iconName || "Briefcase"
                ];
                return (
                  <TableRow key={item.id} className="hover:bg-gray-50/50">
                    <TableCell className="text-center">
                      <div className="w-10 h-10 rounded bg-purple-50 text-[#6F67BA] flex items-center justify-center mx-auto">
                        {IconComponent ? (
                          <IconComponent size={20} />
                        ) : (
                          <Briefcase size={20} />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-[#333333]">
                        {item.title}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-62.5 truncate">
                        {item.shortDescription}
                      </p>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {item.displayOrder}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item)}
                          className="text-gray-500 hover:text-[#6F67BA] hover:bg-purple-50"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(item.id)}
                          className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* DELETE CONFIRMATION MODAL */}
      {itemToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md p-6 m-4 shadow-xl border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 bg-red-100 p-3 rounded-full">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div className="flex-1 pt-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Service?
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Are you sure you want to completely remove this service? This
                  action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setItemToDelete(null)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex items-center space-x-2"
                  >
                    {isDeleting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    <span>{isDeleting ? "Deleting..." : "Yes, Delete"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
