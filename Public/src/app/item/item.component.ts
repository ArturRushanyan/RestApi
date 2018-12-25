import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item = [];
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getItems()
    .subscribe(
      res => this.item = res,
      err => console.log(err),  
    )
  }  
}
