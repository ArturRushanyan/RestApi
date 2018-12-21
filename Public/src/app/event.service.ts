import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class EventService {

  private _getItemUrl = 'http://localhost:3000/api/v1/item';

  constructor(private http: HttpClient, 
              private _cookieService: CookieService) { }

  getToken() {
    return this._cookieService.get('token');
  }

  getItems() {
    return this.http.get<any>(this._getItemUrl);
  }

  addItem(Item, Email) {
    return this.http.post<any>(this._getItemUrl, {item: Item, email: Email});
  }
}
