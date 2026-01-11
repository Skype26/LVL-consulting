import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../core/services/auth.service";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="sidebar">
        <h2>Menú</h2>
        <nav>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/pages">Páginas</a>
            <a routerLink="/pages/new">Nueva Página</a>
        </nav>
        <button (click)="logout()">Cerrar sesión</button>
    </div>
    `
})
export class SidebarComponent {
    auth = inject(AuthService);
    router = inject(Router);

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}