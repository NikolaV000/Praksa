import { Component, inject, OnInit, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialog,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthResponse } from '../../interfaces/auth-response.interface';



@Component({
  selector: 'app-user-dialog',
  imports: [MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,CommonModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css',
  standalone:true
})
export class UserDialogComponent implements OnInit {
    readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);
    readonly data = inject<AuthResponse>(MAT_DIALOG_DATA);
    readonly authService = inject(AuthService);
    username ='';
    role: 'admin' | 'guest' = this.data.role;
  ngOnInit(): void {
    if (this.data) {
      this.username = this.data.username;
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  onLogOut(): void{
    if (this.role === 'admin') {
      this.authService.logout();
      this.dialogRef.close();
    }

  }
  onSignOut(): void{
    //this.authService.signOutGuest();
    this.authService.signOut();
    this.dialogRef.close();

  }

}
