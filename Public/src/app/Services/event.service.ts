import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../Interfaces/Item';

@Injectable()
export class EventService {

  private _BuyUrl = 'http://localhost:3000/api/v1/buy';
  private _ItemUrl = 'http://localhost:3000/api/v1/item';
  private _searchUrl = 'http://localhost:3000/search/';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getItems(){
    return this.http.get<Item>(this._ItemUrl);
  }

  addItem(item: Item, userEmail: string): Observable<Item>  {
    return this.http.post<Item>(this._ItemUrl, {item: item, email: userEmail});
  }

  deleteItem(deleteingItem: Item, userEmail: string): Observable<string> {
    console.log('+_+_+ deletingItem._id =', deleteingItem._id);
    return this.http.request<string>('delete', `${this._ItemUrl}/${deleteingItem._id}`, { body: { email: userEmail } });
  }

  searchItem(searchItem: string){
    return this.http.get<any>(`${this._searchUrl}/${searchItem}`);
  }

  updateItem(updatingItem: Item, userEmail: string): Observable<string> {
    return this.http.put<string>(`${this._ItemUrl}/${updatingItem._id}`, {item: updatingItem, email: userEmail});
  }

  buyItem(userEmail: string, _id: string, itemCount: number, itemPrice: number, buyQuantity: number, mustPay: string): Observable<string> {
    console.log('+_+ log in event.service buyItem Func');
    return this.http.post<string>(`${this._BuyUrl}`, {
      email: userEmail,
      id: _id,
      ItemCount: itemCount,
      ItemPrice: itemPrice,
      buyQuantity: buyQuantity,
      mustPay: mustPay,
    });
  }

}
