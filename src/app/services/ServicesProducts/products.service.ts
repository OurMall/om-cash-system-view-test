import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = "https://localhost:44397/api/product";
  constructor(
    private _http: HttpClient
  ) { };

  getProducts(): Observable<any> {
      return this._http.get<Product>(this.url);
  };

  getNamesProducts():Observable<any[]> {
    return this._http.get<[]>(this.url)
    .pipe(
      map((res: []) => res.map(item => item['name']))
    )
  }; 

  getProductsByAdi(id:String): Observable<any>{
    return this._http.get<Product>(`${this.url}/${id}`);
  };
}