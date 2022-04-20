import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from 'src/app/models/details';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  url: string = "https://localhost:44397/api/product";
  constructor(
    private _http: HttpClient
  ) { }

  getDetail(): Observable<Details> {
      return this._http.get<Details>(this.url);
  }
}
