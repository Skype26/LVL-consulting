import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/register.service";

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './register.component.html',
    imports: [ReactiveFormsModule, RouterLink, CommonModule]
})
export class RegisterComponent {
    auth = inject(AuthService);
    router = inject(Router);
    showPassword = false;

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        terms: new FormControl(false, [Validators.requiredTrue])
    })

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    login() {
        if (this.form.invalid) return;

        this.auth.login({
            id: 1,
            name: this.form.value.name!,
            email: this.form.value.email!,
            password: this.form.value.password!
        });

        // Navegar al dashboard después del login
        this.router.navigate(['/dashboard']);
    }
}