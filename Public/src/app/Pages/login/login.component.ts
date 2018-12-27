import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginUserData = {}
  public loading = false;
  constructor(private _authService: AuthService,
              private _router: Router) { }

  loginUser() {
    this.loading = true;
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userRole', JSON.stringify(res.userRole));
        localStorage.setItem('userEmail', res.userEmail);
        this._router.navigate(['/item']);
      },
      err =>  {
        console.log(err),
        this.loading = false;
      }
    )
  }

}
