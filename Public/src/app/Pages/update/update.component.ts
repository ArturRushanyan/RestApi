import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateItemService } from '../../Services/update-item.service';
import { EventService } from '../../Services/event.service';
import { Item } from 'src/app/Interfaces/Item';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private _updateService: UpdateItemService,
              private _eventService: EventService,
              private _router: Router) { }

  public itemForUpdate: Item;
  private userRole: string;
  private userEmail: string;
  ngOnInit() {
    console.log('log2 in update.component');
    this.currentItem();
  }

  currentItem(): void {
    console.log('log3 in update.component');
    this.itemForUpdate = this._updateService.getItem();
  }

  updateItem(): void {
    console.log('log5 in update.component');
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole === 'admin') {
      console.log('log6 in update.component ');
      this.userEmail = localStorage.getItem('userEmail');
      this._eventService.updateItem(this.itemForUpdate, this.userEmail).subscribe(
        res => {
          console.log('log7 in update.component');
          this._router.navigateByUrl('/item');
          console.log(res);
        },
        err => {
          console.log('log8 in update.component');
          console.log(err);
        }
      );
    } else {
      this._router.navigateByUrl('/item');
    }
    
  }


}
