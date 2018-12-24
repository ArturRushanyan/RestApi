import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sweets';
  
  name:string;
  found: boolean;
  item = [];

  constructor(private _authService: AuthService,
              private _searchService: SearchService, 
              private _router: Router) { }
              
  onNameKeyUp(event: any) {
      this.name = event.target.value;
      this.found = false; 
  }

  buyBotton() {
    
    if (localStorage.getItem('token')) {
      alert('Buy');
      this._router.navigate[('/item')];
    } else {
      alert('You are can not buy');
      this._router.navigate[('/login')];
    }
  }

  boolClick() {
    this.found = false;
  }

  Search() {
    if (this.name === '') {
      // this._router.navigate[('/item')];
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
            this.item = res;
            console.log(res);
          }
        },
        err => console.log(err), 
      )
    }
      // this.http.get(`http://localhost:3000/search/${this.name}`)
  }
}
