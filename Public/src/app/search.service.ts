import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  private searchUrl = 'http://localhost:3000/search';

  constructor(private http: HttpClient) { }

  reqSearch(Item) {
    return this.http.get<any>(`${this.searchUrl}/${Item}`)
  }

}
