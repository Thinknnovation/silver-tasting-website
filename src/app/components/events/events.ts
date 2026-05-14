import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements AfterViewInit {
  @ViewChild('eventsSection', { static: true }) eventsSection!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const section = this.eventsSection.nativeElement;
      const badge = section.querySelector('.section-badge');
      const title = section.querySelector('.section-title');
      const subtitle = section.querySelector('.section-subtitle');
      const cards = section.querySelectorAll<HTMLElement>('.event-card');
      const cardRow = section.querySelector('.row');

      // Set initial state for cards and row container
      if (cardRow) {
        gsap.set(cardRow, {
          autoAlpha: 0,
          y: 20,
        });
      }

      gsap.set(cards, {
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
          markers: false, // Set to true for debugging
        },
      });

      if (badge) {
        revealTl.from(badge, {
          duration: 0.8,
          opacity: 0,
          y: 30,
          ease: 'power3.out',
        });
      }

      if (title) {
        revealTl.from(title, {
          duration: 0.8,
          opacity: 0,
          y: 30,
          ease: 'power3.out',
        }, '-=0.4');
      }

      if (subtitle) {
        revealTl.from(subtitle, {
          duration: 0.8,
          opacity: 0,
          y: 30,
          ease: 'power3.out',
        }, '-=0.4');
      }

      if (cardRow) {
        revealTl.to(cardRow, {
          duration: 0.7,
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
        }, '-=0.2');
      }

      if (cards.length) {
        revealTl.to(cards, {
          duration: 0.8,
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          ease: 'power3.out',
        }, '-=0.4');
      }

      // Hover animations for cards
      cards.forEach((card) => {
        const cardEl = card as HTMLElement;
        gsap.set(cardEl, { transformOrigin: 'center center' });

        cardEl.addEventListener('mouseenter', () => {
          gsap.to(cardEl, {
            duration: 0.3,
            y: -10,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            ease: 'power2.out',
          });
        });

        cardEl.addEventListener('mouseleave', () => {
          gsap.to(cardEl, {
            duration: 0.3,
            y: 0,
            scale: 1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            ease: 'power2.out',
          });
        });
      });
    }, this.eventsSection.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
