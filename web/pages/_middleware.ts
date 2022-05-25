import type { NextFetchEvent, NextRequest } from "next/server";

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
        console.log(logData);
      })()
    );
  }
  return;
}
