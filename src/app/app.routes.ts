import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'create-user',
        loadComponent: () => import('./pages/create-user/create-user.component').then((m) => m.CreateUserComponent),
    },
    {
        path: 'update-user/:id',
        loadComponent: () => import('./pages/create-user/create-user.component').then((m) => m.CreateUserComponent),
    },
    {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
    },
    {path: '**', redirectTo: 'users'}
];
