import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { HelpService } from '../../Services/help.service'; 
import { Item } from '../../Interfaces/Item';
import { ShoppingCart } from '../../Interfaces/ShoppingCart';
import { PassingDataService } from '../../Services/passing_data_service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  private itemFromRes:Item;
  private itemForShoppingCart: ShoppingCart = {
    type: '',
    title: '',
    quantity: 0,
    price: 0,
    count: 0,
    id: '',
  };
  public BuyingItemQuantity: number = 1;
  private itemData: Item;
  
  constructor(private _eventService: EventService,
              private _helpService: HelpService,
              private _router: Router,
              private _passingData: PassingDataService) { }

  ngOnInit() {
    this._eventService.getItems()
    .subscribe(
      res => {
        this.itemFromRes = res;
        console.log(this.itemFromRes)
      },
      err => console.log(err),  
    )
  }

  getItemData(item): void {
    this.itemData = item;
  }

  buy(item): void {
    if (!this._helpService.loggedIn()) {
      this._router.navigateByUrl('/login');
    } else {
      this._eventService.buyItem(localStorage.getItem('userEmail'), item._id, item.count, item.price, this.BuyingItemQuantity).
        subscribe(
          res => {
            console.log('+_+ =', res);
          },
          err => {
            console.log('+_+ log in buy err case');
            console.log(err);
          });
    }
  }

  addToCart(): void {
    this.itemForShoppingCart.id = this.itemData._id;
    this.itemForShoppingCart.type = this.itemData.type;
    this.itemForShoppingCart.title = this.itemData.title;
    this.itemForShoppingCart.count = this.itemData.count;
    this.itemForShoppingCart.quantity = this.BuyingItemQuantity;
    this.itemForShoppingCart.price = this.itemData.price;
    this._passingData.setBuyingItem(this.itemForShoppingCart);
    this.itemForShoppingCart = {
      type: '',
      title: '',
      quantity: 0,
      price: 0,
      count: 0,
      id: '',
    };
  }

  deleteItem(): void {
    this._helpService.deleteItem(this.itemData);
    window.location.reload();
  }

  editItem(editItem: Item): void {
    this._helpService.editItem(editItem);
  }

  isAdmin(): boolean {
    return !!this._helpService.isAdmin();
  }
  
}
