import type { NextFetchEvent, NextRequest } from "next/server";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const path = req.nextUrl.pathname;
  if (!path.includes("/api/metrics")) {
    const time = new Date();
    const timestamp = time.getTime();
    const date = time.toLocaleString();
    const referrer = req.referrer;
    const geo = req.geo;
    const method = req.method;
    const browser = req.ua?.browser;
    const device = req.ua?.device;
    const logData = {
      timestamp,
      date,
      path,
      referrer,
      geo,
      method,
      browser,
      device,
    };
    const logKey = `${timestamp}@${time.toLocaleTimeString()} http_request method=${method} path=${path} referrer=${referrer}`;
    event.waitUntil(
      (async () => {
        try {
          const response = await fetch(
            `/api/metrics/${encodeURIComponent(logKey)}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(logData),
            }
          );
          await response.text();
          return response.ok;
        } catch (err) {
          const error = err as Error;
          console.log(error.message);
        }
      })()
    );
  }
  return;
}
