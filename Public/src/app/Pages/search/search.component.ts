import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchData = {};
  constructor(private _event: EventService,
              private _router: Router) { }

  ngOnInit() {
    this._event.searchItem(this.searchData)
    .subscribe(
      res => {
        console.log(res),
        console.log('_+_+_+_+_+_+_+_+_+ ', this.searchData[0]),
        this._router.navigate(['/search'])
      },
      err => console.log(err),
    )
  }

}
