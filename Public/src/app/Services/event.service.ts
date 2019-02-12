import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Item } from '../Interfaces/Item';
import { ShoppingCart } from '../Interfaces/ShoppingCart';
import { User } from '../Interfaces/User';

@Injectable()
export class EventService {

  private _BuyUrl = 'http://localhost:3000/api/v1/buy';
  private _BuyUrlAll = 'http://localhost:3000/api/v1/buy/buyAll';
  private _ItemUrl = 'http://localhost:3000/api/v1/item';
  private _searchUrl = 'http://localhost:3000/search/';
  private _getAllUsers = 'http://localhost:3000/api/v1/user';
  private _resetDebt = 'http://localhost:3000/api/v1/reset';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getAllItems(){
    return this.http.get<Item[]>(this._ItemUrl);
  }

  addItem(item: Item, userEmail: string): Observable<Item>  {
    return this.http.post<Item>(this._ItemUrl, {item: item, email: userEmail});
  }

  deleteItem(deleteingItem: Item, userEmail: string): Observable<string> {
    console.log('+_+_+ deletingItem._id =', deleteingItem._id);
    return this.http.request<string>('delete', `${this._ItemUrl}/${deleteingItem._id}`, { body: { email: userEmail } });
  }

  searchItem(searchItem: string) {
    return this.http.get<any>(`${this._searchUrl}/${searchItem}`);
  }

  updateItem(updatingItem: Item, token: string): Observable<string> {
    return this.http.put<string>(`${this._ItemUrl}/${updatingItem._id}`, { item: updatingItem, token: token });
  }

  buyItem(token: string, userEmail: string, _id: string, itemCount: number, mustPay: string, buyQuantity: number): Observable<string> {
    console.log('+_+ log in event.service buyItem Func');
    return this.http.post<string>(`${this._BuyUrl}`, {
      token: token,
      email: userEmail,
      id: _id,
      ItemCount: itemCount,
      buyQuantity: buyQuantity,
      mustPay: mustPay,
    });
  };

  buyAllItems(itemsArray: Array<ShoppingCart>, mustPay: number, userEmail: string, token: string): Observable<string> {
    console.log('+_+_+_+ log in buyAllItems func in event.service');
    return this.http.post<string>(`${this._BuyUrlAll}`, { itemsArray: itemsArray, mustPay: mustPay, email: userEmail, token: token });
  };

  getAllUsers(): Observable<User> {
    return this.http.get<User>(`${this._getAllUsers}`);
  }

  resetUserDebt(User: User): Observable<string> {
    return this.http.post<string>(`${this._resetDebt}`, { user: User });
  }
};
