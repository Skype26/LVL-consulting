import { computed, Injectable, signal } from "@angular/core";

export interface Usuario {
    id: number;
    name: string;
    email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    //estado base
    private _usuario = signal<Usuario | null>(null);

    //estado publico
    usuario = this._usuario.asReadonly();

    //estado derivado
    estaAutenticado = computed(() => this._usuario() !== null);

    login(usuario: Usuario) {
        this._usuario.set(usuario);
    }

    logout() {
        this._usuario.set(null);
    }
}
