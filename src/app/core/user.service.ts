import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { RegisterUser } from '../interfaces/register-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore) {}

  async registerUserInStorage(registerForm: RegisterUser) {
    const { consentContactSharing, confirmPassword, ...userData } =
      registerForm;
    await addDoc(collection(this.db, 'user'), userData);
  }
}
