import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sweets';
  
  name:string = '' ;
  found: boolean;

  item = [];

  constructor(private _authService: AuthService,
              private searchService: SearchService, 
              private http: HttpClient) { }
              
  onNameKeyUp(event: any) {
      this.name = event.target.value;
      this.found = false; 
  }

  boolClick() {
    this.found = false;
  }


  Search() {
    this.searchService.reqSearch(this.name)
    .subscribe(
      res => {
        this.found = true;
        this.item = res;
        console.log(res);
      },
      err => console.log(err),
      // (data:any[]) => {
      //   console.log(data); 
      // } 
    )
      // this.http.get(`http://localhost:3000/search/${this.name}`)
  }
  
}
