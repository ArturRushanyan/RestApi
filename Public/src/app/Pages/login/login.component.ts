import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { UserLogin } from '../../Interfaces/userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) { }

  loginUserData: UserLogin = {
    email: '',
    password: ''
  }

  ngOnInit() {
  }

  loginUser(): void {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('userEmail', res.userEmail);
        localStorage.setItem('userRole', res.userRole);
        localStorage.setItem('token', res.token);
        localStorage.setItem('mustPay', res.mustPay.toString());
        this._router.navigate(['/item']);
      },
      err => console.log(err),
    )
  }

}
