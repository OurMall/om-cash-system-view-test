import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Observable } from 'rxjs/internal/Observable';
import { enviroment } from 'src/app/models/enviroment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;
  public total_price:number;
  public products: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getInvoiceStorage();
    this.initConfig();
    
  }

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

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: enviroment.clientId,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.total_price.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.total_price.toString()
                        }
                    }
                },
                items: this.getItemList()
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

  getItemList(): any[] {
    const items: any[] = [];
    let item = {};
    this.products.forEach((element: any) => {
      item = {
        name: element.Name,
        quantity: element.Quantity,
        unit_amount: {
          value: element.Price,
          currency_code:'USD'
        }
      };
      items.push(item);
    });
    return items;
  };

}
