import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Item } from '../Interfaces/Item';
@Injectable()
export class PassingDataService {

  public emptyItem: Item = {
    _id: 0,
    type: '',
    title: '',
    price: 0,
    barcode: '',
    count: 1,
  };

  public emptyString: string;

  constructor() { }

  private updateItemSubject = new BehaviorSubject<Item>(this.emptyItem);
  private searchingItemSubject = new BehaviorSubject<string>(this.emptyString);

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

}
