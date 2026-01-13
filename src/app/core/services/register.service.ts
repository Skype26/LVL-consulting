import { computed, Injectable, signal } from "@angular/core";

/**
 * Interfaz que define la estructura de un usuario en el sistema
 */
export interface Usuario {
    id: number;        // Identificador único del usuario
    name: string;      // Nombre completo del usuario
    email: string;     // Correo electrónico del usuario
    password: string;  // Contraseña del usuario
}

/**
 * Servicio de autenticación que maneja el estado del usuario
 * Utiliza Angular Signals para gestionar el estado reactivo
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

    // Estado base privado - Solo puede ser modificado dentro del servicio
    private _usuario = signal<Usuario | null>(null);

    // Estado público de solo lectura - Permite leer el usuario actual sin modificarlo
    usuario = this._usuario.asReadonly();

    // Estado derivado - Calcula automáticamente si el usuario está autenticado
    estaAutenticado = computed(() => this._usuario() !== null);

    /**
     * Inicia sesión estableciendo el usuario actual
     * @param usuario - Datos del usuario que inicia sesión
     */
    login(usuario: Usuario) {
        this._usuario.set(usuario);
    }

    /**
     * Cierra la sesión eliminando el usuario actual
     */
    logout() {
        this._usuario.set(null);
    }
}
