import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _baseUrl = 'http://localhost:3000/authentication/';
  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._baseUrl + 'signup', user);
  }

  loginUser(user) {
    return this.http.post<any>(this._baseUrl + 'login', user);
  }

  logoutUser() {
    return this.http.get<any>(this._baseUrl + 'logout');
    
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

}
