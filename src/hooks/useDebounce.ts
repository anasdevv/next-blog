import { useEffect, useState } from "react";

export const useDebounce = <T>(query: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<typeof query>(query);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, query]);
  return debouncedValue;
};
