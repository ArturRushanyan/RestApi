import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { SearchService } from './Services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sweets';
  
  name:string;
  found: boolean = false;
  itemFromRes = [];

  constructor(private _authService: AuthService,
              private _searchService: SearchService, 
              private _router: Router) { }
  
  
  onNameKeyUp(event: any):void {
      this.name = event.target.value;
      this.found = false; 
  }

  buy() {
    console.log('buy function');
    if (!localStorage.getItem('token')) {
      console.log('blabla');
      this._router.navigate[('/login')];
    } else {
      //alert('Buyyy');
      console.log('mlamla');
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
        this._router.navigate(['/item']);
      },
      err => console.log(err)
    )
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
