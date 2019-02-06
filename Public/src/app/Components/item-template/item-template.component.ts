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
  public itemForShoppingCart: ShoppingCart = {
    type: '',
    title: '',
    quantity: 0,
    price: 0,
    count: 0,
    id: '',
  };

  public itemData: Item;
  private searchItemName: string;
  public buyingItemQuantity: number = 1;
  public userMustPay: number;

  constructor(private _eventService: EventService,
              private _router: Router,
              private _HelpService: HelpService,
              private _PassingDataService: PassingDataService) { }

  ngOnInit() {
    this.userMustPay = parseInt(localStorage.getItem('mustPay'));
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

  buy(): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login');
    } else {
      this.userMustPay += (this.itemData.price * this.buyingItemQuantity);
      localStorage.setItem('mustPay', this.userMustPay.toString());
      this._eventService.buyItem(localStorage.getItem('userEmail'), this.itemData._id, 
                                  this.itemData.count, this.buyingItemQuantity, this.userMustPay.toString()).
        subscribe(
          res => {
            console.log('+_+ =', res);
            console.log('+_+ local storage =', localStorage.getItem('mustPay'));
            localStorage.setItem('mustPay', res);
            console.log('+_+ local stroage after seting =', localStorage.getItem('mustPay'));
            window.location.reload();
          },
          err => {
            console.log(err);
          });
    }
  }

  input(quantity) {
    this.buyingItemQuantity = quantity;
  }

  addToCart(): void {
    if (!localStorage.getItem('token')) {
      this._router.navigate(['/login'])
    } else {
      this.itemForShoppingCart ={
        id: this.itemData._id,
        type: this.itemData.type,
        title: this.itemData.title,
        quantity: this.buyingItemQuantity,
        price: this.itemData.price,
        count: this.itemData.count,
      }
      this._PassingDataService.setBuyingItem(this.itemForShoppingCart);
      this.itemForShoppingCart = {
        id: '',
        type: '',
        title: '',
        quantity: 0,
        price: 0,
        count: 0,
      };
      this.buyingItemQuantity = 1;
    }
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
