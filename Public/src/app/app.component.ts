import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sweets';

  searchingData = {};  
  resSearchingData = {};
  constructor(private _authService: AuthService, 
              private _eventService: EventService,
              private _router: Router) { }

  ngOnInit() {
  }

  searchingItem() {
    this._eventService.searchItem(this.searchingData)
    .subscribe(
      res => {
        this.resSearchingData = res,
        this._router.navigate(['/search'])
      },
      err => console.log(err),
    )  }

}
