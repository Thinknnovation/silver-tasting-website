import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experiences',
  imports: [],
  templateUrl: './experiences.html',
  styleUrl: './experiences.scss',
})
export class Experiences implements AfterViewInit {
  @ViewChild('experiencesSection', { static: true }) experiencesSection!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const section = this.experiencesSection.nativeElement;
      const badge = section.querySelector('.section-badge');
      const title = section.querySelector('.section-title');
      const subtitle = section.querySelector('.section-subtitle');
      const container = section.querySelector('.cards-container');
      const cards = section.querySelectorAll<HTMLElement>('.experience-card');

      // Set initial state for container and cards
      if (container) {
        gsap.set(container, {
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

      if (container) {
        revealTl.to(container, {
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
    }, this.experiencesSection.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
