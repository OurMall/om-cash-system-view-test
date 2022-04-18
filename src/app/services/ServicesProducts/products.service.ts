import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = "https://localhost:44397/api/product";
  constructor(
    private _http: HttpClient
  ) { }

  getProducts(): Observable<Product> {
      return this._http.get<Product>(this.url);
  }
}
