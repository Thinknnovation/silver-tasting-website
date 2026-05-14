import { Component, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  @ViewChild('loader', { static: false }) loader!: ElementRef;
  @ViewChild('progressBar', { static: false }) progressBar!: ElementRef;
  @ViewChild('logo', { static: false }) logo!: ElementRef;

  protected readonly title = signal('silver-tasting-website');
  protected readonly isLoading = signal(true);

  ngAfterViewInit() {
    // Esperar un tick para que los ViewChild estén disponibles
    setTimeout(() => {
      this.initLoader();
    }, 0);
  }

  private initLoader() {
    if (!this.loader || !this.progressBar || !this.logo) return;

    const loaderEl = this.loader.nativeElement;
    const progressEl = this.progressBar.nativeElement;
    const logoEl = this.logo.nativeElement;

    // GSAP Timeline para entrada cinematográfica más ligera
    const tl = gsap.timeline();

    // Fade in del fondo - reducido a 1s
    tl.to(loaderEl, {
      duration: 1,
      opacity: 1,
      ease: 'power2.out'
    });

    // Reveal del logo con bounce más sutil - reducido a 0.8s
    tl.fromTo(logoEl,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.8'
    );

    // Animación de la barra de progreso - reducido a 2s
    tl.fromTo(progressEl,
      { width: '0%' },
      { width: '100%', duration: 2, ease: 'power1.inOut' },
      '-=0.5'
    );

    // Simular loading completo después de 3.5 segundos (más ligero)
    setTimeout(() => {
      this.exitLoader();
    }, 3500);
  }

  private exitLoader() {
    if (!this.loader) return;

    const loaderEl = this.loader.nativeElement;
    const tl = gsap.timeline({
      onComplete: () => this.isLoading.set(false)
    });

    // Fade out elegante - reducido a 1s
    tl.to(loaderEl, {
      duration: 1,
      opacity: 0,
      scale: 1.02,
      ease: 'power2.inOut'
    });
  }
}
