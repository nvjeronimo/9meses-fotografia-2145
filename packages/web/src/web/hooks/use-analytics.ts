declare global {
  interface Window {
    stonks?: {
      event: (name: string, props?: Record<string, unknown>) => void;
      view: (path?: string, props?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Privacy-friendly analytics hook — no cookies, so no consent banner needed.
 * No provider is loaded since leaving Runable, so these are no-ops until one
 * that exposes `window.stonks` (or a replacement) is added to index.html.
 */
export const useAnalytics = () => ({
  trackEvent: (name: string, props?: Record<string, unknown>) => {
    window.stonks?.event(name, props);
  },
  trackView: (path?: string, props?: Record<string, unknown>) => {
    window.stonks?.view(path, props);
  },
});
