import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  title = 'FrontPrueba';

  public invoice!: any[];

  constructor(
    private apiInvoice: InvoiceService
  ) {};

  ngOnInit(): void {
    this.getInvoice();
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
