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
  AlertTriangle,
  LayoutTemplate,
} from "lucide-react";

import { useAffiliates } from "../../hooks/useAffiliates";
import {
  AffiliatePostRequest,
  AffiliatePatchRequest,
  AffiliateResponse,
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

export default function Affiliates() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<AffiliateResponse | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  // Modal State
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: affiliates,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useAffiliates();

  // --- UI STATE HANDLERS ---
  const handleAddNew = () => {
    setEditingItem(null);
    setView("form");
  };

  const handleEdit = (item: AffiliateResponse) => {
    setEditingItem(item);
    setView("form");
  };

  const handleDeleteClick = (id: number | undefined) => {
    if (id) setItemToDelete(id);
  };

  // --- HELPER: Display Affiliate Type Text ---
  const getAffiliateTypeText = (type: number | undefined) => {
    if (type === 1) return "OCRC Page Only";
    if (type === 2) return "All Pages";
    return "Home Page Only"; // Default 0
  };

  // --- DELETE HANDLER ---
  const confirmDelete = async () => {
    if (!itemToDelete || !deleteItem) return;
    setIsDeleting(true);
    await handleAdminDelete({
      action: () => deleteItem(itemToDelete),
      successMessage: "Affiliate deleted successfully.",
    });
    setIsDeleting(false);
    setItemToDelete(null);
  };

  // --- SAVE HANDLER ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const isUpdate = !!editingItem?.id;

    await handleAdminFormSubmit<AffiliatePostRequest, AffiliatePatchRequest>({
      event: e,
      isUpdate,
      editingId: editingItem?.id,
      createItem,
      updateItem,
      setIsSaving,
      successMessage: `Affiliate/Partner ${isUpdate ? "updated" : "created"} successfully!`,
      onSuccess: () => setView("list"),
      buildPayload: (formData) => ({
        name: formData.get("name") as string,
        logoImageUrl: formData.get("logoImageUrl") as string,
        websiteUrl: formData.get("websiteUrl") as string,
        affiliateType: Number(formData.get("affiliateType")) || 0, // Reads from the <select> dropdown
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
              {editingItem ? "Edit Affiliate/Partner" : "Add New Affiliate"}
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
                {/* Affiliate Name */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Handshake size={16} className="text-[#6F67BA]" />
                    <span>Affiliate / Partner Name</span>
                  </Label>
                  <Input
                    name="name"
                    defaultValue={editingItem?.name || ""}
                    placeholder="e.g., TechCorp Solutions"
                    required
                  />
                </div>

                {/* Website URL */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Globe size={16} className="text-[#6F67BA]" />
                    <span>Website URL</span>
                  </Label>
                  <Input
                    type="url"
                    name="websiteUrl"
                    defaultValue={editingItem?.websiteUrl || ""}
                    placeholder="https://example.com"
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
                    defaultValue={editingItem?.displayOrder || 0}
                    placeholder="e.g., 1 (Lower numbers show first)"
                  />
                </div>

                {/* Affiliate Type (Custom Dropdown) */}
                <div className="md:col-span-2 p-5 bg-purple-50/50 border border-purple-100 rounded-xl space-y-3">
                  <Label className="flex items-center space-x-2 text-[#6F67BA]">
                    <LayoutTemplate size={16} />
                    <span>Where should this partner be displayed?</span>
                  </Label>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">
                    Select where the logo will appear. "Home page only" is
                    perfect for general corporate sponsors, "OCRC page only" is
                    for event-specific sponsors, and "All pages" will show them
                    everywhere.
                  </p>

                  {/* Native HTML Select styled exactly like shadcn Input */}
                  <select
                    name="affiliateType"
                    defaultValue={editingItem?.affiliateType ?? 0}
                    className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#333333] shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F67BA] focus-visible:border-transparent cursor-pointer"
                  >
                    <option value={0}>Home page only</option>
                    <option value={1}>OCRC page only</option>
                    <option value={2}>All pages</option>
                  </select>
                </div>

                {/* Image URL */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center space-x-2">
                    <ImageIcon size={16} className="text-[#6F67BA]" />
                    <span>Logo Image URL</span>
                  </Label>
                  <Input
                    type="url"
                    name="logoImageUrl"
                    defaultValue={editingItem?.logoImageUrl || ""}
                    placeholder="https://example.com/logo.png"
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
                  <span>{isSaving ? "Saving..." : "Save Affiliate"}</span>
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
            Manage Affiliates
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
            <span>Home Content</span>
            <span>/</span>
            <span className="text-[#E37F4E] font-medium">Affiliates</span>
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
        ) : affiliates?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Handshake size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">
              No affiliates or partners found
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-30 text-center">Logo</TableHead>
                <TableHead>Company Info</TableHead>
                <TableHead>Display Location</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates?.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50">
                  {/* Image Cell */}
                  <TableCell className="text-center">
                    {item.logoImageUrl ? (
                      <div className="w-16 h-10 rounded bg-white border border-gray-200 overflow-hidden flex items-center justify-center mx-auto p-1">
                        <img
                          src={item.logoImageUrl}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-10 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 mx-auto">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </TableCell>

                  {/* Info Cell */}
                  <TableCell>
                    <p className="font-semibold text-[#333333]">{item.name}</p>
                    {item.websiteUrl && (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#6F67BA] hover:underline flex items-center gap-1 mt-0.5 w-fit"
                      >
                        <LinkIcon size={12} />{" "}
                        {item.websiteUrl.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </TableCell>

                  {/* Affiliate Type Cell */}
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-[#6F67BA] border border-purple-100">
                      <LayoutTemplate size={12} className="mr-1.5" />
                      {getAffiliateTypeText(item.affiliateType)}
                    </span>
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {item.displayOrder}
                  </TableCell>

                  {/* Status Cell */}
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

                  {/* Actions Cell */}
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
                  Delete Affiliate?
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Are you sure you want to completely remove this partner logo?
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
