import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item = [];
  constructor(private _eventService: EventService,
              private appComponent: AppComponent,
              private _router: Router) { }

  ngOnInit() {
    this._eventService.getItems()
    .subscribe(
      res => this.item = res,
      err => console.log(err),  
    )
  }

  buyBotton() {
    // this.appComponent.buyBotton();
    if(localStorage.getItem('token')) {
      alert('buYY');
    } else {
      alert('You are can not buy');
      this._router.navigate[('/login')]
    }
  }
  
}
