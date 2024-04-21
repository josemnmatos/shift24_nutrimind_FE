import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiEndpoint = environment.API_ENDPOINT;
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post(`${this.apiEndpoint}/login/`, {
      email: email,
      password: password,
    });
  }

  register(email: string, password: string) {
    return this.httpClient
      .post(`${this.apiEndpoint}/api/insert_user/`, {
        uuid: this.getUUID(),
        firstName: '',
        lastName: '',
        email: email,
        password: password,
        height: 180,
        weight: 80,
        age: 25,
        gender: 'M',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  logout() {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: this.getToken(),
      }),
    };

    return this.httpClient
      .get(`${this.apiEndpoint}/logout/`, requestOptions)
      .subscribe((data) => {
        localStorage.removeItem('token');
        console.log(data);
      });
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getUUID() {
    return uuidv4();
  }
}
