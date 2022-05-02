import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Invoice } from '../../models/invoice';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  formData!: Invoice;
  orderDetails!: Product[];

  url: string = "https://localhost:44397/api/invoices";
  constructor(
    private _http: HttpClient
  ) { }

  getInvoices(): Observable<Invoice> {
      return this._http.get<Invoice>(this.url);
  }

  postInvoices(invoice: Invoice): Observable<Invoice>{
    return this._http.post<Invoice>(this.url, invoice, httpOptions);
  }

  deleteInvoices(id: string): Observable<Invoice>{
    return this._http.delete<Invoice>(`${this.url}/${id}`);
  }

}
