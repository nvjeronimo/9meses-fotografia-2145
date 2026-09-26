// Entry point referenced by index.html — composition only, real bootstrap
// lives in __main.tsx (template-managed).
// Pre-rendered pages and the app shell carry static head tags; React owns them
// from here on (components/seo.tsx), so drop the static copies before it mounts.
document.head.querySelectorAll("[data-shell], [data-pr]").forEach((node) => node.remove());

import "./__main";
