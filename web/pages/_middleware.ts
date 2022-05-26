import type { NextFetchEvent, NextRequest } from "next/server";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const route = req.nextUrl.pathname;
  if (!route.includes("/api/metrics")) {
    const time = new Date();
    const timestamp = time.getTime();
    const date = time.toLocaleString();
    const referrer = req.referrer;
    const geo = req.geo?.country;
    const method = req.method;
    const browser = req.ua?.browser;
    const device = req.ua?.device;
    const logData = {
      timestamp,
      date,
      route,
      referrer,
      geo,
      method,
      browser,
      device,
    };
    event.waitUntil(
      (async () => {
        await fetch(`${HOST_URL}/api/metrics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
        });
      })()
    );
  }
  return;
}
