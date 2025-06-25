import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TaskService } from './shared/services/task.service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';


// import your components...

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    RouterModule, 
    AppRoutingModule,
    FormsModule,
    //HttpClientModule
  ],
  providers: [
    TaskService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { autoFocus: 'dialog', restoreFocus: true }
    },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }*/
  ]

})
export class AppModule { }