import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../Interfaces/Item';
import { ShoppingCart } from '../Interfaces/ShoppingCart';

@Injectable()
export class PassingDataService {

  public emptyEditItem: Item = {
    _id: '',
    type: '',
    title: '',
    price: 0,
    barcode: '',
    count: 1,
  };

  public emptyStringForSearch: string;

  productsForShoppingCart: ShoppingCart[] = [];

  emptyItem: ShoppingCart[] = [{
    type: '',
    title: '',
    quantity: 0,
    price: 0,
    count: 0,
    id: '',
  }];

  constructor() { }

  private updateItemSubject = new BehaviorSubject<Item>(this.emptyEditItem);
  private searchingItemSubject = new BehaviorSubject<string>(this.emptyStringForSearch);
  private SubjectForShoppingCart = new BehaviorSubject<ShoppingCart[]>(this.emptyItem)

  setUpdateingItem(item: Item): void {
    this.updateItemSubject.next(item);
  }

  getUpdatingItem(): Item {
    return this.updateItemSubject.value;
  }

  setSearchingItemName(searchingName: string): void {
    this.searchingItemSubject.next(searchingName);
  } 

  getSearchingItemName(): BehaviorSubject<string> {
    return this.searchingItemSubject;
  }

  setBuyingItem(item: ShoppingCart): void {
    this.productsForShoppingCart.push(item);
    this.SubjectForShoppingCart.next(this.productsForShoppingCart);
  }

  getBuyingItem(): BehaviorSubject<ShoppingCart[]> {
    return this.SubjectForShoppingCart;
  }

}
