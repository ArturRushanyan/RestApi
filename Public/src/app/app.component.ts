import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
// import { Router } from '@angular/router';
import { searchService } from './search.service'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [searchService]
})
export class AppComponent implements OnInit {
  
  results: Object;
  searchTerm$ = new Subject<string>();

  title = 'Sweets';
  
  Item = [];

  constructor (private _authService: AuthService,
               private _eventService: EventService,
               private searchservice: searchService) {
                 this.searchservice.search(this.searchTerm$)
                 .subscribe(results => {
                   this.results = this.results;
                 })
                }
           
  ngOnInit() {
  }


  // searchingItem() {
  //   this._searchService.searchingItem(this.Item)
  //   .subscribe(
  //     res => {
  //       console.log(res);
        
  //       this._router.navigate(['/search']);

  //     } 
  //   )
  // }
}
