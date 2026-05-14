import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements AfterViewInit {
  @ViewChild('navbar', { static: true }) navbar!: ElementRef<HTMLElement>;
  @ViewChild('navbarBrand', { static: true }) navbarBrand!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;
  private isScrolled = false;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      // Initial setup - glassmorphism premium
      gsap.set(this.navbarBrand.nativeElement, {
        scale: 1,
      });
    }, this.navbar.nativeElement);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const navbarEl = this.navbar.nativeElement;
    const brandEl = this.navbarBrand.nativeElement;
    const scrollY = window.scrollY;
    const shouldScroll = scrollY > 80;

    if (shouldScroll !== this.isScrolled) {
      this.isScrolled = shouldScroll;

      if (shouldScroll) {
        // Scrolled state - premium glassmorphism
        navbarEl.classList.add('navbar-scrolled');
        gsap.to(brandEl, {
          duration: 0.4,
          scale: 0.9,
          ease: 'power2.out',
        });
      } else {
        // Initial state
        navbarEl.classList.remove('navbar-scrolled');
        gsap.to(brandEl, {
          duration: 0.4,
          scale: 1,
          ease: 'power2.out',
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
