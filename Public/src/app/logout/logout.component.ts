import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _router: Router,
              private _cookieService: CookieService) { }

  ngOnInit() {
    this._cookieService.deleteAll();
    this._router.navigate(['/item']);
    this._authService.logoutUser()
    .subscribe(
      res => {
        console.log(res),
        localStorage.clear();
      },
      err => console.log(err)
    )
  }



}
