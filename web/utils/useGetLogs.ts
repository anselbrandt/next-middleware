import { useEffect, useState } from "react";
import { LogEntry } from "./types";

export default function useGetLogs() {
  const [data, setData] = useState<LogEntry[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (typeof window !== undefined) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/analytics/logs");
          const json = (await response.json()) as LogEntry[];
          setData(json);
        } catch (e) {
          const err = e as Error;
          setError(err.message);
        }
      };
      fetchData();
    }
  });
  return [data, error];
}
