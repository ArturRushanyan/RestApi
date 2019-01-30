import { Component, OnInit } from '@angular/core';
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
              private _helService: HelpService) { }

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

  deleteItem(): void {
    this._helService.deleteItem(this.itemForDeleting);
    window.location.reload();
  }

  editItem(editItem: Item): void {
    this._helService.editItem(editItem);
  }

  isAdmin(): boolean {
    return !!this._helService.isAdmin();
  }
  
}
