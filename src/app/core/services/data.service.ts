import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

/**
 * Servicio centralizado para gestionar todas las peticiones de datos
 * Proporciona acceso a datos del dashboard, páginas y formularios
 * Incluye datos de respaldo (dummy data) en caso de error
 */
@Injectable({
    providedIn: 'root'
})
export class DataService {
    // Ruta base para los archivos JSON de datos
    private baseUrl = 'assets/data';

    constructor(private http: HttpClient) { }

    /**
     * Obtiene los datos del dashboard desde el archivo JSON
     * @returns Observable con los datos del dashboard o datos dummy en caso de error
     */
    getDashboardData(): Observable<any> {
        return this.http.get(`${this.baseUrl}/dashboard.json`).pipe(
            catchError(() => of(this.getDashboardDummy()))
        );
    }

    /**
     * Obtiene la lista de páginas desde el archivo JSON
     * @returns Observable con la lista de páginas o datos dummy en caso de error
     */
    getPages(): Observable<any> {
        return this.http.get(`${this.baseUrl}/pages.json`).pipe(
            catchError(() => of(this.getPagesDummy()))
        );
    }

    /**
     * Obtiene los datos necesarios para el formulario (empresas, tipos, categorías)
     * @returns Observable con los datos del formulario o datos dummy en caso de error
     */
    getFormData(): Observable<any> {
        return this.http.get(`${this.baseUrl}/form-data.json`).pipe(
            catchError(() => of(this.getFormDataDummy()))
        );
    }

    /**
     * Genera URL de imagen aleatoria desde Picsum Photos
     * @param width - Ancho de la imagen (por defecto 400px)
     * @param height - Alto de la imagen (por defecto 300px)
     * @param seed - Semilla opcional para obtener siempre la misma imagen
     * @returns URL de la imagen
     */
    getRandomImage(width: number = 400, height: number = 300, seed?: string): string {
        const seedParam = seed ? `/seed/${seed}` : '';
        return `https://picsum.photos${seedParam}/${width}/${height}`;
    }

    /**
     * Genera URL de imagen desde Unsplash basada en una búsqueda
     * @param query - Término de búsqueda para la imagen (por defecto 'business')
     * @param width - Ancho de la imagen (por defecto 400px)
     * @param height - Alto de la imagen (por defecto 300px)
     * @returns URL de la imagen
     */
    getUnsplashImage(query: string = 'business', width: number = 400, height: number = 300): string {
        return `https://source.unsplash.com/${width}x${height}/?${query}`;
    }

    /**
     * Datos de respaldo para el dashboard
     * Se utilizan cuando falla la carga del archivo JSON
     * @returns Objeto con estadísticas, historial de ventas y referidos
     */
    private getDashboardDummy() {
        return {
            stats: [
                { title: "Ingresos", value: "S/ 460.00", change: "+5/50k", changeText: "Desde el mes pasado", trend: "up", icon: "trending-up" },
                { title: "Número de clientes", value: "4789", change: "-30 clientes", changeText: "Desde el mes pasado", trend: "down", icon: "users" },
                { title: "Inversión realizada", value: "S/ 5460.00k", change: "+5/32k", changeText: "Desde el mes pasado", trend: "up", icon: "dollar" },
                { title: "Relación de ganancia", value: "S/ 460.00", change: "-5/50k", changeText: "Desde el mes pasado", trend: "down", icon: "chart" }
            ],
            salesHistory: {
                weekly: [
                    { day: "Lunes", value: 65 },
                    { day: "Martes", value: 85 },
                    { day: "Miércoles", value: 75 },
                    { day: "Jueves", value: 95 },
                    { day: "Viernes", value: 45 },
                    { day: "Sábado", value: 70 },
                    { day: "Domingo", value: 90 }
                ],
                periods: [
                    { name: "Anual", percentage: 100, amount: "S/4500" },
                    { name: "Mensual", percentage: 60, amount: "S/4500" },
                    { name: "Semanal", percentage: 20, amount: "S/4500" },
                    { name: "Diario", percentage: 30, amount: "S/4500" }
                ]
            },
            referrals: [
                { name: "Referidos", count: 1024, percentage: 87 },
                { name: "Referidos", count: 1024, percentage: 87 }
            ]
        };
    }

    /**
     * Datos de respaldo para la lista de páginas
     * Se utilizan cuando falla la carga del archivo JSON
     * @returns Objeto con array de páginas y metadatos de paginación
     */
    private getPagesDummy() {
        return {
            pages: [
                { id: 1, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Imágenes", imageUrl: "https://picsum.photos/seed/page1/100/100" },
                { id: 2, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Imágenes", imageUrl: "https://picsum.photos/seed/page2/100/100" },
                { id: 3, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Documento", imageUrl: "https://picsum.photos/seed/page3/100/100" },
                { id: 4, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Documento", imageUrl: "https://picsum.photos/seed/page4/100/100" },
                { id: 5, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Videos", imageUrl: "https://picsum.photos/seed/page5/100/100" },
                { id: 6, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Videos", imageUrl: "https://picsum.photos/seed/page6/100/100" },
                { id: 7, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Videos", imageUrl: "https://picsum.photos/seed/page7/100/100" },
                { id: 8, category: "Recursos gráficos", subcategory: "Recursos gráficos", description: "Recursos gráficos que se usarán en páginas que se deberán usar en su momento", date: "15/04/24 - 6:30 hrs.", categoryType: "Videos", imageUrl: "https://picsum.photos/seed/page8/100/100" }
            ],
            totalPages: 2,
            currentPage: 1,
            itemsPerPage: 10
        };
    }

    /**
     * Datos de respaldo para el formulario
     * Se utilizan cuando falla la carga del archivo JSON
     * @returns Objeto con empresas, tipos de empresa y categorías
     */
    private getFormDataDummy() {
        return {
            companies: [
                { id: 1, name: "LVL Consulting", type: "Consultoría" },
                { id: 2, name: "Tech Solutions", type: "Tecnología" },
                { id: 3, name: "Marketing Pro", type: "Marketing" }
            ],
            companyTypes: [
                { id: 1, name: "Consultoría" },
                { id: 2, name: "Tecnología" },
                { id: 3, name: "Marketing" },
                { id: 4, name: "Finanzas" },
                { id: 5, name: "Educación" }
            ],
            categories: ["Administrador", "Recursos humanos", "Estudios contables", "Logística", "Ventas", "Marketing"]
        };
    }
}