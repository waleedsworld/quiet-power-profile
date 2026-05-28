import { useEffect, useRef } from "react";

interface OverlayOptions {
  /** Called on ArrowRight / swipe-forward intent. */
  onNext?: () => void;
  /** Called on ArrowLeft / swipe-back intent. */
  onPrev?: () => void;
}

/**
 * useOverlay — shared robustness + a11y behaviour for any full-screen overlay
 * (mobile nav drawer, image lightbox, video modal).
 *
 * While `isOpen` is true it:
 *   - locks background scroll (compensating for the scrollbar width so the
 *     layout doesn't shift on desktop),
 *   - closes on Escape,
 *   - routes ArrowLeft / ArrowRight to optional prev / next handlers,
 *   - moves focus into the overlay and traps Tab within it,
 *   - restores focus to the previously-focused element on close.
 *
 * Spread the returned ref onto the overlay container element to enable the
 * focus trap. Callbacks are read through a ref so passing fresh inline
 * functions each render never re-triggers the scroll lock (which would
 * flicker the page). The effect depends only on `isOpen`, so lock/unlock is
 * always balanced — even if the component unmounts or the viewport is resized
 * while open.
 */
export function useOverlay(
  isOpen: boolean,
  onClose: () => void,
  options: OverlayOptions = {},
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const cbs = useRef({ onClose, ...options });
  cbs.current = { onClose, ...options };

  useEffect(() => {
    if (!isOpen) return;

    restoreRef.current = document.activeElement as HTMLElement | null;

    const container = containerRef.current;
    const focusable = () =>
      Array.from(
        container?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    // Move focus into the overlay so screen-reader and keyboard users land inside it.
    (focusable()[0] ?? container)?.focus?.();

    const onKey = (e: KeyboardEvent) => {
      const c = cbs.current;
      if (e.key === "Escape") {
        e.preventDefault();
        c.onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        c.onNext?.();
        return;
      }
      if (e.key === "ArrowLeft") {
        c.onPrev?.();
        return;
      }
      if (e.key === "Tab" && container) {
        const items = focusable();
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    const body = document.body;
    const scrollBarComp = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollBarComp > 0) body.style.paddingRight = `${scrollBarComp}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      restoreRef.current?.focus?.();
    };
  }, [isOpen]);

  return containerRef;
}
