import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // 언마운트되거나 value 변경시 타이머 초기화
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
