import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PassingDataService } from './passing_data_service';
import { Item } from '../Interfaces/Item';
import { EventService } from './event.service';

@Injectable()
export class HelpService {

  constructor(private _PassingDataService: PassingDataService,
              private _router: Router,
              private _eventService: EventService) { }

  editItem(editItem: Item): void {
    this._PassingDataService.setUpdateingItem(editItem);
    this._router.navigateByUrl('/update');
  }
  
  deleteItem(deleteingItem) {
    this._eventService.deleteItem(deleteingItem, localStorage.getItem('userEmail')).
    subscribe(
      res => {
        console.log(res);
        // window.location.reload();
        this._router.navigateByUrl('/item');
      }, 
      err => console.log(err),
    );
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem('userRole');
    if (userRole === undefined && userRole === null) {
      return false;
    } else if (userRole === 'admin') {
      return true;
    }
  }

  loggedIn(): boolean {
    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }
}
