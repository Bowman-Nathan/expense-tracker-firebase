import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Auth } from '../../services/auth';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {

  email = signal('');
  password = signal('');

  constructor(public authService: Auth) {}

  async register() {
    try {
      await this.authService.register(
        this.email(),
        this.password()
      );

      alert('Registration successful');
    }
    catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  }

  async login() {
    try {
      await this.authService.login(
        this.email(),
        this.password()
      );

      alert('Login successful');
    }
    catch (error) {
      console.error(error);
      alert('Login failed');
    }
  }

  async logout() {
    await this.authService.logout();
  }

}