import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

const SCROLL_OFFSET = -110;
const SCROLL_DURATION = 1.6;

const cinematicEasing = (t: number) => Math.min(1, 1.002 - Math.pow(2, -11 * t));

function initSmoothScrolling(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  const lenis = new Lenis({
    duration: isMobile ? 1.8 : SCROLL_DURATION,
    easing: cinematicEasing,
    smoothWheel: !isMobile,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    syncTouch: isMobile,
    syncTouchLerp: isMobile ? 0.16 : 0.1,
    touchMultiplier: isMobile ? 1.25 : 1.05,
    wheelMultiplier: isMobile ? 0.85 : 0.95,
    infinite: false,
    overscroll: false,
    lerp: isMobile ? 0.12 : 0.08,
  });

  const onRaf = (time: number) => {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(onRaf);
  };

  requestAnimationFrame(onRaf);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href') ?? '';
      if (!href.startsWith('#')) {
        return;
      }

      event.preventDefault();

      if (href === '#') {
        lenis.scrollTo(0, {
          duration: SCROLL_DURATION,
          easing: cinematicEasing,
        });
        return;
      }

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        return;
      }

      lenis.scrollTo(targetElement, {
        offset: SCROLL_OFFSET,
        duration: SCROLL_DURATION,
        easing: cinematicEasing,
        lerp: 0.08,
      });
    });
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  }, { passive: true });
}

bootstrapApplication(App, appConfig)
  .then(() => {
    initSmoothScrolling();
  })
  .catch((err) => console.error(err));
