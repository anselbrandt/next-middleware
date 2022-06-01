# Web Vitals

https://nextjs.org/docs/advanced-features/measuring-performance#custom-metrics

TTFB - Time To First Byte

FCP - First Contentful Paint

LCP - Largest Contentful Paint < 2.5s

FID - First Input Delay < 100ms

CLS - Cumulative Layout Shift < 0.1

Next.js-route-change-to-render - amount of time it takes a page to start rendering after a route change

Next.js-hydration

Next.js-render - amount of time it takes a page to finish rendering after a route change

```
export function reportWebVitals(metric) {
    switch (metric.name) {
      case 'FCP':
        // handle FCP results
        sendAnalytics(metric);
        break
      case 'LCP':
        sendAnalytics(metric);
        break
      case 'CLS':
        sendAnalytics(metric);
        break
      case 'FID':
        sendAnalytics(metric);
        break
      case 'TTFB':
        sendAnalytics(metric);
        break
      case 'Next.js-hydration':
        sendAnalytics(metric);
        break
      case 'Next.js-route-change-to-render':
        sendAnalytics(metric);
        break
      case 'Next.js-render':
        sendAnalytics(metric);
        break
      default:
        break
    }
  }
```
