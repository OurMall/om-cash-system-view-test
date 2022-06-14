import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesPriceDollarServiceService {

  url:string = 'https://v1.nocodeapi.com/ander7357/cx/ITKSWaZNgLaISyeb/rates';
  constructor(
    private _http: HttpClient
  ) { };

  getDates(): Observable<any> {
    return this._http.get<any>(this.url);
  };
};
