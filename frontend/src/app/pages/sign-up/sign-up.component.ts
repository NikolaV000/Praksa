import { ChangeDetectionStrategy,Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';



@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule,
  RouterModule,MatFormFieldModule,MatInputModule,MatButtonModule, 
    MatIconModule,FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: true
  
})
export class SignUpComponent {
  signupForm: FormGroup;
  isLoading = false;
  readonly errorMessage = signal('');
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  readonly email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(0)]]
    });
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  signUp() {
    if (this.signupForm.invalid) {
      console.log('Form is invalid:', this.signupForm.value);
      return;
    }

    console.log('Submitting form:', this.signupForm.value);
    this.isLoading = true;
    this.errorMessage.set('');

    this.auth.signupAdmin(this.signupForm.value).subscribe({
      next: (user) => {
        if ((user as any).id && !(user as any)._id) {
      (user as any)._id = (user as any).id;
        }
        console.log('Logged in user:', user);
        console.log('Navigating to:', `/${user._id}/project-page`);
        this.router.navigate([`${user._id}/project-page`], { replaceUrl: true });
      },
      error: err => {
        this.errorMessage.set(err.error.message || 'Signup failed');
        this.isLoading = false;
      }
    });
  }

  //goToProjectPage() {
    //this.router.navigate(['/project-page']);
  //}

}
