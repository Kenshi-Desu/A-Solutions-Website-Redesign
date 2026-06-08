import { useState, useCallback, useEffect } from "react";

interface SingletonOperations<T, TPatch> {
  get: () => Promise<T>;
  update: (body: TPatch) => Promise<T>;
}

export function useSingletonBase<T, TPatch = Partial<T>>(
  operations: SingletonOperations<T, TPatch>,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await await operations.get();
      setData(result || null);
    } catch (err: any) {
      console.error("Failed to fetch data:", err);
      setError(err?.message || "Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  }, [operations]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateItem = async (body: TPatch) => {
    try {
      await operations.update(body);
      await loadData();
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  };

  return {
    data,
    isLoading,
    error,
    loadData,
    updateItem,
  };
}
