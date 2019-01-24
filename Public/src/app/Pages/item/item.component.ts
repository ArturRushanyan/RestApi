import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { AuthService } from '../../Services/auth.service';
import { Item } from '../../Interfaces/Item';
import { UpdateItemService } from '../../Services/update-item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  itemFromRes:Item;
  constructor(private _eventService: EventService,
              private _authService: AuthService,
              private _router: Router,
              private _updateService: UpdateItemService) { }

  ngOnInit() {
    this._eventService.getItems()
    .subscribe(
      res => {
        this.itemFromRes = res;
        console.log(this.itemFromRes)
      },
      err => console.log(err),  
    )
  }

  deleteItem($evnet, deleteingItem) {
    this._eventService.deleteItem(deleteingItem, localStorage.getItem('userEmail')).
    subscribe(
      res => {
        console.log(res);
        window.location.reload();
      }, 
      err => console.log(err),
    );
  }

  editItem($event, editItem: Item):void {
    this._updateService.setItem(editItem);
    this._router.navigateByUrl('/update');
    console.log('log1 in item.component edit func');
  }
  
}
