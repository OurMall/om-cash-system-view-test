import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url: string = "https://localhost:44397/api/invoices";
  constructor(
    private _http: HttpClient
  ) { }

  getInvoices(): Observable<Invoice> {
      return this._http.get<Invoice>(this.url);
  }

}
