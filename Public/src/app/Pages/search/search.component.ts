import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../Services/help.service'


import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { PassingDataService } from '../../Services/passing_data_service';
import { AuthService } from '../../Services/auth.service';
import { Item } from '../../Interfaces/Item';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private searchItemName;
  public itemFromRes = [];

  constructor(private _event: EventService,
              private _router: Router,
              private _PassingDataService: PassingDataService,
              private _authService: AuthService,
              private _HelpService: HelpService) { }

  ngOnInit() { 
    if ( this._PassingDataService.getSearchingItemName() !== undefined && this._PassingDataService.getSearchingItemName() !== null)  {
      this.searchItemName = this._PassingDataService.getSearchingItemName().toString();
      this.searchingItem();
    } else {
      this._router.navigateByUrl('/item');
    }
  }

  searchingItem() {
    if ( this.searchItemName.length <= 3) {
      alert('Small name for searching');
    } else {
      this._event.searchItem(this.searchItemName).subscribe(
        res => {
          if (res.length <= 0) {
            this._router.navigateByUrl('/item');
            alert("Don't found");
          } else {
            this.itemFromRes = res;
          }
        },
        err => console.log(err),
      );
    }
    // this.http.get(`http://localhost:3000/search/${this.name}`)
  }

  editItem($event, editItem: Item) {
    this._HelpService.editItem(editItem);
  }

  deleteItem($event, deletingItem: Item) {
    console.log('log in deleteItem seachComponent func');
    this._HelpService.deleteItem(deletingItem);
  }

  isAdmin() {
    return !!this._HelpService.isAdmin();
  }

}
