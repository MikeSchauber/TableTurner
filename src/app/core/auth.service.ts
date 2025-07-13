import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { RegisterUser } from '../interfaces/register-user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerSuccess!: boolean;

  constructor(private auth: Auth, private db: Firestore) {}

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

  async registerUserInStorage(registerForm: RegisterUser) {
    const { consentContactSharing, confirmPassword, ...userData } =
      registerForm;
    await addDoc(collection(this.db, 'user'), userData);
  }
}
