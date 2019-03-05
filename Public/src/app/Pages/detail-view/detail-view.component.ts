import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/Interfaces/Item'
import { ShoppingCart } from '../../Interfaces/ShoppingCart'
import { EventService } from '../../Services/event.service'
import { HelpService } from '../../Services/help.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'sweetbox-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  public itemFromPassingData: Item
  public isGetted = false
  public buyingItemQuantity = 1
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
    private _passingDataService: PassingDataService,
    private _router: Router,
    private _HelpService: HelpService,
    private _eventService: EventService,
    ) { }

  public ngOnInit(): void {
    this._passingDataService.getItemForDetailView().subscribe(val => {
      if (!val) {
        this._router.navigateByUrl('/item')
        this.isGetted = false
      } else {
        this.isGetted = true
        this.itemFromPassingData = val
      }
    })

  }

  public addToCart(): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login')
    } else {
      this._HelpService.addToCart(this.itemFromPassingData, this.buyingItemQuantity)
    }
  }

  public buy(): void {
    if (!this._HelpService.loggedIn()) {
      this._router.navigateByUrl('/login')
    } else {
      this._HelpService.buy(this.itemFromPassingData, this.buyingItemQuantity)
    }
  }
}
