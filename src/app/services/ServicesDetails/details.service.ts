import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Details } from 'src/app/models/details';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  url: string = "https://localhost:44397/api/product";

  private details$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  detailsObservable$: Observable<any[]> = this.details$.asObservable()
  
  constructor(
    private _http: HttpClient
  ) { }

  getDetail(): Observable<any> {
      return this._http.get<any>(this.url).pipe(
        tap((response) => {
          this.details$.next(response)
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  
}
