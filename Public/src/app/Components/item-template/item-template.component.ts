import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from '../../Interfaces/Item'
import { ShoppingCart } from '../../Interfaces/ShoppingCart'
import { EventService } from '../../Services/event.service'
import { HelpService } from '../../Services/help.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'app-item-template',
  templateUrl: './item-template.component.html',
  styleUrls: ['./item-template.component.css']
})
export class ItemTemplateComponent implements OnInit {

  @Input() public  ComingItems: Item

  public buyingItemQuantity = 1
  public showModal = false
  public userMustPay: number
  public buyingItem: ShoppingCart = {
    id: '',
    type: '',
    title: '',
    price: 0,
    count: 0,
    quantity: 0,
  }

  constructor(private _eventService: EventService,
    private _router: Router,
    private _HelpService: HelpService,
    private _PassingDataService: PassingDataService) { }

  private searchItemName: string

  public ngOnInit(): void {
  }

  public addToCart(item: Item): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login')
    } else {
      this.showModal = false
      this.buyingItem = {
        id: item._id,
        type: item.type,
        title: item.title,
        price: item.price,
        count: item.count,
        quantity: this.buyingItemQuantity,
      }
      this._PassingDataService.setBuyingItem(this.buyingItem)
    }
  }

  public buy(item: Item): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login')
    } else {
      this.showModal = false
      this.buyingItem = {
        id: item._id.toString(),
        type: item.type,
        title: item.title,
        price: item.price,
        count: item.count,
        quantity: this.buyingItemQuantity,
      }

      this.userMustPay = parseInt(localStorage.getItem('mustPay'))
      this.userMustPay += (this.buyingItem.price * this.buyingItem.quantity)
      localStorage.setItem('mustPay', this.userMustPay.toString())
      console.log('+_+_+ mustpay in buy func =', this.userMustPay)
      this._eventService.buyItem(localStorage.getItem('token'), localStorage.getItem('userEmail'),
        this.buyingItem.id, this.buyingItem.count, this.userMustPay.toString(), this.buyingItem.quantity)
      .subscribe(
        res => {
          window.location.reload()
          console.log('+_+ res =>', res)
        },
        err => {
          console.log('+_+ err =>', err)
        }
      )
    }
  }

  public deleteItem(item: Item): void {
    this.showModal = false
    console.log('+_+ log in deleteItem func item =', item)
    this._HelpService.deleteItem(item)
    window.location.reload()
  }

  public editItem(editItem: Item): void {
    this._HelpService.editItem(editItem)
  }

  public isAdmin(): boolean {
    return !!this._HelpService.isAdmin()
  }

}
