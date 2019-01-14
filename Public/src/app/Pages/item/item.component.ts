import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public itemFromRes = [];
  public show: boolean;
  // public deleteButtonIsActiv: boolean;
  constructor(private _eventService: EventService,
              private _router: Router,
              private _authService: AuthService) { }

  ngOnInit() {
    this.show = this._authService.isAdmin();
    this._eventService.getItems()
    .subscribe(
      res => this.itemFromRes = res,
      err => console.log(err),  
    );
  }

  buy() {
    if (!localStorage.getItem('token')) {
      this._router.navigate[('/login')];
      alert('You are can not buy');
    } else {
      alert('Buyyy');
      this._router.navigate[('/item')];
    }
  }

  deleteItem(): void {
    
  }
  
}
