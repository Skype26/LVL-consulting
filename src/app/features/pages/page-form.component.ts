import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "../../core/services/data.service";

/**
 * Componente para crear y editar páginas web
 * Incluye formulario con validación y carga de archivos
 */

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './page-form.component.html'
})
export class PageFormComponent implements OnInit {
    dataService = inject(DataService);
    router = inject(Router);

    // Signals para manejar los datos de forma reactiva
    companies = signal<any[]>([]);          // Lista de empresas disponibles
    companyTypes = signal<any[]>([]);       // Tipos de empresa
    categories = signal<any[]>([]);         // Categorías disponibles
    loading = signal(true);                 // Estado de carga
    selectedFile = signal<File | null>(null);  // Archivo seleccionado
    previewUrl = signal<string | null>(null);  // URL de vista previa del archivo
    showContactFormModal = signal(false);    // Controla la visibilidad del modal

    // Formulario reactivo con validaciones
    form = new FormGroup({
        categoryName1: new FormControl('', [Validators.required]),
        categoryName2: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        companyType1: new FormControl('', [Validators.required]),
        companyType2: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

    ngOnInit() {
        this.loadFormData();
    }

    /**
     * Carga los datos necesarios para el formulario
     * (empresas, tipos de empresa, categorías)
     */

    loadFormData() {
        this.dataService.getFormData().subscribe({
            next: (data) => {
                this.companies.set(data.companies);
                this.companyTypes.set(data.companyTypes);
                this.categories.set(data.categories);
                this.loading.set(false);
            },
            error: (error) => {
                console.error('Error cargando datos del formulario:', error);
                this.loading.set(false);
            }
        });
    }

    /**
     * Maneja la selección de un archivo
     * Crea una vista previa si es una imagen
     * @param event - Evento del input file
     */
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile.set(file);

            // Crear preview para imágenes
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previewUrl.set(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * Envía el formulario si es válido
     * Redirige a la lista de páginas después de guardar
     */
    onSubmit() {
        if (this.form.valid) {
            console.log('Formulario válido:', this.form.value);
            console.log('Archivo seleccionado:', this.selectedFile());
            // Aquí iría la lógica para enviar los datos al backend
            alert('Formulario guardado exitosamente');
            this.router.navigate(['/pages']);
        } else {
            alert('Por favor complete todos los campos requeridos');
        }
    }

    /**
     * Cancela la edición y vuelve a la lista de páginas
     */
    onCancel() {
        this.router.navigate(['/pages']);
    }
}