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
  AlertTriangle,
} from "lucide-react";

import { useAchievements } from "../../hooks/useAchievements";
import {
  AchievementPostRequest,
  AchievementPatchRequest,
  AchievementResponse,
} from "../../../api/api-client";
import {
  handleAdminDelete,
  handleAdminFormSubmit,
} from "../../utils/adminFormUitils"; // Ensure this matches your file name exactly

// ============================================================================
// IMPORTING YOUR REUSABLE UI COMPONENTS
// Note: We removed 'Textarea' to avoid the TypeScript errors!
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

export default function Achievements() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<AchievementResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: achievements,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useAchievements();

  // --- UI STATE HANDLERS ---
  const handleAddNew = () => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: AchievementResponse) => {
    setEditingItem(item);
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
      successMessage: "Achievement deleted successfully.",
    });
    setIsDeleting(false);
    setItemToDelete(null);
  };

  // --- SAVE HANDLER ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const isUpdate = !!editingItem?.id;

    await handleAdminFormSubmit<
      AchievementPostRequest,
      AchievementPatchRequest
    >({
      event: e,
      isUpdate,
      editingId: editingItem?.id,
      createItem,
      updateItem,
      setIsSaving,
      successMessage: `Achievement ${isUpdate ? "updated" : "created"} successfully!`,
      onSuccess: () => setView("list"),
      buildPayload: (formData) => ({
        title: formData.get("title") as string,
        achievementYear:
          Number(formData.get("achievementYear")) || new Date().getFullYear(),
        description: formData.get("description") as string,
        imageUrl: formData.get("imageUrl") as string,
        achivementType: Number(formData.get("achivementType")) || 0,
        displayOrder: Number(formData.get("displayOrder")) || 0,
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
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2 text-xs font-bold text-[#333333] uppercase tracking-wide">
                    <Trophy size={16} className="text-[#6F67BA]" />
                    <span>Achievement Title</span>
                  </Label>
                  <Input
                    name="title"
                    defaultValue={editingItem?.title || ""}
                    placeholder="e.g., Best Solutions Provider 2025"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-xs font-bold text-[#333333] uppercase tracking-wide">
                    <Calendar size={16} className="text-[#6F67BA]" />
                    <span>Year</span>
                  </Label>
                  <Input
                    type="number"
                    name="achievementYear"
                    defaultValue={
                      editingItem?.achievementYear || new Date().getFullYear()
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-xs font-bold text-[#333333] uppercase tracking-wide">
                    <Tag size={16} className="text-[#6F67BA]" />
                    <span>Type (Numeric ID)</span>
                  </Label>
                  <Input
                    type="number"
                    name="achivementType"
                    defaultValue={editingItem?.achivementType || 0}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2 text-xs font-bold text-[#333333] uppercase tracking-wide">
                    <ImageIcon size={16} className="text-[#6F67BA]" />
                    <span>Image URL</span>
                  </Label>
                  <Input
                    type="url"
                    name="imageUrl"
                    defaultValue={editingItem?.imageUrl || ""}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                {/* ========================================================= */}
                {/* FIXED DESCRIPTION FIELD: Standard HTML with clear styling */}
                {/* ========================================================= */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2 text-xs font-bold text-[#333333] uppercase tracking-wide">
                    <FileText size={16} className="text-[#6F67BA]" />
                    <span>Description</span>
                  </Label>
                  <textarea
                    name="description"
                    rows={5}
                    className="flex min-h-25 w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                    defaultValue={editingItem?.description || ""}
                    placeholder="Provide a short description of the achievement..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-xs font-bold text-[#333333] uppercase tracking-wide">
                    <Hash size={16} className="text-[#6F67BA]" />
                    <span>Display Order</span>
                  </Label>
                  <Input
                    type="number"
                    name="displayOrder"
                    defaultValue={editingItem?.displayOrder || 0}
                  />
                </div>
              </div>

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
                  <span>{isSaving ? "Saving..." : "Save Achievement"}</span>
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
          <h1 className="text-3xl font-bold text-[#333333]">
            Manage Achievements
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Home Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Achievements</span>
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
        ) : achievements?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Trophy size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No achievements found</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-25">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    {item.imageUrl ? (
                      <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 overflow-hidden">
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
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#333333]">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate max-w-50">
                      {item.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.achievementYear || "—"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.displayOrder}
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
              ))}
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
                  Delete Achievement?
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Are you sure you want to completely remove this achievement?
                  This action cannot be undone.
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
