import { Injectable, signal } from '@angular/core';

/**
 * Servicio que gestiona el estado del sidebar (barra lateral)
 * Permite compartir el estado de colapso/expansión entre componentes
 */
@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    /**
     * Signal que mantiene el estado de colapso del sidebar
     * false = expandido (256px), true = contraído (80px)
     */
    isCollapsed = signal(false);

    /**
     * Alterna el estado del sidebar entre expandido y contraído
     */
    toggleSidebar() {
        this.isCollapsed.update(value => !value);
    }

    /**
     * Establece el estado del sidebar directamente
     * @param collapsed - true para contraer, false para expandir
     */
    setCollapsed(collapsed: boolean) {
        this.isCollapsed.set(collapsed);
    }
}

