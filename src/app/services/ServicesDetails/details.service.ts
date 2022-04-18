import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Details } from 'src/app/models/details';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  url: string = "https://localhost:44397/api/product";

  private details$: BehaviorSubject<Details[]> = new BehaviorSubject<Details[]>([]);
  detilsObservable$ = this.details$.asObservable()
  
  constructor(
    private _http: HttpClient
  ) { }



  getDetail(): Observable<Details> {
      return this._http.get<Details>(this.url).pipe(
        tap((response) => {
          console.log(response)
          this.details$.next(response.Product)
        })
      );
  }
}
