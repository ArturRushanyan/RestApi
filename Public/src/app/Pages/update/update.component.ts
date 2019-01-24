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
    this.currentItem();
  }

  currentItem(): void {
    this.itemForUpdate = this._updateService.getItem();
  }

  updateItem(): void {
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole === 'admin') {
      this.userEmail = localStorage.getItem('userEmail');
      this._eventService.updateItem(this.itemForUpdate, this.userEmail).subscribe(
        res => {
          this._router.navigateByUrl('/item');
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this._router.navigateByUrl('/item');
    }
    
  }


}
