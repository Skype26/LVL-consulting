import { Component, inject, OnInit, signal, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { DataService } from "../../core/services/data.service";
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

/**
 * Componente principal del Dashboard
 * Muestra estadísticas, gráficos de ventas y datos de referidos
 */
@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [CommonModule],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
    dataService = inject(DataService);

    // Referencias a los elementos canvas para los gráficos
    @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;

    // Signals para manejar los datos de forma reactiva
    stats = signal<any[]>([]);              // Estadísticas principales del dashboard
    salesHistory = signal<any>(null);       // Historial de ventas semanal y por períodos
    referrals = signal<any[]>([]);          // Datos de referidos
    loading = signal(true);                 // Estado de carga

    // Instancias de los gráficos
    private lineChart?: Chart;
    private doughnutChart?: Chart;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        // Verificar si estamos en el navegador (necesario para SSR)
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit() {
        this.loadDashboardData();
    }

    ngAfterViewInit() {
        // Los gráficos se crearán después de cargar los datos en loadDashboardData()
    }

    /**
     * Carga los datos del dashboard desde el servicio
     * Una vez cargados, crea los gráficos si estamos en el navegador
     */
    loadDashboardData() {
        this.dataService.getDashboardData().subscribe({
            next: (data) => {
                this.stats.set(data.stats);
                this.salesHistory.set(data.salesHistory);
                this.referrals.set(data.referrals);
                this.loading.set(false);

                // Solo crear gráficos en el navegador
                if (this.isBrowser) {
                    setTimeout(() => {
                        this.createLineChart();
                        this.createDoughnutChart();
                    }, 100);
                }
            },
            error: (error) => {
                console.error('Error cargando datos del dashboard:', error);
                this.loading.set(false);
            }
        });
    }

    /**
     * Crea el gráfico de líneas que muestra el historial de ventas semanal
     * Utiliza Chart.js para renderizar el gráfico
     */
    createLineChart() {
        if (!this.isBrowser || !this.lineChartRef || !this.salesHistory()) return;

        const ctx = this.lineChartRef.nativeElement.getContext('2d');
        if (!ctx) return;

        const weeklyData = this.salesHistory().weekly;

        const config: ChartConfiguration = {
            type: 'line',
            data: {
                labels: weeklyData.map((d: any) => d.day),
                datasets: [{
                    label: 'Total libre (GB)',
                    data: weeklyData.map((d: any) => d.value),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#10b981',
                    pointBorderWidth: 0,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#10b981',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            display: false
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            lineWidth: 1
                        },
                        border: {
                            display: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#9ca3af',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        };

        this.lineChart = new Chart(ctx, config);
    }

    /**
     * Crea el gráfico de dona que muestra las ventas por período
     * (Anual, Mensual, Semanal, Diario)
     */
    createDoughnutChart() {
        if (!this.isBrowser || !this.doughnutChartRef || !this.salesHistory()) return;

        const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
        if (!ctx) return;

        const periods = this.salesHistory().periods;

        const config: ChartConfiguration<'doughnut'> = {
            type: 'doughnut',
            data: {
                labels: periods.map((p: any) => p.name),
                datasets: [{
                    data: periods.map((p: any) => p.percentage),
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 0,
                    borderRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 10,
                        displayColors: true,
                        boxWidth: 10,
                        boxHeight: 10,
                        callbacks: {
                            label: function (context) {
                                return ' ' + context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        };

        this.doughnutChart = new Chart(ctx, config);
    }

    /**
     * Obtiene las clases CSS para el color de tendencia
     * @param trend - 'up' para tendencia positiva, 'down' para negativa
     * @returns Clases CSS de Tailwind para el estilo
     */
    getTrendColor(trend: string): string {
        if (trend === 'up') {
            return 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded';
        } else {
            return 'text-red-500 bg-red-50 px-2 py-0.5 rounded';
        }
    }

    /**
     * Obtiene el color para cada período en el gráfico de dona
     * @param index - Índice del período
     * @returns Código de color hexadecimal
     */
    getPeriodColor(index: number): string {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        return colors[index] || colors[0];
    }

    /**
     * Obtiene el path SVG del icono según el tipo
     * @param icon - Nombre del icono (trending-up, users, dollar, chart)
     * @returns Path SVG del icono
     */
    getIcon(icon: string): string {
        const icons: any = {
            'trending-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
            'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            'dollar': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            'chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        };
        return icons[icon] || icons['chart'];
    }

    /**
     * Limpia los gráficos al destruir el componente
     * Previene fugas de memoria
     */
    ngOnDestroy() {
        if (this.lineChart) {
            this.lineChart.destroy();
        }
        if (this.doughnutChart) {
            this.doughnutChart.destroy();
        }
    }
}