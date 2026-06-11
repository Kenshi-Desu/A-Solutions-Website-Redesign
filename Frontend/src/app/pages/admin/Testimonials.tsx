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
  AlertTriangle,
} from "lucide-react";

import { useTestimonials } from "../../hooks/useTestimonials";
import {
  TestimonialPostRequest,
  TestimonialPatchRequest,
  TestimonialResponse,
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

export default function Testimonials() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<TestimonialResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Modal State
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: testimonials,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useTestimonials();

  // --- UI STATE HANDLERS ---
  const handleAddNew = (): void => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: TestimonialResponse): void => {
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
      successMessage: "Testimonial deleted successfully.",
    });
    setIsDeleting(false);
    setItemToDelete(null);
  };

  // --- SAVE HANDLER ---
  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    const isUpdate = !!editingItem?.id;

    await handleAdminFormSubmit<
      TestimonialPostRequest,
      TestimonialPatchRequest
    >({
      event: e,
      isUpdate,
      editingId: editingItem?.id,
      createItem,
      updateItem,
      setIsSaving,
      successMessage: `Testimonial ${isUpdate ? "updated" : "created"} successfully!`,
      onSuccess: () => setView("list"),
      buildPayload: (formData) => ({
        authorName: formData.get("authorName") as string,
        authorRole: formData.get("authorRole") as string,
        content: formData.get("content") as string,
        rate: Number(formData.get("rate")) || 5,
        isApproved: formData.get("isApproved") === "on", // Checkbox returns "on"
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
              {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>Home Content</span>
              <span>/</span>
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA] transition-colors"
              >
                Testimonials
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
                {/* Author Name */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <User size={16} className="text-[#6F67BA]" />
                    <span>Author Name</span>
                  </Label>
                  <Input
                    name="authorName"
                    defaultValue={editingItem?.authorName || ""}
                    placeholder="e.g., Jane Doe"
                    required
                  />
                </div>

                {/* Author Role */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Briefcase size={16} className="text-[#6F67BA]" />
                    <span>Author Role / Company</span>
                  </Label>
                  <Input
                    name="authorRole"
                    defaultValue={editingItem?.authorRole || ""}
                    placeholder="e.g., CEO at TechCorp"
                    required
                  />
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Star size={16} className="text-[#6F67BA]" />
                    <span>Rating (1-5)</span>
                  </Label>
                  <Input
                    type="number"
                    name="rate"
                    min="1"
                    max="5"
                    defaultValue={editingItem?.rate ?? 5}
                    placeholder="5"
                    required
                  />
                </div>

                {/* Is Approved Toggle */}
                <div className="flex items-center space-x-3 pt-6">
                  <input
                    type="checkbox"
                    id="isApproved"
                    name="isApproved"
                    defaultChecked={editingItem ? editingItem.isApproved : true}
                    className="w-5 h-5 text-[#6F67BA] bg-gray-50 border-gray-300 rounded focus:ring-[#6F67BA] cursor-pointer"
                  />
                  <Label
                    htmlFor="isApproved"
                    className="cursor-pointer normal-case tracking-normal"
                  >
                    Approved (Visible on Website)
                  </Label>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <MessageSquare size={16} className="text-[#6F67BA]" />
                    <span>Testimonial Content</span>
                  </Label>
                  <textarea
                    name="content"
                    rows={4}
                    className="flex w-full min-h-25 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                    defaultValue={editingItem?.content || ""}
                    placeholder="Write the testimonial quote here..."
                    required
                  />
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
                  <span>{isSaving ? "Saving..." : "Save Testimonial"}</span>
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
            Manage Testimonials
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Home Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Testimonials</span>
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
        ) : testimonials?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <MessageSquare size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No testimonials found</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-50">Author</TableHead>
                <TableHead className="w-25">Rating</TableHead>
                <TableHead>Content</TableHead>
                <TableHead className="w-30">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials?.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="font-semibold text-[#333333]">
                      {item.authorName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.authorRole}
                    </div>
                  </TableCell>
                  <TableCell className="text-yellow-500 flex items-center gap-1 mt-3">
                    {item.rate} <Star size={14} fill="currentColor" />
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 max-w-75 truncate">
                      "{item.content}"
                    </p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1.5 ${
                        item.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.isApproved ? (
                        <CheckCircle size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}
                      {item.isApproved ? "Approved" : "Pending"}
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
                  Delete Testimonial?
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Are you sure you want to completely remove this testimonial?
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
