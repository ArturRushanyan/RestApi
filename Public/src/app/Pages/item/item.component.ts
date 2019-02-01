import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { HelpService } from '../../Services/help.service'; 
import { Item } from '../../Interfaces/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  itemFromRes:Item;
  private itemForDeleting;
  constructor(private _eventService: EventService,
              private _helpService: HelpService,
              private _router: Router) { }

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

  getDeletingItem(item): void {
    this.itemForDeleting = item;
  }

  buy(item) {
    if (!this._helpService.loggedIn()) {
      console.log('false case');
      this._router.navigateByUrl('/login');
    } else {
      console.log('+_+_+ log in buy func in item.component');
      this._eventService.buyItem(localStorage.getItem('userEmail'), item._id, 2, item.price).
        subscribe(
          res => {
            console.log('+_+ log in buy res case');
            console.log('+_+ res =',res)
          },
          err => {
            console.log('+_+ log in buy err case');
            console.log(err);
          });
    }

  }

  deleteItem(): void {
    this._helpService.deleteItem(this.itemForDeleting);
    window.location.reload();
  }

  editItem(editItem: Item): void {
    this._helpService.editItem(editItem);
  }

  isAdmin(): boolean {
    return !!this._helpService.isAdmin();
  }
  
}
