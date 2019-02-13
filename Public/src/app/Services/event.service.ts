import { HttpClient } from '@angular/common/http'
import { Injectable, ɵConsole } from '@angular/core'
import { Observable } from 'rxjs'
import { Item } from '../Interfaces/Item'
import { ShoppingCart } from '../Interfaces/ShoppingCart'
import { User } from '../Interfaces/User'

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  private _BuyUrl = 'http://localhost:3000/api/v1/buy'
  private _BuyUrlAll = 'http://localhost:3000/api/v1/buy/buyAll'
  private _ItemUrl = 'http://localhost:3000/api/v1/item'
  private _searchUrl = 'http://localhost:3000/search/'
  private _getAllUsers = 'http://localhost:3000/api/v1/user'
  private _resetDebt = 'http://localhost:3000/api/v1/reset'


  public getToken(): string {
    return localStorage.getItem('token')
  }

  public getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this._ItemUrl)
  }

  public addItem(item: Item, token: string): Observable<Item>  {
    console.log('+_+_+ log in event.service')
    return this.http.post<Item>(this._ItemUrl, {item: item, token: token})
  }

  public deleteItem(deleteingItem: Item, token: string): Observable<string> {
    console.log('+_+_+ deletingItem._id =', deleteingItem._id)
    return this.http.request<string>('delete', `${this._ItemUrl}/${deleteingItem._id}`, { body: { token: token } })
  }

  public searchItem(searchItem: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this._searchUrl}/${searchItem}`)
  }

  public updateItem(updatingItem: Item, token: string): Observable<string> {
    return this.http.put<string>(`${this._ItemUrl}/${updatingItem._id}`, { item: updatingItem, token: token })
  }

  public buyItem(token: string, userEmail: string,
    _id: string, itemCount: number, mustPay: string, buyQuantity: number): Observable<string> {
    console.log('+_+ log in event.service buyItem Func')
    return this.http.post<string>(`${this._BuyUrl}`, {
      token: token,
      email: userEmail,
      id: _id,
      ItemCount: itemCount,
      buyQuantity: buyQuantity,
      mustPay: mustPay,
    })
  }

  public buyAllItems(itemsArray: Array<ShoppingCart>, mustPay: number,
    userEmail: string, token: string): Observable<string> {
    return this.http.post<string>(`${this._BuyUrlAll}`, { itemsArray: itemsArray, mustPay: mustPay,
      email: userEmail, token: token })
  }

  public getAllUsers(): Observable<User> {
    return this.http.get<User>(`${this._getAllUsers}`)
  }

  public resetUserDebt(user: User): Observable<string> {
    return this.http.post<string>(`${this._resetDebt}`, { user: user })
  }
}
