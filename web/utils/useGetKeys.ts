import { useEffect, useState } from "react";

export default function useGetKeys() {
  const [data, setData] = useState<string[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (typeof window !== undefined) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/analytics/keys");
          if (response.status === 200) {
            const json = (await response.json()) as string[];
            const keys = json
              .map((log) => log.replace("a.m.", "AM"))
              .map((log) => log.replace("p.m.", "PM"));
            setData(keys);
          } else {
            const text = await response.text();
            setError(text);
          }
        } catch (e) {
          const err = e as Error;
          setError(err.message);
        }
      };
      fetchData();
    }
  }, []);
  return { data, error };
}
