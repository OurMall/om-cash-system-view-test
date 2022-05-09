import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Details } from 'src/app/models/details';
import { Product } from 'src/app/models/product';
import { InvoiceService } from 'src/app/services/ServicesInvoices/invoice.service';
import { ProductsService } from 'src/app/services/ServicesProducts/products.service';
import { Invoice } from '../../models/invoice'; 


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public id_client!: string;
  public details!: Details[];
  public total_price!: number;
  public invoice1!: Invoice;
  public products!: any[];
  public payment_method!: string;
  public codeProduct!: string;
  public searhProduct!: Observable<Product>;
  public quantity!: number;

  public detailsForm = this.formBuilder.group({
    Name: ["", Validators.required],
    Price: [0.0, Validators.required],
    Code: ["", Validators.required],
    Quantity: [0, Validators.required]
})

@ViewChild('quantityDetails') 
  public quantityDetails!: ElementRef;

  constructor(
      private apiInvoice: InvoiceService,
      private apiProduct: ProductsService,
      private formBuilder: FormBuilder,
      public snackBar: MatSnackBar

  ) { 
    this.products = [];
    this.invoice1 = {id_client:this.id_client, details: [], total_price:this.total_price, payment_method: "C"};
  };
  ngOnInit(): void {
    //this.getInvoices();
  }
  
  getInvoices() {
    this.apiInvoice.getInvoices().subscribe((invoice:any) => {
      console.log(invoice, "bd")
      this.products = invoice;
    })
  };

  addProductsToDetails() {
    let product: Product = {
      Name: "",
      Price: 0.0,
      Code: "",
      Quantity: 0
    };

    if (this.codeProduct == null || undefined) {
      this.snackBar.open("Por favor ingrese un código de producto")
    } else if (this.quantity == null || undefined) {
      this.snackBar.open("Por favor ingrese una cantidad para este producto")
    } else {
      this.apiProduct.getProductsByAdi(this.codeProduct).subscribe((response => {
        try {
            const element = response[0];  
            console.log(response,"data") 
              product = {
              Name: element.name,
              Price: element.price,
              Code: this.codeProduct,
              Quantity: this.quantity,
            };
            this.products.push(product);
            this.total_price = this.products.reduce((
              acc,
              obj,
            ) => acc + (obj.Price * obj.Quantity), 0);
            console.log(this.total_price);
            console.log(this.products);
          } catch (error) {
            this.snackBar.open("No hay un producto con éste código");
          };
      }));
    };
  };


objectKeys(object: any) {
  const keys = Object.keys(object);
  return keys;
}

  addInvoices() {
    this.invoice1.details = this.products;
    this.apiInvoice.postInvoices(this.invoice1).subscribe(response => {
        this.snackBar.open('Factura creada', '', {
            duration: 2000
        })
    });
};

UpdateQuantity(code: String) {
  let index = this.products.findIndex(p => p.Code === code);
  console.log(index);
  let value = this.quantityDetails.nativeElement.value;
  let quantity = parseInt(value);
  console.log(quantity);
  if (index > -1 && this.products[index].Quantity >= quantity) {
    this.products[index].Quantity = quantity;
    this.subtractPrices();
  } else if (index > -1 && this.products[index].Quantity <= quantity) {
    this.products[index].Quantity = quantity;
    this.sumPrices();
  };
};

deleteProductToDetails(code: String) {
  let index = this.products.findIndex(p => p.Code === code);
  if (index > -1 && confirm('¿Desea eliminar el producto?')) {
    this.products.splice(index, 1);
    this.subtractPrices();
  }
};

sumPrices() {
  this.total_price = this.products.reduce((
    acc,
    obj,
  ) => acc + (obj.Price * obj.Quantity), 0);
};

subtractPrices() {
  this.total_price = this.products.reduce((
    acc,
    obj,
  ) => acc - (obj.Price * obj.Quantity) *-1 , 0  );
};

};




  
