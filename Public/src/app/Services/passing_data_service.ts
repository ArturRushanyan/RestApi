import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Item } from '../Interfaces/Item'
import { ShoppingCart } from '../Interfaces/ShoppingCart'

@Injectable()
export class PassingDataService {

  public emptyEditItem: Item = {
    _id: '',
    type: '',
    title: '',
    price: 0,
    barcode: '',
    count: 1,
  }

  public emptyStringForSearch: string

  public Autocomplete: string[] = []

  public productsForShoppingCart: ShoppingCart[] = []

  constructor() { }

  private _emptyItem: ShoppingCart[] = [{
    type: '',
    title: '',
    quantity: 0,
    price: 0,
    count: 0,
    id: '',
  }]

  private _updateItemSubject = new BehaviorSubject<Item>(this.emptyEditItem)
  private _searchingItemSubject = new BehaviorSubject<string>(this.emptyStringForSearch)
  private _SubjectForShoppingCart = new BehaviorSubject<ShoppingCart[]>(this._emptyItem)
  private _SubjectForAutocomplete = new BehaviorSubject<string[]>(this.Autocomplete)

  public setUpdateingItem(item: Item): void {
    this._updateItemSubject.next(item)
  }

  public getUpdatingItem(): Item {
    return this._updateItemSubject.value
  }

  public setSearchIngItem(itemName: string): void {
    this._searchingItemSubject.next(itemName)
  }

  public getSearchingItem(): BehaviorSubject<string> {
    return this._searchingItemSubject
  }

  public setBuyingItem(item: ShoppingCart): void {
    this.productsForShoppingCart.push(item)
    this._SubjectForShoppingCart.next(this.productsForShoppingCart)
  }

  public getBuyingItem(): BehaviorSubject<ShoppingCart[]> {
    return this._SubjectForShoppingCart
  }

  public setAutocomplete(titles: string[]): void {
    titles.forEach(element => {
      this.Autocomplete.push(element)
      this._SubjectForAutocomplete.next(this.Autocomplete)
    })
  }

  public getAutocomplete(): BehaviorSubject<string[]> {
    return this._SubjectForAutocomplete
  }

}
