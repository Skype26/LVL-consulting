import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { SidebarComponent } from './sidebar.component';
//creamos el componente layout para que contenga el sidebar y el header
@Component({
    standalone: true,
    selector: 'app-layout',
    imports: [RouterOutlet, SidebarComponent, HeaderComponent],
    template: `
    <div class="layout">
        <app-sidebar/>
        <div class="content">
            <app-header />
            <router-outlet />
        </div>
    </div>
    `
})
export class LayoutComponent { }