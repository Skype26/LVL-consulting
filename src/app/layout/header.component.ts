import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../core/services/register.service";

/**
 * Componente de cabecera de la aplicación
 * Muestra información del usuario, notificaciones y menú desplegable
 */

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    auth = inject(AuthService);
    router = inject(Router);

    // Estado del menú desplegable del usuario
    userMenuOpen = false;

    /**
     * Obtiene el nombre del usuario autenticado
     * @returns Nombre del usuario o 'Usuario' por defecto
     */
    get userName(): string {
        return this.auth.usuario()?.name || 'Usuario';
    }

    /**
     * Obtiene el rol del usuario
     * @returns Rol del usuario
     */
    get userRole(): string {
        return 'CEO LVL Consulting';
    }

    /**
     * Obtiene las iniciales del nombre del usuario
     * @returns Iniciales en mayúsculas (máximo 2 caracteres)
     */
    get userInitials(): string {
        const name = this.userName;
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    /**
     * Obtiene la fecha actual formateada en español
     * @returns Fecha formateada (ej: "lunes, 13 de enero de 2026")
     */
    get currentDate(): string {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date().toLocaleDateString('es-ES', options);
    }

    /**
     * Alterna la visibilidad del menú desplegable del usuario
     */
    toggleUserMenu() {
        this.userMenuOpen = !this.userMenuOpen;
    }

    /**
     * Cierra la sesión del usuario y redirige al login
     */
    logout() {
        this.auth.logout();
        this.userMenuOpen = false;
        this.router.navigate(['/register']);
    }
}
