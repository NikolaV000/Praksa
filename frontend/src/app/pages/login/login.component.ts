import {Component, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule,
  ReactiveFormsModule,
  RouterModule,MatFormFieldModule,MatInputModule,MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
  
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router)
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    this.auth.loginAdmin(this.loginForm.value).subscribe({
      next: (user) => {
        if ((user as any).id && !(user as any)._id) {
      (user as any)._id = (user as any).id;
        }
        console.log('Logged in user:', user);
        console.log('Navigating to:', `/${user._id}/project-page`);
        this.router.navigate([`${user._id}/project-page`], { replaceUrl: true });
      },
      error: err => {
        this.errorMessage = err.error.message || 'Login failed';
        this.isLoading = false;
      }
    });
  }
  signUpAsGuest() {
    this.isLoading = true;
    this.auth.signupGuest().subscribe({
      next: (user) => {
        if ((user as any).id && !(user as any)._id) {
      (user as any)._id = (user as any).id;
        }
        console.log('Logged in user:', user);
        console.log('Navigating to:', `/${user._id}/project-page`);
        this.router.navigate([`/${user._id}/project-page`], { replaceUrl: true });
      },
      error: err => {
        this.errorMessage = 'Guest sign up failed';
        this.isLoading = false;
      }
    });
  }

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  goToSingUpPage() {
    this.router.navigate(['/sign-up-page']);
  }
  //goToProjectPage() {
    //this.router.navigate(['/project-page']);
  //}

}
