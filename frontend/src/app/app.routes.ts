import { Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            { path: 'list-page', component: ListPageComponent }

        ]
    },

];
