import { Injectable, signal } from '@angular/core';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();

  currentUser = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.currentUser.set(user);
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }
}