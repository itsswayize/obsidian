import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  showBackToTop = false;

  private revealObserver?: IntersectionObserver;
  private readonly routerSubscription: Subscription;

  constructor(private readonly router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => this.observeRevealElements());
      });
  }

  ngAfterViewInit() {
    this.observeRevealElements();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.revealObserver?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 500;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private observeRevealElements() {
    this.revealObserver?.disconnect();

    this.revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll('.reveal-up:not(.is-visible)').forEach(element => {
      this.revealObserver?.observe(element);
    });
  }
}