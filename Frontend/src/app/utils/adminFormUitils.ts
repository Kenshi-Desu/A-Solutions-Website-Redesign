import { toast } from "sonner";

// ============================================================================
// 1. GENERIC SAVE WRAPPER
// ============================================================================
interface SaveOptions {
  action: () => Promise<unknown>;
  setIsSaving: (isSaving: boolean) => void;
  successMessage: string;
  onSuccess?: (() => void) | undefined;
}

export const handleAdminSave = async ({
  action,
  setIsSaving,
  successMessage,
  onSuccess,
}: SaveOptions): Promise<void> => {
  setIsSaving(true);
  try {
    await action();
    toast.success(successMessage, {
      style: {
        background: "#f0fdf4",
        color: "#16a34a",
        borderColor: "#4ade80",
      },
    });
    if (onSuccess) onSuccess();
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) errorMessage = error.message;
    toast.error(errorMessage);
  } finally {
    setIsSaving(false);
  }
};

// ============================================================================
// 2. GENERIC DELETE WRAPPER
// ============================================================================
interface DeleteOptions {
  action: () => Promise<unknown>;
  successMessage?: string | undefined;
}

export const handleAdminDelete = async ({
  action,
  successMessage = "Item deleted successfully.",
}: DeleteOptions): Promise<void> => {
  try {
    await action();
    toast.success(successMessage);
  } catch (error: unknown) {
    let errorMessage = "Failed to delete item.";
    if (error instanceof Error) errorMessage = error.message;
    toast.error(errorMessage);
  }
};

// ============================================================================
// 3. GENERIC FORM SUBMIT WRAPPER
// ============================================================================
interface FormSubmitOptions<TCreate, TUpdate> {
  event: React.FormEvent<HTMLFormElement>;
  isUpdate: boolean;

  buildPayload: (formData: FormData) => Partial<TCreate & TUpdate>;

  setIsSaving: (isSaving: boolean) => void;
  successMessage: string;

  editingId?: number | undefined;
  createItem?: ((payload: TCreate) => Promise<unknown>) | undefined;

  // STANDARD CRUD UPDATE: Requires ID
  updateItem?: ((id: number, payload: TUpdate) => Promise<unknown>) | undefined;

  // SINGLETON UPDATE: Requires only the payload (NEW!)
  updateSingletonItem?: ((payload: TUpdate) => Promise<unknown>) | undefined;

  onSuccess?: (() => void) | undefined;
}

export const handleAdminFormSubmit = async <TCreate, TUpdate>({
  event,
  isUpdate,
  editingId,
  buildPayload,
  createItem,
  updateItem,
  updateSingletonItem, // Add it here
  setIsSaving,
  successMessage,
  onSuccess,
}: FormSubmitOptions<TCreate, TUpdate>) => {
  event.preventDefault();

  const basePayload = buildPayload(new FormData(event.currentTarget));

  const action = async () => {
    // 1. Check if it's a Singleton Update
    if (isUpdate && updateSingletonItem) {
      const updatePayload = editingId
        ? ({ ...basePayload, id: editingId } as unknown as TUpdate)
        : (basePayload as unknown as TUpdate);
      await updateSingletonItem(updatePayload);

      // 2. Check if it's a Standard CRUD Update
    } else if (isUpdate && updateItem && editingId) {
      const updatePayload = {
        ...basePayload,
        id: editingId,
      } as unknown as TUpdate;
      await updateItem(editingId, updatePayload);

      // 3. Check if it's a Create request
    } else if (!isUpdate && createItem) {
      const createPayload = basePayload as unknown as TCreate;
      await createItem(createPayload);
    } else {
      throw new Error("Form action is unavailable. Please try again.");
    }
  };

  await handleAdminSave({ action, setIsSaving, successMessage, onSuccess });
};
