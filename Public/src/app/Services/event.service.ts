import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  private _baseUrl = 'http://localhost:3000/api/v1/item';

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any>(this._baseUrl);
  }

  addItem(Item, Email) {
    return this.http.post<any>(this._baseUrl, {item: Item, email: Email});
  }

  deleteItem(item, userEmail) {
    return this.http.request('delete', `${this._baseUrl}/${item._id}`, { body: { email: userEmail }})
    // return this.http.(`${this._baseUrl}/${item._id}`, { } );
  }
}
