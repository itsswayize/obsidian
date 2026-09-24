import { Routes } from '@angular/router';
import { BookingComponent } from './features/booking/booking';
import { HomeComponent } from './features/home/home';
import { ServicesComponent } from './features/services/services';
import { AboutComponent } from './features/about/about';
import { ContactComponent } from './features/contact/contact';
import { TermsComponent } from './features/terms/terms';
import { NotFoundComponent } from './features/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'booking', component: BookingComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];