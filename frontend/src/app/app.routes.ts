import { Routes } from '@angular/router';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';

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
      
    },
    {
        path: 'project-page',
        component: ProjectPageComponent,
            
    },
    {
        path: 'sign-up-page',
        component: SignUpComponent,
            
    },
];
