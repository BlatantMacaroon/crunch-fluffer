import { useState, useCallback } from 'react';
import { api } from '../api/axios';
import axios from 'axios';
import type { ApiError } from '@shared/types/apiError';

export function useApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (method: 'get' | 'post', url: string, body?: unknown) => {
        setLoading(true);
        setError(null);
        try {
            const response = await (method === 'get'
                ? api.get<T>(url)
                : api.post<T>(url, body));

            setData(response.data);
            return response.data as T;
        } catch (err: unknown){
            let message = 'An error occurred';

            if (axios.isAxiosError(err)) {
                const data = err.response?.data as ApiError | undefined;
                message = data?.message || err.message;
            } else if (err instanceof Error) message = err.message;
            
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, request };
}