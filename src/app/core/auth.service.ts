import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerSuccess!: boolean;

  constructor(private auth: Auth) {}

  async register(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.registerSuccess = true;
      })
      .catch((error) => {
        this.registerSuccess = false;
        console.error(error);
      });
  }
}
