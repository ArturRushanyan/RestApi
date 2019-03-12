import { Component, OnInit } from '@angular/core'
import { Item } from 'src/app/Interfaces/Item'
import { ShoppingCart } from '../../Interfaces/ShoppingCart'
import { EventService } from '../../Services/event.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'sweetbox-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingItemsArray: ShoppingCart[]
  public noItem = false
  public userPay: number = parseInt(localStorage.getItem('mustPay'), 10)
  public showModal = false
  public totalPrice: number

  constructor(
    private _passigData: PassingDataService,
    private _eventService: EventService
    ) { }

  private _buyAllItem: ShoppingCart[] = []
  private _item: Item
  private _isHave = false
  private _ValidInput = false

  public ngOnInit(): void {
    this._passigData.getBuyingItem().subscribe(
      res => {
          if (res[0].title !== '') {
            this.noItem = !this.noItem
            this.shoppingItemsArray = res
            this.totalPrice = 0
            console.log('+_+_+_+_+_+_+_+_+__+ this.shoppingItemsArray =', this.shoppingItemsArray)
            this.shoppingItemsArray.forEach(element => {
              this.totalPrice += (element.price * element.quantity)
            })
            console.log('_+_+_+_+__+_+_+_+_+_+ total Price =', this.totalPrice)
            this._isHave = true
          }
      }
    )
    if (!!this._isHave) {
      this.isSameItems()
    }
  }

  public getDeletingItem(deletingItem: Item): void {
    console.log('+_+_+_+ getDeleteingItem =', deletingItem)
    this._item = deletingItem
  }

  public inputNewQuantity(newQuantity: number, itemid: string): void {
    if (newQuantity < 1) {
      alert('Invalid input')
    } else {
      for (let i = 0; i < this.shoppingItemsArray.length; i++) {
        if (itemid === this.shoppingItemsArray[i].id) {
          this.shoppingItemsArray[i].quantity = newQuantity
          console.log('+_+ log =', this.shoppingItemsArray[i])
        }
      }
    }
  }

  public delete(): void {
    this.showModal = false
    for (let i = 0 ; i <= this.shoppingItemsArray.length; i++) {
      if (this.shoppingItemsArray[i].title === this._item.title
            && this.shoppingItemsArray[i].type === this._item.type) {
        this.shoppingItemsArray.splice(i, 1)
      }
    }
    window.location.reload()
  }

  public isSameItems(): void {
    for (let i = 0; i < this.shoppingItemsArray.length; i++) {
      for (let j = i + 1; j < this.shoppingItemsArray.length; j++) {
        if (this.shoppingItemsArray[i].title === this.shoppingItemsArray[j].title
            && this.shoppingItemsArray[i].type === this.shoppingItemsArray[j].type) {
          this.shoppingItemsArray[i].quantity =
            (this.shoppingItemsArray[i].quantity) + (this.shoppingItemsArray[j].quantity)
          this.shoppingItemsArray.splice(j, 1)
        }
      }
    }
  }

  public buyAll(): void {
    console.log('+_+++++++++++++++++++++++++++++++++++++')
    for (let i = 0; i < this.shoppingItemsArray.length; i++) {
      console.log('___________________________________')
      if (this.shoppingItemsArray[i].quantity < 1) {
        console.log('+_+_+_+_+_+_+__+_+_+_+_+ this.shoppingItemsArray[i].quantity', this.shoppingItemsArray[i].quantity)
        alert('Invalid quantity')
      } else {
        this.userPay += (this.shoppingItemsArray[i].price * this.shoppingItemsArray[i].quantity)
        this._ValidInput = true
      }
    }
    if (this._ValidInput) {
      localStorage.setItem('mustPay', this.userPay.toString())
      this._buyAllItem = this.shoppingItemsArray
      // this._eventService.buyAllItems(this._buyAllItem, this.userPay,
      //   localStorage.getItem('userEmail'), localStorage.getItem('token'))
      //   .subscribe(
      //     res => { window.location.reload() },
      //     err => { console.log('+_+_+_+ log in buyAll err =>', err) })
    }
  }
}
