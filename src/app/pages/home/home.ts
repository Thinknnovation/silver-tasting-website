import { Component } from '@angular/core';
import { Contact } from '../../components/contact/contact';
import { Events } from '../../components/events/events';
import { Experiences } from '../../components/experiences/experiences';
import { Footer } from '../../components/footer/footer';
import { Gallery } from '../../components/gallery/gallery';
import { Hero } from '../../components/hero/hero';
import { Navbar } from '../../components/navbar/navbar';
import { Testimonials } from '../../components/testimonials/testimonials';

@Component({

  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    Experiences,
    Events,
    Gallery,
    Testimonials,
    Contact,
    Footer
  ],
   templateUrl: './home.html',
  styleUrl: './home.scss'
})


export class Home {

}
