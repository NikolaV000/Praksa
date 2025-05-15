import { Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    { 
        path: '', redirectTo: '/login', pathMatch: 'full' 

    }, 
    { 
        path: 'login', component: LoginComponent 
    },
    {
        path: 'task-page',
        component: TaskPageComponent,
      
    },
    {
        path: 'list-page',
        component: ListPageComponent,
            
    },
    {
        path: 'sign-up-page',
        component: SignUpComponent,
            
    },
];
