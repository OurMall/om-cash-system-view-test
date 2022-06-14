import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal/public_api';
import { enviroment } from 'src/app/models/enviroment';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { ServicesPriceDollarServiceService } from 'src/app/services/ServicesPriceDollar/ServicesPriceDollarService.service';


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
  public priceDollar!: number;
  public dollarInPeso!: number;

  public payPalConfig ? : IPayPalConfig;
  showCancel!: boolean;
  showSuccess!: boolean;
  showError!: boolean;

  constructor(
    private apiInvoice: InvoiceService,
    private apiDollar: ServicesPriceDollarServiceService
  ) {
    this.getInvoiceStorage();
  };

  ngOnInit(): void {
    this.getPriceDollar();
    this.getInvoice();
    console.log(this.dollarInPeso,'precio en pesos')

  };

  receiveInovice($event:Invoice) {
    this.invoices = $event;
  };


  private initConfig(price:number,valuePeso:number): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: enviroment.clientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: price.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: price.toString()
                        }
                    }
                },
                items: this.getItemList(valuePeso)
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
            JSON.stringify(data));
            //this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            //this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            //this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
        }
    };
};

  getItemList(pricePesos:number): any[] {
    const items: any[] = [];
    console.log(pricePesos)
    let item = {};
    this.products.forEach((element: any) => {
      item = {
        name: element.Name,
        quantity: element.Quantity,
        unit_amount: {
          value:  Math.round(element.Price / pricePesos),
          currency_code:'USD'
        }
      };
      items.push(item);
    });
    return items;
  };


  getInvoiceStorage() {
    let total_price = localStorage.getItem('total_price');
    this.total_price = Number(total_price);
    let products = localStorage.getItem('product');
    if (products == null) {
      this.products = [];
    } else {
      this.products = JSON.parse(products);
    };
  };

  getPriceDollar() {
    let priceDollarInPeso:number = 0;
    this.apiDollar.getDates().subscribe((dollar:any) => {
      priceDollarInPeso = dollar.rates.COP
      this.calculatePriceDollar(priceDollarInPeso);
    });
  };

  calculatePriceDollar(priceDollar:number):number {
    let range:number = this.getItemList(priceDollar).length;
    let price:number = 0;
    for (let index = 0; index < range; index++) {
      price += (this.getItemList(priceDollar)[index].unit_amount.value);
    };
    this.initConfig(price,priceDollar);
    return price;
  };

  getInvoice() {
    this.apiInvoice.getInvoices().subscribe((data:any) => {
      this.invoice = data;
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
