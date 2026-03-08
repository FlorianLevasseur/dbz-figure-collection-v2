import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthUser {
  id: number;
  username: string;
  role: 'USER' | 'ADMIN';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/api/auth';

  currentUser = signal<AuthUser | null>(this.loadUser());

  private loadUser(): AuthUser | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isAdmin(): boolean {
    return this.currentUser()?.role === 'ADMIN';
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ token: string; user: AuthUser }>(
      `${this.apiUrl}/register`, { username, email, password }
    ).pipe(tap(res => this.saveSession(res)));
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: AuthUser }>(
      `${this.apiUrl}/login`, { email, password }
    ).pipe(tap(res => this.saveSession(res)));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private saveSession(res: { token: string; user: AuthUser }) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }
}
