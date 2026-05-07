import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Auth } from '../../services/auth';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {

  displayName = signal(
    localStorage.getItem('displayName') || ''
  );

  monthlyGoal = signal(
    Number(localStorage.getItem('monthlyGoal') || 0)
  );

  constructor(public authService: Auth) {}

  saveProfile() {
    localStorage.setItem(
      'displayName',
      this.displayName()
    );

    localStorage.setItem(
      'monthlyGoal',
      this.monthlyGoal().toString()
    );

    alert('Profile saved');
  }

}