import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addUserData = {}
  constructor(private _event: EventService,
    private _router: Router,
    private _cookieService: CookieService) { }

  ngOnInit() :void {
    const _token = this._event.getToken();
    this._cookieService.set('token', _token);
  }

  addData() {
    this._event.addItem(this.addUserData)
      .subscribe(
        res => {
          console.log(res);
          this._cookieService.get('token');
          localStorage.setItem('token', res.token);
          this._router.navigate(['/item']);
        },
        err => console.log(err)
      )
  }

}
