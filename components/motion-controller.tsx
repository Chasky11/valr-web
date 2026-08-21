"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const PARALLAX_SELECTOR = "[data-parallax]";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallaxElements = new Set(document.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR));
    const header = document.querySelector<HTMLElement>(".site-header");

    if (reduceMotion.matches) {
      return;
    }

    root.classList.add("motion-ready");
    const observedElements = new WeakSet<HTMLElement>();

    const prepareReveal = (element: HTMLElement) => {
      if (observedElements.has(element)) return;
      observedElements.add(element);
      const delay = element.dataset.revealDelay;
      if (delay) element.style.setProperty("--reveal-delay", `${delay}ms`);
      observer.observe(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(prepareReveal);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(REVEAL_SELECTOR)) prepareReveal(node);
          node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(prepareReveal);
          if (node.matches(PARALLAX_SELECTOR)) parallaxElements.add(node);
          node.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR).forEach((element) => parallaxElements.add(element));
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    let ticking = false;
    const updateScrollEffects = () => {
      const viewportCenter = window.innerHeight / 2;

      header?.classList.toggle("is-scrolled", window.scrollY > 32);
      parallaxElements.forEach((element) => {
        if (!element.isConnected) {
          parallaxElements.delete(element);
          return;
        }
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = ((rect.top + rect.height / 2 - viewportCenter) / window.innerHeight) * -18;
        element.style.setProperty("--parallax-y", `${Math.max(-18, Math.min(18, offset)).toFixed(2)}px`);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
