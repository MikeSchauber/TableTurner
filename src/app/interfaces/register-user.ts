export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // optional, da kein Validator
  age: number;
  identity: 'female' | 'male' | 'diverse';
  lookingFor: 'female' | 'male' | 'diverse';
  password: string;
  confirmPassword: string;
  consentContactSharing: boolean;
}
