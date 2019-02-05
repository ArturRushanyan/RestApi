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
        // console.log('+_+ res =', res);
        if (res[0].title === '') {
          console.log('have no item');
          this._router.navigateByUrl('/item');
          console.log('+_+ this.shoppingItemArray =', res[0].quantity);
        } else {
          console.log('+_+ res in shopping.component =', res);
          this.shoppingItemsArray = res;
        }
      }
    )
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
    for(let i = 0; i <=this.shoppingItemsArray.length; i++) {
      if (this.shoppingItemsArray[i].title === item.title && this.shoppingItemsArray[i].type === item.type) {
        this.shoppingItemsArray.splice(i,1);
      }
    }
  }



}
