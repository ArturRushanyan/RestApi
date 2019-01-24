import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Item } from '../Interfaces/Item';

@Injectable()
export class UpdateItemService {

  public emptyItem: Item = {
    _id: 0,
    type: '',
    title: '',
    price: 0,
    barcode: '',
    count: 1,
  };

  constructor() { }

  public subject = new Rx.BehaviorSubject<Item>(this.emptyItem);

  setItem(item: Item): void {
    this.subject.next(item);
  }

  getItem() {
    return this.subject.value;
  }

}
