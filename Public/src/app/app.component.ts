import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
// import { EventService } from './event.service';
import { SearchService } from './search.service';

export interface Item {
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sweets';

  searchingTitle: {
    title: string
  };
  
  constructor(private _authService: AuthService,
              private _searchService: SearchService) { }
              
  ngOnInit() {
  }

  searchingItem() {
    this._searchService.reqSearchItem(this.searchingTitle)
    .subscribe(
      res => console.log(res),
      err => console.log('+_+_+_+_+_+_+_+_+_', err), 
    )
  }

}
