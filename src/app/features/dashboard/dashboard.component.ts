import { Component, inject } from "@angular/core";
import { DataService } from "../../core/services/data.service";

@Component({
    standalone: true,
    template: `
    <h2>Dashboard</h2>
    <div class="stats">
    @for (stat of data.stats(); track stat.title){
        <div>
            <p>{{stat.title}}</p>
            <strong>{{stat.value}}</strong>
        </div>
    }
    </div>
    `
})
export class DashboardComponent {
    data = inject(DataService);
}