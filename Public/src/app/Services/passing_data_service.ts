import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Item } from '../Interfaces/Item';
import { Router } from '@angular/router';
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

  constructor(private _router: Router) { }

  private updateItemSubject = new Rx.BehaviorSubject<Item>(this.emptyItem);
  private searchingItemSubject = new Rx.BehaviorSubject<string>(this.emptyString);

  setUpdateingItem(item: Item): void {
    this.updateItemSubject.next(item);
  }

  getUpdatingItem(): Item {
    return this.updateItemSubject.value;
  }

  setSearchingItemName(searchingName: string): void {
    this.searchingItemSubject.next(searchingName);
  } 

  getSearchingItemName() {
    return this.searchingItemSubject;
  }

}
