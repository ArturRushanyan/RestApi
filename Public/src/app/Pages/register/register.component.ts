import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { UserRegister } from '../../Interfaces/userRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: UserRegister = {
    email: '',
    password: '',
    confirmPassword: '',
  }
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token);
        this._router.navigate(['/item']);
      },
      err => console.log(err), 
    )
  }
}
