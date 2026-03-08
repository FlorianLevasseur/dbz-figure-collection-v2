import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  error = signal('');
  loading = signal(false);

  submit() {
    if (this.loading()) return;
    this.error.set('');
    this.loading.set(true);
    this.auth.register(this.username, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/catalogue']),
      error: (err) => {
        this.error.set(err.error?.error || 'Erreur lors de l\'inscription');
        this.loading.set(false);
      }
    });
  }
}
