import { Routes } from '@angular/router';
//importar componente de layout
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        //rutas del layout
        path: '',
        component: LayoutComponent,
        //etiqueta children para agregar rutas hijas
        children: [
            {
                path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'pages', loadComponent: () => import('./features/pages/pages-list.component').then(m => m.PagesListComponent)
            },
            {
                path: 'pages/new', loadComponent: () => import('./features/pages/page-form.component').then(m => m.PageFormComponent)
            },
        ]
    },
    {
        //ruta de registro
        path: 'register',
        loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent)
    },
    {
        //ruta por defecto
        path: '**', redirectTo: 'register'
    }
];
