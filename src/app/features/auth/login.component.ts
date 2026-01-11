import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
    auth = inject(AuthService);
    router = inject(Router);

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

    login() {
        if (this.form.invalid) return;

        this.auth.login({
            id: 1,
            name: 'ray',
            email: this.form.value.email!,
        });

        // Navegar al dashboard después del login
        this.router.navigate(['/dashboard']);
    }
}