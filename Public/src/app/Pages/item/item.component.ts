import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  itemFromRes = [];
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getItems()
    .subscribe(
      res => this.itemFromRes = res,
      err => console.log(err),  
    )
  }
}
