import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators'; 
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';


@Injectable()

export class searchService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private baseUrl  = 'http://localhost:3000/search';

  constructor(private http: HttpClient) { }
  
  search(terms: Observable<string>) {
    return terms.pipe(
                      debounceTime(100),
                      distinctUntilChanged(),
                      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    return this.http
        .get(`${this.baseUrl}?name=${term}`, this.httpOptions)
        .pipe(map((res: Response) => res.json()));
  }

  // searchingItem(Item) {
  //   return this.http.get<any>(`${this.baseUrl}?name=${Item}`, )
  // }

  // `${this.heroesUrl}/?name=${term}`
}
