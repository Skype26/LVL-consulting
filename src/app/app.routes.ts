import { Routes } from '@angular/router';
// Importar componente de layout
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        // Ruta raíz redirige a register
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent)
    },
    {
        // Rutas del layout (protegidas)
        path: '',
        component: LayoutComponent,
        // Etiqueta children para agregar rutas hijas
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'pages',
                loadComponent: () => import('./features/pages/pages-list.component').then(m => m.PagesListComponent)
            },
            {
                path: 'pages/new',
                loadComponent: () => import('./features/pages/page-form.component').then(m => m.PageFormComponent)
            },
        ]
    },
    {
        // Ruta para página no encontrada (404)
        path: '404',
        loadComponent: () => import('./features/error/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        // Ruta por defecto (cualquier ruta no encontrada redirige a 404)
        path: '**',
        redirectTo: '404'
    }
];
