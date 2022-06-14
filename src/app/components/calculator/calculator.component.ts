import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { enviroment } from 'src/app/models/enviroment';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { ServicesPriceDollarServiceService } from 'src/app/services/ServicesPriceDollar/ServicesPriceDollarService.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;
  public total_price:number;
  public products: any[] = [];
  public priceDollar!: number;
  public dollarInPeso!: number;
  showCancel!: boolean;
  showSuccess!: boolean;
  showError!: boolean;
  invoices: Invoice;

  constructor(
    private apiInvoice: InvoiceService,
    private apiDollar: ServicesPriceDollarServiceService
  ) {
    this.getInvoiceStorage();
  };

  ngOnInit(): void {
    this.getPriceDollar()
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
          value:  Math.round((element.Price * element.Quantity )/ pricePesos),
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

  }