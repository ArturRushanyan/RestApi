import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from '../Interfaces/Item'
import { EventService } from './event.service'
import { PassingDataService } from './passing_data_service'

@Injectable()
export class HelpService {

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
    if (token !== undefined && token !== null) {
      return true
    } else {
      return false
    }
  }
}
