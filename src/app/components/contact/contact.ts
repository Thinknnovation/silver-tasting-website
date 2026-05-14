import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit {
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const section = this.contactSection.nativeElement;
      const title = section.querySelector('.section-title');
      const form = section.querySelector('.contact-form');
      const info = section.querySelector('.contact-info');

      // Reveal animation
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
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

      if (form) {
        revealTl.from(form, {
          duration: 0.8,
          opacity: 0,
          x: -40,
          ease: 'power3.out',
        }, '-=0.4');
      }

      if (info) {
        revealTl.from(info, {
          duration: 0.8,
          opacity: 0,
          x: 40,
          ease: 'power3.out',
        }, '-=0.4');
      }
    }, this.contactSection.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
