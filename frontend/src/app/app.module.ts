import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TaskService } from './shared/services/task.service';

// import your components...

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    RouterModule, 
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    TaskService,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { autoFocus: 'dialog', restoreFocus: true }
    }
  ]

})
export class AppModule { }