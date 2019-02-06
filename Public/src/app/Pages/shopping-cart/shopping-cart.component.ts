import { Component, OnInit } from '@angular/core';
import { PassingDataService } from '../../Services/passing_data_service';
import { ShoppingCart } from '../../Interfaces/ShoppingCart';
import { HelpService } from '../../Services/help.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingItemsArray: ShoppingCart[];

  constructor(private _passigData: PassingDataService,
              private _router: Router) { }
  

  ngOnInit() {
    this._passigData.getBuyingItem().subscribe(
      res => {
        if (res[0].title === '') {
          console.log('have no item');
          this._router.navigateByUrl('/item');
        } else {
          this.shoppingItemsArray = res;
        }
      }
    )
    this.isSameItems();
  }

  inputNewQuantity(itemid, newQuantity) {
    for(let i = 0; i < this.shoppingItemsArray.length; i++) {
      if (itemid === this.shoppingItemsArray[i].id) {
        this.shoppingItemsArray[i].quantity = newQuantity.target.value;
        console.log('+_+ log =', this.shoppingItemsArray[i]);
      }
    };
  }

  delete(item) {
    for(let i = 0; i <= this.shoppingItemsArray.length; i++) {
      if (this.shoppingItemsArray[i].title === item.title && this.shoppingItemsArray[i].type === item.type) {
        this.shoppingItemsArray.splice(i,1);
      }
    }
  }

  isSameItems() {
    for(let i = 0; i < this.shoppingItemsArray.length; i++) {
      for(let j = i + 1; j < this.shoppingItemsArray.length; j++) {
        if (this.shoppingItemsArray[i].title === this.shoppingItemsArray[j].title && this.shoppingItemsArray[i].type === this.shoppingItemsArray[j].type) {
          console.log('+_+_+ log');
          console.log('+_+_+_+ this.shoppingItemsArray[i].quantity =', this.shoppingItemsArray[i].quantity);
          this.shoppingItemsArray[i].quantity = parseInt(this.shoppingItemsArray[i].quantity) + parseInt(this.shoppingItemsArray[j].quantity);
          this.shoppingItemsArray.splice(j,1);
          console.log('+_+_+_+_+ after this.shoppingItemsArray[i].quantity =', this.shoppingItemsArray[i].quantity);
        }
      }
    }
  }
}
