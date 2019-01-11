import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { SearchService } from './Services/search.service';
import { Router } from '@angular/router';
import { SearchComponent } from './Pages/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchComponent]
})
export class AppComponent {
  title = 'Sweets';
  
  public name: string;
  public found: boolean = false;

  constructor(private _authService: AuthService,
              private _searchComponent: SearchComponent, 
              private _router: Router) { }
  
  // onNameKeyUp(event: any):void {
  //     this.name = event.target.value;
  //     this.found = false; 
  // }

  buy() {
    if (!localStorage.getItem('token')) {
      alert('You are can not buy');
      this._router.navigate[('/login')];
    } else {
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
        this._router.navigate(['/item']);
      },
      err => console.log(err)
    )
  }

  Search(): void {
    if (this.name === '' || this.name.length <= 3) {
      this._router.navigate[('/item')];
    } else {
      this._router.navigate[('/search')];
      this._searchComponent.Search(this.name);
      // this._router.navigateByUrl(`search/${this.name}`);
    }
  }
      // this._searchService.reqSearch(this.name)
      // .subscribe(
      //   res => {
      //     this.found = true;
      //     if (res.length === 0) {
      //       this.found = false;
      //       alert("Don't found");
      //       this._router.navigate[('/item')];
      //     } else {
      //       this.itemFromRes = res;
      //       console.log(res);
      //     }
      //   },
      //   err => console.log(err), 
      // )
      // this.http.get(`http://localhost:3000/search/${this.name}`)
}
