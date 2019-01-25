import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../Interfaces/userLogin';
import { UserRegister } from '../Interfaces/userRegister';
import { User } from '../Interfaces/User';

@Injectable()
export class AuthService {

  private _baseUrl = 'http://localhost:3000/authentication/';
  constructor(private http: HttpClient) { }

  registerUser(user: UserRegister): Observable<User> {
    return this.http.post<User>(this._baseUrl + 'signup', user);
  }

  loginUser(user: UserLogin): Observable<User> {
    return this.http.post<User>(this._baseUrl + 'login', user);
  }

}
