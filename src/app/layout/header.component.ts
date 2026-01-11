import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <header>
        <h1>Header</h1>
    </header>
    `
})
export class HeaderComponent { }
