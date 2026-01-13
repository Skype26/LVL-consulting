import { Component, inject, computed } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { SidebarComponent } from './sidebar.component';
import { SidebarService } from '../core/services/sidebar.service';

@Component({
    standalone: true,
    selector: 'app-layout',
    imports: [RouterOutlet, SidebarComponent, HeaderComponent],
    template: `
    <div class="min-h-screen bg-gray-50">
        <app-sidebar />
        
        <div class="transition-all duration-300" [style.margin-left]="contentMargin()">
            <app-header />
            
            <main class="p-6">
                <router-outlet />
            </main>
        </div>
    </div>
    `
})
export class LayoutComponent {
    sidebarService = inject(SidebarService);

    // Computed signal para calcular el margen dinámicamente
    contentMargin = computed(() => {
        return this.sidebarService.isCollapsed() ? '5rem' : '16rem';
    });
}

