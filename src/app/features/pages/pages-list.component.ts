import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DataService } from "../../core/services/data.service";

/**
 * Componente que muestra la lista de páginas web
 * Permite filtrar y navegar a la creación/edición de páginas
 */

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './pages-list.component.html'
})
export class PagesListComponent implements OnInit {
    dataService = inject(DataService);

    // Signals para manejar los datos de forma reactiva
    pages = signal<any[]>([]);              // Todas las páginas
    filteredPages = signal<any[]>([]);      // Páginas filtradas por búsqueda
    loading = signal(true);                 // Estado de carga
    currentPage = signal(1);                // Página actual de paginación
    itemsPerPage = 10;                      // Items por página

    ngOnInit() {
        this.loadPages();
    }

    /**
     * Carga la lista de páginas desde el servicio
     */

    loadPages() {
        this.dataService.getPages().subscribe({
            next: (data) => {
                this.pages.set(data.pages);
                this.filteredPages.set(data.pages);
                this.loading.set(false);
            },
            error: (error) => {
                console.error('Error cargando páginas:', error);
                this.loading.set(false);
            }
        });
    }

    /**
     * Obtiene las clases CSS para el color según el tipo de categoría
     * @param type - Tipo de categoría (Imágenes, Documento, Videos)
     * @returns Clases CSS de Tailwind para el estilo
     */
    getCategoryColor(type: string): string {
        const colors: any = {
            'Imágenes': 'bg-orange-100 text-orange-600',
            'Documento': 'bg-green-100 text-green-600',
            'Videos': 'bg-blue-100 text-blue-600'
        };
        return colors[type] || 'bg-gray-100 text-gray-600';
    }

    /**
     * Filtra las páginas según el término de búsqueda
     * Busca en categoría y descripción
     * @param searchTerm - Término de búsqueda
     */
    filterPages(searchTerm: string) {
        if (!searchTerm) {
            this.filteredPages.set(this.pages());
            return;
        }
        const filtered = this.pages().filter(page =>
            page.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            page.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.filteredPages.set(filtered);
    }
}