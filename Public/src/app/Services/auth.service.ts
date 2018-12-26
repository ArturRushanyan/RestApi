import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _baseUrl = 'http://localhost:3000/authentication/';
  private user: any;
  private token: string;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._baseUrl + 'signup', user);
  }

  loginUser(user) {
    return this.http.post<any>(this._baseUrl + 'login', user);
  }

  logoutUser() {
    return this.http.get<any>(this._baseUrl + 'logout');
  }

  isAdmin(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.user = JSON.parse(localStorage.getItem('userRole'));
      if (this.user === 'admin') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
