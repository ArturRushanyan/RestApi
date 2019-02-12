import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { PassingDataService } from '../../Services/passing_data_service';
import { Item } from '../../Interfaces/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  private itemsFromRes: Item[];
  constructor(private _eventService: EventService, 
              private _passingDataService: PassingDataService) { }

  ngOnInit() {
    this._eventService.getAllItems()
      .subscribe(
        res => {
          this.itemsFromRes = res;
          this.itemsFromRes.forEach(element => {
            this._passingDataService.setAutocompleteNames(element.title);
            console.log('+_+_+_+ element.title =', element.title);
          });
          console.log('+_+ itemsFromRes =', this.itemsFromRes);
        }, 
        err => {
          console.log('+_+ err case in getAllItems');
          console.log(err);
        })
  }
  

}
