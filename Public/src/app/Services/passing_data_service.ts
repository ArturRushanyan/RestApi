import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AddToCartQuantity } from '../Interfaces/addToCartQuantity'
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
    image: null,
  }

  public emptyStringForSearch: string

  public Autocomplete: string[] = []

  public productsForShoppingCart: ShoppingCart[] = []

  public detailView: Item

  constructor() { }

  private _emptyItem: ShoppingCart[] = [{
    type: '',
    title: '',
    quantity: 0,
    price: 0,
    count: 0,
    id: '',
    image: null,
  }]

  private _emptyArrayForAddToCartQuantity: AddToCartQuantity[] = []

  private _updateItemSubject = new BehaviorSubject<Item>(this.emptyEditItem)
  private _searchingItemSubject = new BehaviorSubject<string>(this.emptyStringForSearch)
  private _SubjectForShoppingCart = new BehaviorSubject<ShoppingCart[]>(this._emptyItem)
  private _SubjectForAutocomplete = new BehaviorSubject<string[]>(this.Autocomplete)
  private _SubjectForDetailView = new BehaviorSubject<Item>(this.detailView)
  private _SubjectForAddToCartItemQuantity =
    new BehaviorSubject<AddToCartQuantity[]>(this._emptyArrayForAddToCartQuantity)

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

  public setItemForDetailView(item: Item): void {
    this._SubjectForDetailView.next(item)
  }

  public getItemForDetailView(): BehaviorSubject<Item> {
    return this._SubjectForDetailView
  }

  public setAddToCartItemQuantity(item: AddToCartQuantity): void {
    this._emptyArrayForAddToCartQuantity.push(item)
    this._SubjectForAddToCartItemQuantity.next(this._emptyArrayForAddToCartQuantity)
  }

  public getAddToCartItemQuantity(): BehaviorSubject<AddToCartQuantity[]> {
    return this._SubjectForAddToCartItemQuantity
  }

}
