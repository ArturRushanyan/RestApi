import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../Services/help.service'

import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { PassingDataService } from '../../Services/passing_data_service';
import { Item } from '../../Interfaces/Item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private searchItemName;
  private itemfordelete;
  public itemFromRes = [];

  constructor(private _event: EventService,
              private _router: Router,
              private _PassingDataService: PassingDataService,
              private _HelpService: HelpService) { }

  ngOnInit() { 
    this._PassingDataService.getSearchingItemName().subscribe(val => {
      if (!val) {
        this._router.navigateByUrl('/item');
      } else {
          this.searchItemName = val;
          this.searchingItem();
      }
    });
  }

  getDeletingItem(item): void {
    this.itemfordelete = item;
  }

  buy() {
    if (!this._HelpService.loggedIn()) {
      console.log('false case');
      this._router.navigateByUrl('/login');
    } else {
      console.log('buy!!!!!!!!!!!!!');
    }

  }

  searchingItem(): void {
    if ( this.searchItemName.length <= 3) {
      alert('Small name for searching');
    } else {
      this._event.searchItem(this.searchItemName).subscribe(
        res => {
          if (res.length <= 0) {
            alert("Don't found");
            this._router.navigateByUrl('/item');
          } else {
            this.itemFromRes = res;
            console.log('log ', this.itemFromRes);
          }
        },
        err => console.log(err),
      );
    }
    // this.http.get(`http://localhost:3000/search/${this.name}`)
  }

  editItem(editItem: Item): void {
    this._HelpService.editItem(editItem);
  }

  deleteItem(): void {
    this._HelpService.deleteItem(this.itemfordelete);
  }

  isAdmin(): boolean {
    return !!this._HelpService.isAdmin();
  }

}
