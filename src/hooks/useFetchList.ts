import { useState, useEffect, useCallback } from 'react';

interface FetchListResponse<T> {
  list: T[];
  isLoading: boolean;
  error: string | null;
}

const useFetchPlayers = <T>(url: string): FetchListResponse<T> => {
  const [list, setList] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          charset: 'utf-8',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrongaaaa');
      }

      setList(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred');
      }
    }

    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { list, isLoading, error };
};

export default useFetchPlayers;
