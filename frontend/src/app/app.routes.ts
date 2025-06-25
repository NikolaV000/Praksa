import { Routes } from '@angular/router';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { 
        path: '', redirectTo: '/login', pathMatch: 'full' 

    }, 
    { 
        path: 'login', component: LoginComponent 
    },
    {
        path: ':projectId/task-page',
        component: TaskPageComponent,
         canActivate: [AuthGuard],
      
    },
    {
        path: ':userId/project-page',
        loadComponent: () => import('./pages/project-page/project-page.component')
    .then(m => m.ProjectPageComponent),
        canActivate: [AuthGuard],
            
    },
    {
        path: 'sign-up-page',
        component: SignUpComponent,
            
    },
];
