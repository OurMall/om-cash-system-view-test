import { Component, OnInit } from '@angular/core';
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
    console.log("click")
    let product: Product = {
      Name: "",
      Price: 0.0,
      Code: "",
      Quantity: 0
    };
    //this.products.push(this.detailsForm.value);
    this.apiProduct.getProductsByAdi(this.codeProduct).subscribe((response => {
      const element = response[0];  
      console.log(response,"data") 
          product = {
          Name: element.name,
          Price: element.price,
          Code: this.codeProduct,
          Quantity: this.quantity
        };
        this.products.push(product);
        //this.products = response; y se cambia el products.services por listas
        console.log(this.products)
    }));

    /*
    this.apiProduct.getProductsByAdi(this.codeProduct).pipe(
      mergeMap(data => {
        this.products = data;
        data.forEach((current: any) => {
          this.products.push(current);
        });
        return forkJoin(this.products);
      })
    ).subscribe((response:any) =>{
      this.products = response;
    });*/
    
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




  
}