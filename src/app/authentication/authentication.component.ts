import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {NgIf, NgStyle} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";

interface Sex {
  name: string;
  code: string;
}
@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormsModule, MessagesModule, NgIf, DropdownModule, NgStyle],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent implements OnInit {

  email: string = '';
  password: string = '';
  age?: number;
  height?: number;
  weight?: number;
  sexOptions: Sex[] = [];
  selectedSex?: Sex;
  errorMessage: Message[] = [];
  successMessage: Message[] = [];
  isSigningIn: boolean = false;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.sexOptions = [
      {name: 'Male', code: 'M'},
      {name: 'Female', code: 'F'}
    ];
  }

  public onSignUp(): void {
    if (this.email && this.password && this.age && this.height && this.selectedSex?.code && this.weight) {
      this.auth.register(this.email, this.password, this.age, this.height, this.weight, this.selectedSex?.code).pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = [{severity: 'error', summary: 'Error', detail: 'user not created'}];
          return throwError(error);
        })
      ).subscribe((data) => {
        this.successMessage = [{severity: 'success', summary: 'Success', detail: 'user created'}];
        this.isSigningIn = false;
      });
    }
  }

  public onSignIn(): void {
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

  public goToSignIn(): void {
    this.isSigningIn = false;
  }

  public goToSignUp(): void {
    this.isSigningIn = true;
  }
}
