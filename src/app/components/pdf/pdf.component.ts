import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  title = 'FrontPrueba';
  public invoices!: Invoice;

  public invoice!: any[];
  public id_client!:string;
  public products!: any[];
  public total_price!:number;
  snackBar: any;

  constructor(
    private apiInvoice: InvoiceService,

  ) {    
    this.getInvoiceStorage();
  };

  ngOnInit(): void {
    this.getInvoice();

  };

  addInvoices() {

    this.invoices.total_price = this.total_price;
    this.invoices.details = this.products;
    /* ------- Valida que si hayan productos en los detalles para poder crear la factura ------- */ 
    if (this.products.length === 0) {
      this.snackBar.open("Para crear la factura necesita mínimo un producto");
    } else {
      this.apiInvoice.postInvoices(this.invoices).subscribe(response => {
        this.snackBar.open('Factura creada', '', {
            duration: 2000
        });
      });
    };
  };

  receiveInovice($event:Invoice) {
    this.invoices = $event;
  };

  getInvoiceStorage() {
    let total_price = localStorage.getItem('total_price');
    this.total_price = Number(total_price);

    let products = localStorage.getItem('product');
    if (products == null) {
      this.products = [];
    } else {
      this.products = JSON.parse(products);
      console.log(this.products,"products");
      
    };
  };


  getInvoice() {
    this.apiInvoice.getInvoices().subscribe((data:any) => {
      this.invoice = data;
      console.log(this.invoice,"data");
    });
  };

  makePDF() {
    const DATA:any = document.getElementById('htmlInvoice');
    const PDF = new jsPDF('p', 'pt', 'a4');
    const OPTIONS = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, OPTIONS).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (PDF as any).getImageProperties(img);
      const pdfWidth = PDF.internal.pageSize.getWidth() -2 * bufferX;
      const pdHeight = (imgProps.height * pdfWidth) / imgProps.width;
      PDF.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdHeight,
        undefined,
        'FAST'
      );
      return PDF;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_invoice.pdf`);
    });
  };
}
