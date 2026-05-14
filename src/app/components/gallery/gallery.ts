import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements AfterViewInit {
  @ViewChild('gallerySection', { static: true }) gallerySection!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const section = this.gallerySection.nativeElement;
      const title = section.querySelector('.section-title');
      const grid = section.querySelector('.gallery-grid');
      const items = section.querySelectorAll<HTMLElement>('.gallery-item');

      // Set initial state for grid and items
      if (grid) {
        gsap.set(grid, {
          autoAlpha: 0,
          y: 20,
        });
      }

      gsap.set(items, {
        autoAlpha: 0,
        y: 40,
      });

      // Reveal animation
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      if (title) {
        revealTl.from(title, {
          duration: 0.8,
          opacity: 0,
          y: 30,
          ease: 'power3.out',
        });
      }

      if (grid) {
        revealTl.to(grid, {
          duration: 0.7,
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
        }, '-=0.2');
      }

      if (items.length) {
        revealTl.to(items, {
          duration: 0.8,
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          ease: 'power3.out',
        }, '-=0.4');
      }

      // Hover animations for gallery items
      items.forEach((item) => {
        const itemEl = item as HTMLElement;
        gsap.set(itemEl, { transformOrigin: 'center center' });

        itemEl.addEventListener('mouseenter', () => {
          gsap.to(itemEl, {
            duration: 0.4,
            scale: 1.05,
            ease: 'power2.out',
          });
        });

        itemEl.addEventListener('mouseleave', () => {
          gsap.to(itemEl, {
            duration: 0.4,
            scale: 1,
            ease: 'power2.out',
          });
        });
      });
    }, this.gallerySection.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
