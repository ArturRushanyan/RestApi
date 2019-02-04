import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { HelpService } from '../../Services/help.service'; 
import { Item } from '../../Interfaces/Item';
import { ShoppingCart } from '../../Interfaces/ShoppingCart';
import { PassingDataService } from '../../Services/passing_data_service';

@Component({
  selector: 'app-item-template',
  templateUrl: './item-template.component.html',
  styleUrls: ['./item-template.component.css']
})
export class ItemTemplateComponent implements OnInit {

  private itemFromRes: Item;
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
  private searchItemName: string;

  constructor(private _eventService: EventService,
              private _router: Router,
              private _HelpService: HelpService,
              private _PassingDataService: PassingDataService) { }

  ngOnInit() {
    if (this._router.url !=='/search') {
      this._eventService.getItems()
      .subscribe(
        res => {
          this.itemFromRes = res;
          console.log(this.itemFromRes)
        },
        err => console.log(err),  
      )
    } else {
      this._PassingDataService.getSearchingItemName()
      .subscribe(val => {
        if (!val && this._router.url ==='/search') {
          this._router.navigateByUrl('/item');
        } else if (val && this._router.url ==='/search') {
          this.searchItemName = val;
          this.searchingItem();
        }
      });
    }
  }

  getItemData(item): void {
    this.itemData = item;
  }

  buy(item): void {
    if (!this._HelpService.loggedIn()) {
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
    this._PassingDataService.setBuyingItem(this.itemForShoppingCart);
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
    this._HelpService.deleteItem(this.itemData);
    window.location.reload();
  }

  editItem(editItem: Item): void {
    this._HelpService.editItem(editItem);
  }

  isAdmin(): boolean {
    return !!this._HelpService.isAdmin();
  }

  searchingItem(): void {
    if ( this.searchItemName.length <= 3) {
      alert('Small name for searching');
    } else {
      this._eventService.searchItem(this.searchItemName).subscribe(
        res => {
          if (res.length <= 0) {
            alert("Don't found");
            this._router.navigateByUrl('/item');
          } else {
            this.itemFromRes = res;
            console.log('log ', this.itemFromRes);
          }
        },
        err => console.log(err),
      );
    }
    // this.http.get(`http://localhost:3000/search/${this.name}`)
  }

}
