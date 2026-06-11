import { useState, useCallback, useEffect } from "react";
import { SwaggerException } from "../../../api/api-client"; // Make sure this path points to your api-client.ts

interface CrudOperations<T, TPost, TPatch> {
  getAll: () => Promise<T[]>;
  getById: (id: number) => Promise<T>;
  create?: (body: TPost) => Promise<T | void>;
  update?: (id: number, body: TPatch) => Promise<T | void>;
  remove?: (id: number) => Promise<void>;
}

export function useCrudBase<T, TPost = Partial<T>, TPatch = Partial<T>>(
  operations: CrudOperations<T, TPost, TPatch>,
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // HELPER: Safely extract the error message using NSwag's built-in class
  const extractErrorMessage = (
    err: unknown,
    fallbackMessage: string,
  ): string => {
    // If NSwag proves it's an API error, we can safely access .response
    if (SwaggerException.isSwaggerException(err)) {
      try {
        const parsed = JSON.parse(err.response);
        if (parsed && parsed.Message) return String(parsed.Message);
        if (parsed && parsed.message) return String(parsed.message);
      } catch (parseError) {
        // Fall through if not JSON
      }
      return err.message || fallbackMessage;
    }

    // If it's a standard JS error
    if (err instanceof Error) {
      return err.message;
    }
    return fallbackMessage;
  };

  // HELPER: Check if a "fake" parsing error is actually a 200/204 success
  const isSuccessError = (err: unknown) => {
    if (SwaggerException.isSwaggerException(err)) {
      if (err.status >= 200 && err.status < 300) return true;
    }
    if (err instanceof SyntaxError) return true;
    if (err instanceof Error && err.message.includes("JSON")) return true;
    return false;
  };

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await operations.getAll();
      setData(result || []);
    } catch (err: unknown) {
      const backendError = extractErrorMessage(err, "Failed to load data.");
      console.error("Failed to Fetch Data: ", backendError);
      setError(backendError);
    } finally {
      setIsLoading(false);
    }
  }, [operations]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const fetchById = async (id: number): Promise<T | null> => {
    if (!operations.getById) return null;
    try {
      return await operations.getById(id);
    } catch (err: unknown) {
      const backendError = extractErrorMessage(
        err,
        `Failed to fetch item with id ${id}`,
      );
      throw new Error(backendError);
    }
  };

  const createItem = async (body: TPost): Promise<void> => {
    if (!operations.create) return;
    try {
      await operations.create(body);
      await loadData();
    } catch (err: unknown) {
      if (isSuccessError(err)) {
        await loadData();
        return;
      }
      const backendError = extractErrorMessage(err, "Create failed.");
      throw new Error(backendError);
    }
  };

  const updateItem = async (id: number, body: TPatch): Promise<void> => {
    if (!operations.update) return;
    try {
      await operations.update(id, body);
      await loadData();
    } catch (err: unknown) {
      if (isSuccessError(err)) {
        await loadData();
        return;
      }
      const backendError = extractErrorMessage(err, "Update failed.");
      throw new Error(backendError);
    }
  };

  const deleteItem = async (id: number): Promise<void> => {
    if (!operations.remove) return;

    try {
      await operations.remove(id);
      await loadData();
    } catch (err: unknown) {
      if (isSuccessError(err)) {
        await loadData();
        return;
      }
      const backendError = extractErrorMessage(err, "Delete failed.");
      throw new Error(backendError);
    }
  };

  return {
    data,
    isLoading,
    error,
    loadData,
    fetchById,
    createItem,
    updateItem,
    deleteItem,
  };
}
