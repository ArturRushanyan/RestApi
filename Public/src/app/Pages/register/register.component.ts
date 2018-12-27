import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {}
  public loading = false;
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.loading = true;
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token);
        this._router.navigate(['/item']);
      },
      err => {
        console.log(err), 
        this.loading = false;
      } 
    )
  }
}
