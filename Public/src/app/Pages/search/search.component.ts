import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../Services/search.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public itemFromRes = [];

  constructor(private _searchService: SearchService,
              private _router: Router) { }

  Search(name): void {
    this._searchService.reqSearch(name).
    subscribe(
      res => {
        console.log('+_+ res = ', res);
        this.itemFromRes = res;
        this._router.navigate[('/search')];
      },
      err => {
        console.log(err);
      })
  }
  
  // ngOnInit() {
  //   this.Search();
  // }

}
