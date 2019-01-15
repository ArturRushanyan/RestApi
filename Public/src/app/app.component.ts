import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { SearchService } from './Services/search.service';
import { EventService } from './Services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sweets';
  
  private name:string;
  public found: boolean = false;
  public itemFromRes = [];

  constructor(private _authService: AuthService,
              private _searchService: SearchService, 
              private _eventService: EventService,
              private _router: Router) { }
  
  
  onNameKeyUp(event: any):void {
    this.name = event.target.value;
    this.found = false;
  }

  buy() {
    if (!localStorage.getItem('token')) {
      alert('You are can not buy');
      this._router.navigate[('/login')];
      // this._router.navigate[('/login')];
    } else {
      this.found = false;
      alert('Buyyy');
      this._router.navigate[('/item')];
    }
  }

  boolClick(): void {
    this.found = false;
  }

  Logout(): void {
    this._authService.logoutUser()
    .subscribe(
      res => {
        console.log(res),
        localStorage.clear();
        location.reload();
        this._router.navigate(['/item']);
      },
      err => console.log(err)
    )
  }

  deleteItem(event, itemForDelete): void {
    const userEmail = localStorage.getItem('userEmail');
    if (itemForDelete !== 'undefined' && itemForDelete !== 'null') {
      this._eventService.deleteItem(itemForDelete, userEmail)
      .subscribe(
        res => {
          console.log(res);
          location.reload();
          this._router.navigate[('/item')];
        },
        err => console.log(err)
      )
    } else {
      alert('Can not delete item');
    }
  }

  Search() {
    if (this.name === '') {
      this._router.navigate[('/item')];
    } else if (this.name.length <= 3) {
      alert('Small name for searching');   
    } else {
      this._searchService.reqSearch(this.name)
      .subscribe(
        res => {
          this.found = true;
          if (res.length === 0) {
            this.found = false;
            alert("Don't found");
            this._router.navigate[('/item')];
          } else {
            this.itemFromRes = res;
            console.log(res);
          }
        },
        err => console.log(err), 
      )
    }
      // this.http.get(`http://localhost:3000/search/${this.name}`)
  }
}
