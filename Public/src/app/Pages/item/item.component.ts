import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public itemFromRes = [];
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getItems()
    .subscribe(
      res =>  {
        this.itemFromRes = res
        //console.log(this.itemFromRes);
      },
      err => console.log(err),  
    );
  }

}
