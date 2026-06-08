import { useState, useCallback, useEffect } from 'react';

interface CrudOperations<T, TPost, TPatch> {
    getAll: () => Promise<any>;
    create?: (body: TPost) => Promise<any>;
    update?: (id: number, body: TPatch) => Promise<any>;
    remove?: (id: number) => Promise<any>;
}

export function useCrudBase<T, TPost = Partial<T>, TPatch = Partial<T>>(operations: CrudOperations<T, TPost, TPatch>) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await operations.getAll();
            setData(result || []);
        } catch (err: any){
            console.error("Failed to Fetch Data: ", err);
            setError(err?.message || "Failed to load data.");
        } finally {
            setIsLoading(false);
        }
    }, [operations]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const createItem = async (body: TPost) => {
        if (!operations.create) return;
        try {
            await operations.create(body);
            await loadData();
        } catch (err: any) {
            console.error("Create failed:", err);
            throw err;
        }
    };

    const updateItem = async (id: number, body: TPatch) => {
        if (!operations.update) return;
        try {
            await operations.update(id, body);
            await loadData();
        } catch (err: any) {
            console.error("Update Failed:", err);
            throw err;
        }
    };

    const deleteItem = async (id: number) => {
        if (!operations.remove) return;
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await operations.remove(id);
            await loadData();
        } catch (err) {
            console.error("Delete failed:", err);
            throw err;
        }
    };

    return {
        data,
        isLoading,
        error,
        loadData,
        createItem,
        updateItem,
        deleteItem
    };
}