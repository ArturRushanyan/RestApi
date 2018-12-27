import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public itemFromRes = [];
  public deleteButtonIsActiv: boolean;
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.delleteButton();
    this._eventService.getItems()
    .subscribe(
      res => this.itemFromRes = res,
      err => console.log(err),  
    );
    
  }

  delleteButton(): void {
    if( localStorage.getItem('userRole') === 'admin') {
      this.deleteButtonIsActiv = true;
    } else {
      this.deleteButtonIsActiv = false;
    }
  }
}
