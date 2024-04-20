import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  onSignUp() {
    this.auth.register(this.email, this.password);
  }

  onSignIn() {
    this.auth.login(this.email, this.password);
  }
}
