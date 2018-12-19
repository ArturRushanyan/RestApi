import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUserData = {}
  constructor(private _authService: AuthService,
    private _router: Router) { }

  loginUser() {
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        //console.log(res);
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('user', JSON.stringify(res.user))
        this._router.navigate(['/item']);
      },
      err => console.log(err),
    )
  }

}
