import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent {
  formFields = [
    {
      name: 'firstName',
      label: 'Vorname',
      type: 'text',
      error: 'Vorname ist erforderlich.',
    },
    {
      name: 'lastName',
      label: 'Nachname',
      type: 'text',
      error: 'Nachname ist erforderlich.',
    },
    {
      name: 'email',
      label: 'E-Mail',
      type: 'email',
      error: 'Gültige E-Mail ist erforderlich.',
    },
    {
      name: 'phone',
      label: 'Handynummer',
      type: 'tel',
      error: '',
    },
    {
      name: 'age',
      label: 'Alter',
      type: 'number',
      error: 'Mindestalter ist 18 Jahre. Höchstens 35.',
    },
    {
      name: 'identity',
      label: 'Ich bin',
      type: 'select',
      error: 'Bitte Identität wählen.',
      options: [
        { label: 'Frau', value: 'female' },
        { label: 'Mann', value: 'male' },
        { label: 'Divers', value: 'diverse' },
      ],
    },
    {
      name: 'lookingFor',
      label: 'Ich suche',
      type: 'select',
      error: 'Bitte Gesuch wählen.',
      options: [
        { label: 'Frau', value: 'female' },
        { label: 'Mann', value: 'male' },
        { label: 'Divers', value: 'diverse' },
      ],
    },
    {
      name: 'password',
      label: 'Passwort',
      type: 'password',
      autocomplete: 'new-password',
      error: 'Passwort muss mindestens 6 Zeichen haben.',
    },
    {
      name: 'confirmPassword',
      label: 'Passwort bestätigen',
      type: 'password',
      autocomplete: 'new-password',
      error: 'Bitte Passwort bestätigen.',
    },
  ];

  registerForm!: FormGroup;
  notMatching: boolean = false;
  addedLanguages: string[] = [];

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public userService: UserService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        age: [
          '',
          [Validators.required, Validators.min(18), Validators.max(35)],
        ],
        identity: ['', Validators.required],
        lookingFor: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        consentContactSharing: [false, Validators.requiredTrue],
      },
      {
        validators: this.matchPasswords,
      }
    );
  }

  getRegisterForm() {
    return;
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('password');
    const confirm = group.get('confirmPassword');

    if (!password || !confirm) return null;

    const error =
      password.value !== confirm.value ? { notMatching: true } : null;

    confirm.setErrors(error);
    return error;
  }

  isInvalid(field: string) {
    const control = this.registerForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      await this.auth.register(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      setTimeout(() => {
        console.log(this.auth.registerSuccess);
      }, 1);

      if (this.auth.registerSuccess) {
        await this.userService.registerUserInStorage(this.registerForm.value);
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
