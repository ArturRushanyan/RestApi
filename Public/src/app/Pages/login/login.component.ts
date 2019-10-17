import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserLogin } from '../../Interfaces/userLogin'
import { AuthService } from '../../Services/auth.service'

@Component({
  selector: 'sweetbox-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginUserData: UserLogin = {
    email: '',
    password: ''
  }

  constructor(
    private _auth: AuthService,
    private _router: Router
    ) { }

  public ngOnInit(): void {
  }

  public loginUser(): void {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('userEmail', res.userEmail)
        localStorage.setItem('userRole', res.userRole)
        localStorage.setItem('token', res.token)
        localStorage.setItem('mustPay', res.mustPay.toString())
        this._router.navigateByUrl('/item')
        window.location.reload()
      },
      err => console.error(err),
    )
  }

}
