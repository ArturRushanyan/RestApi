import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Item {
  title: string;
}

@Injectable()
export class SearchService {

  private searchUrl = 'http://3000/localhost/search';

  constructor(private http: HttpClient) { }

  reqSearchItem(item: Item) {
    return  this.http.get<Item>(`${this.searchUrl}?${item}`, {
      headers: 
        new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'MyClientCert': '',
            'MyToken': ''
          }
        )
        }
    ).pipe( map(res => res), catchError(err => throwError(err)) );
  }

}
