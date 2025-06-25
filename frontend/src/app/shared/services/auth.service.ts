import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/auth-response.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<AuthResponse | null>(null);
  private token: string | null = null;
  stored: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    try {
      if (typeof window !== 'undefined') {
      this.stored = localStorage.getItem(this.tokenKey);
     }
    } catch (e) {
      console.warn('localStorage is not available:', e);
    }
    if (this.stored) {
      this.token = this.stored; // Store token temporarily
      this.validateToken(this.stored).subscribe();
    }
  }

  get user$(): Observable<AuthResponse | null> {
    return this.userSubject.asObservable();
  }

  get currentUser(): AuthResponse | null {
    return this.userSubject.value;
  }
  set currentUser(user: AuthResponse | null) {
  this.userSubject.next(user);
}

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get isGuest(): boolean {
    return this.currentUser?.role === 'guest';
  }
  get authToken(): string | null {
    return this.token || localStorage.getItem(this.tokenKey);
  }

  signupAdmin(data: { username: string; password: string; email: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data).pipe(
      tap((res) => {
      this.setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
    })
    );
  }

  loginAdmin(data: { username: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
      this.setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
    })
    );
  }

  signupGuest() {
    return this.http.post<AuthResponse>(`${this.apiUrl}/guest-signup`, {}).pipe(
      tap((res) => {
      this.setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
    })
    );
  }
  private setUser(user:AuthResponse ) {
  this.currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
}

  logout() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.tokenKey);
      }
    } catch (e) {
      console.warn('localStorage.removeItem failed:', e);
    }
    this.token = null;
    this.userSubject.next(null);

    if (this.router.url !== '/login') {
    this.router.navigate(['/login']);
  }
  }

 /* signOutGuest() {
  const user = this.currentUser;
  console.log('Signing out guest user:', user);
  if (user?.role === 'guest' && user._id) {
    this.http.delete(`${this.apiUrl}/guest/${user._id}`).subscribe({
      next: () => this.logout(),
      error: err => {
        console.error('Failed to sign out guest', err);
        this.logout(); // fallback to clean logout even if backend fails
      }
    });
  } else {
    this.logout();
  }
}*/
signOut() {
  const user = this.currentUser;

  if (!user || !user.role || !user._id) {
    console.warn('User is missing or invalid:', user);
    this.logout(); // fallback
    return;
  }

  const endpoint = user.role === 'guest'
    ? `${this.apiUrl}/guest/${user._id}`
    : `${this.apiUrl}/admin/${user._id}`;

  console.log('DELETE endpoint:', endpoint);

  this.http.delete(endpoint).subscribe({
    next: () => this.logout(),
    error: err => {
      console.error('Sign out failed:', err);
      this.logout(); // fallback
    }
  });
}
  private setSession(auth: AuthResponse) {
    if ((auth as any).id && !(auth as any)._id) {
      (auth as any)._id = (auth as any).id;
    }
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(this.tokenKey, auth.token);
        }
      } catch (e) {
        console.warn('localStorage.setItem failed:', e);
      }

      this.token = auth.token;
      this.userSubject.next(auth);
  }

  private validateToken(token: string): Observable<any> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/validate`, { token }).pipe(
    tap(user => {
      this.token = token;
      this.userSubject.next(user);
    }),
    catchError(() => {
      this.logout(); 
      return of(null);
    })
  );
}
  getAdminData(): Observable<any> {
  return this.http.get('http://localhost:8080/api/auth/admin-data');
}
getAllAdmins(): Observable<{ _id: string; username: string }[]> {
  return this.http.get<{ _id: string; username: string }[]>(`${this.apiUrl}/all-admins`);
}
}