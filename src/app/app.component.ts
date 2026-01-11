import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  auth = inject(AuthService);
  router = inject(Router);

  constructor() {
    // Redirigir a login si no está autenticado
    effect(() => {
      if (!this.auth.estaAutenticado() && !this.router.url.includes('login') && !this.router.url.includes('register')) {
        this.router.navigate(['/login']);
      }
    });
  }
}
