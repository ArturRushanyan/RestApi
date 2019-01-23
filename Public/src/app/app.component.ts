import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { EventService } from './Services/event.service';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sweets';

  public searchingItemName: string; 

  constructor(private _authService: AuthService, 
              private _eventService: EventService,
              private _cookieService: CookieService) { }

  logoutUser() {
    this._cookieService.deleteAll();
    localStorage.clear();
  }

  

  searchingItem() {
    console.log(this.searchingItemName);
  }

}
