import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AddToCartQuantity } from '../../Interfaces/addToCartQuantity'
import { Item } from '../../Interfaces/Item'
import { ShoppingCart } from '../../Interfaces/ShoppingCart'
import { HelpService } from '../../Services/help.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'sweetbox-item-template',
  templateUrl: './item-template.component.html',
  styleUrls: ['./item-template.component.css']
})
export class ItemTemplateComponent implements OnInit {

  @Input() public ComingItems: Item

  public buyingItemQuantity = 1
  public showModal = false
  public buyingItem: ShoppingCart = {
    id: '',
    type: '',
    title: '',
    price: 0,
    count: 0,
    quantity: 0,
    image: null,
  }

  constructor(
    private _router: Router,
    private _HelpService: HelpService,
    private _PassingDataService: PassingDataService
    ) { }

  public ngOnInit(): void {
    this._PassingDataService.getAddToCartItemQuantity().subscribe(val => {
      if (val) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].id === this.ComingItems._id) {
            this.ComingItems.count -= val[i].quantity
          }
        }
      }
    })
  }

  public onBuyButton(): void {
    if ((this.buyingItemQuantity < 1) || (this.ComingItems.count < this.buyingItemQuantity)) {
      alert('Invalid input')
    } else {
      this.showModal = true
    }
  }

  public addToCart(item: Item): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login')
    } else {
      const body: AddToCartQuantity = {
        id: this.ComingItems._id,
        quantity: this.buyingItemQuantity
      }
      this._PassingDataService.setAddToCartItemQuantity(body)
      this.showModal = false
      this._HelpService.addToCart(item, this.buyingItemQuantity)
    }
  }

  public buy(item: Item): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login')
    } else {
      this.showModal = false
      this._HelpService.buy(item, this.buyingItemQuantity)
    }
  }

  public deleteItem(item: Item): void {
    this.showModal = false
    this._HelpService.deleteItem(item)
    window.location.reload()
  }

  public editItem(editItem: Item): void {
    this._HelpService.editItem(editItem)
  }

  public isAdmin(): boolean {
    return !!this._HelpService.isAdmin()
  }

  public detailview(item: Item): void {
    this._PassingDataService.setItemForDetailView(item)
    this._router.navigateByUrl('/detailview/' + `${item.title}` + `/${item.type}`)
  }

}
