// src/hooks/useFetch.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiResponse<T>{
    data:T | null;
    isPending: boolean;
    isError: boolean;
}
type Language = "ko-KR" | "en-US" 


//뭐가 들어올지 모르니 제너릭 타입으로 선언
export function useFetch<T>(url: string, language:Language = "en-US"): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const response = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                    params: {
                        language
                    }
                });
                setData(response.data);
            } catch{
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isPending, isError };
}
