import { Component, inject } from "@angular/core";
import { DataService } from "../../core/services/data.service";

@Component({
    standalone: true,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    data = inject(DataService);
}