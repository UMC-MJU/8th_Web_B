import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export default function useFetch<T>(
  url: string,
  config?: AxiosRequestConfig
): { data: T | null; loading: boolean; error: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, config);
        if (!ignore) {
          setData(response.data);
          setError(false);
        }
      } catch {
        if (!ignore) {
          setError(true);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}
