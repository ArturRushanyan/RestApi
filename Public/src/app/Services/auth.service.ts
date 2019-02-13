import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../Interfaces/User'
import { UserLogin } from '../Interfaces/userLogin'
import { UserRegister } from '../Interfaces/userRegister'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  private _baseUrl = 'http://localhost:3000/authentication/'

  public registerUser(user: UserRegister): Observable<User> {
    return this.http.post<User>(this._baseUrl + 'signup', user)
  }

  public loginUser(user: UserLogin): Observable<User> {
    return this.http.post<User>(this._baseUrl + 'login', user)
  }

}
