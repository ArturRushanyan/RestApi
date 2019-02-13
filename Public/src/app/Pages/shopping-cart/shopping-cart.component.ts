import { Component, OnInit } from '@angular/core'
import { Item } from 'src/app/Interfaces/Item'
import { ShoppingCart } from '../../Interfaces/ShoppingCart'
import { EventService } from '../../Services/event.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingItemsArray: ShoppingCart[]
  public noItem = false
  public userPay: number = parseInt(localStorage.getItem('mustPay'), 10)

  constructor(private _passigData: PassingDataService,
    private _eventService: EventService) { }

  private buyAllItem: ShoppingCart[] = []
  public ngOnInit(): void {
    this._passigData.getBuyingItem().subscribe(
      res => {
          if (res[0].title !== '') {
            this.noItem = !this.noItem
            console.log('+_+ res in shopping cart =', res)
            this.shoppingItemsArray = res
          }
      }
    )
    // this.isSameItems()
  }

  public inputNewQuantity(newQuantity: number, itemid: string): void {
    for (let i = 0; i < this.shoppingItemsArray.length; i++) {
      if (itemid === this.shoppingItemsArray[i].id) {
        this.shoppingItemsArray[i].quantity = newQuantity
        console.log('+_+ log =', this.shoppingItemsArray[i])
      }
    }
  }

  public delete(item: Item): void {
    for (let i = 0 ; i <= this.shoppingItemsArray.length; i++) {
      if (this.shoppingItemsArray[i].title === item.title && this.shoppingItemsArray[i].type === item.type) {
        this.shoppingItemsArray.splice(i, 1)
      }
    }
  }

  public isSameItems(): void {
    for (let i = 0; i < this.shoppingItemsArray.length; i++) {
      for (let j = i + 1; j < this.shoppingItemsArray.length; j++) {
        if (this.shoppingItemsArray[i].title === this.shoppingItemsArray[j].title
            && this.shoppingItemsArray[i].type === this.shoppingItemsArray[j].type) {
          // this.shoppingItemsArray[i].quantity =
            // parseInt(this.shoppingItemsArray[i].quantity) + parseInt(this.shoppingItemsArray[j].quantity)
          this.shoppingItemsArray.splice(j, 1)
        }
      }
    }
  }

  public buyAll(): void {
    for (let i = 0; i < this.shoppingItemsArray.length; i++) {
      this.userPay += (this.shoppingItemsArray[i].price * this.shoppingItemsArray[i].quantity)
    }
    localStorage.setItem('mustPay', this.userPay.toString())
    this.buyAllItem = this.shoppingItemsArray
    this._eventService.buyAllItems(this.buyAllItem, this.userPay,
      localStorage.getItem('userEmail'), localStorage.getItem('token'))
    .subscribe(
      res => {
        console.log(res)
        window.location.reload()
      },
      err => {
        console.log('+_+_+_+ log in buyAll err =>', err)
      }
    )
  }
}
