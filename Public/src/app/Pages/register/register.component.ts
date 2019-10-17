import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserRegister } from '../../Interfaces/userRegister'
import { AuthService } from '../../Services/auth.service'

@Component({
  selector: 'sweetbox-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUserData: UserRegister = {
    email: '',
    password: '',
    confirmPassword: '',
  }
  constructor(
    private _auth: AuthService,
    private _router: Router
    ) { }

  public ngOnInit(): void {
  }

  public registerUser(): void {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/item'])
      },
      err => console.error(err),
    )
  }
}
