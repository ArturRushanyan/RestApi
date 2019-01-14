import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  private _ItemUrl = 'http://localhost:3000/api/v1/item';

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any>(this._ItemUrl);
  }

  addItem(Item, Email) {
    return this.http.post<any>(this._ItemUrl, {item: Item, email: Email});
  }

  deleteItem(id) {
    return this.http.delete<any>(`${this._ItemUrl}/${id}`);
  }
}
