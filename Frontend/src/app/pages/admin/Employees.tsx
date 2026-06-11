import { useState } from "react";
import {
  Save,
  Loader2,
  User,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  AlignLeft,
  AlertTriangle,
  Hash,
  Users,
} from "lucide-react";

import { useTeamMemberss } from "../../hooks/useTeamMembers";
import {
  TeamMembersPostRequest,
  TeamMembersPatchRequest,
  TeamMembersResponse,
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

export default function TeamMembers() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<TeamMembersResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Modal State
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: teamMembers,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useTeamMemberss();

  // --- UI STATE HANDLERS ---
  const handleAddNew = (): void => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: TeamMembersResponse): void => {
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
      successMessage: "Team member deleted successfully.",
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
      TeamMembersPostRequest,
      TeamMembersPatchRequest
    >({
      event: e,
      isUpdate,
      editingId: editingItem?.id,
      createItem,
      updateItem,
      setIsSaving,
      successMessage: `Team member ${isUpdate ? "updated" : "created"} successfully!`,
      onSuccess: () => setView("list"),
      buildPayload: (formData) => ({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        roleTitle: formData.get("roleTitle") as string,
        bio: formData.get("bio") as string,
        profileImageUrl: formData.get("profileImageUrl") as string,
        displayOrder: Number(formData.get("displayOrder")) || 0,
        isActive: formData.get("isActive") === "on", // Checkbox returns "on"
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
              {editingItem ? "Edit Team Member" : "Add New Team Member"}
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <span>About Us Content</span>
              <span>/</span>
              <button
                onClick={() => setView("list")}
                className="hover:text-[#6F67BA] transition-colors"
              >
                Team Members
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
                {/* First Name */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <User size={16} className="text-[#6F67BA]" />
                    <span>First Name</span>
                  </Label>
                  <Input
                    name="firstName"
                    defaultValue={editingItem?.firstName || ""}
                    placeholder="e.g., John"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <User size={16} className="text-[#6F67BA]" />
                    <span>Last Name</span>
                  </Label>
                  <Input
                    name="lastName"
                    defaultValue={editingItem?.lastName || ""}
                    placeholder="e.g., Doe"
                    required
                  />
                </div>

                {/* Role Title */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Briefcase size={16} className="text-[#6F67BA]" />
                    <span>Role Title</span>
                  </Label>
                  <Input
                    name="roleTitle"
                    defaultValue={editingItem?.roleTitle || ""}
                    placeholder="e.g., Chief Executive Officer"
                    required
                  />
                </div>

                {/* Profile Image URL */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <ImageIcon size={16} className="text-[#6F67BA]" />
                    <span>Profile Image URL</span>
                  </Label>
                  <Input
                    type="url"
                    name="profileImageUrl"
                    defaultValue={editingItem?.profileImageUrl || ""}
                    placeholder="https://example.com/profile.jpg"
                    required
                  />
                </div>

                {/* Display Order */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Hash size={16} className="text-[#6F67BA]" />
                    <span>Display Order</span>
                  </Label>
                  <Input
                    type="number"
                    name="displayOrder"
                    defaultValue={editingItem?.displayOrder ?? 0}
                    placeholder="e.g., 1 (Lower numbers show first)"
                  />
                </div>

                {/* Bio */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <AlignLeft size={16} className="text-[#6F67BA]" />
                    <span>Bio / Description</span>
                  </Label>
                  <textarea
                    name="bio"
                    rows={4}
                    className="flex w-full min-h-25 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent resize-y"
                    defaultValue={editingItem?.bio || ""}
                    placeholder="Provide a short biography..."
                    required
                  />
                </div>

                {/* Is Active Toggle */}
                <div className="md:col-span-2 flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked={
                      editingItem ? editingItem.isActive !== false : true
                    }
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
                  <span>{isSaving ? "Saving..." : "Save Member"}</span>
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
          <h1 className="text-3xl font-bold text-[#333333]">Manage Team</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>About Us Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Team Members</span>
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
        ) : teamMembers?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Users size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No team members found</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-20 text-center">Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers?.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-center">
                    {item.profileImageUrl ? (
                      <img
                        src={item.profileImageUrl}
                        alt={`${item.firstName} ${item.lastName}`}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 mx-auto"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 mx-auto">
                        <User size={16} />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-[#333333]">
                      {item.firstName} {item.lastName}
                    </p>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.roleTitle}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.displayOrder}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.isActive !== false
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive !== false ? "Active" : "Inactive"}
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
                  Delete Team Member?
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Are you sure you want to completely remove this team member?
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
