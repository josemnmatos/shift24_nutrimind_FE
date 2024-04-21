import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormsModule, MessagesModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: Message[] = [];

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onSignUp() {
    this.auth.register(this.email, this.password);
  }

  onSignIn() {
    this.auth.login(this.email, this.password).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = [{severity: 'error', summary: 'Bad Credentials', detail: 'please try again'}];
        setTimeout(() => {
          this.errorMessage = [];
        }, 4000);
        return throwError(error);
      })
    ).subscribe((data) => {
      console.log(data);
      localStorage.setItem('token', (data as any).token);
      this.router.navigate(['home']);
    });
  }
}
