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

  public autocompleteArray: string[] = []

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
  private _SubjectForAutocomplete = new BehaviorSubject<string[]>(this.autocompleteArray)


  public setUpdateingItem(item: Item): void {
    this._updateItemSubject.next(item)
  }

  public getUpdatingItem(): Item {
    return this._updateItemSubject.value
  }

  public setSearchingItemName(searchingName: string): void {
    this._searchingItemSubject.next(searchingName)
  }

  public getSearchingItemName(): BehaviorSubject<string> {
    return this._searchingItemSubject
  }

  public setBuyingItem(item: ShoppingCart): void {
    console.log('+_+ log in setBuyingItem = ', item)
    this.productsForShoppingCart.push(item)
    this._SubjectForShoppingCart.next(this.productsForShoppingCart)
  }

  public getBuyingItem(): BehaviorSubject<ShoppingCart[]> {
    return this._SubjectForShoppingCart
  }

  public setAutocompleteNames(title: string): void {
    this.autocompleteArray.push(title)
    this._SubjectForAutocomplete.next(this.autocompleteArray)
  }

  public getAutocimpleteNames(): BehaviorSubject<string[]> {
    return this._SubjectForAutocomplete
  }

}
