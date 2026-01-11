import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
//diseñamos la vista del registro
@Component({
    standalone: true,
    imports: [ReactiveFormsModule],
    selector: 'app-register',
    template: `
    <form [formGroup]="form">
        <h2>crear cuenta</h2>

        <input formControlName="email" type="email" placeholder="correo electronico" >
        <input formControlName="username" type="text" placeholder="usuario" >
        <input formControlName="password" type="password" placeholder=" escribe tu contraseña" >

        <button (click)="submit()"> registrar </button>
    </form>
    `
})
export class RegisterComponent {
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        passwoord: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
    submit() {
        console.log(this.form.value)
    }
}