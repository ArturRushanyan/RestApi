import { Component, OnInit, Input } from '@angular/core';
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

  @Input() ComingItems: Item;

  private searchItemName: string;
  public buyingItemQuantity: number = 1;
  public showModal: boolean = false;
  public userMustPay: number = 0;
  public buyingItem: ShoppingCart = {
    id: '',
    type: '',
    title: '',
    price: 0,
    count: 0,
    quantity: 0,
  };

  constructor(private _eventService: EventService,
              private _router: Router,
              private _HelpService: HelpService,
              private _PassingDataService: PassingDataService) { }

  ngOnInit() {
  }

  addToCart(item: Item) {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login');
    } else {
      this.showModal = false;
      this.buyingItem = {
        id: item._id,
        type: item.type,
        title: item.title,
        price: item.price,
        count: item.count,
        quantity: this.buyingItemQuantity,
      };
      this._PassingDataService.setBuyingItem(this.buyingItem);
    }
  };

  buy(item): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login');
    } else {
      this.showModal = false;
      this.buyingItem = {
        id: item._id,
        type: item.type,
        title: item.title,
        price: item.price,
        count: item.count,
        quantity: this.buyingItemQuantity,
      };
      this.userMustPay = parseInt(localStorage.getItem('mustPay'));
      this.userMustPay += (this.buyingItem.price * this.buyingItem.quantity);
      localStorage.setItem('mustPay', this.userMustPay.toString());
      console.log('+_+_+ mustpay in buy func =', this.userMustPay);
      
    }
  }

  // buy(): void {
  //   if (!this._HelpService.loggedIn()) {
  //     this._router.navigateByUrl('/login');
  //   } else {
  //     this.userMustPay += (this.itemData.price * this.buyingItemQuantity);
  //     localStorage.setItem('mustPay', this.userMustPay.toString());
  //     this._eventService.buyItem(localStorage.getItem('userEmail'), this.itemData._id,
  //                                 this.itemData.count, this.buyingItemQuantity, this.userMustPay.toString()).
  //       subscribe(
  //         res => {
  //           console.log('+_+ =', res);
  //           console.log('+_+ local storage =', localStorage.getItem('mustPay'));
  //           localStorage.setItem('mustPay', res);
  //           console.log('+_+ local stroage after seting =', localStorage.getItem('mustPay'));
  //           window.location.reload();
  //         },
  //         err => {
  //           console.log(err);
  //         });
  //   }
  // }

  deleteItem(item): void {
    this.showModal = false;
    console.log('+_+ log in deleteItem func item =', item);
    this._HelpService.deleteItem(item);
    // window.location.reload();
  }

  editItem(editItem: Item): void {
    this._HelpService.editItem(editItem);
  }

  isAdmin(): boolean {
    return !!this._HelpService.isAdmin();
  }

  // searchingItem(): void {
  //   if ( this.searchItemName.length <= 3) {
  //     alert('Small name for searching');
  //   } else {
  //     this._eventService.searchItem(this.searchItemName).subscribe(
  //       res => {
  //         if (res.length <= 0) {
  //           alert("Don't found");
  //           this._router.navigateByUrl('/item');
  //         } else {
  //           this.ComingItems = res;
  //           console.log('log ', this.ComingItems);
  //         }
  //       },
  //       err => console.log(err),
  //     );
  //   }
  //   // this.http.get(`http://localhost:3000/search/${this.name}`)
  // }

}
