import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from '../Interfaces/Item'
import { ShoppingCart } from '../Interfaces/ShoppingCart'
import { EventService } from './event.service'
import { PassingDataService } from './passing_data_service'

@Injectable()
export class HelpService {

  public userMustPay: number
  public buyingItem: ShoppingCart = {
    id: '',
    type: '',
    title: '',
    price: 0,
    count: 0,
    quantity: 0,
  }
  constructor(private _PassingDataService: PassingDataService,
              private _router: Router,
              private _eventService: EventService) { }

  public editItem(editItem: Item): void {
    this._PassingDataService.setUpdateingItem(editItem)
    this._router.navigateByUrl('/update')
  }

  public deleteItem(deleteingItem: Item): void {
    this._eventService.deleteItem(deleteingItem, localStorage.getItem('token'))
    .subscribe(
      res => {
        console.log(res)
        this._router.navigateByUrl('/item')
      },
      err => console.log(err),
    )
  }

  public isAdmin(): boolean {
    const userRole = localStorage.getItem('userRole')
    if (userRole === undefined && userRole === null) {
      return false
    } else if (userRole === 'admin') {
      return true
    }
  }

  public loggedIn(): boolean {
    const token = localStorage.getItem('token')
      return (token !== undefined && token !== null) ? true : false
  }

  public addToCart(item: Item, buyingItemQuantity: number): void {
    this.buyingItem = {
      id: item._id,
      type: item.type,
      title: item.title,
      price: item.price,
      count: item.count,
      quantity: buyingItemQuantity,
    }
    this._PassingDataService.setBuyingItem(this.buyingItem)
  }

  public buy(item: Item, buyingItemQuantity: number): void {
    this.buyingItem = {
      id: item._id.toString(),
      type: item.type,
      title: item.title,
      price: item.price,
      count: item.count,
      quantity: buyingItemQuantity,
    }
    this.userMustPay = parseInt(localStorage.getItem('mustPay'), 10)
    this.userMustPay += (this.buyingItem.price * this.buyingItem.quantity)
    localStorage.setItem('mustPay', this.userMustPay.toString())
    this._eventService.buyItem(localStorage.getItem('token'), localStorage.getItem('userEmail'),
      this.buyingItem.id, this.buyingItem.count, this.userMustPay.toString(), this.buyingItem.quantity)
      .subscribe( res => { window.location.reload() },
                  err => { console.log('+_+ err =>', err) })
  }


}
