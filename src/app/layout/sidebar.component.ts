import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../core/services/register.service";
import { SidebarService } from "../core/services/sidebar.service";

/**
 * Componente de barra lateral (sidebar)
 * Muestra el menú de navegación principal y se puede contraer/expandir
 */

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    auth = inject(AuthService);
    router = inject(Router);
    sidebarService = inject(SidebarService);

    pagesOpen = signal(false);

    // Usar el estado del servicio
    get isCollapsed() {
        return this.sidebarService.isCollapsed();
    }

    /**
     * Alterna el estado del sidebar (expandido/contraído)
     */
    toggleSidebar() {
        this.sidebarService.toggleSidebar();
    }

    /**
     * Alterna la visibilidad del submenú de páginas
     */
    togglePages() {
        this.pagesOpen.update(v => !v);
    }
}