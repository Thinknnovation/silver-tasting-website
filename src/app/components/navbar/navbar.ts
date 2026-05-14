import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements AfterViewInit {
  @ViewChild('navbar', { static: true }) navbar!: ElementRef<HTMLElement>;
  @ViewChild('navbarBrand', { static: true }) navbarBrand!: ElementRef<HTMLElement>;
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef<HTMLElement>;
  @ViewChild('hamburger', { static: false }) hamburger!: ElementRef<HTMLElement>;
  @ViewChild('mobileMenuOverlay', { static: false }) mobileMenuOverlay!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;
  private menuTimeline?: gsap.core.Timeline;
  private isScrolled = false;
  private bodyOverflow = '';
  private bodyTouchAction = '';
  protected isMobileOpen = false;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      gsap.set(this.navbarBrand.nativeElement, { scale: 1 });
      if (this.isMobileViewport()) {
        this.initMobileMenu();
      }
    }, this.navbar.nativeElement);
  }

  toggleMenu(): void {
    if (!this.isMobileViewport()) {
      return;
    }

    if (!this.menuTimeline) {
      this.initMobileMenu();
    }

    if (this.isMobileOpen) {
      this.closeMenu();
      return;
    }

    this.isMobileOpen = true;
    this.openMenu();
  }

  openMenu(): void {
    if (!this.menuTimeline) {
      return;
    }

    this.lockBodyScroll(true);
    this.menuTimeline.eventCallback('onReverseComplete', null);
    this.menuTimeline.play(0);
  }

  closeMenu(): void {
    if (!this.menuTimeline || (!this.isMobileOpen && this.menuTimeline.progress() === 0)) {
      return;
    }

    const timeline = this.menuTimeline;

    timeline.eventCallback('onReverseComplete', () => {
      this.isMobileOpen = false;
      this.lockBodyScroll(false);
      timeline.eventCallback('onReverseComplete', null);
    });

    timeline.reverse();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const navbarEl = this.navbar.nativeElement;
    const brandEl = this.navbarBrand.nativeElement;
    const shouldScroll = window.scrollY > 80;

    if (shouldScroll !== this.isScrolled) {
      this.isScrolled = shouldScroll;

      if (shouldScroll) {
        navbarEl.classList.add('navbar-scrolled');
        gsap.to(brandEl, {
          duration: 0.4,
          scale: 0.9,
          ease: 'power2.out',
        });
      } else {
        navbarEl.classList.remove('navbar-scrolled');
        gsap.to(brandEl, {
          duration: 0.4,
          scale: 1,
          ease: 'power2.out',
        });
      }
    }
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isMobileViewport()) {
      return;
    }

    if (this.isMobileOpen) {
      this.closeMenu();
    }

    this.resetMobileMenu();
  }

  private initMobileMenu(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (this.menuTimeline) {
      return;
    }

    const panel = this.navbarCollapse?.nativeElement;
    const overlay = this.mobileMenuOverlay?.nativeElement;
    const button = this.hamburger?.nativeElement;

    if (!panel || !overlay || !button) {
      return;
    }

    const menuItems = Array.from(panel.querySelectorAll('.nav-item')) as HTMLElement[];
    const navLinks = Array.from(panel.querySelectorAll('.nav-link')) as HTMLElement[];
    const cta = panel.querySelector('.mobile-menu-cta') as HTMLElement;
    const frame = panel.querySelector('.mobile-menu-frame') as HTMLElement;
    const ambient = panel.querySelector('.mobile-menu-ambient') as HTMLElement;
    const glows = Array.from(panel.querySelectorAll('.ambient-glow')) as HTMLElement[];
    const lines = Array.from(panel.querySelectorAll('.ambient-line')) as HTMLElement[];
    const line1 = button.querySelector('.line-1') as HTMLElement;
    const line2 = button.querySelector('.line-2') as HTMLElement;
    const line3 = button.querySelector('.line-3') as HTMLElement;
    const aura = button.querySelector('.toggle-aura') as HTMLElement;

    gsap.set(panel, {
      autoAlpha: 0,
      clipPath: 'inset(0 0 100% 0)',
      scale: 1.035,
      transformOrigin: '50% 0%',
    });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set([frame, ambient, cta, ...menuItems], { autoAlpha: 0 });
    gsap.set(navLinks, { y: 44, rotateX: -10, transformPerspective: 900 });
    gsap.set(glows, { scale: 0.72, autoAlpha: 0 });
    gsap.set(lines, { scaleX: 0, transformOrigin: '50% 50%' });

    this.menuTimeline = gsap.timeline({
      paused: true,
      defaults: { ease: 'expo.out' },
    });

    this.menuTimeline
      .set(button, { pointerEvents: 'none' }, 0)
      .set([line1, line2, line3], {
        background: '#fff',
        rotation: 0,
        y: 0,
        x: 0,
        scaleX: 1,
        autoAlpha: 1,
      }, 0)
      .to(overlay, {
        autoAlpha: 1,
        duration: 0.62,
        ease: 'power2.out',
      }, 0)
      .to(panel, {
        autoAlpha: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 0.82,
      }, 0.02)
      .to(frame, {
        autoAlpha: 1,
        duration: 0.62,
        ease: 'power2.out',
      }, 0.18)
      .to(glows, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.15,
        stagger: 0.08,
      }, 0.14)
      .to(lines, {
        scaleX: 1,
        duration: 0.9,
        stagger: 0.1,
      }, 0.24)
      .to(line1, {
        y: 8,
        rotation: 45,
        scaleX: 1.05,
        background: '#f5d185',
        duration: 0.46,
      }, 0)
      .to(line2, {
        x: 8,
        autoAlpha: 0,
        duration: 0.24,
        ease: 'power3.out',
      }, 0.02)
      .to(line3, {
        y: -8,
        rotation: -45,
        scaleX: 1.05,
        background: '#f5d185',
        duration: 0.46,
      }, 0)
      .to(aura, {
        scale: 1.18,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0)
      .to(menuItems, {
        autoAlpha: 1,
        duration: 0.01,
        stagger: 0.055,
      }, 0.28)
      .to(navLinks, {
        y: 0,
        rotateX: 0,
        autoAlpha: 1,
        duration: 0.72,
        stagger: 0.07,
      }, 0.3)
      .to(cta, {
        y: 0,
        autoAlpha: 1,
        duration: 0.62,
        ease: 'power3.out',
      }, 0.58)
      .set(button, { pointerEvents: 'auto' });
  }

  private isMobileViewport(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 992;
  }

  private resetMobileMenu(): void {
    this.lockBodyScroll(false);
    this.isMobileOpen = false;

    if (this.menuTimeline) {
      this.menuTimeline.kill();
      this.menuTimeline = undefined;
    }

    const panel = this.navbarCollapse?.nativeElement;
    const overlay = this.mobileMenuOverlay?.nativeElement;
    const button = this.hamburger?.nativeElement;

    if (!panel || !overlay || !button) {
      return;
    }

    const animatedElements = [
      panel,
      overlay,
      button,
      ...Array.from(panel.querySelectorAll('.mobile-menu-frame, .mobile-menu-ambient, .ambient-glow, .ambient-line, .nav-item, .nav-link, .mobile-menu-cta')),
      ...Array.from(button.querySelectorAll('.toggle-aura, .burger-line')),
    ];

    gsap.set(animatedElements, { clearProps: 'all' });
  }

  private lockBodyScroll(locked: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }

    if (locked) {
      this.bodyOverflow = document.body.style.overflow;
      this.bodyTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return;
    }

    document.body.style.overflow = this.bodyOverflow;
    document.body.style.touchAction = this.bodyTouchAction;
  }

  ngOnDestroy(): void {
    this.lockBodyScroll(false);

    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
