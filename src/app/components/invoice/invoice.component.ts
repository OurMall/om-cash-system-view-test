import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { Invoice } from '../../models/invoice'; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public lst: any[] = [];
  constructor(
      private apiInvoice: InvoiceService
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.apiInvoice.getInvoices().subscribe( invoice => {
      this.lst = invoice.details;
    })
  }
}
