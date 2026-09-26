import { useEffect, useState } from "react";

/**
 * Becomes true a moment after the page has finished loading. Slideshows use it
 * to hold back every frame but the first, so the hidden slides never compete
 * with the image the visitor is actually looking at.
 */
export function useAfterLoad(delay = 800) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const arm = () => {
      timer = setTimeout(() => setReady(true), delay);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", arm);
    };
  }, [delay]);

  return ready;
}
