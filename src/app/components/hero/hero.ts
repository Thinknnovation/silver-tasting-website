import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  @ViewChild('heroContent', { static: true }) heroContent!: ElementRef<HTMLElement>;
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const content = this.heroContent.nativeElement;
      const section = this.heroSection.nativeElement;
      const category = content.querySelector('.hero-category');
      const location = content.querySelector('.hero-location');
      const title = content.querySelector('h1');
      const buttons = content.querySelectorAll('.hero-buttons button');

      // Intro animation
      const introTl = gsap.timeline();
      introTl.from(content, {
        duration: 1,
        opacity: 0,
        y: 60,
        ease: 'power3.out',
      });

      if (category) {
        introTl.from(category, {
          duration: 0.9,
          opacity: 0,
          y: 24,
          ease: 'power3.out',
        }, 0.3);
      }

      if (location) {
        introTl.from(location, {
          duration: 0.9,
          opacity: 0,
          y: 24,
          ease: 'power3.out',
        }, 0.45);
      }

      if (title) {
        introTl.from(title, {
          duration: 1.1,
          opacity: 0,
          y: 40,
          ease: 'power3.out',
        }, 0.6);
      }

      if (buttons.length) {
        introTl.from(buttons, {
          duration: 0.9,
          opacity: 0,
          y: 30,
          stagger: 0.12,
          ease: 'power3.out',
        }, 0.9);
      }

      // Background zoom on scroll
      gsap.to(section, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Parallax effect for content
      gsap.to(content, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, this.heroSection.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
