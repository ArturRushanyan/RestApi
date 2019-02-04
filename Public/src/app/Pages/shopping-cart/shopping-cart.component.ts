import { Component, OnInit } from '@angular/core';
import { PassingDataService } from '../../Services/passing_data_service';
import { ShoppingCart } from '../../Interfaces/ShoppingCart';
import { HelpService } from '../../Services/help.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingItemsArray: ShoppingCart[];

  constructor(private _passigData: PassingDataService) { }
  

  ngOnInit() {
    this._passigData.getBuyingItem().subscribe(
      res => {
        // console.log('+_+ res =', res);
        if (res[0].title === '') {
          console.log('have no item');
        } else {
          console.log('+_+ res in shopping.component =', res);
          this.shoppingItemsArray = res;
        }
      }
    )
  }



}
